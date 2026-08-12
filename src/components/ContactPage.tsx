import { useState, useEffect } from 'react'

const projectTypes = ['Garden room or office', 'Annexe or guest space', 'Permanent home', 'Commercial building', 'Bespoke project', 'Other']

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', postcode: '', projectType: '',
    size: '', message: '', consent: false,
    company: '', // honeypot — hidden from users, filled only by bots
  })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // The homepage wizard hands off its answers through the query string.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const space = params.get('space')
    const size = params.get('size')
    if (!space && !size) return
    setForm((f) => ({ ...f, size: size ?? f.size, message: space ? `Interested in: ${space}` : f.message }))
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Please enter your name.'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) e.phone = 'Please enter your phone number.'
    if (!form.projectType) e.projectType = 'Please select a project type.'
    if (!form.consent) e.consent = 'Please confirm you have read the privacy policy.'
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSending(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page: window.location.pathname }),
      })
      const body = await res.json().catch(() => ({}))

      if (!res.ok) {
        // The server revalidates; surface its field errors if it sent any.
        if (body.errors) setErrors(body.errors)
        setSubmitError(body.error ?? 'Something went wrong. Please try again or call us.')
        return
      }
      setSubmitted(true)
    } catch {
      setSubmitError('We could not reach the server. Please check your connection or call us.')
    } finally {
      setSending(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-white px-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-5">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-gold"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
          </div>
          <h2 className="font-display font-bold text-navy text-3xl mb-3">Thank you, {form.name.split(' ')[0]}.</h2>
          <p className="text-muted text-base mb-6">We've received your enquiry and will be in touch within one working day.</p>
          <a href="/" className="bg-navy text-white font-semibold font-display px-7 py-3.5 rounded-xl hover:bg-navy-mid transition-colors text-sm">
            Return to homepage
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">

      {/* Hero */}
      <div className="bg-light border-b border-border py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
          <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-3">Get in Touch</p>
          <h1 className="font-display font-bold text-navy text-4xl lg:text-5xl">Start your project</h1>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-[380px_1fr] gap-14">

          {/* Left: contact info */}
          <div>
            <h2 className="font-display font-bold text-navy text-xl mb-5">Talk to our team</h2>
            <p className="text-muted text-sm leading-relaxed mb-7">
              Whether you have a site in mind, a question about a model, or simply want to explore your options, we're happy to have an initial conversation with no obligation.
            </p>

            <div className="space-y-5">
              {[
                { icon: 'phone', label: 'Telephone', value: '01234 567 890', href: 'tel:+441234567890' },
                { icon: 'email', label: 'Email', value: 'hello@tridentmodular.com', href: 'mailto:hello@tridentmodular.com' },
                { icon: 'location', label: 'Address', value: 'Trident Modular Ltd\n14 Industrial Estate\nShrewsbury, SY1 2AB', href: undefined },
                { icon: 'clock', label: 'Hours', value: 'Monday to Friday\n8.30am – 5.30pm', href: undefined },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-9 h-9 rounded-lg bg-light border border-border flex items-center justify-center shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-navy">
                      {c.icon === 'phone' && <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>}
                      {c.icon === 'email' && <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>}
                      {c.icon === 'location' && <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"/>}
                      {c.icon === 'clock' && <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>}
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold font-display text-muted uppercase tracking-widest mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm text-navy hover:text-gold transition-colors font-medium whitespace-pre-line">{c.value}</a>
                    ) : (
                      <p className="text-sm text-body whitespace-pre-line">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-5 bg-light rounded-xl border border-border">
              <p className="font-display font-bold text-navy text-sm mb-2">Download our catalogue</p>
              <p className="text-xs text-muted mb-3">Browse our full range of homes, specifications and options offline.</p>
              <button className="text-sm font-semibold font-display text-gold flex items-center gap-1.5 hover:text-gold-dark transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11zM8 15.01l1.41 1.41L11 14.84V19h2v-4.16l1.59 1.59L16 15.01 12.01 11 8 15.01z"/></svg>
                Download PDF Catalogue
              </button>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="font-display font-bold text-navy text-xl mb-6">Send us your project details</h2>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Full name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold ${errors.name ? 'border-red-400' : 'border-border'}`}
                    placeholder="Jane Smith"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Email address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold ${errors.email ? 'border-red-400' : 'border-border'}`}
                    placeholder="jane@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Phone number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold ${errors.phone ? 'border-red-400' : 'border-border'}`}
                    placeholder="07xxx xxxxxx"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Postcode or location</label>
                  <input
                    type="text"
                    value={form.postcode}
                    onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold"
                    placeholder="e.g. SY1 or Shropshire"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Project type *</label>
                  <select
                    value={form.projectType}
                    onChange={(e) => setForm({ ...form, projectType: e.target.value })}
                    className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white ${errors.projectType ? 'border-red-400' : 'border-border'}`}
                  >
                    <option value="">Select…</option>
                    {projectTypes.map((p) => <option key={p}>{p}</option>)}
                  </select>
                  {errors.projectType && <p className="text-red-500 text-xs mt-1">{errors.projectType}</p>}
                </div>
                <div>
                  <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Approximate size</label>
                  <select
                    value={form.size}
                    onChange={(e) => setForm({ ...form, size: e.target.value })}
                    className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold bg-white"
                  >
                    <option value="">Not sure yet</option>
                    {['Under 30m²', '30–60m²', '60–120m²', 'Over 120m²'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold font-display text-navy mb-1.5 uppercase tracking-wide">Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold resize-none"
                  placeholder="Tell us about your site, project goals or any specific questions you have…"
                />
              </div>

              <div>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                    className="mt-0.5 w-4 h-4 rounded border-border accent-gold shrink-0"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    I have read and agree to the <a href="#" className="text-navy underline">Privacy Policy</a>. I consent to Trident Modular contacting me regarding my enquiry.
                  </span>
                </label>
                {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent}</p>}
              </div>

              {/* Honeypot: off-screen and skipped by tab order, so only bots fill it. */}
              <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                <label htmlFor="company">Company (leave blank)</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              {submitError && (
                <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="bg-gold text-navy font-bold font-display px-8 py-4 rounded-xl hover:bg-gold-dark transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending…' : 'Send Enquiry'}
              </button>

              <p className="text-xs text-muted">
                Prefer to speak with someone?{' '}
                <a href="tel:+441234567890" className="text-navy font-medium hover:text-gold transition-colors">Call 01234 567 890</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
