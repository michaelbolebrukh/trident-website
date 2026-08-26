/**
 * Downloads every image the site references and stores it locally as WebP.
 *
 *   node scripts/fetch-images.mjs
 *
 * The site used to hotlink tridentmodular.com. That host now answers image
 * requests with a bot-protection challenge instead of the file, so the images
 * broke for everyone. The .ua site shares the same media library and serves
 * them, so they are fetched from there and committed, and the site stops
 * depending on any external host.
 *
 * Covers model thumbnails and galleries (homes.generated.ts) and blog featured
 * images (posts.json).
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT_DIR = 'public/images/library'
const SOURCE = 'https://tridentmodular.com.ua'
const OLD_PREFIX = 'https://tridentmodular.com/wp-content/uploads/'

mkdirSync(OUT_DIR, { recursive: true })

/** "2026/06/ext_1_color_1_s_.jpg" -> "2026-06-ext_1_color_1_s_.webp" */
const localName = (path) =>
  path.replace(/\.[a-z]+$/i, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '') + '.webp'

// Every relative path referenced by the model data.
const homes = readFileSync('src/data/homes.generated.ts', 'utf8')
const modelPaths = [...homes.matchAll(/'((?:\d{4}\/\d{2}|wp-content)\/[^']+\.(?:jpe?g|png|webp))'/gi)]
  .map((m) => m[1])

// Blog featured images are stored as absolute URLs.
const posts = JSON.parse(readFileSync('src/data/posts.json', 'utf8'))
const postPaths = posts
  .map((p) => p.image)
  .filter(Boolean)
  .map((u) => u.replace(OLD_PREFIX, ''))

const all = [...new Set([...modelPaths, ...postPaths])]

let fetched = 0
let skipped = 0
let bytesIn = 0
let bytesOut = 0
const failed = []

for (const path of all) {
  const out = localName(path)
  const dest = join(OUT_DIR, out)
  if (existsSync(dest)) {
    skipped++
    continue
  }
  try {
    const res = await fetch(`${SOURCE}/wp-content/uploads/${path}`)
    if (!res.ok) {
      failed.push({ path, status: res.status })
      continue
    }
    const buf = Buffer.from(await res.arrayBuffer())
    bytesIn += buf.length
    // 1600px is beyond any slot the site renders these into.
    const webp = await sharp(buf)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer()
    bytesOut += webp.length
    writeFileSync(dest, webp)
    fetched++
  } catch (err) {
    failed.push({ path, status: err.message })
  }
}

// A lookup from the original relative path to the local file, so the data
// files keep their existing paths and only resolution changes.
const map = {}
for (const path of all) {
  const dest = join(OUT_DIR, localName(path))
  if (existsSync(dest)) map[path] = `/images/library/${localName(path)}`
}

writeFileSync(
  'src/data/image-map.json',
  JSON.stringify(map, null, 1),
)

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`${all.length} referenced, ${fetched} downloaded, ${skipped} already present`)
console.log(`${Object.keys(map).length} resolve locally, ${all.length - Object.keys(map).length} unavailable`)
if (bytesIn) console.log(`${mb(bytesIn)}MB -> ${mb(bytesOut)}MB WebP`)
if (failed.length) {
  console.log(`\n${failed.length} could not be fetched:`)
  for (const f of failed.slice(0, 15)) console.log(`  ${f.status}  ${f.path}`)
}
