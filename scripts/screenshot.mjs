import { chromium } from 'playwright'
const OUT = '/tmp/claude-0/-home-user-trident-website/18711133-a19e-597b-a8fd-6de3a5b19c5b/scratchpad'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const errors = []
for (const [name, path, vw] of [
  ['home', '/', 1440], ['catalogue', '/catalogue/', 1440],
  ['product', '/catalogue/loft/', 1440], ['contact', '/contact/', 1440],
  ['home-mobile', '/', 390],
]) {
  const page = await browser.newPage({ viewport: { width: vw, height: 900 } })
  // Unsplash hotlinks are unreachable from the sandbox; abort them so load fires.
  await page.route('**://images.unsplash.com/**', (r) => r.abort())
  await page.route('**://fonts.googleapis.com/**', (r) => r.abort())
  page.on('console', (m) => m.type() === 'error' && errors.push(`${name}: ${m.text()}`))
  page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`))
  await page.goto('http://localhost:4321' + path, { waitUntil: 'domcontentloaded' })
  await page.screenshot({ path: `${OUT}/shot-${name}.png`, fullPage: false })
  await page.close()
}
await browser.close()
console.log(errors.length ? 'CONSOLE ERRORS:\n' + errors.join('\n') : 'No console errors.')
