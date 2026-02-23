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
      className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] mb-4"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && <ChevronRight size={14} className="opacity-50" />}
            {isLast || !item.href ? (
              <span
                className={isLast ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-secondary)]'}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-[var(--color-text-secondary)] no-underline hover:text-[var(--color-text)]"
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
