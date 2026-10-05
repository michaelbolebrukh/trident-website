/**
 * JSON-LD builders. Every field here is read from the site's own data files;
 * nothing is asserted that a page does not also show.
 *
 *  - Organization and WebSite go on every page (BaseLayout).
 *  - Product on each model page, priced from pricing.ts / model-details.ts.
 *  - BreadcrumbList mirrors the visible trail (src/lib/breadcrumbs.ts).
 *  - Article on blog posts, FAQPage on /faq/.
 */
import type { Home } from '../data/homes'
import { houseImage } from '../data/homes'
import { pricingFor } from './price-options'
import type { Crumb } from './breadcrumbs'
import type { Faq } from '../data/faq'
import { floorAreaMin } from './area'
import { projects } from '../data/projects'

export const SITE_URL = 'https://tridentmodular.com'
export const ORG_NAME = 'Trident Modular Housing'
const ORG_ID = `${SITE_URL}/#organization`
const SITE_ID = `${SITE_URL}/#website`

export const abs = (path: string): string => new URL(path, SITE_URL).toString()

/** Contact details as shown in the header, footer and contact page. */
export const CONTACT = {
  telephone: '+44 7443 285068',
  email: 'contact@tridentmodular.com',
  /** Registered office, from the contact page. */
  address: {
    streetAddress: 'Tallis House, 2 Tallis Street',
    addressLocality: 'London',
    postalCode: 'EC4Y 0AB',
    addressCountry: 'GB',
  },
  /** "Mon–Fri 8.30am–5.30pm" in the footer. */
  hours: { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:30', closes: '17:30' },
}

export function organizationSchema(logoUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: ORG_NAME,
    alternateName: 'Trident Modular',
    url: `${SITE_URL}/`,
    logo: { '@type': 'ImageObject', url: abs(logoUrl) },
    // A delivered project rather than a render: the Chiswick garden room.
    image: abs(projects[0].cover),
    email: CONTACT.email,
    telephone: CONTACT.telephone,
    address: { '@type': 'PostalAddress', ...CONTACT.address },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      telephone: CONTACT.telephone,
      email: CONTACT.email,
      areaServed: 'GB',
      availableLanguage: 'en',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: CONTACT.hours.days,
        opens: CONTACT.hours.opens,
        closes: CONTACT.hours.closes,
      },
    },
    // No sameAs: the footer's social icons do not yet link anywhere.
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: ORG_NAME,
    alternateName: 'Trident Modular',
    url: `${SITE_URL}/`,
    inLanguage: 'en-GB',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.href),
    })),
  }
}

/** Gallery paths that resolve to a file we hold, as absolute URLs. */
export const homeImages = (home: Home): string[] =>
  [...new Set(home.gallery.map(houseImage))]
    .filter((p) => p.startsWith('/images/'))
    .map(abs)

/**
 * "From" price and the option it buys: the first rung of the model's ladder,
 * which is what the page headline quotes. Undefined where quoted on request.
 */
export function productSchema(home: Home, pageDescription: string) {
  const url = abs(`/houses/${home.slug}/`)
  const images = homeImages(home)

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: home.name,
    url,
    description: pageDescription,
    category: home.category,
    brand: { '@type': 'Brand', name: ORG_NAME },
    manufacturer: { '@id': ORG_ID },
  }
  if (images.length) schema.image = images

  // One Offer per purchase option that has a published price, in the order
  // the page lists them; models quoted on request carry no offers.
  const pricing = pricingFor(home.slug)
  const offers = (pricing && !pricing.onRequest ? pricing.options : [])
    .filter((o): o is typeof o & { price: number } => o.price !== null)
    .map((o) => ({
      '@type': 'Offer',
      name: o.label,
      url,
      price: o.price,
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: o.price,
        priceCurrency: 'GBP',
        valueAddedTaxIncluded: false,
      },
      description: `${o.label}: from £${o.price.toLocaleString('en-GB')} excl. VAT. ${o.desc}`,
      seller: { '@id': ORG_ID },
    }))
  if (offers.length) schema.offers = offers

  // Floor area as the page states it: the smallest price-guide size where
  // the model has variants, otherwise the catalogue figure.
  const area = floorAreaMin(home)
  schema.additionalProperty = [
    { '@type': 'PropertyValue', name: 'Internal floor area (from)', value: area, unitCode: 'MTK' },
    ...(home.bedrooms ? [{ '@type': 'PropertyValue', name: 'Bedrooms', value: home.bedrooms }] : []),
    ...(home.bathrooms ? [{ '@type': 'PropertyValue', name: 'Bathrooms', value: home.bathrooms }] : []),
  ]

  return schema
}

export interface ArticleInput {
  slug: string
  title: string
  date: string
  dateModified?: string
  description: string
  image?: string
}

/**
 * A WordPress export time ("2026-07-22T16:17:52", UK local) as an ISO 8601
 * string with the Europe/London offset that applied on that date.
 */
export function londonIso(local: string): string {
  if (/[Zz]|[+-]\d\d:\d\d$/.test(local)) return local
  const guess = new Date(local + 'Z')
  const part = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', timeZoneName: 'longOffset' })
    .formatToParts(guess)
    .find((p) => p.type === 'timeZoneName')?.value ?? 'GMT'
  const offset = part === 'GMT' ? '+00:00' : part.replace('GMT', '')
  return `${local}${offset}`
}

export function articleSchema(post: ArticleInput, logoUrl: string) {
  const url = abs(`/blog/${post.slug}/`)
  const published = londonIso(post.date)
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: published,
    // posts.json carries no edit history, so the last substantive change is
    // the publication itself.
    dateModified: londonIso(post.dateModified ?? post.date),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: 'en-GB',
    author: { '@type': 'Organization', '@id': ORG_ID, name: ORG_NAME },
    publisher: {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: ORG_NAME,
      logo: { '@type': 'ImageObject', url: abs(logoUrl) },
    },
  }
  if (post.image) schema.image = [abs(post.image)]
  return schema
}

/** The models a category lists, in the order the page shows them. */
export function itemListSchema(name: string, homes: Home[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: homes.length,
    itemListElement: homes.map((h, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: h.name,
      url: abs(`/houses/${h.slug}/`),
    })),
  }
}

export function contactPageSchema(title: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    url: abs('/contact-us/'),
    name: title,
    description,
    isPartOf: { '@id': SITE_ID },
    mainEntity: { '@id': ORG_ID },
  }
}

export function faqSchema(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
