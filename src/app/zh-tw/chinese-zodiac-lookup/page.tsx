import { Metadata } from 'next'
import ChineseZodiacLookup from '@/components/tools/ChineseZodiacLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '生肖查詢 - 輸入出生年查生肖與五行 | toolcase',
  description: '輸入出生年份立即查詢你的生肖！提供十二生肖五行屬性、性格特質、相合相沖完整對照表。免費線上生肖查詢工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/chinese-zodiac-lookup', languages: { en: 'https://toolcase.cc/chinese-zodiac-lookup', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/chinese-zodiac-lookup' } },
}

const faqs = [
  { question: '生肖是怎麼算的？', answer: '十二生肖以 12 年為一個循環，依序為：鼠、牛、虎、兔、龍、蛇、馬、羊、猴、雞、狗、豬。用出生年份除以 12 的餘數來判斷對應的生肖。' },
  { question: '五行是什麼？', answer: '五行為金、水、木、火、土，與天干地支搭配形成六十甲子循環。每兩年對應一個五行元素，例如庚辛年屬金、壬癸年屬水。五行代表不同的能量特質。' },
  { question: '生肖相合相沖是什麼意思？', answer: '生肖相合指兩個生肖之間性格互補、相處和諧；相沖則指兩者性格可能產生衝突。這是傳統民俗文化的參考，實際人際關係仍取決於個人特質與相處方式。' },
]

export default function ChineseZodiacLookupPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '生肖查詢', url: 'https://toolcase.cc/zh-tw/chinese-zodiac-lookup' },
        ]}
      />
      <ToolSchema
        name="生肖查詢"
        description="輸入出生年份立即查詢你的生肖！提供十二生肖五行屬性、性格特質、相合相沖完整對照表。免費線上生肖查詢工具。"
        url="https://toolcase.cc/zh-tw/chinese-zodiac-lookup"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '生肖查詢' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>生肖查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入出生年份，查詢你的生肖、五行屬性與性格特質。</p>
      <ChineseZodiacLookup />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="chinese-zodiac-lookup" locale="zh-tw" />
    </div>
    </>
  )
}
