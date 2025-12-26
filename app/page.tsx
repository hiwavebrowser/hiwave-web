'use client'

import { useEffect, useState } from 'react'

interface EarlyAdopterSlots {
  total: number
  claimed: number
  remaining: number
  available: boolean
}

export default function Home() {
  const [earlyAdopterSlots, setEarlyAdopterSlots] = useState<EarlyAdopterSlots | null>(null)

  useEffect(() => {
    fetch('/api/early-adopter-slots')
      .then(res => res.json())
      .then(data => setEarlyAdopterSlots(data))
      .catch(console.error)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            HiWave
          </h1>
          <p className="text-2xl md:text-3xl text-gray-300 font-light mb-4">
            A browser that gets out of your way.
          </p>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
            Privacy-first browsing with intelligent tab management.
            No clutter. No tracking. No distractions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/petec4244/HiWave/releases/latest"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Download Free
            </a>
            <a
              href="#pricing"
              className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Support Development
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Windows 10+ &middot; macOS 12+ &middot; Linux
          </p>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-6">
            The Problem
          </h2>
          <p className="text-xl text-gray-600 text-center leading-relaxed">
            Your browser is cluttered. Hundreds of tabs you'll never revisit.
            Bookmarks you forgot exist. Ads everywhere. Trackers following you across the web.
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            The Solution
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            HiWave is a privacy-first browser built on one principle: <strong>less is more.</strong>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tabs decay naturally</h3>
                <p className="text-gray-600">Unused tabs fade to The Shelf, keeping your workspace clean without losing anything.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Workspaces replace bookmarks</h3>
                <p className="text-gray-600">Organize by context (Work, Personal, Research), not folders you'll never open.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ads blocked by default</h3>
                <p className="text-gray-600">800,000+ domains blocked out of the box. No extensions needed.</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your data stays yours</h3>
                <p className="text-gray-600">No telemetry. No tracking. No account required.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Free Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What's Free (Forever)
          </h2>
          <p className="text-lg text-gray-600 text-center mb-4">
            This is a complete browser, not a trial.
          </p>
          <p className="text-sm text-gray-500 text-center mb-12">
            All core features are free forever. No strings attached.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">🌐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Core Browsing</h3>
              <p className="text-sm text-gray-600">Tabs, navigation, search — everything you expect from a browser.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">📚</div>
              <h3 className="font-semibold text-gray-900 mb-2">The Shelf</h3>
              <p className="text-sm text-gray-600">Tabs decay over time, stay findable, never lost. Less clutter, zero guilt.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">🗂️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Workspaces</h3>
              <p className="text-sm text-gray-600">Context-based organization with page locking. Switch modes, not mindsets.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">🛡️</div>
              <h3 className="font-semibold text-gray-900 mb-2">Flow Shield</h3>
              <p className="text-sm text-gray-600">Built-in ad and tracker blocking at Pi-hole level. Fast, private, automatic.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">🔐</div>
              <h3 className="font-semibold text-gray-900 mb-2">Flow Vault</h3>
              <p className="text-sm text-gray-600">Encrypted password storage that lives locally. Your secrets, your device.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="text-2xl mb-3">📥</div>
              <h3 className="font-semibold text-gray-900 mb-2">Import Your Data</h3>
              <p className="text-sm text-gray-600">Bring your Chrome or Firefox bookmarks, history, and passwords.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pro Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            What Your Support Unlocks
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            One-time payment. No subscription. Features stay unlocked forever.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">🎨</div>
              <h3 className="font-semibold mb-2">Themes</h3>
              <p className="text-sm text-gray-300">Light mode, dark mode, custom colors. Make it yours.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">📖</div>
              <h3 className="font-semibold mb-2">Reader Mode</h3>
              <p className="text-sm text-gray-300">Distraction-free article reading. Just the content.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">📺</div>
              <h3 className="font-semibold mb-2">Picture-in-Picture</h3>
              <p className="text-sm text-gray-300">Floating video while you browse. Multitask effortlessly.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">⚡</div>
              <h3 className="font-semibold mb-2">Auto-fill</h3>
              <p className="text-sm text-gray-300">Passwords and forms, filled securely. Save time everywhere.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">📊</div>
              <h3 className="font-semibold mb-2">Flow Report</h3>
              <p className="text-sm text-gray-300">Weekly browsing wellness digest. Understand your habits.</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 rounded-xl">
              <div className="text-2xl mb-3">☁️</div>
              <h3 className="font-semibold mb-2">HiWave Sync</h3>
              <p className="text-sm text-gray-300">Workspaces & vault across devices. Seamless continuity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Pricing
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            One-time payment, not a subscription. After your version window, existing features stay unlocked.
            You just won't get new paid features without funding the new development.
          </p>

          {/* Early Adopter Banner */}
          {earlyAdopterSlots?.available && (
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-6 rounded-2xl mb-8 text-center">
              <div className="text-sm font-medium uppercase tracking-wide mb-2">Limited Time Offer</div>
              <h3 className="text-2xl font-bold mb-2">Early Supporter Bonus</h3>
              <p className="text-amber-100 mb-4">
                Any payment during alpha/beta = <strong>4 major versions</strong> included!
              </p>
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                <span className="font-bold">{earlyAdopterSlots.remaining}</span>
                <span className="text-amber-100">of {earlyAdopterSlots.total} Founder spots remaining</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Early Adopter */}
            {earlyAdopterSlots?.available && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-300 relative order-first md:order-none">
                <div className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  FOUNDER EDITION
                </div>
                <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">Early Adopter</h3>
                <div className="text-3xl font-bold text-gray-900 mb-1">Pay What You Want</div>
                <div className="text-sm text-gray-600 mb-4">Minimum $1</div>
                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">✓</span> 4 major versions included
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">✓</span> Founder recognition
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">✓</span> All Pro features
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-amber-500">✓</span> Priority support
                  </li>
                </ul>
                <a
                  href={process.env.NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER || '#'}
                  className="block w-full bg-amber-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Become a Founder
                </a>
              </div>
            )}

            {/* Starter */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Starter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">$10</div>
              <div className="text-sm text-gray-600 mb-4">One-time payment</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 1 major version included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> All Pro features
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Email support
                </li>
              </ul>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER || '#'}
                className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Starter
              </a>
            </div>

            {/* Supporter */}
            <div className="bg-white p-6 rounded-xl border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900">Supporter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">$15</div>
              <div className="text-sm text-gray-600 mb-4">One-time payment</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> 3 major versions included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> All Pro features
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-500">✓</span> Priority support
                </li>
              </ul>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_LINK_SUPPORTER || '#'}
                className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
              >
                Get Supporter
              </a>
            </div>

            {/* Believer */}
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Believer</h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">$20</div>
              <div className="text-sm text-gray-600 mb-4">One-time payment</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> 5 major versions included
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> All Pro features
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Priority support
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Feature voting access
                </li>
              </ul>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_LINK_BELIEVER || '#'}
                className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Get Believer
              </a>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            A revolutionary way to pay for only what you want and keep what you love.
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Why HiWave?
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 px-4 font-semibold text-gray-900"></th>
                  <th className="py-4 px-4 font-semibold text-gray-900 text-center">HiWave</th>
                  <th className="py-4 px-4 font-semibold text-gray-500 text-center">Chrome</th>
                  <th className="py-4 px-4 font-semibold text-gray-500 text-center">Firefox</th>
                  <th className="py-4 px-4 font-semibold text-gray-500 text-center">Arc</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="py-4 px-4 text-gray-700">Tab decay</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Built-in ad blocking</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">No account required</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-green-500">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">No telemetry</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">Open source</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-green-500">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-gray-700">One-time payment</td>
                  <td className="py-4 px-4 text-center text-green-500 font-bold">✓</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                  <td className="py-4 px-4 text-center text-gray-300">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Roadmap
          </h2>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border-2 border-green-500 relative">
              <div className="absolute -top-3 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                CURRENT
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-24 font-bold text-2xl text-gray-900">v1.0</div>
                <div className="md:w-24 text-sm text-gray-500">Q1 2025</div>
                <div className="flex-1 text-gray-700">
                  Core browser, The Shelf, Workspaces, Flow Shield, Flow Vault
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-24 font-bold text-2xl text-gray-900">v2.0</div>
                <div className="md:w-24 text-sm text-gray-500">Q2 2025</div>
                <div className="flex-1 text-gray-700">
                  Reader Mode, Picture-in-Picture, Auto-fill, Themes
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-24 font-bold text-2xl text-gray-900">v3.0</div>
                <div className="md:w-24 text-sm text-gray-500">Q4 2025</div>
                <div className="flex-1 text-gray-700">
                  Cross-device Sync, DevTools
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="md:w-24 font-bold text-2xl text-gray-400">v4.0+</div>
                <div className="md:w-24 text-sm text-gray-500">2026</div>
                <div className="flex-1 text-gray-500">
                  Community-driven features
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-8">
            Full roadmap available at <a href="https://getHiWave.io/roadmap" className="text-blue-600 hover:underline">getHiWave.io/roadmap</a>
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to browse differently?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Download HiWave for free and experience a calmer web.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/petec4244/HiWave/releases/latest"
              className="inline-block bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Download for Free
            </a>
            <a
              href="https://github.com/petec4244/HiWave"
              className="inline-block border-2 border-white/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              View Source Code
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-6">
            Windows 10+ &middot; macOS 12+ &middot; Linux
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400 mb-8">
            <a href="https://github.com/petec4244/HiWave" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://getHiWave.io/roadmap" className="hover:text-white transition-colors">Roadmap</a>
            <a href="https://HiWave.canny.io" className="hover:text-white transition-colors">Feedback</a>
            <a href="/recover" className="hover:text-white transition-colors">Recover License</a>
            <a href="mailto:support@HiWave.app" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-center text-sm text-gray-500 italic">
            Built independently. No ads. No tracking. No corporate agenda.
          </p>
          <p className="text-center text-xs text-gray-600 mt-4">
            &copy; {new Date().getFullYear()} HiWave. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  )
}
