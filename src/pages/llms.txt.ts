import type { APIRoute } from 'astro'
import { allHomes, PRIMARY_CATEGORIES } from '../data/homes'
import { categoryTerms } from '../data/categories'
import { HOUSE_OPTIONS } from '../data/pricing'
import { routes, categoryPath, productPath } from '../lib/routes'
import { floorAreaText } from '../lib/area'

/**
 * llms.txt (https://llmstxt.org/): a plain-text map of the site for language
 * models and AI assistants. Generated from the same data as the pages, so it
 * stays current as models are added.
 */
export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).toString()
  const categories = Object.entries(categoryTerms).filter(([, t]) =>
    PRIMARY_CATEGORIES.includes(t.name as (typeof PRIMARY_CATEGORIES)[number]),
  )
  const lines = [
    '# Trident Modular Housing',
    '',
    '> UK supplier of factory-built modular homes, garden rooms and commercial buildings on a closed-panel timber frame system, BOPAS accredited and built to ISO 9001:2015. Houses are sold three ways: ' +
      HOUSE_OPTIONS.map((o) => o.label).join(', ') +
      '. Prices are from, excluding VAT, with delivery to Greater London included.',
    '',
    `Registered office: Tallis House, 2 Tallis Street, London EC4Y 0AB. Phone +44 7443 285068. Email contact@tridentmodular.com.`,
    '',
    '## Start here',
    '',
    `- [Modular homes UK](${url(routes.modularHomes)}): what modular, prefab and pre-built mean, the range by class`,
    `- [Prices and cost guide](${url(routes.prices)}): from-prices for every model across all three purchase options, with price per m²`,
    `- [Modular homes for sale](${url(routes.forSale)}): the range with prices, how buying works`,
    `- [All homes](${url(routes.catalogue)}): browse and filter the full range`,
    `- [Delivery and installation](${url(routes.installation)}): from groundworks to handover, including the Turnkey base scope`,
    `- [BOPAS and certificates](${url(routes.bopas)}): accreditation, mortgageability`,
    `- [Technology](${url(routes.technology)}): the panel system and build-ups`,
    `- [FAQ](${url(routes.faq)})`,
    `- [Contact](${url(routes.contact)})`,
    '',
    '## Ways to buy',
    '',
    `- [Kit homes](${url(routes.kitHomes)}): the Shell delivered option`,
    `- [Self-build modular homes](${url(routes.selfBuild)})`,
    `- [Factory-built homes](${url(routes.factoryBuilt)})`,
    `- [Modern modular homes](${url(routes.modern)})`,
    `- [Eco modular homes](${url(routes.eco)})`,
    `- [Commercial modular buildings](${url(routes.commercial)})`,
    `- [Modular building company](${url(routes.companies)}): how to check any supplier, including us`,
    `- [London](${url(routes.london)})`,
    '',
    '## Categories',
    '',
    ...categories.map(([, t]) => `- [${t.name}](${url(categoryPath(t.name))}): ${t.blurb}`),
    '',
    '## Models',
    '',
    ...allHomes.map((h) => `- [${h.name}](${url(productPath(h.slug))}): ${h.category}, ${floorAreaText(h)}${h.bedrooms ? `, ${h.bedrooms} bed` : ''}`),
    '',
    '## Optional',
    '',
    `- [Blog](${url(routes.blog)})`,
    `- [Project gallery](${url(routes.gallery)})`,
    `- [About](${url(routes.about)})`,
    '',
  ]
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
