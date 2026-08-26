import { readFileSync } from 'node:fs'
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
const doc = await getDocument({ data: new Uint8Array(readFileSync('public/trident-catalogue.pdf')), useSystemFonts: true }).promise
for (const n of process.argv.slice(2).map(Number)) {
  const t = (await (await doc.getPage(n)).getTextContent()).items.map(i => i.str).join(' ').replace(/\s+/g, ' ')
  console.log(`\n=== p${n} ===\n${t.slice(0, 300)}`)
}
