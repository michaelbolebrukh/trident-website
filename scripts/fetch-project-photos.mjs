/**
 * Downloads the project photography from the shared Drive folder.
 *
 *   node scripts/fetch-project-photos.mjs
 *
 * Files are fetched over plain HTTPS rather than through the Drive API: the
 * API hands back base64, and these run to several megabytes each.
 *
 * The selection is deliberate rather than the whole folder — the Chiswick set
 * is professional photography and carries the page, the rest are site records
 * of finished installations.
 *
 * Four HEIC files from the Kensington and Wimbledon shoots are left out: they
 * fail to decode (libheif reports a bad seek past the end of the data), and
 * every project still has photography without them.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/images/projects'
mkdirSync(OUT, { recursive: true })

/** [project slug, output name, Drive file id] */
const FILES = [
  ['chiswick', 'chiswick-01', '1jiCtssrFN2cSwH5mL0GLZAR_JpWo2ICe'],
  ['chiswick', 'chiswick-02', '1MkifQEQGqnXi9ybXN_wp8LE5jbBvuLPQ'],
  ['chiswick', 'chiswick-03', '1mWiLMqAL6am7oegu6AiSQUEc09mogfxp'],
  ['chiswick', 'chiswick-04', '1CfrSLW6lr_HNE8a04QpahsvYhRF1OXfP'],
  ['chiswick', 'chiswick-05', '1buQbWzrhUoS_2JVEBlB_GQJtHdGsaak4'],
  ['chiswick', 'chiswick-06', '1uU5ZyM6y183okmAUuSfbzK_q-3Bf4fL-'],
  ['chiswick', 'chiswick-07', '1GyOTNzRUIpk1Nv8OlF4Z34Ws8Mvw1Adz'],
  ['chiswick', 'chiswick-08', '1nQ_lT2CDt0rn4CUIZZ7OfaLFCCwaxKQC'],
  ['chiswick', 'chiswick-09', '1vPMMtat2BKbOkwFFhfrCfLJbSt7k4ksu'],
  ['chiswick', 'chiswick-10', '11xk6tHlqw1ThLtHuzalUKPOqiLmviJAj'],
  ['chiswick', 'chiswick-11', '1gay0z5Hw7B9COa6SE_nfaQCU8pVF8jYG'],
  ['chiswick', 'chiswick-12', '10rffBv5bLt5cx93UDTtuVdiooWemo79T'],
  ['chiswick', 'chiswick-13', '1aAO9D1TLz8sT1toqVDxcyfIL2fJAxRsn'],
  ['chiswick', 'chiswick-14', '1IH7Gcv8z5ivQ_hUvP-DKMUn6yx5BSBH9'],
  ['chiswick', 'chiswick-15', '1la7FZPen1fKI948R7J_phSI1jlrq45sB'],
  ['chiswick', 'chiswick-16', '1Ux87prR5p9B_6cMF7jFZleM8NI2Tdawq'],

  ['philbeach', 'philbeach-01', '1SkbGotHRPMebbnqXIfGudEqSISqgaffg'],
  ['philbeach', 'philbeach-02', '1E82f6jT71ULXX8lUwocHAFgxvcrDWcFk'],
  ['philbeach', 'philbeach-03', '1TbfbCMMwwFk8tXqNcA9ny5Bucm8_dht4'],
  ['philbeach', 'philbeach-04', '1KGDZfl-ypJRGVCoXO-Q4Bxzx8zEk3tL7'],
  ['philbeach', 'philbeach-05', '17ZR1v8nP8mrj5bgJsIcWDANHQvMaVn0r'],
  ['philbeach', 'philbeach-06', '1fWvGg7Zn_tp9TCVssLg5_sPvkHWHVN1-'],
  ['philbeach', 'philbeach-07', '1ErkMlV3SU4xi2t-tz5mfJjcB6b7DxlV_'],

  ['wimbledon', 'wimbledon-01', '19o1RiX3nSHF9hnAXbw73BlihyYIMiFx3'],
  ['wimbledon', 'wimbledon-02', '164oNLkgcwgOiGzdVmIYPeoTlhUnYe3VB'],
  ['wimbledon', 'wimbledon-03', '16Rzb4Bx35zdvmfvxNwZwI4rGDCaov0gR'],
  ['wimbledon', 'wimbledon-04', '110k6iY1VSG6ANWNd_-YCv0gsXov4FrYN'],
  ['wimbledon', 'wimbledon-05', '1oOzotbkRhftLs1NWmpN5VCvs6HRDbgd1'],

  ['kensington', 'kensington-01', '1YJ4ugQcXKFOcDnXjEmMc8UkuzoTh6KQn'],
  ['kensington', 'kensington-02', '1dIzTuvDNmX_q91ulMLVmZFdJ6YlB0bAM'],
  ['kensington', 'kensington-03', '1DUtFgABd2N4XCXwtw8CHkFaNEaW08-RA'],

  ['kent', 'kent-01', '1743L9j2ZtKEbbUH6jJ0Ouyx8kQQN0RYN'],
  ['kent', 'kent-02', '1d6pnzgv4vsc4_pRBwcyPX_IMVBWXYy3G'],
  ['kent', 'kent-03', '1MVACopVDrHq-lv8JI8M6n0lySF4b22zT'],
  ['kent', 'kent-04', '1OJcKlQ7vKC7V_V1fnVWOiyD3G-Yc0Kxy'],
  ['kent', 'kent-05', '1sW8en6KthPwfiizGQlYpeZV4FPeYYf8S'],
  ['kent', 'kent-06', '1T5_3fNM3uCNRrCkLZsoNKWbn0lwCxtg3'],
]

let got = 0
const failed = []
for (const [, name, id] of FILES) {
  const dest = join(OUT, `${name}.webp`)
  if (existsSync(dest)) continue
  try {
    const res = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download`)
    if (!res.ok) { failed.push([name, res.status]); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    // rotate() applies the EXIF orientation phones record instead of rotating
    // pixels, without which half of these come out on their side.
    const out = await sharp(buf).rotate().resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 }).toBuffer()
    writeFileSync(dest, out)
    got++
  } catch (err) { failed.push([name, err.message.slice(0, 40)]) }
}
console.log(`${got} downloaded, ${FILES.length - got - failed.length} already present`)
if (failed.length) { console.log(`${failed.length} failed:`); failed.forEach(f => console.log('  ', ...f)) }
