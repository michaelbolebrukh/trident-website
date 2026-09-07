import { useState, useEffect, useRef } from 'react'

/**
 * "Request a quote" dialog for a model page.
 *
 * Name, phone and email are required; the enquiry type is optional. It posts
 * to the same /api/contact.php endpoint as the contact page, with the model
 * named in the message so the enquiry arrives with its context.
 */
/** Why the visitor is getting in touch, optional. */
export const ENQUIRY_TYPES = [
  'I am looking to buy',
  'I want a price or model details',
  'I would like a private consultation',
]

interface Props {
  open: boolean
  onClose: () => void
  modelName: string
  modelSlug: string
}

export default function QuoteDialog({ open, onClose, modelName, modelSlug }: Props) {
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState({ name: '', phone: '', email: '', enquiryType: '', company: '' })
  const nameRef = useRef<HTMLInputElement>(null)

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors(({ [key as string]: _drop, ...rest }) => rest)
  }

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    nameRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const close = () => {
    onClose()
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
    if (!form.phone.trim()) errs.phone = 'Please enter your phone number.'
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setSending(true)
    setSubmitError('')
    try {
      const res = await fetch('/api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          projectType: form.enquiryType || 'Free quote request',
          message: `Free quote request for ${modelName} (/houses/${modelSlug}/).`,
          // Sending the form is the consent; the notice under the button says so.
          consent: true,
          company: form.company,
          page: window.location.pathname,
        }),
      })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        if (body.errors) setErrors(body.errors)
        setSubmitError(body.error ?? 'Something went wrong. Please try again or call us.')
        return
      }
      setDone(true)
    } catch {
      setSubmitError('We could not reach the server. Please check your connection or call us.')
    } finally {
      setSending(false)
    }
  }

  if (!open) return null

  const field = 'w-full border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-gold'
  const label = 'block text-xs font-bold font-display text-navy uppercase tracking-widest mb-1.5'

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={close} />

      <div role="dialog" aria-modal="true" aria-labelledby="quote-title" className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7">
        <button onClick={close} aria-label="Close" className="absolute top-4 right-4 p-1.5 text-muted hover:text-navy transition-colors">
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
            <h2 id="quote-title" className="font-display font-bold text-navy text-xl mb-2">
              Thank you{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
            </h2>
            <p className="text-muted text-sm">We've received your enquiry about the {modelName} and will be in touch within one working day.</p>
          </div>
        ) : (
          <>
            <p className="text-xs font-semibold font-display uppercase tracking-[0.2em] text-gold mb-2">{modelName}</p>
            <h2 id="quote-title" className="font-display font-bold text-navy text-2xl mb-2">Get a free quote</h2>
            <p className="text-muted text-sm mb-6">Leave your details and we'll come back with a proposal for your site.</p>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <div>
                <label htmlFor="quote-name" className={label}>Name</label>
                <input id="quote-name" ref={nameRef} type="text" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} className={field} placeholder="Your name" />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="quote-phone" className={label}>Phone</label>
                <input id="quote-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set('phone', e.target.value)} className={field} placeholder="07xxx xxxxxx" />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              <div>
                <label htmlFor="quote-email" className={label}>Email</label>
                <input id="quote-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set('email', e.target.value)} className={field} placeholder="you@example.com" />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="quote-type" className={label}>
                  How can we help? <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <select id="quote-type" value={form.enquiryType} onChange={(e) => set('enquiryType', e.target.value)} className={`${field} bg-white`}>
                  <option value="">Select…</option>
                  {ENQUIRY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Honeypot: off-screen and skipped by tab order. */}
              <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                <label htmlFor="quote-company">Company (leave blank)</label>
                <input id="quote-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>

              {submitError && (
                <p role="alert" className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">{submitError}</p>
              )}

              <button type="submit" disabled={sending} className="w-full bg-gold text-navy font-bold font-display py-3.5 rounded-xl hover:bg-gold-dark transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
                {sending ? 'Sending…' : 'Get my free quote'}
              </button>
              <p className="text-xs text-muted leading-relaxed">
                By sending you agree to Trident Modular contacting you about this enquiry. See our{' '}
                <a href="/privacy-policy/" className="underline underline-offset-2 hover:text-navy">privacy policy</a>.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
