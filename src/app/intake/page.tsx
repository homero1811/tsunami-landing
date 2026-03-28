'use client'

import { useState } from 'react'
import { Zap, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const BUSINESS_TYPES = [
  { value: 'dental', label: 'Dental Practice' },
  { value: 'agency', label: 'Marketing / Creative Agency' },
  { value: 'consulting', label: 'Consulting / Professional Services' },
  { value: 'real-estate', label: 'Real Estate' },
  { value: 'healthcare', label: 'Healthcare (non-dental)' },
  { value: 'saas', label: 'SaaS / Tech' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
]

const TEAM_SIZES = [
  { value: '1', label: 'Just me' },
  { value: '2-5', label: '2–5 people' },
  { value: '6-15', label: '6–15 people' },
  { value: '16-50', label: '16–50 people' },
  { value: '50+', label: '50+ people' },
]

const REVENUE_RANGES = [
  { value: 'under-250k', label: 'Under $250K/year' },
  { value: '250k-1m', label: '$250K – $1M/year' },
  { value: '1m-5m', label: '$1M – $5M/year' },
  { value: '5m-plus', label: '$5M+/year' },
  { value: 'prefer-not', label: 'Prefer not to say' },
]

export default function IntakePage() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const getValue = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? ''

    const data = {
      contactName: getValue('contactName'),
      contactEmail: getValue('contactEmail'),
      phone: getValue('phone'),
      businessName: getValue('businessName'),
      businessType: getValue('businessType'),
      teamSize: getValue('teamSize'),
      revenueRange: getValue('revenueRange'),
      currentTools: getValue('currentTools'),
      painPoint1: getValue('painPoint1'),
      painPoint2: getValue('painPoint2'),
      painPoint3: getValue('painPoint3'),
    }

    try {
      const res = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || 'Something went wrong')
      }

      setState('success')
    } catch (err) {
      setState('error')
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong')
    }
  }

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              tsunami<span className="text-green-500">.</span>
            </span>
          </Link>
          <a
            href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-lg text-sm transition-colors"
          >
            Book a Free Call
          </a>
        </div>
      </nav>

      <div className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Zap className="w-3.5 h-3.5" />
              Client Intake Form
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Tell us about your business
            </h1>
            <p className="text-gray-400 text-lg">
              This takes 3–4 minutes. Your answers help us identify the highest-ROI automation
              opportunities before our first call — so we don&apos;t waste your time.
            </p>
          </div>

          {state === 'success' ? (
            <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">You&apos;re all set.</h2>
              <p className="text-gray-400 mb-8">
                We&apos;ve received your intake form. We&apos;ll review your answers before our call
                and come prepared with specific automation recommendations for your business.
              </p>
              <a
                href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl transition-colors"
              >
                Book Your Audit Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-6"
            >
              {/* Contact Info */}
              <div>
                <h2 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-gray-800">
                  Contact Information
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      name="contactName"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email <span className="text-green-500">*</span>
                    </label>
                    <input
                      name="contactEmail"
                      type="email"
                      required
                      placeholder="jane@example.com"
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Name <span className="text-green-500">*</span>
                    </label>
                    <input
                      name="businessName"
                      type="text"
                      required
                      placeholder="Acme Dental"
                      className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Business Profile */}
              <div>
                <h2 className="text-white font-semibold text-lg mb-4 pb-2 border-b border-gray-800">
                  Business Profile
                </h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Business Type <span className="text-green-500">*</span>
                    </label>
                    <select
                      name="businessType"
                      required
                      defaultValue=""
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="" disabled>Select...</option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Team Size <span className="text-green-500">*</span>
                    </label>
                    <select
                      name="teamSize"
                      required
                      defaultValue=""
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="" disabled>Select...</option>
                      {TEAM_SIZES.map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Annual Revenue
                    </label>
                    <select
                      name="revenueRange"
                      defaultValue=""
                      className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                    >
                      <option value="" disabled>Select...</option>
                      {REVENUE_RANGES.map((r) => (
                        <option key={r.value} value={r.value}>{r.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Current Tools */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  What tools does your team currently use?{' '}
                  <span className="text-green-500">*</span>
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  e.g. HubSpot, Dentrix, Google Sheets, Slack, Calendly, QuickBooks…
                </p>
                <textarea
                  name="currentTools"
                  required
                  rows={3}
                  placeholder="List the main tools your business runs on..."
                  className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              {/* Pain Points */}
              <div>
                <h2 className="text-white font-semibold text-lg mb-1">
                  Top 3 Pain Points
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  What are the biggest manual or repetitive tasks costing your team time or money?
                </p>
                <div className="space-y-3">
                  {[1, 2, 3].map((n) => (
                    <div key={n} className="flex items-start gap-3">
                      <span className="mt-3 w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs font-bold flex items-center justify-center shrink-0">
                        {n}
                      </span>
                      <input
                        name={`painPoint${n}`}
                        type="text"
                        required={n === 1}
                        placeholder={
                          n === 1
                            ? 'e.g. No-show patients cost us 15% of appointments'
                            : n === 2
                            ? 'e.g. Monthly reports take 4 hours to compile manually'
                            : 'e.g. (optional) New client onboarding is slow and inconsistent'
                        }
                        className="w-full bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-xl px-4 py-3 focus:outline-none focus:border-green-500 transition-colors"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Error */}
              {state === 'error' && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-sm">
                  {errorMsg || 'Something went wrong. Please try again.'}
                </div>
              )}

              <button
                type="submit"
                disabled={state === 'loading'}
                className="w-full bg-green-500 hover:bg-green-400 disabled:opacity-60 disabled:cursor-not-allowed text-black font-bold px-8 py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
              >
                {state === 'loading' ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    Submit Intake Form
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-gray-600 text-xs">
                We treat your information with care. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  )
}
