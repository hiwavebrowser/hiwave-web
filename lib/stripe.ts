import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// Map Stripe product IDs to license tiers
// These will be set after creating products in Stripe
export function getTierFromProductId(productId: string): 'starter' | 'supporter' | 'believer' | 'early_adopter' | null {
  const productTierMap: Record<string, 'starter' | 'supporter' | 'believer' | 'early_adopter'> = {
    // These will be populated with actual product IDs from Stripe
    // Example: 'prod_xxxxx': 'starter'
  }

  return productTierMap[productId] || null
}

// Get tier based on price amount (fallback method)
export function getTierFromAmount(amountInCents: number): 'starter' | 'supporter' | 'believer' | 'early_adopter' {
  if (amountInCents === 1000) return 'starter'
  if (amountInCents === 1500) return 'supporter'
  if (amountInCents === 2000) return 'believer'
  // Any other amount is Early Adopter (pay what you want)
  return 'early_adopter'
}
