import { NextRequest, NextResponse } from 'next/server'

interface IntakePayload {
  contactName: string
  contactEmail: string
  phone?: string
  businessName: string
  businessType: string
  teamSize: string
  revenueRange?: string
  currentTools: string
  painPoint1: string
  painPoint2?: string
  painPoint3?: string
}

const VALID_BUSINESS_TYPES = new Set([
  'dental',
  'agency',
  'consulting',
  'real-estate',
  'healthcare',
  'saas',
  'ecommerce',
  'other',
])

const VALID_TEAM_SIZES = new Set(['1', '2-5', '6-15', '16-50', '50+'])

export async function POST(req: NextRequest) {
  let body: IntakePayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const {
    contactName,
    contactEmail,
    phone,
    businessName,
    businessType,
    teamSize,
    revenueRange,
    currentTools,
    painPoint1,
    painPoint2,
    painPoint3,
  } = body

  if (!contactName || typeof contactName !== 'string' || contactName.trim().length < 2) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  if (!contactEmail || typeof contactEmail !== 'string' || !contactEmail.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  if (!businessName || typeof businessName !== 'string' || businessName.trim().length < 1) {
    return NextResponse.json({ error: 'Business name is required' }, { status: 400 })
  }

  if (!businessType || !VALID_BUSINESS_TYPES.has(businessType)) {
    return NextResponse.json({ error: 'Business type is required' }, { status: 400 })
  }

  if (!teamSize || !VALID_TEAM_SIZES.has(teamSize)) {
    return NextResponse.json({ error: 'Team size is required' }, { status: 400 })
  }

  if (!currentTools || typeof currentTools !== 'string' || currentTools.trim().length < 3) {
    return NextResponse.json({ error: 'Current tools field is required' }, { status: 400 })
  }

  if (!painPoint1 || typeof painPoint1 !== 'string' || painPoint1.trim().length < 5) {
    return NextResponse.json({ error: 'At least one pain point is required' }, { status: 400 })
  }

  const submission = {
    contactName: contactName.trim(),
    contactEmail: contactEmail.trim().toLowerCase(),
    phone: phone?.trim() || null,
    businessName: businessName.trim(),
    businessType,
    teamSize,
    revenueRange: revenueRange || null,
    currentTools: currentTools.trim(),
    painPoints: [painPoint1, painPoint2, painPoint3]
      .filter((p): p is string => typeof p === 'string' && p.trim().length > 0)
      .map((p) => p.trim()),
    submittedAt: new Date().toISOString(),
    source: req.headers.get('referer') || 'direct',
  }

  // Log to stdout — captured by Coolify service logs
  console.log('[intake] New submission:', JSON.stringify(submission))

  // Optionally forward to a webhook (n8n, Make, Slack, etc.)
  const webhookUrl = process.env.INTAKE_WEBHOOK_URL
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      })
    } catch (err) {
      // Non-fatal — log and continue
      console.error('[intake] Webhook delivery failed:', err)
    }
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
