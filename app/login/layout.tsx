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
        <script src="https://code.jquery.com/jquery-3.7.0.js" />
        <script src="https://cdn.jsdelivr.net/npm/animejs@3.0.1/lib/anime.min.js" />
      </head>
      <body className={inter.className}>
        {children}
        </body>
    </html>
  )
}

function Hello() {
  console.log("Hello")
}