/**
 * srcset/sizes for the photo libraries under public/images/.
 *
 * scripts/build-responsive-images.mjs writes narrower copies of every image
 * into an `r/` folder beside the originals and records intrinsic sizes in
 * image-sizes.generated.json. This turns a library path into the attributes
 * an <img> needs to let the browser pick the smallest adequate file.
 *
 * Paths outside the libraries (placeholder SVG, hashed assets) pass through
 * with only `src` set, so callers can spread the result unconditionally.
 */
import sizes from '../data/image-sizes.generated.json'

interface Entry {
  w: number
  h: number
  /** Variant widths that exist in r/. */
  v: number[]
}

const manifest = sizes as Record<string, Entry>

export interface ResponsiveImage {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
}

/**
 * Sizes hints for the layouts the site actually uses. The card values follow
 * the grids: three columns from `lg`, two from `sm`, one below.
 */
export const SIZES = {
  full: '100vw',
  card: '(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw',
  half: '(min-width: 1024px) 50vw, 100vw',
  thumb: '80px',
} as const

export function responsive(src: string, sizesHint: string = SIZES.full): ResponsiveImage {
  const entry = manifest[src]
  if (!entry) return { src }

  const dir = src.slice(0, src.lastIndexOf('/'))
  const base = src.slice(src.lastIndexOf('/') + 1).replace(/\.webp$/, '')
  const candidates = [
    ...entry.v.map((w) => `${dir}/r/${base}-${w}.webp ${w}w`),
    `${src} ${entry.w}w`,
  ]

  return {
    src,
    srcSet: candidates.join(', '),
    sizes: sizesHint,
    width: entry.w,
    height: entry.h,
  }
}

/** Intrinsic size only, for preload hints and schema image fields. */
export const imageSize = (src: string): { w: number; h: number } | undefined => manifest[src]
