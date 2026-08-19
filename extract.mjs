import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync } from 'node:fs'
const doc = await getDocument({ data: new Uint8Array(readFileSync(process.argv[2])), useSystemFonts: true }).promise
console.log(`pages: ${doc.numPages}`)
let total = 0
const pages = []
for (let i = 1; i <= doc.numPages; i++) {
  const c = await (await doc.getPage(i)).getTextContent()
  const t = c.items.map(x => x.str).join(' ').replace(/\s+/g, ' ').trim()
  total += t.length
  pages.push(t)
}
console.log(`extractable text: ${total} chars across ${doc.numPages} pages`)
console.log(`pages with no text: ${pages.filter(p => p.length < 20).length}`)
console.log('\n--- page 1 ---'); console.log(pages[0]?.slice(0, 400))
console.log('\n--- page 2 ---'); console.log(pages[1]?.slice(0, 400))
