# HiWave Alpha Infrastructure Implementation Guide

> **Goal:** Minimal viable infrastructure to support the alpha release of HiWave.  
> **Philosophy:** Less is more. Ship fast, iterate later.  
> **Estimated Time:** 6-8 hours across 2-3 days

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Prerequisites & Accounts](#prerequisites--accounts)
3. [Phase 1: Supabase Setup](#phase-1-supabase-setup)
4. [Phase 2: Stripe Setup](#phase-2-stripe-setup)
5. [Phase 3: Vercel Project Setup](#phase-3-vercel-project-setup)
6. [Phase 4: Implement API Routes](#phase-4-implement-api-routes)
7. [Phase 5: Frontend Pages](#phase-5-frontend-pages)
8. [Phase 6: Feedback & Issues](#phase-6-feedback--issues)
9. [Phase 7: Browser Integration](#phase-7-browser-integration)
10. [Testing Checklist](#testing-checklist)
11. [Reference: Project Structure](#reference-project-structure)
12. [Reference: Environment Variables](#reference-environment-variables)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         VERCEL                               │
│                                                              │
│   Static Pages              API Routes                       │
│   ─────────────             ──────────                       │
│   /           (landing)     /api/stripe-webhook              │
│   /success    (show key)    /api/get-license-from-session    │
│   /recover    (recovery)    /api/recover-license             │
│                             /api/validate-license            │
│                                                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
┌───────────────────────┐     ┌───────────────────────┐
│       SUPABASE        │     │        STRIPE         │
│                       │     │                       │
│  Table: licenses      │     │  Product: Zen Pro     │
│   - id (uuid)         │     │  Payment Link         │
│   - email             │     │  Webhook → Vercel     │
│   - license_key       │     │                       │
│   - stripe_session_id │     │                       │
│   - stripe_customer_id│     │                       │
│   - created_at        │     │                       │
│                       │     │                       │
└───────────────────────┘     └───────────────────────┘
```

### Key Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Supabase project | New (separate from boop) | Clean isolation |
| Email delivery | None for alpha | Key shown on success page |
| License key format | `HW-{uuid}` | Simple, unique |
| Validation model | Offline default, API for upgrades | Fail-open on network errors |

---

## Prerequisites & Accounts

Before starting, ensure you have access to:

- [ ] **Supabase account** (existing from boop project)
- [ ] **Vercel account** (existing from boop project)
- [ ] **Stripe account** (create if needed: https://dashboard.stripe.com/register)
- [ ] **Canny account** (create: https://canny.io - free tier)
- [ ] **GitHub repo** for HiWave-web (create if needed)

---

## Phase 1: Supabase Setup

**Time estimate:** 20 minutes

### Step 1.1: Create New Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Settings:
   - **Name:** `HiWave`
   - **Database Password:** Generate and save securely
   - **Region:** Choose closest to your users (e.g., `us-east-1`)
4. Wait for project to provision (~2 minutes)

### Step 1.2: Create Licenses Table

1. Go to SQL Editor in Supabase dashboard
2. Run the following SQL:

```sql
-- Create licenses table
create table public.licenses (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  license_key text unique not null,
  stripe_session_id text unique,
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Create indexes for fast lookups
create index licenses_email_idx on public.licenses(email);
create index licenses_key_idx on public.licenses(license_key);
create index licenses_session_idx on public.licenses(stripe_session_id);

-- Add comment for documentation
comment on table public.licenses is 'Stores HiWave Pro license keys';
```

### Step 1.3: Get API Credentials

1. Go to Project Settings → API
2. Copy and save:
   - **Project URL:** `https://xxxxx.supabase.co`
   - **service_role key:** (the secret one, NOT anon)

> ⚠️ **Security Note:** The `service_role` key bypasses RLS. Only use it in server-side code (API routes), never expose to client.

---

## Phase 2: Stripe Setup

**Time estimate:** 30 minutes

### Step 2.1: Create Product

1. Go to https://dashboard.stripe.com/products
2. Click "Add product"
3. Settings:
   - **Name:** `HiWave Pro`
   - **Description:** `Unlock Pro features in HiWave`
   - **Pricing:** One-time, set your price (e.g., $19)
4. Save product

### Step 2.2: Create Payment Link

1. On the product page, click "Create payment link"
2. Settings:
   - **Collect email:** Yes (required)
   - **After payment → Confirmation page:** Custom URL
   - **Success URL:** `https://your-domain.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`
3. Copy the payment link URL (you'll use this on your landing page)

### Step 2.3: Configure Webhook

1. Go to Developers → Webhooks
2. Click "Add endpoint"
3. Settings:
   - **Endpoint URL:** `https://your-domain.vercel.app/api/stripe-webhook`
   - **Events to send:** Select `checkout.session.completed`
4. After creating, copy the **Signing secret** (starts with `whsec_`)

### Step 2.4: Get API Keys

1. Go to Developers → API keys
2. Copy:
   - **Secret key:** `sk_live_...` (or `sk_test_...` for testing)

> 💡 **Tip:** Use test mode initially. Toggle "Test mode" in Stripe dashboard. All test keys start with `sk_test_` and `whsec_test_`.

---

## Phase 3: Vercel Project Setup

**Time estimate:** 15 minutes

### Step 3.1: Create GitHub Repository

```bash
# Create new repo
mkdir HiWave-web
cd HiWave-web
git init

# Create Next.js app
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias

# Initial commit
git add .
git commit -m "Initial Next.js setup"

# Push to GitHub
gh repo create HiWave-web --public --push
```

### Step 3.2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Import the `HiWave-web` repository
3. Keep default settings (Next.js auto-detected)
4. Click "Deploy"

### Step 3.3: Configure Environment Variables

1. Go to Project Settings → Environment Variables
2. Add the following:

| Name | Value | Environment |
|------|-------|-------------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbG...` | All |
| `STRIPE_SECRET_KEY` | `sk_test_...` | All |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | All |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | `https://buy.stripe.com/...` | All |

### Step 3.4: Update Stripe Webhook URL

1. Return to Stripe Dashboard → Webhooks
2. Update the endpoint URL to your actual Vercel domain:
   - `https://HiWave-web.vercel.app/api/stripe-webhook`

---

## Phase 4: Implement API Routes

**Time estimate:** 1.5-2 hours

### Step 4.1: Install Dependencies

```bash
npm install @supabase/supabase-js stripe
```

### Step 4.2: Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

if (!process.env.SUPABASE_URL) throw new Error('Missing SUPABASE_URL')
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY')

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)
```

### Step 4.3: Create Stripe Client

Create `lib/stripe.ts`:

```typescript
import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) throw new Error('Missing STRIPE_SECRET_KEY')

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16'
})
```

### Step 4.4: Create License Utilities

Create `lib/license.ts`:

```typescript
import { randomUUID } from 'crypto'

export function generateLicenseKey(): string {
  return `HW-${randomUUID()}`
}

export function isValidLicenseFormat(key: string): boolean {
  const pattern = /^HW-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return pattern.test(key)
}
```

### Step 4.5: Implement Stripe Webhook

Create `app/api/stripe-webhook/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabase } from '@/lib/supabase'
import { generateLicenseKey } from '@/lib/license'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event
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
    const session = event.data.object

    const licenseKey = generateLicenseKey()

    const { error } = await supabase.from('licenses').insert({
      email: session.customer_email,
      license_key: licenseKey,
      stripe_session_id: session.id,
      stripe_customer_id: session.customer as string
    })

    if (error) {
      console.error('Failed to insert license:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    console.log(`License created: ${licenseKey} for ${session.customer_email}`)
  }

  return NextResponse.json({ received: true })
}
```

### Step 4.6: Implement Get License from Session

Create `app/api/get-license-from-session/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Missing session_id' }, { status: 400 })
  }

  // Poll for up to 10 seconds (webhook may not have fired yet)
  for (let i = 0; i < 10; i++) {
    const { data, error } = await supabase
      .from('licenses')
      .select('license_key, email')
      .eq('stripe_session_id', sessionId)
      .single()

    if (data) {
      return NextResponse.json(data)
    }

    if (error && error.code !== 'PGRST116') {
      // PGRST116 = no rows found, which is expected while waiting
      console.error('Database error:', error)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return NextResponse.json({ error: 'License not found' }, { status: 404 })
}
```

### Step 4.7: Implement License Recovery

Create `app/api/recover-license/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  const { email } = await request.json()

  if (!email || typeof email !== 'string') {
    return NextResponse.json({ error: 'Email required' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('licenses')
    .select('license_key, created_at')
    .eq('email', email.toLowerCase().trim())
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Database error:', error)
    return NextResponse.json({ error: 'Database error' }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ licenses: [] })
  }

  return NextResponse.json({ licenses: data })
}
```

### Step 4.8: Implement License Validation

Create `app/api/validate-license/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { isValidLicenseFormat } from '@/lib/license'

export async function POST(request: NextRequest) {
  const { license_key } = await request.json()

  if (!license_key || !isValidLicenseFormat(license_key)) {
    return NextResponse.json({ valid: false, reason: 'invalid_format' })
  }

  const { data, error } = await supabase
    .from('licenses')
    .select('email, created_at')
    .eq('license_key', license_key)
    .single()

  if (error || !data) {
    return NextResponse.json({ valid: false, reason: 'not_found' })
  }

  return NextResponse.json({
    valid: true,
    email: data.email,
    created_at: data.created_at
  })
}
```

---

## Phase 5: Frontend Pages

**Time estimate:** 2-2.5 hours

### Step 5.1: Landing Page

Replace `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-5xl font-bold mb-4">HiWave</h1>
        <p className="text-xl text-gray-600 mb-8">
          A calmer way to browse. Reduce cognitive load with The Shelf, 
          intelligent tab management, and distraction-free workspaces.
        </p>

        <div className="flex gap-4 justify-center mb-12">
          <a
            href="https://github.com/your-repo/releases/latest"
            className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Download Alpha
          </a>
          <a
            href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Support & Unlock Pro
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4">
            <h3 className="font-semibold mb-2">The Shelf</h3>
            <p className="text-gray-600 text-sm">
              Tabs gracefully decay over time. Keep what matters, let go of the rest.
            </p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Workspaces</h3>
            <p className="text-gray-600 text-sm">
              Context-switch without losing your place. Separate work, research, and personal.
            </p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold mb-2">Privacy First</h3>
            <p className="text-gray-600 text-sm">
              No telemetry, no tracking. Your browsing stays yours.
            </p>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500 space-x-4">
          <a href="https://github.com/your-repo" className="hover:underline">GitHub</a>
          <a href="https://your-canny.canny.io" className="hover:underline">Feedback</a>
          <a href="/recover" className="hover:underline">Recover License</a>
        </div>
      </div>
    </main>
  )
}
```

### Step 5.2: Success Page

Create `app/success/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  
  const [license, setLicense] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    fetch(`/api/get-license-from-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.license_key) {
          setLicense(data.license_key)
        } else {
          setError('Could not retrieve license. Please contact support.')
        }
      })
      .catch(() => setError('Failed to fetch license'))
      .finally(() => setLoading(false))
  }, [sessionId])

  const copyToClipboard = () => {
    if (license) {
      navigator.clipboard.writeText(license)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">Thank You!</h1>
        
        {loading && <p className="text-gray-600">Retrieving your license key...</p>}
        
        {error && (
          <p className="text-red-600">{error}</p>
        )}
        
        {license && (
          <>
            <p className="text-gray-600 mb-6">
              Here's your HiWave Pro license key. Save it somewhere safe!
            </p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <code className="text-lg font-mono break-all">{license}</code>
            </div>
            
            <button
              onClick={copyToClipboard}
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            >
              {copied ? 'Copied!' : 'Copy to Clipboard'}
            </button>
            
            <p className="text-sm text-gray-500 mt-6">
              Enter this key in HiWave settings to unlock Pro features.
            </p>
          </>
        )}
        
        <a href="/" className="block mt-8 text-blue-600 hover:underline">
          ← Back to home
        </a>
      </div>
    </main>
  )
}
```

### Step 5.3: License Recovery Page

Create `app/recover/page.tsx`:

```tsx
'use client'

import { useState } from 'react'

interface License {
  license_key: string
  created_at: string
}

export default function RecoverPage() {
  const [email, setEmail] = useState('')
  const [licenses, setLicenses] = useState<License[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch('/api/recover-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      setLicenses(data.licenses || [])
    } catch {
      setLicenses([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Recover Your License</h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the email you used when purchasing HiWave Pro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Find My License'}
          </button>
        </form>

        {searched && licenses !== null && (
          <div className="mt-8">
            {licenses.length === 0 ? (
              <p className="text-gray-600 text-center">
                No licenses found for this email. Make sure you're using the same email from your purchase.
              </p>
            ) : (
              <div className="space-y-4">
                <p className="text-green-600 font-medium">Found {licenses.length} license(s):</p>
                {licenses.map((lic, i) => (
                  <div key={i} className="bg-gray-100 p-4 rounded-lg">
                    <code className="font-mono text-sm break-all">{lic.license_key}</code>
                    <p className="text-xs text-gray-500 mt-2">
                      Purchased: {new Date(lic.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <a href="/" className="block mt-8 text-center text-blue-600 hover:underline">
          ← Back to home
        </a>
      </div>
    </main>
  )
}
```

---

## Phase 6: Feedback & Issues

**Time estimate:** 30-45 minutes

### Step 6.1: Set Up Canny

1. Go to https://canny.io and create account
2. Create a board called "Feature Requests"
3. Copy your Canny URL (e.g., `https://HiWave.canny.io`)
4. Add link to your landing page and browser Help menu

### Step 6.2: GitHub Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug Report
about: Something isn't working as expected
labels: bug
---

**What happened?**
A clear description of the bug.

**Steps to reproduce**
1. 
2. 
3. 

**Expected behavior**
What you expected to happen.

**Environment**
- HiWave version: 
- Operating system: 
- Other details: 

**Screenshots**
If applicable, add screenshots.
```

Create `.github/ISSUE_TEMPLATE/config.yml`:

```yaml
blank_issues_enabled: false
contact_links:
  - name: 💡 Feature Request
    url: https://HiWave.canny.io
    about: Suggest and vote on new features
  - name: 💬 General Discussion
    url: https://github.com/your-repo/discussions
    about: Ask questions or start a discussion
```

---

## Phase 7: Browser Integration

**Time estimate:** 1 hour

### Offline Validation (Browser-side)

```typescript
// In HiWave codebase

const LICENSE_KEY_PATTERN = /^PF-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface LicenseState {
  key: string | null
  valid: boolean
  lastChecked: number | null
}

function validateLicenseOffline(key: string): boolean {
  return LICENSE_KEY_PATTERN.test(key)
}

function getLicenseFromStorage(): LicenseState {
  const stored = localStorage.getItem('HiWave_license')
  if (!stored) return { key: null, valid: false, lastChecked: null }
  return JSON.parse(stored)
}

function saveLicenseToStorage(state: LicenseState): void {
  localStorage.setItem('HiWave_license', JSON.stringify(state))
}

function activateLicense(key: string): boolean {
  if (!validateLicenseOffline(key)) return false
  
  saveLicenseToStorage({
    key,
    valid: true,
    lastChecked: Date.now()
  })
  return true
}
```

### Online Validation (For Upgrades)

```typescript
async function checkLicenseOnline(key: string): Promise<{ valid: boolean; tier?: string }> {
  try {
    const res = await fetch('https://HiWave.vercel.app/api/validate-license', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ license_key: key })
    })
    
    if (!res.ok) throw new Error('Network error')
    
    return await res.json()
  } catch {
    // Fail open - network issues shouldn't break the app
    return { valid: true, tier: 'unknown' }
  }
}
```

---

## Testing Checklist

### Pre-Launch Tests

- [ ] **Stripe test mode purchase**
  - Use card `4242 4242 4242 4242` with any future date and CVC
  - Verify webhook fires
  - Verify license appears in Supabase
  - Verify success page shows the key

- [ ] **License recovery**
  - Purchase with test email
  - Visit `/recover`, enter email
  - Verify license key is returned

- [ ] **License validation API**
  - POST valid key → returns `{ valid: true }`
  - POST invalid format → returns `{ valid: false }`
  - POST non-existent key → returns `{ valid: false }`

- [ ] **Browser integration**
  - Enter license in settings
  - Verify Pro features unlock
  - Restart browser, verify key persists

### Go-Live Checklist

- [ ] Switch Stripe to live mode
- [ ] Update all environment variables in Vercel
- [ ] Update webhook endpoint to use live signing secret
- [ ] Update payment link to live version
- [ ] Test one real purchase (refund yourself after)

---

## Reference: Project Structure

```
HiWave-web/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── success/
│   │   └── page.tsx                      # Post-purchase success
│   ├── recover/
│   │   └── page.tsx                      # License recovery
│   └── api/
│       ├── stripe-webhook/
│       │   └── route.ts                  # Stripe webhook handler
│       ├── get-license-from-session/
│       │   └── route.ts                  # Fetch license after purchase
│       ├── recover-license/
│       │   └── route.ts                  # Email-based recovery
│       └── validate-license/
│           └── route.ts                  # Server-side validation
├── lib/
│   ├── supabase.ts                       # Supabase client
│   ├── stripe.ts                         # Stripe client
│   └── license.ts                        # License utilities
├── .github/
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.md
│       └── config.yml
├── .env.local                            # Local environment (not committed)
└── package.json
```

---

## Reference: Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `SUPABASE_URL` | Supabase project URL | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side key (secret) | Supabase → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe API key | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Stripe → Webhooks → Your endpoint |
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Payment link URL | Stripe → Payment Links |

---

## Quick Reference Commands

```bash
# Local development
npm run dev

# Deploy (auto on git push, or manual)
vercel --prod

# View Vercel logs
vercel logs

# Stripe webhook testing locally
stripe listen --forward-to localhost:3000/api/stripe-webhook
```

---

*Last updated: December 2024*
