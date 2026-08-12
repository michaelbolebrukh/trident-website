// Converts source PNGs to WebP. Run after adding new imagery to src/assets.
import sharp from 'sharp'
import { readdir, stat, unlink } from 'node:fs/promises'
import path from 'node:path'

const DIR = new URL('../src/assets/', import.meta.url).pathname
const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'))

let before = 0
let after = 0

for (const file of files) {
  const src = path.join(DIR, file)
  const out = src.replace(/\.png$/, '.webp')
  before += (await stat(src)).size
  await sharp(src).webp({ quality: 82 }).toFile(out)
  after += (await stat(out)).size
  await unlink(src)
  console.log(`${file} -> ${path.basename(out)}`)
}

const mb = (n) => (n / 1024 / 1024).toFixed(2)
console.log(`\n${mb(before)}MB -> ${mb(after)}MB (${Math.round((1 - after / before) * 100)}% smaller)`)
