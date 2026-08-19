import { media } from '../data/media'

const IMGS = {
  hero: media.chaletExterior,
  resi: media.heroExterior,
  commercial: media.commercial,
  heat: media.gardenRoom,
  solar: media.siteAerial,
  green: media.residenceExterior,
}

const processSteps = [
  { n: '01', label: 'Brief', desc: 'We discuss your site, purpose, programme and budget in detail before recommending an approach.' },
  { n: '02', label: 'Site Review', desc: 'We visit or assess your plot, review planning context and identify any constraints.' },
  { n: '03', label: 'Concept Design', desc: 'Initial design concepts developed and presented for your feedback and revision.' },
  { n: '04', label: 'Technical Development', desc: 'Approved concept is developed into a full technical specification ready for manufacture.' },
  { n: '05', label: 'Manufacture & Delivery', desc: 'Building manufactured under factory conditions and delivered to site for installation.' },
]

const sustainableOptions = [
  { label: 'Air Source Heat Pumps', desc: 'Efficient heating and hot water with low running costs and reduced carbon.' },
  { label: 'Solar Panels', desc: 'Roof-integrated photovoltaic panels to reduce grid dependency and energy costs.' },
  { label: 'Green Roofs', desc: 'Living roof systems for biodiversity benefit, insulation and visual appeal.' },
  { label: 'Smart Controls', desc: 'HVAC and energy management systems controllable from a single interface.' },
  { label: 'Underfloor Heating', desc: 'Efficient, comfortable whole-house heating compatible with heat pump systems.' },
  { label: 'High-Performance Glazing', desc: 'Triple-glazed units with thermally broken frames to minimise heat loss.' },
]

export default function BespokePage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative bg-navy min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMGS.hero} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,32,74,0.75)' }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-5">Bespoke & Commercial</p>
          <h1 className="font-display font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(36px, 5vw, 60px)', maxWidth: '700px' }}>
            Designed for your site,<br />your purpose and your vision.
          </h1>
          <p className="text-white/70 text-lg max-w-lg mb-8">
            Whether you need a one-off residential home, a commercial workspace or a fully bespoke design, Trident Modular can deliver a building that fits precisely.
          </p>
          <a href="/contact/"
            className="bg-gold text-navy font-bold font-display px-7 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">
            Discuss Your Project
          </a>
        </div>
      </section>

      {/* Two routes */}
      <section id="design" className="py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Our Services</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">Two routes, one team</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Bespoke Residential',
                desc: 'For clients who need more than a catalogue design can offer. We work from your brief, site and aspirations to develop a home designed specifically for your plot. The result uses the same factory manufacturing process, with the flexibility of a fully bespoke design.',
                features: ['Architect-led design process', 'Planning permission support', 'Structural engineering', 'Any size, layout or specification', 'Full or partial completion available'],
                img: IMGS.resi,
                cta: 'Enquire about bespoke residential',
              },
              {
                title: 'Commercial & Investment Projects',
                desc: 'Trident Modular works with developers, landowners and commercial clients on a wide range of building types, from offices and workspaces to hospitality buildings, glamping lodges and rental units. Modular construction is particularly well suited to multi-unit and phased commercial schemes.',
                features: ['Offices and workspaces', 'Hospitality and leisure', 'Rental and investment units', 'Glamping and tourism', 'Phased or multi-unit schemes'],
                img: IMGS.commercial,
                cta: 'Enquire about commercial projects',
              },
            ].map((route) => (
              <div key={route.title} className="bg-white rounded-2xl overflow-hidden card-shadow">
                <div className="h-52 overflow-hidden bg-light">
                  <img src={route.img} alt={route.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-7">
                  <h3 className="font-display font-bold text-navy text-xl mb-3">{route.title}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-5">{route.desc}</p>
                  <ul className="space-y-2 mb-6">
                    {route.features.map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm text-body">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a href="/contact/"
                    className="text-sm font-semibold font-display text-navy border border-navy rounded-xl px-5 py-2.5 hover:bg-navy hover:text-white transition-colors">
                    {route.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke process */}
      <section id="process" className="bg-light py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">How It Works</p>
            <h2 className="font-display font-bold text-navy text-4xl">The bespoke process</h2>
          </div>
          <div className="relative">
            <div className="hidden lg:block absolute top-10 h-px bg-border" style={{ left: '10%', right: '10%' }} />
            <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-4 relative z-10">
                    <span className="font-display font-bold text-gold text-lg">{step.n}</span>
                  </div>
                  <h4 className="font-display font-bold text-navy text-sm mb-2">{step.label}</h4>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable upgrades */}
      <section id="sustainable" className="py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Green Options</p>
            <h2 className="font-display font-bold text-navy text-4xl">Sustainable upgrades</h2>
            <p className="text-muted text-base mt-3 max-w-xl">Available across our bespoke and standard ranges, we can specify sustainable technologies from the outset or integrate them into an existing design.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {sustainableOptions.map((opt) => (
              <div key={opt.label} className="bg-light rounded-xl p-5 border border-border">
                <span className="text-gold text-lg mb-3 block">◉</span>
                <h4 className="font-display font-bold text-navy text-sm mb-1">{opt.label}</h4>
                <p className="text-xs text-muted leading-relaxed">{opt.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support services */}
      <section id="support" className="bg-light py-20 lg:py-28 scroll-mt-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-3xl mb-8">Professional support services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {['Bespoke Home Design', 'Planning Permission Support', 'Architectural Services', 'Structural Design'].map((s) => (
              <div key={s} className="bg-white rounded-xl p-5 border border-border">
                <span className="text-gold text-lg mb-3 block">◈</span>
                <p className="font-display font-bold text-navy text-sm">{s}</p>
                <p className="text-xs text-muted mt-1 leading-relaxed">Available as part of a full project service or independently.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-3xl mb-4">Ready to discuss your project?</h2>
          <p className="text-white/65 mb-8">Tell us about your site, requirements and timeline and we'll get back to you with our initial thoughts.</p>
          <a href="/contact/" className="bg-gold text-navy font-bold font-display px-8 py-4 rounded-xl hover:bg-gold-dark transition-colors text-sm">
            Start a Conversation
          </a>
        </div>
      </section>
    </div>
  )
}
