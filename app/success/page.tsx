'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

interface LicenseData {
  license_key: string
  email: string
  tier: string
  tier_display: string
  purchased_major_version: number
  versions_included: number
  entitled_through_version: number
  amount_paid: number
}

function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [license, setLicense] = useState<LicenseData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided')
      setLoading(false)
      return
    }

    fetch(`/api/get-license-from-session?session_id=${sessionId}`)
      .then(res => res.json())
      .then(data => {
        if (data.license_key) {
          setLicense(data)
        } else {
          setError(data.error || 'Could not retrieve license. Please contact support.')
        }
      })
      .catch(() => setError('Failed to fetch license'))
      .finally(() => setLoading(false))
  }, [sessionId])

  const copyToClipboard = () => {
    if (license) {
      navigator.clipboard.writeText(license.license_key)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-lg w-full text-center">
        {loading && (
          <>
            <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Processing your purchase...</h1>
            <p className="text-gray-600">Retrieving your license key</p>
          </>
        )}

        {error && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">!</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h1>
            <p className="text-red-600 mb-6">{error}</p>
            <a
              href="mailto:support@HiWave.app"
              className="text-blue-600 hover:underline"
            >
              Contact Support
            </a>
          </>
        )}

        {license && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✓</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You!</h1>
            <p className="text-gray-600 mb-2">
              Welcome to the {license.tier_display} tier!
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Your license is valid through version {license.entitled_through_version}
            </p>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
              <p className="text-sm text-gray-500 mb-2">Your License Key</p>
              <code className="block text-lg font-mono text-gray-900 break-all mb-4">
                {license.license_key}
              </code>
              <button
                onClick={copyToClipboard}
                className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left text-sm">
              <p className="font-medium text-amber-800 mb-2">Save this key!</p>
              <p className="text-amber-700">
                We've sent a copy to <strong>{license.email}</strong>, but you should
                save this key somewhere safe. You'll need it to activate Pro features
                in HiWave.
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <p className="text-sm text-gray-600">
                Enter this key in HiWave → Settings → License to unlock Pro features.
              </p>
              <a
                href="/"
                className="inline-block text-blue-600 hover:underline"
              >
                ← Back to home
              </a>
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-200 border-t-green-500 rounded-full animate-spin"></div>
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}
