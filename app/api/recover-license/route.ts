import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getTierDisplayName, getEntitledThroughVersion } from '@/lib/license'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('licenses')
    .select('license_key, tier, purchased_major_version, versions_included, created_at')
    .eq('email', email.toLowerCase().trim())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ licenses: [] })
  }

  const licenses = data.map(lic => ({
    license_key: lic.license_key,
    tier: lic.tier,
    tier_display: getTierDisplayName(lic.tier),
    purchased_major_version: lic.purchased_major_version,
    versions_included: lic.versions_included,
    entitled_through_version: getEntitledThroughVersion(
      lic.purchased_major_version,
      lic.versions_included
    ),
    created_at: lic.created_at
  }))

  return NextResponse.json({ licenses })
}
