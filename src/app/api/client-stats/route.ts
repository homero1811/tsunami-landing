import { NextRequest, NextResponse } from 'next/server'

// ─── Types ──────────────────────────────────────────────────────────────────

interface N8nExecution {
  id: string
  startedAt: string
  stoppedAt: string | null
  status: 'success' | 'error' | 'waiting' | 'running'
  workflowId: string
}

interface N8nWorkflow {
  id: string
  name: string
  active: boolean
  tags?: Array<{ name: string }>
}

export interface ClientStats {
  clientId: string
  clientName: string
  workflowsActive: number
  hoursSavedThisMonth: number
  hoursSavedLastMonth: number
  momTrend: number
  executionsThisMonth: number
  executionsLastMonth: number
  alerts: Alert[]
}

interface Alert {
  id: string
  message: string
  severity: 'info' | 'warning' | 'error'
  createdAt: string
}

// ─── Auth ────────────────────────────────────────────────────────────────────

/**
 * CLIENT_TOKENS env var format: "clientId1:token1,clientId2:token2"
 * CLIENT_NAMES env var format: "clientId1:Display Name 1,clientId2:Display Name 2"
 */
function resolveClientFromToken(token: string): { clientId: string; clientName: string } | null {
  const raw = process.env.CLIENT_TOKENS || ''
  for (const pair of raw.split(',')) {
    const [id, tok] = pair.trim().split(':')
    if (id && tok && tok === token) {
      const namesRaw = process.env.CLIENT_NAMES || ''
      let displayName = id
      for (const np of namesRaw.split(',')) {
        const [nid, ...rest] = np.trim().split(':')
        if (nid === id) {
          displayName = rest.join(':').trim() || id
          break
        }
      }
      return { clientId: id, clientName: displayName }
    }
  }
  return null
}

function getToken(req: NextRequest): string | null {
  const auth = req.headers.get('authorization')
  if (auth?.startsWith('Bearer ')) return auth.slice(7)
  return req.nextUrl.searchParams.get('token')
}

// ─── n8n helpers ────────────────────────────────────────────────────────────

async function fetchN8nWorkflows(tag?: string): Promise<N8nWorkflow[]> {
  const base = process.env.N8N_API_URL
  const key = process.env.N8N_API_KEY
  if (!base || !key) return []

  const url = new URL(`${base}/api/v1/workflows`)
  url.searchParams.set('active', 'true')
  url.searchParams.set('limit', '100')
  if (tag) url.searchParams.set('tags', tag)

  const res = await fetch(url.toString(), {
    headers: { 'X-N8N-API-KEY': key },
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return Array.isArray(data.data) ? data.data : []
}

async function fetchN8nExecutions(
  afterDate: Date,
  beforeDate: Date,
  workflowIds?: string[],
): Promise<N8nExecution[]> {
  const base = process.env.N8N_API_URL
  const key = process.env.N8N_API_KEY
  if (!base || !key) return []

  const url = new URL(`${base}/api/v1/executions`)
  url.searchParams.set('status', 'success')
  url.searchParams.set('limit', '500')

  const res = await fetch(url.toString(), {
    headers: { 'X-N8N-API-KEY': key },
    cache: 'no-store',
  })
  if (!res.ok) return []
  const data = await res.json()
  const execs: N8nExecution[] = Array.isArray(data.data) ? data.data : []

  return execs.filter((e) => {
    if (!e.startedAt) return false
    const d = new Date(e.startedAt)
    if (d < afterDate || d >= beforeDate) return false
    if (workflowIds && workflowIds.length > 0 && !workflowIds.includes(e.workflowId)) return false
    return true
  })
}

// ─── Date helpers ─────────────────────────────────────────────────────────

function thisMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), 1)
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  return { start, end }
}

function lastMonthRange(): { start: Date; end: Date } {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const end = new Date(now.getFullYear(), now.getMonth(), 1)
  return { start, end }
}

// ─── Handler ─────────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const token = getToken(req)
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  const client = resolveClientFromToken(token)
  if (!client) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 })
  }

  // Determine optional per-client n8n tag filter
  // CLIENT_N8N_TAGS env var format: "clientId1:tagName,clientId2:tagName"
  let clientTag: string | undefined
  const tagsRaw = process.env.CLIENT_N8N_TAGS || ''
  for (const pair of tagsRaw.split(',')) {
    const [id, tag] = pair.trim().split(':')
    if (id === client.clientId && tag) {
      clientTag = tag
      break
    }
  }

  const hoursPerExecution = parseFloat(process.env.HOURS_PER_EXECUTION || '0.25')

  let workflowsActive = 0
  let executionsThisMonth = 0
  let executionsLastMonth = 0
  const alerts: Alert[] = []

  const n8nConfigured = !!(process.env.N8N_API_URL && process.env.N8N_API_KEY)

  if (n8nConfigured) {
    const workflows = await fetchN8nWorkflows(clientTag)
    const workflowIds = clientTag ? workflows.map((w) => w.id) : undefined
    const { start: thisStart, end: thisEnd } = thisMonthRange()
    const { start: lastStart, end: lastEnd } = lastMonthRange()
    const [thisMonthExecs, lastMonthExecs] = await Promise.all([
      fetchN8nExecutions(thisStart, thisEnd, workflowIds),
      fetchN8nExecutions(lastStart, lastEnd, workflowIds),
    ])

    workflowsActive = workflows.length
    executionsThisMonth = thisMonthExecs.length
    executionsLastMonth = lastMonthExecs.length

    // Alert if any workflows errored this month
    const errUrl = new URL(`${process.env.N8N_API_URL}/api/v1/executions`)
    errUrl.searchParams.set('status', 'error')
    errUrl.searchParams.set('limit', '10')
    const errRes = await fetch(errUrl.toString(), {
      headers: { 'X-N8N-API-KEY': process.env.N8N_API_KEY! },
      cache: 'no-store',
    })
    if (errRes.ok) {
      const errData = await errRes.json()
      const recentErrors: N8nExecution[] = Array.isArray(errData.data) ? errData.data.slice(0, 3) : []
      for (const e of recentErrors) {
        const d = new Date(e.startedAt)
        if (d >= thisStart) {
          alerts.push({
            id: e.id,
            message: `Workflow execution failed (ID: ${e.workflowId})`,
            severity: 'warning',
            createdAt: e.startedAt,
          })
        }
      }
    }
  } else {
    // n8n not configured — return zeros, let UI show "data pending" state
    console.warn('[client-stats] N8N_API_URL or N8N_API_KEY not configured')
  }

  const hoursSavedThisMonth = +(executionsThisMonth * hoursPerExecution).toFixed(1)
  const hoursSavedLastMonth = +(executionsLastMonth * hoursPerExecution).toFixed(1)
  const momTrend =
    executionsLastMonth === 0
      ? executionsThisMonth > 0 ? 100 : 0
      : +(((executionsThisMonth - executionsLastMonth) / executionsLastMonth) * 100).toFixed(1)

  const stats: ClientStats = {
    clientId: client.clientId,
    clientName: client.clientName,
    workflowsActive,
    hoursSavedThisMonth,
    hoursSavedLastMonth,
    momTrend,
    executionsThisMonth,
    executionsLastMonth,
    alerts,
  }

  return NextResponse.json(stats)
}
