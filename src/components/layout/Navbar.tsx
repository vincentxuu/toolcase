'use client'
import Link from 'next/link'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import LangSwitcher from './LangSwitcher'
import ThemeToggle from './ThemeToggle'
import SearchBar from '@/components/search/SearchBar'

export default function Navbar({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)
  const prefix = locale === 'en' ? '' : `/${locale}`

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg)] sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href={`${prefix}/`}
          className="text-xl font-bold text-[var(--color-text)] no-underline flex items-center gap-2 shrink-0"
        >
          <span className="text-2xl">🧰</span>
          <span className="hidden md:inline">{t.site_name}</span>
        </Link>

        {/* Search Bar - 隱藏在小螢幕 */}
        <div className="hidden md:block flex-1 max-w-[500px]">
          <SearchBar locale={locale} variant="navbar" />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <ThemeToggle />
          <LangSwitcher locale={locale} />
        </div>
      </div>
    </nav>
  )
}
