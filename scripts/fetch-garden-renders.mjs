/**
 * Downloads the Garden Base and Garden Premium renders from Drive.
 *
 *   node scripts/fetch-garden-renders.mjs
 *
 * These are the originals the old site used — the same filenames the
 * WordPress export points at, which tridentmodular.com would not serve us
 * because of its bot protection. Trident supplied them from Drive instead.
 *
 * The set is the real product range: two exterior layouts (ext_1 and ext_2),
 * three colours, each with and without the wood front, plus the beam variants
 * and the Premium 4500. Ordering below runs plain exteriors, then colours,
 * then wood front, then beam, so the gallery reads as a range rather than a
 * shuffle.
 *
 * Fetched over plain HTTPS; the Drive API returns base64 and these run to
 * several megabytes each.
 */
import { writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import sharp from 'sharp'

const OUT = 'public/images/library'
mkdirSync(OUT, { recursive: true })

/** [output name, Drive file id, original filename] */
const FILES = [
  // ── Garden Base ────────────────────────────────────────────────────────
  ['garden-base-01', '19rRjShA1U5aYRaOpSQZZH1ofu2kvw-81', 'ext_1_color_1_s_'],
  ['garden-base-02', '10IHAHnzjQsNjusmeb2_DoMqWYtIeGvgI', 'ext_2_color_2_s'],
  ['garden-base-03', '1kfoHW8KVQftDuOhtd7tepZd7mXa8u382', 'ext_2_color_3_s_'],
  ['garden-base-04', '1QkNdoxzrhN5h3jP_eWeZQEj-1Gkc9Lid', 'ext_2_color_1_woodfront_s_'],
  ['garden-base-05', '1RmyLfqnPpiwoJaeQ8sHQ8wznNZm4Mihd', 'ext_2_color_2_woodfront_s_'],
  ['garden-base-06', '1MXRfjq5TTq2YDwSR083b4AcSEqkLz7aB', 'ext_2_color_3_woodfront_s_'],
  ['garden-base-07', '1qJnO2ssMOZ30PzsuQzWX0-Q5n1bwR0hz', 'ext_1_color_1____balka'],
  ['garden-base-08', '1Ona230M_FcxKI5w17fgoqyVMG8izi_hG', 'ext_2_color_1______balka'],

  // ── Garden Premium ─────────────────────────────────────────────────────
  ['garden-premium-01', '1UcBPygeO-Qyu3IstUHqf0bE7slllNhCs', 'Premium_4500_v1_s'],
  ['garden-premium-02', '1R_spp9EPr6N0T-nCLL3gBx-yQN9C9G9i', 'ext_1_color_2_s'],
  ['garden-premium-03', '1DoIP1vVt6fTTNICHpAYQcOdi1XuuOIlr', 'ext_1_color_3_s-1'],
  ['garden-premium-04', '1e8jNu7_6zFp8cFE3TG6YVHVXFurA1NTh', 'ext_2_color_2_s-1'],
  ['garden-premium-05', '1uq2dlMi7gLhV5K_PiEilLvfj_twnKXX5', 'ext_2_color_3_s'],
  ['garden-premium-06', '1gB2Soi5o5h8jNVAOa_gKkps6wD8dqhNc', 'ext_1_color_1_woodfront_s'],
  ['garden-premium-07', '15SFMt0hLa3ERgpfFeb2ajEHYSzNcGvG0', 'ext_1_color_2_woodfront_s'],
  ['garden-premium-08', '1b36Ku_qjnoGkWGzl3VCyBse9-LO_w2Ad', 'ext_1_color_3_woodfront_s-1'],
  ['garden-premium-09', '1-9Qpw662pmz_jqTXkRR1bsB0RVjeIihT', 'ext_2_color_1_woodfront_s'],
  ['garden-premium-10', '16ZkcaP_0IsBYvDKLFEy-_elMK-3waQ64', 'ext_2_color_2_woodfront_s'],
  ['garden-premium-11', '1b1VbUNV6Go92_YnM7vQslmvVoD-_prkj', 'ext_2_color_3_woodfront_s'],
  ['garden-premium-12', '1HaJHpb8gRlH8CSKmqAKdDQ2pi40yA4se', 'Premium_4500_v1_____balka'],
]

let got = 0
let bytesIn = 0
let bytesOut = 0
const failed = []
for (const [name, id] of FILES) {
  const dest = join(OUT, `${name}.webp`)
  if (existsSync(dest)) continue
  try {
    const res = await fetch(`https://drive.usercontent.google.com/download?id=${id}&export=download`)
    if (!res.ok) { failed.push([name, res.status]); continue }
    const buf = Buffer.from(await res.arrayBuffer())
    // Drive answers with a sign-in page rather than an error when a file is
    // not readable, so check we were given an image before handing it to sharp.
    if (buf.subarray(0, 2).toString('hex') !== 'ffd8') { failed.push([name, 'not a JPEG — check sharing']); continue }
    bytesIn += buf.length
    const webp = await sharp(buf).rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 }).toBuffer()
    bytesOut += webp.length
    writeFileSync(dest, webp)
    got++
  } catch (err) { failed.push([name, err.message.slice(0, 50)]) }
}
const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`${got} downloaded, ${FILES.length - got - failed.length} already present`)
if (bytesIn) console.log(`${mb(bytesIn)}MB -> ${mb(bytesOut)}MB WebP`)
if (failed.length) { console.log(`${failed.length} failed:`); failed.forEach((f) => console.log('  ', ...f)) }
