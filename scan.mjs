import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
const doc = await getDocument({ data: new Uint8Array((await import('node:fs')).readFileSync(process.argv[2])), useSystemFonts: true }).promise
console.log('pages:', doc.numPages)
const hits = []
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i)
  const txt = (await page.getTextContent()).items.map(t => t.str).join(' ')
  if (/garden\s*(base|premium|studio|room)/i.test(txt)) {
    hits.push([i, txt.replace(/\s+/g, ' ').slice(0, 110)])
  }
}
console.log('pages mentioning garden products:', hits.length)
for (const [n, t] of hits) console.log(`  p${n}: ${t}`)
