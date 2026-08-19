/**
 * Downloads floor plan sheets and stores them locally as WebP.
 *
 *   node scripts/fetch-plans.mjs
 *
 * Plans come from the `tab_2_picture` / `tab_3_picture` fields of the
 * WordPress export, extracted to scratch/plans.json by the caller.
 *
 * They are fetched from tridentmodular.com.ua rather than tridentmodular.com:
 * the two sites share a media library, but .com sits behind bot protection
 * that answers with a captcha, while .ua serves the identical files.
 *
 * Output goes to public/images/plans/ so the site serves its own copies, which
 * is what the rest of the imagery still needs before the DNS cutover.
 */
import { mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const SOURCE = process.argv[2] ?? 'plans.json'
const OUT_DIR = 'public/images/plans'
const HOST = 'https://tridentmodular.com.ua'

const plans = JSON.parse(readFileSync(SOURCE, 'utf8'))
mkdirSync(OUT_DIR, { recursive: true })

/** Stable, readable filename: <slug>-plan-1.webp */
const nameFor = (slug, index) => `${slug}-plan-${index + 1}.webp`

const manifest = {}
let fetched = 0
let skipped = 0
let failed = []
let bytesIn = 0
let bytesOut = 0

for (const [slug, urls] of Object.entries(plans)) {
  const files = []
  for (const [index, url] of urls.entries()) {
    const out = nameFor(slug, index)
    const path = join(OUT_DIR, out)

    if (existsSync(path)) {
      files.push(`/images/plans/${out}`)
      skipped++
      continue
    }

    // Same path, reachable host.
    const src = url.replace('https://tridentmodular.com/', `${HOST}/`)
    try {
      const res = await fetch(src)
      if (!res.ok) {
        failed.push(`${slug}: HTTP ${res.status} ${src}`)
        continue
      }
      const buf = Buffer.from(await res.arrayBuffer())
      bytesIn += buf.length
      // Plans are line drawings; keep them legible but not enormous.
      const webp = await sharp(buf).resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 88 }).toBuffer()
      bytesOut += webp.length
      writeFileSync(path, webp)
      files.push(`/images/plans/${out}`)
      fetched++
    } catch (err) {
      failed.push(`${slug}: ${err.message} ${src}`)
    }
  }
  if (files.length) manifest[slug] = files
}

const ts = [
  '/**',
  ' * Floor plan sheets, served from public/images/plans/.',
  ' *',
  ' * GENERATED — do not hand-edit. Re-run: node scripts/fetch-plans.mjs',
  ' */',
  '',
  'export const floorPlans: Record<string, string[]> = {',
  ...Object.entries(manifest).map(
    ([slug, files]) => `  '${slug}': [${files.map((f) => `'${f}'`).join(', ')}],`,
  ),
  '}',
  '',
  'export const plansFor = (slug: string): string[] => floorPlans[slug] ?? []',
  '',
].join('\n')

writeFileSync('src/data/floor-plans.ts', ts)

const mb = (n) => (n / 1024 / 1024).toFixed(2)
console.log(`${Object.keys(manifest).length} models, ${fetched} downloaded, ${skipped} already present`)
if (bytesIn) console.log(`${mb(bytesIn)}MB -> ${mb(bytesOut)}MB WebP`)
if (failed.length) {
  console.log(`\n${failed.length} failed:`)
  for (const f of failed) console.log('  ' + f)
}
