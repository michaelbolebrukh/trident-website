import { useState, useRef, useCallback } from 'react'
import type { Page } from '../App'
import baseImg from '../imports/image-11.png'
import turnkeyImg from '../imports/image-10.png'

interface InstallationPageProps {
  navigate: (page: Page) => void
}

const IMGS = {
  hero:     'https://images.unsplash.com/photo-1766603636700-e9d80473f40f?w=1200&h=700&fit=crop&auto=format',
  base:     'https://images.unsplash.com/photo-1711296168555-ea2526321306?w=1200&h=800&fit=crop&auto=format',
  turnkey:  'https://images.unsplash.com/photo-1649083048337-4aeb6dda80bb?w=1200&h=800&fit=crop&auto=format',
  site:     'https://images.unsplash.com/photo-1505060872009-ed2866c37da6?w=700&h=500&fit=crop&auto=format',
  delivery: 'https://images.unsplash.com/photo-1697538022262-7eb736179973?w=700&h=500&fit=crop&auto=format',
  assembly: 'https://images.unsplash.com/photo-1696846911635-83b97e53fb65?w=700&h=500&fit=crop&auto=format',
  finishing:'https://images.unsplash.com/photo-1597031751096-9acc728067ad?w=700&h=500&fit=crop&auto=format',
  handover: 'https://images.unsplash.com/photo-1748764720733-3bb4c52ab6f9?w=700&h=500&fit=crop&auto=format',
}

const steps = [
  { n: '01', label: 'Site Preparation',    desc: 'Ground conditions assessed, foundation type agreed, and site access confirmed before manufacture begins.',      img: IMGS.site },
  { n: '02', label: 'Delivery',            desc: 'Modules are transported by specialist logistics to your site. We coordinate delivery windows and crane requirements.', img: IMGS.delivery },
  { n: '03', label: 'Structural Assembly', desc: 'Modules are craned into position and structurally connected. The building is weather-tight within days.',           img: IMGS.assembly },
  { n: '04', label: 'Services & Finishing',desc: 'Electrical, plumbing, heating and internal finishes are completed by our installers or your own contractors.',      img: IMGS.finishing },
  { n: '05', label: 'Inspection & Handover',desc: 'Final inspection, commissioning and a full handover pack. You receive keys and full documentation.',               img: IMGS.handover },
]

// Hotspots: x/y as percentage of the slider container
// side: 'base' = always visible, 'turnkey' = only visible when slider reveals that area
const hotspots = [
  { x: 18, y: 22, side: 'base',    label: 'Structural assembly',                    desc: 'Modules craned and bolted into position. Included in both Base and Turnkey.' },
  { x: 28, y: 72, side: 'base',    label: 'Foundation & groundworks',               desc: 'Included in Turnkey. With Base, you arrange groundworks independently.' },
  { x: 44, y: 38, side: 'base',    label: 'External cladding & glazing',            desc: 'All external finishes installed and weather-tight. Included in both options.' },
  { x: 62, y: 28, side: 'turnkey', label: 'Roof & insulation',                      desc: 'Fully insulated roof with MVHR ventilation duct routes installed.' },
  { x: 63, y: 60, side: 'turnkey', label: 'Bedroom fitted & finished',              desc: 'Plastered, decorated and carpeted. Wardrobes and joinery to agreed spec.' },
  { x: 80, y: 68, side: 'turnkey', label: 'Kitchen & bathroom installation',        desc: 'Kitchen and bathroom installation where included in the Turnkey specification.' },
  { x: 46, y: 24, side: 'turnkey', label: 'Electrical & plumbing services',         desc: 'Full first and second fix. All circuits certified and pressure-tested.' },
  { x: 88, y: 38, side: 'turnkey', label: 'Internal finishes throughout',           desc: 'Plastering, painting, flooring and joinery throughout all rooms.' },
]

function ComparisonSlider({ navigate }: { navigate: (p: Page) => void }) {
  const [sliderPos, setSliderPos] = useState(45)
  const [dragging, setDragging] = useState(false)
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const updatePos = useCallback((clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const pct = Math.max(8, Math.min(92, ((clientX - rect.left) / rect.width) * 100))
    setSliderPos(pct)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => { setDragging(true); updatePos(e.clientX) }
  const onMouseMove = (e: React.MouseEvent) => { if (dragging) updatePos(e.clientX) }
  const onMouseUp   = () => setDragging(false)
  const onTouchMove = (e: React.TouchEvent) => { if (dragging) updatePos(e.touches[0].clientX) }

  return (
    <div className="space-y-6">
      {/* Slider */}
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl bg-light select-none"
        style={{ height: '480px', cursor: dragging ? 'ew-resize' : 'col-resize' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={(e) => { setDragging(true); updatePos(e.touches[0].clientX) }}
        onTouchMove={onTouchMove}
        onTouchEnd={() => setDragging(false)}
      >
        {/* BASE — same room, pre-plastering: exposed timber frame, foil insulation, OSB floor */}
        <img
          src={baseImg}
          alt="Base solution — exposed timber frame, insulation fitted, pre-plastering"
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />

        {/* TURNKEY — same room fully finished: plastered, oak floor, furnished */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
        >
          <img
            src={turnkeyImg}
            alt="Turnkey solution — plastered, furnished and ready to move in"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white/80 shadow-[0_0_12px_rgba(0,0,0,0.4)]"
          style={{ left: `${sliderPos}%` }}
        />

        {/* Drag handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-11 h-11 bg-white rounded-full shadow-xl flex items-center justify-center border-2 border-border">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-navy">
              <path d="M9 18l-6-6 6-6"/>
              <path d="M15 6l6 6-6 6"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <span className="bg-navy/85 backdrop-blur-sm text-white text-[10px] font-bold font-display tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
            Base
          </span>
        </div>
        <div className="absolute top-4 right-4 pointer-events-none z-10">
          <span className="bg-gold text-navy text-[10px] font-bold font-display tracking-[0.15em] uppercase px-3 py-1.5 rounded-full">
            Turnkey
          </span>
        </div>

        {/* Drag hint — fades after first interaction */}
        {sliderPos === 45 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
            <span className="bg-black/50 backdrop-blur-sm text-white text-xs font-medium font-display px-4 py-2 rounded-full flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l-6-6 6-6"/><path d="M15 6l6 6-6 6"/></svg>
              Drag to compare
            </span>
          </div>
        )}

        {/* Hotspots */}
        {hotspots.map((h, i) => {
          const isTurnkeyVisible = h.side === 'turnkey' && h.x > sliderPos
          const isBaseVisible    = h.side === 'base'    && h.x < sliderPos
          if (!isTurnkeyVisible && !isBaseVisible) return null

          const tooltipLeft = h.x > 70
          return (
            <div
              key={i}
              className="absolute z-30"
              style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
              onMouseEnter={() => setActiveHotspot(i)}
              onMouseLeave={() => setActiveHotspot(null)}
            >
              {/* Pulse ring */}
              <div className="absolute inset-0 rounded-full animate-ping bg-gold/40 scale-150" />
              {/* Dot */}
              <div className="relative w-6 h-6 bg-gold border-2 border-white rounded-full shadow-lg flex items-center justify-center cursor-default">
                <span className="text-navy font-bold leading-none" style={{ fontSize: '11px', fontFamily: 'serif', fontStyle: 'italic' }}>i</span>
              </div>

              {/* Tooltip */}
              {activeHotspot === i && (
                <div
                  className="absolute z-40 w-52 bg-white rounded-xl shadow-2xl border border-border p-3 pointer-events-none"
                  style={{
                    bottom: '140%',
                    ...(tooltipLeft ? { right: 0 } : { left: '50%', transform: 'translateX(-50%)' }),
                  }}
                >
                  <p className="font-bold font-display text-navy text-xs mb-1">{h.label}</p>
                  <p className="text-[11px] text-muted leading-relaxed">{h.desc}</p>
                  {/* Arrow */}
                  <div
                    className="absolute top-full border-8 border-transparent border-t-white"
                    style={tooltipLeft ? { right: '12px' } : { left: '50%', transform: 'translateX(-50%)' }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Info panels below slider */}
      <div className="grid lg:grid-cols-2 gap-5">
        {/* Base panel */}
        <div className="bg-light rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-navy text-white text-[10px] font-bold font-display tracking-widest uppercase px-3 py-1 rounded-full">Base</span>
          </div>
          <h4 className="font-display font-bold text-navy text-base mb-2">Supply to specification</h4>
          <p className="text-xs text-muted leading-relaxed mb-4">
            Your building manufactured and delivered to the agreed spec. Suitable for clients managing groundworks or completion works independently.
          </p>
          <ul className="space-y-2">
            {['Building manufactured and delivered', 'Structural assembly & crane placement', 'Weather-tight external close', 'External cladding & glazing installed'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs text-body">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold mt-0.5 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Turnkey panel */}
        <div className="bg-navy rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-gold text-navy text-[10px] font-bold font-display tracking-widest uppercase px-3 py-1 rounded-full">Turnkey</span>
          </div>
          <h4 className="font-display font-bold text-white text-base mb-2">Fully managed, ready to move in</h4>
          <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
            We manage every stage, from site preparation and foundations to internal finishing, heating, kitchen and bathroom installation.
          </p>
          <ul className="space-y-2">
            {['Foundation & site works (where agreed)', 'Full structural assembly', 'Electrical installation & certification', 'Plumbing, heating & ventilation', 'Kitchen & bathroom installation', 'Final inspection & handover pack'].map((item) => (
              <li key={item} className="flex items-start gap-2 text-xs" style={{ color: 'rgba(255,255,255,0.85)' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-gold mt-0.5 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('contact')}
          className="bg-gold text-navy font-bold font-display px-7 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm"
        >
          Discuss your completion option
        </button>
        <button
          onClick={() => navigate('contact')}
          className="border border-border text-navy font-semibold font-display px-7 py-3.5 rounded-xl hover:border-navy transition-colors text-sm"
        >
          Request a specification
        </button>
      </div>
    </div>
  )
}

export default function InstallationPage({ navigate }: InstallationPageProps) {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="relative bg-navy min-h-[55vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={IMGS.hero} alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0" style={{ background: 'rgba(0,32,74,0.75)' }} />
        </div>
        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 py-20">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-5">Installation</p>
          <h1 className="font-display font-bold text-white leading-tight mb-5" style={{ fontSize: 'clamp(36px, 5vw, 58px)' }}>
            From manufacture<br />to final handover
          </h1>
          <p className="text-white/70 text-lg max-w-xl mb-8">
            Choose the level of completion that suits your project and see how Trident manages delivery, assembly and finishing.
          </p>
          <button
            onClick={() => navigate('contact')}
            className="bg-gold text-navy font-bold font-display px-7 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm"
          >
            Discuss Your Installation
          </button>
        </div>
      </section>

      {/* ─── Base vs Turnkey interactive slider ─── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-10">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Completion Options</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-3">Base or Turnkey?</h2>
            <p className="text-muted text-base max-w-xl">
              Drag the slider to compare both options. Hover the <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gold text-navy mx-0.5 translate-y-px" style={{ fontSize: '11px', fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold' }}>i</span> markers to see what's included at each stage.
            </p>
          </div>
          <ComparisonSlider navigate={navigate} />
        </div>
      </section>

      {/* ─── Assembly Process ─── */}
      <section className="bg-light py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">On Site</p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">The assembly process</h2>
          </div>

          {/* Desktop step selector */}
          <div className="hidden lg:flex gap-1 mb-8 bg-white rounded-2xl p-1 border border-border">
            {steps.map((step, i) => (
              <button
                key={step.n}
                onClick={() => setActiveStep(i)}
                className={`flex-1 px-3 py-3 rounded-xl text-xs font-bold font-display transition-colors text-center ${activeStep === i ? 'bg-navy text-white' : 'text-muted hover:text-body'}`}
              >
                <span className="block text-[10px] mb-0.5 opacity-60">{step.n}</span>
                {step.label}
              </button>
            ))}
          </div>

          {/* Active step content */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className="rounded-2xl overflow-hidden h-72 bg-border">
              <img src={steps[activeStep].img} alt={steps[activeStep].label} className="w-full h-full object-cover transition-opacity duration-300" />
            </div>
            <div>
              <p className="text-xs font-bold font-display text-gold uppercase tracking-widest mb-2">{steps[activeStep].n}</p>
              <h3 className="font-display font-bold text-navy text-2xl mb-3">{steps[activeStep].label}</h3>
              <p className="text-muted text-base leading-relaxed mb-6">{steps[activeStep].desc}</p>
              <div className="flex gap-2">
                {steps.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveStep(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${i === activeStep ? 'w-8 bg-gold' : 'w-4 bg-border hover:bg-muted'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile steps stacked */}
          <div className="lg:hidden mt-10 space-y-4">
            {steps.map((step) => (
              <div key={step.n} className="bg-white rounded-xl p-5 border border-border">
                <p className="text-xs font-bold font-display text-gold mb-1">{step.n}</p>
                <p className="font-display font-bold text-navy text-sm mb-1">{step.label}</p>
                <p className="text-xs text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Sustainability ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Environment</p>
            <h2 className="font-display font-bold text-white text-4xl lg:text-5xl">Efficient construction,<br />designed for the future</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-8">
            {[
              {
                title: 'Energy Efficiency',
                points: ['High-performance SIP wall construction as standard', 'Triple-glazed windows and doors across the range', 'MVHR ventilation reduces heat loss without draughts', 'Air-source heat pumps and solar available as upgrades', 'Low operational carbon across our standard range'],
              },
              {
                title: 'Built with care',
                points: ['Factory manufacture reduces material waste on site', 'Controlled production environment limits weather damage', 'Timber from responsibly managed sources', 'Reduced site traffic and disruption during construction', 'Designed to meet or exceed Part L requirements'],
              },
            ].map((block) => (
              <div key={block.title} className="bg-white/10 rounded-2xl p-7 border border-white/15">
                <h3 className="font-display font-bold text-white text-xl mb-4">{block.title}</h3>
                <ul className="space-y-2.5">
                  {block.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-gold mt-0.5 shrink-0"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── What we can support with ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-10">
            What we can support with
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Site assessment',     desc: 'Ground conditions, access and planning context reviewed before delivery.' },
              { label: 'Foundations',         desc: 'Ground-bearing slab, screw pile or pad options to suit your site.' },
              { label: 'Delivery logistics',  desc: 'Specialist transport coordinated to your site, including crane scheduling.' },
              { label: 'Structural assembly', desc: 'Modules craned into position and connected by our installation team.' },
              { label: 'Electrical work',     desc: 'Full first and second fix electrical installation and certification.' },
              { label: 'Plumbing',            desc: 'Hot and cold water, drainage connections and sanitary ware fitting.' },
              { label: 'Interior completion', desc: 'Internal finishes, joinery, kitchen and bathroom installation.' },
              { label: 'Planning guidance',   desc: 'Advice on planning requirements and pre-application discussions.' },
            ].map((item) => (
              <div key={item.label} className="bg-light rounded-2xl p-5 border border-border flex flex-col gap-3">
                <span className="text-gold">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </span>
                <div>
                  <p className="font-bold font-display text-navy text-sm leading-snug mb-1">{item.label}</p>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('contact')}
              className="bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm"
            >
              Discuss your installation
            </button>
            <button
              onClick={() => navigate('faq')}
              className="border border-border text-navy font-semibold font-display px-7 py-3.5 rounded-xl hover:border-navy transition-colors text-sm"
            >
              Browse installation FAQs
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}
