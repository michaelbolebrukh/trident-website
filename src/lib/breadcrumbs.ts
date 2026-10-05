/**
 * Breadcrumb trails. One source for the visible trail (Breadcrumbs.astro)
 * and the BreadcrumbList schema (schema.ts), so the two always agree.
 */
import type { Home } from '../data/homes'
import { categoryPath, productPath, routes } from './routes'

export interface Crumb {
  name: string
  href: string
}

const HOME: Crumb = { name: 'Home', href: routes.home }

/** Home › Category › Model */
export const modelCrumbs = (home: Home): Crumb[] => [
  HOME,
  { name: home.category, href: categoryPath(home.category) },
  { name: home.name, href: productPath(home.slug) },
]

/** Home › Homes › Category */
export const categoryCrumbs = (name: string): Crumb[] => [
  HOME,
  { name: 'Homes', href: routes.catalogue },
  { name, href: categoryPath(name) },
]

/**
 * Home › Page, for the pages without a deeper trail. Keyed by pathname;
 * labels follow the navigation.
 */
export const PAGE_LABELS: Record<string, string> = {
  [routes.catalogue]: 'All Homes',
  [routes.installation]: 'Delivery & Installation',
  [routes.bespoke]: 'Bespoke & Commercial',
  [routes.gallery]: 'Project Gallery',
  [routes.about]: 'About Trident',
  [routes.technology]: 'Technology',
  [routes.bopas]: 'BOPAS & Certificates',
  [routes.blog]: 'Blog & Insights',
  [routes.faq]: 'FAQ',
  [routes.contact]: 'Contact',
  [routes.modularHomes]: 'Modular Homes UK',
  [routes.kitHomes]: 'Kit Homes UK',
  [routes.prices]: 'Modular Home Prices',
  [routes.forSale]: 'Modular Homes for Sale',
  [routes.factoryBuilt]: 'Factory-Built Homes',
  [routes.selfBuild]: 'Self-Build Modular Homes',
  [routes.london]: 'London',
  [routes.modern]: 'Modern Modular Homes',
  [routes.companies]: 'Modular Building Company',
  [routes.commercial]: 'Commercial Modular Buildings',
  [routes.eco]: 'Eco Modular Homes',
  '/privacy-policy/': 'Privacy Policy',
  '/cookie-policy/': 'Cookie Policy',
  '/terms-and-conditions/': 'Terms & Conditions',
}

export const pageCrumbs = (pathname: string): Crumb[] | undefined => {
  const label = PAGE_LABELS[pathname]
  return label ? [HOME, { name: label, href: pathname }] : undefined
}

/** Home › Blog › Post */
export const postCrumbs = (title: string, slug: string): Crumb[] => [
  HOME,
  { name: 'Blog', href: routes.blog },
  { name: title, href: `/blog/${slug}/` },
]
