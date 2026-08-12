import { useState, useMemo } from 'react'
import { allHomes } from '../data/homes'
import { productPath } from '../lib/routes'



const catChips = ['All Homes', 'Garden Rooms', 'Bungalows', '1.5 Storey', '2 Storey']


export default function CataloguePage() {
  const [activeCategory, setActiveCategory] = useState('All Homes')
  const [minArea, setMinArea] = useState(0)
  const [maxArea, setMaxArea] = useState(250)
  const [minBeds, setMinBeds] = useState(0)
  const [sortBy, setSortBy] = useState('Recommended')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let results = allHomes.filter((h) => {
      if (activeCategory !== 'All Homes' && h.category !== activeCategory) return false
      if (h.maxArea < minArea || h.minArea > maxArea) return false
      if (h.beds < minBeds) return false
      return true
    })
    const parsePrice = (p: string) => parseInt(p.replace(/[^0-9]/g, ''), 10)
    if (sortBy === 'Price: low to high') results = [...results].sort((a, b) => parsePrice(a.kitPrice) - parsePrice(b.kitPrice))
    if (sortBy === 'Price: high to low') results = [...results].sort((a, b) => parsePrice(b.kitPrice) - parsePrice(a.kitPrice))
    if (sortBy === 'Floor area') results = [...results].sort((a, b) => b.maxArea - a.maxArea)
    return results
  }, [activeCategory, minArea, maxArea, minBeds, sortBy])

  const clearFilters = () => {
    setActiveCategory('All Homes')
    setMinArea(0)
    setMaxArea(250)
    setMinBeds(0)
    setSortBy('Recommended')
  }

  const FilterPanel = () => (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-bold font-display uppercase tracking-widest text-navy mb-3">Floor area (m²)</p>
        <div className="flex gap-3 items-center">
          <input type="number" value={minArea} onChange={(e) => setMinArea(Number(e.target.value))} className="w-20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
          <span className="text-muted text-xs">to</span>
          <input type="number" value={maxArea} onChange={(e) => setMaxArea(Number(e.target.value))} className="w-20 border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold" />
        </div>
      </div>
      <div>
        <p className="text-xs font-bold font-display uppercase tracking-widest text-navy mb-3">Min. bedrooms</p>
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setMinBeds(n)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold font-display transition-colors ${minBeds === n ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
            >
              {n === 0 ? 'Any' : n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-xs font-bold font-display uppercase tracking-widest text-navy mb-3">Sort by</p>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gold bg-white"
        >
          {['Recommended', 'Price: low to high', 'Price: high to low', 'Floor area'].map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>
      <button onClick={clearFilters} className="text-sm text-muted hover:text-navy transition-colors underline underline-offset-2">
        Clear all filters
      </button>
    </div>
  )

  return (
    <div className="bg-white min-h-screen">

      {/* Compact hero */}
      <div className="bg-light border-b border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Our Range</p>
          <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-3">Explore our homes</h1>
          <p className="text-muted text-base max-w-xl">
            Browse standard designs across our full range. Every model can be adapted to your site, or we can design something entirely bespoke.
          </p>
        </div>
      </div>

      {/* Why Trident strip */}
      <div className="border-b border-border bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-wrap gap-6">
            {['Cost-effective manufacture', 'Fast factory delivery', 'Tailored to your site', 'Energy-efficient by design'].map((p) => (
              <div key={p} className="flex items-center gap-2 text-sm">
                <span className="text-gold">✓</span>
                <span className="text-body font-medium">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {/* Category chips */}
        <div className="flex items-center gap-3 flex-wrap mb-6">
          {catChips.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-display transition-colors ${activeCategory === c ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
            >
              {c}
            </button>
          ))}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm text-muted">{filtered.length} homes</span>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 border border-border rounded-lg px-4 py-2 text-sm font-medium font-display text-body"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z"/></svg>
              Filters
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters – desktop */}
          <aside className="hidden lg:block w-56 shrink-0">
            <p className="text-xs font-bold font-display uppercase tracking-widest text-navy mb-5">Refine</p>
            <FilterPanel />
          </aside>

          {/* Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-navy font-bold font-display text-lg mb-2">No homes match your filters</p>
                <p className="text-muted text-sm mb-4">Try adjusting your selection or clear all filters.</p>
                <button onClick={clearFilters} className="text-sm font-semibold font-display text-gold underline">Clear filters</button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((home) => (
                  <div
                    key={home.id}
                    className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
                  >
                    {/* Image */}
                    <div className="h-48 overflow-hidden bg-light relative shrink-0">
                      <img src={home.img} alt={home.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="bg-navy text-white text-[10px] font-bold font-display px-2.5 py-1 rounded uppercase tracking-widest">{home.category}</span>
                        {home.tag && <span className="bg-gold text-navy text-[10px] font-bold font-display px-2.5 py-1 rounded uppercase tracking-widest">{home.tag}</span>}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-5 flex flex-col flex-1">
                      {/* Name + size range */}
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-display font-bold text-navy text-base leading-snug">{home.name}</h3>
                        <span className="text-muted text-xs font-medium shrink-0">{home.sizeRange}</span>
                      </div>
                      {/* Description */}
                      <p className="text-xs text-muted leading-snug mb-2">{home.desc}</p>
                      {/* Tags */}
                      <p className="text-xs text-muted mb-4">{home.tags.join(' · ')}</p>

                      {/* Tier pricing */}
                      <div className="rounded-xl overflow-hidden border border-border mt-auto">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-light">
                          <span className="text-[10px] font-bold font-display text-muted tracking-[0.15em] uppercase">01 DIY</span>
                          <span className="text-sm font-bold font-display text-navy">{home.kitPrice}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5 bg-light border-t border-border">
                          <span className="text-[10px] font-bold font-display text-muted tracking-[0.15em] uppercase">02 Shell</span>
                          <span className="text-sm font-bold font-display text-navy">{home.shellPrice}</span>
                        </div>
                        <div className="flex items-center justify-between px-4 py-2.5 bg-navy">
                          <span className="text-[10px] font-bold font-display text-white tracking-[0.15em] uppercase">03 Turnkey</span>
                          <span className="text-sm font-bold font-display text-white">{home.turnkeyPrice}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-xs text-muted">+ foundation {home.foundation}</span>
                        <a href={productPath(home.slug)}
                          className="text-xs font-bold font-display text-navy border border-border rounded-lg px-4 py-1.5 hover:border-navy hover:bg-light transition-colors">
                          Open
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile filters drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowFilters(false)} />
            <div className="relative bg-white h-full w-72 ml-auto p-6 overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <p className="font-bold font-display text-navy">Filters</p>
                <button onClick={() => setShowFilters(false)}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
              </div>
              <FilterPanel />
              <button onClick={() => setShowFilters(false)} className="mt-6 w-full bg-navy text-white font-semibold font-display py-3 rounded-xl">
                Show {filtered.length} results
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bespoke CTA */}
      <div className="border-t border-border bg-light py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-navy text-xl mb-1">Can't find the right layout?</p>
            <p className="text-muted text-sm">Adapt an existing model or create a bespoke design with our team.</p>
          </div>
          <a href="/bespoke/"
            className="shrink-0 bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm">
            Explore Bespoke Design
          </a>
        </div>
      </div>
    </div>
  )
}
