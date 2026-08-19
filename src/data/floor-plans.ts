/**
 * Floor plan sheets, served from public/images/plans/.
 *
 * GENERATED — do not hand-edit. Re-run: node scripts/fetch-plans.mjs
 *
 * Garden Base is the exception: its four size plans exist only on the .com
 * host, which is unreachable, so they are rendered out of the 2026 price
 * guide by scripts/render-guide-plans.mjs instead.
 */

export const floorPlans: Record<string, string[]> = {
  'base-model': ['/images/plans/base-model-plan-1.webp', '/images/plans/base-model-plan-2.webp', '/images/plans/base-model-plan-3.webp', '/images/plans/base-model-plan-4.webp'],
  'lake': ['/images/plans/lake-plan-1.webp'],
  'forest-house': ['/images/plans/forest-house-plan-1.webp'],
  'family-house': ['/images/plans/family-house-plan-1.webp'],
  'urban': ['/images/plans/urban-plan-1.webp', '/images/plans/urban-plan-2.webp'],
  'a-frame': ['/images/plans/a-frame-plan-1.webp', '/images/plans/a-frame-plan-2.webp'],
  'part': ['/images/plans/part-plan-1.webp'],
  'the-residence': ['/images/plans/the-residence-plan-1.webp', '/images/plans/the-residence-plan-2.webp'],
  'riva': ['/images/plans/riva-plan-1.webp'],
  'aqua': ['/images/plans/aqua-plan-1.webp'],
  'modwood-cafe': ['/images/plans/modwood-cafe-plan-1.webp'],
  'country': ['/images/plans/country-plan-1.webp'],
  'mediterranean-single-house': ['/images/plans/mediterranean-single-house-plan-1.webp', '/images/plans/mediterranean-single-house-plan-2.webp'],
  'mediterranean-double-house': ['/images/plans/mediterranean-double-house-plan-1.webp', '/images/plans/mediterranean-double-house-plan-2.webp'],
  'premium-model': ['/images/plans/premium-model-plan-1.webp'],
  'garden-cafe': ['/images/plans/garden-cafe-plan-1.webp', '/images/plans/garden-cafe-plan-2.webp'],
  'garden-studio': ['/images/plans/garden-studio-plan-1.webp'],
  'chalet': ['/images/plans/chalet-plan-1.webp', '/images/plans/chalet-plan-2.webp'],
  'estate': ['/images/plans/estate-plan-1.webp'],
  'gothic': ['/images/plans/gothic-plan-1.webp', '/images/plans/gothic-plan-2.webp'],
  'match-point': ['/images/plans/match-point-plan-1.webp'],
  'loft': ['/images/plans/loft-plan-1.webp'],
  'square-of-harmony': ['/images/plans/square-of-harmony-plan-1.webp'],
}

export const plansFor = (slug: string): string[] => floorPlans[slug] ?? []
