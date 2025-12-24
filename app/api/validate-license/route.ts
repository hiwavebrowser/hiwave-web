import { NextRequest, NextResponse } from 'next/server'
import { supabase, CURRENT_MAJOR_VERSION } from '@/lib/supabase'
import { isValidLicenseFormat, isLicenseCurrentlyValid, getEntitledThroughVersion, getTierDisplayName } from '@/lib/license'

export async function POST(request: NextRequest) {
  const { license_key } = await request.json()

  if (!license_key || !isValidLicenseFormat(license_key)) {
    return NextResponse.json({
      valid: false,
      reason: 'invalid_format',
      message: 'License key format is invalid'
    })
  }

  const { data, error } = await supabase
    .from('licenses')
    .select('email, tier, purchased_major_version, versions_included, created_at')
    .eq('license_key', license_key)
    .single()

  if (error || !data) {
    return NextResponse.json({
      valid: false,
      reason: 'not_found',
      message: 'License key not found'
    })
  }

  const isValid = isLicenseCurrentlyValid(data.purchased_major_version, data.versions_included)
  const entitledThrough = getEntitledThroughVersion(data.purchased_major_version, data.versions_included)

  return NextResponse.json({
    valid: isValid,
    reason: isValid ? 'valid' : 'expired',
    message: isValid
      ? `License valid through v${entitledThrough}`
      : `License expired. Valid through v${entitledThrough}, current version is v${CURRENT_MAJOR_VERSION}`,
    email: data.email,
    tier: data.tier,
    tier_display: getTierDisplayName(data.tier),
    purchased_major_version: data.purchased_major_version,
    versions_included: data.versions_included,
    entitled_through_version: entitledThrough,
    current_version: CURRENT_MAJOR_VERSION,
    created_at: data.created_at
  })
}
