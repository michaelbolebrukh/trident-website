/** Canonical URL for every page. The Figma Make export routed via React state,
 *  so every page shared a single URL; these paths replace that. */
export const routes = {
  home: '/',
  catalogue: '/catalogue/',
  installation: '/installation/',
  bespoke: '/bespoke/',
  gallery: '/gallery/',
  about: '/about/',
  blog: '/blog/',
  faq: '/faq/',
  contact: '/contact/',
} as const

export type Page = keyof typeof routes

/** Product detail pages are generated per model from src/data/homes.ts. */
export const productPath = (slug: string) => `/catalogue/${slug}/`

export const slugify = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
