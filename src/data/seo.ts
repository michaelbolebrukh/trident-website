/**
 * Page titles and meta descriptions.
 *
 * Rewritten in the September 2026 technical SEO pass. Titles aim for 60
 * characters or fewer, descriptions for 155 or fewer, and every claim in them
 * is read from the same data the page renders: pricing.ts, model-details.ts,
 * homes.ts, categories.ts, posts.json.
 *
 * Three groups:
 *
 *  - Core pages and categories: hand-set here, in `seo` and `categoryTitles`.
 *  - Model pages: "<Model> — <descriptor> | Trident Modular", with the
 *    descriptor and description hand-set per model in model-seo.ts from the
 *    model's own catalogue copy. No prices in titles or descriptions; the
 *    Product schema carries those.
 *  - Blog posts: the titles and descriptions the old site served, kept where
 *    they exist so what is indexed is what we serve. Descriptions longer than
 *    155 characters are cut at a sentence end.
 *
 * Purchase options are always named as pricing.ts names them: "Shell
 * delivered", "Shell + Assembly", "Turnkey base".
 */
import type { Home } from './homes'
import { detailFor } from './model-details'
import type { CategoryTerm } from './categories'
import { modelSeo as modelCopy } from './model-seo'

export const SITE_NAME = 'Trident Modular'

/** Separator used in generated titles. */
export const TITLE_SEP = '|'

export const TITLE_MAX = 60
export const DESCRIPTION_MAX = 155

/** "<Page title> | Trident Modular", dropping the brand when it would not fit. */
export const defaultTitle = (pageTitle: string): string => withBrand(pageTitle)

const withBrand = (title: string): string => {
  const full = `${title} ${TITLE_SEP} ${SITE_NAME}`
  return full.length <= TITLE_MAX ? full : title
}

/**
 * Cut a description to 155 characters, preferring a sentence end and never
 * splitting a word. Used for carried-over copy written before the limit.
 */
export function clampDescription(text: string, max = DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const head = clean.slice(0, max)
  const sentence = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '))
  if (sentence >= max * 0.55) return head.slice(0, sentence + 1)
  if (head.endsWith('.')) return head
  // No sentence end: a clause boundary, else the last whole word, dropping
  // any function word left dangling at the cut.
  const clause = Math.max(head.lastIndexOf('; '), head.lastIndexOf(' — '), head.lastIndexOf('—'))
  const cut = clause >= max * 0.55 ? head.slice(0, clause) : head.slice(0, Math.max(head.lastIndexOf(' '), 1))
  return cut.replace(/[,;:—\s]+$/, '').replace(/\s+(a|an|and|as|at|by|for|from|in|of|on|or|our|the|their|to|with|your)$/i, '') + '.'
}

export interface SeoEntry {
  title?: string
  description?: string
}

/**
 * Keyed by the path this site serves, which is the path tridentmodular.com
 * served too.
 */
export const seo: Record<string, SeoEntry> = {
  // ─── Core pages ───────────────────────────────────────────────────────
  '/': {
    title: 'Modular Homes UK | Trident Modular — Factory-Built Houses',
    description:
      'Factory-built modular homes, garden rooms and commercial buildings for the UK, from first design to installation. Browse the range or request a quote.',
  },
  '/modular-homes/': {
    title: 'Modular Homes UK — Prefab & Pre-Built Houses | Trident Modular',
    description:
      'Modular, prefab and pre-built homes for the UK: what the terms mean, the Trident range by category, why factory-built, and the three ways to buy.',
  },
  '/kit-homes/': {
    title: 'Kit Homes UK — Flat Pack & Self-Assembly Houses | Trident Modular',
    description:
      'Kit homes and flat pack houses for self-assembly in the UK: what the Shell delivered option includes, which models are available and how it compares.',
  },
  '/modular-homes-prices/': {
    title: 'Modular Home Prices UK 2026 — Full Cost Guide | Trident Modular',
    description:
      'How much a modular home costs in the UK: from-prices for every Trident model across Shell delivered, Shell + Assembly and Turnkey base, with price per m².',
  },
  '/modular-homes-for-sale/': {
    title: 'Modular Homes for Sale UK — Buy a Prefab House | Trident Modular',
    description:
      'Buy a factory-built modular home in the UK: the Trident range by class, how the three purchase options work, and what a Turnkey base handover includes.',
  },
  '/factory-built-homes/': {
    title: 'Factory-Built & Ready-Made Homes UK | Trident Modular',
    description:
      'What factory-built means at Trident: timber-frame panels made under quality control, ready-made garden buildings, and how they differ from mobile homes.',
  },
  '/self-build-modular-homes/': {
    title: 'Self-Build Modular Homes UK — Build Your Own Prefab | Trident Modular',
    description:
      'Self-build with a factory-made shell: what Shell delivered brings to site, what stays with you, which models suit self-builders and how BOPAS helps.',
  },
  '/london/': {
    title: 'Modular Homes & Garden Rooms London | Trident Modular',
    description:
      'Trident Modular in London: a registered office in EC4, Greater London delivery included in house prices, and garden rooms built in Chiswick and Wimbledon.',
  },
  '/houses/': {
    title: 'Modular Homes UK: Full Range & Prices | Trident Modular',
    description:
      'Every Trident model in one place: garden rooms, bungalows, 1.5 and 2 storey modular homes. Filter by floor area, sort by price; all prices from, excl. VAT.',
  },
  '/about_us/': {
    title: 'About Trident Modular | UK Modular Home Specialists',
    description:
      'Who Trident Modular are and how we work: factory-built modular and frame-built homes for the UK, managed from design through to installation.',
  },
  '/technology/': {
    title: 'Closed Panel Timber Frame Technology | Trident Modular',
    description:
      'How Trident builds: a closed-panel timber frame system to ISO 9001:2015, with C24 structural timber and non-combustible basalt wool insulation.',
  },
  '/bopas-and-certificates/': {
    title: 'BOPAS Accreditation & Certificates | Trident Modular',
    description:
      'Trident Modular is BOPAS accredited and ISO 9001:2015 certified, with a 60-year durability assessment: the assurance lenders and warranty providers need.',
  },
  '/installation/': {
    title: 'Delivery & Installation of Modular Homes | Trident Modular',
    description:
      'How a Trident build reaches your site: groundworks, delivery, craning and structural assembly, through to a fully finished handover, anywhere in the UK.',
  },
  '/customise-your-build/': {
    title: 'Bespoke & Commercial Modular Buildings UK | Trident Modular',
    description:
      'Bespoke modular design for homes, workspaces and commercial buildings across the UK. Tell us the site and the brief and we develop a tailored building.',
  },
  '/gallery/': {
    title: 'Modular Home Project Gallery | Trident Modular',
    description:
      'Photographs of completed Trident installations across the UK, from bare frames on site through to finished modular homes and garden rooms.',
  },
  '/blog/': {
    title: 'Modular Construction Blog & Insights | Trident Modular',
    description:
      'Articles from the Trident Modular team on modular construction: trends, transport, sustainability, garden rooms, frame construction and case studies.',
  },
  '/faq/': {
    title: 'Modular Homes FAQ: Prices & Planning | Trident Modular',
    description:
      'Answers on pricing and VAT, planning permission, lead times, foundations, insulation values and what is included at each completion stage.',
  },
  '/contact-us/': {
    title: 'Contact Trident Modular | Request a Quote',
    description:
      'Tell us about your project and the Trident team will suggest the right next step. Call +44 7443 285068, email contact@tridentmodular.com or send the form.',
  },

  // ─── Blog posts: what tridentmodular.com served, kept for continuity ──
  '/blog/best-use-cases-of-modular-houses/': {
    title: '8 Best Use Cases of Modular Houses | Trident Modular UK',
    description:
      'Discover the best use cases of modular houses, from garden offices and guest homes to rental units and holiday lodges. Explore how modular living adds flexible, high-quality space.',
  },
  '/blog/green-roofs-solar-panels-modular-home-options/': {
    title: 'Green Roofs, Solar Panels & Bespoke Modular Home Options',
    description:
      'Explore green roofs, solar panels, heat pumps and bespoke design services available for Trident Modular homes, garden rooms and annexes.',
  },
  '/blog/modular-garden-house-integrated-fireplace/': {
    title:
      '4 Week Modular Garden House Case Study with Integrated Fireplace | Trident Modular',
    description:
      'Explore our latest modular garden house—precision-built off-site, installed in days, with cedar cladding, wide glazing and an integrated linear fireplace for year-round comfort.',
  },
  '/blog/the-a-frame-cabin-trident-modular/': {
    title:
      'Discover Trident Modular’s New A-Frame Cabin – A Bold Take on Nature-Inspired Living',
    // Two words trimmed from the original to fit 155 characters.
    description:
      'Trident Modular unveils its latest design – the A-Frame Cabin. A triangular modular home with sleek aesthetics, sustainable living and year-round comfort.',
  },
  '/blog/transporting-modular-houses/': {
    title: 'Transporting Modular Houses in 4 Steps | Trident Modular',
    description:
      'Discover how Trident Modular is transporting modular houses via flatbed, container, and crane delivery. Fast, safe, turnkey logistics — learn more!',
  },
  '/blog/10-custom-modular-homes-options/': {
    description:
      'Discover 10 powerful custom modular homes solutions with Trident Modular Homes, offering unparalleled design flexibility and personalization options for your dream living space.',
  },
  '/blog/10-garden-house-maintenance-tips/': {
    // TYPO in the original: "garen house maintanance". Kept verbatim.
    description:
      'Discover 10 essential garden house maintenance tips to keep your outdoor retreat beautiful and durable. Learn expert cleaning, weatherproofing, and garen house maintanance strategies with Trident Modular.',
  },
  '/blog/2026-trends-in-modular-housing/': {
    description:
      'A chill, practical look at 2026 Trends in Modular Housing—platform design, hybrid builds, digital QA, low-carbon materials, and performance-first homes.',
  },
  '/blog/advantages-of-modular-construction/': {
    description:
      'Uncover the 8 game-changing advantages of modular construction over traditional methods. Learn how Trident Modular can revolutionize your next project.',
  },
  '/blog/energy-efficient-modular-homes/': {
    description:
      'Discover 10 powerful ways energy-efficient modular homes are revolutionizing sustainable living. Learn how modern homeowners can save energy, reduce costs, and embrace eco-friendly solutions.',
  },
  '/blog/meeting-sustainability-goals/': {
    // Shortened from the original to fit 155 characters.
    description:
      'Modular construction leads sustainable building: reducing waste, lowering carbon emissions and improving energy efficiency to meet sustainability goals.',
  },
  '/blog/exclusive-christmas-offer-transform-your-outdoor-space-with-our-garden-modular-house/': {
    // No stored description; cut from the post's opening paragraph.
    description:
      'Christmas offer: add elegance and comfort to your garden this festive season with our 15 sq. m Garden Modular House.',
  },
  '/blog/modular-classrooms-are-transforming-uk/': {
    // Shortened from the original to fit 155 characters; the source ran to 300.
    description:
      'How modular classrooms are changing UK schools: flexible, sustainable and cost-effective learning spaces that meet modern educational demands.',
  },
  '/blog/modular-construction-for-healthcare-facilities/': {
    description:
      'Discover how modular construction is transforming healthcare facilities with faster build times, cost efficiency, and flexible designs. Learn the top 3 ways modular solutions enhance patient care and streamline healthcare infrastructure',
  },
  '/blog/modular-housing-for-social-housing/': {
    // One word trimmed from the original to fit 155 characters.
    description:
      'How modular housing is revolutionizing social housing in the UK, providing a sustainable, efficient, and affordable solution to the housing crisis.',
  },
  // The three below had no stored description; these are cut from each
  // post's opening paragraph.
  '/blog/modular-sports-facilities/': {
    description:
      'From elite training complexes to grassroots community hubs: how Trident Modular builds faster, smarter and more flexible sports facilities.',
  },
  '/blog/case-study-update-garden-house-with-fireplace/': {
    description:
      'Project recap: the cedar-clad modular garden house with a recessed media wall and integrated linear fireplace is now complete. See the finished build.',
  },
  '/blog/could-modular-housing-be-the-answer-to-the-housing-crisis/': {
    description:
      'Modular housing has the potential to be a significant part of the solution to the housing crisis. The key benefits, and why they matter for the UK.',
  },
  '/blog/why-modular-frame-house-strong-stable/': {
    description:
      'Discover how a modular frame house from Trident Modular is engineered for strength, easy installation, high insulation and sustainability—watch our forklift test video.',
  },
}

/**
 * Resolve the title and description for a path.
 *
 * `pageTitle` is the page's own name, used to build the default pattern where
 * there is no hand-set title, which is how blog posts render.
 */
export function seoFor(
  path: string,
  pageTitle: string,
  fallbackDescription: string,
): { title: string; description: string } {
  const entry = seo[path]
  return {
    title: entry?.title ?? defaultTitle(pageTitle),
    description: clampDescription(entry?.description ?? fallbackDescription),
  }
}

// ─── Model pages ────────────────────────────────────────────────────────

/**
 * "4.4–12.2 m²" from the price guide's size variants where we have them,
 * otherwise the export's single figure. The same rule ProductPage uses.
 */
export function floorAreaText(home: Home): string {
  const areas = detailFor(home.slug)?.variants.map((v) => v.area) ?? []
  if (!areas.length) return `${home.area} m²`
  return areas.length > 1 ? `${Math.min(...areas)}–${Math.max(...areas)} m²` : `${areas[0]} m²`
}

/**
 * "<Model> — <descriptor> | Trident Modular". No price anywhere in the title
 * or description; see model-seo.ts for the per-model copy.
 */
export function modelSeo(home: Home): { title: string; description: string } {
  const copy = modelCopy[home.slug]
  const descriptor = copy?.descriptor ?? (home.category === 'Garden Rooms' ? 'Insulated Garden Room' : 'Modular Home UK')
  const title = withBrand(`${home.name} — ${descriptor}`)
  const description = copy?.description ?? `${home.desc} ${floorAreaText(home)} internal floor area.`
  return { title, description: clampDescription(description) }
}

// ─── Category pages ─────────────────────────────────────────────────────

/**
 * Title per category slug. "{from}" becomes ", from £<price>" using the
 * cheapest published price among the category's models, or nothing where
 * none has one.
 */
export const categoryTitles: Record<string, string> = {
  'garden-rooms': 'Insulated Garden Rooms UK{from}',
  bungalows: 'Modular Bungalows UK{from}',
  '1-5-storey-houses': '1.5 Storey Modular Houses UK{from}',
  '2-storey-houses': '2 Storey Modular Houses UK{from}',
  'log-houses': 'Log Houses UK{from}',
  'tiny-pod-homes': 'Tiny Homes & Pod Homes UK{from}',
}

/** One line each on what the category is, ahead of the model count and price. */
const categoryLeads: Record<string, string> = {
  'garden-rooms': 'Insulated garden rooms for an office, studio or guest space, factory-built and installed on a prepared base.',
  bungalows: 'Single-storey modular homes for garden plots, second dwellings and permanent residence.',
  '1-5-storey-houses': 'Modular houses with a half-storey above the main living space, adding bedrooms without a larger footprint.',
  '2-storey-houses': 'Two-storey modular homes with first-floor bedrooms for larger family accommodation.',
  'log-houses': 'Models available with a timber log character, built on the same insulated panel system.',
  'tiny-pod-homes': 'The smallest habitable Trident models, for rental income, guests or a compact permanent home.',
}

export function categorySeo(
  slug: string,
  term: CategoryTerm,
  homes: Home[],
): { title: string; description: string } {
  // No prices in titles or descriptions, sitewide. The "{from}" slot in the
  // templates is kept for the day that changes.
  const template = categoryTitles[slug] ?? `${term.name}{from}`
  const title = withBrand(template.replace('{from}', ''))

  // Areas as the model pages state them: price-guide sizes where a model has
  // them, otherwise the catalogue figure.
  const areas = homes.flatMap((h) => detailFor(h.slug)?.variants.map((v) => v.area) ?? [h.area]).filter(Boolean)
  const areaText = areas.length ? `, ${Math.min(...areas)}–${Math.max(...areas)} m²` : ''
  const count = `${homes.length} ${homes.length === 1 ? 'model' : 'models'}${areaText}`
  const description = `${categoryLeads[slug] ?? term.blurb} ${count}.`

  return { title, description: clampDescription(description) }
}
