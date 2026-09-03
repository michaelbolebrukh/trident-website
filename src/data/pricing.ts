/**
 * Three-package pricing for the house range.
 *
 * Source: Trident_Website_Pricing (August 2026) and its implementation spec.
 * Prices are "from", ex VAT, and assume delivery to Greater London.
 *
 * Garden buildings and the A-Frame are deliberately absent: their pricing is
 * held in model-details.ts from the 2026 price guides and is not changed here.
 */

export interface PriceOption {
  /** Display number, matching the design's 01 / 02 / 03 rows. */
  n: string
  label: string
  /** null where the model is quoted on request. */
  price: number | null
  desc: string
}

export const HOUSE_OPTIONS = [
  {
    n: '01',
    label: 'Shell delivered',
    desc: 'The factory-built house arrives on site: structural panel kit, external cladding fitted at the factory, roof covering where the model allows, windows and external doors. Delivery to Greater London included. Foundation, unloading and assembly are yours. Floor cassettes not included.',
  },
  {
    n: '02',
    label: 'Shell + Assembly',
    desc: 'Everything in Option 1, plus our team unloads with crane and plant, erects the shell to weathertight condition, and commissions cladding, roof and windows into working order. Foundation still yours. Floor cassettes still excluded.',
  },
  {
    n: '03',
    label: 'Turnkey base',
    desc: 'Everything in Option 2, plus helical ground screw foundation, floor panels, plasterboard tape-and-joint and paint, LVT flooring, one standard bathroom, internal doors, staircase where applicable, basic electrics, plumbing and air-source heat pump, compliance, testing and handover. Kitchen, underfloor heating, MVHR, PV and upgraded finishes priced separately.',
  },
] as const

interface HousePricing {
  beds: number | null
  /** Internal habitable area in m². */
  gia: number
  /** Including garage or terrace, where the two differ. */
  giaGross?: number
  shell: number | null
  shellAssembly: number | null
  turnkey: number | null
  /** True where every option is quoted on request. */
  onRequest?: boolean
  note?: string
}

export const housePricing: Record<string, HousePricing> = {
  'square-of-harmony': { beds: 2, gia: 34, shell: 32000, shellAssembly: 40000, turnkey: 89000 },
  part: { beds: 1, gia: 46, shell: 33000, shellAssembly: 42000, turnkey: 109000 },
  riva: {
    beds: 1, gia: 46, shell: 33000, shellAssembly: 42000, turnkey: 109000,
    note: 'Same shell as Part, adapted for water. The foundation differs — pontoons rather than screws — and is priced separately.',
  },
  'family-house': { beds: 2, gia: 40, shell: 45000, shellAssembly: 55000, turnkey: 111000 },
  'forest-house': { beds: 1, gia: 49, shell: 46000, shellAssembly: 58000, turnkey: 125000 },
  country: { beds: 2, gia: 55, shell: 52000, shellAssembly: 65000, turnkey: 141000 },
  lake: { beds: 2, gia: 113, shell: 61000, shellAssembly: 80000, turnkey: 236000 },
  aqua: {
    beds: 2, gia: 113, shell: 61000, shellAssembly: 80000, turnkey: 236000,
    note: 'Same shell as Lake, adapted for water. The foundation differs — pontoons rather than screws — and is priced separately.',
  },
  estate: {
    beds: 4, gia: 207, giaGross: 317, shell: 138000, shellAssembly: 175000, turnkey: 493000,
    note: 'Shell price includes timber planken cladding. Stone facade upgrade is not included, priced from £14,000. Roof tiling is included in the turnkey option only.',
  },

  // The pricing sheet's table carries figures for Loft, but both the
  // implementation spec and the source document list it among the models with
  // no published price. Quoting a number the spec calls incomplete is the
  // more damaging error, so it is shown on request.
  loft: {
    beds: 2, gia: 228, shell: null, shellAssembly: null, turnkey: null, onRequest: true,
    note: 'No standard published price yet. Site-adapted; we come back with a firm number within 5 working days.',
  },

  'mediterranean-single-house': {
    beds: 1, gia: 57, shell: 45000, shellAssembly: 60000, turnkey: 138000,
    note: 'Combined timber and metal cladding plus a metal standing seam roof are included in the shell price. Nothing further is needed for weathertightness.',
  },
  'mediterranean-double-house': {
    beds: 3, gia: 129, shell: 76000, shellAssembly: 97000, turnkey: 275000,
    note: 'Combined timber and metal cladding plus a metal standing seam roof are included in the shell price.',
  },
  'the-residence': {
    beds: 4, gia: 175, shell: 86000, shellAssembly: 113000, turnkey: 372000,
    note: 'Shell price includes timber cladding. Stone facade upgrade is not included, priced from £19,400. Final roof covering is included in the turnkey option only.',
  },
  chalet: {
    beds: 2, gia: 113, shell: null, shellAssembly: null, turnkey: null, onRequest: true,
    note: 'Pricing under revision: the current staircase opening does not suit the panel technology. Please enquire for the latest price.',
  },
  urban: {
    beds: 3, gia: 128, shell: null, shellAssembly: null, turnkey: null, onRequest: true,
    note: 'Site-adapted model. Firm proposal within 5 working days of enquiry.',
  },
  gothic: {
    beds: 3, gia: 212, shell: 168000, shellAssembly: 211000, turnkey: 505000,
    note: 'The architecture as currently drawn needs adapting to our closed panel system, so this price is indicative and firms up once our design team has adapted the drawings.',
  },

  'match-point': {
    beds: null, gia: 52, shell: null, shellAssembly: null, turnkey: null, onRequest: true,
    note: 'Sports and leisure fit-out, site-adapted. Firm proposal within 5 working days of enquiry.',
  },
  'modwood-cafe': {
    beds: null, gia: 272, shell: null, shellAssembly: null, turnkey: null, onRequest: true,
    note: 'Commercial fit-out varies by brief. Firm proposal within 5 working days of enquiry.',
  },
}

export const housePricingFor = (slug: string): HousePricing | undefined => housePricing[slug]

/**
 * Scope that applies to every house price, shown once.
 *
 * Grouped rather than listed flat: twelve exclusions in a single column reads
 * as fine print, and this is the part of a quote buyers most need to take in.
 */
export interface ScopeGroup {
  title: string
  items: string[]
}

export const STANDARD_EXCLUSIONS: ScopeGroup[] = [
  {
    title: 'Land and planning',
    items: [
      'Land purchase, legal fees, stamp duty',
      'Planning application, pre-application advice, planning consultants',
      'Topographical, tree, ecology, arboricultural and heritage surveys',
      'Community Infrastructure Levy, Section 106 and other planning obligations',
    ],
  },
  {
    title: 'Site and groundworks',
    items: [
      'Mains connections: water, electricity, gas, comms',
      'Access road, driveway, parking, landscaping',
      'Site clearance, demolition, removal of existing structures',
      'Abnormal ground conditions',
      'Restricted crane access uplifts',
    ],
  },
  {
    title: 'Fit-out and finishes',
    items: [
      'Kitchen (units, worktops, appliances, install)',
      'Furniture, white goods, curtains, blinds',
    ],
  },
  {
    title: 'Tax',
    items: ['VAT at the prevailing rate'],
  },
]

/** Upgrades quoted per project, grouped by what they change. */
export const AVAILABLE_UPGRADES: ScopeGroup[] = [
  {
    title: 'Comfort and energy',
    items: ['Underfloor heating', 'MVHR ventilation', 'Solar PV + battery', 'Extended warranty'],
  },
  {
    title: 'Finishes',
    items: [
      'Aluminium windows',
      'Engineered wood floors',
      'Premium tile floors',
      'Full kitchen (Howdens)',
      'Premium bathroom',
      'Stone facade cladding',
    ],
  },
  {
    title: 'Structure and services',
    items: ['Extra bedroom / storey', 'Site services and drainage'],
  },
]

export const PROGRAMME = [
  ['Design and approval', '3–4 weeks'],
  ['Factory production', '8–10 weeks'],
  ['Freight and customs', '1–2 weeks'],
  ['Erection and weathertight', '10–12 days'],
  ['Internal fit-out (turnkey)', '6–10 weeks'],
  ['Contract to handover', '4–6 months'],
]

export const PAYMENT_SCHEDULE = [
  ['10%', 'on contract signature'],
  ['40%', 'on approval of technical documentation'],
  ['30%', 'prior to factory dispatch'],
  ['20%', 'on completion and handover'],
]
