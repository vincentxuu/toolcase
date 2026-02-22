import { Metadata } from 'next'
import BinaryTextConverter from '@/components/tools/BinaryTextConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '二進位文字轉換器 - 文字與二進位互轉 | toolcase',
  description: '即時將文字轉換為二進位碼，或將二進位碼轉回文字。將任何文字編碼為 8 位元二進位位元組。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/binary-text-converter', languages: { en: 'https://toolcase.cc/binary-text-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/binary-text-converter' } },
}

const faqs = [
  { question: '文字轉二進位的原理是什麼？', answer: '每個字元會轉換為其 ASCII 碼，再以 8 位元二進位數字表示。例如「A」的 ASCII 碼是 65，二進位表示為 01000001。' },
  { question: '二進位輸入應使用什麼格式？', answer: '輸入以空格分隔的二進位位元組，每個位元組為 8 個二進位數字（0 和 1）。例如：01001000 01101001 代表「Hi」。' },
]

export default function BinaryTextConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '二進位文字轉換器', url: 'https://toolcase.cc/zh-tw/binary-text-converter' },
        ]}
      />
      <ToolSchema
        name="二進位文字轉換器"
        description="即時將文字轉換為二進位碼，或將二進位碼轉回文字。將任何文字編碼為 8 位元二進位位元組。"
        url="https://toolcase.cc/zh-tw/binary-text-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '二進位文字轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>二進位文字轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在文字與二進位之間互相轉換。每個字元對應其 8 位元二進位形式。</p>
      <BinaryTextConverter labels={{ text: '文字', binary: '二進位', textToBinary: '文字轉二進位', binaryToText: '二進位轉文字', copy: '複製', copied: '已複製！', placeholder: '輸入文字...', binaryPlaceholder: '輸入二進位（以空格分隔位元組）...' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="binary-text-converter" locale="zh-tw" />
    </div>
    </>
  )
}
