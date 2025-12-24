import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL) {
  throw new Error('Missing SUPABASE_URL environment variable')
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
}

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Type definitions for our database
export type LicenseTier = 'free' | 'starter' | 'supporter' | 'believer' | 'early_adopter'

export interface License {
  id: string
  email: string
  license_key: string
  tier: LicenseTier
  purchased_major_version: number
  versions_included: number
  stripe_session_id: string | null
  stripe_customer_id: string | null
  stripe_product_id: string | null
  amount_paid: number | null
  created_at: string
  updated_at: string
}

// Tier configuration
export const TIER_CONFIG: Record<LicenseTier, { versionsIncluded: number; price: number | null }> = {
  free: { versionsIncluded: 0, price: 0 },
  starter: { versionsIncluded: 1, price: 1000 },      // $10.00
  supporter: { versionsIncluded: 3, price: 1500 },    // $15.00
  believer: { versionsIncluded: 5, price: 2000 },     // $20.00
  early_adopter: { versionsIncluded: 4, price: null } // Donation-based
}

export const EARLY_ADOPTER_LIMIT = 150
export const CURRENT_MAJOR_VERSION = parseInt(process.env.NEXT_PUBLIC_CURRENT_MAJOR_VERSION || '1', 10)
