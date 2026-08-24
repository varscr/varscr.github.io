import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://varscr.github.io'),
  title: 'Fabio Vargas — AI & Full-Stack Engineer',
  description:
    'AI and full-stack engineer. Multi-agent conversational platforms on FastAPI, production TypeScript, and Linux operations.',
  openGraph: {
    title: 'Fabio Vargas — AI & Full-Stack Engineer',
    description:
      'AI and full-stack engineer. Multi-agent conversational platforms on FastAPI, production TypeScript, and Linux operations.',
    url: 'https://varscr.github.io',
    siteName: 'Fabio Vargas',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
