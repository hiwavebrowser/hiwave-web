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
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Zen Browser
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
          A calmer way to browse. Reduce cognitive load with The Shelf,
          intelligent tab management, and distraction-free workspaces.
        </p>
        <a
          href="https://github.com/your-repo/releases/latest"
          className="inline-block bg-gray-900 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800 transition-colors"
        >
          Download Alpha (Free)
        </a>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">The Shelf</h3>
            <p className="text-gray-600">
              Tabs gracefully decay over time. Keep what matters, let go of the rest.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Workspaces</h3>
            <p className="text-gray-600">
              Context-switch without losing your place. Separate work, research, and personal.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
            <p className="text-gray-600">
              No telemetry, no tracking. Your browsing stays yours.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-4">Support Development</h2>
        <p className="text-gray-600 text-center mb-12 max-w-xl mx-auto">
          Zen Browser is free to use. Support development and unlock Pro features for future versions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Early Adopter */}
          {earlyAdopterSlots?.available && (
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border-2 border-amber-200 relative">
              <div className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                LIMITED: {earlyAdopterSlots.remaining} of {earlyAdopterSlots.total} left
              </div>
              <h3 className="text-xl font-bold mt-2 mb-2">Early Adopter</h3>
              <div className="text-3xl font-bold mb-1">Pay What You Want</div>
              <div className="text-sm text-gray-600 mb-4">Min $1</div>
              <ul className="text-sm text-gray-700 space-y-2 mb-6">
                <li>✓ 4 major versions included</li>
                <li>✓ Founder recognition</li>
                <li>✓ Support indie development</li>
              </ul>
              <a
                href={process.env.NEXT_PUBLIC_STRIPE_LINK_EARLY_ADOPTER}
                className="block w-full bg-amber-500 text-white text-center py-3 rounded-lg font-medium hover:bg-amber-600 transition-colors"
              >
                Become a Founder
              </a>
            </div>
          )}

          {/* Starter */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="text-3xl font-bold mb-1">$10</div>
            <div className="text-sm text-gray-600 mb-4">One-time</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>✓ 1 major version included</li>
              <li>✓ All Pro features</li>
              <li>✓ Email support</li>
            </ul>
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_LINK_STARTER}
              className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Starter
            </a>
          </div>

          {/* Supporter */}
          <div className="bg-white p-6 rounded-xl border-2 border-blue-500 relative">
            <div className="absolute -top-3 left-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              BEST VALUE
            </div>
            <h3 className="text-xl font-bold mt-2 mb-2">Supporter</h3>
            <div className="text-3xl font-bold mb-1">$15</div>
            <div className="text-sm text-gray-600 mb-4">One-time</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>✓ 3 major versions included</li>
              <li>✓ All Pro features</li>
              <li>✓ Priority support</li>
            </ul>
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_LINK_SUPPORTER}
              className="block w-full bg-blue-500 text-white text-center py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Get Supporter
            </a>
          </div>

          {/* Believer */}
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold mb-2">Believer</h3>
            <div className="text-3xl font-bold mb-1">$20</div>
            <div className="text-sm text-gray-600 mb-4">One-time</div>
            <ul className="text-sm text-gray-700 space-y-2 mb-6">
              <li>✓ 5 major versions included</li>
              <li>✓ All Pro features</li>
              <li>✓ Priority support</li>
              <li>✓ Feature voting access</li>
            </ul>
            <a
              href={process.env.NEXT_PUBLIC_STRIPE_LINK_BELIEVER}
              className="block w-full bg-gray-900 text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Get Believer
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-gray-100">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
          <a href="https://github.com/your-repo" className="hover:text-gray-900">GitHub</a>
          <a href="https://zen-browser.canny.io" className="hover:text-gray-900">Feedback</a>
          <a href="/recover" className="hover:text-gray-900">Recover License</a>
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">
          © {new Date().getFullYear()} Zen Browser. Built with focus.
        </p>
      </footer>
    </main>
  )
}
