import { NextRequest, NextResponse } from 'next/server'

interface LeadPayload {
  name: string
  email: string
  phone?: string
  businessType: string
  challenge: string
}

const VALID_BUSINESS_TYPES = new Set([
  'healthcare',
  'real-estate',
  'consulting',
  'saas',
  'ecommerce',
  'agency',
  'other',
])

const VALID_CHALLENGES = new Set([
  'lead-followup',
  'no-shows',
  'manual-tasks',
  'lead-gen',
  'reporting',
  'other',
])

export async function POST(req: NextRequest) {
  let body: LeadPayload

  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { name, email, phone, businessType, challenge } = body

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
  }

  if (!businessType || !VALID_BUSINESS_TYPES.has(businessType)) {
    return NextResponse.json({ error: 'Business type is required' }, { status: 400 })
  }

  if (!challenge || !VALID_CHALLENGES.has(challenge)) {
    return NextResponse.json({ error: 'Challenge is required' }, { status: 400 })
  }

  const lead = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || null,
    businessType,
    challenge,
    submittedAt: new Date().toISOString(),
    source: req.headers.get('referer') || 'direct',
  }

  // TODO: wire to CRM (HubSpot / Pipedrive / GoHighLevel) or email notification
  // For now: log to stdout so Coolify captures it in service logs
  console.log('[audit-call] New lead:', JSON.stringify(lead))

  return NextResponse.json({ success: true }, { status: 201 })
}
