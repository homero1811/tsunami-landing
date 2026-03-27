'use client'

import { useState } from 'react'
import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Zap,
  TrendingUp,
  Clock,
  PhoneCall,
  ArrowRight,
  Star,
  Shield,
  Users,
  MessageSquare,
  BarChart2,
  Briefcase,
  Database,
  BookOpen,
  Link2,
  Award,
} from 'lucide-react'

// ─── Nav ───────────────────────────────────────────────────────────────────

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-black" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            tsunami<span className="text-green-500">.</span>
          </span>
        </div>
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
  )
}

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-32 pb-24 px-4 sm:px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <Zap className="w-3.5 h-3.5" />
          AI-Powered Pipeline Automation
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] mb-6">
          Automate your pipeline.{' '}
          <span className="gradient-text">Close more deals.</span>{' '}
          Stop doing it manually.
        </h1>

        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Tsunami Automation designs, builds, and maintains custom automation
          systems for modern service businesses — connecting your tools, reducing
          manual work, and giving your team time back to focus on clients and
          growth.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2 glow-green"
          >
            Book Your Free Audit Call
            <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="#how-it-works"
            className="w-full sm:w-auto text-gray-300 hover:text-white font-medium px-8 py-4 rounded-xl text-base transition-colors border border-gray-700 hover:border-gray-600"
          >
            See how it works
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            No technical skills needed
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Live in 2 weeks
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            Month-to-month. No contracts.
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pain Points ────────────────────────────────────────────────────────────

function PainPoints() {
  const pains = [
    {
      icon: '📞',
      title: 'Manually chasing leads?',
      body: "You're sending the same follow-up messages over and over. You forget some. You lose deals you should have closed.",
    },
    {
      icon: '📅',
      title: 'No-shows killing your schedule?',
      body: "You block out time, prep for the call, and they ghost. No reminder, no rebooking — just lost revenue.",
    },
    {
      icon: '🔁',
      title: 'Doing the same tasks every week?',
      body: "Lead intake, status updates, reporting — hours of work that a well-built automation could do in seconds.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sound familiar?
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Most businesses leak revenue through repetitive manual work. These
            aren&apos;t people problems — they&apos;re systems problems.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {pains.map((p) => (
            <div
              key={p.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2">
                {p.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── How It Works (Growth OS) ────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: <PhoneCall className="w-5 h-5" />,
      title: 'Discovery',
      body: 'We map your actual workflows end-to-end — where time is lost, where leads fall through, and where manual work slows you down.',
    },
    {
      number: '02',
      icon: <Zap className="w-5 h-5" />,
      title: 'Blueprint',
      body: 'We design your custom operating system — connecting your tools, defining your automations, and building the architecture before writing a single line.',
    },
    {
      number: '03',
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Implementation',
      body: 'We build and connect your systems. Automation goes live, integrations are wired, and your pipeline starts running without manual intervention.',
    },
    {
      number: '04',
      icon: <TrendingUp className="w-5 h-5" />,
      title: 'Testing & Optimization',
      body: 'We stress-test every workflow, fix edge cases, and tune performance before handing anything over. No surprises on day one.',
    },
    {
      number: '05',
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Training & Enablement',
      body: 'Your team gets full walkthroughs, documentation, and the knowledge to run the system confidently without us holding their hand.',
    },
    {
      number: '06',
      icon: <Shield className="w-5 h-5" />,
      title: 'Ongoing Support & Growth',
      body: 'We monitor, maintain, and evolve your automation as your business grows. Your system gets smarter over time — not stale.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            The Growth OS Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            How we build your system
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Six steps from first call to fully running automation — designed to
            deliver results, not just deliverables.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-green-500 flex-shrink-0">
                  {step.icon}
                </div>
                <div className="text-green-500 text-xs font-bold tracking-widest uppercase">
                  {step.number}
                </div>
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

function Services() {
  const services = [
    {
      icon: <MessageSquare className="w-5 h-5" />,
      title: 'Client Engagement',
      body: 'Automated lead capture, instant follow-up sequences, and rebooking flows that keep prospects moving without manual effort.',
      price: 'From $2,000',
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      title: 'Marketing & Sales',
      body: 'Full pipeline automation, multi-channel outreach, and revenue visibility so you always know what\'s working and what\'s not.',
      price: 'From $1,500',
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Operations & Management',
      body: 'Project tracking, team coordination, and status updates automated so your team spends time on work — not reporting on it.',
      price: 'From $1,200',
    },
    {
      icon: <Database className="w-5 h-5" />,
      title: 'Data & Analytics',
      body: 'Performance dashboards and automated reporting that give you real-time visibility without manually pulling numbers.',
      price: 'From $1,500',
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: 'Training & Support',
      body: 'Team enablement, documentation, and ongoing support so your people can run and trust the systems we build.',
      price: 'From $800',
    },
    {
      icon: <Link2 className="w-5 h-5" />,
      title: 'Custom Integration',
      body: 'Connect your existing tools — CRM, calendar, billing, communication — into one unified operating system with AI assistants.',
      price: 'From $2,000',
    },
  ]

  return (
    <section id="services" className="py-20 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Six systems. One operating layer.
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We don&apos;t automate in isolation. Every system we build connects
            to the others — so your whole business runs smoother, not just one
            department.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col"
            >
              <div className="w-9 h-9 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center justify-center text-green-500 mb-4">
                {s.icon}
              </div>
              <h3 className="text-white font-semibold text-base mb-2">
                {s.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed flex-1">
                {s.body}
              </p>
              <div className="mt-4 text-green-500 text-xs font-semibold">
                {s.price}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Implementation modules are scoped per project.{' '}
          <a href="#book-call" className="text-green-500 hover:text-green-400">
            Book a call
          </a>{' '}
          to get a custom quote.
        </p>
      </div>
    </section>
  )
}

// ─── Results ─────────────────────────────────────────────────────────────────

function Results() {
  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Real results from real clients
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            We don&apos;t talk about automation in theory. Here&apos;s what our
            clients have actually seen.
          </p>
        </div>

        {/* Dr. Ibarra case study */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <blockquote className="text-gray-200 text-lg leading-relaxed mb-6">
                &ldquo;We were losing patients to no-shows every week. Tsunami
                Automation built us a reminder and rebooking system in under 2
                weeks. We saw results in the first month.&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">
                  RI
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Dr. R. Ibarra
                  </div>
                  <div className="text-gray-500 text-xs">
                    Dental Practice Owner
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col gap-4 md:min-w-[200px]">
              <div className="bg-black border border-gray-800 rounded-xl p-5 text-center">
                <div className="text-4xl font-black text-green-400 mb-1">
                  23%
                </div>
                <div className="text-gray-400 text-sm">
                  Reduction in no-shows
                </div>
              </div>
              <div className="bg-black border border-gray-800 rounded-xl p-5 text-center">
                <div className="text-4xl font-black text-green-400 mb-1">
                  16:1
                </div>
                <div className="text-gray-400 text-sm">ROI in 90 days</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-green-400 mb-1">10+</div>
            <div className="text-gray-400 text-xs">Hours saved per month</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-green-400 mb-1">90%</div>
            <div className="text-gray-400 text-xs">Fewer manual errors</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-green-400 mb-1">50%</div>
            <div className="text-gray-400 text-xs">Better lead conversion</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
            <div className="text-3xl font-black text-green-400 mb-1">2–3×</div>
            <div className="text-gray-400 text-xs">Faster follow-up times</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Pricing ─────────────────────────────────────────────────────────────────

function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$120',
      period: '/mo',
      description: 'One workspace. Core workflows and contact management.',
      featured: false,
      features: [
        '1 workspace',
        'Core workflow & contact management',
        'Basic email support',
        'Growth OS service eligible',
      ],
    },
    {
      name: 'Growth',
      price: '$210',
      period: '/mo',
      description: 'Higher capacity, multi-channel automation, priority support.',
      featured: true,
      features: [
        'Everything in Starter',
        'Higher lead & automation capacity',
        'Multi-channel automation (email, SMS, WhatsApp)',
        'Priority incident support',
        'Growth OS service eligible',
      ],
    },
    {
      name: 'Unlimited',
      price: '$600',
      period: '/mo',
      description: 'Max capacity for multi-location or multi-brand operations.',
      featured: false,
      features: [
        'Everything in Growth',
        'Maximum pipeline & campaign capacity',
        'Multi-location or multi-brand support',
        'Highest-priority support routing',
        'Ongoing Growth OS implementation',
      ],
    },
  ]

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            No long contracts. No hidden fees. Pick the plan that fits where
            you&apos;re at.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-6 flex flex-col ${
                plan.featured
                  ? 'bg-green-500/5 border-2 border-green-500/40 glow-green'
                  : 'bg-gray-900 border border-gray-800'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <div className="text-white font-bold text-lg mb-1">
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-white font-black text-4xl">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 text-sm">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#book-call"
                className={`text-center font-semibold px-6 py-3 rounded-xl text-sm transition-colors ${
                  plan.featured
                    ? 'bg-green-500 hover:bg-green-400 text-black'
                    : 'bg-gray-800 hover:bg-gray-700 text-white'
                }`}
              >
                Book a Free Call
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 text-center max-w-xl mx-auto">
          <p className="text-gray-400 text-sm">
            <span className="text-white font-medium">$300 one-time setup fee</span> covers workspace configuration, core tool integration, and onboarding.
            Implementation modules (client engagement, marketing, operations, etc.) are scoped separately.{' '}
            <a href="#book-call" className="text-green-500 hover:text-green-400">
              Book a call
            </a>{' '}
            to get a custom quote.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Guarantee ───────────────────────────────────────────────────────────────

function Guarantee() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

          <div className="relative">
            <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center text-green-500 mx-auto mb-6">
              <Award className="w-7 h-7" />
            </div>

            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-widest uppercase">
              Our Guarantee
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 max-w-2xl mx-auto leading-snug">
              10+ hours freed per month within 60 days — or we keep working for free.
            </h2>

            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              If your automation system does not free at least 10 hours per month within 60 days of go-live, we keep working at no additional cost until it does.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto mb-10">
              <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                <div className="text-green-400 font-bold text-sm mb-1">Time Freed</div>
                <div className="text-gray-400 text-xs">10+ hours/month within 60 days of go-live</div>
              </div>
              <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                <div className="text-green-400 font-bold text-sm mb-1">Quality</div>
                <div className="text-gray-400 text-xs">90-day bug-fix coverage at no extra cost</div>
              </div>
              <div className="bg-black/40 border border-gray-800 rounded-xl p-4">
                <div className="text-green-400 font-bold text-sm mb-1">Satisfaction</div>
                <div className="text-gray-400 text-xs">Continued improvement or activation fee credit</div>
              </div>
            </div>

            <a
              href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-base transition-colors"
            >
              Claim your free audit call
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────

function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  const faqs = [
    {
      q: 'Do I need to be technical to use this?',
      a: 'Not at all. We handle everything — the tech, the setup, the integrations. You get a working automation without writing a single line of code. We just need access to your current tools (CRM, calendar, etc.) to get started.',
    },
    {
      q: 'How long does setup take?',
      a: 'Most clients are live within 14 days of signing up. More complex builds (Unlimited plan) can take up to 3 weeks. We move fast because we know every day without automation is revenue left on the table.',
    },
    {
      q: 'What kinds of businesses do you work with?',
      a: "We've built automation for dental practices, real estate agencies, consulting firms, e-commerce brands, and B2B service businesses. If you have a sales pipeline and manual follow-up work, we can automate it.",
    },
    {
      q: 'Can I cancel anytime?',
      a: "Yes. We're month-to-month on all plans. No annual contracts, no cancellation fees. We earn your business every month by delivering results.",
    },
    {
      q: 'What if I already have tools like HubSpot, Go High Level, or Calendly?',
      a: "Great — we integrate with the tools you already use. We're not replacing your stack. We're making it work harder so you don't have to.",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 bg-gray-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span className="text-white font-medium text-sm sm:text-base">
                  {faq.q}
                </span>
                {open === i ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                )}
              </button>
              {open === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-gray-800 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Lead Capture Form ───────────────────────────────────────────────────────

type FormState = 'idle' | 'loading' | 'success' | 'error'

function AuditCallForm() {
  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setErrorMsg('')

    const form = e.currentTarget
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      businessType: (
        form.elements.namedItem('businessType') as HTMLSelectElement
      ).value,
      challenge: (form.elements.namedItem('challenge') as HTMLSelectElement)
        .value,
    }

    try {
      const res = await fetch('/api/audit-call', {
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
      setErrorMsg(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <section
      id="book-call"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Book your free audit call
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            30 minutes. No sales pressure. We&apos;ll map your pipeline, find
            the gaps, and show you exactly what automation could do for your
            business.
          </p>
          <a
            href="https://platform.tsunamiautomation.com/widget/booking/roImsup61eT1dSYsebMS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-xl text-base transition-colors glow-green mb-6"
          >
            Pick a time on my calendar
            <ArrowRight className="w-4 h-4" />
          </a>
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-800" />
            <span className="text-gray-600 text-sm">or fill out the form below</span>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
        </div>

        {state === 'success' ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-10 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <h3 className="text-white font-bold text-xl mb-2">
              You&apos;re booked!
            </h3>
            <p className="text-gray-400">
              We&apos;ll reach out within 24 hours to confirm your call time.
              Check your email.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Full name <span className="text-green-500">*</span>
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className="w-full bg-black border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Email <span className="text-green-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@yourbusiness.com"
                  className="w-full bg-black border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Phone number
                </label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black border border-gray-700 text-white placeholder-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">
                  Business type <span className="text-green-500">*</span>
                </label>
                <select
                  name="businessType"
                  required
                  className="w-full bg-black border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="healthcare">Healthcare / Medical</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="consulting">Consulting / Coaching</option>
                  <option value="saas">SaaS / Tech</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="agency">Agency / Marketing</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-1.5">
                Biggest challenge right now{' '}
                <span className="text-green-500">*</span>
              </label>
              <select
                name="challenge"
                required
                className="w-full bg-black border border-gray-700 text-white rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 transition-colors appearance-none"
              >
                <option value="" disabled>
                  Select...
                </option>
                <option value="lead-followup">
                  Not following up with leads fast enough
                </option>
                <option value="no-shows">Too many no-shows / cancellations</option>
                <option value="manual-tasks">
                  Too much time on repetitive manual tasks
                </option>
                <option value="lead-gen">Not generating enough leads</option>
                <option value="reporting">
                  No visibility into pipeline performance
                </option>
                <option value="other">Something else</option>
              </select>
            </div>

            {state === 'error' && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-xl px-4 py-3">
                {errorMsg}
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
                  Book My Free Audit Call
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-center text-gray-600 text-xs">
              No spam. We&apos;ll only reach out to confirm your call.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-gray-800 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-black" />
          </div>
          <span className="text-white font-bold text-sm tracking-tight">
            tsunami<span className="text-green-500">.</span>
          </span>
        </div>
        <div className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Tsunami Automation. All rights reserved.
        </div>
        <div className="flex items-center gap-5 text-gray-500 text-sm">
          <a
            href="mailto:contact@tsunamiautomation.com"
            className="hover:text-gray-300 transition-colors"
          >
            contact@tsunamiautomation.com
          </a>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <Services />
      <Results />
      <Pricing />
      <Guarantee />
      <FAQ />
      <AuditCallForm />
      <Footer />
    </main>
  )
}
