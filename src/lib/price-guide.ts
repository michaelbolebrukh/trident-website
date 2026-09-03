/**
 * The price guide as one table, for /modular-homes-prices/ and /kit-homes/.
 *
 * Houses come from pricing.ts (Shell delivered / Shell + Assembly / Turnkey
 * base, ex VAT, delivered to Greater London). Garden buildings and the A-Frame
 * come from model-details.ts, which prices each size on its own ladder; the
 * smallest size is listed, as the model page does. Price per m² is the option
 * price divided by the internal area the pricing source states.
 */
import { allHomes, type Home } from '../data/homes'
import { housePricing } from '../data/pricing'
import { detailFor } from '../data/model-details'
import { productPath } from './routes'

export interface PriceRow {
  home: Home
  href: string
  /** Internal area the price is based on, in m². */
  area: number
  /** Where the area comes from, for the table's footnote. */
  areaSource: 'pricing sheet' | 'price guide'
  options: { label: string; price: number | null; perM2: number | null }[]
  onRequest: boolean
  note?: string
}

const perM2 = (price: number | null, area: number): number | null =>
  price === null ? null : Math.round(price / area)

/** Houses priced in pricing.ts, in catalogue order. */
export const houseRows: PriceRow[] = allHomes
  .filter((h) => housePricing[h.slug])
  .map((home) => {
    const p = housePricing[home.slug]
    const prices = [p.shell, p.shellAssembly, p.turnkey]
    return {
      home,
      href: productPath(home.slug),
      area: p.gia,
      areaSource: 'pricing sheet',
      options: ['Shell delivered', 'Shell + Assembly', 'Turnkey base'].map((label, i) => ({
        label,
        price: prices[i],
        perM2: perM2(prices[i], p.gia),
      })),
      onRequest: Boolean(p.onRequest),
      note: p.note,
    }
  })

/** Garden buildings and the A-Frame, priced per size in model-details.ts. */
export const guideRows: PriceRow[] = allHomes
  .filter((h) => !housePricing[h.slug] && detailFor(h.slug))
  .map((home) => {
    const detail = detailFor(home.slug)!
    const smallest = [...detail.variants].sort((a, b) => a.kit - b.kit)[0]
    const prices = [smallest.kit, smallest.shell, smallest.turnkey]
    return {
      home,
      href: productPath(home.slug),
      area: smallest.area,
      areaSource: 'price guide',
      options: detail.packages.map((pkg, i) => ({
        label: pkg.name,
        price: prices[i],
        perM2: perM2(prices[i], smallest.area),
      })),
      onRequest: false,
      note: detail.variants.length > 1 ? `Smallest of ${detail.variants.length} sizes (${smallest.name}).` : undefined,
    }
  })

export const gbp = (n: number | null): string => (n === null ? 'On request' : `£${n.toLocaleString('en-GB')}`)
