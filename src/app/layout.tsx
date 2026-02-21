import type { Metadata } from 'next'
import '@/styles/globals.css'

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
      <body>{children}</body>
    </html>
  )
}
