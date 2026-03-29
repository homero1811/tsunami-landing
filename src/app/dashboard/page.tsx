import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import type { ClientStats } from '../api/client-stats/route'
import {
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart2,
  Info,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Client Dashboard — Tsunami Automation',
  description: 'Your automation ROI dashboard',
  robots: 'noindex',
}

// ─── Data fetching ───────────────────────────────────────────────────────────

async function getStats(token: string): Promise<ClientStats | null> {
  const base =
    process.env.NEXT_PUBLIC_APP_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

  try {
    const res = await fetch(`${base}/api/client-stats?token=${encodeURIComponent(token)}`, {
      cache: 'no-store',
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav({ clientName }: { clientName: string }) {
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
        <span className="text-gray-400 text-sm">{clientName}</span>
      </div>
    </nav>
  )
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  accent?: boolean
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-3">
      <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
        {icon}
        {label}
      </div>
      <div className={`text-3xl font-bold ${accent ? 'text-green-400' : 'text-white'}`}>
        {value}
      </div>
      {sub && <div className="text-gray-500 text-sm">{sub}</div>}
    </div>
  )
}

function TrendBadge({ pct }: { pct: number }) {
  const up = pct >= 0
  return (
    <span
      className={`inline-flex items-center gap-1 text-sm font-semibold px-2 py-0.5 rounded-full ${
        up ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
      }`}
    >
      {up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
      {up ? '+' : ''}
      {pct}%
    </span>
  )
}

function AlertItem({
  message,
  severity,
}: {
  message: string
  severity: 'info' | 'warning' | 'error'
}) {
  const color =
    severity === 'error'
      ? 'text-red-400 border-red-800'
      : severity === 'warning'
        ? 'text-yellow-400 border-yellow-800'
        : 'text-blue-400 border-blue-800'
  const Icon =
    severity === 'error'
      ? AlertTriangle
      : severity === 'warning'
        ? AlertTriangle
        : Info
  return (
    <div className={`flex items-start gap-2 border rounded-lg px-4 py-3 bg-gray-900/50 ${color}`}>
      <Icon className="w-4 h-4 mt-0.5 shrink-0" />
      <span className="text-sm">{message}</span>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ client?: string; token?: string }>
}) {
  const { token } = await searchParams

  if (!token) {
    return <AccessDenied />
  }

  const stats = await getStats(token)

  if (!stats) {
    return <AccessDenied />
  }

  const monthLabel = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' })
  const lastMonthLabel = new Date(
    new Date().getFullYear(),
    new Date().getMonth() - 1,
    1,
  ).toLocaleString('en-US', { month: 'long' })

  const n8nReady = stats.workflowsActive > 0 || stats.executionsThisMonth > 0

  return (
    <div className="min-h-screen bg-[#050505]">
      <Nav clientName={stats.clientName} />

      <main className="pt-24 pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-green-500 text-sm font-semibold tracking-wide uppercase mb-1">
            Automation Dashboard
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{stats.clientName}</h1>
          <p className="text-gray-400">{monthLabel} — live ROI snapshot</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard
            icon={<Activity className="w-4 h-4" />}
            label="Workflows Active"
            value={n8nReady ? stats.workflowsActive.toString() : '—'}
            sub={n8nReady ? 'Running automations' : 'Connecting to n8n…'}
            accent={n8nReady}
          />
          <StatCard
            icon={<Clock className="w-4 h-4" />}
            label="Hours Saved This Month"
            value={n8nReady ? `${stats.hoursSavedThisMonth}h` : '—'}
            sub={
              n8nReady
                ? `${stats.executionsThisMonth} successful executions`
                : 'Data loading…'
            }
            accent={n8nReady}
          />
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
              <BarChart2 className="w-4 h-4" />
              vs {lastMonthLabel}
            </div>
            <div className="flex items-end gap-3">
              <div className={`text-3xl font-bold ${n8nReady ? 'text-white' : 'text-gray-600'}`}>
                {n8nReady ? `${stats.hoursSavedLastMonth}h` : '—'}
              </div>
              {n8nReady && <TrendBadge pct={stats.momTrend} />}
            </div>
            <div className="text-gray-500 text-sm">
              {n8nReady
                ? `${stats.executionsLastMonth} executions last month`
                : 'Data loading…'}
            </div>
          </div>
        </div>

        {/* Breakdown */}
        {n8nReady && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8">
            <h2 className="text-white font-semibold mb-4 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Monthly Summary
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">{stats.workflowsActive}</div>
                <div className="text-gray-400 text-xs mt-1">Active Workflows</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.executionsThisMonth}</div>
                <div className="text-gray-400 text-xs mt-1">Executions This Month</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stats.executionsLastMonth}</div>
                <div className="text-gray-400 text-xs mt-1">Executions Last Month</div>
              </div>
              <div>
                <div
                  className={`text-2xl font-bold ${stats.momTrend >= 0 ? 'text-green-400' : 'text-red-400'}`}
                >
                  {stats.momTrend >= 0 ? '+' : ''}
                  {stats.momTrend}%
                </div>
                <div className="text-gray-400 text-xs mt-1">MoM Change</div>
              </div>
            </div>
          </div>
        )}

        {/* Alerts */}
        {stats.alerts.length > 0 && (
          <div className="mb-8">
            <h2 className="text-white font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              Alerts
            </h2>
            <div className="flex flex-col gap-2">
              {stats.alerts.map((a) => (
                <AlertItem key={a.id} message={a.message} severity={a.severity} />
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <p className="text-gray-600 text-xs text-center">
          Hours saved calculated at 15 min per successful execution. Data sourced from n8n execution
          logs. Questions? Reply to your onboarding email.
        </p>
      </main>
    </div>
  )
}

// ─── Access denied ───────────────────────────────────────────────────────────

function AccessDenied() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-xl flex items-center justify-center mx-auto mb-6">
          <Zap className="w-6 h-6 text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-white mb-3">Dashboard Access Required</h1>
        <p className="text-gray-400 text-sm">
          This dashboard is private. Please use the link provided by your Tsunami Automation
          account manager to access your ROI data.
        </p>
        <p className="text-gray-600 text-xs mt-6">
          Need help? Contact your account manager directly.
        </p>
      </div>
    </div>
  )
}
