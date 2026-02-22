import { Metadata } from 'next'
import RomanNumeralConverter from '@/components/tools/RomanNumeralConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '羅馬數字轉換器 - 十進位與羅馬數字互轉 | toolcase',
  description: '即時在十進位數字和羅馬數字之間互相轉換。支援 1 到 3999 的數值，附完整轉換參考表。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/roman-numeral-converter', languages: { en: 'https://toolcase.cc/roman-numeral-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/roman-numeral-converter' } },
}

const faqs = [
  { question: '支援哪些數字範圍？', answer: '轉換器支援 1 到 3999 的數字，這是使用古典羅馬數字表示法（I 到 MMMCMXCIX）可表示的標準範圍。' },
  { question: '減法形式是如何處理的？', answer: '轉換器使用標準減法表示法：IV（4）、IX（9）、XL（40）、XC（90）、CD（400）和 CM（900）。這是現今羅馬數字的慣用寫法。' },
  { question: '可以雙向轉換嗎？', answer: '可以！您可以將十進位數字轉換為羅馬數字，也可以將羅馬數字轉回十進位數字，只需切換兩種模式即可。' },
]

export default function RomanNumeralConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '羅馬數字轉換器', url: 'https://toolcase.cc/zh-tw/roman-numeral-converter' },
        ]}
      />
      <ToolSchema
        name="羅馬數字轉換器"
        description="即時在十進位數字和羅馬數字之間互相轉換。支援 1 到 3999 的數值，附完整轉換參考表。"
        url="https://toolcase.cc/zh-tw/roman-numeral-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '羅馬數字轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>羅馬數字轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在十進位數字和羅馬數字之間互相轉換。支援 1 到 3999 的數值。</p>
      <RomanNumeralConverter labels={{ decimal: '十進位', roman: '羅馬數字', decimalToRoman: '十進位轉羅馬', romanToDecimal: '羅馬轉十進位', conversionTable: '轉換表', invalidInput: '無效輸入', outOfRange: '超出範圍（1-3999）' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇轉換方向 — 十進位轉羅馬或羅馬轉十進位 — 然後輸入數值。轉換會即時完成。切換轉換表即可查看完整的羅馬數字對照表供參考。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="roman-numeral-converter" locale="zh-tw" />
    </div>
    </>
  )
}
