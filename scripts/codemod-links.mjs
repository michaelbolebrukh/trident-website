/**
 * One-shot codemod: rewrites the Figma Make export's state-based navigation
 * into real anchors.
 *
 *   <button onClick={() => navigate('contact')} className="x">Talk</button>
 *   -> <a href="/contact/" className="x">Talk</a>
 *
 * Static navigate() targets only. Dynamic ones (navigate(l.page)) and calls
 * inside event handlers are left alone and reported at the end for manual work.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const DIR = new URL('../src/components/', import.meta.url).pathname

const routes = {
  home: '/',
  catalogue: '/catalogue/',
  installation: '/installation/',
  bespoke: '/bespoke/',
  gallery: '/gallery/',
  about: '/about/',
  blog: '/blog/',
  faq: '/faq/',
  contact: '/contact/',
  product: '/catalogue/garden-premium/', // placeholder model until real data lands
}

/**
 * Index of the `>` closing a JSX opening tag. Scans past braces and quotes so
 * the `>` in an arrow function (`onClick={() => ...}`) doesn't end the tag.
 */
function findTagEnd(src, openIdx) {
  let brace = 0
  let quote = null
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i]
    if (quote) {
      if (c === quote && src[i - 1] !== '\\') quote = null
      continue
    }
    if (c === '"' || c === "'" || c === '`') quote = c
    else if (c === '{') brace++
    else if (c === '}') brace--
    else if (c === '>' && brace === 0) return i
  }
  return -1
}

/** Index of the `</button>` that closes the `<button` opening at `openIdx`. */
function findMatchingClose(src, openIdx) {
  let depth = 0
  const re = /<button\b|<\/button>/g
  re.lastIndex = openIdx
  let m
  while ((m = re.exec(src))) {
    if (m[0] === '</button>') {
      depth--
      if (depth === 0) return m.index
    } else depth++
  }
  return -1
}

let converted = 0
const leftovers = []

for (const file of (await readdir(DIR)).filter((f) => f.endsWith('.tsx'))) {
  const full = path.join(DIR, file)
  let src = await readFile(full, 'utf8')

  // Work backwards so earlier indices stay valid as we splice.
  const opens = [...src.matchAll(/<button\b/g)].map((m) => m.index).reverse()

  for (const openIdx of opens) {
    const closeIdx = findMatchingClose(src, openIdx)
    if (closeIdx === -1) continue

    const tagEnd = findTagEnd(src, openIdx)
    if (tagEnd === -1) continue
    const tag = src.slice(openIdx, tagEnd + 1)

    const nav = tag.match(/onClick=\{\(\) => navigate\(['"](\w+)['"]\)\}\s*/)
    if (!nav) continue

    const href = routes[nav[1]]
    if (!href) continue

    const newTag = tag
      .replace(nav[0], '')
      .replace(/^<button\b/, `<a href="${href}"`)
      .replace(/\s+>/, '>')

    src =
      src.slice(0, openIdx) +
      newTag +
      src.slice(tagEnd + 1, closeIdx) +
      '</a>' +
      src.slice(closeIdx + '</button>'.length)
    converted++
  }

  for (const m of src.matchAll(/.*navigate\(.*/g)) {
    leftovers.push(`${file}: ${m[0].trim().slice(0, 100)}`)
  }

  await writeFile(full, src)
}

console.log(`Converted ${converted} buttons to anchors.\n`)
console.log(`Remaining navigate() references (${leftovers.length}) — handle by hand:`)
for (const l of leftovers) console.log('  ' + l)
