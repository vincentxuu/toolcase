import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'

export default function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale)

  return (
    <footer className="border-t border-[var(--color-border)] px-4 py-8 mt-16 text-center text-[var(--color-text-secondary)] text-sm">
      <p>{t.footer_text}</p>
    </footer>
  )
}
