import { useState } from 'react'

const SHEET_BEST_URL = 'https://api.sheetbest.com/sheets/b43edc8b-b669-4936-96b7-2de922cad6d7'

export default function RegisterForm() {
  const [form, setForm] = useState({ name:'', whatsapp:'', email:'', college:'', year:'', source:'' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const validators = {
    name: v => v.trim().length >= 3 || 'Enter your full name (min 3 characters).',
    whatsapp: v => /^[6-9]\d{9}$/.test(v.trim()) || 'Enter a valid 10-digit WhatsApp number.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) || 'Enter a valid email address.',
    college: v => v.trim().length >= 2 || 'Enter your college name.',
    year: v => v.trim().length >= 2 || 'Enter your current year and branch.',
    source: v => v.trim().length > 0 || 'Please select an option.',
  }

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }))

  const handleBlur = (key) => {
    const result = validators[key](form[key])
    setErrors(prev => ({ ...prev, [key]: result === true ? '' : result }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    let valid = true
    Object.keys(validators).forEach(key => {
      const result = validators[key](form[key])
      if (result !== true) { newErrors[key] = result; valid = false }
    })
    setErrors(newErrors)
    if (!valid) return

    setSubmitting(true)
    setSubmitError('')

    try {
      const response = await fetch(SHEET_BEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Timestamp: new Date().toISOString(),
          'Full Name': form.name,
          'WhatsApp Number': form.whatsapp,
          Email: form.email,
          'College Name': form.college,
          'Year/Branch': form.year,
          'How They Heard': form.source,
        }),
      })

      if (!response.ok) throw new Error('Submission failed')
      setSubmitted(true)
    } catch (err) {
      setSubmitError('Something went wrong. Please try again or message us on WhatsApp.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`reg-form ${submitted ? 'is-submitted' : ''}`}>
      {!submitted && (
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="f-name">Full Name</label>
              <input id="f-name" value={form.name} onChange={e => set('name', e.target.value)} onBlur={() => handleBlur('name')} placeholder="Your full name" />
              <span className="form-error">{errors.name}</span>
            </div>
            <div className="form-field">
              <label htmlFor="f-whatsapp">WhatsApp Number</label>
              <input id="f-whatsapp" value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} onBlur={() => handleBlur('whatsapp')} placeholder="10-digit mobile number" />
              <span className="form-error">{errors.whatsapp}</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label htmlFor="f-email">Email</label>
              <input id="f-email" type="email" value={form.email} onChange={e => set('email', e.target.value)} onBlur={() => handleBlur('email')} placeholder="you@example.com" />
              <span className="form-error">{errors.email}</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="f-college">College Name</label>
              <input id="f-college" value={form.college} onChange={e => set('college', e.target.value)} onBlur={() => handleBlur('college')} placeholder="Your college" />
              <span className="form-error">{errors.college}</span>
            </div>
            <div className="form-field">
              <label htmlFor="f-year">Current Year / Branch</label>
              <input id="f-year" value={form.year} onChange={e => set('year', e.target.value)} onBlur={() => handleBlur('year')} placeholder="e.g. 3rd Year, CSE" />
              <span className="form-error">{errors.year}</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field full">
              <label htmlFor="f-source">How did you hear about us?</label>
              <select id="f-source" value={form.source} onChange={e => set('source', e.target.value)} onBlur={() => handleBlur('source')}>
                <option value="">Select an option</option>
                <option value="instagram">Instagram</option>
                <option value="youtube">YouTube</option>
                <option value="linkedin">LinkedIn</option>
                <option value="college-seminar">College Seminar</option>
                <option value="friend-referral">Friend / Referral</option>
                <option value="other">Other</option>
              </select>
              <span className="form-error">{errors.source}</span>
            </div>
          </div>

          {submitError && <p className="form-error" style={{ marginBottom: '12px' }}>{submitError}</p>}

          <div className="form-foot">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Register My Seat'}
            </button>
          </div>
        </form>
      )}
      <div className={`form-success ${submitted ? 'is-visible' : ''}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5" /></svg>
        Congrats! Your spot is confirmed.
      </div>
      <a href="https://wa.me/919665658240" target="_blank" rel="noopener" className="whatsapp-link">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.4 8.4 0 0 1-4-1L3 20l1-5.5A8.38 8.38 0 0 1 12.5 3 8.4 8.4 0 0 1 21 11.5Z" /></svg>
        For any enquiry message us directly on WhatsApp
      </a>
    </div>
  )
}