// Made Wednesday, December 20th, 2023

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/public/scripts/main.js'
// Css

const inter = Inter({ subsets: ['latin'] })
// site Head
export const metadata: Metadata = {
  title: '- Solitaire -',
  description: 'EasyLife Solitaire',
}
// Solitaire Page
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://code.jquery.com/jquery-3.7.0.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

