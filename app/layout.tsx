import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'HiWave - A Calmer Way to Browse',
  description: 'Privacy-first browser with intelligent tab management and distraction-free workspaces. No tracking. No clutter.',
  keywords: ['browser', 'privacy', 'tab management', 'productivity', 'open source'],
  authors: [{ name: 'HiWave' }],
  openGraph: {
    title: 'HiWave - A Calmer Way to Browse',
    description: 'Privacy-first browser with intelligent tab management and distraction-free workspaces.',
    url: 'https://hiwavebrowser.com',
    siteName: 'HiWave Browser',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HiWave - A Calmer Way to Browse',
    description: 'Privacy-first browser with intelligent tab management and distraction-free workspaces.',
  },
}

// Script to prevent flash of incorrect theme
const themeScript = `
  (function() {
    const savedTheme = localStorage.getItem('hiwave-theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  )
}
