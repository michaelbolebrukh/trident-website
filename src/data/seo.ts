/**
 * Page titles and meta descriptions, carried across from tridentmodular.com.
 *
 * The old site ran Yoast and later Rank Math, and the export holds both. What
 * is here is the effective value each URL served: Rank Math where it set one,
 * Yoast otherwise, and the rendered default where neither did.
 *
 * Three things needed deciding:
 *
 *  - Several titles were stored as unexpanded templates ("%%title%% %%page%%
 *    %%sep%% %%sitename%%"). Those are not custom titles; they are the default
 *    pattern, which renders as "<Page title> - Trident Modular". Pages with no
 *    stored title rendered the same way, so both are covered by defaultTitle().
 *
 *  - English copy is carried over verbatim, typos included, so that what is
 *    already indexed is what we serve. Two are worth a decision rather than a
 *    silent fix and are marked TYPO below.
 *
 *  - A number of descriptions were written for the Ukrainian market: Kyiv and
 *    Lviv, Ukrainian building norms, and Ukrainian phone numbers. Those are
 *    translated and localised to the UK business, which is the one edit the
 *    brief allows. Nothing here mentions Ukraine.
 */

export const SITE_NAME = 'Trident Modular'

/** The separator the old site rendered: "BOPAS and Certificates - Trident Modular". */
export const TITLE_SEP = '-'

/** How every page without a custom title rendered its <title>. */
export const defaultTitle = (pageTitle: string): string =>
  `${pageTitle} ${TITLE_SEP} ${SITE_NAME}`

export interface SeoEntry {
  title?: string
  description?: string
}

/**
 * Keyed by the path this site serves, which for all of these is the path
 * tridentmodular.com served too.
 */
export const seo: Record<string, SeoEntry> = {
  // ─── Ukrainian originals, translated and localised ────────────────────
  '/': {
    title: `Modular Homes and Garden Rooms, Built in the Factory ${TITLE_SEP} ${SITE_NAME}`,
    description:
      'Modular buildings of every size from Trident Modular ✔️ Modular offices ✔️ Garden rooms ✔️ Fast and dependable 📞 +44 7443 285068',
  },
  '/about_us/': {
    title: `${SITE_NAME} ${TITLE_SEP} modular building specialists`,
    description:
      'Who Trident Modular are 💼 Why clients work with us ✔️ Every stage explained, from the first conversation to the finished building 📞 +44 7443 285068',
  },
  '/blog/': {
    title: `Everything about modular building ${TITLE_SEP} ${SITE_NAME}`,
    description:
      'Interested in modular homes? 👓 Articles on modular construction and building of every other kind 💡 The best of the Trident Modular blog',
  },
  '/contact-us/': {
    // Title was already English; only the description needed translating.
    title: `Contact us ${TITLE_SEP} ${SITE_NAME}`,
    description:
      'Get in touch today for full information on our modular homes and garden rooms.',
  },
  '/technology/': {
    title: `Modular building technology ${TITLE_SEP} ${SITE_NAME}`,
    description:
      'A full account of how Trident Modular builds 💡 The principles and what they gain you ✔️ Answers to the questions we are asked most 📞 +44 7443 285068',
  },
  '/houses/a-frame/': {
    description:
      'A-frame houses from Trident Modular 🏠 A wide range of designs ✅ Single storey, two storey, modular hotels and offices 📞 +44 7443 285068',
  },
  '/houses/forest-house/': {
    description:
      'Modular homes from Trident Modular 🏠 A wide range of designs ✅ Single storey, two storey, modular hotels and offices 📞 +44 7443 285068',
  },

  // ─── English originals, carried across verbatim ───────────────────────
  '/bopas-and-certificates/': {
    title: `BOPAS and Certificates ${TITLE_SEP} ${SITE_NAME}`,
    description:
      'The Buildoffsite Property Assurance Scheme (BOPAS) provides independent assurance that our modular homes are durable, reliable, and meet high-quality. Check our certificates.',
  },
  '/installation/': {
    title: "London's Garden Room Installation: Modular Buildings Done Right",
    description:
      "London's expertise in garden room installation: offering fully installed garden offices and rooms — Experience seamless modular building solutions in the city",
  },
  '/houses/base-model/': {
    title: "UK's Top Basic & Economical Garden Room Solution — Trident Modular",
    // TYPO in the original: "a economical". Kept so the served description
    // matches what is indexed; worth correcting once, deliberately.
    description:
      "UK's basic garden room: a economical yet quality space. Ideal as an affordable office. Budget — friendly rooms with exceptional craftsmanship and durability",
  },
  '/houses/premium-model/': {
    title: 'Modular Garden Houses | Premium Model by Trident Modular',
    description:
      'Explore our efficient and sustainable Premium Model Garden Houses. Experience our cost-effective, eco-friendly building solutions today. Get your quote today!',
  },
  '/customise-your-build/': {
    // The old /commercial/ page folds into this one, and its metadata is the
    // stronger of the two.
    title: 'Commercial Modular Buildings UK',
    description:
      'Trident Modular provides commercial modular buildings for cafés, shops, offices, classrooms, sports facilities, hotels and resorts across the UK. Explore ready models and bespoke modular systems.',
  },

  // ─── Blog posts ───────────────────────────────────────────────────────
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
    description:
      'Trident Modular unveils its latest design – the A-Frame Cabin. A triangular modular home offering sleek aesthetics, sustainable living, and year-round comfort.',
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
    description:
      'Discover how modular construction is leading the way in sustainable building practices by reducing waste, lowering carbon emissions, and enhancing energy efficiency to meet global sustainability goals.',
  },
  '/blog/modular-classrooms-are-transforming-uk/': {
    description:
      'Discover how modular classrooms are revolutionizing UK schools, providing flexible, sustainable, and cost-effective learning spaces that meet modern educational demands. Learn about the benefits of modular construction for capacity challenges, environmental sustainability, and improved student engagement.',
  },
  '/blog/modular-construction-for-healthcare-facilities/': {
    description:
      'Discover how modular construction is transforming healthcare facilities with faster build times, cost efficiency, and flexible designs. Learn the top 3 ways modular solutions enhance patient care and streamline healthcare infrastructure',
  },
  '/blog/modular-housing-for-social-housing/': {
    description:
      'Discover how modular housing is revolutionizing social housing in the UK, providing a sustainable, efficient, and affordable solution to the housing crisis.',
  },
  '/blog/why-modular-frame-house-strong-stable/': {
    description:
      'Discover how a modular frame house from Trident Modular is engineered for strength, easy installation, high insulation and sustainability—watch our forklift test video.',
  },

  // ─── Pages folded in, whose metadata is worth keeping ─────────────────
  // /self-build-modular-homes/ and /modular-home-cost-uk/ both redirect to
  // the catalogue. Their descriptions were the strongest the old site had for
  // that page, and the catalogue had none of its own.
  '/houses/': {
    title: 'Self Build Modular Homes UK | Kit Homes & Flat Pack Homes',
    description:
      'Explore self build modular homes, kit homes, flat pack homes and portable housing solutions in the UK with Trident Modular. Practical building systems for modern living.',
  },
}

/**
 * Resolve the title and description for a path.
 *
 * `pageTitle` is the page's own name, used to build the default pattern when
 * the old site had no custom title — which is how most model and blog pages
 * rendered.
 */
export function seoFor(
  path: string,
  pageTitle: string,
  fallbackDescription: string,
): { title: string; description: string } {
  const entry = seo[path]
  return {
    title: entry?.title ?? defaultTitle(pageTitle),
    description: entry?.description ?? fallbackDescription,
  }
}
