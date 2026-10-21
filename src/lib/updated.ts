/**
 * "Last updated: August 2026" for pages that state prices or specifications.
 *
 * The date is the last commit that touched the data the page is built from,
 * so it moves only when a price or a specification actually changes, never
 * on a redeploy or a copy edit elsewhere. Resolved at build time; the deploy
 * workflow checks out full history so the dates are real.
 */
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

/** The files whose change counts as an update for each kind of page. */
export const UPDATE_SOURCES = {
  model: ['src/data/pricing.ts', 'src/data/model-details.ts', 'src/data/catalogue-specs.ts', 'src/data/homes.generated.ts', 'src/data/overrides.ts', 'src/data/floor-plans.ts'],
  technology: ['src/data/build-ups.ts', 'src/data/technology.ts'],
  bopas: ['src/data/accreditation.ts'],
  faq: ['src/data/faq.ts'],
  planning: ['src/pages/planning-permission-modular-homes.astro'],
  buildingRegs: ['src/pages/building-regulations-modular-homes.astro'],
  warranty: ['src/pages/warranty.astro', 'src/data/accreditation.ts'],
  caseStudies: ['src/data/case-studies.ts', 'src/data/projects.ts'],
} as const

const cache = new Map<string, string | undefined>()

function gitDate(files: readonly string[]): Date | undefined {
  const present = files.filter((f) => existsSync(path.join(ROOT, f)))
  if (!present.length) return undefined
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...present], { cwd: ROOT, encoding: 'utf8' }).trim()
    return out ? new Date(out) : undefined
  } catch {
    return undefined
  }
}

/** "August 2026", or undefined when git history is not available. */
export function lastUpdated(kind: keyof typeof UPDATE_SOURCES): string | undefined {
  if (!cache.has(kind)) {
    const d = gitDate(UPDATE_SOURCES[kind])
    cache.set(kind, d && new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric', timeZone: 'Europe/London' }).format(d))
  }
  return cache.get(kind)
}

/** The same date as an ISO day, for a <time datetime> attribute. */
export function lastUpdatedIso(kind: keyof typeof UPDATE_SOURCES): string | undefined {
  const d = gitDate(UPDATE_SOURCES[kind])
  return d?.toISOString().slice(0, 10)
}
