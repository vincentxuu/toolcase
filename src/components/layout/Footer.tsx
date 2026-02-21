import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '2rem 1rem',
        marginTop: '4rem',
        textAlign: 'center',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href={`${prefix}/about`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            {t.footer_about}
          </Link>
          <Link href={`${prefix}/privacy`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            {t.footer_privacy}
          </Link>
          <Link href={`${prefix}/terms`} style={{ color: 'var(--color-text-secondary)', textDecoration: 'none' }}>
            {t.footer_terms}
          </Link>
        </div>
        <p>{t.footer_text}</p>
      </div>
    </footer>
  )
}
