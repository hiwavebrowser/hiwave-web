'use client'

type BadgeVariant = 'primary' | 'success' | 'warning' | 'error' | 'secondary'

interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: 'bg-hiwave-primary/10 text-hiwave-primary',
  success: 'bg-green-500/10 text-green-500',
  warning: 'bg-amber-500/10 text-amber-500',
  error: 'bg-red-500/10 text-red-500',
  secondary: 'bg-[var(--hiwave-bg-tertiary)] text-[var(--hiwave-text-secondary)]',
}

export function Badge({ variant = 'primary', children, className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wide'

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}

// Status Badge for roadmap items
interface StatusBadgeProps {
  status: 'current' | 'next' | 'future' | 'completed'
  className?: string
}

const statusConfig: Record<string, { text: string; variant: BadgeVariant }> = {
  current: { text: 'Current', variant: 'success' },
  next: { text: 'Next', variant: 'primary' },
  future: { text: 'Future', variant: 'secondary' },
  completed: { text: 'Done', variant: 'success' },
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  const config = statusConfig[status]
  return (
    <Badge variant={config.variant} className={className}>
      {config.text}
    </Badge>
  )
}
