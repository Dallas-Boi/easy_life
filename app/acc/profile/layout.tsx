import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link';

// CSS
import '@/styles/profile.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '- Sign Up -',
  description: 'EasyLife SignUp',
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