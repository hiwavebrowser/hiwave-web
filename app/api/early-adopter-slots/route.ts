import { NextResponse } from 'next/server'
import { supabase, EARLY_ADOPTER_LIMIT } from '@/lib/supabase'

export async function GET() {
  const { count, error } = await supabase
    .from('licenses')
    .select('*', { count: 'exact', head: true })
    .eq('tier', 'early_adopter')

  if (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  const claimed = count || 0
  const remaining = Math.max(0, EARLY_ADOPTER_LIMIT - claimed)
  const available = remaining > 0

  return NextResponse.json({
    total: EARLY_ADOPTER_LIMIT,
    claimed,
    remaining,
    available
  })
}
