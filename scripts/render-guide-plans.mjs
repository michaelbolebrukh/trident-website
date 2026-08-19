import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { createCanvas } from '@napi-rs/canvas'
import { readFileSync, writeFileSync } from 'node:fs'
import sharp from 'sharp'

const PDF = process.argv[2]
const doc = await getDocument({ data: new Uint8Array(readFileSync(PDF)), useSystemFonts: true }).promise

// Pages 2-5 are Base 6 / 9 / 12 / 15, each with a schematic plan in the upper
// third. Crop that band, then trim the surrounding white so the drawing is
// tightly framed whatever its proportions.
const out = []
for (let p = 2; p <= 5; p++) {
  const page = await doc.getPage(p)
  const vp = page.getViewport({ scale: 2.5 })
  const canvas = createCanvas(vp.width, vp.height)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, vp.width, vp.height)
  await page.render({ canvasContext: ctx, viewport: vp, canvas }).promise

  const png = canvas.toBuffer('image/png')
  const band = { left: 210, top: 262, width: 1070, height: 622 }
  const file = `public/images/plans/base-model-plan-${p - 1}.webp`
  await sharp(png)
    .extract(band)
    .trim({ threshold: 5 })
    .extend({ top: 30, bottom: 30, left: 30, right: 30, background: '#ffffff' })
    .webp({ quality: 90 })
    .toFile(file)
  out.push(file)
  console.log('  wrote', file)
}
