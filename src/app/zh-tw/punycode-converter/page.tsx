import { Metadata } from 'next'
import PunycodeConverter from '@/components/tools/PunycodeConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Punycode 轉換 - 國際化域名編碼與解碼 | toolcase',
  description: '將國際化域名（IDN）轉換為 Punycode 格式。編碼和解碼非 ASCII 域名以實現 DNS 相容性。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/punycode-converter', languages: { en: 'https://toolcase.cc/punycode-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/punycode-converter' } },
}

const faqs = [
  { question: '什麼是 Punycode？', answer: 'Punycode 是一種將 Unicode 字符（如中文、阿拉伯文、表情符號）轉換為 ASCII 字符以用於域名的方法。它允許國際化域名（IDN）與現有 DNS 基礎設施協同工作。' },
  { question: '何時需要使用 Punycode？', answer: '當處理包含非 ASCII 字符的域名時需要 Punycode。例如，如果您有一個中文域名如「中文.com」，它需要編碼為「xn--fiq228c.com」以供 DNS 系統使用。' },
  { question: 'Punycode 編碼如何運作？', answer: 'Punycode 使用特殊算法將 Unicode 字符轉換為 ASCII。編碼結果以「xn--」開頭，後跟代表原始 Unicode 文本的 ASCII 字符。' },
]

export default function PunycodeConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'Punycode 轉換', url: 'https://toolcase.cc/zh-tw/punycode-converter' },
        ]}
      />
      <ToolSchema
        name="Punycode 轉換"
        description="將國際化域名（IDN）轉換為 Punycode 格式。編碼和解碼非 ASCII 域名以實現 DNS 相容性。"
        url="https://toolcase.cc/zh-tw/punycode-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Punycode 轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Punycode 轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將國際化域名轉換為 Punycode 格式並可互相轉換。</p>
      <PunycodeConverter
        labels={{
          title: 'Punycode 轉換',
          input: '輸入',
          inputPlaceholder: '輸入域名或 punycode...',
          encode: '編碼',
          decode: '解碼',
          clear: '清除',
          result: '結果',
          copy: '複製',
          copied: '已複製！',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入包含 Unicode 字符的域名，然後點擊編碼以將其轉換為 Punycode。或輸入 Punycode 域名（以 xn-- 開頭）然後點擊解碼以查看原始 Unicode 文本。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="punycode-converter" locale="zh-tw" />
    </div>
    </>
  )
}
