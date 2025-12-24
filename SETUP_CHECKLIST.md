# Zen Browser Alpha - Account Setup Checklist

> Track your progress setting up the infrastructure for Zen Browser.

---

## Quick Links

| Service | Dashboard |
|---------|-----------|
| Supabase | https://supabase.com/dashboard |
| Stripe | https://dashboard.stripe.com |
| Vercel | https://vercel.com/dashboard |
| Canny | https://canny.io |
| GitHub | https://github.com |

---

## Pricing Structure Reference

| Tier | Price | Major Versions | Notes |
|------|-------|----------------|-------|
| Starter | $10 | 1 | Entry-level support |
| Supporter | $15 | 3 | Best value |
| Believer | $20 | 5 | Maximum coverage |
| Early Adopter | Pay What You Want (min $1) | 4 | **Limited to 150 Founders** |

---

## Phase 1: Supabase Setup ✅ COMPLETED

### 1.1 Create New Project ✅

- [x] Go to https://supabase.com/dashboard
- [x] Click **"New Project"**
- [x] Configure:
  - **Name:** `zen-browser`
  - **Database Password:** (saved securely)
  - **Region:** Selected
- [x] Click **"Create new project"**
- [x] Wait for provisioning

### 1.2 Create the Licenses Table ✅

- [x] Go to **SQL Editor** in sidebar
- [x] Run `supabase_schema.sql`

Schema includes:
- License tiers enum (free, starter, supporter, believer, early_adopter)
- Version entitlement tracking
- Helper functions for Early Adopter slot availability (150 limit)
- Auto-updating timestamps
- License statistics view

### 1.3 API Credentials ✅

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://pexpsquxvldjhwwnqwah.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Configured in `.env.local` |

---

## Phase 2: Stripe Setup 🔄 IN PROGRESS

You have an existing Stripe account. Create products for each tier.

### 2.1 Create Products (4 Total)

- [ ] Go to https://dashboard.stripe.com/products
- [ ] Ensure you're in **Test mode** (toggle in top-right)

**Product 1: Starter ($10 → 1 version)**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Starter`
- [ ] Description: `Support Zen Browser development. Includes Pro features for 1 major version.`
- [ ] Pricing: One-time, **$10.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 2: Supporter ($15 → 3 versions)**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Supporter`
- [ ] Description: `Support Zen Browser development. Includes Pro features for 3 major versions. Best value!`
- [ ] Pricing: One-time, **$15.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 3: Believer ($20 → 5 versions)**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Believer`
- [ ] Description: `Support Zen Browser development. Includes Pro features for 5 major versions. Maximum coverage!`
- [ ] Pricing: One-time, **$20.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 4: Early Adopter (Pay What You Want → 4 versions)**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Early Adopter - Founder Edition`
- [ ] Description: `Join the first 150 Founders! Pay what you want (min $1). Includes Pro features for 4 major versions.`
- [ ] Pricing: **Customer chooses price** (minimum $1.00)
- [ ] Save and note Product ID: 📝 `prod_________________`

### 2.2 Create Payment Links (4 Total)

For each product, create a payment link:

- [ ] On each product page, click **"Create payment link"**
- [ ] Configure each:
  - **Collect customer email:** ✅ Yes (required)
  - **Confirmation page:** Select "Don't show confirmation page"
  - **After payment:** Redirect to custom URL
  - **Success URL:** `https://YOUR-VERCEL-DOMAIN/success?session_id={CHECKOUT_SESSION_ID}`

> 💡 Use your temporary Vercel URL first, update to custom domain later

Copy all payment link URLs:

| Tier | Price | Versions | Payment Link |
|------|-------|----------|--------------|
| Starter | $10 | 1 | 📝 `https://buy.stripe.com/_______________` |
| Supporter | $15 | 3 | 📝 `https://buy.stripe.com/_______________` |
| Believer | $20 | 5 | 📝 `https://buy.stripe.com/_______________` |
| Early Adopter | Min $1 | 4 | 📝 `https://buy.stripe.com/_______________` |

### 2.3 Configure Webhook

- [ ] Go to **Developers → Webhooks** (https://dashboard.stripe.com/webhooks)
- [ ] Click **"Add endpoint"**
- [ ] Configure:
  - **Endpoint URL:** `https://YOUR-VERCEL-DOMAIN/api/stripe-webhook`
  - **Events to send:** Click "Select events"
    - [ ] Check **`checkout.session.completed`** (under Checkout)
- [ ] Click **"Add endpoint"**
- [ ] On the endpoint page, click **"Reveal"** under Signing secret
- [ ] Copy the signing secret (starts with `whsec_`)

> ⚠️ You already have a webhook secret in `.env.local` - you may need to create a NEW webhook for this project's endpoint

### 2.4 API Keys ✅

Already configured from existing Stripe account:

| Variable | Status |
|----------|--------|
| `STRIPE_SECRET_KEY` | ✅ Configured in `.env.local` |
| `STRIPE_WEBHOOK_SECRET` | ⚠️ May need new one for Zen Browser endpoint |

---

## Phase 3: Application Setup ✅ COMPLETED

### 3.1 Initialize Project ✅

- [x] Next.js 16 with TypeScript
- [x] Tailwind CSS v4
- [x] Supabase client configured
- [x] Stripe client configured

### 3.2 API Routes Created ✅

- [x] `/api/stripe-webhook` - Handles payments, creates licenses with tier info
- [x] `/api/get-license-from-session` - Retrieves license after purchase
- [x] `/api/recover-license` - Email-based license recovery
- [x] `/api/validate-license` - Validates license and version entitlement
- [x] `/api/early-adopter-slots` - Returns remaining founder slots (of 150)

### 3.3 Frontend Pages Created ✅

- [x] `/` - Landing page with all 4 pricing tiers
- [x] `/success` - Post-purchase page showing license key
- [x] `/recover` - License recovery by email

### 3.4 Run Locally ✅

```bash
npm run dev
# Visit http://localhost:3000
```

---

## Phase 4: Vercel Deployment ⏳ PENDING

### 4.1 Push to GitHub

- [ ] Commit all changes:
```bash
git add .
git commit -m "Zen Browser website with tiered licensing"
git push origin master
```

### 4.2 Deploy to Vercel

- [ ] Go to https://vercel.com/new
- [ ] Click **"Import Git Repository"**
- [ ] Select your repository
- [ ] Keep default settings (Next.js auto-detected)
- [ ] Click **"Deploy"**
- [ ] Note your Vercel URL:

| Your Vercel Domain |
|--------------------|
| 📝 `https://_________________________.vercel.app` |

### 4.3 Add Environment Variables

- [ ] Go to your project in Vercel → **Settings → Environment Variables**
- [ ] Add each variable:

| Name | Value | Environments |
|------|-------|--------------|
| `SUPABASE_URL` | `https://pexpsquxvldjhwwnqwah.supabase.co` | All |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Supabase) | All |
| `STRIPE_SECRET_KEY` | (from Stripe) | All |
| `STRIPE_WEBHOOK_SECRET` | (new webhook secret) | All |
| `NEXT_PUBLIC_STRIPE_LINK_STARTER` | (from Phase 2) | All |
| `NEXT_PUBLIC_STRIPE_LINK_SUPPORTER` | (from Phase 2) | All |
| `NEXT_PUBLIC_STRIPE_LINK_BELIEVER` | (from Phase 2) | All |
| `NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER` | (from Phase 2) | All |
| `NEXT_PUBLIC_CURRENT_MAJOR_VERSION` | `1` | All |

- [ ] Redeploy after adding variables

### 4.4 Update Stripe with Vercel URL

- [ ] Update webhook endpoint URL in Stripe
- [ ] Update all 4 payment link success URLs

---

## Phase 5: Canny Setup (Optional)

### 5.1 Create Account

- [ ] Go to https://canny.io
- [ ] Create account (free tier)
- [ ] Create workspace: `Zen Browser`
- [ ] Create board: **"Feature Requests"**

| Your Canny URL |
|----------------|
| 📝 `https://_________________________.canny.io` |

---

## Phase 6: Custom Domain (Later)

Complete this after purchasing your domain.

### 6.1 Add Domain to Vercel

- [ ] Go to Vercel → Your Project → **Settings → Domains**
- [ ] Add your domain
- [ ] Configure DNS at registrar

### 6.2 Update All URLs

- [ ] Update Stripe webhook endpoint
- [ ] Update all 4 payment link success URLs
- [ ] Update any hardcoded URLs in the app

### 6.3 Switch to Live Mode

- [ ] Toggle Stripe to **Live mode**
- [ ] Create live versions of all 4 products
- [ ] Create live payment links
- [ ] Create live webhook endpoint
- [ ] Update Vercel env vars with live keys
- [ ] Test with real purchase (refund yourself)

---

## Environment Variables Summary

Your `.env.local` should contain:

```env
# Supabase
SUPABASE_URL=https://pexpsquxvldjhwwnqwah.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-key

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Links (add after creating in Stripe)
NEXT_PUBLIC_STRIPE_LINK_STARTER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_SUPPORTER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_BELIEVER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER=https://buy.stripe.com/...

# Version tracking
NEXT_PUBLIC_CURRENT_MAJOR_VERSION=1
```

---

## Testing Checklist

### After Stripe Products Created

- [ ] **Test each tier purchase:**
  - Use test card: `4242 4242 4242 4242`
  - Any future expiry, any CVC
  - Verify correct tier assigned in database
  - Verify version entitlements correct

| Tier | Expected `versions_included` | Entitled Through (at v1) |
|------|------------------------------|--------------------------|
| Starter | 1 | v1 |
| Supporter | 3 | v3 |
| Believer | 5 | v5 |
| Early Adopter | 4 | v4 |

### Early Adopter Limit

- [ ] Verify `/api/early-adopter-slots` returns correct count
- [ ] Test that slot count decreases after purchase
- [ ] Verify Early Adopter option hides when 150 reached

### License Recovery

- [ ] Purchase with test email
- [ ] Go to `/recover`
- [ ] Enter email
- [ ] Verify license(s) returned with correct tier info

---

## Troubleshooting

### Wrong tier assigned
- Check `getTierFromAmount()` in `lib/stripe.ts`
- Verify product prices match: $10, $15, $20

### Early Adopter slots not tracking
- Check database for `tier = 'early_adopter'` count
- Verify `EARLY_ADOPTER_LIMIT` is 150 in `lib/supabase.ts`

### Payment links not working
- Ensure `NEXT_PUBLIC_*` prefix for client-side env vars
- Redeploy after adding to Vercel

---

*Last Updated: December 2024*
