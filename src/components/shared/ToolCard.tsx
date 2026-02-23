'use client'
import Link from 'next/link'
import ToolIcon from '@/components/shared/ToolIcon'
import { getToolPath } from '@/lib/tool-url'

interface ToolCardProps {
  slug: string
  name: string
  description: string
  icon: string
  locale: 'en' | 'zh-tw'
  badge?: 'new' | 'popular' | 'featured'
}

export default function ToolCard({ slug, name, description, icon, locale, badge }: ToolCardProps) {
  const href = getToolPath(slug, locale)

  // Badge 樣式配置
  const badgeClasses: Record<NonNullable<ToolCardProps['badge']>, string> = {
    new: 'bg-[var(--color-success)] text-white',
    popular: 'bg-[var(--color-accent)] text-white',
    featured: 'bg-[var(--color-primary)] text-white',
  }

  const badgeLabels: Record<NonNullable<ToolCardProps['badge']>, string> = {
    new: locale === 'en' ? 'New' : '新',
    popular: locale === 'en' ? 'Popular' : '熱門',
    featured: locale === 'en' ? 'Featured' : '精選',
  }

  return (
    <Link
      href={href}
      className="block p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] no-underline text-[var(--color-text)] transition-all hover:border-[var(--color-primary)] hover:shadow-[0_4px_12px_rgba(37,99,235,0.1)] relative group"
    >
      {badge && (
        <div
          className={`absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-semibold ${badgeClasses[badge]}`}
        >
          {badgeLabels[badge]}
        </div>
      )}
      <div className="mb-2">
        <ToolIcon name={icon} size={28} />
      </div>
      <h3 className="text-base font-semibold mb-1">{name}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] m-0">{description}</p>
    </Link>
  )
}
