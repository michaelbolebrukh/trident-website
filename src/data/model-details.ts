/**
 * Refined per-model detail from Trident's 2026 price guides (rev 07/2026).
 *
 * These carry what the WordPress export could not: the size variants and the
 * three-package pricing ladder (Kit / Shell / Turnkey). Keyed by the model's
 * catalogue slug. A model without an entry here simply falls back to the
 * single "from" price in homes.ts.
 *
 * ALL PRICES ARE EXCL. VAT and are "from" prices. Anything rendering them must
 * say so; see PRICE_NOTE.
 */

export const PRICE_NOTE = 'All prices from, excl. VAT. Foundations quoted separately.'

export interface Variant {
  name: string
  /** External dimensions in mm, as printed in the price guide. */
  dimensions: string
  /** Internal floor area in m². */
  area: number
  kit: number
  shell: number
  turnkey: number
}

export interface Package {
  n: string
  name: string
  desc: string
}

export interface ModelDetail {
  tagline: string
  intro: string
  variants: Variant[]
  packages: Package[]
  /** Ground screw foundation, quoted separately after a site survey. */
  foundationFrom?: number
  uValueWalls: string
  uValueRoof: string
  accreditations: string[]
}

const GARDEN_PACKAGES: Package[] = [
  {
    n: '01',
    name: 'Kit',
    desc: 'Factory kit delivered to your driveway. Unload and assemble yourself or with your own builder.',
  },
  {
    n: '02',
    name: 'Shell Assembled',
    desc: 'We deliver and erect the weathertight shell on your site: walls, roof, windows, external door.',
  },
  {
    n: '03',
    name: 'Turnkey',
    desc: 'Move-in-ready. Shell plus drylining, painting, LVT flooring, skirting, electrics, panel heater and prelims. No bathroom or kitchen.',
  },
]

export const modelDetails: Record<string, ModelDetail> = {
  'base-model': {
    tagline: 'Compact garden room. Smart, insulated, ready for office, studio or hobby space.',
    intro:
      'Garden Base is our entry-level modular garden building. Fast to install, well insulated and BOPAS-certified. Ideal as a garden office, art studio or teen retreat where you want a compact footprint on a small plot.',
    variants: [
      { name: 'Base 6', dimensions: '2300 × 2590', area: 4.4, kit: 6200, shell: 8700, turnkey: 15690 },
      { name: 'Base 9', dimensions: '3400 × 2590', area: 6.9, kit: 7650, shell: 10500, turnkey: 17721 },
      { name: 'Base 12', dimensions: '4500 × 2590', area: 9.4, kit: 9500, shell: 12770, turnkey: 21198 },
      { name: 'Base 15', dimensions: '5600 × 2590', area: 12.2, kit: 10850, shell: 14700, turnkey: 23626 },
    ],
    packages: GARDEN_PACKAGES,
    foundationFrom: 990,
    uValueWalls: '0.28 W/m²K',
    uValueRoof: '0.23 W/m²K',
    accreditations: ['BOPAS certified', 'ISO 9001 quality managed factory'],
  },

  'premium-model': {
    tagline: 'Deeper footprint, taller ceilings. Ideal for garden office, guest room or gym.',
    intro:
      'Garden Premium offers 3.36 m depth for a more generous internal space. Same insulated timber-frame construction and BOPAS certification, but with room for two desks, a small gym, or a private retreat that is not just a shed.',
    variants: [
      { name: 'Premium 8', dimensions: '2300 × 3360', area: 6.5, kit: 7650, shell: 10350, turnkey: 17976 },
      { name: 'Premium 12', dimensions: '3400 × 3360', area: 7.9, kit: 9350, shell: 12550, turnkey: 20320 },
      { name: 'Premium 15', dimensions: '4500 × 3360', area: 9.4, kit: 11100, shell: 14850, turnkey: 23024 },
      { name: 'Premium 19', dimensions: '5600 × 3360', area: 12.2, kit: 12900, shell: 17100, turnkey: 25975 },
    ],
    packages: GARDEN_PACKAGES,
    foundationFrom: 1320,
    uValueWalls: '0.28 W/m²K',
    uValueRoof: '0.23 W/m²K',
    accreditations: ['BOPAS certified', 'ISO 9001 quality managed factory'],
  },

  'garden-studio': {
    tagline:
      'Full-comfort studio with insulated shell, ensuite shower room and turnkey finishing. Live, work or host from your garden.',
    intro:
      'Garden Studio Comfort is our premium tier: an insulated timber-frame studio you can actually live in. Turnkey includes an ensuite shower room, water heater and full electrics. Add a terrace, kitchenette or premium ecosystem (air source heat pump, green roof, Sonos) as options.',
    variants: [
      { name: 'Studio 19', dimensions: '5600 × 3370', area: 15.6, kit: 12970, shell: 17420, turnkey: 37233 },
      { name: 'Studio 19 T', dimensions: '5600 × 4180', area: 15.6, kit: 15150, shell: 20200, turnkey: 40013 },
      { name: 'Studio 23', dimensions: '6700 × 3370', area: 19.2, kit: 15000, shell: 19950, turnkey: 40654 },
      { name: 'Studio 23 T', dimensions: '6700 × 4180', area: 19.2, kit: 17400, shell: 22900, turnkey: 43604 },
    ],
    packages: [
      GARDEN_PACKAGES[0],
      GARDEN_PACKAGES[1],
      {
        n: '03',
        name: 'Turnkey',
        desc: 'Move-in ready. Shell plus ensuite shower room (WC, basin, thermostatic shower, tanking, tiling), internal door, water heater, Forbo flooring, full electrics and prelims.',
      },
    ],
    uValueWalls: '0.28 W/m²K',
    uValueRoof: '0.23 W/m²K',
    accreditations: ['BOPAS certified to 2027', 'ISO 9001 quality managed factory'],
  },

  'a-frame': {
    tagline: 'Two bedroom timber frame house, 71.62 m² internal. Buy the kit, the erected shell, or a finished home.',
    intro:
      'Same building, same factory, same specification. The only difference is where our work stops and yours begins. Building on a concrete slab? The kit without floor cassettes is from £78,900, a saving of £8,100.',
    variants: [
      { name: 'A-Frame', dimensions: '71.62 m² internal', area: 71.62, kit: 87000, shell: 109150, turnkey: 190670 },
    ],
    packages: [
      {
        n: '01',
        name: 'House kit, delivered',
        desc: 'Panels, roof, cladding, windows and doors delivered to your plot on three lorries. Your team erects it. £1,215/m².',
      },
      {
        n: '02',
        name: 'Shell and assembly',
        desc: 'Everything in the kit, plus road delivery, mobile crane and offload, and erection by our own crew, sealed and weathertight on handover, typically 10 to 12 days on site. £1,524/m².',
      },
      {
        n: '03',
        name: 'Turnkey',
        desc: 'Everything in the shell, plus internal linings and decoration, staircase and joinery, bathroom, air source heat pump, electrics, floor finishes, testing and handover. £2,662/m².',
      },
    ],
    foundationFrom: 17500,
    uValueWalls: '0.28 W/m²K',
    uValueRoof: '0.23 W/m²K',
    accreditations: ['BOPAS accredited', 'ISO 9001:2015', '60 year durability assessment'],
  },
}

export const detailFor = (slug: string): ModelDetail | undefined => modelDetails[slug]

/** Lead times and payment terms, from the A-Frame guide. */
export const commercialTerms = {
  leadTime: '20 to 24 weeks turnkey, 14 to 18 weeks shell',
  payment: '10% on signature, 40% on design approval, 30% before despatch, 20% on handover',
}
