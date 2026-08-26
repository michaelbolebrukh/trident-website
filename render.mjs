import { readFileSync, writeFileSync } from 'node:fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { createCanvas } from '@napi-rs/canvas'
const doc = await getDocument({ data: new Uint8Array(readFileSync('public/trident-catalogue.pdf')), useSystemFonts: true }).promise
for (const n of process.argv.slice(2).map(Number)) {
  const page = await doc.getPage(n)
  const vp = page.getViewport({ scale: 1.6 })
  const c = createCanvas(vp.width, vp.height)
  await page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise
  const f = `/tmp/claude-0/-home-user-trident-website/18711133-a19e-597b-a8fd-6de3a5b19c5b/scratchpad/pg${n}.png`
  writeFileSync(f, c.toBuffer('image/png'))
  console.log('rendered', f)
}
