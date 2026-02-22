import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1rem',
      }}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {index > 0 && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
            {isLast || !item.href ? (
              <span
                style={{
                  color: isLast ? 'var(--color-text)' : 'var(--color-text-secondary)',
                  fontWeight: isLast ? 500 : 400,
                }}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                style={{
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
