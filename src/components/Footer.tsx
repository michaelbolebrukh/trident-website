import Logo from './Logo'
import { routes, categoryPath } from '../lib/routes'

const homesLinks = [
  { label: 'All Homes', href: routes.catalogue },
  { label: 'Garden Rooms', href: categoryPath('Garden Rooms') },
  { label: 'Bungalows', href: categoryPath('Bungalows') },
  { label: '1.5 Storey Houses', href: categoryPath('1.5 Storey Houses') },
  { label: '2 Storey Houses', href: categoryPath('2 Storey Houses') },
]

const servicesLinks = [
  { label: 'Bespoke Design', href: routes.bespoke },
  { label: 'Commercial Buildings', href: routes.bespoke },
  { label: 'Installation', href: routes.installation },
  { label: 'Sustainable Upgrades', href: routes.bespoke },
]

const infoLinks = [
  { label: 'About Trident', href: routes.about },
  { label: 'Project Gallery', href: routes.gallery },
  { label: 'Blog & Insights', href: routes.blog },
  { label: 'FAQ', href: routes.faq },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Brand col */}
          <div className="lg:col-span-2">
            <Logo height={32} variant="white" />
            <p className="mt-5 text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: '300px' }}>
              Trident Modular designs and delivers modern modular and frame-built homes, garden rooms and commercial spaces across the UK, from first concept to final installation.
            </p>
            <div className="mt-6 flex gap-3">
              {['facebook', 'instagram', 'linkedin', 'youtube'].map((s) => (
                <a key={s} href="#" aria-label={s} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors" style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
                    {s === 'facebook' && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>}
                    {s === 'instagram' && <><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/></>}
                    {s === 'linkedin' && <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/>}
                    {s === 'youtube' && <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>}
                  </svg>
                </a>
              ))}
            </div>
            <button data-catalogue-download className="mt-6 flex items-center gap-2 text-sm font-semibold font-display text-gold hover:text-gold-dark transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11 8 15.01z"/></svg>
              Download Our Catalogue
            </button>
          </div>

          {/* Homes */}
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Homes</p>
            <ul className="space-y-2.5">
              {homesLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-gold transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Services</p>
            <ul className="space-y-2.5">
              {servicesLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-gold transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info + Contact */}
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-widest mb-4" style={{ color: 'rgba(255,255,255,0.45)' }}>Information</p>
            <ul className="space-y-2.5 mb-6">
              {infoLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm hover:text-gold transition-colors" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-xs font-semibold font-display uppercase tracking-widest mb-3" style={{ color: 'rgba(255,255,255,0.45)' }}>Contact</p>
            <ul className="space-y-2" style={{ color: 'rgba(255,255,255,0.7)' }}>
              <li className="text-sm">+44 7443 285068</li>
              <li className="text-sm">contact@tridentmodular.com</li>
              <li className="text-sm leading-snug">Mon–Fri 8.30am–5.30pm</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>© 2026 Trident Modular Housing Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy/' },
              { label: 'Cookie Policy', href: '/cookie-policy/' },
              { label: 'Terms & Conditions', href: '/terms-and-conditions/' },
            ].map((l) => (
              <a key={l.href} href={l.href} className="text-xs hover:text-gold transition-colors" style={{ color: 'rgba(255,255,255,0.4)' }}>
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
