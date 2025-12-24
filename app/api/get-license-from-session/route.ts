import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getTierDisplayName, getEntitledThroughVersion } from '@/lib/license'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  // Poll for up to 10 seconds (webhook may not have fired yet)
  for (let i = 0; i < 10; i++) {
    const { data, error } = await supabase
      .from('licenses')
      .select('license_key, email, tier, purchased_major_version, versions_included, amount_paid')
      .eq('stripe_session_id', sessionId)
      .single()

    if (data) {
      const entitledThrough = getEntitledThroughVersion(
        data.purchased_major_version,
        data.versions_included
      )

      return NextResponse.json({
        license_key: data.license_key,
        email: data.email,
        tier: data.tier,
        tier_display: getTierDisplayName(data.tier),
        purchased_major_version: data.purchased_major_version,
        versions_included: data.versions_included,
        entitled_through_version: entitledThrough,
        amount_paid: data.amount_paid
      })
    }

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is expected while waiting
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return NextResponse.json({ error: 'License not found. Please try refreshing the page.' }, { status: 404 })
}
