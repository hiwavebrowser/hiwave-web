'use client'

import { useEffect, useState, useRef } from 'react'
import {
  ThemeToggle,
  Badge,
  ShieldIcon,
  TabsIcon,
  WorkspaceIcon,
  VaultIcon,
  FocusIcon,
  SparkleIcon,
  AnalyticsIcon,
  SyncIcon,
  DownloadIcon,
  ImportIcon,
  ThemeIcon,
  ReaderIcon,
  VideoIcon,
  AutofillIcon,
  GitHubIcon,
  CheckIcon,
  AppleIcon,
  WindowsIcon,
  LinuxIcon,
} from '@/components/ui'

// Animation hook for scroll-triggered animations
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
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
  }, [])

  return { ref, isVisible }
}

// Animated section component
function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation()

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      }}
    >
      {children}
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--hiwave-bg)] text-[var(--hiwave-text)]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-hiwave-navy/90 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-bold text-white">
            HiWave
          </a>
          <div className="flex items-center gap-4">
            <a href="#features" className="text-sm text-gray-300 hover:text-white transition-colors hidden md:block">
              Features
            </a>
            <a href="#status" className="text-sm text-gray-300 hover:text-white transition-colors hidden md:block">
              Status
            </a>
            <a href="#churn" className="text-sm text-gray-300 hover:text-white transition-colors hidden lg:block">
              Metrics
            </a>
            <a href="#donate" className="text-sm text-gray-300 hover:text-white transition-colors hidden sm:block">
              Donate
            </a>
            <a href="https://github.com/hiwavebrowser" className="text-gray-300 hover:text-white transition-colors">
              <GitHubIcon className="w-5 h-5" />
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient-animated text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-hiwave-primary/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-hiwave-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <AnimatedSection>
            <Badge variant="primary" className="mb-6 bg-hiwave-primary/20 text-hiwave-primary-light border border-hiwave-primary/30">
              Free & Open Source
            </Badge>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">HiWave</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
              A browser that gets out of your way.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-4">
              Privacy-first browsing with intelligent tab management.
              Built from scratch in Rust with our own engine — RustKit.
            </p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mb-10">
              No clutter. No tracking. No distractions. Completely free and open source.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={400}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://github.com/hiwavebrowser/hiwave/releases/latest"
                className="btn btn-primary text-lg px-8 py-4 shadow-glow hover:shadow-glow-lg"
              >
                <DownloadIcon className="w-5 h-5" />
                Download Free (All Platforms)
              </a>
              <a
                href="https://github.com/hiwavebrowser/hiwave/releases/tag/nightly"
                className="btn btn-secondary text-lg px-8 py-4 border-white/30 text-white hover:border-white/50"
              >
                Nightly Builds
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={500}>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <AppleIcon className="w-5 h-5" />
                <span className="text-sm">macOS 12+</span>
              </div>
              <div className="flex items-center gap-2">
                <WindowsIcon className="w-5 h-5" />
                <span className="text-sm">Windows 10+</span>
              </div>
              <div className="flex items-center gap-2">
                <LinuxIcon className="w-5 h-5" />
                <span className="text-sm">Linux (Ubuntu/Fedora/Arch)</span>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={550}>
            <div className="mt-8 flex justify-center">
              <a
                href="#status"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all text-sm text-gray-300 hover:text-white"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                View Live Development Metrics
              </a>
            </div>
          </AnimatedSection>

          {/* Browser screenshot */}
          <AnimatedSection delay={600}>
            <div className="mt-16 max-w-4xl mx-auto">
              <div className="relative rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
                <img
                  src="/screenshots/hero.png"
                  alt="HiWave Browser - A calmer browsing experience"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-[var(--hiwave-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center">
              <Badge variant="warning" className="mb-4">The Problem</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your browser is working against you.
              </h2>
              <p className="text-xl text-[var(--hiwave-text-secondary)] leading-relaxed">
                Hundreds of tabs you'll never revisit. Bookmarks you forgot exist.
                Ads everywhere. Trackers following you across the web.
                <span className="block mt-4 font-semibold text-[var(--hiwave-text)]">
                  It's time for something different.
                </span>
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="success" className="mb-4">The Solution</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                HiWave: Less is more.
              </h2>
              <p className="text-xl text-[var(--hiwave-text-secondary)]">
                A privacy-first browser built on simplicity.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: <TabsIcon className="w-6 h-6" />,
                title: 'Tabs decay naturally',
                description: 'Unused tabs fade to The Shelf, keeping your workspace clean without losing anything.',
                color: 'from-hiwave-primary to-hiwave-accent',
              },
              {
                icon: <WorkspaceIcon className="w-6 h-6" />,
                title: 'Workspaces replace bookmarks',
                description: "Organize by context (Work, Personal, Research), not folders you'll never open.",
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: <ShieldIcon className="w-6 h-6" />,
                title: 'Ads blocked by default',
                description: '800,000+ domains blocked out of the box. No extensions needed.',
                color: 'from-red-500 to-orange-500',
              },
              {
                icon: <VaultIcon className="w-6 h-6" />,
                title: 'Your data stays yours',
                description: 'No telemetry. No tracking. No account required.',
                color: 'from-green-500 to-emerald-500',
              },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 100}>
                <div className="group p-6 rounded-xl bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)] hover:border-hiwave-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-[var(--hiwave-text-secondary)]">{feature.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* All Features - Everything is Free */}
      <section className="py-24 bg-[var(--hiwave-bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Everything Included <span className="text-hiwave-primary">(All Free)</span>
              </h2>
              <p className="text-lg text-[var(--hiwave-text-secondary)]">
                No premium tiers. No hidden features. HiWave is completely free, forever.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <FocusIcon />, title: 'Core Browsing', desc: 'Tabs, navigation, search — everything you expect.' },
              { icon: <TabsIcon />, title: 'The Shelf', desc: 'Tabs decay over time, stay findable, never lost.' },
              { icon: <WorkspaceIcon />, title: 'Workspaces', desc: 'Context-based organization with page locking.' },
              { icon: <ShieldIcon />, title: 'Flow Shield', desc: 'Built-in ad and tracker blocking at Pi-hole level.' },
              { icon: <VaultIcon />, title: 'Flow Vault', desc: 'Encrypted password storage that lives locally.' },
              { icon: <ImportIcon />, title: 'Import Your Data', desc: 'Bring your Chrome or Firefox bookmarks.' },
              { icon: <ThemeIcon />, title: 'Themes', desc: 'Light mode, dark mode, custom colors. Make it yours.' },
              { icon: <ReaderIcon />, title: 'Reader Mode', desc: 'Distraction-free article reading. Just the content.' },
              { icon: <VideoIcon />, title: 'Picture-in-Picture', desc: 'Floating video while you browse. Multitask effortlessly.' },
              { icon: <AutofillIcon />, title: 'Auto-fill', desc: 'Passwords and forms, filled securely. Save time everywhere.' },
              { icon: <AnalyticsIcon />, title: 'Flow Report', desc: 'Weekly browsing wellness digest. Understand your habits.' },
              { icon: <SyncIcon />, title: 'HiWave Sync', desc: 'Workspaces & vault across devices. Seamless continuity.' },
            ].map((feature, i) => (
              <AnimatedSection key={feature.title} delay={i * 50}>
                <div className="p-6 rounded-xl bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)] hover:border-hiwave-primary/30 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-lg bg-hiwave-primary/10 text-hiwave-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--hiwave-text-secondary)]">{feature.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Development Status Section */}
      <section id="status" className="py-24 border-t border-[var(--hiwave-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-16">
              <Badge variant="primary" className="mb-4">Development Status</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Built in the Open
              </h2>
              <p className="text-lg text-[var(--hiwave-text-secondary)]">
                Track our progress with real-time metrics across all platforms
              </p>
            </div>
          </AnimatedSection>

          {/* Platform Status Grid */}
          <AnimatedSection delay={100}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Platform Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'macOS', icon: <AppleIcon className="w-6 h-6" />, platform: 'macos' },
                  { name: 'Windows', icon: <WindowsIcon className="w-6 h-6" />, platform: 'windows' },
                  { name: 'Linux', icon: <LinuxIcon className="w-6 h-6" />, platform: 'linux' },
                ].map((platform, i) => (
                  <div key={platform.name} className="p-6 rounded-xl bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)]">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-hiwave-primary">{platform.icon}</div>
                      <h4 className="text-xl font-bold">{platform.name}</h4>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--hiwave-text-secondary)]">Build</span>
                        <img src={`https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/build-${platform.platform}.svg`} alt="Build Status" className="h-5" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--hiwave-text-secondary)]">Tests</span>
                        <img src={`https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/tests-${platform.platform}.svg`} alt="Test Status" className="h-5" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--hiwave-text-secondary)]">Parity</span>
                        <img src={`https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/parity-${platform.platform}.svg`} alt="Parity Score" className="h-5" />
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[var(--hiwave-text-secondary)]">Performance</span>
                        <img src={`https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/perf-${platform.platform}.svg`} alt="Performance" className="h-5" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Overall Metrics */}
          <AnimatedSection delay={200}>
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Overall Progress</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/parity-overall.svg" alt="Overall Parity" className="h-8" />
                <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/tests-overall.svg" alt="Overall Tests" className="h-8" />
                <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/badges/perf-score.svg" alt="Overall Performance" className="h-8" />
              </div>
            </div>
          </AnimatedSection>

          {/* Trend Charts */}
          <AnimatedSection delay={300}>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Parity Progress Over Time</h3>
                <div className="rounded-xl border border-[var(--hiwave-border)] overflow-hidden bg-white p-4">
                  <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/charts/parity-trend.svg" alt="Parity Trend" className="w-full" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Performance Trend</h3>
                <div className="rounded-xl border border-[var(--hiwave-border)] overflow-hidden bg-white p-4">
                  <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/charts/perf-trend.svg" alt="Performance Trend" className="w-full" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 text-center">Platform Comparison</h3>
                <div className="rounded-xl border border-[var(--hiwave-border)] overflow-hidden bg-white p-4">
                  <img src="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/charts/platform-comparison.svg" alt="Platform Comparison" className="w-full" />
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* What is Parity? */}
          <AnimatedSection delay={400}>
            <div className="mt-12 p-6 rounded-xl bg-[var(--hiwave-bg-secondary)] border border-[var(--hiwave-border)]">
              <h4 className="text-lg font-bold mb-2">What is Visual Parity?</h4>
              <p className="text-sm text-[var(--hiwave-text-secondary)] mb-4">
                RustKit is our custom browser engine built from scratch in Rust. Visual parity testing measures how closely
                RustKit's rendering matches Chrome 120 baselines using pixel-perfect comparison, layout rect verification,
                and computed style matching across 23 test cases.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="font-semibold text-hiwave-primary mb-1">Pixel Diff</div>
                  <div className="text-[var(--hiwave-text-secondary)]">Direct pixel comparison</div>
                </div>
                <div>
                  <div className="font-semibold text-hiwave-primary mb-1">Layout Rects</div>
                  <div className="text-[var(--hiwave-text-secondary)]">Element positioning</div>
                </div>
                <div>
                  <div className="font-semibold text-hiwave-primary mb-1">Computed Styles</div>
                  <div className="text-[var(--hiwave-text-secondary)]">CSS property matching</div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Code Churn Analysis Section */}
      <section id="churn" className="py-24 bg-[var(--hiwave-bg-secondary)]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4">Development Insights</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Code Churn Analysis
              </h2>
              <p className="text-lg text-[var(--hiwave-text-secondary)]">
                Track codebase evolution, identify hotspots, and monitor cross-platform development patterns
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <AnimatedSection delay={100}>
              <div className="p-6 rounded-xl bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)] hover:border-hiwave-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white mb-4">
                  <AnalyticsIcon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Dashboard</h3>
                <p className="text-[var(--hiwave-text-secondary)] mb-4">
                  Visualize file modification frequency, line range hotspots, and areas of active development across
                  all platforms with our interactive churn analysis dashboard.
                </p>
                <a
                  href="https://raw.githubusercontent.com/hiwavebrowser/hiwave/master/churn-reports/dashboard.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiwave-primary hover:underline inline-flex items-center gap-2"
                >
                  View Dashboard
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="p-6 rounded-xl bg-[var(--hiwave-bg)] border border-[var(--hiwave-border)] hover:border-hiwave-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Detailed Reports</h3>
                <p className="text-[var(--hiwave-text-secondary)] mb-4">
                  Access comprehensive markdown reports with statistics on code changes, churn patterns, and
                  development velocity across the entire HiWave project.
                </p>
                <a
                  href="https://github.com/hiwavebrowser/hiwave/blob/master/churn-reports/report.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-hiwave-primary hover:underline inline-flex items-center gap-2"
                >
                  View Report
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </AnimatedSection>
          </div>

          <AnimatedSection delay={300}>
            <div className="p-6 rounded-xl bg-gradient-to-br from-hiwave-navy to-hiwave-navy-light text-white border border-slate-700">
              <h4 className="text-lg font-bold mb-3">What Can You Learn?</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-hiwave-primary-light mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Modification Hotspots</div>
                    <div className="text-gray-400">Files that change most frequently</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-hiwave-primary-light mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Development Patterns</div>
                    <div className="text-gray-400">Cross-platform synchronization trends</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-hiwave-primary-light mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">Active Areas</div>
                    <div className="text-gray-400">Where development is happening now</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckIcon className="w-5 h-5 text-hiwave-primary-light mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-semibold mb-1">File Evolution</div>
                    <div className="text-gray-400">How the codebase changes over time</div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-600 text-xs text-gray-400">
                Updated weekly via GitHub Actions
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center mb-12">
              <Badge variant="primary" className="mb-4">Support HiWave</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Love HiWave? Consider a Donation
              </h2>
              <p className="text-lg text-[var(--hiwave-text-secondary)] max-w-2xl mx-auto">
                HiWave is free and always will be. But if you find it valuable, your donation helps keep development going and ensures HiWave stays independent.
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-hiwave-navy to-hiwave-navy-light text-white border border-slate-700 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-hiwave-primary/10 to-hiwave-accent/10 rounded-2xl" />
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-hiwave-primary/20 flex items-center justify-center mx-auto mb-6">
                  <SparkleIcon className="w-8 h-8 text-hiwave-primary-light" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Support Independent Development</h3>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto">
                  Your donation goes directly towards development, server costs, and keeping HiWave ad-free and privacy-focused.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://github.com/sponsors/hiwavebrowser"
                    className="btn btn-primary px-8 py-4 text-lg shadow-glow hover:shadow-glow-lg"
                  >
                    <GitHubIcon className="w-5 h-5" />
                    Sponsor on GitHub
                  </a>
                  <a
                    href="https://ko-fi.com/hiwavebrowser"
                    className="btn px-8 py-4 text-lg border-2 border-white/30 text-white hover:bg-white/10"
                  >
                    Buy Me a Coffee
                  </a>
                </div>
                <p className="text-sm text-gray-500 mt-6">
                  No pressure — HiWave works the same whether you donate or not.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 border-y border-[var(--hiwave-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: 'Open Source', sublabel: 'MPL-2.0 Licensed' },
                { label: 'No Tracking', sublabel: 'Zero telemetry' },
                { label: 'Always Free', sublabel: 'No premium tiers' },
                { label: 'Privacy First', sublabel: 'Your data, your device' },
              ].map(item => (
                <div key={item.label}>
                  <div className="font-bold text-lg">{item.label}</div>
                  <div className="text-sm text-[var(--hiwave-text-muted)]">{item.sublabel}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why HiWave?
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="overflow-x-auto rounded-xl border border-[var(--hiwave-border)]">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[var(--hiwave-bg-secondary)]">
                    <th className="py-4 px-4 font-semibold"></th>
                    <th className="py-4 px-4 font-semibold text-center text-hiwave-primary">HiWave</th>
                    <th className="py-4 px-4 font-semibold text-center text-[var(--hiwave-text-muted)]">Chrome</th>
                    <th className="py-4 px-4 font-semibold text-center text-[var(--hiwave-text-muted)]">Firefox</th>
                    <th className="py-4 px-4 font-semibold text-center text-[var(--hiwave-text-muted)]">Arc</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--hiwave-border)]">
                  {[
                    { feature: 'Tab decay', hiwave: true, chrome: false, firefox: false, arc: false },
                    { feature: 'Built-in ad blocking', hiwave: true, chrome: false, firefox: false, arc: false },
                    { feature: 'No account required', hiwave: true, chrome: false, firefox: true, arc: false },
                    { feature: 'No telemetry', hiwave: true, chrome: false, firefox: false, arc: false },
                    { feature: 'Open source', hiwave: true, chrome: false, firefox: true, arc: false },
                    { feature: 'Completely free', hiwave: true, chrome: true, firefox: true, arc: true },
                  ].map(row => (
                    <tr key={row.feature} className="hover:bg-[var(--hiwave-bg-secondary)] transition-colors">
                      <td className="py-4 px-4">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.hiwave ? (
                          <CheckIcon className="w-5 h-5 text-hiwave-primary inline" />
                        ) : (
                          <span className="text-[var(--hiwave-text-muted)]">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.chrome ? (
                          <CheckIcon className="w-5 h-5 text-green-500 inline" />
                        ) : (
                          <span className="text-[var(--hiwave-text-muted)]">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.firefox ? (
                          <CheckIcon className="w-5 h-5 text-green-500 inline" />
                        ) : (
                          <span className="text-[var(--hiwave-text-muted)]">—</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.arc ? (
                          <CheckIcon className="w-5 h-5 text-green-500 inline" />
                        ) : (
                          <span className="text-[var(--hiwave-text-muted)]">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-24 bg-[var(--hiwave-bg-secondary)]">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Roadmap
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              { version: 'v1.0', date: 'Q1 2025', features: 'Core browser, The Shelf, Workspaces, Flow Shield, Flow Vault', status: 'current' },
              { version: 'v2.0', date: 'Q2 2025', features: 'Reader Mode, Picture-in-Picture, Auto-fill, Themes', status: 'next' },
              { version: 'v3.0', date: 'Q4 2025', features: 'Cross-device Sync, DevTools', status: 'future' },
              { version: 'v4.0+', date: '2026', features: 'Community-driven features', status: 'future' },
            ].map((item, i) => (
              <AnimatedSection key={item.version} delay={i * 100}>
                <div className={`p-6 rounded-xl bg-[var(--hiwave-bg)] border-2 transition-all ${
                  item.status === 'current'
                    ? 'border-hiwave-primary shadow-glow'
                    : 'border-[var(--hiwave-border)]'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-20 font-bold text-2xl">{item.version}</div>
                    <div className="md:w-24">
                      {item.status === 'current' && <Badge variant="success">Current</Badge>}
                      {item.status === 'next' && <Badge variant="primary">Next</Badge>}
                      {item.status === 'future' && <Badge variant="secondary">{item.date}</Badge>}
                    </div>
                    <div className="flex-1 text-[var(--hiwave-text-secondary)]">
                      {item.features}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={400}>
            <p className="text-center text-sm text-[var(--hiwave-text-muted)] mt-8">
              Want to influence the roadmap?{' '}
              <a href="https://hiwave.canny.io" className="link">
                Vote on features
              </a>
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the HiWave Community
            </h2>
            <p className="text-lg text-[var(--hiwave-text-secondary)] mb-10">
              Built independently. No ads. No tracking. No corporate agenda.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/hiwavebrowser"
                className="btn btn-secondary flex items-center gap-2"
              >
                <GitHubIcon className="w-5 h-5" />
                View on GitHub
              </a>
              <a
                href="https://hiwave.canny.io"
                className="btn btn-secondary flex items-center gap-2"
              >
                <SparkleIcon className="w-5 h-5" />
                Vote on Features
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-hero-gradient text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to browse differently?
            </h2>
            <p className="text-xl text-gray-400 mb-10">
              Download HiWave for free and experience a calmer web.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a
                href="https://github.com/hiwavebrowser/hiwave/releases/latest"
                className="btn btn-primary text-lg px-8 py-4 bg-white text-hiwave-navy hover:bg-gray-100"
              >
                <DownloadIcon className="w-5 h-5" />
                Download for Free
              </a>
              <a
                href="https://github.com/hiwavebrowser/hiwave/releases/tag/nightly"
                className="btn text-lg px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10"
              >
                <DownloadIcon className="w-5 h-5" />
                Nightly Builds
              </a>
              <a
                href="https://github.com/hiwavebrowser"
                className="btn text-lg px-8 py-4 border-2 border-white/30 text-white hover:bg-white/10"
              >
                <GitHubIcon className="w-5 h-5" />
                View Source Code
              </a>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <div className="flex items-center justify-center gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <AppleIcon className="w-5 h-5" />
                <span className="text-sm">macOS 12+</span>
              </div>
              <div className="flex items-center gap-2">
                <WindowsIcon className="w-5 h-5" />
                <span className="text-sm">Windows 10+</span>
              </div>
              <div className="flex items-center gap-2">
                <LinuxIcon className="w-5 h-5" />
                <span className="text-sm">Linux (Ubuntu/Fedora/Arch)</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hiwave-navy border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-xl font-bold text-white">HiWave</div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              <a href="https://github.com/hiwavebrowser" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://hiwave.canny.io" className="hover:text-white transition-colors">Feedback</a>
              <a href="#donate" className="hover:text-white transition-colors">Donate</a>
              <a href="mailto:support@hiwavebrowser.com" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500 italic mb-4">
              Built independently. No ads. No tracking. No corporate agenda.
            </p>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} HiWave. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
