/**
 * Keeps src/data/post-revisions.json in step with posts.json.
 *
 * For each post it stores a hash of the substantive content (title, body)
 * and the date that hash last changed. The blog template shows that date as
 * "Updated", the Article schema carries it as dateModified and the sitemap
 * as <lastmod>, so a post's modified date moves only when its content does,
 * never on a redeploy. Runs before every build; commit the JSON with the
 * post change so CI sees the same date.
 */
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'

const POSTS = new URL('../src/data/posts.json', import.meta.url)
const REVISIONS = new URL('../src/data/post-revisions.json', import.meta.url)

const posts = JSON.parse(readFileSync(POSTS, 'utf8'))
const revisions = existsSync(REVISIONS) ? JSON.parse(readFileSync(REVISIONS, 'utf8')) : {}

const stamp = () => {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZoneName: 'longOffset' }).formatToParts(new Date())
  const get = (t) => parts.find((p) => p.type === t)?.value
  const off = get('timeZoneName') === 'GMT' ? '+00:00' : get('timeZoneName').replace('GMT', '')
  return `${get('year')}-${get('month')}-${get('day')}T${get('hour').replace('24', '00')}:${get('minute')}:${get('second')}${off}`
}

let changed = 0
const next = {}
for (const p of posts) {
  const hash = createHash('sha256').update(`${p.title}\n${p.html}`).digest('hex').slice(0, 16)
  const prev = revisions[p.slug]
  if (prev && prev.hash === hash) {
    next[p.slug] = prev
  } else {
    next[p.slug] = { hash, modified: stamp() }
    changed++
  }
}
writeFileSync(REVISIONS, JSON.stringify(next, null, 1) + '\n')
console.log(`post revisions: ${changed} changed, ${posts.length - changed} unchanged`)
