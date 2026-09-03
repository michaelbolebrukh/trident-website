/**
 * `client:afterpaint` hydration directive.
 *
 * `client:load` starts fetching the React bundle the moment the island's
 * markup is parsed, before the browser has painted anything. On a slow
 * connection that download competes with the hero image, and Lighthouse's
 * LCP model counts every high-priority script started before the first paint
 * as blocking it.
 *
 * This waits for the browser to report its largest contentful paint, so the
 * server-rendered page, hero image included, is on screen before any
 * JavaScript is requested; hydration then runs at the next idle moment. Where
 * the page marks a hero with fetchpriority="high", that image's paint is the
 * one waited for. A ceiling keeps interactivity prompt if the paint entry is
 * late or never arrives (an early tap stops LCP reporting, for example).
 */
import type { ClientDirective } from 'astro'

const CEILING_MS = 1500

/** Resolves once the largest contentful paint has been reported, or at the ceiling. */
const largestPaintReported = (): Promise<void> =>
  new Promise((resolve) => {
    const timer = setTimeout(resolve, CEILING_MS)
    const done = () => {
      clearTimeout(timer)
      resolve()
    }
    try {
      const hero = document.querySelector('img[fetchpriority="high"]')
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries() as (PerformanceEntry & { element?: Element | null })[]
        if (!hero || entries.some((e) => e.element === hero)) {
          observer.disconnect()
          done()
        }
      })
      observer.observe({ type: 'largest-contentful-paint', buffered: true })
    } catch {
      // No LCP support (Safari): fall back to a frame after the current one.
      requestAnimationFrame(() => setTimeout(done, 0))
    }
  })

const afterPaint: ClientDirective = (load) => {
  const hydrate = async () => {
    const run = await load()
    await run()
  }
  const whenIdle = () =>
    'requestIdleCallback' in window
      ? window.requestIdleCallback(hydrate, { timeout: CEILING_MS })
      : setTimeout(hydrate, 200)
  largestPaintReported().then(whenIdle)
}

export default afterPaint

// Registers the attribute with Astro's component typings. Lives here rather
// than in env.d.ts because a module augmentation has to sit in a module file.
declare module 'astro' {
  interface AstroClientDirectives {
    /** Hydrate after the largest contentful paint has been reported. */
    'client:afterpaint'?: boolean
  }
}
