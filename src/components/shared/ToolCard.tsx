'use client'
import Link from 'next/link'

interface ToolCardProps {
  slug: string
  name: string
  description: string
  icon: string
  locale: 'en' | 'zh-tw'
}

export default function ToolCard({ slug, name, description, icon, locale }: ToolCardProps) {
  const prefix = locale === 'en' ? '' : `/${locale}`

  return (
    <Link
      href={`${prefix}/${slug}`}
      style={{
        display: 'block',
        padding: '1.25rem',
        borderRadius: '0.75rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-card)',
        textDecoration: 'none',
        color: 'var(--color-text)',
        transition: 'box-shadow 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-primary)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.1)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--color-border)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{icon}</div>
      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{name}</h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>{description}</p>
    </Link>
  )
}
