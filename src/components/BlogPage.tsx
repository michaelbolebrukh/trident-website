import { useState } from 'react'
import { postImage } from '../lib/post-image'
import postsData from '../data/posts.json'
import { responsive, SIZES } from '../lib/images'

interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  image: string | null
  words: number
}

/** Roughly 200 words a minute, rounded up, as a reading estimate. */
const readTime = (words: number) => `${Math.max(1, Math.round(words / 200))} min`

const articles = (postsData as Post[]).map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  img: postImage(p.image),
  date: new Date(p.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  readTime: readTime(p.words),
}))


export default function BlogPage() {
  const [search, setSearch] = useState('')

  const filtered = articles.filter((a) => {
    if (!search) return true
    const q = search.toLowerCase()
    return a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
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
        {/* Featured article */}
        {!search && (
          <div className="mb-12">
            <a
              href={`/blog/${featured.slug}/`}
              className="group w-full bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1 grid lg:grid-cols-2"
            >
              <div className="h-60 lg:h-auto overflow-hidden bg-light">
                <img {...(featured.img ? responsive(featured.img, SIZES.half) : {})} alt={featured.title} fetchPriority="high" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold font-display text-gold uppercase tracking-widest">Featured</span>
                  <span className="text-xs font-semibold font-display bg-light text-muted px-3 py-1 rounded-full">Insights</span>
                </div>
                <h2 className="font-display font-bold text-navy text-2xl mb-3 leading-snug group-hover:text-navy-mid transition-colors">{featured.title}</h2>
                <p className="text-muted text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} read</span>
                </div>
              </div>
            </a>
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
            {(!search ? filtered.slice(1) : filtered).map((article) => (
              <a
                key={article.slug}
                href={`/blog/${article.slug}/`}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-44 overflow-hidden bg-light">
                  <img {...(article.img ? responsive(article.img, SIZES.card) : {})} alt={article.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold font-display bg-light text-muted px-3 py-1 rounded-full">Insights</span>
                  </div>
                  <h3 className="font-display font-bold text-navy text-base mb-2 leading-snug group-hover:text-navy-mid transition-colors">{article.title}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-muted">
                    <span>{article.date} · {article.readTime} read</span>
                    <span className="text-gold font-semibold font-display">Read →</span>
                  </div>
                </div>
              </a>
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
