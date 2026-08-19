/**
 * Editorial corrections applied on top of the WordPress export.
 *
 * Source: customer team review, changes_final_v2.docx (19 Aug 2026), approved
 * by Oleg. These live here rather than in homes.generated.ts so that
 * re-running scripts/import-houses.py cannot overwrite them.
 *
 * Classification follows Trident's four primary classes — Garden Rooms,
 * Bungalows, 1.5 Storey Houses, 2 Storey Houses. Form decides the class, not
 * use: a floating home or a commercial unit on a single storey is still a
 * bungalow. Anything else (Log Houses, Tiny Homes & Pod Homes) is secondary.
 */
import type { Home } from './homes.generated'

export type HomeOverride = Partial<Omit<Home, 'slug'>>

export const overrides: Record<string, HomeOverride> = {
  // ─── Classification ───────────────────────────────────────────────────
  // Had no primary class at all, so fell into "Other" in the catalogue.
  'a-frame': {
    name: 'A-Frame',
    category: '2 Storey Houses',
    categories: ['2 Storey Houses'],
    desc: 'Your countryside escape, featuring two floors, multiple terraces and panoramic views.',
  },
  urban: {
    category: '2 Storey Houses',
    categories: ['2 Storey Houses'],
    desc: 'Your countryside escape, featuring two floors, multiple terraces and panoramic views.',
  },

  // Classed as 2 Storey and described as two-storey, but the export's floors
  // field said 1. The field was wrong.
  chalet: {
    floors: 2,
    desc: 'A spacious two-storey timber-frame house with a layout suited for a family, where everyone has their own space.',
  },
  gothic: {
    floors: 2,
    desc: 'A luxury two-storey house with a spacious terrace, a master bedroom and a study, representing comfortable country living without limits.',
  },

  // Two full storeys, so it belongs in 2 Storey rather than 1.5.
  'mediterranean-double-house': {
    category: '2 Storey Houses',
    categories: ['2 Storey Houses'],
    desc: 'The Mediterranean Double House is equally suitable for either rental businesses or your own comfort. It features two bathrooms, two living rooms and three bedrooms, making it a great space for families and social gatherings.',
  },

  // ─── Naming ───────────────────────────────────────────────────────────
  'garden-studio': { name: 'Garden Studio' },
  'garden-cafe': {
    name: 'Garden Café',
    desc: 'A modern factory-built café, delivered as a turnkey solution and installed in just one day. The garden café includes a quick start-up and minimal energy costs.',
  },
  'modwood-cafe': {
    name: 'ModWood Café',
    desc: 'A spacious commercial property in a modern prefabricated-frame style with a sizeable terrace and professional zoning, designed for fast construction to progress new business launches.',
  },

  // ─── Corrected copy ───────────────────────────────────────────────────
  // Described a "two-storey smart cottage with a floor area of 54 m²" while
  // the record says 35.5 m² on one storey.
  'mediterranean-single-house': {
    desc: 'A stylish home offering all the functionality of a full-sized house on a compact plot.',
  },

  // Claimed 100 m² against a recorded 114 m², and used US "one-story".
  aqua: {
    desc: 'A one-storey house featuring a spacious kitchen and living area with access to the terrace, built on your plot in a matter of days.',
  },

  'family-house': {
    desc: 'The Family House features panoramic windows, a terrace and a spacious living area, making it the optimal environment for families.',
  },
  country: {
    desc: 'A single-storey house with two bedrooms, a well-lit living area and a terrace, offering the perfect blend of compact design and comfort for permanent living.',
  },
  part: {
    desc: 'A perfect balance between compact design and comfort, offering two bedrooms and a spacious terrace for outdoor seating and dining.',
  },
  lake: {
    desc: 'The Lake is designed for country living, with a layout which separates the guest area from a quieter and private space.',
  },
  'forest-house': {
    desc: 'A great alternative to apartment living: 56 m² of space, carefully designed to fit your needs.',
  },
  'the-residence': {
    desc: 'With a 145 m² floor area, the two-storey Residence considers families seeking more space, with a large living area and designed for quick construction.',
  },
  'match-point': {
    desc: 'A commercial property featuring two changing rooms and a service area, designed to be an ideal addition for sports clubs and leisure facilities.',
  },
  estate: {
    desc: 'A practical single-storey house with a garage and four separate rooms, stylish and structurally reliable with a modern interior.',
  },

  // Description ended without a full stop. The "houseboat" wording is the
  // customer team's own and is left as written; under Trident's rule a
  // floating home is still classed as a bungalow.
  riva: {
    desc: 'A 54 m² houseboat, designed for those who dream of owning their own floating home or are looking for an exclusive unit for a highly profitable rental business.',
  },
}

/** Merge editorial corrections over a generated record. */
export function applyOverride(home: Home): Home {
  const patch = overrides[home.slug]
  return patch ? { ...home, ...patch } : home
}
