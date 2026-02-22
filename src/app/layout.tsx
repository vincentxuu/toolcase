import type { Metadata } from 'next'
import Script from 'next/script'
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
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {adClient && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adClient}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const html = document.documentElement;
                  if (theme === 'dark' || theme === 'light') {
                    html.classList.add(theme);
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    html.classList.add(prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
