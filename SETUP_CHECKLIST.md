# Zen Browser Alpha - Account Setup Checklist

> Complete these steps before building the application.
> Check off each item as you complete it.

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

## Phase 1: Supabase Setup

You have an existing Supabase account from the boop project. Create a **new project** for Zen Browser (keeps things isolated).

### 1.1 Create New Project

- [ ] Go to https://supabase.com/dashboard
- [ ] Click **"New Project"**
- [ ] Configure:
  - **Name:** `zen-browser`
  - **Database Password:** Generate and save securely → 📝 _______________
  - **Region:** `us-east-1` (or closest to your users)
- [ ] Click **"Create new project"**
- [ ] Wait for provisioning (~2 minutes)

### 1.2 Create the Licenses Table

- [ ] Go to **SQL Editor** in sidebar
- [ ] Click **"New query"**
- [ ] Copy the contents of `supabase_schema.sql` from this project
- [ ] Paste into the SQL Editor
- [ ] Click **"Run"** and verify success

The schema includes:
- License tiers enum (free, starter, supporter, believer, early_adopter)
- Version entitlement tracking
- Helper functions for Early Adopter slot availability
- Auto-updating timestamps
- License statistics view

### 1.3 Get API Credentials

- [ ] Go to **Settings → API** (in sidebar)
- [ ] Copy these values:

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `SUPABASE_URL` | 📝 ___________________________ | Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | 📝 ___________________________ | service_role (secret) - NOT the anon key! |

> ⚠️ **Security:** The service_role key bypasses Row Level Security. Never expose it to the client/browser.

---

## Phase 2: Stripe Setup

You have an existing Stripe account. Create a new product for Zen Browser Pro.

### 2.1 Create Products (4 Total)

- [ ] Go to https://dashboard.stripe.com/products
- [ ] Ensure you're in **Test mode** (toggle in top-right)

**Product 1: Starter**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Starter`
- [ ] Description: `1 major version of Pro features`
- [ ] Pricing: One-time, **$10.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 2: Supporter**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Supporter`
- [ ] Description: `3 major versions of Pro features`
- [ ] Pricing: One-time, **$15.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 3: Believer**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Believer`
- [ ] Description: `5 major versions of Pro features`
- [ ] Pricing: One-time, **$20.00**
- [ ] Save and note Product ID: 📝 `prod_________________`

**Product 4: Early Adopter (Founders - Limited to 150)**
- [ ] Click **"Add product"**
- [ ] Name: `Zen Browser Early Adopter`
- [ ] Description: `Founder tier - 4 major versions (limited to 150)`
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

> 💡 Use your temporary Vercel URL first (e.g., `https://zenbweb.vercel.app`)

Copy all payment link URLs:

| Tier | Payment Link |
|------|--------------|
| Starter ($10) | 📝 `https://buy.stripe.com/_______________` |
| Supporter ($15) | 📝 `https://buy.stripe.com/_______________` |
| Believer ($20) | 📝 `https://buy.stripe.com/_______________` |
| Early Adopter | 📝 `https://buy.stripe.com/_______________` |

### 2.3 Configure Webhook

- [ ] Go to **Developers → Webhooks** (https://dashboard.stripe.com/webhooks)
- [ ] Click **"Add endpoint"**
- [ ] Configure:
  - **Endpoint URL:** `https://YOUR-VERCEL-DOMAIN/api/stripe-webhook`
  - **Events to send:** Click "Select events"
    - [ ] Check **`checkout.session.completed`** (under Checkout)
- [ ] Click **"Add endpoint"**
- [ ] On the endpoint page, click **"Reveal"** under Signing secret
- [ ] Copy the signing secret:

| Variable | Value |
|----------|-------|
| `STRIPE_WEBHOOK_SECRET` | 📝 ___________________________ (starts with `whsec_`) |

### 2.4 Get/Confirm API Keys

- [ ] Go to **Developers → API keys**
- [ ] Confirm you have:

| Variable | Value | Notes |
|----------|-------|-------|
| `STRIPE_SECRET_KEY` | `sk_test_51SON...` | Your existing test key works |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_51SON...` | Optional - only if needed client-side |

---

## Phase 3: Vercel Setup

You have an existing Vercel account. Deploy the Zen Browser web app.

### 3.1 Initialize Project Locally

- [ ] Open terminal in project folder
- [ ] Run:
```bash
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --no-import-alias
```
- [ ] Confirm overwrites if prompted (package.json, etc.)

### 3.2 Push to GitHub

- [ ] Create repository on GitHub (if not already):
```bash
# If repo doesn't exist yet
gh repo create zen-browser-web --public
```

- [ ] Push code:
```bash
git add .
git commit -m "Initial Next.js setup"
git push -u origin master
```

### 3.3 Deploy to Vercel

- [ ] Go to https://vercel.com/new
- [ ] Click **"Import Git Repository"**
- [ ] Select your `zen-browser-web` repository
- [ ] Keep default settings (Framework: Next.js auto-detected)
- [ ] Click **"Deploy"**
- [ ] Wait for deployment to complete
- [ ] Note your Vercel URL:

| Your Vercel Domain |
|--------------------|
| 📝 `https://_________________________.vercel.app` |

### 3.4 Add Environment Variables

- [ ] Go to your project in Vercel
- [ ] Click **Settings → Environment Variables**
- [ ] Add each variable:

| Name | Value | Environments |
|------|-------|--------------|
| `SUPABASE_URL` | (from Phase 1) | ✅ Production ✅ Preview ✅ Development |
| `SUPABASE_SERVICE_ROLE_KEY` | (from Phase 1) | ✅ Production ✅ Preview ✅ Development |
| `STRIPE_SECRET_KEY` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `STRIPE_WEBHOOK_SECRET` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_STRIPE_LINK_STARTER` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_STRIPE_LINK_SUPPORTER` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_STRIPE_LINK_BELIEVER` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER` | (from Phase 2) | ✅ Production ✅ Preview ✅ Development |
| `NEXT_PUBLIC_CURRENT_MAJOR_VERSION` | `1` | ✅ Production ✅ Preview ✅ Development |

- [ ] Click **"Save"** for each

### 3.5 Redeploy with Environment Variables

- [ ] Go to **Deployments** tab
- [ ] Click **⋮** (three dots) on latest deployment
- [ ] Click **"Redeploy"**
- [ ] Wait for deployment to complete

### 3.6 Update Stripe URLs (Important!)

Now that you have your Vercel URL, go back and update Stripe:

- [ ] **Update Webhook URL:**
  - Go to Stripe → Developers → Webhooks
  - Click on your endpoint
  - Click **"Update details"**
  - Change URL to: `https://YOUR-VERCEL-DOMAIN.vercel.app/api/stripe-webhook`

- [ ] **Update Payment Link Success URL:**
  - Go to Stripe → Payment Links
  - Click on your payment link
  - Edit the success URL to: `https://YOUR-VERCEL-DOMAIN.vercel.app/success?session_id={CHECKOUT_SESSION_ID}`

---

## Phase 4: Canny Setup (Optional - Feedback System)

### 4.1 Create Account

- [ ] Go to https://canny.io
- [ ] Click **"Get Started"** (free tier)
- [ ] Create account with your email

### 4.2 Set Up Board

- [ ] Create a new company/workspace: `Zen Browser`
- [ ] Create a board called **"Feature Requests"**
- [ ] Note your Canny URL:

| Your Canny URL |
|----------------|
| 📝 `https://_________________________.canny.io` |

### 4.3 Configure Settings

- [ ] Go to Settings → General
- [ ] Enable/configure:
  - [ ] Allow anonymous feedback (optional)
  - [ ] Email notifications for new posts

---

## Phase 5: Custom Domain (Later)

Complete this after you've purchased your domain.

### 5.1 Add Domain to Vercel

- [ ] Go to Vercel → Your Project → **Settings → Domains**
- [ ] Click **"Add"**
- [ ] Enter your domain: 📝 _______________
- [ ] Vercel shows DNS records to add

### 5.2 Configure DNS at Registrar

Add these records at your domain registrar:

| Type | Name | Value |
|------|------|-------|
| A | @ | `76.76.21.21` |
| CNAME | www | `cname.vercel-dns.com` |

- [ ] Save DNS changes
- [ ] Wait for propagation (5-30 minutes)
- [ ] Verify domain shows as "Valid" in Vercel

### 5.3 Update Stripe URLs (Final)

- [ ] Update webhook endpoint to: `https://YOURDOMAIN.com/api/stripe-webhook`
- [ ] Update payment link success URL to: `https://YOURDOMAIN.com/success?session_id={CHECKOUT_SESSION_ID}`

### 5.4 Switch to Live Mode (When Ready)

- [ ] Toggle Stripe to **Live mode**
- [ ] Create live product and payment link
- [ ] Create live webhook endpoint
- [ ] Update Vercel environment variables with live keys:
  - `STRIPE_SECRET_KEY` → `sk_live_...`
  - `STRIPE_WEBHOOK_SECRET` → `whsec_...` (live)
  - `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` → live payment link
- [ ] Test with a real purchase (refund yourself)

---

## Environment Variables Summary

Create a `.env.local` file for local development:

```env
# Supabase (NEW zen-browser project)
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Payment Links (one per tier)
NEXT_PUBLIC_STRIPE_LINK_STARTER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_SUPPORTER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_BELIEVER=https://buy.stripe.com/...
NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER=https://buy.stripe.com/...

# Version tracking
NEXT_PUBLIC_CURRENT_MAJOR_VERSION=1
```

> ⚠️ **Never commit `.env.local` to git!** It should already be in `.gitignore`.

---

## Testing Checklist

After all setup is complete:

- [ ] **Test Purchase Flow:**
  - Use Stripe test card: `4242 4242 4242 4242`
  - Any future expiry date, any CVC
  - Complete purchase
  - Verify redirect to success page
  - Verify license key is displayed

- [ ] **Verify Webhook:**
  - Check Stripe → Webhooks → Your endpoint → "Webhook attempts"
  - Should show successful delivery

- [ ] **Verify Database:**
  - Check Supabase → Table Editor → licenses
  - Should see new row with license key

- [ ] **Test License Recovery:**
  - Go to `/recover`
  - Enter the test email used
  - Verify license key is returned

---

## Troubleshooting

### Webhook not firing
- Check Stripe webhook endpoint URL is correct
- Ensure `checkout.session.completed` event is selected
- Check Vercel logs for errors

### License not showing on success page
- Webhook may be slow - page polls for 10 seconds
- Check Supabase for the license record
- Check Vercel function logs

### Environment variables not working
- Redeploy after adding variables
- Ensure no typos in variable names
- Check they're enabled for the right environments

---

*Created: December 2024*
