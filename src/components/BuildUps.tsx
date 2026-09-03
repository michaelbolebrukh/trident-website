import { useState } from 'react'
import { thicknesses } from '../data/build-ups'

/**
 * The construction build-ups, selectable by insulation thickness.
 *
 * Every thickness is rendered into the DOM and the inactive ones are hidden
 * with CSS rather than unmounted, so the full layer specification is present
 * for search engines and for anyone reading with assistive technology.
 */
export default function BuildUps() {
  const [active, setActive] = useState(thicknesses[0].mm)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Insulation thickness"
        className="flex flex-wrap gap-2 mb-3"
      >
        {thicknesses.map((t) => {
          const selected = t.mm === active
          return (
            <button
              key={t.mm}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`buildup-${t.mm}`}
              onClick={() => setActive(t.mm)}
              className={`font-display font-bold text-sm px-5 py-2.5 rounded-xl border transition-colors ${
                selected
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white text-navy border-border hover:border-navy/40'
              }`}
            >
              {t.mm} mm
            </button>
          )
        })}
      </div>

      {thicknesses.map((t) => (
        <div
          key={t.mm}
          id={`buildup-${t.mm}`}
          role="tabpanel"
          hidden={t.mm !== active}
        >
          <p className="text-sm text-muted leading-relaxed max-w-2xl mb-8">{t.summary}</p>

          <div className="grid md:grid-cols-2 gap-6">
            {t.buildUps.map((b) => (
              <div
                key={b.element}
                className="bg-white border border-border rounded-2xl overflow-hidden card-shadow"
              >
                {/* White, not the usual light grey: the diagrams are drawn on
                    white and any other ground shows as a box around them. */}
                <div className="bg-white border-b border-border">
                  <img
                    src={b.image}
                    alt={`Layer diagram of a Trident ${b.element.toLowerCase()} with ${t.mm} mm insulation`}
                    loading="lazy"
                    width={1200}
                    height={1200}
                    className="w-full h-64 object-contain"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy text-lg mb-4">
                    {b.element}
                    <span className="text-muted font-normal text-sm"> · {t.mm} mm</span>
                  </h3>
                  <ol className="space-y-1.5">
                    {b.layers.map((l) => (
                      <li key={l.n} className="flex items-baseline gap-3 text-sm">
                        <span className="font-display font-bold text-gold w-5 shrink-0 tabular-nums">
                          {l.n}
                        </span>
                        <span className="text-navy flex-1">{l.name}</span>
                        {l.spec && (
                          <span className="text-muted shrink-0 tabular-nums">{l.spec}</span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
