/**
 * Pull the full-size images out of chosen pages of a PDF.
 *
 *   node scripts/extract-pdf-images.mjs <pdf> <outDir> <page> [page...]
 *
 * Written to recover the Garden Base and Garden Premium renders. Those are
 * UK-only, so they exist on tridentmodular.com and nowhere else, and that host
 * now answers image requests with a bot-protection challenge. The product
 * catalogue carries one clean render of each, so they come out of there.
 *
 * Icons, rules and logos are skipped by area; what survives is the page
 * photography. Write to a scratch directory and review before copying anything
 * into public/images/ — a catalogue page's hero is usually what you want, but
 * some pages composite several images.
 */
import { readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs'
import sharp from 'sharp'

const [pdf, outDir, ...pages] = process.argv.slice(2)
if (!pdf || !outDir || !pages.length) {
  console.error('usage: node scripts/extract-pdf-images.mjs <pdf> <outDir> <page> [page...]')
  process.exit(1)
}

/** Anything smaller than this is furniture, not photography. */
const MIN_PIXELS = 200_000

mkdirSync(outDir, { recursive: true })
const doc = await getDocument({ data: new Uint8Array(readFileSync(pdf)), useSystemFonts: true }).promise

/**
 * pdf.js resolves image objects asynchronously and offers no way to ask
 * whether one will ever arrive, so a page that references an image it cannot
 * decode would hang the run. Time each fetch out instead.
 */
const grab = (page, name) =>
  new Promise((resolve) => {
    const timer = setTimeout(() => resolve(null), 8000)
    try {
      page.objs.get(name, (obj) => {
        clearTimeout(timer)
        resolve(obj)
      })
    } catch {
      clearTimeout(timer)
      resolve(null)
    }
  })

for (const n of pages.map(Number)) {
  let page
  try {
    page = await doc.getPage(n)
  } catch (err) {
    console.log(`p${n}: ${err.message}`)
    continue
  }

  const ops = await page.getOperatorList()
  const names = new Set()
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === OPS.paintImageXObject || ops.fnArray[i] === OPS.paintJpegXObject) {
      names.add(ops.argsArray[i][0])
    }
  }

  for (const name of names) {
    try {
      const img = await grab(page, name)
      if (!img?.width) {
        console.log(`p${n} ${name}: unavailable`)
        continue
      }
      const { width, height, kind, data } = img
      if (width * height < MIN_PIXELS) continue
      // pdf.js image kinds: 2 = RGB 24bpp, 3 = RGBA 32bpp.
      const channels = kind === 3 ? 4 : kind === 2 ? 3 : 0
      if (!channels) {
        console.log(`p${n} ${name}: kind ${kind} ${width}x${height} unsupported`)
        continue
      }
      const file = join(outDir, `p${n}-${name}.webp`)
      await sharp(Buffer.from(data), { raw: { width, height, channels } })
        .resize({ width: 1600, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(file)
      console.log(`p${n} ${name}: ${width}x${height} -> ${file}`)
    } catch (err) {
      console.log(`p${n} ${name}: ${err.message.slice(0, 70)}`)
    }
  }
}
