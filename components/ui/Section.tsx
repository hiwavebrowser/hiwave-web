'use client'

import { useEffect, useRef, useState } from 'react'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  animate?: boolean
  background?: 'default' | 'secondary' | 'dark' | 'gradient'
}

const backgroundStyles: Record<string, string> = {
  default: 'bg-[var(--hiwave-bg)]',
  secondary: 'bg-[var(--hiwave-bg-secondary)]',
  dark: 'bg-hiwave-navy text-white',
  gradient: 'bg-hero-gradient-animated text-white',
}

export function Section({
  id,
  className = '',
  children,
  animate = true,
  background = 'default',
}: SectionProps) {
  const [isVisible, setIsVisible] = useState(!animate)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!animate) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [animate])

  return (
    <section
      ref={ref}
      id={id}
      className={`py-20 ${backgroundStyles[background]} ${className}`}
    >
      <div
        className={`max-w-6xl mx-auto px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {children}
      </div>
    </section>
  )
}

// Section header component
interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''} ${className}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className="text-lg text-[var(--hiwave-text-secondary)] max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}
