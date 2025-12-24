# Zen Browser License Tiers

## Tier Overview

| Tier | Price | Major Versions | Notes |
|------|-------|----------------|-------|
| Free | $0 | 0 | Basic features only |
| Starter | $10 | 1 | Entry-level support |
| Supporter | $15 | 3 | Best value |
| Believer | $20 | 5 | Maximum coverage |
| Early Adopter | Donation (min $1) | 4 | **Limited to 150 Founders** |

## Tier Enum

```rust
pub enum LicenseTier {
    Free,           // No payment, basic features
    Starter,        // $10 → 1 major version
    Supporter,      // $15 → 3 major versions
    Believer,       // $20 → 5 major versions
    EarlyAdopter,   // Donation → 4 major versions (150 founders only)
}
```

## Version Entitlement Logic

```
entitled_through_version = purchased_major_version + versions_included - 1
```

### Example: Believer at v1.0

```
User buys Believer at v1.0:
- purchased_major = 1
- versions_included = 5
- entitled_through = 1 + 5 - 1 = v5

Feature check:
- Themes (introduced v2) → v2 ≤ v5 → ✅ UNLOCKED
- Zen Sync (introduced v3) → v3 ≤ v5 → ✅ UNLOCKED
- Future v6 feature → v6 > v5 → 🔒 EXPIRED (upgrade needed)
```

### Example: Early Adopter at v1.0

```
User donates as Early Adopter at v1.0:
- purchased_major = 1
- versions_included = 4
- entitled_through = 1 + 4 - 1 = v4

All features through v4 are unlocked.
```

## Early Adopter Program

- **Limited to 150 Founders**
- Pay-what-you-want (minimum $1)
- Available during alpha/early release period
- Can be extended if needed
- Track slots via: `SELECT COUNT(*) FROM licenses WHERE tier = 'early_adopter'`

## Stripe Products Required

| Product | Type | Price |
|---------|------|-------|
| Zen Browser Starter | Fixed | $10.00 |
| Zen Browser Supporter | Fixed | $15.00 |
| Zen Browser Believer | Fixed | $20.00 |
| Zen Browser Early Adopter | Pay What You Want | Min $1.00 |

## Current Version

- **Alpha Release:** v1.0
- All licenses purchased now use `purchased_major_version = 1`
