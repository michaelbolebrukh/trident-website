# Garden Base and Garden Premium renders

Where the eight-per-model renders in `public/images/library/garden-{base,premium}-NN.webp`
came from, and why getting them was awkward — so nobody repeats the search.

## The problem

The WordPress export points these two models at 22 renders under
`2026/06/ext_*.jpg` and `2026/06/premium_4500_*.jpg`. Those are UK-only, so
they exist on tridentmodular.com and nowhere else:

- the `.ua` media library 404s on every filename variant, including the
  WordPress `-1` collision suffixes and every generated thumbnail size
- the Wayback Machine holds no snapshot
- tridentmodular.com answers with a SiteGround bot challenge (HTTP 202 and a
  captcha) — not only for images but for `/wp-json/` too, so it is an
  IP-level block rather than anything image-specific

## Where they actually live

Google Drive, owned by a colleague:

    Візуалізації AI++            1GkOFVRIRo4ySfsj7X4-qZVtoFxMYAD9z
      ├─ Garden house Base       1dSIaK-XdepRK9hGisJr_i9r0Mcy74CUB
      └─ Garden house Premium    1h17SItCqtiaPqEhPz_Mz-5dTAKg9lJef

That folder's only permission is its owner, so a plain HTTPS request to
`drive.usercontent.google.com/download` returns Google's sign-in page rather
than the file. Anything that pipes the response straight into an image library
fails with "unsupported image", which is the HTML being decoded as a JPEG.

## How they were fetched

Through the authenticated Drive tooling rather than over HTTPS, one file at a
time, decoding base64 to disk and converting with sharp. `garden-render-map.json`
records which Drive file id became which local name, so the set can be rebuilt
or extended without hunting through the folder tree again.

## The selection

Eight per model, as asked. One clean exterior, then seven use cases — garden
office, home gym, home cinema, games room, yoga studio, barbershop, snug — so
the gallery shows the same shell doing different jobs. The export's own
variants were the same building in three colours with and without a wood
front, which reads as eight near-identical exteriors.

The renders are held in `src/data/overrides.ts` as site-absolute paths, which
bypass `image-map.json`; see `houseImage` in `src/data/homes.ts`.
