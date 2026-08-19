/**
 * Extracts room schedules from the Trident catalogue PDF into
 * src/data/catalogue-specs.ts.
 *
 *   node scripts/import-catalogue.mjs public/downloads/trident-catalogue.pdf
 *
 * Only models already listed on the site are imported — the catalogue is the
 * Ukrainian edition and carries models not sold in the UK.
 *
 * Bedroom and bathroom counts are derived from the room schedule rather than
 * read from a field, because the catalogue does not state them directly.
 */
import { getDocument } from 'pdfjs-dist/legacy/build/pdf.mjs'
import { readFileSync, writeFileSync } from 'node:fs'

const PDF = process.argv[2]
if (!PDF) {
  console.error('usage: node scripts/import-catalogue.mjs <catalogue.pdf>')
  process.exit(1)
}

/** Catalogue heading -> the site's catalogue slug. */
const SLUGS = {
  'GARDEN BASE': 'base-model',
  'GARDEN PREMIUM': 'premium-model',
  'GARDEN STUDIO': 'garden-studio',
  'MODWOOD CAFE': 'modwood-cafe',
  PART: 'part',
  RIVA: 'riva',
  FOREST: 'forest-house',
  COUNTRY: 'country',
  'SQUARE OF HARMONY': 'square-of-harmony',
  LAKE: 'lake',
  AQUA: 'aqua',
  CHALET: 'chalet',
  URBAN: 'urban',
  'MATCH POINT': 'match-point',
  GOTHIC: 'gothic',
  LOFT: 'loft',
  ESTATE: 'estate',
}

const doc = await getDocument({
  data: new Uint8Array(readFileSync(PDF)),
  useSystemFonts: true,
}).promise

const pages = []
for (let i = 1; i <= doc.numPages; i++) {
  const content = await (await doc.getPage(i)).getTextContent()
  pages.push(content.items.map((x) => x.str).join(' ').replace(/\s+/g, ' ').trim())
}

/** "1 Kitchen-living room 14,46 2 Bathroom 2,52" -> [{name, area}] */
function parseRooms(block) {
  const rooms = []
  const re = /(\d{1,2})\s+([A-Za-z][A-Za-z\-' ]{2,40}?)\s+(\d+[.,]\d+)/g
  let m
  while ((m = re.exec(block))) {
    rooms.push({ name: m[2].trim(), area: parseFloat(m[3].replace(',', '.')) })
  }
  return rooms
}

const countMatching = (rooms, re) => rooms.filter((r) => re.test(r.name)).length

const results = {}
for (const [heading, slug] of Object.entries(SLUGS)) {
  for (const [index, body] of pages.entries()) {
    if (!body.includes(`· ${heading} ·`) || !body.includes('PREMISES AREA')) continue

    const block = body.match(/PLANNING (.*?)# PREMISES AREA/s)
    if (!block) continue

    const rooms = parseRooms(block[1])
    if (!rooms.length) continue

    results[slug] = {
      page: index + 1,
      rooms,
      // "Master bedroom" counts as a bedroom; "Master wardrobe room" must not.
      bedrooms: countMatching(rooms, /bedroom/i),
      bathrooms: countMatching(rooms, /bathroom|shower room|wc/i),
      totalArea: Number(rooms.reduce((sum, r) => sum + r.area, 0).toFixed(2)),
    }
    break
  }
}

const lines = [
  '/**',
  ' * Room schedules taken from the Trident catalogue PDF.',
  ' *',
  ' * GENERATED — do not hand-edit. Re-run:',
  ' *   node scripts/import-catalogue.mjs public/downloads/trident-catalogue.pdf',
  ' *',
  ' * Bedroom and bathroom counts are derived by classifying room names, since',
  ' * the catalogue states neither directly.',
  ' */',
  '',
  'export interface Room {',
  '  name: string',
  '  /** Floor area in m². */',
  '  area: number',
  '}',
  '',
  'export interface CatalogueSpec {',
  '  /** Page in the catalogue this came from, for checking against the source. */',
  '  page: number',
  '  rooms: Room[]',
  '  bedrooms: number',
  '  bathrooms: number',
  '  /** Sum of the scheduled rooms; usable rather than external area. */',
  '  totalArea: number',
  '}',
  '',
  'export const catalogueSpecs: Record<string, CatalogueSpec> = {',
]

for (const [slug, spec] of Object.entries(results)) {
  lines.push(`  '${slug}': {`)
  lines.push(`    page: ${spec.page},`)
  lines.push(`    bedrooms: ${spec.bedrooms},`)
  lines.push(`    bathrooms: ${spec.bathrooms},`)
  lines.push(`    totalArea: ${spec.totalArea},`)
  lines.push('    rooms: [')
  for (const r of spec.rooms) {
    lines.push(`      { name: '${r.name.replace(/'/g, "\\'")}', area: ${r.area} },`)
  }
  lines.push('    ],')
  lines.push('  },')
}
lines.push('}')
lines.push('')
lines.push('export const specFor = (slug: string): CatalogueSpec | undefined => catalogueSpecs[slug]')
lines.push('')

writeFileSync('src/data/catalogue-specs.ts', lines.join('\n'))

console.log(`${Object.keys(results).length} of ${Object.keys(SLUGS).length} models matched\n`)
for (const [slug, s] of Object.entries(results)) {
  console.log(
    `  ${slug.padEnd(20)} p${String(s.page).padStart(2)}  ` +
      `${s.rooms.length} rooms  ${s.bedrooms} bed  ${s.bathrooms} bath  ${s.totalArea} m²`,
  )
}
const missing = Object.values(SLUGS).filter((s) => !results[s])
if (missing.length) console.log('\n  no schedule found for:', missing.join(', '))
