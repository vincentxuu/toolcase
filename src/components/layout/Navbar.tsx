import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import LangSwitcher from './LangSwitcher'

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0.75rem 1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href={`${prefix}/`}
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--color-text)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>🧰</span>
          {t.site_name}
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LangSwitcher locale={locale} />
        </div>
      </div>
    </nav>
  )
}
