/**
 * Canonical URL for every page. The Figma Make export routed via React state,
 * so every page shared a single URL; these paths replace that.
 *
 * Where tridentmodular.com already had the page, we keep its exact URL rather
 * than a tidier one and a redirect. A 301 passes most of a page's standing but
 * not all of it, and these are the pages the business ranks on — so /about_us/
 * and /customise-your-build/ stay as they are, warts and all.
 */
export const routes = {
  home: '/',
  catalogue: '/houses/',
  installation: '/installation/',
  bespoke: '/customise-your-build/',
  gallery: '/gallery/',
  about: '/about_us/',
  technology: '/technology/',
  bopas: '/bopas-and-certificates/',
  blog: '/blog/',
  faq: '/faq/',
  contact: '/contact-us/',
  /** SEO landing pages, September 2026. */
  modularHomes: '/modular-homes/',
  kitHomes: '/kit-homes/',
  prices: '/modular-homes-prices/',
  forSale: '/modular-homes-for-sale/',
  factoryBuilt: '/factory-built-homes/',
  selfBuild: '/self-build-modular-homes/',
  london: '/london/',
  modern: '/modern-modular-homes/',
  companies: '/modular-building-companies/',
  commercial: '/commercial/',
  eco: '/eco-modular-homes/',
} as const

export type Page = keyof typeof routes

/** Product detail pages are generated per model from src/data/homes.ts. */
export const productPath = (slug: string) => `/houses/${slug}/`

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
