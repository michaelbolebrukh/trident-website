/**
 * <lastmod> for the sitemap: when each page last changed, from git.
 *
 * A page changes when its route file or the components and data it imports
 * (two levels deep) change. Blog posts use their
 * publication date from posts.json instead, since that is the date shown on
 * the page. Dates are ISO 8601 with the Europe/London offset.
 *
 * In a shallow checkout every file reports the same commit, so the deploy
 * workflow checks out the full history.
 */
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
// Layout, header and footer are deliberately left out: a navigation tweak
// touches every page's HTML but changes no page's content.
const SHARED = []

const gitDate = (files) => {
  const present = files.filter((f) => existsSync(path.join(ROOT, f)))
  if (!present.length) return undefined
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...present], { cwd: ROOT, encoding: 'utf8' }).trim()
    return out ? new Date(out) : undefined
  } catch {
    return undefined
  }
}

const importsOf = (file) => {
  const src = readFileSync(path.join(ROOT, file), 'utf8')
  const dir = path.dirname(file)
  const out = []
  for (const m of src.matchAll(/from\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
    const base = path.normalize(path.join(dir, m[1]))
    for (const cand of [base, `${base}.ts`, `${base}.tsx`, `${base}.astro`, `${base}/index.ts`]) {
      if (existsSync(path.join(ROOT, cand)) && !/\.(webp|png|jpg|svg)$/.test(cand)) { out.push(cand); break }
    }
  }
  return out
}

const pageFile = (pathname) => {
  if (pathname === '/') return 'src/pages/index.astro'
  const stem = pathname.replace(/^\/|\/$/g, '')
  for (const cand of [`src/pages/${stem}.astro`, `src/pages/${stem}/index.astro`]) if (existsSync(path.join(ROOT, cand))) return cand
  if (stem.startsWith('houses/')) return 'src/pages/houses/[slug].astro'
  if (stem.startsWith('houses-type/')) return 'src/pages/houses-type/[category].astro'
  if (stem.startsWith('blog/')) return 'src/pages/blog/[slug].astro'
  return undefined
}

let posts
const postDate = (pathname) => {
  posts ??= JSON.parse(readFileSync(path.join(ROOT, 'src/data/posts.json'), 'utf8'))
  const slug = pathname.replace(/^\/blog\/|\/$/g, '')
  const post = posts.find((p) => p.slug === slug)
  return post ? new Date(londonIso(post.dateModified ?? post.date)) : undefined
}

export function londonIso(local) {
  if (/[Zz]|[+-]\d\d:\d\d$/.test(local)) return local
  const guess = new Date(local + 'Z')
  const part = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', timeZoneName: 'longOffset' })
    .formatToParts(guess).find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  return `${local}${part === 'GMT' ? '+00:00' : part.replace('GMT', '')}`
}

const cache = new Map()
export function lastmodFor(url) {
  const pathname = new URL(url).pathname
  if (/^\/blog\/[^/]+\/$/.test(pathname)) return postDate(pathname)
  const file = pageFile(pathname)
  if (!file) return undefined
  if (!cache.has(file)) {
    const files = new Set([file, ...SHARED])
    for (const dep of importsOf(file)) {
      files.add(dep)
      for (const dep2 of importsOf(dep)) files.add(dep2)
    }
    cache.set(file, gitDate([...files]))
  }
  return cache.get(file)
}
