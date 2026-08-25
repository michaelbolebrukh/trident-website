/** Canonical URL for every page. The Figma Make export routed via React state,
 *  so every page shared a single URL; these paths replace that. */
export const routes = {
  home: '/',
  catalogue: '/catalogue/',
  installation: '/installation/',
  bespoke: '/bespoke/',
  gallery: '/gallery/',
  about: '/about/',
  technology: '/technology/',
  bopas: '/bopas-and-certificates/',
  blog: '/blog/',
  faq: '/faq/',
  contact: '/contact/',
} as const

export type Page = keyof typeof routes

/** Product detail pages are generated per model from src/data/homes.ts. */
export const productPath = (slug: string) => `/catalogue/${slug}/`

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** Category pages keep the old site's /houses-type/<slug>/ URLs. */
export const CATEGORY_SLUGS: Record<string, string> = {
  'Garden Rooms': 'garden-rooms',
  Bungalows: 'bungalows',
  '1.5 Storey Houses': '1-5-storey-houses',
  '2 Storey Houses': '2-storey-houses',
  'Log Houses': 'log-houses',
  'Tiny Homes & Pod Homes': 'tiny-pod-homes',
}

export const categoryPath = (name: string) =>
  CATEGORY_SLUGS[name] ? `/houses-type/${CATEGORY_SLUGS[name]}/` : routes.catalogue
