'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function setLocaleCookie(locale: string) {
  document.cookie = `preferred-locale=${locale};path=/;max-age=${60 * 60 * 24 * 365}`
}

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
      onClick={() => setLocaleCookie(switchTo)}
      className="px-3 py-1.5 rounded border border-[var(--color-border)] text-[var(--color-text)] no-underline text-sm font-medium hover:bg-[var(--color-bg-secondary)]"
    >
      {label}
    </Link>
  )
}
