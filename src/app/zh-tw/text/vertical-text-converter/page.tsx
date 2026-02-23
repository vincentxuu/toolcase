import { Metadata } from 'next'
import VerticalTextConverter from '@/components/tools/VerticalTextConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '直書轉換 - 將文字以直式排列顯示 | toolcase',
  description: '將文字轉換為直式書寫格式。預覽中文、日文和韓文傳統直式排版。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/vertical-text-converter', languages: { en: 'https://toolcase.cc/text/vertical-text-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/vertical-text-converter' } },
}

const faqs = [
  { question: '什麼是直書？', answer: '直書是一種書寫模式，文字從上到下流動而不是從左到右。它傳統上用於中文、日文和韓文（CJK）排版，特別是正式文件和古典文學。' },
  { question: '由右至左和由左至右有什麼區別？', answer: '由右至左（傳統）從頁面右側開始列。由左至右（現代）從左側開始。傳統中文和日文使用由右至左的直書。' },
  { question: '可以用於網頁設計嗎？', answer: '可以！此預覽顯示使用 CSS writing-mode 屬性的直書效果。您可以在網頁設計中使用相同的 CSS 技術來創建直式排版。' },
]

export default function VerticalTextConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '直書轉換', url: 'https://toolcase.cc/zh-tw/text/vertical-text-converter' },
        ]}
      />
      <ToolSchema
        name="直書轉換"
        description="將文字轉換為直式書寫格式。預覽中文、日文和韓文傳統直式排版。"
        url="https://toolcase.cc/zh-tw/text/vertical-text-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '直書轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>直書轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>轉換並預覽傳統直式書寫格式的文字。</p>
      <VerticalTextConverter
        labels={{
          title: '直書轉換',
          input: '輸入文字',
          inputPlaceholder: '輸入要以直式顯示的文字...',
          orientation: '方向',
          rightToLeft: '由右至左',
          leftToRight: '由左至右',
          preview: '預覽',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入文字並選擇方向。預覽將顯示文字的直式格式。這對於設計傳統東亞排版特別有用。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="vertical-text-converter" locale="zh-tw" />
    </div>
    </>
  )
}
