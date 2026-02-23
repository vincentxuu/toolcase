import { Metadata } from 'next'
import BrailleConverter from '@/components/tools/BrailleConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '盲文轉換 - 文字轉盲文翻譯工具 | toolcase',
  description: '將文字轉換為盲文或盲文轉換為文字。使用此線上轉換工具學習和練習盲文閱讀。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/braille-converter', languages: { en: 'https://toolcase.cc/text/braille-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/braille-converter' } },
}

const faqs = [
  { question: '什麼是盲文？', answer: '盲文是盲人或視障人士使用的觸覺書寫系統。它由以格子排列的凸起點組成，每個格子代表一個字母、數字或符號。' },
  { question: '此工具使用哪種等級的盲文？', answer: '此轉換器使用英文盲文第一級，這是直接的字母對字母轉錄。它包括基本字母、數字和常見標點符號。' },
  { question: '可以用這個工具學習盲文嗎？', answer: '可以！此工具非常適合學習和練習盲文。您可以輸入普通文字查看對應的盲文，或通過將盲文轉換回文字來練習閱讀盲文。' },
]

export default function BrailleConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '盲文轉換', url: 'https://toolcase.cc/zh-tw/text/braille-converter' },
        ]}
      />
      <ToolSchema
        name="盲文轉換"
        description="將文字轉換為盲文或盲文轉換為文字。使用此線上轉換工具學習和練習盲文閱讀。"
        url="https://toolcase.cc/zh-tw/text/braille-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '盲文轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>盲文轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將文字轉換為盲文或反向轉換。線上學習和練習盲文閱讀。</p>
      <BrailleConverter
        labels={{
          title: '盲文轉換',
          input: '輸入',
          inputPlaceholder: '輸入文字或盲文...',
          toBraille: '轉為盲文',
          toText: '轉為文字',
          clear: '清除',
          result: '結果',
          copy: '複製',
          copied: '已複製！',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入普通文字並點擊「轉為盲文」以將其轉換為盲文字符。或輸入盲文字符並點擊「轉為文字」以將其轉換回普通文字。這對於學習盲文或創建盲文內容很有用。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="braille-converter" locale="zh-tw" />
    </div>
    </>
  )
}
