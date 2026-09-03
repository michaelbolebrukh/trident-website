/**
 * Model page titles and descriptions, hand-set per model.
 *
 * Titles carry no price. Each descriptor is built from the model's own
 * character in homes.generated.ts / overrides.ts (storeys, bedrooms, category
 * and a distinctive word from its catalogue copy) and is unique across the
 * range. Descriptions lead with the catalogue blurb (home.desc), then the
 * floor area and bedrooms the page states, kept to 155 characters.
 *
 * Bedroom counts follow catalogue-specs.ts, which is what the page shows.
 * Part's catalogue copy says "two bedrooms" while its room schedule counts
 * one, so its descriptor and description avoid a number.
 */
export interface ModelSeo {
  /** Follows the model name: "<Model> — <descriptor> | Trident Modular". */
  descriptor: string
  description: string
}

export const modelSeo: Record<string, ModelSeo> = {
  'base-model': {
    descriptor: 'Compact Insulated Garden Room',
    description:
      'The basic modular garden house: essential functionality at a lower price point, a practical way to extend your living space outdoors, from 4.4 to 12.2 m².',
  },
  'premium-model': {
    descriptor: 'Deeper Insulated Garden Room',
    description:
      'A premium modular garden house with a deeper footprint and taller ceilings, elevating your outdoor living experience. Four sizes from 6.5 to 12.2 m².',
  },
  'garden-cafe': {
    descriptor: 'Factory-Built Garden Café',
    description:
      'A modern factory-built café of 14 m², delivered as a turnkey solution and installed in just one day, with a quick start-up and minimal energy costs.',
  },
  'garden-studio': {
    descriptor: 'Garden Room with Ensuite Shower',
    description:
      'A fully fitted modular studio you can live, work or host from, with an insulated shell and ensuite shower room. Four sizes from 15.6 to 19.2 m² internal.',
  },
  part: {
    descriptor: 'Compact Modular Home with Terrace',
    description:
      'A perfect balance between compact design and comfort: 54 m² of single-storey living with a spacious terrace for outdoor seating and dining.',
  },
  riva: {
    descriptor: 'Floating Modular Houseboat',
    description:
      'A 54 m² houseboat for those who dream of owning their own floating home, or want an exclusive unit for a rental business. One bedroom, one bathroom.',
  },
  'mediterranean-single-house': {
    descriptor: 'Compact-Plot Modular Home',
    description:
      'A stylish home offering all the functionality of a full-sized house on a compact plot: 35.5 m² internal with one bedroom and one bathroom.',
  },
  'family-house': {
    descriptor: 'Bungalow with Panoramic Windows',
    description:
      'The Family House features panoramic windows, a terrace and a spacious living area, making it the optimal environment for families. 46.2 m², two bedrooms.',
  },
  'forest-house': {
    descriptor: 'One-Bedroom Modular Bungalow',
    description:
      'A great alternative to apartment living: 56 m² of single-storey space, carefully designed to fit your needs, with one bedroom and one bathroom.',
  },
  country: {
    descriptor: 'Two-Bedroom Bungalow with Terrace',
    description:
      'A single-storey house with two bedrooms, a well-lit living area and a terrace: 71 m² that blends compact design with comfort for permanent living.',
  },
  'mediterranean-double-house': {
    descriptor: 'Three-Bedroom 1.5 Storey Home',
    description:
      'Equally suited to a rental business or your own comfort: 118 m² with two bathrooms, two living rooms and three bedrooms for families and gatherings.',
  },
  'square-of-harmony': {
    descriptor: 'Two-Bedroom Compact Modular Home',
    description:
      'The perfect balance of compactness and comfort: 55.2 m² with two separate bedrooms and a spacious terrace for an unforgettable outdoor experience.',
  },
  lake: {
    descriptor: 'Single-Storey Country Modular Home',
    description:
      'The Lake is designed for country living, with a layout that separates the guest area from a quieter private space. 114 m², two bedrooms, two bathrooms.',
  },
  aqua: {
    descriptor: 'Floating Single-Storey Modular Home',
    description:
      'A one-storey house with a spacious kitchen and living area opening onto the terrace, built on your plot in a matter of days. 114 m² with two bedrooms.',
  },
  chalet: {
    descriptor: 'Two-Storey Timber Family Home',
    description:
      'A spacious two-storey timber-frame house with a layout suited for a family, where everyone has their own space: 65 m² with two bedrooms and two bathrooms.',
  },
  'the-residence': {
    descriptor: 'Four-Bedroom Two-Storey Home',
    description:
      'With a 145 m² floor area, the two-storey Residence is for families seeking more space: four bedrooms, three bathrooms and a large living area.',
  },
  'modwood-cafe': {
    descriptor: 'Prefabricated Restaurant Building',
    description:
      'A spacious commercial property in a modern prefabricated-frame style, with a sizeable terrace and professional zoning across 272.3 m² for a fast launch.',
  },
  urban: {
    descriptor: 'Two-Storey Home with Terraces',
    description:
      'Your countryside escape, featuring two floors, multiple terraces and panoramic views: 127.6 m² with three bedrooms and three bathrooms.',
  },
  'match-point': {
    descriptor: 'Sports Changing Room Module',
    description:
      'A commercial property with two changing rooms and a service area across 51.6 m², designed as an ideal addition for sports clubs and leisure facilities.',
  },
  'a-frame': {
    descriptor: 'Iconic Two-Storey A-Frame Cabin',
    description:
      'The iconic A-Frame: your countryside escape with two floors, multiple terraces and panoramic views. 71.62 m² internal, two bedrooms, one bathroom.',
  },
  gothic: {
    descriptor: 'Luxury Two-Storey Home with Study',
    description:
      'A luxury two-storey house with a spacious terrace, a master bedroom and a study, for comfortable country living without limits. 157.5 m², three bedrooms.',
  },
  loft: {
    descriptor: 'Bungalow with Home Office and Garage',
    description:
      'A compact and practical house with two bedrooms, a home office, a large terrace and an integrated garage: 227.6 m² designed for comfortable country living.',
  },
  estate: {
    descriptor: 'Large-Family Bungalow with Garage',
    description:
      'A practical single-storey house with a garage and four separate rooms, stylish and structurally reliable with a modern interior. 317.06 m², four bedrooms.',
  },
}
