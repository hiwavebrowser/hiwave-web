'use client'

import { forwardRef } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  children: React.ReactNode
  className?: string
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-hiwave-primary text-white hover:bg-hiwave-primary-dark hover:shadow-glow',
  secondary: 'bg-transparent border-2 border-[var(--hiwave-border)] text-[var(--hiwave-text)] hover:border-hiwave-primary hover:text-hiwave-primary',
  ghost: 'bg-transparent text-[var(--hiwave-text-secondary)] hover:bg-[var(--hiwave-bg-secondary)] hover:text-[var(--hiwave-text)]',
  outline: 'bg-transparent border-2 border-white/30 text-white hover:bg-white/10',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, children, className = '', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-hiwave-primary focus-visible:outline-offset-2'
    const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

    if (href) {
      return (
        <a href={href} className={combinedStyles}>
          {children}
        </a>
      )
    }

    return (
      <button ref={ref} className={combinedStyles} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
