import { readFileSync, mkdirSync } from 'node:fs'
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs'
import sharp from 'sharp'

const OUT = '/tmp/claude-0/-home-user-trident-website/18711133-a19e-597b-a8fd-6de3a5b19c5b/scratchpad/pdfimg'
mkdirSync(OUT, { recursive: true })
const doc = await getDocument({ data: new Uint8Array(readFileSync('public/trident-catalogue.pdf')), useSystemFonts: true }).promise

const grab = (page, name) =>
  new Promise((res) => {
    const t = setTimeout(() => res(null), 8000)
    try { page.objs.get(name, (o) => { clearTimeout(t); res(o) }) }
    catch { clearTimeout(t); res(null) }
  })

for (const n of process.argv.slice(2).map(Number)) {
  let page
  try { page = await doc.getPage(n) } catch (e) { console.log(`p${n}: ${e.message}`); continue }
  const ops = await page.getOperatorList()
  const names = new Set()
  for (let i = 0; i < ops.fnArray.length; i++) {
    if (ops.fnArray[i] === OPS.paintImageXObject || ops.fnArray[i] === OPS.paintJpegXObject) names.add(ops.argsArray[i][0])
  }
  for (const name of names) {
    try {
      const img = await grab(page, name)
      if (!img || !img.width) { console.log(`p${n} ${name}: unavailable`); continue }
      const { width, height, kind, data } = img
      if (width * height < 200000) continue          // skip icons and rules
      const channels = kind === 3 ? 4 : kind === 2 ? 3 : 0
      if (!channels) { console.log(`p${n} ${name}: kind ${kind} ${width}x${height} unsupported`); continue }
      const file = `${OUT}/p${n}-${name}.webp`
      await sharp(Buffer.from(data), { raw: { width, height, channels } })
        .resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(file)
      console.log(`p${n} ${name}: ${width}x${height} -> ${file.split('/').pop()}`)
    } catch (e) { console.log(`p${n} ${name}: ${e.message.slice(0, 60)}`) }
  }
}
