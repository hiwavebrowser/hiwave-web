'use client'

import { forwardRef } from 'react'

type CardVariant = 'default' | 'glass' | 'gradient' | 'highlighted' | 'dark'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  hover?: boolean
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<CardVariant, string> = {
  default: 'bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)]',
  glass: 'glass-card',
  gradient: 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700',
  highlighted: 'bg-[var(--hiwave-bg)] border-2 border-hiwave-primary shadow-glow',
  dark: 'bg-slate-900 border border-slate-800 text-white',
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', hover = true, children, className = '', ...props }, ref) => {
    const baseStyles = 'rounded-xl p-6 transition-all duration-300'
    const hoverStyles = hover ? 'hover:-translate-y-1 hover:shadow-lg' : ''
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`

    return (
      <div ref={ref} className={combinedStyles} {...props}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

// Feature Card component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  variant?: CardVariant
  className?: string
}

export function FeatureCard({ icon, title, description, variant = 'default', className = '' }: FeatureCardProps) {
  return (
    <Card variant={variant} className={`flex flex-col items-start gap-4 ${className}`}>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-hiwave-primary/10 text-hiwave-primary">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-[var(--hiwave-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </Card>
  )
}

// Pricing Card component
interface PricingCardProps {
  tier: string
  price: string
  description: string
  features: string[]
  ctaText: string
  ctaHref: string
  highlighted?: boolean
  badge?: string
  className?: string
}

export function PricingCard({
  tier,
  price,
  description,
  features,
  ctaText,
  ctaHref,
  highlighted = false,
  badge,
  className = '',
}: PricingCardProps) {
  return (
    <Card
      variant={highlighted ? 'highlighted' : 'default'}
      hover={true}
      className={`relative flex flex-col ${className}`}
    >
      {badge && (
        <span className="absolute -top-3 left-4 badge badge-primary">
          {badge}
        </span>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-2">{tier}</h3>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-4xl font-bold">{price}</span>
          {price !== 'Free' && <span className="text-[var(--hiwave-text-muted)]">one-time</span>}
        </div>
        <p className="text-[var(--hiwave-text-secondary)] text-sm">{description}</p>
      </div>
      <ul className="flex-1 space-y-3 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2 text-sm">
            <svg className="w-5 h-5 text-hiwave-primary flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      <a
        href={ctaHref}
        className={`btn w-full ${highlighted ? 'btn-primary' : 'btn-secondary'}`}
      >
        {ctaText}
      </a>
    </Card>
  )
}
