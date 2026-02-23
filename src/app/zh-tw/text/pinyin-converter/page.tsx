import { Metadata } from 'next'
import PinyinConverter from '@/components/tools/PinyinConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '拼音轉換 - 中文轉拼音帶聲調 | toolcase',
  description: '將中文字轉換為帶聲調的拼音。支援多種輸出格式，包括聲調符號、數字標記和首字母。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/pinyin-converter', languages: { en: 'https://toolcase.cc/text/pinyin-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/pinyin-converter' } },
}

const faqs = [
  { question: '什麼是拼音？', answer: '拼音是標準中文的官方羅馬化系統。它使用拉丁字母表示中文發音，使學習者更容易發音中文字符。' },
  { question: '不同的聲調格式是什麼？', answer: '帶聲調符號（āáǎà）在元音上方顯示變音符號。聲調數字（a1 a2 a3 a4）在每個音節後使用數字1-4。無聲調則移除所有聲調指示。僅首字母只顯示每個字的首字母。' },
  { question: '可以用這個工具學習中文嗎？', answer: '可以！此工具非常適合中文學習者。它幫助您學習正確的發音並理解聲調，這在普通話中至關重要。' },
]

export default function PinyinConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '拼音轉換', url: 'https://toolcase.cc/zh-tw/text/pinyin-converter' },
        ]}
      />
      <ToolSchema
        name="拼音轉換"
        description="將中文字轉換為帶聲調的拼音。支援多種輸出格式，包括聲調符號、數字標記和首字母。"
        url="https://toolcase.cc/zh-tw/text/pinyin-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '拼音轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>拼音轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將中文字轉換為拼音羅馬拼音，支援多種輸出格式。</p>
      <PinyinConverter
        labels={{
          title: '拼音轉換',
          input: '中文文字',
          inputPlaceholder: '輸入中文字...',
          mode: '輸出模式',
          withTone: '帶聲調符號（āáǎà）',
          withoutTone: '無聲調',
          toneNumber: '聲調數字（a1 a2 a3 a4）',
          firstLetter: '僅首字母',
          convert: '轉換',
          clear: '清除',
          result: '結果',
          copy: '複製',
          copied: '已複製！',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在輸入框中輸入中文字，選擇您偏好的輸出格式，然後點擊轉換。工具支援聲調符號、聲調數字、無聲調純文字和首字母縮寫。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="pinyin-converter" locale="zh-tw" />
    </div>
    </>
  )
}
