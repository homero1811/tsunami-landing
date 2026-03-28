'use client'

import { useState, useMemo } from 'react'
import { Zap, TrendingUp, Clock, DollarSign, Users, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'

const TIERS = [
  {
    name: 'Starter',
    price: 499,
    features: ['Lead Intake workflow', 'Basic Onboarding', 'Email support'],
  },
  {
    name: 'Growth',
    price: 999,
    features: ['All 4 workflows', 'Custom integrations', 'Priority support'],
  },
  {
    name: 'Agency Pro',
    price: 2499,
    features: ['All workflows', 'White-label', 'Dedicated success manager'],
  },
]

const WORKFLOW_SPLITS = [
  { label: 'Lead Intake & Qualification', pct: 30 },
  { label: 'Client Onboarding', pct: 25 },
  { label: 'Monthly Reporting', pct: 25 },
  { label: 'Task Routing', pct: 20 },
]

function fmt(n: number) {
  if (n >= 1000) return '$' + (n / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
  return '$' + Math.round(n).toLocaleString()
}

function Slider({
  label,
  hint,
  id,
  min,
  max,
  step,
  value,
  onChange,
  display,
}: {
  label: string
  hint: string
  id: string
  min: number
  max: number
  step: number
  value: number
  onChange: (v: number) => void
  display: string
}) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-baseline mb-2">
        <label htmlFor={id} className="text-sm font-semibold text-gray-200">
          {label} <span className="text-gray-500 font-normal">{hint}</span>
        </label>
        <span className="text-lg font-bold text-green-400 tabular-nums">{display}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className="w-full h-2 rounded-full appearance-none cursor-pointer accent-green-500 bg-gray-700"
      />
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{typeof min === 'number' && id.includes('Rate') ? '$' + min : min}{id.includes('Hours') ? 'h' : ''}{id.includes('Rate') ? '/hr' : ''}</span>
        <span>{typeof max === 'number' && id.includes('Rate') ? '$' + max : max}{id.includes('Hours') ? 'h' : ''}{id.includes('Rate') ? '/hr' : ''}{id.includes('Pct') ? '%' : ''}</span>
      </div>
    </div>
  )
}

export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(75)
  const [manualHours, setManualHours] = useState(6)
  const [automationPct, setAutomationPct] = useState(70)
  const [assumptionsOpen, setAssumptionsOpen] = useState(false)

  const { hoursSaved, moneySaved, annualSaved } = useMemo(() => {
    const weeklyTotal = teamSize * manualHours
    const monthlyTotal = weeklyTotal * 4.33
    const hours = monthlyTotal * (automationPct / 100)
    const money = hours * hourlyRate
    return { hoursSaved: Math.round(hours), moneySaved: money, annualSaved: money * 12 }
  }, [teamSize, hourlyRate, manualHours, automationPct])

  const bestTierIdx = useMemo(() => {
    if (moneySaved <= 0) return 0
    let best = 0
    let bestRatio = 0
    TIERS.forEach((t, i) => {
      const ratio = moneySaved / t.price
      if (ratio > bestRatio) { bestRatio = ratio; best = i }
    })
    return best
  }, [moneySaved])

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">
              tsunami<span className="text-green-500">.</span>
            </span>
          </a>
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

      {/* Hero */}
      <div className="pt-24 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-500/20 mb-4">
          <TrendingUp className="w-3.5 h-3.5" />
          Agency Growth OS — ROI Calculator
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white max-w-2xl mx-auto leading-tight">
          How much is manual ops<br />
          <span className="text-green-400">costing your agency?</span>
        </h1>
        <p className="mt-4 text-gray-400 text-lg max-w-xl mx-auto">
          Adjust the sliders to see your exact ROI from automating lead intake,
          onboarding, reporting, and task routing.
        </p>
      </div>

      {/* Calculator grid */}
      <div className="max-w-5xl mx-auto px-4 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* Input card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-1">Your Agency Profile</h2>
          <p className="text-sm text-gray-500 mb-6">Adjust sliders to match your team</p>

          <Slider
            id="teamSize"
            label="Team size"
            hint="— number of people"
            min={2} max={50} step={1}
            value={teamSize}
            onChange={setTeamSize}
            display={String(teamSize)}
          />
          <Slider
            id="hourlyRate"
            label="Avg hourly rate"
            hint="— fully loaded $/hr"
            min={25} max={200} step={5}
            value={hourlyRate}
            onChange={setHourlyRate}
            display={`$${hourlyRate}/hr`}
          />
          <Slider
            id="manualHours"
            label="Manual ops per person"
            hint="— hours/week"
            min={1} max={20} step={0.5}
            value={manualHours}
            onChange={setManualHours}
            display={`${manualHours}h/wk`}
          />
          <Slider
            id="automationPct"
            label="Automation efficiency"
            hint="— what we eliminate"
            min={30} max={95} step={5}
            value={automationPct}
            onChange={setAutomationPct}
            display={`${automationPct}%`}
          />

          {/* Assumptions accordion */}
          <button
            onClick={() => setAssumptionsOpen(!assumptionsOpen)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mt-2"
          >
            {assumptionsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            What counts as &ldquo;manual ops&rdquo;?
          </button>
          {assumptionsOpen && (
            <ul className="mt-3 text-sm text-gray-500 space-y-1 pl-2 border-l border-gray-800">
              <li>Lead intake, qualification emails, CRM entry</li>
              <li>Client onboarding setup (Slack, Asana, Drive)</li>
              <li>Monthly report compilation &amp; delivery</li>
              <li>Routing and assigning inbound tasks</li>
              <li>Status update follow-ups and recurring admin</li>
            </ul>
          )}
        </div>

        {/* Results card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-base font-bold text-white mb-1">Your ROI Breakdown</h2>
          <p className="text-sm text-gray-500 mb-5">Estimated monthly impact after automation</p>

          {/* Big numbers */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-400 text-xs mb-2">
                <Clock className="w-3.5 h-3.5" />
                Hours saved / month
              </div>
              <div className="text-3xl font-extrabold text-white tabular-nums">{hoursSaved}h</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-1.5 text-green-400/70 text-xs mb-2">
                <DollarSign className="w-3.5 h-3.5" />
                Dollars saved / month
              </div>
              <div className="text-3xl font-extrabold text-green-400 tabular-nums">{fmt(moneySaved)}</div>
            </div>
          </div>

          {/* Annual banner */}
          <div className="bg-gray-800 rounded-xl px-4 py-3 flex justify-between items-center mb-5">
            <span className="text-sm text-gray-400">Annualized value</span>
            <span className="text-xl font-extrabold text-white tabular-nums">{fmt(annualSaved)}/yr</span>
          </div>

          {/* Workflow breakdown */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Savings by workflow</p>
            {WORKFLOW_SPLITS.map((w) => (
              <div key={w.label} className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-400 w-40 shrink-0">{w.label}</span>
                <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${w.pct}%` }}
                  />
                </div>
                <span className="text-xs font-semibold text-gray-400 w-8 text-right">{w.pct}%</span>
              </div>
            ))}
          </div>

          {/* Tier payback */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Plan payback period</p>
            <div className="space-y-2">
              {TIERS.map((tier, i) => {
                const isBest = i === bestTierIdx
                const paybackMonths = moneySaved > 0 ? tier.price / moneySaved : 999
                const roi = moneySaved > 0 ? ((moneySaved - tier.price) / tier.price * 100) : 0
                const paybackText =
                  paybackMonths < 0.1 ? 'Immediate ROI' :
                  paybackMonths < 1 ? `${Math.round(paybackMonths * 30)}-day payback` :
                  `${paybackMonths.toFixed(1)}-month payback`

                return (
                  <div
                    key={tier.name}
                    className={`rounded-xl px-4 py-3 border transition-colors ${
                      isBest
                        ? 'border-green-500/40 bg-green-500/5'
                        : 'border-gray-800 bg-gray-800/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className={`text-sm font-bold ${isBest ? 'text-green-400' : 'text-white'}`}>
                          {tier.name}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">${tier.price.toLocaleString()}/mo</span>
                      </div>
                      {isBest && (
                        <span className="text-xs font-bold bg-green-500 text-black px-2 py-0.5 rounded-full">
                          BEST VALUE
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-green-400 mt-1">{paybackText}</div>
                    <div className="text-xs text-gray-500">
                      {roi > 0 ? `+${Math.round(roi)}% monthly ROI` : 'Break-even'} · saves {fmt(moneySaved)}/mo
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* CTA */}
          <a
            href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3.5 rounded-xl transition-colors text-sm"
          >
            See it live with your data
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-xs text-gray-600 text-center mt-2">
            No commitment · 30-min walkthrough · Book a demo today
          </p>
        </div>
      </div>

      <footer className="border-t border-gray-900 text-center py-6 text-xs text-gray-700">
        © 2026 Tsunami Automation · Agency Growth OS · ROI estimates based on industry averages. Actual results vary.
      </footer>
    </div>
  )
}
