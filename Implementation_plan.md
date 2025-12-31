# HiWave Alpha Infrastructure Implementation Guide

> **Goal:** Minimal viable infrastructure to support the alpha release of HiWave.
> **Philosophy:** Less is more. Ship fast, iterate later.

---

## Current Status

| Phase | Status |
|-------|--------|
| Phase 1: Supabase Setup | ✅ COMPLETED |
| Phase 2: Stripe Setup | 🔄 IN PROGRESS |
| Phase 3: Vercel Deployment | 🔄 IN PROGRESS |
| Phase 4: API Routes | ✅ COMPLETED |
| Phase 5: Frontend Pages | ✅ COMPLETED |
| Phase 6: Feedback & Issues | ⏳ PENDING |
| Phase 7: Browser Integration | ⏳ PENDING |

---

## Project Information

| Item | Value |
|------|-------|
| **Domain** | https://hiwavebrowser.com |
| **GitHub Repo (Web)** | https://github.com/hiwavebrowser/hiwave-web |
| **GitHub Repo (macOS)** | https://github.com/hiwavebrowser/hiwave-macos |
| **Supabase Project** | `pexpsquxvldjhwwnqwah` |
| **License Key Format** | `HW-{uuid}` |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    hiwavebrowser.com (VERCEL)               │
│                                                              │
│   Static Pages              API Routes                       │
│   ─────────────             ──────────                       │
│   /           (landing)     /api/stripe-webhook              │
│   /success    (show key)    /api/get-license-from-session    │
│   /recover    (recovery)    /api/recover-license             │
│                             /api/validate-license            │
│                             /api/early-adopter-slots         │
│                                                              │
└──────────────────────────┬──────────────────────────────────┘
                           │
            ┌──────────────┴──────────────┐
            │                             │
            ▼                             ▼
┌───────────────────────┐     ┌───────────────────────┐
│       SUPABASE        │     │        STRIPE         │
│                       │     │                       │
│  Table: licenses      │     │  Products (4 tiers):  │
│   - id (uuid)         │     │   - HiWave Starter    │
│   - email             │     │   - HiWave Supporter  │
│   - license_key       │     │   - HiWave Believer   │
│   - tier              │     │   - Early Adopter     │
│   - versions_included │     │                       │
│   - purchased_version │     │  Payment Links (4)    │
│   - stripe_session_id │     │  Webhook → Vercel     │
│   - amount_paid       │     │                       │
└───────────────────────┘     └───────────────────────┘
```

### Key Decisions

| Decision | Choice | Notes |
|----------|--------|-------|
| Supabase project | New (separate from other projects) | Clean isolation |
| Email delivery | None for alpha | Key shown on success page |
| License key format | `HW-{uuid}` | Simple, unique |
| Validation model | Offline default, API for upgrades | Fail-open on network errors |

---

## Pricing Structure

| Tier | Price | Major Versions | Notes |
|------|-------|----------------|-------|
| **Starter** | $10 | 1 | Entry-level support |
| **Supporter** | $15 | 3 | Best value |
| **Believer** | $20 | 5 | Maximum coverage |
| **Early Adopter** | Min $1 (PWYW) | 4 | **Limited to 150 Founders** |

---

## Phase 1: Supabase Setup ✅ COMPLETED

### Credentials

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://pexpsquxvldjhwwnqwah.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Configured in `.env.local` |

### Schema Created

- `licenses` table with tier support
- `license_tier` enum (free, starter, supporter, believer, early_adopter)
- Helper functions for Early Adopter slot tracking
- Version entitlement calculation

---

## Phase 2: Stripe Setup 🔄 IN PROGRESS

### 2.1 Create Products (4 Total)

Go to https://dashboard.stripe.com/products (Test mode)

| Product | Price | Description |
|---------|-------|-------------|
| **HiWave Starter** | $10.00 one-time | Includes Pro features for 1 major version |
| **HiWave Supporter** | $15.00 one-time | Includes Pro features for 3 major versions. Best value! |
| **HiWave Believer** | $20.00 one-time | Includes Pro features for 5 major versions |
| **HiWave Early Adopter** | Customer chooses (min $1) | First 150 Founders - 4 major versions |

### 2.2 Create Payment Links

For each product:
1. Click "Create payment link"
2. **Collect customer email:** Yes (required)
3. **After payment:** Redirect to custom URL
4. **Success URL:** `https://hiwavebrowser.com/success?session_id={CHECKOUT_SESSION_ID}`

| Tier | Payment Link |
|------|--------------|
| Starter | 📝 `https://buy.stripe.com/___` |
| Supporter | 📝 `https://buy.stripe.com/___` |
| Believer | 📝 `https://buy.stripe.com/___` |
| Early Adopter | 📝 `https://buy.stripe.com/___` |

### 2.3 Configure Webhook

1. Go to **Developers → Webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL:** `https://hiwavebrowser.com/api/stripe-webhook`
4. **Events:** `checkout.session.completed`
5. Copy the **Signing secret** (starts with `whsec_`)

### 2.4 API Keys ✅

| Variable | Status |
|----------|--------|
| `STRIPE_SECRET_KEY` | ✅ Configured |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ Need new one for hiwavebrowser.com |

---

## Phase 3: Vercel Deployment 🔄 IN PROGRESS

### 3.1 GitHub Repository ✅

- **Repo:** https://github.com/hiwavebrowser/hiwave-web
- **Branch:** master

### 3.2 Deploy to Vercel

1. Go to https://vercel.com/new
2. Import `hiwavebrowser/hiwave-web`
3. Deploy with default Next.js settings

### 3.3 Add Environment Variables

| Name | Value |
|------|-------|
| `SUPABASE_URL` | `https://pexpsquxvldjhwwnqwah.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase) |
| `STRIPE_SECRET_KEY` | (from Stripe) |
| `STRIPE_WEBHOOK_SECRET` | (new webhook secret) |
| `NEXT_PUBLIC_STRIPE_LINK_STARTER` | (from Phase 2) |
| `NEXT_PUBLIC_STRIPE_LINK_SUPPORTER` | (from Phase 2) |
| `NEXT_PUBLIC_STRIPE_LINK_BELIEVER` | (from Phase 2) |
| `NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER` | (from Phase 2) |
| `NEXT_PUBLIC_CURRENT_MAJOR_VERSION` | `1` |

### 3.4 Connect Custom Domain

1. Go to Vercel → Project → Settings → Domains
2. Add `hiwavebrowser.com`
3. Configure DNS at your registrar

---

## Phase 4: API Routes ✅ COMPLETED

All routes implemented:

| Route | Purpose |
|-------|---------|
| `/api/stripe-webhook` | Handles payments, creates licenses with tier info |
| `/api/get-license-from-session` | Retrieves license after purchase |
| `/api/recover-license` | Email-based license recovery |
| `/api/validate-license` | Validates license and version entitlement |
| `/api/early-adopter-slots` | Returns remaining founder slots (of 150) |

---

## Phase 5: Frontend Pages ✅ COMPLETED

| Page | Features |
|------|----------|
| `/` | Full landing page with pricing tiers, comparison table, roadmap |
| `/success` | Post-purchase page with license key display |
| `/recover` | License recovery by email |

---

## Phase 6: Feedback & Issues ⏳ PENDING

### Set Up Canny (Optional)

1. Go to https://canny.io
2. Create workspace: `HiWave`
3. Create board: "Feature Requests"
4. URL will be: `https://hiwave.canny.io`

### GitHub Issue Templates

Create `.github/ISSUE_TEMPLATE/bug_report.md` and `config.yml` in the web repo.

---

## Phase 7: Browser Integration ⏳ PENDING

### Offline Validation (Browser-side)

```typescript
// In HiWave browser codebase

const LICENSE_KEY_PATTERN = /^HW-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

interface LicenseState {
  key: string | null
  valid: boolean
  lastChecked: number | null
}

function validateLicenseOffline(key: string): boolean {
  return LICENSE_KEY_PATTERN.test(key)
}

function getLicenseFromStorage(): LicenseState {
  const stored = localStorage.getItem('hiwave_license')
  if (!stored) return { key: null, valid: false, lastChecked: null }
  return JSON.parse(stored)
}

function saveLicenseToStorage(state: LicenseState): void {
  localStorage.setItem('hiwave_license', JSON.stringify(state))
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
    const res = await fetch('https://hiwavebrowser.com/api/validate-license', {
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

### After Stripe Setup

- [ ] Test each tier purchase (card: `4242 4242 4242 4242`)
- [ ] Verify correct tier assigned in database
- [ ] Verify version entitlements are correct
- [ ] Test Early Adopter slot counter

### License System

- [ ] Test license recovery by email
- [ ] Test license validation API
- [ ] Verify license key format (`HW-{uuid}`)

### Go-Live Checklist

- [ ] Switch Stripe to **live mode**
- [ ] Create live products and payment links
- [ ] Create live webhook endpoint
- [ ] Update Vercel env vars with live keys
- [ ] Test one real purchase (refund yourself)

---

## Reference: Environment Variables

| Variable | Description | Where to Get It |
|----------|-------------|-----------------|
| `SUPABASE_URL` | Supabase project URL | Supabase → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side key (secret) | Supabase → Settings → API |
| `STRIPE_SECRET_KEY` | Stripe API key | Stripe → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Stripe → Webhooks → Your endpoint |
| `NEXT_PUBLIC_STRIPE_LINK_STARTER` | Starter payment link | Stripe → Payment Links |
| `NEXT_PUBLIC_STRIPE_LINK_SUPPORTER` | Supporter payment link | Stripe → Payment Links |
| `NEXT_PUBLIC_STRIPE_LINK_BELIEVER` | Believer payment link | Stripe → Payment Links |
| `NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER` | Early Adopter payment link | Stripe → Payment Links |
| `NEXT_PUBLIC_CURRENT_MAJOR_VERSION` | Current major version | Set to `1` for alpha |

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
