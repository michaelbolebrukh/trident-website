import { useState, useEffect, useRef } from 'react'
import { PRIMARY_CATEGORIES } from '../data/homes'

/**
 * Lead-capture gate for the catalogue.
 *
 * Mounted once per page and opened by any element with
 * `data-catalogue-download`, so the several "Download catalogue" buttons
 * scattered across the header, footer and pages all share one dialog.
 */
export default function CatalogueDownload() {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', consent: false, company: '' })
  const nameRef = useRef<HTMLInputElement>(null)

  /** Update a field and drop its error, so a corrected input stops nagging. */
  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors(({ [key as string]: _drop, ...rest }) => rest)
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const trigger = (e.target as HTMLElement | null)?.closest('[data-catalogue-download]')
      if (!trigger) return
      e.preventDefault()
      setOpen(true)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    nameRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => {
    setOpen(false)
    // Reset only after the closing frame so the panel does not flicker.
    setTimeout(() => {
      setDone(false)
      setSubmitError('')
      setErrors({})
    }, 200)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = 'Please enter your name.'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSending(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/catalogue.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, page: window.location.pathname }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body.errors) setErrors(body.errors)
        setSubmitError(body.error ?? 'Something went wrong. Please try again.')
        return
      }
      setDone(true)
      // The token is short-lived, so start the download straight away.
      window.location.href = body.url
    } catch {
      setSubmitError('We could not reach the server. Please check your connection.')
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={close} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="catalogue-title"
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-4 right-4 p-1.5 text-muted hover:text-navy transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>

        {done ? (
          <div className="text-center py-4">
            <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-gold">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 id="catalogue-title" className="font-display font-bold text-navy text-xl mb-2">
              Your download is starting
            </h2>
            <p className="text-muted text-sm">
              If it does not begin automatically, check your browser's downloads or get in touch and
              we will email it over.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-2">
              Free download
            </p>
            <h2 id="catalogue-title" className="font-display font-bold text-navy text-2xl mb-2">
              Download our catalogue
            </h2>
            <p className="text-muted text-sm mb-6">
              The full range, specifications and pricing. Tell us where to send it.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="cat-name" className="block text-xs font-bold font-display text-navy uppercase tracking-widest mb-1.5">
                  Name
                </label>
                <input
                  id="cat-name"
                  ref={nameRef}
                  type="text"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="cat-email" className="block text-xs font-bold font-display text-navy uppercase tracking-widest mb-1.5">
                  Email
                </label>
                <input
                  id="cat-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="cat-phone" className="block text-xs font-bold font-display text-navy uppercase tracking-widest mb-1.5">
                  Phone <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  id="cat-phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold"
                  placeholder="07xxx xxxxxx"
                />
              </div>

              {/* Honeypot: off-screen and skipped by tab order. */}
              <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                <label htmlFor="cat-company">Company (leave blank)</label>
                <input
                  id="cat-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="cat-interest" className="block text-xs font-bold font-display text-navy uppercase tracking-widest mb-1.5">
                  Which homes interest you? <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <select
                  id="cat-interest"
                  value={form.interest}
                  onChange={(e) => set('interest', e.target.value)}
                  className="w-full border border-border rounded-xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-gold"
                >
                  <option value="">Select a category…</option>
                  {PRIMARY_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Commercial buildings">Commercial buildings</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set('consent', e.target.checked)}
                    className="mt-0.5 accent-gold"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    Yes, I would like Trident Modular to contact me about my enquiry.{' '}
                    <span className="text-border">(optional)</span>
                  </span>
                </label>
              </div>

              {submitError && (
                <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-gold text-navy font-bold font-display py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? 'Sending…' : 'Download catalogue'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
