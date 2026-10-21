/**
 * Two corrections to what @astrojs/sitemap writes:
 *  - every <lastmod> is rewritten from UTC "Z" form to ISO 8601 with the
 *    Europe/London offset (2026-09-07T13:54:50+01:00), the form the audit asked for;
 *  - sitemap-index.xml carries the newest page's date rather than the build time.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { londonStamp } from './lastmod.mjs'

const dist = new URL('../dist/', import.meta.url).pathname
const indexPath = path.join(dist, 'sitemap-index.xml')
let index = readFileSync(indexPath, 'utf8')
for (const file of readdirSync(dist).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
  const p = path.join(dist, file)
  let xml = readFileSync(p, 'utf8')
  const dates = []
  xml = xml.replace(/<lastmod>([^<]+)<\/lastmod>/g, (_, d) => {
    const date = new Date(d)
    dates.push(date)
    return `<lastmod>${londonStamp(date)}</lastmod>`
  })
  writeFileSync(p, xml)
  if (!dates.length) continue
  const newest = dates.sort((a, b) => b - a)[0]
  index = index.replace(new RegExp(`(<loc>[^<]*/${file}</loc>)<lastmod>[^<]*</lastmod>`), `$1<lastmod>${londonStamp(newest)}</lastmod>`)
}
writeFileSync(indexPath, index)
console.log('sitemap: lastmod in Europe/London offset form, index set to newest page')
