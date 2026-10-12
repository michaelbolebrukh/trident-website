/**
 * Five questions and answers for each model page, written from the model's
 * own data: prices and options (pricing.ts, model-details.ts), size and
 * rooms (homes.ts, catalogue-specs.ts) and the programme (pricing.ts). Every
 * page's set is therefore unique and never contradicts the page above it.
 * Rendered by ProductPage.tsx and emitted as FAQPage schema by the route.
 */
import type { Home } from '../data/homes'
import { detailFor } from '../data/model-details'
import { specFor } from '../data/catalogue-specs'
import { pricingFor, formatPrice } from './price-options'
import { PROGRAMME, HOUSE_OPTIONS } from '../data/pricing'
import { floorAreaText } from './area'

export interface ModelFaq {
  q: string
  a: string
}

const programme = (title: string) => PROGRAMME.find(([t]) => t === title)?.[1] ?? ''

export function modelFaqs(home: Home): ModelFaq[] {
  const detail = detailFor(home.slug)
  const spec = specFor(home.slug)
  const pricing = pricingFor(home.slug)
  const isGarden = home.categories.includes('Garden Rooms')
  const bedrooms = spec?.bedrooms ?? home.bedrooms
  const bathrooms = spec?.bathrooms ?? home.bathrooms
  const storeys = home.floors === 1 ? 'single storey' : `${home.floors} storeys`

  const price =
    !pricing || pricing.onRequest
      ? `The ${home.name} is quoted on request rather than from a published list price. ${pricing?.note ?? 'Tell us the plot and the finish you want and we come back with a firm proposal.'}`
      : `From ${pricing.options.map((o) => `${formatPrice(o.price)} for ${o.label}`).join(', ')}, all excluding VAT${pricing.fromSmallestOf ? `, for the smallest of ${pricing.fromSmallestOf} sizes` : ''}. ${pricing.note ?? 'Foundations, site works and planning sit outside every option.'}`

  const size = detail
    ? `${floorAreaText(home)} of internal floor area across ${detail.variants.length} size${detail.variants.length > 1 ? 's' : ''}: ${detail.variants.map((v) => `${v.name} at ${v.area} m²`).join(', ')}.`
    : `${floorAreaText(home)} of internal floor area over ${storeys}${bedrooms ? `, with ${bedrooms} bedroom${bedrooms > 1 ? 's' : ''}` : ''}${bathrooms ? ` and ${bathrooms} bathroom${bathrooms > 1 ? 's' : ''}` : ''}. ${spec?.rooms.length ? `The catalogue room schedule lists ${spec.rooms.length} rooms, each with its area, in the accommodation section above.` : 'Room sizes are confirmed on the floor plans.'}`

  const delivered = detail
    ? `${detail.packages[0].name}: ${detail.packages[0].desc} ${detail.packages[1].name} adds ${detail.packages[1].desc.charAt(0).toLowerCase()}${detail.packages[1].desc.slice(1)}`
    : `${HOUSE_OPTIONS[0].label}: ${HOUSE_OPTIONS[0].desc}`

  const timing = detail?.leadTime
    ? `Lead time for the ${home.name} is ${detail.leadTime} from order, confirmed against the production schedule at quotation.`
    : `Design and approval take ${programme('Design and approval')}, factory production ${programme('Factory production')} and freight ${programme('Freight and customs')}. Erection to weathertight takes ${programme('Erection and weathertight')} on site, and internal fit-out under Turnkey base a further ${programme('Internal fit-out (turnkey)')}, so contract to handover is typically ${programme('Contract to handover')}.`

  const planning = isGarden
    ? `Used as an office, studio or hobby room, the ${home.name} can usually be built under permitted development without an application, provided it is single storey, within the height limits, behind the front of the house and not slept in. Anything used as sleeping accommodation needs planning permission. See the planning permission guide for the full rules.`
    : `Yes. The ${home.name} is a dwelling, so it needs full planning permission from your local authority and a Building Regulations application; permitted development does not cover a new home. We provide planning support and work with your architect or planning consultant.`

  return [
    { q: `How much does the ${home.name} cost?`, a: price },
    { q: `How big is the ${home.name}?`, a: size },
    { q: `What is included when the ${home.name} is delivered?`, a: delivered },
    { q: `How long does the ${home.name} take from order to handover?`, a: timing },
    { q: isGarden ? `Does the ${home.name} need planning permission?` : `Does the ${home.name} need planning permission and Building Regulations approval?`, a: planning },
  ]
}
