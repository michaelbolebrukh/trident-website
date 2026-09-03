import { houseImage, type Home } from '../data/homes'
import { productPath, routes } from '../lib/routes'
import { pricingFor, formatShort } from '../lib/price-options'
import { responsive, SIZES } from '../lib/images'

interface Props {
  name: string
  blurb: string
  homes: Home[]
  /** Primary classes are the four Trident files a model under; the rest are tags. */
  isPrimary: boolean
}

export default function CategoryPage({ name, blurb, homes, isPrimary }: Props) {
  const sorted = [...homes].sort((a, b) => a.price - b.price)
  const areas = sorted.map((h) => h.area).filter(Boolean)

  return (
    <div className="bg-white">
      <div className="bg-light border-b border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
            {isPrimary ? 'Range' : 'Also available as'}
          </p>
          <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-4">{name}</h1>
          <p className="text-muted text-base max-w-2xl leading-relaxed">{blurb}</p>
          <p className="text-muted text-sm mt-4">
            {sorted.length} {sorted.length === 1 ? 'model' : 'models'}
            {areas.length > 0 && ` · ${Math.min(...areas)}–${Math.max(...areas)} m²`}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((home) => {
            const pricing = pricingFor(home.slug)
            return (
              <a
                key={home.slug}
                href={productPath(home.slug)}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="h-48 overflow-hidden bg-light shrink-0">
                  <img
                    {...(home.thumb ? responsive(houseImage(home.thumb), SIZES.card) : {})}
                    alt={home.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h2 className="font-display font-bold text-navy text-base leading-snug">{home.name}</h2>
                    <span className="text-muted text-xs font-medium shrink-0">{home.area} m²</span>
                  </div>
                  <p className="text-xs text-muted leading-snug mb-3">{home.desc}</p>
                  <p className="text-xs text-muted mb-4">
                    {[
                      home.bedrooms ? `${home.bedrooms} bed` : null,
                      home.bathrooms ? `${home.bathrooms} bath` : null,
                      `${home.floors} storey`,
                    ]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>

                  {pricing && (
                    <div className="rounded-xl overflow-hidden border border-border mt-auto">
                      {pricing.options.map((opt, i) => {
                        const last = i === pricing.options.length - 1
                        return (
                          <div
                            key={opt.n}
                            className={`flex items-center justify-between gap-2 px-4 py-2.5 ${
                              last ? 'bg-navy' : 'bg-light'
                            } ${i > 0 && !last ? 'border-t border-border' : ''}`}
                          >
                            <span className={`text-[10px] font-bold font-display tracking-[0.15em] uppercase ${last ? 'text-white' : 'text-muted'}`}>
                              {opt.n} {opt.label}
                            </span>
                            <span className={`text-sm font-bold font-display shrink-0 ${last ? 'text-white' : 'text-navy'}`}>
                              {formatShort(opt.price)}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted">from · excl. VAT</span>
                    <span className="text-xs font-bold font-display text-navy border border-border rounded-lg px-4 py-1.5 group-hover:border-navy group-hover:bg-light transition-colors">
                      Open
                    </span>
                  </div>
                </div>
              </a>
            )
          })}
        </div>

        <div className="mt-12 text-center">
          <a
            href={routes.catalogue}
            className="inline-block border border-border text-navy font-semibold font-display px-8 py-3 rounded-xl hover:border-navy transition-colors text-sm"
          >
            Browse the full range
          </a>
        </div>
      </div>
    </div>
  )
}
