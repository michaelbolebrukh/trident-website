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

  // Confirmed by Trident as 1.5 storey: the upper level sits within the roof
  // rather than being a full second storey.
  'mediterranean-double-house': {
    category: '1.5 Storey Houses',
    categories: ['1.5 Storey Houses'],
    floors: 1.5,
    desc: 'The Mediterranean Double House is equally suitable for either rental businesses or your own comfort. It features two bathrooms, two living rooms and three bedrooms, making it a great space for families and social gatherings.',
  },


  // ─── Garden room photography ──────────────────────────────────────────
  // The originals the old site used, supplied by Trident from Drive. The
  // export points at these same filenames, but tridentmodular.com answers
  // image requests with a bot-protection challenge, so they had to come
  // across by hand.
  //
  // The set is the product range rather than a set of scenes: two exterior
  // layouts, three cladding colours, each with and without the wood front,
  // plus the beam variants. Ordered plain, then colours, then wood front,
  // then beam, so the gallery reads as a range.
  //
  // Site-absolute paths, so they bypass image-map.json; see houseImage in
  // homes.ts.
  'base-model': {
    thumb: '/images/library/garden-base-01.webp',
    gallery: [
      '/images/library/garden-base-01.webp',
      '/images/library/garden-base-02.webp',
      '/images/library/garden-base-03.webp',
      '/images/library/garden-base-04.webp',
      '/images/library/garden-base-05.webp',
      '/images/library/garden-base-06.webp',
      '/images/library/garden-base-07.webp',
      '/images/library/garden-base-08.webp',
    ],
  },
  'premium-model': {
    thumb: '/images/library/garden-premium-01.webp',
    gallery: [
      '/images/library/garden-premium-01.webp',
      '/images/library/garden-premium-02.webp',
      '/images/library/garden-premium-03.webp',
      '/images/library/garden-premium-04.webp',
      '/images/library/garden-premium-05.webp',
      '/images/library/garden-premium-06.webp',
      '/images/library/garden-premium-07.webp',
      '/images/library/garden-premium-08.webp',
      '/images/library/garden-premium-09.webp',
      '/images/library/garden-premium-10.webp',
      '/images/library/garden-premium-11.webp',
      '/images/library/garden-premium-12.webp',
    ],
  },

  // ─── Naming ───────────────────────────────────────────────────────────
  // The customer team's review corrected the capitalisation and accents here
  // ("Garden studio" -> "Garden Studio", "Cafe" -> "Café", "A-frame" ->
  // "A-Frame"). Those corrections are held back for now: the brief is that a
  // model's name must read exactly as it does on tridentmodular.com, so the
  // page title, H1 and link text all match what is already indexed.
  'garden-cafe': {
    desc: 'A modern factory-built café, delivered as a turnkey solution and installed in just one day. The garden café includes a quick start-up and minimal energy costs.',
  },
  'modwood-cafe': {
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
