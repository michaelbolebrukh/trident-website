#!/usr/bin/env python3
"""
Regenerates the migration redirect block in public/.htaccess.

    python3 scripts/build-redirects.py path/to/export.xml

Model and blog redirects are pattern rules, so they cover every item without
being listed one by one. Page redirects are explicit, because each old page
needs a judgement about where its traffic should now land.

Pages with no equivalent are sent to the closest relevant page rather than
left to 404 — but only where the destination genuinely serves the same intent.
A redirect to something unrelated is treated by search engines as a soft 404
and helps nobody.
"""
import re
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from urllib.parse import urlparse

NS = {'wp': 'http://wordpress.org/export/1.2/'}
HTACCESS = Path(__file__).resolve().parent.parent / 'public' / '.htaccess'


# Model slugs the pre-2026 site used under /houses/. The trailing number is the
# floor area it advertised at the time, which does not match today's figures
# (the old Lake was 72 m2 and is now 114), so these are matched on name and
# confirmed against src/data/homes.generated.ts rather than on the number.
LEGACY_MODEL_SLUGS = {
    'lake-house-72': 'lake',
    'the-residence-140': 'the-residence',
    'mediterranean-single-26': 'mediterranean-single-house',
    'mediterraneanhouse-28': 'mediterranean-single-house',
    'mediterranean-double-52': 'mediterranean-double-house',
    'forest-house-59': 'forest-house',
    'family-house-60': 'family-house',
    'country-house-63': 'country',
    'self-contained-garden-studio': 'garden-studio',
}

# No confident match, so these go to the range rather than to a guess:
#   the-zen-bungalow    no Zen model exists, and no area to match on
#   the-urban-loft-cube names two current models, Urban and Loft, and its
#                       143 m2 matches neither (127.6 and 227.6)
#   granny-annex-44     Granny Annexes was a category on the old site, not a
#                       model, and no category replaces it here
LEGACY_MODEL_TO_INDEX = [
    'the-zen-bungalow',
    'the-urban-loft-cube',
    'granny-annex-44',
]

# Old page path -> where its traffic should now go.
PAGE_MAP = {
    # Pages the new site serves at their old URL are absent from this map on
    # purpose: they need no rule. Keeping the URL beats redirecting to a
    # tidier one, so /about_us/, /contact-us/, /customise-your-build/,
    # /houses-type/ and every /houses/<slug>/ model page stay put.
    '/commercial/': '/customise-your-build/#support',
    '/eco-modular-homes/': '/customise-your-build/#sustainable',
    '/modular-building-company-uk/': '/about_us/',
    '/self-build-modular-homes/': '/houses/',
    '/modular-home-cost-uk/': '/modular-homes-prices/',
    '/london/': '/houses/',
    # The catalogue lives at /houses/ alongside the models it lists. The old
    # taxonomy index redirects into it; the per-category pages under it keep
    # their own URLs.
    '/houses-type/': '/houses/',
    '/installation/our-solution/': '/installation/',
    '/installation/permissions-for-modular-building/': '/faq/',
    '/installation/garden-office-with-electrics/': '/houses/garden-studio/',
    # One cookie policy now covers both, since UK and EU rules are aligned on
    # the point that matters here: consent before a non-essential cookie.
    '/cookie-policy-uk/': '/cookie-policy/',
    '/cookie-policy-eu/': '/cookie-policy/',
    '/get-a-quote/': '/contact-us/',
    '/shop/': '/houses/',
    '/download/': '/houses/',
    '/bopas-and-mortgages/': '/bopas-and-certificates/',
    '/homepage/': '/',
    # WooCommerce pages from the old shop. Nothing replaces them.
    '/my-account/': '/',
    '/cart/': '/',
    '/checkout/': '/',
    '/installation/installation-of-a-garden-room-with-electricity/': '/installation/',
    '/category/': '/blog/',
    '/tag/': '/blog/',
    '/example-product-page/': '/houses/',
    # These existed only in Ukrainian. They are not recreated; their traffic
    # goes to the English page covering the same ground.
    '/vyrobnycztvo/': '/technology/',
    '/proyektuvannya/': '/customise-your-build/',
    '/gotovi-proyekty-karkasnyh-budynkiv/': '/gallery/',
    '/gotovi-proyekty-modulnyh-budynkiv/': '/gallery/',
}

# Old paths deliberately left to 404: no page on the new site serves the same
# purpose, and redirecting them somewhere unrelated would be worse than a 404.
UNMAPPED_OK = set()

# Old paths the new site serves at the identical URL, so no rule is needed and
# no ranking is at risk.
UNCHANGED = {
    '/',
    '/blog/',
    '/installation/',
    '/technology/',
    '/bopas-and-certificates/',
    '/about_us/',
    '/contact-us/',
    '/customise-your-build/',
    '/privacy-policy/',
    '/terms-and-conditions/',
}

BLOCK_START = '# ─── Migration redirects (301) ───'


def old_paths(xml_path):
    root = ET.parse(xml_path).getroot()
    found = {'page': [], 'houses': [], 'post': [], 'case-study': []}
    for item in root.iter('item'):
        kind = item.findtext('wp:post_type', default='', namespaces=NS)
        if kind not in found:
            continue
        if item.findtext('wp:status', default='', namespaces=NS) != 'publish':
            continue
        link = item.findtext('link') or ''
        if link.startswith('http'):
            found[kind].append(urlparse(link).path)
    return found


def render(found):
    lines = [
        '',
        BLOCK_START,
        '# Generated by scripts/build-redirects.py from the WordPress export.',
        '# A permanent redirect passes ranking signals to the new URL; without these',
        '# every indexed page would 404 at cutover.',
        '<IfModule mod_rewrite.c>',
        '  RewriteEngine On',
        '',
        f"  # All {len(found['houses'])} models keep their /houses/<slug>/ URL, so no",
        '  # rule is needed for them. /catalogue/ was used while the site was in',
        '  # development and is folded back in here.',
        '  RewriteRule ^catalogue/([^/]+)/?$ /houses/$1/ [R=301,L]',
        '  RewriteRule ^catalogue/?$ /houses/ [R=301,L]',
        '  RewriteRule ^about/?$ /about_us/ [R=301,L]',
        '  RewriteRule ^contact/?$ /contact-us/ [R=301,L]',
        '  RewriteRule ^bespoke/?$ /customise-your-build/ [R=301,L]',
        '',
        f"  # {len(found['post'])} blog posts lost their placeholder category segment.",
        '  RewriteRule ^blog/uncategorized-en_gb/(.+)$ /blog/$1 [R=301,L]',
        '',
        '  # Model slugs from the pre-2026 site.',
    ]
    for src, dst in sorted(LEGACY_MODEL_SLUGS.items()):
        lines.append(f'  RewriteRule ^houses/{src}/?$ /houses/{dst}/ [R=301,L]')
    for src in sorted(LEGACY_MODEL_TO_INDEX):
        lines.append(f'  RewriteRule ^houses/{src}/?$ /houses/ [R=301,L]')

    lines += [
        '',
        '  # Pages that moved or were folded into another page.',
    ]
    for src, dst in sorted(PAGE_MAP.items()):
        pattern = '^' + src.strip('/').replace('.', r'\.') + '/?$'
        lines.append(f'  RewriteRule {pattern} {dst} [R=301,L]')

    lines += [
        '',
        f"  # {len(found['case-study'])} case studies are not carried over individually;",
        '  # the gallery replaces them.',
        '  RewriteRule ^case-study/(.*)$ /gallery/ [R=301,L]',
        '',
        '  # The old tag archive under /houses-tag/ has no equivalent.',
        '  RewriteRule ^houses-tag(/.*)?$ /houses/ [R=301,L]',
        '',
        '  # WordPress appended /feed/ to every archive and single. Send each',
        '  # back to the page it belonged to. (.+) not (.*), so a bare /feed/',
        '  # cannot produce a doubled slash; it is handled on the line after.',
        '  RewriteRule ^(.+)/feed/?$ /$1/ [R=301,L]',
        '  RewriteRule ^feed/?$ / [R=301,L]',
        '',
        '  # WordPress internals. These are gone for good rather than moved, so',
        '  # 410 tells a crawler to drop them instead of retrying a 404.',
        '  RewriteRule ^wp-content(/.*)?$ - [G,L]',
        '  RewriteRule ^wp-json(/.*)?$ - [G,L]',
        '</IfModule>',
        '',
    ]
    return '\n'.join(lines)


if __name__ == '__main__':
    if len(sys.argv) != 2:
        sys.exit(__doc__)

    found = old_paths(sys.argv[1])
    text = HTACCESS.read_text()
    text = re.sub(rf'\n{re.escape(BLOCK_START)}.*?</IfModule>\n', '', text, flags=re.S)
    text = text.replace('# Astro emits the 404', render(found) + '# Astro emits the 404')
    HTACCESS.write_text(text)

    covered = set(PAGE_MAP) | UNMAPPED_OK | UNCHANGED
    missing = [p for p in found['page'] if p not in covered]
    print(f"{len(found['houses'])} models, {len(found['post'])} posts, "
          f"{len(found['case-study'])} case studies, {len(PAGE_MAP)} pages redirected")
    print(f'{len(UNCHANGED)} pages kept at the same URL, no redirect needed')
    print(f'{len(UNMAPPED_OK)} pages deliberately left to 404 (no equivalent yet)')
    if missing:
        print('\nold pages with no rule and no decision recorded:')
        for p in missing:
            print('  ' + p)
