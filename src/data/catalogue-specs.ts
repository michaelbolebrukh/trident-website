/**
 * Room schedules taken from the Trident catalogue PDF.
 *
 * GENERATED — do not hand-edit. Re-run:
 *   node scripts/import-catalogue.mjs public/downloads/trident-catalogue.pdf
 *
 * Bedroom and bathroom counts are derived by classifying room names, since
 * the catalogue states neither directly.
 */

export interface Room {
  name: string
  /** Floor area in m². */
  area: number
}

export interface CatalogueSpec {
  /** Page in the catalogue this came from, for checking against the source. */
  page: number
  rooms: Room[]
  bedrooms: number
  bathrooms: number
  /** Sum of the scheduled rooms; usable rather than external area. */
  totalArea: number
}

export const catalogueSpecs: Record<string, CatalogueSpec> = {
  'base-model': {
    page: 65,
    bedrooms: 0,
    bathrooms: 0,
    totalArea: 9.68,
    rooms: [
      { name: 'Room', area: 9.68 },
    ],
  },
  'premium-model': {
    page: 59,
    bedrooms: 0,
    bathrooms: 0,
    totalArea: 13.89,
    rooms: [
      { name: 'Room', area: 9.68 },
      { name: 'Terrace', area: 4.21 },
    ],
  },
  'garden-studio': {
    page: 57,
    bedrooms: 0,
    bathrooms: 0,
    totalArea: 19.34,
    rooms: [
      { name: 'Room', area: 16.12 },
      { name: 'Room', area: 0.86 },
      { name: 'Room', area: 2.36 },
    ],
  },
  'modwood-cafe': {
    page: 51,
    bedrooms: 0,
    bathrooms: 2,
    totalArea: 224.07,
    rooms: [
      { name: 'Terrace', area: 146.55 },
      { name: 'Living room', area: 49.72 },
      { name: 'Bathroom', area: 3.82 },
      { name: 'Kitchen', area: 21.43 },
      { name: 'Bathroom', area: 2.55 },
    ],
  },
  'part': {
    page: 43,
    bedrooms: 1,
    bathrooms: 1,
    totalArea: 44.47,
    rooms: [
      { name: 'Corridor', area: 4.44 },
      { name: 'Kitchen-living room', area: 22.41 },
      { name: 'Bathroom', area: 5.12 },
      { name: 'Bedroom', area: 12.5 },
    ],
  },
  'riva': {
    page: 45,
    bedrooms: 1,
    bathrooms: 1,
    totalArea: 44.47,
    rooms: [
      { name: 'Corridor', area: 4.44 },
      { name: 'Kitchen-living room', area: 22.41 },
      { name: 'Bathroom', area: 5.12 },
      { name: 'Bedroom', area: 12.5 },
    ],
  },
  'forest-house': {
    page: 47,
    bedrooms: 1,
    bathrooms: 1,
    totalArea: 44.42,
    rooms: [
      { name: 'Corridor', area: 5.73 },
      { name: 'Kitchen-living room', area: 15.44 },
      { name: 'Bathroom', area: 4.46 },
      { name: 'Wardrobe room', area: 4.03 },
      { name: 'Bedroom', area: 8.58 },
      { name: 'Terrace', area: 6.18 },
    ],
  },
  'country': {
    page: 33,
    bedrooms: 2,
    bathrooms: 1,
    totalArea: 58.63,
    rooms: [
      { name: 'Entrance area', area: 2.56 },
      { name: 'Utility room', area: 2.86 },
      { name: 'Corridor', area: 3.21 },
      { name: 'Bathroom', area: 4.64 },
      { name: 'Kitchen-living room', area: 20.93 },
      { name: 'Bedroom', area: 8.62 },
      { name: 'Bedroom', area: 8.59 },
      { name: 'Terrace', area: 7.22 },
    ],
  },
  'square-of-harmony': {
    page: 37,
    bedrooms: 2,
    bathrooms: 1,
    totalArea: 49.05,
    rooms: [
      { name: 'Kitchen-living room', area: 11.79 },
      { name: 'Bathroom', area: 4.65 },
      { name: 'Bedroom', area: 8.59 },
      { name: 'Bedroom', area: 8.61 },
      { name: 'Terrace', area: 15.41 },
    ],
  },
  'lake': {
    page: 27,
    bedrooms: 2,
    bathrooms: 2,
    totalArea: 92.02,
    rooms: [
      { name: 'Entrance area', area: 4.7 },
      { name: 'Corridor', area: 7.87 },
      { name: 'Kitchen-living room', area: 26.05 },
      { name: 'Office', area: 8.38 },
      { name: 'Bedroom', area: 13.17 },
      { name: 'Master bedroom', area: 11.1 },
      { name: 'Master wardrobe room', area: 6.33 },
      { name: 'Master bathroom', area: 5.96 },
      { name: 'Bathroom', area: 4.96 },
      { name: 'Utility room', area: 3.5 },
    ],
  },
  'aqua': {
    page: 41,
    bedrooms: 2,
    bathrooms: 1,
    totalArea: 109.52,
    rooms: [
      { name: 'Entrance area', area: 5.4 },
      { name: 'Utility room', area: 3.25 },
      { name: 'Kitchen-living room', area: 46.81 },
      { name: 'Bedroom', area: 12.33 },
      { name: 'Wardrobe room', area: 3.69 },
      { name: 'Bathroom', area: 4.63 },
      { name: 'Bedroom', area: 17.15 },
      { name: 'Wardrobe room', area: 5.4 },
      { name: 'Terrace', area: 10.86 },
    ],
  },
  'chalet': {
    page: 39,
    bedrooms: 2,
    bathrooms: 2,
    totalArea: 108.31,
    rooms: [
      { name: 'Entrance hall', area: 8.9 },
      { name: 'Utility room', area: 5.53 },
      { name: 'Bathroom', area: 5 },
      { name: 'Kitchen-living room', area: 37.42 },
      { name: 'Corridor', area: 13.68 },
      { name: 'Bedroom', area: 10.14 },
      { name: 'Wardrobe room', area: 2.68 },
      { name: 'Bedroom', area: 13.27 },
      { name: 'Bathroom', area: 4.54 },
      { name: 'Office', area: 7.15 },
    ],
  },
  'urban': {
    page: 79,
    bedrooms: 3,
    bathrooms: 3,
    totalArea: 162.11,
    rooms: [
      { name: 'Terrace', area: 3.89 },
      { name: 'Entrance hall', area: 6.87 },
      { name: 'Utility room', area: 3.11 },
      { name: 'Corridor', area: 5.67 },
      { name: 'Bathroom', area: 4.32 },
      { name: 'Kitchen-living room', area: 27.89 },
      { name: 'Bedroom', area: 11.94 },
      { name: 'Pantry', area: 5.89 },
      { name: 'Terrace', area: 15.34 },
      { name: 'Corridor', area: 5.56 },
      { name: 'Office', area: 10.73 },
      { name: 'Laundry room', area: 3.1 },
      { name: 'Bedroom', area: 11.89 },
      { name: 'Bathroom', area: 4.31 },
      { name: 'Master bedroom', area: 12.44 },
      { name: 'Master wardrobe room', area: 5.92 },
      { name: 'Master bathroom', area: 7.98 },
      { name: 'Terrace', area: 15.26 },
    ],
  },
  'match-point': {
    page: 53,
    bedrooms: 0,
    bathrooms: 2,
    totalArea: 43.63,
    rooms: [
      { name: 'Communal area', area: 15.04 },
      { name: 'Bathroom', area: 1.86 },
      { name: 'Bathroom', area: 1.75 },
      { name: 'Changing room', area: 11.4 },
      { name: 'Changing room', area: 13.58 },
    ],
  },
  'gothic': {
    page: 75,
    bedrooms: 2,
    bathrooms: 3,
    totalArea: 260.39,
    rooms: [
      { name: 'Terrace', area: 57.9 },
      { name: 'Entrance hall', area: 6.13 },
      { name: 'Utility room', area: 10.31 },
      { name: 'Corridor', area: 15.16 },
      { name: 'Bathroom', area: 5.23 },
      { name: 'Kitchen-living room', area: 44.99 },
      { name: 'Pantry', area: 4.96 },
      { name: 'Corridor', area: 25.44 },
      { name: 'Master bedroom', area: 31.04 },
      { name: 'Master wardrobe room', area: 6.08 },
      { name: 'Master bathroom', area: 15.54 },
      { name: 'Bathroom', area: 10.57 },
      { name: 'Laundry room', area: 3.11 },
      { name: 'Bedroom', area: 13.56 },
      { name: 'Office', area: 10.37 },
    ],
  },
  'estate': {
    page: 63,
    bedrooms: 3,
    bathrooms: 2,
    totalArea: 315.32,
    rooms: [
      { name: 'Entrance hall', area: 6.66 },
      { name: 'Utility room', area: 4.56 },
      { name: 'Garage', area: 36 },
      { name: 'Corridor', area: 17.78 },
      { name: 'Laundry room', area: 2.04 },
      { name: 'Kitchen-living room', area: 40.1 },
      { name: 'Terrace', area: 3.74 },
      { name: 'Bathroom', area: 6.66 },
      { name: 'Bedroom', area: 36 },
      { name: 'Wardrobe room', area: 3.87 },
      { name: 'Bedroom', area: 14.67 },
      { name: 'Wardrobe room', area: 3.96 },
      { name: 'Master bedroom', area: 22.68 },
      { name: 'Master wardrobe room', area: 4.56 },
      { name: 'Master bathroom', area: 7.44 },
      { name: 'Porch', area: 4.96 },
      { name: 'Terrace', area: 99.64 },
    ],
  },
}

export const specFor = (slug: string): CatalogueSpec | undefined => catalogueSpecs[slug]
