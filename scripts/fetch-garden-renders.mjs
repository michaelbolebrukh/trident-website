/**
 * Downloads the Garden Base and Garden Premium renders from Drive.
 *
 *   node scripts/fetch-garden-renders.mjs
 *
 * These are the images the site had been missing. They only ever lived on
 * tridentmodular.com, which answers image requests with a bot-protection
 * challenge, so the site was falling back to a single catalogue render per
 * model. Trident supplied the originals in Drive instead.
 *
 * The source folders hold far more than the site needs — the same building
 * rendered for every use case, in several cladding finishes. Eight per model
 * is what Trident asked for, so the selection is one clean exterior followed
 * by seven use cases, which is what the gallery is actually for: showing the
 * same shell working as an office, a gym, a studio.
 *
 * Fetched over plain HTTPS; the Drive API returns base64 and these run to
 * several megabytes each.
 *
 * ACCESS. These files sit in "Візуалізації AI++" > "Garden house Base" and
 * "Garden house Premium", which are owned by a colleague and are not
 * link-shared. Drive answers a plain HTTPS request for them with a sign-in
 * page, so the download fails with "unsupported image" once sharp is handed
 * the HTML. Everything here is correct and will run as soon as that folder is
 * shared with anyone-with-the-link:
 *
 *   https://drive.google.com/drive/folders/1GkOFVRIRo4ySfsj7X4-qZVtoFxMYAD9z
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/images/library'
mkdirSync(OUT, { recursive: true })

/** [output name, Drive file id, what the render shows] */
const FILES = [
  // Garden Base — ext_1 / ext_2 exteriors, colour 1.
  ['garden-base-01', '1fh2yIMBEX87NLfhDaCQTMzVU3ZJGP6CP', 'exterior'],
  ['garden-base-02', '1s0HvUMEBoK1by-EXY5YeoDrmbAqcyAMM', 'home cinema'],
  ['garden-base-03', '1l_lIOXAgAwnlRxUJDz905kPvKclarErz', 'games room'],
  ['garden-base-04', '14fYBRWHe9zfOcB1SCI7rEWFqHgogUSLn', 'yoga studio'],
  ['garden-base-05', '12CzkM57RSA16cAgFKf9HIh3z24_Q16KW', 'snug'],
  ['garden-base-06', '1gkqS91ZlTrYQcrWEqCGV3G8L_H4sh6Mx', 'garden office'],
  ['garden-base-07', '1cWCeZNr6Lj-RErHzm57G4tEd1QTTkPeo', 'home gym'],
  ['garden-base-08', '1ChArSpNLhn1rA1T8aPHZrWr-T9eQh9HE', 'barbershop'],

  // Garden Premium — the 4500 v2 render, standing-seam cladding.
  ['garden-premium-01', '1gNRxLxE3laS7-5tNN20EVvlCADOmmpxD', 'garden office'],
  ['garden-premium-02', '1mFgl9S8JbiqrMt1a4MQQvCRSIxLlcqcJ', 'home cinema'],
  ['garden-premium-03', '1L_QuNgktQ3oe5jJDoKTTFMiMld8j4SL-', 'games room'],
  ['garden-premium-04', '10iknQV6qtHEAaBdYSgO6gB4Ikj0oHcG_', 'home business'],
  ['garden-premium-05', '165OhOO4oyKyF3Jg6H2hKwu0VCSpZcutE', 'home gym'],
  ['garden-premium-06', '1qmAt1KoMeLQCIlC9kGZ7CVmC5tPRqeLF', 'barbershop'],
  ['garden-premium-07', '1k5TAUV_8DNLPUfnkDb6Z0NnJk4F3YU7C', 'hairdressing studio'],
  ['garden-premium-08', '1lCSucW9h9TJPnFbutjgnAh16HyJ6w7zX', 'yoga studio'],
]

let got = 0
const failed = []
for (const [name, id] of FILES) {
  const dest = join(OUT, `${name}.webp`)
  if (existsSync(dest)) continue
  try {
    const res = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download`)
    if (!res.ok) { failed.push([name, res.status]); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    const out = await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 }).toBuffer()
    writeFileSync(dest, out)
    got++
  } catch (err) { failed.push([name, err.message.slice(0, 40)]) }
}
console.log(`${got} downloaded, ${FILES.length - got - failed.length} already present`)
if (failed.length) { console.log(`${failed.length} failed:`); failed.forEach(f => console.log('  ', ...f)) }
