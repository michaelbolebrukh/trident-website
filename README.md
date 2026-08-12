# tridentmodular.com

Marketing site for Trident Modular. Built with [Astro](https://astro.build) —
every page is pre-rendered to static HTML, with React used only for the
interactive pieces (mega menu, catalogue filters, enquiry forms).

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output to dist/
npm run preview  # serve the built site
```

## Structure

```
src/
  pages/           One file per URL. Astro generates the routes from this.
  components/      React components, carried over from the Figma Make design.
  layouts/         BaseLayout.astro — <head>, SEO tags, header and footer.
  data/homes.ts    The product range. Drives /catalogue/<slug>/ pages.
  lib/routes.ts    Canonical path for every page. Link via this, not literals.
  assets/          Imagery. Imported by components and hashed at build time.
public/            Copied to the site root verbatim (.htaccess, favicon, PHP).
scripts/           One-off and maintenance scripts.
```

Adding a home to `src/data/homes.ts` automatically creates its product page.

## Outstanding before launch

- **Pricing is placeholder.** The figures in `src/data/homes.ts` came from the
  Figma Make export and do not match the real price list (it lists Garden Base
  at £11,200 kit against an actual £6,200). Replace them or remove prices.
- **Photography is stock.** Most images hotlink to Unsplash. Replace with real
  project photography before launch — they currently show other people's
  buildings as though they were Trident's.
- **Contact details are placeholder** — `01234 567 890` and
  `hello@tridentmodular.com` appear in the header, footer and contact page.
- **Legal links** (privacy policy, terms) point at `#`.

## Contact form

`public/api/contact.php` handles enquiry submissions — the only server-side
code on the site. Set `MAIL_TO` and `MAIL_FROM` at the top of that file before
launch. `MAIL_FROM` must be a real mailbox on the sending domain or the host
will reject or spam-bin the mail.

It validates server-side, rate-limits per IP, and uses a honeypot field for
spam. Requires PHP 8.1+ (Hostinger is on 8.3).

## Images

Source imagery lives in `src/assets/` as WebP. After adding new PNGs there:

```bash
node scripts/optimize-images.mjs   # converts to WebP, removes the PNGs
```

## Deployment

`.github/workflows/deploy.yml` builds and rsyncs to Hostinger over SSH.

- **Push to `main`** → deploys to staging, built with `PUBLIC_NOINDEX=1` so
  the temporary domain is excluded from search engines.
- **Manual run** with target `production` → deploys the indexable build.

Required repository secrets (Settings → Secrets and variables → Actions):

| Secret | Value |
| --- | --- |
| `SSH_HOST` | Hostinger SSH hostname |
| `SSH_PORT` | SSH port (Hostinger usually 65002) |
| `SSH_USER` | SSH username |
| `SSH_KEY` | Private key, full contents including header and footer lines |
| `SSH_PATH` | Absolute document root, e.g. `/home/uXXX/domains/<domain>/public_html` |

`SSH_PATH` must point at the document root and nothing above it — the rsync
uses `--delete`, which removes anything at the destination not present in the
build.
