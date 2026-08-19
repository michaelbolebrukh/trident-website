/**
 * The catalogue as the site sees it: the WordPress export with the approved
 * editorial corrections merged on top.
 *
 * Import from here, never from homes.generated.ts — that file is overwritten
 * wholesale each time the import script runs.
 */
import { generatedHomes, houseImage, type Home } from './homes.generated'
import { applyOverride } from './overrides'
import { specFor } from './catalogue-specs'

export { houseImage }
export type { Home }

/**
 * Bedroom and bathroom counts come from the catalogue's room schedules where
 * available — the WordPress export carried them for only 8 of 23 models, and
 * the catalogue is the agreed source of truth.
 */
export const allHomes: Home[] = generatedHomes.map((home) => {
  const merged = applyOverride(home)
  const spec = specFor(merged.slug)
  if (!spec) return merged
  return {
    ...merged,
    bedrooms: spec.bedrooms || merged.bedrooms,
    bathrooms: spec.bathrooms || merged.bathrooms,
  }
})

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
