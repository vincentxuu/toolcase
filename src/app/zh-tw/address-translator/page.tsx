import { Metadata } from 'next'
import AddressTranslator from '@/components/tools/AddressTranslator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '中文地址英譯 - 台灣地址翻譯英文 | toolcase',
  description: '將台灣中文地址翻譯成英文，適用於寄國際包裹、填寫英文表格。自動辨識縣市、區域。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/address-translator', languages: { en: 'https://toolcase.cc/address-translator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/address-translator' } },
}

const faqs = [
  { question: '英文地址的書寫順序是什麼？', answer: '英文地址與中文相反，由小到大排列：樓層 → 門牌號 → 巷弄 → 段 → 路/街 → 區 → 市/縣 → 郵遞區號 → Taiwan。' },
  { question: '路名的英文翻譯準確嗎？', answer: '本工具可自動翻譯縣市和行政區，路名部分因涉及音譯可能需要微調。正式英譯建議參考中華郵政官方網站。' },
  { question: '寄國際包裹一定要英文地址嗎？', answer: '寄往國外的包裹建議使用英文地址。從國外寄到台灣的包裹，只要有正確的郵遞區號和 "Taiwan"，中文地址也可以。' },
]

export default function AddressTranslatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '中文地址英譯', url: 'https://toolcase.cc/zh-tw/address-translator' },
        ]}
      />
      <ToolSchema
        name="中文地址英譯"
        description="將台灣中文地址翻譯成英文，適用於寄國際包裹、填寫英文表格。自動辨識縣市、區域。"
        url="https://toolcase.cc/zh-tw/address-translator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '中文地址英譯' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>中文地址英譯</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>輸入台灣中文地址，自動翻譯成英文格式。適用於國際包裹、英文表格填寫。</p>
      <AddressTranslator />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="address-translator" locale="zh-tw" />
    </div>
    </>
  )
}
