import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';

// CSS
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '- Dashboard -',
  description: 'EasyLife Dashboard',
}

// Root / Main Page
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}