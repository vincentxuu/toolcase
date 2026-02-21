'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function LangSwitcher({ locale }: { locale: 'en' | 'zh-tw' }) {
  const pathname = usePathname()

  const switchTo = locale === 'en' ? 'zh-tw' : 'en'
  const currentPath = locale === 'en'
    ? pathname
    : pathname.replace('/zh-tw', '') || '/'

  const targetPath = switchTo === 'en'
    ? currentPath || '/'
    : `/zh-tw${currentPath === '/' ? '' : currentPath}`

  const label = switchTo === 'en' ? 'EN' : '繁'

  return (
    <Link
      href={targetPath}
      style={{
        padding: '0.375rem 0.75rem',
        borderRadius: '0.375rem',
        border: '1px solid var(--color-border)',
        color: 'var(--color-text)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
      }}
    >
      {label}
    </Link>
  )
}
