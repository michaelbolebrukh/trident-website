import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync, writeFileSync } from 'node:fs'
const doc = await getDocument({ data: new Uint8Array(readFileSync(process.argv[2])), useSystemFonts: true }).promise
const pages = []
for (let i = 1; i <= doc.numPages; i++) {
  const c = await (await doc.getPage(i)).getTextContent()
  pages.push(c.items.map(x => x.str).join(' ').replace(/\s+/g, ' ').trim())
}
writeFileSync('/tmp/claude-0/-home-user-trident-website/18711133-a19e-597b-a8fd-6de3a5b19c5b/scratchpad/catalogue.txt', pages.map((t,i)=>`\n===== PAGE ${i+1} =====\n${t}`).join('\n'))
// Which model does each page cover?
const MODELS = ['Garden Base','Garden Premium','Garden Studio','Garden Cafe','Garden Café','Part','Riva','Mediterranean','Family House','Forest House','Country','Square of Harmony','Lake','Aqua','Chalet','Residence','ModWood','Urban','Match Point','A-frame','A-Frame','Gothic','Loft','Estate']
console.log('MODEL COVERAGE:')
for (const m of MODELS) {
  const hits = pages.map((t,i)=>t.includes(m)?i+1:0).filter(Boolean)
  if (hits.length) console.log(`  ${m.padEnd(20)} pages ${hits.slice(0,8).join(', ')}${hits.length>8?' …':''}`)
}
console.log('\nSPEC KEYWORDS:')
for (const k of ['bedroom','bathroom','U-value','BOPAS','warranty','guarantee','lead time','delivery','foundation','heating','ventilation','glazing','insulation','terrace','kitchen'])
  console.log(`  ${k.padEnd(14)} ${pages.filter(t=>t.toLowerCase().includes(k.toLowerCase())).length} pages`)
