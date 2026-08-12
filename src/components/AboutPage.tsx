import type { Page } from '../App'

interface AboutPageProps {
  navigate: (page: Page) => void
}

const IMGS = {
  hero: 'https://images.unsplash.com/photo-1766603636700-e9d80473f40f?w=1200&h=700&fit=crop&auto=format',
  build: 'https://images.unsplash.com/photo-1696846911635-83b97e53fb65?w=900&h=600&fit=crop&auto=format',
  interior: 'https://images.unsplash.com/photo-1597031751096-9acc728067ad?w=900&h=600&fit=crop&auto=format',
  aerial: 'https://images.unsplash.com/photo-1505060872009-ed2866c37da6?w=900&h=600&fit=crop&auto=format',
}

export default function AboutPage({ navigate }: AboutPageProps) {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative bg-navy min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMGS.hero} alt="" className="w-full h-full object-cover opacity-35" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,32,74,0.7)' }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 pb-16 pt-24">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">About Trident Modular</p>
          <h1 className="font-display font-bold text-white leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 58px)', maxWidth: '700px' }}>
            A considered approach to modern construction
          </h1>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">Who We Are</p>
            <h2 className="font-display font-bold text-navy text-4xl mb-6 leading-tight">Designing and delivering modern modular homes across the UK</h2>
            <p className="text-body text-base leading-relaxed mb-4">
              Trident Modular designs and delivers a range of modular and frame-built homes, garden rooms and commercial buildings. We offer both standard catalogue models and fully bespoke designs, with a managed service from initial concept through to completed installation.
            </p>
            <p className="text-muted text-base leading-relaxed">
              Our approach combines factory-controlled manufacture — which reduces waste, improves quality and shortens on-site programmes — with an experienced project team that works closely with each client from the first site visit to final handover.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden h-80 bg-light">
            <img src={IMGS.build} alt="Trident construction" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* What makes us different */}
      <section className="bg-light py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Our Approach</p>
            <h2 className="font-display font-bold text-navy text-4xl">What makes Trident different</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Standard and bespoke', desc: 'A broad catalogue of tested designs alongside a full bespoke design service for clients with specific requirements.' },
              { title: 'Design to installation', desc: 'One team manages architecture, engineering, manufacture and installation. No handoffs, no gaps.' },
              { title: 'Controlled manufacture', desc: 'Factory production reduces weather dependency, improves material quality and gives a more predictable build programme.' },
              { title: 'Energy performance', desc: 'High-performance insulation, air-source heat pumps and sustainable upgrades are available across our full range.' },
              { title: 'Residential and commercial', desc: 'We work on private homes, garden rooms, annexes, commercial offices, hospitality buildings and investment schemes.' },
              { title: 'Transparent process', desc: 'Clear quotations, defined specifications and a named project contact throughout your build.' },
            ].map((d) => (
              <div key={d.title} className="bg-white rounded-xl p-6 border border-border">
                <h4 className="font-display font-bold text-navy text-base mb-2">{d.title}</h4>
                <p className="text-sm text-muted leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <div className="rounded-2xl overflow-hidden h-80 bg-light">
            <img src={IMGS.interior} alt="Interior quality" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">Our Values</p>
            <h2 className="font-display font-bold text-navy text-4xl mb-6 leading-tight">Quality, clarity and long-term thinking</h2>
            <p className="text-body text-base leading-relaxed mb-4">
              We build homes that are designed to last and engineered to perform. Quality control happens in the factory, not on site — which means fewer surprises, more predictable outcomes and a better end result for our clients.
            </p>
            <p className="text-muted text-base leading-relaxed mb-6">
              We work with clients who value clear information, realistic timelines and a team that takes responsibility. We don't make promises we can't keep, and we don't overclaim on performance figures.
            </p>
            <button
              onClick={() => navigate('contact')}
              className="bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm"
            >
              Talk to our team
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-16">
        <div className="max-w-[700px] mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-white text-3xl mb-4">Ready to start a conversation?</h2>
          <p className="text-white/65 mb-8">Tell us about your project and our team will help identify the most suitable next step.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('contact')} className="bg-gold text-navy font-bold font-display px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">Start Your Project</button>
            <button onClick={() => navigate('catalogue')} className="border border-white/30 text-white font-semibold font-display px-8 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">Browse our homes</button>
          </div>
        </div>
      </section>
    </div>
  )
}
