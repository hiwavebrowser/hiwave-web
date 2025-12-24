'use client'

import { useState } from 'react'

interface License {
  license_key: string
  tier: string
  tier_display: string
  purchased_major_version: number
  versions_included: number
  entitled_through_version: number
  created_at: string
}

export default function RecoverPage() {
  const [email, setEmail] = useState('')
  const [licenses, setLicenses] = useState<License[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSearched(true)

    try {
      const res = await fetch('/api/recover-license', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await res.json()
      setLicenses(data.licenses || [])
    } catch {
      setLicenses([])
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">Recover Your License</h1>
        <p className="text-gray-600 mb-8 text-center">
          Enter the email address you used when purchasing Zen Browser Pro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Searching...' : 'Find My License'}
          </button>
        </form>

        {searched && licenses !== null && (
          <div className="space-y-4">
            {licenses.length === 0 ? (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <p className="text-gray-600 mb-2">
                  No licenses found for this email.
                </p>
                <p className="text-sm text-gray-500">
                  Make sure you're using the same email address from your purchase.
                </p>
              </div>
            ) : (
              <>
                <p className="text-green-600 font-medium">
                  Found {licenses.length} license{licenses.length > 1 ? 's' : ''}:
                </p>
                {licenses.map((lic, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-900">
                        {lic.tier_display}
                      </span>
                      <span className="text-xs text-gray-500">
                        Valid through v{lic.entitled_through_version}
                      </span>
                    </div>
                    <code className="block text-sm font-mono text-gray-700 break-all mb-3 bg-gray-50 p-2 rounded">
                      {lic.license_key}
                    </code>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Purchased: {new Date(lic.created_at).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => copyToClipboard(lic.license_key)}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        {copiedKey === lic.license_key ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <a href="/" className="text-blue-600 hover:underline">
            ← Back to home
          </a>
        </div>
      </div>
    </main>
  )
}
