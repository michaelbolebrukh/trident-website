#!/usr/bin/env python3
"""
Regenerates src/data/homes.generated.ts from a WordPress export.

    python3 scripts/import-houses.py path/to/export.xml

Only published `houses` posts are imported. Fields come from the ACF meta the
old site uses: cost, tech_stats_*, house_short_texts, thumb_image, tab_1_gallery.

Note the export does NOT carry the tiered kit/shell/turnkey pricing as data —
on the old site those live in per-model pricing-table images — so each model
here has a single base price.
"""
import html
import json
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {'wp': 'http://wordpress.org/export/1.2/'}
OUT = Path(__file__).resolve().parent.parent / 'src' / 'data' / 'homes.generated.ts'


def clean(text):
    return re.sub(r'\s+', ' ', html.unescape(re.sub(r'<[^>]+>', ' ', text or ''))).strip()


def esc(text):
    return (text or '').replace('\\', '\\\\').replace("'", "\\'")


def num(value, default='null'):
    try:
        return str(float(value)) if value not in (None, '') else default
    except ValueError:
        return default


def relative(url):
    """Strip the WordPress host, keeping the year/month path under uploads/."""
    marker = '/wp-content/uploads/'
    return url.split(marker, 1)[1] if url and marker in url else None


def parse(xml_path):
    root = ET.parse(xml_path).getroot()

    attachments = {
        item.findtext('wp:post_id', default='', namespaces=NS):
        item.findtext('wp:attachment_url', default='', namespaces=NS)
        for item in root.iter('item')
        if item.findtext('wp:post_type', default='', namespaces=NS) == 'attachment'
    }

    homes = []
    for item in root.iter('item'):
        if item.findtext('wp:post_type', default='', namespaces=NS) != 'houses':
            continue
        if item.findtext('wp:status', default='', namespaces=NS) != 'publish':
            continue

        meta = {
            pm.findtext('wp:meta_key', default='', namespaces=NS):
            (pm.findtext('wp:meta_value', default='', namespaces=NS) or '')
            for pm in item.findall('wp:postmeta', NS)
        }
        cats = [html.unescape(c.text) for c in item.findall('category')
                if c.get('domain') == 'houses-type']
        gallery = [attachments[i] for i in re.findall(r's:\d+:"(\d+)"', meta.get('tab_1_gallery', ''))
                   if i in attachments]

        homes.append({
            'name': item.findtext('title'),
            'slug': item.findtext('wp:post_name', default='', namespaces=NS),
            'category': cats[0] if cats else 'Other',
            'categories': cats,
            'price': int(float(meta['cost'])) if meta.get('cost', '').strip() else 0,
            'area': meta.get('tech_stats_area', '').strip(),
            'areaFt': meta.get('tech_stats_area_ft', '').strip(),
            # Source data mixes decimal commas and Cyrillic 'х' into dimensions.
            'dimensions': meta.get('tech_stats_sizes', '').strip()
                              .replace(',', '.').replace('х', 'x').replace('×', 'x'),
            'floors': meta.get('tech_stats_floors', '').strip(),
            'bedrooms': meta.get('tech_stats_bedrooms', '').strip(),
            'bathrooms': meta.get('tech_stats_bathrooms', '').strip(),
            'desc': clean(meta.get('house_short_texts', '')),
            'thumb': relative(attachments.get(meta.get('thumb_image', '').strip())),
            'gallery': [p for p in (relative(u) for u in gallery) if p],
        })

    homes.sort(key=lambda h: h['price'])
    return homes


HEADER = """/**
 * GENERATED FILE — do not hand-edit.
 * Re-run: python3 scripts/import-houses.py <export.xml>
 *
 * Editorial corrections live in src/data/overrides.ts and are merged on top
 * of this by src/data/homes.ts, so they survive a re-import.
 *
 * IMAGE_BASE still points at the old WordPress host so the staging site can be
 * reviewed with real photography. It MUST be switched to local assets before
 * DNS moves to Hostinger, or every image on the site will break.
 */

const IMAGE_BASE = 'https://tridentmodular.com/wp-content/uploads/'

export const houseImage = (path: string) => IMAGE_BASE + path

export interface Home {
  name: string
  slug: string
  category: string
  categories: string[]
  /** Base price in GBP. The old site's tiered kit/shell/turnkey pricing lives
   *  in per-model images, which the export does not carry as data. */
  price: number
  area: number
  areaFt: number
  dimensions: string
  floors: number
  bedrooms: number | null
  bathrooms: number | null
  desc: string
  thumb: string | null
  gallery: string[]
}

export const generatedHomes: Home[] = ["""

FOOTER = """]
"""


def render(homes):
    lines = [HEADER]
    for h in homes:
        lines.append('  {')
        lines.append(f"    name: '{esc(h['name'])}',")
        lines.append(f"    slug: '{esc(h['slug'])}',")
        lines.append(f"    category: '{esc(h['category'])}',")
        cats = ', '.join(f"'{esc(c)}'" for c in h['categories'])
        lines.append(f'    categories: [{cats}],')
        lines.append(f"    price: {h['price']},")
        lines.append(f"    area: {num(h['area'], '0')},")
        lines.append(f"    areaFt: {num(h['areaFt'], '0')},")
        lines.append(f"    dimensions: '{esc(h['dimensions'])}',")
        lines.append(f"    floors: {num(h['floors'], '1')},")
        lines.append(f"    bedrooms: {num(h['bedrooms'])},")
        lines.append(f"    bathrooms: {num(h['bathrooms'])},")
        lines.append(f"    desc: '{esc(h['desc'])}',")
        lines.append(f"    thumb: {repr(h['thumb']) if h['thumb'] else 'null'},")
        if h['gallery']:
            lines.append('    gallery: [')
            lines += [f"      '{esc(g)}'," for g in h['gallery']]
            lines.append('    ],')
        else:
            lines.append('    gallery: [],')
        lines.append('  },')
    lines.append(FOOTER)
    return '\n'.join(lines)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    homes = parse(sys.argv[1])
    OUT.write_text(render(homes).replace('"', "'"))
    images = {p for h in homes for p in ([h['thumb']] if h['thumb'] else []) + h['gallery']}
    print(f'{len(homes)} homes -> {OUT}')
    print(f'{len(images)} unique images referenced')
