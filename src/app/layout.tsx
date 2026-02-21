import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'toolcase — Free Online Tools for Everyone',
  description:
    'Free online tools: JSON formatter, QR code generator, calculators, image tools, unit converters and more.',
  alternates: {
    canonical: 'https://toolcase.cc',
    languages: {
      en: 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar locale="en" />
        {children}
        <Footer locale="en" />
      </body>
    </html>
  )
}
