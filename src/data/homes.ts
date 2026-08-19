/**
 * The catalogue as the site sees it: the WordPress export with the approved
 * editorial corrections merged on top.
 *
 * Import from here, never from homes.generated.ts — that file is overwritten
 * wholesale each time the import script runs.
 */
import { generatedHomes, houseImage, type Home } from './homes.generated'
import { applyOverride } from './overrides'

export { houseImage }
export type { Home }

export const allHomes: Home[] = generatedHomes.map(applyOverride)

export const homeBySlug = (slug: string) => allHomes.find((h) => h.slug === slug)

/**
 * Trident's four primary classes, in the order they are shown. Secondary tags
 * (Log Houses, Tiny Homes & Pod Homes) describe a model but never file it.
 */
export const PRIMARY_CATEGORIES = [
  'Garden Rooms',
  'Bungalows',
  '1.5 Storey Houses',
  '2 Storey Houses',
] as const

export const categories: string[] = PRIMARY_CATEGORIES.filter((c) =>
  allHomes.some((h) => h.categories.includes(c)),
)

/** Secondary tags, for display alongside a model rather than filing it. */
export const secondaryTags = (home: Home): string[] =>
  home.categories.filter((c) => !PRIMARY_CATEGORIES.includes(c as (typeof PRIMARY_CATEGORIES)[number]))
