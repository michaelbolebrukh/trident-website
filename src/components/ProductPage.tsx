import { useEffect, useState } from 'react'
import { media } from '../data/media'
import { allHomes, houseImage, type Home } from '../data/homes'
import { productPath, routes } from '../lib/routes'
import { detailFor, PRICE_NOTE } from '../data/model-details'
import { specFor } from '../data/catalogue-specs'
import { pricingFor, formatPrice } from '../lib/price-options'
import { STANDARD_EXCLUSIONS, AVAILABLE_UPGRADES } from '../data/pricing'
import { plansFor } from '../data/floor-plans'

const IMGS = {
  ext1: media.heroExterior,
  ext2: media.chaletExterior,
  ext3: media.residenceExterior,
  int1: media.interiorLiving,
  int2: media.interiorKitchen,
  int3: media.interiorBedroom,
  garden: media.gardenRoom,
  aerial: media.siteAerial,
  exterior: media.commercial,
}


const specs = [
  { label: 'Wall Structure', content: 'Structural insulated panels (SIPs) with timber frame. 140mm cavity with mineral wool insulation. Rendered or timber-clad external finish.' },
  { label: 'Roof', content: 'Pitched or flat roof options. EPDM membrane or standing seam metal. Additional options include green roof and solar panel integration.' },
  { label: 'Floor Structure', content: 'Insulated concrete slab or suspended timber floor. 150mm rigid insulation below slab. Underfloor heating compatible throughout.' },
  { label: 'Foundation', content: 'Standard ground-bearing slab. Screw pile or pad foundation alternatives available depending on ground conditions and site access.' },
  { label: 'Insulation', content: 'Wall: 140mm mineral wool (U-value 0.18 W/m²K). Roof: 300mm mineral wool (U-value 0.12 W/m²K). Floor: 150mm rigid PIR (U-value 0.13 W/m²K).' },
  { label: 'Ventilation', content: 'Mechanical ventilation with heat recovery (MVHR) as standard. Unit located in utility or plant room. All ductwork in ceiling void.' },
  { label: 'Doors & Windows', content: 'Triple-glazed PVC-U or aluminium frames. Argon-filled low-E glass. U-value 0.8 W/m²K. Bi-fold or sliding door options available.' },
  { label: 'Internal Finishes', content: 'Plasterboard walls and ceilings. Pre-finished joinery. Kitchen and bathroom specification available separately in turnkey packages.' },
]

const sustainableCards = [
  { title: 'Air Source Heat Pumps', desc: 'Highly efficient heating and hot water with low running costs.', img: IMGS.ext2 },
  { title: 'Solar Panels', desc: 'Roof-integrated photovoltaic panels for reduced energy bills.', img: IMGS.ext3 },
  { title: 'Green Roofs', desc: 'Living roof systems for biodiversity benefit and insulation.', img: IMGS.ext1 },
]


export default function ProductPage({ home }: { home: Home }) {
  const relatedHomes = allHomes.filter((h) => h.slug !== home.slug).slice(0, 3)
  const detail = detailFor(home.slug)
  const spec = specFor(home.slug)
  const plans = plansFor(home.slug)
  const pricing = pricingFor(home.slug)

  const areas = detail?.variants.map((v) => v.area) ?? []
  const stats = [
    {
      label: 'Floor area',
      value: areas.length
        ? areas.length > 1
          ? `${Math.min(...areas)}–${Math.max(...areas)} m²`
          : `${areas[0]} m²`
        : `${home.area} m²`,
    },
    { label: 'Bedrooms', value: home.bedrooms ? String(home.bedrooms) : '—' },
    { label: 'Bathrooms', value: home.bathrooms ? String(home.bathrooms) : '—' },
    { label: 'Storeys', value: String(home.floors) },
    {
      label: detail ? 'Sizes' : 'Floor area',
      value: detail ? `${detail.variants.length} available` : `${home.areaFt} ft²`,
    },
    {
      label: 'Dimensions',
      value: detail ? `${detail.variants[0].dimensions} mm` : `${home.dimensions} m`,
    },
  ]

  // The sections this model's page actually renders, in page order. The nav
  // is built from this rather than a fixed list, since pricing, sizes, plans
  // and the room schedule are all conditional.
  const sections = [
    { id: 'overview', label: 'Overview' },
    ...(pricing ? [{ id: 'pricing', label: 'Pricing' }] : []),
    ...(detail ? [{ id: 'sizes', label: 'Sizes' }] : []),
    ...(plans.length > 0 ? [{ id: 'floor-plans', label: 'Floor plans' }] : []),
    ...(spec && spec.rooms.length > 1 ? [{ id: 'accommodation', label: 'Accommodation' }] : []),
    { id: 'features', label: 'Extras' },
    { id: 'completion', label: 'Completion' },
    { id: 'specifications', label: 'Specifications' },
  ]
  const [activeSection, setActiveSection] = useState('overview')

  useEffect(() => {
    // Highlight the section whose heading most recently crossed the upper
    // third of the viewport — steadier than raw intersection for long pages.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        }
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    for (const sec of sections) {
      const el = document.getElementById(sec.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  const [activeImage, setActiveImage] = useState(0)
  const [activeSpec, setActiveSpec] = useState<string | null>(null)
  const [completionTab, setCompletionTab] = useState<'Base' | 'Turnkey'>('Base')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const images = home.gallery.map(houseImage)

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div className="bg-light border-b border-border py-3">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center gap-2 text-xs text-muted">
          <a href="/" className="hover:text-navy transition-colors">Home</a>
          <span>/</span>
          <a href="/houses/" className="hover:text-navy transition-colors">All Homes</a>
          <span>/</span>
          <span className="text-navy font-medium">{home.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-14">

          {/* LEFT: Gallery */}
          <div>
            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-zoom-in bg-light"
              style={{ height: '460px' }}
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[activeImage]}
                alt={`${home.name} — exterior view`}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium font-display text-navy flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                View full size
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details panel */}
          <div className="lg:sticky lg:top-20 lg:self-start">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold font-display text-gold uppercase tracking-widest">{home.category}</span>
            </div>
            <h1 className="font-display font-bold text-navy text-4xl mb-2">{home.name}</h1>
            {pricing?.onRequest ? (
              <>
                <p className="text-2xl font-bold font-display text-gold mb-1">Price on request</p>
                <p className="text-xs text-muted mb-4">We reply with a firm proposal within 5 working days</p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold font-display text-gold mb-1">
                  From {formatPrice(pricing?.options[0]?.price ?? home.price)}
                </p>
                <p className="text-xs text-muted mb-4">excl. VAT · foundations quoted separately</p>
              </>
            )}

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-light rounded-xl">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-bold font-display text-navy text-base">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-5">
              {detail?.tagline ?? home.desc}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Energy efficient', 'Customisable', 'Fast installation', 'UK delivery'].map((b) => (
                <span key={b} className="text-xs font-medium font-display text-navy bg-light border border-border px-3 py-1.5 rounded-full">{b}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <a href="/contact-us/"
                className="block w-full text-center bg-gold text-navy font-bold font-display py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">
                Request a Quote
              </a>
              <button className="w-full border border-navy text-navy font-semibold font-display py-3.5 rounded-xl hover:bg-light transition-colors text-sm">
                Download Specification
              </button>
              <a href="/customise-your-build/"
                className="block w-full text-center text-sm font-semibold font-display text-muted hover:text-navy transition-colors underline underline-offset-2 py-1">
                Customise this home
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Section navigation ───
          Sticks under the site header and follows the reader down the page.
          Only sections this model actually has appear, and the one in view is
          highlighted; see the IntersectionObserver above. */}
      <nav
        aria-label="Page sections"
        className="sticky top-16 z-40 bg-white border-t border-b border-border"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex gap-1 overflow-x-auto">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className={`shrink-0 px-4 py-3.5 text-sm font-semibold font-display border-b-2 -mb-px transition-colors ${
                activeSection === sec.id
                  ? 'border-gold text-navy'
                  : 'border-transparent text-muted hover:text-navy'
              }`}
            >
              {sec.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ─── A: Overview ─── */}
      <div id="overview" className="scroll-mt-32 border-t border-border py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-navy text-2xl mb-4">Overview</h2>
          <p className="text-body text-base leading-relaxed mb-3">
            {detail?.intro ?? `The ${home.name} is part of our ${home.category.toLowerCase()} range, available from ${home.area} m² of internal floor area. ${home.desc}`}
          </p>
          <p className="text-body text-base leading-relaxed">
            Available as a kit, weathertight shell or fully finished turnkey build, the {home.name} can be specified with a range of external cladding finishes, glazing configurations and sustainable upgrades including air-source heat pumps and roof-integrated solar panels.
          </p>
        </div>
      </div>

      {/* ─── C5: The three packages ─── */}
      {pricing && (
        <div id="pricing" className="scroll-mt-32 border-t border-border bg-light py-14">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-navy text-2xl mb-2">Three ways to buy</h2>
            <p className="text-muted text-sm mb-8 max-w-2xl">
              Each option is a defined package. Numbers move with your site and finishes, so treat
              these as the honest floor of today&rsquo;s cost.
              {pricing.fromSmallestOf && ` Prices shown are for the smallest of ${pricing.fromSmallestOf} sizes.`}
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {pricing.options.map((opt, i) => {
                const last = i === pricing.options.length - 1
                return (
                  <div
                    key={opt.n}
                    className={`rounded-2xl border p-6 flex flex-col ${
                      last ? 'bg-navy border-navy' : 'bg-white border-border'
                    }`}
                  >
                    <p className={`text-xs font-bold font-display tracking-[0.15em] uppercase mb-2 ${last ? 'text-gold' : 'text-gold'}`}>
                      Option {opt.n}
                    </p>
                    <p className={`font-display font-bold text-lg mb-1 ${last ? 'text-white' : 'text-navy'}`}>
                      {opt.label}
                    </p>
                    <p className={`text-2xl font-bold font-display mb-4 ${last ? 'text-white' : 'text-navy'}`}>
                      {opt.price === null ? 'On request' : `from ${formatPrice(opt.price)}`}
                    </p>
                    <p className={`text-xs leading-relaxed ${last ? 'text-white/70' : 'text-muted'}`}>
                      {opt.desc}
                    </p>
                  </div>
                )
              })}
            </div>

            {pricing.note && (
              <div className="mt-6 bg-white border-l-4 border-gold rounded-r-xl px-5 py-4">
                <p className="text-sm text-body leading-relaxed">{pricing.note}</p>
              </div>
            )}

            <p className="text-xs text-muted mt-6">
              All prices from, excl. VAT. Delivery to Greater London included.
            </p>

            {/* What the price does and does not cover.
                Left open rather than folded into <details>: this is the part
                of a quote buyers most need to see, and collapsing it hid it
                from search engines too. */}
            <div className="grid lg:grid-cols-2 gap-5 mt-10">
              <section className="bg-white rounded-2xl border border-border overflow-hidden">
                <header className="px-6 py-4 border-b border-border">
                  <h3 className="font-display font-bold text-navy text-base">Not included</h3>
                  <p className="text-xs text-muted mt-1">
                    Applies to every price on this page. Budget for these separately.
                  </p>
                </header>
                <div className="px-6 py-5 space-y-5">
                  {STANDARD_EXCLUSIONS.map((group) => (
                    <div key={group.title}>
                      <h4 className="font-display font-semibold text-[11px] uppercase tracking-[0.14em] text-gold mb-2">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-body leading-relaxed">
                            <span aria-hidden="true" className="text-muted shrink-0 mt-px">—</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              <section className="bg-white rounded-2xl border border-border overflow-hidden">
                <header className="px-6 py-4 border-b border-border">
                  <h3 className="font-display font-bold text-navy text-base">Available upgrades</h3>
                  <p className="text-xs text-muted mt-1">
                    Specified with you and quoted per project.
                  </p>
                </header>
                <div className="px-6 py-5 space-y-5">
                  {AVAILABLE_UPGRADES.map((group) => (
                    <div key={group.title}>
                      <h4 className="font-display font-semibold text-[11px] uppercase tracking-[0.14em] text-gold mb-2">
                        {group.title}
                      </h4>
                      <ul className="space-y-1.5">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2.5 text-sm text-body leading-relaxed">
                            <span aria-hidden="true" className="text-gold shrink-0 font-bold">+</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <a
                    href={routes.contact}
                    className="block text-center border border-navy/20 text-navy font-semibold font-display text-sm rounded-xl px-5 py-3 hover:bg-light transition-colors"
                  >
                    Ask us to price your upgrades
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* ─── C2: Sizes and packages (from the 2026 price guide) ─── */}
      {detail && (
        <div id="sizes" className="scroll-mt-32 border-t border-border bg-light py-14">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-navy text-2xl mb-2">Sizes and pricing</h2>
            <p className="text-muted text-sm mb-6">{detail.tagline}</p>

            <div className="overflow-x-auto rounded-xl border border-border bg-white">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="bg-navy text-white text-left">
                    <th className="px-4 py-3 font-display font-semibold">Size</th>
                    <th className="px-4 py-3 font-display font-semibold">Dimensions (mm)</th>
                    <th className="px-4 py-3 font-display font-semibold">Internal area</th>
                    {detail.packages.map((pkg) => (
                      <th key={pkg.n} className="px-4 py-3 font-display font-semibold whitespace-nowrap">
                        {pkg.n} {pkg.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detail.variants.map((v) => (
                    <tr key={v.name} className="border-t border-border">
                      <td className="px-4 py-3 font-display font-bold text-navy whitespace-nowrap">{v.name}</td>
                      <td className="px-4 py-3 text-muted whitespace-nowrap">{v.dimensions}</td>
                      <td className="px-4 py-3 text-muted whitespace-nowrap">{v.area} m²</td>
                      <td className="px-4 py-3 font-medium text-navy whitespace-nowrap">from £{v.kit.toLocaleString('en-GB')}</td>
                      <td className="px-4 py-3 font-medium text-navy whitespace-nowrap">from £{v.shell.toLocaleString('en-GB')}</td>
                      <td className="px-4 py-3 font-bold text-navy whitespace-nowrap">from £{v.turnkey.toLocaleString('en-GB')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-xs text-muted mt-3">{PRICE_NOTE}</p>

            <div className="grid md:grid-cols-3 gap-5 mt-8">
              {detail.packages.map((pkg) => (
                <div key={pkg.n} className="bg-white rounded-xl border border-border p-5">
                  <p className="text-xs font-bold font-display text-gold tracking-[0.15em] uppercase mb-2">
                    Package {pkg.n}
                  </p>
                  <p className="font-display font-bold text-navy text-base mb-2">{pkg.name}</p>
                  <p className="text-xs text-muted leading-relaxed">{pkg.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-6 border-t border-border text-xs">
              <span className="text-muted">
                U-value walls <span className="font-bold font-display text-navy">{detail.uValueWalls}</span>
              </span>
              <span className="text-muted">
                U-value roof <span className="font-bold font-display text-navy">{detail.uValueRoof}</span>
              </span>
              {detail.foundationFrom && (
                <span className="text-muted">
                  Ground screw foundation{' '}
                  <span className="font-bold font-display text-navy">
                    from £{detail.foundationFrom.toLocaleString('en-GB')}
                  </span>
                </span>
              )}
              {detail.accreditations.map((a) => (
                <span key={a} className="font-bold font-display text-navy">{a}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── C3: Floor plans and room schedule ─── */}
      {plans.length > 0 && (
        <div id="floor-plans" className="scroll-mt-32 border-t border-border py-14">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-navy text-2xl mb-2">Floor plans</h2>
            <p className="text-muted text-sm mb-6">
              Numbered rooms correspond to the accommodation schedule below.
              Dimensions in millimetres.
            </p>
            <div className={`grid gap-6 ${plans.length > 1 ? 'lg:grid-cols-2' : 'max-w-3xl'}`}>
              {plans.map((src, i) => (
                <figure key={src} className="bg-light rounded-2xl border border-border overflow-hidden">
                  <img
                    src={src}
                    alt={`${home.name} floor plan${plans.length > 1 ? ` ${i + 1}` : ''}`}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                  {plans.length > 1 && (
                    <figcaption className="px-5 py-3 text-xs font-bold font-display text-muted uppercase tracking-widest border-t border-border bg-white">
                      Plan {i + 1} of {plans.length}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── C4: Room schedule, from the catalogue ─── */}
      {spec && spec.rooms.length > 1 && (
        <div id="accommodation" className="scroll-mt-32 border-t border-border py-14">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
            <h2 className="font-display font-bold text-navy text-2xl mb-2">Accommodation</h2>
            <p className="text-muted text-sm mb-6">
              {spec.bedrooms > 0 && `${spec.bedrooms} bedroom${spec.bedrooms > 1 ? 's' : ''}`}
              {spec.bedrooms > 0 && spec.bathrooms > 0 && ', '}
              {spec.bathrooms > 0 && `${spec.bathrooms} bathroom${spec.bathrooms > 1 ? 's' : ''}`}
              {(spec.bedrooms > 0 || spec.bathrooms > 0) && ' · '}
              {spec.totalArea} m² of scheduled accommodation
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1 max-w-4xl">
              {spec.rooms.map((room, i) => (
                <div
                  key={`${room.name}-${i}`}
                  className="flex items-baseline justify-between gap-3 py-2 border-b border-border"
                >
                  <span className="text-sm text-body">{room.name}</span>
                  <span className="text-sm font-medium font-display text-navy shrink-0">
                    {room.area} m²
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── B: Optional extras ─── */}
      <div id="features" className="scroll-mt-32 border-t border-border bg-light py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-2">Additional features</h2>
          <p className="text-muted text-sm mb-8 max-w-2xl">
            These are bespoke options rather than standard specification. They are not included in
            any of the packages above and are priced separately once we know what you want.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '◎', title: 'Full-height glazing', desc: 'Large fixed and opening sections to the garden elevation. Options for bi-fold or sliding door systems.' },
              { icon: '◈', title: 'Open-plan living', desc: 'Ground floor combines kitchen, dining and sitting areas beneath a galleried first floor.' },
              { icon: '◉', title: 'Mezzanine bedroom level', desc: 'Three bedrooms on a half-storey above the main living area with views into the double-height space.' },
              { icon: '◆', title: 'Timber or render finish', desc: 'Standard models available with dark-stained timber cladding or white through-coloured render.' },
              { icon: '◇', title: 'Heat pump ready', desc: 'Pre-designed to accommodate air-source heat pump with underfloor heating throughout.' },
              { icon: '○', title: 'Turnkey available', desc: 'Full internal completion including kitchen, bathrooms, electrical and plumbing works on request.' },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-5 border border-border">
                <span className="text-gold text-lg">{f.icon}</span>
                <h4 className="font-display font-bold text-navy text-sm mt-2 mb-1">{f.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── D: Completion options ─── */}
      <div id="completion" className="scroll-mt-32 border-t border-border py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-2">Completion options</h2>
          <p className="text-muted text-sm mb-6">The {home.name} is available as a kit, shell or turnkey solution.</p>
          <div className="flex gap-2 mb-7">
            {(['Base', 'Turnkey'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setCompletionTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold font-display transition-colors ${completionTab === tab ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="max-w-2xl bg-light rounded-2xl p-7 border border-border">
            {completionTab === 'Base' ? (
              <div>
                <p className="font-display font-bold text-navy mb-2">Base, building supply to specification</p>
                <p className="text-sm text-muted leading-relaxed mb-4">Your building is manufactured and delivered to the agreed specification. Suitable for clients managing their own groundworks, internal finishing or who have existing contractors in place.</p>
                <ul className="space-y-2">
                  {['Building manufactured to agreed spec', 'Delivery and crane placement', 'Structural assembly and weather-tight close', 'Standard external finishes included'].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-body">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold mt-0.5 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <p className="font-display font-bold text-navy mb-2">Turnkey, We manage every stage, from site preparation and foundations to internal finishing, heating, kitchen and bathroom installation.</p>
                <p className="text-sm text-muted leading-relaxed mb-4">A complete managed solution covering all works from site preparation through to final handover. One contract, one team.</p>
                <ul className="space-y-2">
                  {['Foundation and groundworks (as agreed)', 'Full structural assembly', 'Electrical installation and plumbing', 'Internal finishes, kitchen and bathrooms', 'Heating and ventilation commissioning', 'Final inspection and handover'].map((i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-body">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold mt-0.5 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <a href="/contact-us/"
              className="mt-5 text-sm font-semibold font-display text-navy underline underline-offset-2 hover:text-gold transition-colors">
              Request the full specification →
            </a>
          </div>
        </div>
      </div>

      {/* ─── E: Sustainable options ─── */}
      <div className="border-t border-border bg-light py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-2">Sustainable upgrades</h2>
          <p className="text-muted text-sm mb-8">Optional upgrades available across the {home.name} range.</p>
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {sustainableCards.map((c) => (
              <div key={c.title} className="rounded-xl overflow-hidden bg-white card-shadow">
                <div className="h-36 overflow-hidden">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h4 className="font-display font-bold text-navy text-sm mb-1">{c.title}</h4>
                  <p className="text-xs text-muted">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {['Bespoke Home Design', 'Planning Permission Support', 'Architectural Services', 'Structural Design'].map((s) => (
              <div key={s} className="bg-white rounded-xl p-4 border border-border">
                <p className="font-display font-bold text-navy text-sm">{s}</p>
              </div>
            ))}
          </div>
          <a href="/customise-your-build/"
            className="text-sm font-semibold font-display text-navy border border-navy rounded-xl px-6 py-3 hover:bg-navy hover:text-white transition-colors">
            Discuss Bespoke Options
          </a>
        </div>
      </div>

      {/* ─── F: Technical Specs accordion ─── */}
      <div id="specifications" className="scroll-mt-32 border-t border-border py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-6">Technical specifications</h2>
          <div className="max-w-2xl divide-y divide-border rounded-xl border border-border overflow-hidden">
            {specs.map((s) => (
              <div key={s.label}>
                <button
                  onClick={() => setActiveSpec(activeSpec === s.label ? null : s.label)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-light transition-colors"
                >
                  <span className="font-semibold font-display text-navy text-sm">{s.label}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                    className={`text-muted transition-transform shrink-0 ${activeSpec === s.label ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                {activeSpec === s.label && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-muted leading-relaxed">{s.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── H: Similar homes ─── */}
      <div className="border-t border-border bg-light py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-8">You might also like</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {relatedHomes.map((h) => (
              <a href={productPath(h.slug)}
                key={h.name}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1">
                <div className="h-44 overflow-hidden bg-light">
                  <img src={h.thumb ? houseImage(h.thumb) : undefined} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-navy">{h.name}</p>
                    <p className="text-sm font-bold text-gold font-display">£{h.price.toLocaleString('en-GB')}</p>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{h.area} m²</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ─── I: Final CTA ─── */}
      <div className="bg-navy py-16">
        <div className="max-w-[700px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-3xl mb-3">Interested in the {home.name}?</h2>
          <p className="text-white/65 text-base mb-8">Tell us about your site, delivery area and any modifications you have in mind. We'll come back to you with a tailored quotation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact-us/" className="bg-gold text-navy font-bold font-display px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">Request a Quote</a>
            <a href="/houses/" className="border border-white/30 text-white font-semibold font-display px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">Browse all homes</a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-5 right-5 text-white/70 hover:text-white">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
          <img src={images[activeImage]} alt="" className="max-w-full max-h-full rounded-xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      )}

      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border px-4 py-3 flex gap-3">
        <a href="/contact-us/" className="flex-1 bg-gold text-navy font-bold font-display py-3 rounded-xl text-sm">
          Request a Quote
        </a>
        <button className="flex-1 border border-navy text-navy font-semibold font-display py-3 rounded-xl text-sm">
          Download Spec
        </button>
      </div>
    </div>
  )
}
