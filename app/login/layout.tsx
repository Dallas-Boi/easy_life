import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// CSS

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '- Login -',
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