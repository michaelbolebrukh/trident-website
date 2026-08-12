import { useState } from 'react'
import type { Page } from '../App'

interface BlogPageProps {
  navigate: (page: Page) => void
}

const IMGS = {
  a: 'https://images.unsplash.com/photo-1766603636700-e9d80473f40f?w=700&h=500&fit=crop&auto=format',
  b: 'https://images.unsplash.com/photo-1697538022262-7eb736179973?w=700&h=500&fit=crop&auto=format',
  c: 'https://images.unsplash.com/photo-1597031751096-9acc728067ad?w=700&h=500&fit=crop&auto=format',
  d: 'https://images.unsplash.com/photo-1505060872009-ed2866c37da6?w=700&h=500&fit=crop&auto=format',
  e: 'https://images.unsplash.com/photo-1696846911635-83b97e53fb65?w=700&h=500&fit=crop&auto=format',
  f: 'https://images.unsplash.com/photo-1605018075968-b014b8d2e487?w=700&h=500&fit=crop&auto=format',
}

const articles = [
  { title: 'Modular vs frame-built: which is right for your plot?', cat: 'Modular Homes', date: '14 July 2025', readTime: '6 min', img: IMGS.a, excerpt: 'Understanding the practical differences between modular and frame-built construction helps you choose the most suitable approach for your site, budget and timescale.' },
  { title: 'How to plan a garden room that works year-round', cat: 'Garden Rooms', date: '2 July 2025', readTime: '5 min', img: IMGS.b, excerpt: 'Insulation, heating, ventilation and glazing all affect how comfortable a garden room is in winter. Here\'s what to consider before you specify.' },
  { title: 'What does \'turnkey\' actually mean?', cat: 'Installation', date: '20 June 2025', readTime: '4 min', img: IMGS.c, excerpt: 'The term \'turnkey\' is used differently across the construction industry. We explain exactly what is included in a Trident Modular turnkey contract.' },
  { title: 'Do I need planning permission for a modular home?', cat: 'Planning', date: '5 June 2025', readTime: '7 min', img: IMGS.d, excerpt: 'Planning requirements depend on the type of building, its size, your plot and its location. A practical guide to the questions you should ask before you proceed.' },
  { title: 'Energy efficiency in modular construction', cat: 'Sustainability', date: '22 May 2025', readTime: '5 min', img: IMGS.e, excerpt: 'Factory manufacture allows tighter quality control over insulation and airtightness than traditional site-built methods. Here\'s how that translates into real energy performance.' },
  { title: 'Choosing external cladding for a modern home', cat: 'Design', date: '8 May 2025', readTime: '6 min', img: IMGS.f, excerpt: 'Timber, render, fibre cement or metal: different cladding types have different maintenance requirements, aesthetics and price points. A guide to making the right choice.' },
]

const categories = ['All', 'Modular Homes', 'Garden Rooms', 'Design', 'Installation', 'Sustainability', 'Planning', 'Case Studies']

export default function BlogPage({ navigate }: BlogPageProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = articles.filter((a) => {
    if (activeCategory !== 'All' && a.cat !== activeCategory) return false
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.excerpt.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const featured = articles[0]

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="bg-light border-b border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Ideas & Insights</p>
            <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl">Ideas, guidance<br />and project insights</h1>
          </div>
          <div className="relative sm:w-72">
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-border rounded-xl px-4 pl-10 py-2.5 text-sm focus:outline-none focus:border-gold bg-white"
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {/* Categories */}
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

        {/* Featured article */}
        {activeCategory === 'All' && !search && (
          <div className="mb-12">
            <button className="group w-full bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1 grid lg:grid-cols-2">
              <div className="h-60 lg:h-auto overflow-hidden bg-light">
                <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold font-display text-gold uppercase tracking-widest">Featured</span>
                  <span className="text-xs font-semibold font-display bg-light text-muted px-3 py-1 rounded-full">{featured.cat}</span>
                </div>
                <h2 className="font-display font-bold text-navy text-2xl mb-3 leading-snug group-hover:text-navy-mid transition-colors">{featured.title}</h2>
                <p className="text-muted text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Article grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="font-display font-bold text-navy text-xl mb-2">No articles found.</p>
            <p className="text-muted text-sm">Try a different search term or category.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeCategory === 'All' && !search ? filtered.slice(1) : filtered).map((article) => (
              <button
                key={article.title}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-44 overflow-hidden bg-light">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold font-display bg-light text-muted px-3 py-1 rounded-full">{article.cat}</span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-base mb-2 leading-snug group-hover:text-navy-mid transition-colors">{article.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{article.date} · {article.readTime} read</span>
                    <span className="text-gold font-semibold font-display">Read →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="border border-border text-navy font-semibold font-display px-8 py-3 rounded-xl hover:border-navy transition-colors text-sm">
            Load more articles
          </button>
        </div>
      </div>
    </div>
  )
}
