import { useState } from 'react'
import { media } from '../data/media'

const IMGS = [
  { src: media.heroExterior, label: 'Modern Loft', type: 'Residential Homes', location: 'Shropshire' },
  { src: media.gardenRoom, label: 'Garden Premium Studio', type: 'Garden Rooms', location: 'Cheshire' },
  { src: media.interiorLiving, label: 'Open Plan Living', type: 'Interiors', location: '' },
  { src: media.chaletExterior, label: 'Frame House, Garden Level', type: 'Residential Homes', location: 'Worcestershire' },
  { src: media.residenceExterior, label: 'Timber Cladding Detail', type: 'Bespoke Features', location: '' },
  { src: media.interiorKitchen, label: 'Contemporary Interior', type: 'Interiors', location: '' },
  { src: media.siteAerial, label: 'Aerial View, Plot', type: 'Installation', location: 'Herefordshire' },
  { src: media.commercial, label: 'Gothic 1.5 Storey', type: 'Residential Homes', location: 'Staffordshire' },
  { src: media.interiorBedroom, label: 'Hallway & Stair', type: 'Interiors', location: '' },
]

const filterOptions = ['All', 'Garden Rooms', 'Residential Homes', 'Interiors', 'Commercial', 'Installation', 'Bespoke Features']

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [lightbox, setLightbox] = useState<number | null>(null)

  const filtered = IMGS.filter((i) => activeFilter === 'All' || i.type === activeFilter)

  const goTo = (dir: -1 | 1) => {
    if (lightbox === null) return
    const next = (lightbox + dir + filtered.length) % filtered.length
    setLightbox(next)
  }

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="bg-light border-b border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Projects</p>
          <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl">Project gallery</h1>
          <p className="text-muted text-base mt-3 max-w-xl">Completed homes, garden rooms, interiors and commercial spaces from across the Trident Modular range.</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {filterOptions.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-semibold font-display transition-colors ${activeFilter === f ? 'bg-navy text-white' : 'bg-light text-body hover:bg-border'}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              className="group relative w-full block overflow-hidden rounded-2xl bg-light cursor-zoom-in break-inside-avoid mb-5"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-semibold font-display text-sm">{img.label}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-white/60 text-xs">{img.type}</span>
                  {img.location && <><span className="text-white/40 text-xs">·</span><span className="text-white/60 text-xs">{img.location}</span></>}
                </div>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-display font-bold text-navy text-xl">No images in this category yet.</p>
            <p className="text-muted text-sm mt-2">Try another filter or view all projects.</p>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="bg-light border-t border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-bold text-navy text-xl mb-1">Interested in any of these projects?</p>
            <p className="text-muted text-sm">Tell us about your own site and we'll discuss the right solution.</p>
          </div>
          <a href="/contact-us/" className="shrink-0 bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm">
            Start Your Project
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
          </button>
          <div className="flex flex-col items-center max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].label} className="max-h-[75vh] w-auto rounded-xl object-contain" />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold font-display">{filtered[lightbox].label}</p>
              <p className="text-white/60 text-sm mt-0.5">{filtered[lightbox].type}{filtered[lightbox].location ? ` · ${filtered[lightbox].location}` : ''}</p>
            </div>
          </div>
          <button className="absolute top-4 right-4 text-white/70 hover:text-white w-10 h-10 flex items-center justify-center" onClick={() => setLightbox(null)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
      )}
    </div>
  )
}
