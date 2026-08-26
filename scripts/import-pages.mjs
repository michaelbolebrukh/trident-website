/**
 * Imports selected WordPress pages into src/data/pages.json.
 *
 *   node scripts/import-pages.mjs path/to/export.xml
 *
 * The source markup is Kadence blocks — thousands of block comments and
 * framework classes that mean nothing without Kadence's stylesheet. Rather
 * than carry that over, each page is reduced to semantic HTML (headings,
 * paragraphs, lists, images, links) and styled by the site's own rules.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { XMLParser } from 'fast-xml-parser'

const XML = process.argv[2]
if (!XML) {
  console.error('usage: node scripts/import-pages.mjs <export.xml>')
  process.exit(1)
}

/** WordPress slug -> the slug this site serves it at. */
const WANTED = {
  technology: 'technology',
  'bopas-and-certificates': 'bopas-and-certificates',
  // Prose, and legally required now the site is going live. The other three
  // legal pages were rendered by a consent plugin rather than stored as post
  // content, so the export holds nothing for them.
  'privacy-policy': 'privacy-policy',
}

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@',
  cdataPropName: 'cdata',
  processEntities: true,
})
const doc = parser.parse(readFileSync(XML, 'utf8'))
const items = [].concat(doc.rss.channel.item ?? [])

const text = (v) => {
  if (v == null) return ''
  if (typeof v === 'string' || typeof v === 'number') return String(v)
  if (v.cdata != null) return String(v.cdata)
  if (v['#text'] != null) return String(v['#text'])
  return ''
}

const KEEP = new Set(['h2', 'h3', 'h4', 'p', 'ul', 'ol', 'li', 'strong', 'em', 'a', 'img', 'blockquote', 'br'])

/**
 * Reduce WordPress block markup to semantic HTML.
 *
 * Everything outside KEEP is unwrapped rather than deleted, so the text
 * inside a decorative <div> survives even though the div does not.
 */
function sanitise(html) {
  let out = html
    // Block comments carry layout data, not content.
    .replace(/<!--[\s\S]*?-->/g, '')
    // Anything that cannot render as text.
    .replace(/<(script|style|svg|iframe|noscript)[\s\S]*?<\/\1>/gi, '')

  out = out.replace(/<\/?([a-zA-Z][\w-]*)((?:[^>"']|"[^"]*"|'[^']*')*)>/g, (tag, name, attrs) => {
    const lower = name.toLowerCase()
    if (!KEEP.has(lower)) return ' '
    if (tag.startsWith('</')) return `</${lower}>`

    // Keep only the attributes that carry meaning.
    if (lower === 'a') {
      const href = attrs.match(/href\s*=\s*"([^"]*)"/i)
      return href ? `<a href="${href[1]}">` : '<a>'
    }
    if (lower === 'img') {
      const src = attrs.match(/(?:data-)?src\s*=\s*"([^"]*)"/i)
      const alt = attrs.match(/alt\s*=\s*"([^"]*)"/i)
      if (!src) return ''
      return `<img src="${src[1]}" alt="${alt ? alt[1] : ''}" loading="lazy">`
    }
    return `<${lower}>`
  })

  // Kadence puts headings in styled divs, so unwrapping leaves them as bare
  // text between elements. Re-wrap those runs rather than lose them: short and
  // unpunctuated reads as a heading, anything longer as a paragraph.
  //
  // Only runs that sit between block boundaries qualify. Matching on any '>'
  // also caught text already inside a <p> or <strong> and wrapped a heading
  // in it, which is invalid nesting and flattened well-formed pages that did
  // not need this treatment at all.
  const BLOCK_END = /(^|<\/(?:p|h2|h3|h4|ul|ol|li|blockquote)>)([^<>]{3,})(?=<|$)/g
  out = out.replace(BLOCK_END, (whole, before, run) => {
    const t = run.replace(/\s+/g, ' ').trim()
    if (!t) return before
    // Drop Ukrainian fragments: this is the English site.
    if ((t.match(/[\u0400-\u04FF]/g) || []).length > t.length * 0.3) return before
    // "No Content" is what the page builder emits for an empty header slot.
    if (/No Content/i.test(t)) return before
    const heading = t.length < 60 && !/[.!?:]$/.test(t)
    return `${before}<${heading ? 'h3' : 'p'}>${t}</${heading ? 'h3' : 'p'}>`
  })

  return out
    .replace(/[ \t]+/g, ' ')
    // Elements left empty once their wrappers were removed.
    .replace(/<(p|h2|h3|h4|li|blockquote)>\s*<\/\1>/g, '')
    .replace(/(\s*<br>\s*){2,}/g, '<br>')
    .replace(/\n{2,}/g, '\n')
    .trim()
}

const plain = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const pages = []
for (const item of items) {
  if (text(item['wp:post_type']) !== 'page') continue
  if (text(item['wp:status']) !== 'publish') continue
  const wpSlug = text(item['wp:post_name'])
  if (!(wpSlug in WANTED)) continue

  const meta = {}
  for (const m of [].concat(item['wp:postmeta'] ?? [])) {
    meta[text(m['wp:meta_key'])] = text(m['wp:meta_value'])
  }

  let html = sanitise(text(item['content:encoded']))
  // Final pass: wrappers that lost their content leave empty shells behind.
  for (let i = 0; i < 3; i++) {
    html = html
      .replace(/<(p|h2|h3|h4|li|blockquote|ul|ol)>\s*(<br>)?\s*<\/\1>/g, '')
      .replace(/\s{2,}/g, ' ')
  }
  html = html.replace(/<(h2|h3|h4|p|li)>([\s\S]*?)<\/\1>/g, (whole, tag, inner) => {
    const t = inner.replace(/<[^>]+>/g, '').trim()
    const cyrillic = (t.match(/[\u0400-\u04FF]/g) || []).length
    return cyrillic > t.length * 0.3 ? '' : whole
  })
  const body = plain(html)

  pages.push({
    slug: WANTED[wpSlug],
    legacyUrl: new URL(text(item.link)).pathname,
    title: text(item.title),
    // The stored SEO fields are Ukrainian and contain unreplaced RankMath
    // variables (%title%, %sep%), so they are not carried over. English
    // metadata is written per page in the route instead.
    seoTitle: '',
    seoDescription: '',
    excerpt: body.slice(0, 190).trim(),
    words: body.split(' ').filter(Boolean).length,
    html,
  })
}

writeFileSync('src/data/pages.json', JSON.stringify(pages, null, 1))
console.log(`${pages.length} pages -> src/data/pages.json`)
for (const p of pages) {
  console.log(`  ${p.slug.padEnd(26)} ${String(p.words).padStart(5)}w  ${(p.html.length / 1024).toFixed(1)}KB html  (was ${p.legacyUrl})`)
}
