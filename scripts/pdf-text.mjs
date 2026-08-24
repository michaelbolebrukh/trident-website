/**
 * Prints the text of a PDF, page by page.
 *
 *   node scripts/pdf-text.mjs <file.pdf> [firstPage] [lastPage]
 *
 * Used to read the price guides, the catalogue and the pricing sheet, all of
 * which arrive as PDFs and carry figures that end up on the site. Keeping it
 * here means those numbers can be re-checked against their source rather than
 * trusted from memory.
 *
 * Text order follows the PDF's internal order, which is not always visual
 * order — tables in particular can place a caption before or after the rows.
 */
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync } from 'node:fs'

const [file, from, to] = process.argv.slice(2)
if (!file) {
  console.error('usage: node scripts/pdf-text.mjs <file.pdf> [firstPage] [lastPage]')
  process.exit(1)
}

const doc = await getDocument({
  data: new Uint8Array(readFileSync(file)),
  useSystemFonts: true,
}).promise

const first = Math.max(1, Number(from) || 1)
const last = Math.min(doc.numPages, Number(to) || doc.numPages)

for (let i = first; i <= last; i++) {
  const content = await (await doc.getPage(i)).getTextContent()
  console.log(`\n===== PAGE ${i}/${doc.numPages} =====`)
  console.log(content.items.map((x) => x.str).join(' ').replace(/\s+/g, ' ').trim())
}
