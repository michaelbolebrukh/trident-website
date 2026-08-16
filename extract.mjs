import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync } from 'node:fs'

const file = process.argv[2]
const doc = await getDocument({ data: new Uint8Array(readFileSync(file)), useSystemFonts: true }).promise
console.log(`### ${file.split('/').pop()}  (${doc.numPages} pages)`)
for (let i = 1; i <= doc.numPages; i++) {
  const page = await doc.getPage(i)
  const content = await page.getTextContent()
  let line = '', out = [], lastY = null
  for (const item of content.items) {
    if (!item.str) continue
    const y = Math.round(item.transform[5])
    if (lastY !== null && Math.abs(y - lastY) > 3) { out.push(line.trim()); line = '' }
    line += item.str + (item.hasEOL ? '' : ' ')
    lastY = y
  }
  out.push(line.trim())
  console.log(`\n--- page ${i} ---`)
  console.log(out.filter(Boolean).join('\n'))
}
