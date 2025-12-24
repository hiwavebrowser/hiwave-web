import { randomUUID } from 'crypto'
import { LicenseTier, TIER_CONFIG, CURRENT_MAJOR_VERSION } from './supabase'

/**
 * Generate a unique license key
 * Format: ZEN-{uuid}
 */
export function generateLicenseKey(): string {
  return `ZEN-${randomUUID()}`
}

/**
 * Validate license key format
 */
export function isValidLicenseFormat(key: string): boolean {
  const pattern = /^ZEN-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return pattern.test(key)
}

/**
 * Get the versions included for a tier
 */
export function getVersionsForTier(tier: LicenseTier): number {
  return TIER_CONFIG[tier].versionsIncluded
}

/**
 * Calculate entitled through version
 * @param purchasedMajorVersion - The major version when purchased (e.g., 1 for v1.x)
 * @param versionsIncluded - Number of major versions included in the tier
 * @returns The last major version the license is valid for
 */
export function getEntitledThroughVersion(purchasedMajorVersion: number, versionsIncluded: number): number {
  if (versionsIncluded === 0) return 0 // Free tier
  return purchasedMajorVersion + versionsIncluded - 1
}

/**
 * Check if a license is valid for a specific major version
 */
export function isLicenseValidForVersion(
  purchasedMajorVersion: number,
  versionsIncluded: number,
  targetVersion: number
): boolean {
  if (versionsIncluded === 0) return false // Free tier has no access
  const entitledThrough = getEntitledThroughVersion(purchasedMajorVersion, versionsIncluded)
  return targetVersion <= entitledThrough
}

/**
 * Check if a license is currently valid (for current major version)
 */
export function isLicenseCurrentlyValid(purchasedMajorVersion: number, versionsIncluded: number): boolean {
  return isLicenseValidForVersion(purchasedMajorVersion, versionsIncluded, CURRENT_MAJOR_VERSION)
}

/**
 * Get human-readable tier name
 */
export function getTierDisplayName(tier: LicenseTier): string {
  const names: Record<LicenseTier, string> = {
    free: 'Free',
    starter: 'Starter',
    supporter: 'Supporter',
    believer: 'Believer',
    early_adopter: 'Early Adopter (Founder)'
  }
  return names[tier]
}
