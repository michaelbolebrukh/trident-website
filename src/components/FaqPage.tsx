import { useState, useMemo } from 'react'
import { faqs, faqCategories as categories } from '../data/faq'

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
