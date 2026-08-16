import { useState } from "react"
import { media } from "../data/media"
import { routes, productPath } from "../lib/routes"
import { allHomes, categories, houseImage, type Home } from "../data/homes"

const IMGS = {
  hero: media.heroExterior,
  timber:
    media.residenceExterior,
  garden:
    media.gardenRoom,
  frame:
    media.chaletExterior,
  interior:
    media.interiorLiving,
  interior2:
    media.interiorKitchen,
  aerial:
    media.siteAerial,
  exterior2:
    media.commercial,
}

// Featured homes are drawn from the real catalogue, grouped by category and
// showing the three cheapest models in each so the block stays a teaser.
// Commercial order — entry-level garden rooms first, working up. Anything not
// listed (new categories added later) falls in after these.
const CATEGORY_ORDER = [
  'Garden Rooms',
  'Bungalows',
  '1.5 Storey Houses',
  '2 Storey Houses',
  'Log Houses',
  'Tiny Homes & Pod Homes',
]

const orderedCategories = [
  ...CATEGORY_ORDER.filter((c) => categories.includes(c)),
  ...categories.filter((c) => !CATEGORY_ORDER.includes(c)),
]

const featuredByCategory = orderedCategories.reduce<Record<string, Home[]>>((acc, cat) => {
  const models = allHomes.filter((h) => h.categories.includes(cat)).slice(0, 3)
  if (models.length) acc[cat] = models
  return acc
}, {})

type HomeTab = string

const spaceTypes = [
  "Garden room or office",
  "Annexe or guest space",
  "Permanent home",
  "Commercial building",
  "Bespoke project",
]
const sizeOptions = [
  "Under 30m²",
  "30–60m²",
  "60–120m²",
  "Over 120m²",
  "Not sure yet",
]

const galleryImgs = [
  { img: IMGS.hero, label: "Modern Modular", type: "Residential" },
  { img: IMGS.interior, label: "Open Plan Living", type: "Interior" },
  { img: IMGS.timber, label: "Timber Cladding", type: "Garden Room" },
  { img: IMGS.aerial, label: "Aerial View", type: "Residential" },
  { img: IMGS.interior2, label: "Contemporary Finish", type: "Interior" },
  { img: IMGS.frame, label: "Frame Build", type: "Residential" },
]


export default function HomePage() {
  const [activeTab, setActiveTab] = useState<HomeTab>(Object.keys(featuredByCategory)[0] ?? "")
  const [spaceType, setSpaceType] = useState("")
  const [sizeType, setSizeType] = useState("")
  const [wizardStep, setWizardStep] = useState(1)
  const [form, setForm] = useState({
    projectType: "",
    name: "",
    email: "",
    phone: "",
    message: "",
  })

  return (
    <div className="overflow-x-hidden">
      {/* ─── SECTION 1: HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center bg-navy overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={IMGS.hero}
            alt="Modern modular home"
            className="w-full h-full object-cover opacity-40"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,32,74,0.52) 25%, rgba(0,32,74,0.6) 100%)",
            }}
          />
        </div>

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-8 w-full py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-5">
              Modular and Frame-Built Homes
            </p>
            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: "clamp(38px, 5vw, 62px)" }}
            >
              Modern modular homes, built around your vision.
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-lg">
              Energy-efficient homes, garden rooms and commercial spaces
              designed around your site, goals and budget — from first concept
              to final installation.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/catalogue/"
                className="bg-gold text-navy font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm">
                Explore Our Homes
              </a>
              <a href="/contact/"
                className="border border-white/30 text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-white/10 transition-colors text-sm">
                Start Your Project
              </a>
            </div>
          </div>

          {/* Right: Enquiry card */}
          <div className="bg-white rounded-2xl p-7 shadow-2xl">
            <h3 className="font-display font-bold text-navy text-lg mb-1">
              Tell us about your project
            </h3>
            <p className="text-sm text-muted mb-5">
              We'll help you identify the best next step.
            </p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold font-display text-navy mb-1.5 uppercase tracking-wide">
                  Project type
                </label>
                <select
                  value={form.projectType}
                  onChange={(e) =>
                    setForm({ ...form, projectType: e.target.value })
                  }
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm text-body focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white"
                >
                  <option value="">Select a type…</option>
                  {spaceTypes.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold font-display text-navy mb-1.5 uppercase tracking-wide">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold font-display text-navy mb-1.5 uppercase tracking-wide">
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="07xxx xxxxxx"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold font-display text-navy mb-1.5 uppercase tracking-wide">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold font-display text-navy mb-1.5 uppercase tracking-wide">
                  Brief message{" "}
                  <span className="text-muted normal-case font-normal">
                    (optional)
                  </span>
                </label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your site or project idea…"
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
                />
              </div>
              <a href="/contact/"
                className="w-full bg-navy text-white font-semibold font-display py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm">
                Request a Consultation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: TRUST STRIP ─── */}
      <section className="bg-white border-b border-border">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "◈",
                label: "Bespoke and standard designs",
                desc: "Catalogue models or fully bespoke",
              },
              {
                icon: "◎",
                label: "Energy-efficient construction",
                desc: "High-performance insulation as standard",
              },
              {
                icon: "◉",
                label: "UK-wide project support",
                desc: "Site visits and delivery nationwide",
              },
              {
                icon: "◆",
                label: "Base and turnkey completion",
                desc: "Choose your level of involvement",
              },
            ].map((t) => (
              <div key={t.label} className="flex gap-4 items-start">
                <span className="text-gold text-xl mt-0.5 shrink-0">
                  {t.icon}
                </span>
                <div>
                  <p className="font-semibold font-display text-navy text-sm mb-0.5">
                    {t.label}
                  </p>
                  <p className="text-xs text-muted">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: MAIN SOLUTIONS ─── */}
      <section className="bg-light py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
              Our Buildings
            </p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
              Find the right building
              <br />
              for your project
            </h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                title: "Modular Homes",
                desc: "Factory-built homes designed for efficient delivery and installation. Available as bungalows, 1.5 and 2 storey designs.",
                img: IMGS.timber,
                href: routes.catalogue,
              },
              {
                title: "Frame Houses",
                desc: "Flexible, spacious homes assembled on site and tailored to your plot — with a wide range of finishes and layouts.",
                img: IMGS.frame,
                href: routes.catalogue,
              },
              {
                title: "Garden Rooms & Workspaces",
                desc: "Year-round spaces for work, leisure, guests and independent living. From compact studios to fully fitted annexes.",
                img: IMGS.garden,
                href: routes.catalogue,
              },
            ].map((c) => (
              <a href={c.href}
                key={c.title}
                className="group relative overflow-hidden rounded-2xl bg-white card-shadow card-shadow-hover text-left transition-all duration-300 hover:-translate-y-1"
              >
                <div className="h-56 overflow-hidden bg-light">
                  <img
                    src={c.img}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display font-bold text-navy text-xl mb-2">
                    {c.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {c.desc}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold font-display text-gold">
                    Explore range
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a href="/bespoke/"
              className="inline-flex items-center gap-2 text-sm font-semibold font-display text-navy border border-border rounded-xl px-6 py-3 hover:border-navy transition-colors">
              Commercial Buildings & Bespoke Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: FEATURED HOMES ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
                Explore the Collection
              </p>
              <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
                Featured homes
              </h2>
            </div>
            <a href="/catalogue/"
              className="shrink-0 text-sm font-semibold font-display text-navy border border-border rounded-xl px-5 py-2.5 hover:border-navy transition-colors">
              View all homes →
            </a>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
            {Object.keys(featuredByCategory).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-2 rounded-full text-sm font-semibold font-display transition-colors ${
                  activeTab === tab
                    ? "bg-navy text-white"
                    : "bg-light text-body hover:bg-border"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(featuredByCategory[activeTab] ?? []).map((home) => (
              <div
                key={home.name}
                className="group bg-white rounded-2xl overflow-hidden card-shadow card-shadow-hover transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image */}
                <div className="h-52 overflow-hidden bg-light relative shrink-0">
                  <img
                    src={home.thumb ? houseImage(home.thumb) : undefined}
                    alt={home.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-navy text-white text-[10px] font-bold font-display px-3 py-1 rounded uppercase tracking-widest">
                      {activeTab}
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-1">
                  {/* Name + size range */}
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <h4 className="font-display font-bold text-navy text-base leading-snug">
                      {home.name}
                    </h4>
                    <span className="text-muted text-xs font-medium shrink-0">
                      {home.area} m²
                    </span>
                  </div>
                  {/* Description */}
                  <p className="text-xs text-muted leading-snug mb-2">
                    {home.desc}
                  </p>
                  {/* Tags */}
                  <p className="text-xs text-muted mb-4">
                    {`${home.floors} storey · ${home.dimensions} m · ${home.areaFt} ft²`}
                  </p>

                  {/* Price */}
                  <div className="rounded-xl overflow-hidden border border-border mt-auto">
                    <div className="flex items-center justify-between px-4 py-3 bg-navy">
                      <span className="text-[10px] font-bold font-display text-white tracking-[0.15em] uppercase">
                        From
                      </span>
                      <span className="text-sm font-bold font-display text-white">
                        £{home.price.toLocaleString("en-GB")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted">
                      {home.bedrooms ? `${home.bedrooms} bed` : `${home.area} m²`}
                    </span>
                    <a href={productPath(home.slug)}
                      className="text-xs font-bold font-display text-navy border border-border rounded-lg px-4 py-1.5 hover:border-navy hover:bg-light transition-colors">
                      Open
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: BUILT AROUND YOUR VISION ─── */}
      <section className="bg-light py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden h-96 lg:h-[480px] bg-navy">
                <img
                  src={IMGS.frame}
                  alt="Completed bespoke home"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-6 -right-4 lg:-right-8 w-44 h-44 rounded-2xl overflow-hidden shadow-xl border-4 border-white hidden sm:block">
                <img
                  src={IMGS.interior2}
                  alt="Interior detail"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Text */}
            <div className="lg:pl-8">
              <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">
                Designed for you
              </p>
              <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl mb-6 leading-tight">
                Built around
                <br />
                your vision
              </h2>
              <p className="text-body text-base leading-relaxed mb-6">
                Every site and every project is different. Whether you want to
                choose from an existing model, adapt a layout to your plot, or
                commission something entirely bespoke, Trident can help.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Select an existing catalogue design",
                  "Adapt a standard layout to your site",
                  "Commission a fully bespoke home",
                  "Choose finishes and sustainable upgrades",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm text-body"
                  >
                    <span className="text-gold mt-0.5 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <a href="/bespoke/"
                className="bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm">
                Explore Bespoke Design
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: WHY TRIDENT ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
              Why Trident
            </p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
              What sets us apart
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13 2.05v2.02c3.95.49 7 3.85 7 7.93 0 3.21-1.81 6-4.72 7.72L13 17v5h5l-1.22-1.22C19.91 19.07 22 15.76 22 12c0-5.18-3.95-9.45-9-9.95zM11 2.05C5.95 2.55 2 6.82 2 12c0 3.76 2.09 7.07 5.22 8.78L6 22h5V2.05z" />
                  </svg>
                ),
                title: "Fast, controlled construction",
                desc: "Factory manufacture reduces on-site time and minimises weather delays, giving you a predictable programme.",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
                  </svg>
                ),
                title: "Tailored to your site and goals",
                desc: "We assess your plot, planning context and budget before recommending the most suitable solution.",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c7 0 9-8 9-8s.33 3.37-1.83 5.17c.85.12 2.83.05 5.83-3.17L17 8z" />
                  </svg>
                ),
                title: "Energy-efficient by design",
                desc: "High-performance insulation, air-source heat pumps, solar and green roofs are available across the range.",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                ),
                title: "One team from concept to completion",
                desc: "Architecture, engineering, manufacture, delivery and installation managed under one roof.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl bg-light border border-border"
              >
                <div className="text-gold mb-4">{b.icon}</div>
                <h3 className="font-display font-bold text-navy text-base mb-2">
                  {b.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 7: FIND YOUR SPACE ─── */}
      <section className="bg-navy py-20 lg:py-28">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">
            Start Your Project
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl mb-4">
            {wizardStep === 1
              ? "What kind of space are you planning?"
              : "What size are you considering?"}
          </h2>
          <p className="text-white/60 text-base mb-10">
            {wizardStep === 1
              ? "Tell us what you have in mind and we'll point you in the right direction."
              : "This helps us suggest the most suitable models and discuss realistic budgets."}
          </p>

          {/* Progress */}
          <div className="flex items-center justify-center gap-2 mb-10">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all duration-300 ${
                  s === wizardStep
                    ? "w-10 bg-gold"
                    : s < wizardStep
                      ? "w-6 bg-gold/50"
                      : "w-6 bg-white/20"
                }`}
              />
            ))}
          </div>

          {wizardStep === 1 && (
            <div className="grid sm:grid-cols-2 gap-3 text-left mb-8">
              {spaceTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSpaceType(type)}
                  className={`p-4 rounded-xl border text-sm font-medium font-display text-left transition-all ${
                    spaceType === type
                      ? "bg-gold text-navy border-gold"
                      : "border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          )}

          {wizardStep === 2 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-left mb-8">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSizeType(size)}
                  className={`p-4 rounded-xl border text-sm font-medium font-display text-center transition-all ${
                    sizeType === size
                      ? "bg-gold text-navy border-gold"
                      : "border-white/20 text-white hover:border-white/50 hover:bg-white/5"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {wizardStep === 2 && (
              <button
                onClick={() => setWizardStep(1)}
                className="border border-white/30 text-white font-semibold font-display px-6 py-3 rounded-xl hover:bg-white/10 transition-colors text-sm"
              >
                ← Back
              </button>
            )}
            <button
              onClick={() => {
                if (wizardStep === 1 && spaceType) setWizardStep(2)
                else if (wizardStep === 2) {
                  const params = new URLSearchParams({ space: spaceType, size: sizeType })
                  window.location.href = `${routes.contact}?${params}`
                }
              }}
              className="bg-gold text-navy font-bold font-display px-8 py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm disabled:opacity-40"
              disabled={wizardStep === 1 ? !spaceType : !sizeType}
            >
              {wizardStep === 1 ? "Continue" : "Continue My Project Brief"}
            </button>
          </div>
        </div>
      </section>

      {/* ─── SECTION 8: HOW IT WORKS ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
              The Process
            </p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
              From first conversation
              <br />
              to completed building
            </h2>
          </div>
          <div className="relative">
            {/* Connecting line */}
            <div
              className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-border"
              style={{ left: "10%", right: "10%" }}
            />
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8">
              {[
                {
                  n: "01",
                  label: "Consultation",
                  desc: "We discuss your site, goals and budget to understand what's right for your project.",
                },
                {
                  n: "02",
                  label: "Site & Design Review",
                  desc: "We review your plot, planning context and propose the most suitable design direction.",
                },
                {
                  n: "03",
                  label: "Specification & Manufacture",
                  desc: "Your building is specified and manufactured under controlled factory conditions.",
                },
                {
                  n: "04",
                  label: "Delivery & Assembly",
                  desc: "Modules are delivered and assembled on site efficiently and with minimal disruption.",
                },
                {
                  n: "05",
                  label: "Completion & Handover",
                  desc: "Final finishing, inspection and a full handover so you can move straight in.",
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-navy flex items-center justify-center mb-5 relative z-10">
                    <span className="font-display font-bold text-gold text-lg">
                      {step.n}
                    </span>
                  </div>
                  <h4 className="font-display font-bold text-navy text-sm mb-2">
                    {step.label}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-12">
            <a href="/installation/"
              className="inline-flex items-center gap-2 text-sm font-semibold font-display text-navy border border-border rounded-xl px-6 py-3 hover:border-navy transition-colors">
              See our installation process
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 9: BASE OR TURNKEY ─── */}
      <section className="bg-light py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
              Completion Options
            </p>
            <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
              Choose your level of completion
            </h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              {
                tag: "Base",
                tagColor: "bg-navy text-white",
                title: "Building supply to specification",
                desc: "Your selected building supplied and installed to the agreed specification. Suitable for clients who wish to manage site preparation, groundworks or internal completion works themselves, or who have their own contractors.",
                features: [
                  "Building manufactured to spec",
                  "Delivery and crane placement",
                  "Structural assembly",
                  "Weather-tight handover",
                ],
              },
              {
                tag: "Turnkey",
                tagColor: "bg-gold text-navy",
                title: "Fully managed, ready to move in",
                desc: "A complete managed solution covering everything from site preparation and foundations through to internal finishing, heating, kitchen and bathroom installation, and final handover.",
                features: [
                  "Foundation and groundworks",
                  "Full structural assembly",
                  "Electrical and plumbing",
                  "Internal finishes and fixtures",
                ],
              },
            ].map((opt) => (
              <div
                key={opt.tag}
                className="bg-white rounded-2xl p-8 card-shadow"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span
                    className={`text-xs font-bold font-display px-3 py-1 rounded-full ${opt.tagColor}`}
                  >
                    {opt.tag}
                  </span>
                </div>
                <h3 className="font-display font-bold text-navy text-xl mb-3">
                  {opt.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-5">
                  {opt.desc}
                </p>
                <ul className="space-y-2">
                  {opt.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2.5 text-sm text-body"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-gold shrink-0"
                      >
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/installation/"
              className="inline-flex items-center gap-2 text-sm font-semibold font-display text-navy border border-border rounded-xl px-6 py-3 hover:border-navy transition-colors">
              Compare completion options in detail
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── SECTION 10: GALLERY ─── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">
                Projects
              </p>
              <h2 className="font-display font-bold text-navy text-4xl lg:text-5xl">
                Recent work
              </h2>
            </div>
            <a href="/gallery/"
              className="shrink-0 text-sm font-semibold font-display text-navy border border-border rounded-xl px-5 py-2.5 hover:border-navy transition-colors">
              View project gallery →
            </a>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImgs.map((g, i) => (
              <a href="/gallery/"
                key={i}
                className={`group relative overflow-hidden rounded-xl bg-light ${
                  i === 0 ? "col-span-2 lg:col-span-1 row-span-2" : ""
                }`}
                style={{ height: i === 0 ? "460px" : "218px" }}>
                <img
                  src={g.img}
                  alt={g.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-white font-semibold font-display text-sm">
                    {g.label}
                  </p>
                  <p className="text-white/70 text-xs">{g.type}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 11: FINAL CTA ─── */}
      <section className="relative bg-navy py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src={IMGS.aerial}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        </div>
        <div className="relative max-w-[700px] mx-auto px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-4">
            Get Started
          </p>
          <h2 className="font-display font-bold text-white text-4xl lg:text-5xl mb-5">
            Have a site or project in mind?
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Tell us about your project and we'll guide you through the next steps.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact/"
              className="bg-gold text-navy font-bold font-display px-8 py-4 rounded-xl hover:bg-gold-dark transition-colors text-sm">
              Start Your Project
            </a>
            <button className="border border-white/30 text-white font-semibold font-display px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-sm">
              Download Catalogue
            </button>
          </div>
          <a href="/faq/"
            className="mt-6 text-sm text-white/50 hover:text-white/80 transition-colors underline underline-offset-2">
            Have questions? Browse our FAQ
          </a>
        </div>
      </section>
    </div>
  )
}
