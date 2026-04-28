import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TuroEscape - Stop Giving Turo 40% of Your Money',
  description: 'Calculate how much more you could earn by taking your car rental business private. Free calculator for Turo hosts.',
  openGraph: {
    title: 'TuroEscape - Stop Giving Turo 40% of Your Money',
    description: 'Calculate how much more you could earn by taking your car rental business private.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}