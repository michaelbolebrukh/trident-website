import { useState } from 'react'
import type { Page } from '../App'

interface ProductPageProps {
  navigate: (page: Page) => void
}

const IMGS = {
  ext1: 'https://images.unsplash.com/photo-1766603636700-e9d80473f40f?w=1100&h=750&fit=crop&auto=format',
  ext2: 'https://images.unsplash.com/photo-1696846911635-83b97e53fb65?w=1100&h=750&fit=crop&auto=format',
  ext3: 'https://images.unsplash.com/photo-1605018075968-b014b8d2e487?w=1100&h=750&fit=crop&auto=format',
  int1: 'https://images.unsplash.com/photo-1597031751096-9acc728067ad?w=1100&h=750&fit=crop&auto=format',
  int2: 'https://images.unsplash.com/photo-1748764720733-3bb4c52ab6f9?w=1100&h=750&fit=crop&auto=format',
  int3: 'https://images.unsplash.com/photo-1778172884832-78a5de5ec3d2?w=1100&h=750&fit=crop&auto=format',
  garden: 'https://images.unsplash.com/photo-1697538022262-7eb736179973?w=700&h=500&fit=crop&auto=format',
  aerial: 'https://images.unsplash.com/photo-1505060872009-ed2866c37da6?w=700&h=500&fit=crop&auto=format',
  exterior: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=700&h=500&fit=crop&auto=format',
}

const galleryTabs = ['Exterior', 'Interior', 'Floor Plan']
const galleryImages = {
  Exterior: [IMGS.ext1, IMGS.ext2, IMGS.ext3],
  Interior: [IMGS.int1, IMGS.int2, IMGS.int3],
  'Floor Plan': [IMGS.ext1],
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

const relatedHomes = [
  { name: 'Gothic', price: '£155,000', area: '128m²', img: IMGS.exterior },
  { name: 'Nordic Ridge', price: '£144,500', area: '118m²', img: IMGS.garden },
  { name: 'Grand Vista', price: '£198,000', area: '165m²', img: IMGS.aerial },
]

export default function ProductPage({ navigate }: ProductPageProps) {
  const [activeGalleryTab, setActiveGalleryTab] = useState<string>('Exterior')
  const [activeImage, setActiveImage] = useState(0)
  const [activeSpec, setActiveSpec] = useState<string | null>(null)
  const [completionTab, setCompletionTab] = useState<'Base' | 'Turnkey'>('Base')
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const images = galleryImages[activeGalleryTab as keyof typeof galleryImages] ?? []

  return (
    <div className="bg-white">

      {/* Breadcrumb */}
      <div className="bg-light border-b border-border py-3">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center gap-2 text-xs text-muted">
          <button onClick={() => navigate('home')} className="hover:text-navy transition-colors">Home</button>
          <span>/</span>
          <button onClick={() => navigate('catalogue')} className="hover:text-navy transition-colors">All Homes</button>
          <span>/</span>
          <button onClick={() => navigate('catalogue')} className="hover:text-navy transition-colors">1.5 Storey</button>
          <span>/</span>
          <span className="text-navy font-medium">Loft</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-14">

          {/* LEFT: Gallery */}
          <div>
            {/* Gallery tabs */}
            <div className="flex gap-2 mb-4">
              {galleryTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => { setActiveGalleryTab(tab); setActiveImage(0) }}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold font-display transition-colors ${activeGalleryTab === tab ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Main image */}
            <div
              className="relative rounded-2xl overflow-hidden cursor-zoom-in bg-light"
              style={{ height: '460px' }}
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={images[activeImage]}
                alt="Loft — exterior view"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-medium font-display text-navy flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>
                View full size
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${i === activeImage ? 'border-gold' : 'border-transparent opacity-60 hover:opacity-100'}`}
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
              <span className="text-xs font-bold font-display text-gold uppercase tracking-widest">1.5 Storey</span>
            </div>
            <h1 className="font-display font-bold text-navy text-4xl mb-2">Loft</h1>
            <p className="text-2xl font-bold font-display text-gold mb-4">From £138,000</p>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-3 mb-5 p-4 bg-light rounded-xl">
              {[
                { label: 'Floor area', value: '112m²' },
                { label: 'Bedrooms', value: '3' },
                { label: 'Bathrooms', value: '2' },
                { label: 'Storeys', value: '1.5' },
                { label: 'ft²', value: '1,206' },
                { label: 'Base price', value: 'From £138k' },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-bold font-display text-navy text-base">{s.value}</p>
                  <p className="text-xs text-muted mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <p className="text-sm text-muted leading-relaxed mb-5">
              The Loft is a versatile 1.5 storey design offering generous ground-floor living with private first-floor bedrooms. A large fully glazed gable end floods the open-plan living space with natural light while framing views across the garden.
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['Energy efficient', 'Customisable', 'Fast installation', 'UK delivery'].map((b) => (
                <span key={b} className="text-xs font-medium font-display text-navy bg-light border border-border px-3 py-1.5 rounded-full">{b}</span>
              ))}
            </div>

            {/* CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => navigate('contact')}
                className="w-full bg-gold text-navy font-bold font-display py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm"
              >
                Request a Quote
              </button>
              <button className="w-full border border-navy text-navy font-semibold font-display py-3.5 rounded-xl hover:bg-light transition-colors text-sm">
                Download Specification
              </button>
              <button
                onClick={() => navigate('bespoke')}
                className="w-full text-sm font-semibold font-display text-muted hover:text-navy transition-colors underline underline-offset-2 py-1"
              >
                Customise this home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── A: Overview ─── */}
      <div className="border-t border-border py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 max-w-3xl">
          <h2 className="font-display font-bold text-navy text-2xl mb-4">Overview</h2>
          <p className="text-body text-base leading-relaxed mb-3">
            The Loft pairs an open-plan ground floor — kitchen, dining and living — with a mezzanine-level first storey housing three bedrooms and a family bathroom. The galleried staircase creates a sense of volume without adding unnecessary footprint.
          </p>
          <p className="text-body text-base leading-relaxed">
            Available in both Base and Turnkey completion options, the Loft can be specified with a range of external cladding finishes, glazing configurations and sustainable upgrades including air-source heat pumps and roof-integrated solar panels.
          </p>
        </div>
      </div>

      {/* ─── B: Key Features ─── */}
      <div className="border-t border-border bg-light py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-8">Key features</h2>
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
      <div className="border-t border-border py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-2">Completion options</h2>
          <p className="text-muted text-sm mb-6">The Loft is available as a Base or Turnkey solution.</p>
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
                <p className="font-display font-bold text-navy mb-2">Base — building supply to specification</p>
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
                <p className="font-display font-bold text-navy mb-2">Turnkey — fully managed, ready to move in</p>
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
            <button
              onClick={() => navigate('contact')}
              className="mt-5 text-sm font-semibold font-display text-navy underline underline-offset-2 hover:text-gold transition-colors"
            >
              Request the full specification →
            </button>
          </div>
        </div>
      </div>

      {/* ─── E: Sustainable options ─── */}
      <div className="border-t border-border bg-light py-14">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-2xl mb-2">Sustainable upgrades</h2>
          <p className="text-muted text-sm mb-8">Optional upgrades available across the Loft range.</p>
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
          <button
            onClick={() => navigate('bespoke')}
            className="text-sm font-semibold font-display text-navy border border-navy rounded-xl px-6 py-3 hover:bg-navy hover:text-white transition-colors"
          >
            Discuss Bespoke Options
          </button>
        </div>
      </div>

      {/* ─── F: Technical Specs accordion ─── */}
      <div className="border-t border-border py-14">
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
              <button
                key={h.name}
                onClick={() => navigate('product')}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-44 overflow-hidden bg-light">
                  <img src={h.img} alt={h.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-navy">{h.name}</p>
                    <p className="text-sm font-bold text-gold font-display">{h.price}</p>
                  </div>
                  <p className="text-xs text-muted mt-0.5">{h.area}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── I: Final CTA ─── */}
      <div className="bg-navy py-16">
        <div className="max-w-[700px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display font-bold text-white text-3xl mb-3">Interested in the Loft?</h2>
          <p className="text-white/65 text-base mb-8">Tell us about your site, delivery area and any modifications you have in mind. We'll come back to you with a tailored quotation.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('contact')} className="bg-gold text-navy font-bold font-display px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">Request a Quote</button>
            <button onClick={() => navigate('catalogue')} className="border border-white/30 text-white font-semibold font-display px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">Browse all homes</button>
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
        <button onClick={() => navigate('contact')} className="flex-1 bg-gold text-navy font-bold font-display py-3 rounded-xl text-sm">
          Request a Quote
        </button>
        <button className="flex-1 border border-navy text-navy font-semibold font-display py-3 rounded-xl text-sm">
          Download Spec
        </button>
      </div>
    </div>
  )
}
