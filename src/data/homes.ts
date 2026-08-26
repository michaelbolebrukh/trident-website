/**
 * The catalogue as the site sees it: the WordPress export with the approved
 * editorial corrections merged on top.
 *
 * Import from here, never from homes.generated.ts — that file is overwritten
 * wholesale each time the import script runs.
 */
import { generatedHomes, type Home } from './homes.generated'
import imageMap from './image-map.json'
import { applyOverride } from './overrides'
import { specFor } from './catalogue-specs'

export type { Home }

/** Shown where the source photograph is not available to us yet. */
export const IMAGE_PLACEHOLDER = '/images/placeholder.svg'

/**
 * Resolve a stored image path to a local file.
 *
 * These used to be hotlinked from tridentmodular.com. That host began
 * answering image requests with a bot-protection challenge instead of the
 * file, so every image on the site broke at once. They are now served from
 * this site, and nothing here depends on an external host.
 *
 * Paths with no local copy fall back to a placeholder rather than a broken
 * image; see docs/missing-images.txt for what still needs supplying.
 */
export const houseImage = (path: string | null | undefined): string =>
  (path && (imageMap as Record<string, string>)[path]) || IMAGE_PLACEHOLDER

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
