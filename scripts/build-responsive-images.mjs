/**
 * Responsive variants for the photo libraries under public/images/.
 *
 * Every image there is served at its full size (1200–2048 px) whatever the
 * slot, so a 400 px catalogue card pulls a 280 KB file. This script writes
 * narrower copies next to the originals, in an `r/` folder, and a manifest
 * of intrinsic sizes that src/lib/images.ts turns into srcset/sizes.
 *
 * Runs automatically before `astro build` (see "prebuild" in package.json)
 * and is safe to re-run: a variant is only rewritten when its source is
 * newer. The variants are git-ignored; the manifest is committed so that
 * `astro dev` and type-checking work without a prior build.
 *
 *   node scripts/build-responsive-images.mjs
 */
import sharp from 'sharp'
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = new URL('../', import.meta.url).pathname
const PUBLIC = path.join(ROOT, 'public')
const DIRS = ['images/library', 'images/projects']
const WIDTHS = [480, 768, 1024, 1440]
const MANIFEST = path.join(ROOT, 'src/data/image-sizes.generated.json')

const manifest = {}
let written = 0
let skipped = 0

for (const dir of DIRS) {
  const abs = path.join(PUBLIC, dir)
  const out = path.join(abs, 'r')
  await mkdir(out, { recursive: true })
  const files = (await readdir(abs)).filter((f) => f.endsWith('.webp')).sort()

  for (const file of files) {
    const src = path.join(abs, file)
    const srcStat = await stat(src)
    const { width, height } = await sharp(src).metadata()
    if (!width || !height) continue

    const base = file.replace(/\.webp$/, '')
    const variants = WIDTHS.filter((w) => w < width)
    for (const w of variants) {
      const dest = path.join(out, `${base}-${w}.webp`)
      const fresh = await stat(dest).then((s) => s.mtimeMs >= srcStat.mtimeMs, () => false)
      if (fresh) {
        skipped++
        continue
      }
      await sharp(src).resize({ width: w }).webp({ quality: 78 }).toFile(dest)
      written++
    }
    manifest[`/${dir}/${file}`] = { w: width, h: height, v: variants }
  }
}

const lines = Object.entries(manifest).map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`)
await writeFile(MANIFEST, `{\n${lines.join(',\n')}\n}\n`)
console.log(`responsive images: ${written} written, ${skipped} up to date, ${Object.keys(manifest).length} in manifest`)
