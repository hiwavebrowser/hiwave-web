import { NextRequest, NextResponse } from 'next/server'
import { stripe, getTierFromAmount } from '@/lib/stripe'
import { supabase, TIER_CONFIG, EARLY_ADOPTER_LIMIT, CURRENT_MAJOR_VERSION } from '@/lib/supabase'
import { generateLicenseKey, getVersionsForTier } from '@/lib/license'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    // Determine tier from amount paid
    const amountPaid = session.amount_total || 0
    let tier = getTierFromAmount(amountPaid)

    // If it's an early adopter, check if slots are still available
    if (tier === 'early_adopter') {
      const { count, error: countError } = await supabase
        .from('licenses')
        .select('*', { count: 'exact', head: true })
        .eq('tier', 'early_adopter')

      if (countError) {
        console.error('Failed to count early adopters:', countError)
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }

      if ((count || 0) >= EARLY_ADOPTER_LIMIT) {
        // Fall back to closest tier based on amount
        if (amountPaid >= 2000) tier = 'believer'
        else if (amountPaid >= 1500) tier = 'supporter'
        else tier = 'starter'
        console.log(`Early adopter slots full, falling back to ${tier}`)
      }
    }

    const versionsIncluded = getVersionsForTier(tier)
    const licenseKey = generateLicenseKey()

    const { error } = await supabase.from('licenses').insert({
      email: session.customer_email?.toLowerCase().trim(),
      license_key: licenseKey,
      tier: tier,
      purchased_major_version: CURRENT_MAJOR_VERSION,
      versions_included: versionsIncluded,
      stripe_session_id: session.id,
      stripe_customer_id: session.customer as string,
      amount_paid: amountPaid
    })

    if (error) {
      console.error('Failed to insert license:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    console.log(`License created: ${licenseKey} (${tier}) for ${session.customer_email}`)
  }

  return NextResponse.json({ received: true })
}
