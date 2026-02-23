import { Metadata } from 'next'
import CountryCodeLookup from '@/components/tools/CountryCodeLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '國際電話區碼 - 國際撥號代碼查詢 | toolcase',
  description: '查詢任何國家的國際撥號代碼。快速搜尋國家電話區號，包含國旗和國家名稱。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/country-code-lookup', languages: { en: 'https://toolcase.cc/everyday/country-code-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/country-code-lookup' } },
}

const faqs = [
  { question: '如何使用國際撥號代碼？', answer: '要撥打國際電話，請先撥您所在國家的國際冠碼（例如台灣為 002），然後撥國家代碼（例如英國為 +44），最後撥當地電話號碼（去掉開頭的 0）。' },
  { question: '為什麼有些國家的代碼相同？', answer: '一些國家共用相同的撥號代碼。例如，美國和加拿大都使用 +1，而一些領土與其母國共用代碼。' },
  { question: '可以按撥號代碼搜尋嗎？', answer: '可以！您可以按國家名稱、國家代碼（US、GB 等）或撥號代碼（+44、+1 等）搜尋。' },
]

export default function CountryCodeLookupPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '國際電話區碼', url: 'https://toolcase.cc/zh-tw/everyday/country-code-lookup' },
        ]}
      />
      <ToolSchema
        name="國際電話區碼"
        description="查詢任何國家的國際撥號代碼。快速搜尋國家電話區號，包含國旗和國家名稱。"
        url="https://toolcase.cc/zh-tw/everyday/country-code-lookup"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '國際電話區碼' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>國際電話區碼</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>查詢世界各國的國際撥號代碼。</p>
      <CountryCodeLookup
        labels={{
          title: '國際電話區碼',
          searchPlaceholder: '搜尋國家或區碼...',
          country: '國家',
          dialCode: '區碼',
          flag: '國旗',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>瀏覽列表或使用搜尋框查找特定國家。表格顯示每個國家的國旗、名稱和國際撥號代碼。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="country-code-lookup" locale="zh-tw" />
    </div>
    </>
  )
}
