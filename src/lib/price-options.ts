/**
 * One way to ask "what are this model's three packages?", whichever source
 * the model is priced from.
 *
 * Houses use the August 2026 pricing sheet: Shell delivered / Shell + Assembly
 * / Turnkey base. Garden buildings and the A-Frame keep their 2026 price-guide
 * packages: Kit / Shell Assembled / Turnkey. The two ladders are not the same
 * product — a house "shell" is clad and glazed, a garden-room "kit" is
 * flat-packed — so each family keeps its own labels rather than being forced
 * into a shared scheme.
 */
import { detailFor } from '../data/model-details'
import { housePricingFor, HOUSE_OPTIONS, type PriceOption } from '../data/pricing'

export interface ModelPricing {
  options: PriceOption[]
  /** True when every option is quoted rather than published. */
  onRequest: boolean
  note?: string
  /** Set where the price applies to the smallest of several sizes. */
  fromSmallestOf?: number
}

export function pricingFor(slug: string): ModelPricing | undefined {
  const house = housePricingFor(slug)
  if (house) {
    const prices = [house.shell, house.shellAssembly, house.turnkey]
    return {
      options: HOUSE_OPTIONS.map((o, i) => ({ ...o, price: prices[i] })),
      onRequest: Boolean(house.onRequest),
      note: house.note,
    }
  }

  // Garden buildings and the A-Frame: quote the smallest size, which is the
  // "from" the rest of the page is built around.
  const detail = detailFor(slug)
  if (!detail || !detail.variants.length) return undefined
  const cheapest = [...detail.variants].sort((a, b) => a.kit - b.kit)[0]
  const prices = [cheapest.kit, cheapest.shell, cheapest.turnkey]

  return {
    options: detail.packages.map((p, i) => ({
      n: p.n,
      label: p.name,
      price: prices[i] ?? null,
      desc: p.desc,
    })),
    onRequest: false,
    fromSmallestOf: detail.variants.length > 1 ? detail.variants.length : undefined,
  }
}

/** "£138,000" — or "On request" where there is no published figure. */
export const formatPrice = (price: number | null): string =>
  price === null ? 'On request' : `£${price.toLocaleString('en-GB')}`

/** Compact form for cards: "£138k". */
export const formatShort = (price: number | null): string => {
  if (price === null) return 'On request'
  return price >= 1000 ? `£${Math.round(price / 1000)}k` : `£${price.toLocaleString('en-GB')}`
}
