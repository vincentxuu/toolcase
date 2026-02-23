import { Metadata } from 'next'
import { getDictionary } from '@/i18n/get-dict'
import { tools } from '@/lib/tools-config'
import CategoryNav from '@/components/navigation/CategoryNav'
import FeaturedToolsSection from '@/components/sections/FeaturedToolsSection'
import PopularToolsSection from '@/components/sections/PopularToolsSection'
import NewToolsSection from '@/components/sections/NewToolsSection'
import CategoryGridSection from '@/components/sections/CategoryGridSection'

export const metadata: Metadata = {
  title: 'toolcase — Free Online Tools for Everyone',
  description:
    'Free online tools: JSON formatter, QR code generator, calculators, image tools, unit converters and more. 150+ tools, no sign-up required, works in your browser.',
  keywords: [
    'online tools',
    'free tools',
    'web tools',
    'JSON formatter',
    'QR code generator',
    'calculator',
    'converter',
    'image tools',
    'developer tools',
  ],
  alternates: {
    canonical: 'https://toolcase.cc',
    languages: {
      en: 'https://toolcase.cc',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw',
    },
  },
}

export default function HomePage() {
  const t = getDictionary('en')
  const toolCount = tools.length
  const heroTitle2 = t.hero_title_2.replace('{count}', String(toolCount))
  const heroDesc = t.hero_desc.replace('{count}', String(toolCount))

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Section - 保留現有 */}
      <section className="text-center py-12">
        <span className="inline-block px-4 py-1.5 rounded-full bg-[rgba(37,99,235,0.1)] text-[var(--color-primary)] text-sm font-medium mb-6">
          {t.hero_badge}
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
          {t.hero_title_1}
          <br />
          <span className="text-[var(--color-primary)]">{heroTitle2}</span>
        </h1>
        <p className="text-[var(--color-text-secondary)] text-lg max-w-[600px] mx-auto mb-8">
          {heroDesc}
        </p>
        <div className="flex justify-center gap-8 flex-wrap">
          <div>
            <div className="text-2xl font-bold">{toolCount}+</div>
            <div className="text-sm text-[var(--color-text-secondary)]">{t.stat_tools}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0</div>
            <div className="text-sm text-[var(--color-text-secondary)]">{t.stat_signup}</div>
          </div>
          <div>
            <div className="text-2xl font-bold">&lt;1s</div>
            <div className="text-sm text-[var(--color-text-secondary)]">{t.stat_load}</div>
          </div>
        </div>
      </section>

      {/* Category Quick Nav - 新增 */}
      <CategoryNav locale="en" />

      {/* Featured Tools - 新增 */}
      <FeaturedToolsSection locale="en" />

      {/* Popular Tools - 新增 */}
      <PopularToolsSection locale="en" />

      {/* New Tools - 新增 */}
      <NewToolsSection locale="en" />

      {/* Category Grid - 新增 */}
      <CategoryGridSection locale="en" />
    </div>
  )
}
