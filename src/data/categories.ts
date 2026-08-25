/**
 * Category pages, keyed by the slug the old site used.
 *
 * Keeping /houses-type/<slug>/ means the pages that already rank carry over
 * without needing a redirect.
 */
export interface CategoryTerm {
  name: string
  blurb: string
}

export const categoryTerms: Record<string, CategoryTerm> = {
  'garden-rooms': {
    name: 'Garden Rooms',
    blurb:
      'Compact, insulated buildings for a garden office, studio or hobby space. Delivered as a kit or an assembled shell, installed in a day on a prepared base.',
  },
  bungalows: {
    name: 'Bungalows',
    blurb:
      'Single-storey homes for garden plots, second dwellings and permanent residence, from compact annexes to substantial family houses.',
  },
  '1-5-storey-houses': {
    name: '1.5 Storey Houses',
    blurb:
      'Taller layouts with a mezzanine or half-storey above the main living space, adding bedrooms without extending the footprint.',
  },
  '2-storey-houses': {
    name: '2 Storey Houses',
    blurb:
      'Two full floors for larger family accommodation, with generous room sizes and first-floor bedrooms.',
  },
  'log-houses': {
    name: 'Log Houses',
    blurb: 'Models available with a timber log character, built on the same insulated panel system.',
  },
  'tiny-pod-homes': {
    name: 'Tiny Homes & Pod Homes',
    blurb:
      'The smallest habitable models, suited to rental income, guest accommodation or a compact permanent home.',
  },
}
