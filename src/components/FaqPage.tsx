import { useState, useMemo } from 'react'

const categories = ['All', 'Choosing a Home', 'Pricing & Quotes', 'Design & Customisation', 'Planning & Permissions', 'Installation', 'Base & Turnkey', 'Technical', 'Delivery', 'Sustainability']

const faqs = [
  { q: 'What is the difference between a modular home and a frame-built home?', a: 'Modular homes are manufactured in sections in a factory and assembled on site. However, frame-built homes have a structural timber frame constructed or assembled on site. Both offer excellent insulation and can be customised.', cat: 'Choosing a Home' },
  { q: 'Can I adapt a standard design to suit my site?', a: 'Yes. Most of our standard models can be modified in size, layout, external finish and internal specification. We review your site and plot constraints before recommending the most suitable approach.', cat: 'Choosing a Home' },
  { q: 'What is the smallest building you supply?', a: 'Our smallest garden rooms start from 4.4 m². We also supply larger annexes and full residential homes from 54 m² upwards.', cat: 'Choosing a Home' },
  { q: 'How do I get a price?', a: 'You can request a quotation through our contact page or by telephone. Catalogue prices shown are starting figures as actual costs depend on your specification, site conditions and the chosen completion option.', cat: 'Pricing & Quotes' },
  { q: 'Do the prices shown on the website include VAT?', a: 'No, the prices shown do not include VAT. VAT can vary depending on the nature of the project and site, and we will clarify this at the quotation stage.', cat: 'Pricing & Quotes' },
  { q: 'Is finance available?', a: 'We do not arrange finance directly, but can recommend specialist providers for self-build and garden room finance.', cat: 'Pricing & Quotes' },
  { q: 'Can I choose different external cladding or colours?', a: 'Yes. Our buildings are available with a range of external finishes including dark-stained timber cladding, through-coloured render, fibre cement panels and larch. We can discuss specific requirements at design stage.', cat: 'Design & Customisation' },
  { q: 'Can I add a green roof or solar panels?', a: 'Both are available as optional upgrades. Green roofs can be specified on flat-roof sections. Solar photovoltaic panels can be integrated into the roof structure. Both are available for most standard models.', cat: 'Design & Customisation' },
  { q: 'Do I need planning permission for a garden room?', a: 'Many garden rooms fall within permitted development rights and do not require a planning application, depending on their size, position and use. We recommend checking with your local planning authority. We can also provide planning guidance as part of our service.', cat: 'Planning & Permissions' },
  { q: 'Do residential homes require full planning permission?', a: 'Yes. However, we can provide planning support and work with your architect or planning consultant if required.', cat: 'Planning & Permissions' },
  { q: 'How long does installation take?', a: 'Structural assembly for a modular home typically takes three to ten days depending on the model. Internal completion under a turnkey contract takes longer and depends on the specification agreed.', cat: 'Installation' },
  { q: 'Do I need to prepare a foundation before you deliver?', a: 'Yes. Foundations are required before delivery. For Base contracts, the client is responsible for groundworks. For Turnkey contracts, we can include foundation and groundworks within the scope. This is typically discussed at the quotation stage.', cat: 'Installation' },
  { q: 'What is the difference between Base and Turnkey?', a: 'Base means we supply and assemble the building to the agreed structural specification. Turnkey means we manage the entire process including groundworks, internal finishing, services and handover. Both options use the same manufactured building.', cat: 'Base & Turnkey' },
  { q: 'Can I add services to a Base contract separately?', a: 'Yes. We can provide individual services such as electrical installation, plumbing or internal joinery as separately priced additions to a Base contract. Speak to us at quotation stage.', cat: 'Base & Turnkey' },
  { q: 'What insulation values do your buildings achieve?', a: 'Our standard wall construction achieves a U-value of approximately 0.18 W/m²K. Roofs achieve approximately 0.12 W/m²K. Floors achieve approximately 0.13 W/m²K. Detailed specifications are available on request.', cat: 'Technical' },
  { q: 'Are your buildings suitable for year-round use?', a: 'Yes. All Trident buildings are designed for year-round use with full insulation, heating and ventilation. Garden rooms are equally suitable as permanent workspaces or annexes.', cat: 'Technical' },
  { q: 'How far do you deliver?', a: 'We deliver nationwide. Delivery logistics are assessed at the quotation stage alongside confirmation of crane requirements, vehicle access and any restrictions specific to your site.', cat: 'Delivery' },
  { q: 'How long does delivery take after I place an order?', a: 'Lead times vary depending on current production schedule and specification. Typical lead times from order to delivery are 12–20 weeks. Production schedules are confirmed at the quotation stage.', cat: 'Delivery' },
  { q: 'Are your buildings energy efficient?', a: 'Yes. All buildings are designed to meet or exceed current Part L requirements. We offer a range of sustainable upgrades including air-source heat pumps, solar panels, green roofs, MVHR ventilation and underfloor heating.', cat: 'Sustainability' },
]

export default function FaqPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [openQuestion, setOpenQuestion] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return faqs.filter((f) => {
      if (activeCategory !== 'All' && f.cat !== activeCategory) return false
      if (search && !f.q.toLowerCase().includes(search.toLowerCase()) && !f.a.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [search, activeCategory])

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="bg-light border-b border-border py-16">
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-5">How can we help?</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions about pricing, planning, installation…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-border rounded-2xl px-5 pl-12 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white shadow-sm"
            />
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-12">
        {/* Category filters */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-4 py-2 rounded-full text-xs font-semibold font-display transition-colors ${activeCategory === c ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-muted mb-6">{filtered.length} question{filtered.length !== 1 ? 's' : ''} found</p>

        {/* FAQ accordions */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display font-bold text-navy text-xl mb-2">No matching questions found.</p>
            <p className="text-muted text-sm mb-4">Try another keyword or contact our team.</p>
            <a href="/contact-us/" className="text-sm font-semibold font-display text-gold underline">Contact us</a>
          </div>
        ) : (
          <div className="space-y-2 max-w-3xl">
            {filtered.map((faq) => (
              <div key={faq.q} className="rounded-xl border border-border overflow-hidden">
                <button
                  onClick={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)}
                  className="w-full text-left flex items-start justify-between gap-4 px-5 py-4 hover:bg-light transition-colors"
                  aria-expanded={openQuestion === faq.q}
                  aria-controls={`faq-${faq.q.replace(/\W+/g, '-').toLowerCase()}`}
                >
                  <span className="font-semibold font-display text-navy text-sm leading-snug">{faq.q}</span>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
                    className={`text-muted shrink-0 mt-0.5 transition-transform ${openQuestion === faq.q ? 'rotate-180' : ''}`}
                  >
                    <path d="M7 10l5 5 5-5z"/>
                  </svg>
                </button>
                {/* Always in the DOM, hidden when collapsed: rendering answers
                    conditionally kept them out of the served HTML entirely, so
                    search engines never saw any FAQ content. */}
                <div
                  id={`faq-${faq.q.replace(/\W+/g, '-').toLowerCase()}`}
                  hidden={openQuestion !== faq.q}
                  className="px-5 pb-5 bg-light"
                >
                  <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
                  <p className="text-xs text-border mt-3 font-medium">Category: {faq.cat}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Support card */}
        <div className="mt-14 max-w-2xl bg-light rounded-2xl p-8 border border-border">
          <h3 className="font-display font-bold text-navy text-xl mb-2">Still need help?</h3>
          <p className="text-muted text-sm mb-5">Send us your question and our team will respond within one working day.</p>
          <a href="/contact-us/"
            className="bg-navy text-white font-semibold font-display px-7 py-3 rounded-xl hover:bg-navy-mid transition-colors text-sm">
            Send us a question
          </a>
        </div>
      </div>
    </div>
  )
}
