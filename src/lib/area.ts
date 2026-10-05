/**
 * The floor area a model is described with, everywhere it appears.
 *
 * The price guides carry size variants for the garden buildings and the
 * A-Frame, and their internal areas are what the model page states. Every
 * card, list and description uses this same rule so one model never shows
 * two different areas on two pages.
 */
import { detailFor } from '../data/model-details'
import type { Home } from '../data/homes.generated'

export function floorAreaText(home: Pick<Home, 'slug' | 'area'>): string {
  const areas = detailFor(home.slug)?.variants.map((v) => v.area) ?? []
  if (!areas.length) return `${home.area} m²`
  return areas.length > 1 ? `${Math.min(...areas)}–${Math.max(...areas)} m²` : `${areas[0]} m²`
}

/** Smallest area the model is offered at, as a number. */
export function floorAreaMin(home: Pick<Home, 'slug' | 'area'>): number {
  const areas = detailFor(home.slug)?.variants.map((v) => v.area) ?? []
  return areas.length ? Math.min(...areas) : home.area
}
