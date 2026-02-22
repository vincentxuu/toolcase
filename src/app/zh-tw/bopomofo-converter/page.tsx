import { Metadata } from 'next'
import BopomofoConverter from '@/components/tools/BopomofoConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '注音轉換 - 中文轉注音符號（ㄅㄆㄇㄈ）| toolcase',
  description: '將中文字轉換為注音符號。使用此轉換工具學習台灣注音系統。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/bopomofo-converter', languages: { en: 'https://toolcase.cc/bopomofo-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/bopomofo-converter' } },
}

const faqs = [
  { question: '什麼是注音符號？', answer: '注音符號（ㄅㄆㄇㄈ），也稱為注音，是轉錄普通話的拼音系統。它主要在台灣用於教授兒童和學習者中文發音。' },
  { question: '注音符號與拼音有何不同？', answer: '拼音使用拉丁字母，而注音符號使用獨特的拼音符號。注音符號在台灣更常用，而拼音是中國大陸和國際上的標準。' },
  { question: '可以用這個工具學習中文嗎？', answer: '可以！如果您正在學習繁體中文或計劃在台灣學習，此工具特別有用，因為注音符號是學校教授的標準拼音系統。' },
]

export default function BopomofoConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '注音轉換', url: 'https://toolcase.cc/zh-tw/bopomofo-converter' },
        ]}
      />
      <ToolSchema
        name="注音轉換"
        description="將中文字轉換為注音符號。使用此轉換工具學習台灣注音系統。"
        url="https://toolcase.cc/zh-tw/bopomofo-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '注音轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>注音轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將中文字轉換為台灣使用的注音符號。</p>
      <BopomofoConverter
        labels={{
          title: '注音轉換',
          input: '中文文字',
          inputPlaceholder: '輸入中文字...',
          convert: '轉換',
          clear: '清除',
          result: '結果',
          copy: '複製',
          copied: '已複製！',
          note: '注意：此轉換器支援常用中文字。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入中文字，然後點擊轉換。工具將顯示每個字的注音符號。不在字典中的字符將顯示在括號中。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="bopomofo-converter" locale="zh-tw" />
    </div>
    </>
  )
}
