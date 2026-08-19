import { useState, useEffect, useRef } from 'react'
import { media } from '../data/media'
import Logo from './Logo'
import { routes } from '../lib/routes'

interface HeaderProps {
  /** Pathname of the page being rendered, used for the active nav state. */
  currentPath: string
}

const homesMegaMenu = [
  { label: 'View All Homes', href: routes.catalogue },
  { label: 'Garden Rooms', href: routes.catalogue },
  { label: 'Bungalows', href: routes.catalogue },
  { label: '1.5 Storey Houses', href: routes.catalogue },
  { label: '2 Storey Houses', href: routes.catalogue },
]

const bespokeDropdown = [
  { label: 'Bespoke Home Design', href: `${routes.bespoke}#design` },
  { label: 'The Bespoke Process', href: `${routes.bespoke}#process` },
  { label: 'Commercial & Workspaces', href: `${routes.bespoke}#support` },
  { label: 'Sustainable Upgrades', href: `${routes.bespoke}#sustainable` },
]

const navLinks = [
  { label: 'Homes', href: routes.catalogue, hasMega: true },
  { label: 'Bespoke & Commercial', href: routes.bespoke, hasDropdown: true },
  { label: 'Installation', href: routes.installation },
  { label: 'Gallery', href: routes.gallery },
  { label: 'About', href: routes.about },
  { label: 'Blog', href: routes.blog },
  { label: 'FAQ', href: routes.faq },
]

const mobileLinks = [
  { label: 'Installation', href: routes.installation },
  { label: 'Gallery', href: routes.gallery },
  { label: 'About', href: routes.about },
  { label: 'Blog', href: routes.blog },
  { label: 'FAQ', href: routes.faq },
  { label: 'Contact', href: routes.contact },
]

const megaCategories = [
  { label: 'Garden Rooms', img: media.gardenRoom, desc: 'Year-round spaces from 4.4 m²' },
  { label: 'Modular Homes', img: media.familyHome, desc: 'Factory-built, site-ready homes' },
  { label: 'Frame Houses', img: media.chaletExterior, desc: 'Flexible homes assembled on site' },
]

export default function Header({ currentPath }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [megaOpen, setMegaOpen] = useState(false)
  const [bespokeOpen, setBespokeOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileHomesOpen, setMobileHomesOpen] = useState(false)
  const [mobileBespokeOpen, setMobileBespokeOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // The mega panel renders at the foot of the header, below the nav's own box,
  // so travelling to it briefly leaves nav. Close on a delay and cancel that
  // as soon as the pointer lands on the panel, otherwise the menu vanishes
  // before it can be clicked.
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = setTimeout(() => {
      setMegaOpen(false)
      setBespokeOpen(false)
    }, 200)
  }

  useEffect(() => cancelClose, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock background scrolling while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setMobileOpen(false)
      setMegaOpen(false)
      setBespokeOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const isActive = (href: string) => currentPath === href

  return (
    <>
      {/* Utility bar */}
      <div className="hidden lg:flex items-center justify-end bg-navy text-white text-xs font-body px-8 py-1.5 gap-6">
        <a href="tel:+447443285068" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
          +44 7443 285068
        </a>
        <a href="mailto:contact@tridentmodular.com" className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
          contact@tridentmodular.com
        </a>
        <button className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11 8 15.01z"/></svg>
          Download Catalogue
        </button>
      </div>

      <header
        ref={headerRef}
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'border-b border-border'}`}
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 flex items-center h-16 gap-8">
          {/* Logo */}
          <a href={routes.home} className="shrink-0 focus:outline-none" aria-label="Trident Modular, home">
            <Logo height={34} />
          </a>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1 flex-1 justify-center"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            {navLinks.map((link) => (
              <div key={link.label} className="relative">
                <a
                  href={link.href}
                  onMouseEnter={() => {
                    cancelClose()
                    setMegaOpen(link.hasMega ?? false)
                    setBespokeOpen(link.hasDropdown ?? false)
                  }}
                  onFocus={() => {
                    cancelClose()
                    setMegaOpen(link.hasMega ?? false)
                    setBespokeOpen(link.hasDropdown ?? false)
                  }}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium font-display rounded-lg transition-colors ${isActive(link.href) ? 'text-navy' : 'text-body hover:text-navy'}`}
                >
                  {link.label}
                  {(link.hasMega || link.hasDropdown) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-50 mt-0.5"><path d="M7 10l5 5 5-5z"/></svg>
                  )}
                </a>

                {/* Bespoke dropdown */}
                {link.hasDropdown && bespokeOpen && (
                  <div
                    className="absolute top-full left-0 pt-1 bg-white border border-border rounded-xl shadow-lg py-2 min-w-48 z-50"
                    onMouseEnter={cancelClose}
                    onMouseLeave={scheduleClose}
                  >
                    {bespokeDropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block w-full text-left px-4 py-2 text-sm text-body hover:text-navy hover:bg-light transition-colors"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Homes mega menu */}
            {megaOpen && (
              <div className="absolute top-full left-0 right-0 bg-white border-t border-border shadow-lg z-40 mt-0"
                style={{ marginTop: 0 }}
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
              >
                <div className="max-w-[1280px] mx-auto px-8 py-8 grid grid-cols-4 gap-8">
                  <div className="col-span-1">
                    <p className="text-xs font-semibold font-display text-muted uppercase tracking-widest mb-4">Homes</p>
                    <div className="space-y-1">
                      {homesMegaMenu.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="block w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-body hover:text-navy hover:bg-light transition-colors"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-3 grid grid-cols-3 gap-4">
                    {megaCategories.map((cat) => (
                      <a
                        key={cat.label}
                        href={routes.catalogue}
                        className="relative overflow-hidden rounded-xl group cursor-pointer text-left"
                      >
                        <div className="bg-light h-36 overflow-hidden rounded-xl">
                          <img
                            src={cat.img}
                            alt={cat.label}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <p className="mt-2 text-sm font-semibold font-display text-navy">{cat.label}</p>
                        <p className="text-xs text-muted mt-0.5">{cat.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3 ml-auto">
            <a
              href={routes.contact}
              className="text-sm text-muted hover:text-navy transition-colors font-medium"
            >
              Contact
            </a>
            <a
              href={routes.contact}
              className="bg-gold text-navy text-sm font-semibold font-display px-5 py-2.5 rounded-xl hover:bg-gold-dark transition-colors"
            >
              Get a Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden ml-auto flex items-center gap-3">
            <a
              href={routes.contact}
              className="bg-gold text-navy text-xs font-semibold font-display px-4 py-2 rounded-lg"
            >
              Get a Quote
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 text-navy"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] flex">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="relative ml-auto w-80 max-w-full bg-white h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <Logo height={28} />
              <button onClick={() => setMobileOpen(false)} className="p-2 text-navy" aria-label="Close menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {/* Homes expand */}
              <div>
                <button
                  onClick={() => setMobileHomesOpen(!mobileHomesOpen)}
                  aria-expanded={mobileHomesOpen}
                  className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-semibold font-display text-navy hover:bg-light transition-colors"
                >
                  Homes
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`transition-transform ${mobileHomesOpen ? 'rotate-180' : ''}`}><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                {mobileHomesOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {homesMegaMenu.map((item) => (
                      <a key={item.label} href={item.href} className="block w-full text-left px-3 py-2 rounded-lg text-sm text-body hover:text-navy hover:bg-light transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {/* Bespoke expand */}
              <div>
                <button
                  onClick={() => setMobileBespokeOpen(!mobileBespokeOpen)}
                  aria-expanded={mobileBespokeOpen}
                  className="flex items-center justify-between w-full px-3 py-3 rounded-xl text-sm font-semibold font-display text-navy hover:bg-light transition-colors"
                >
                  Bespoke & Commercial
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`transition-transform ${mobileBespokeOpen ? 'rotate-180' : ''}`}><path d="M7 10l5 5 5-5z"/></svg>
                </button>
                {mobileBespokeOpen && (
                  <div className="pl-4 space-y-1 mt-1">
                    {bespokeDropdown.map((item) => (
                      <a key={item.label} href={item.href} className="block w-full text-left px-3 py-2 rounded-lg text-sm text-body hover:text-navy hover:bg-light transition-colors">
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              {mobileLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                  className="block w-full text-left px-3 py-3 rounded-xl text-sm font-semibold font-display text-navy hover:bg-light transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="px-4 py-4 border-t border-border">
              <a
                href={routes.contact}
                className="block text-center w-full bg-gold text-navy text-sm font-semibold font-display py-3.5 rounded-xl hover:bg-gold-dark transition-colors"
              >
                Get a Quote
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
