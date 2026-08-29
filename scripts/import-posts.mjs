/**
 * Imports published blog posts from a WordPress export into
 * src/data/posts.json.
 *
 *   node scripts/import-posts.mjs path/to/export.xml
 *
 * Post bodies are kept as HTML rather than converted to markdown: the aim is a
 * like-for-like migration, and round-tripping through markdown would quietly
 * drop formatting that is currently indexed.
 *
 * JSON rather than a .ts module so that 19k words of HTML need no escaping.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { XMLParser } from 'fast-xml-parser'

const XML = process.argv[2]
if (!XML) {
  console.error('usage: node scripts/import-posts.mjs <export.xml>')
  process.exit(1)
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

/** Attachment id -> URL, for resolving featured images. */
const attachments = new Map()
for (const item of items) {
  if (text(item['wp:post_type']) === 'attachment') {
    attachments.set(String(text(item['wp:post_id'])), text(item['wp:attachment_url']))
  }
}

const metaOf = (item) => {
  const out = {}
  for (const m of [].concat(item['wp:postmeta'] ?? [])) {
    out[text(m['wp:meta_key'])] = text(m['wp:meta_value'])
  }
  return out
}

// Inline images point at tridentmodular.com/wp-content/uploads/, which this
// site does not serve. Rewrite each to the local copy where we hold one, and
// drop the tag where we do not — a missing figure reads better than a broken
// one. docs/missing-images.txt records what still needs supplying.
import imageMapJson from '../src/data/image-map.json' with { type: 'json' }
const imageMap = imageMapJson

function localImage(src) {
  const rel = decodeURIComponent((src.split('wp-content/uploads/')[1] ?? ''))
  if (!rel) return null
  const base = rel.replace(/-\d+x\d+(\.[a-z]+)$/i, '$1')
  return imageMap[rel] ?? imageMap[base] ?? null
}

/** Strip Gutenberg block comments, resolve images, normalise whitespace. */
function cleanHtml(html) {
  return html
    .replace(/<!--\s*\/?wp:[^>]*?-->/g, '')
    .replace(/<img\b[^>]*\bsrc="([^"]+)"[^>]*>/gi, (tag, src) => {
      if (!src.includes('wp-content/uploads')) return tag
      const local = localImage(src)
      if (!local) return ''
      const alt = tag.match(/alt="([^"]*)"/i)
      return `<img src="${local}" alt="${alt ? alt[1] : ''}" loading="lazy">`
    })
    // One post embeds a video from the same host; a player that can never
    // load is worse than nothing. Note it in docs/missing-images.txt.
    .replace(/<video\b[^>]*\bsrc="[^"]*wp-content\/uploads[^"]*"[^>]*>\s*<\/video>/gi, '')
    // A figure that lost its image should not leave an empty box behind.
    .replace(/<figure[^>]*>\s*(<figcaption[\s\S]*?<\/figcaption>)?\s*<\/figure>/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const plain = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()

const posts = []
for (const item of items) {
  if (text(item['wp:post_type']) !== 'post') continue
  if (text(item['wp:status']) !== 'publish') continue

  const meta = metaOf(item)
  const html = cleanHtml(text(item['content:encoded']))
  const body = plain(html)
  const slug = text(item['wp:post_name'])
  const date = text(item['wp:post_date'])

  posts.push({
    slug,
    title: text(item.title),
    // The path the post is published at today. Kept so redirects can be
    // generated from the data rather than hand-maintained.
    legacyUrl: new URL(text(item.link)).pathname,
    date: date.replace(' ', 'T'),
    seoTitle: meta.rank_math_title || meta._yoast_wpseo_title || '',
    seoDescription: meta.rank_math_description || meta._yoast_wpseo_metadesc || '',
    // Fall back to the opening sentences where no description was written.
    excerpt: (meta.rank_math_description || meta._yoast_wpseo_metadesc || body).slice(0, 190).trim(),
    image: attachments.get(meta._thumbnail_id) ?? null,
    words: body.split(' ').filter(Boolean).length,
    html,
  })
}

posts.sort((a, b) => b.date.localeCompare(a.date))

mkdirSync('src/data', { recursive: true })
writeFileSync('src/data/posts.json', JSON.stringify(posts, null, 1))

console.log(`${posts.length} posts -> src/data/posts.json`)
console.log(`${posts.reduce((n, p) => n + p.words, 0).toLocaleString()} words total\n`)
for (const p of posts.slice(0, 5)) {
  console.log(`  ${p.date.slice(0, 10)}  ${String(p.words).padStart(4)}w  ${p.title.slice(0, 58)}`)
}
console.log(`  … and ${posts.length - 5} more`)
const noImage = posts.filter((p) => !p.image).length
if (noImage) console.log(`\n  ${noImage} posts without a featured image`)
