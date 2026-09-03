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

/** Home › Blog › Post */
export const postCrumbs = (title: string, slug: string): Crumb[] => [
  HOME,
  { name: 'Blog', href: routes.blog },
  { name: title, href: `/blog/${slug}/` },
]
