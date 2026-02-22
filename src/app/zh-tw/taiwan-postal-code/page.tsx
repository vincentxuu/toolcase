import { Metadata } from 'next'
import TaiwanPostalCode from '@/components/tools/TaiwanPostalCode'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '台灣郵遞區號查詢 - 3+2碼郵遞區號 | toolcase',
  description: '快速查詢台灣各縣市鄉鎮區的郵遞區號（3碼），支援搜尋、篩選，點擊即複製。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/taiwan-postal-code', languages: { en: 'https://toolcase.cc/taiwan-postal-code', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/taiwan-postal-code' } },
}

const faqs = [
  { question: '台灣郵遞區號有幾碼？', answer: '台灣郵遞區號有 3 碼（如 100 台北中正區）和 3+2 碼（如 10001）兩種，本工具提供 3 碼查詢。' },
  { question: '如何使用郵遞區號查詢？', answer: '可以直接在搜尋欄輸入縣市、區域名稱或郵遞區號來查詢，也可以用下拉選單篩選特定縣市。' },
  { question: '為什麼有些地區的郵遞區號相同？', answer: '部分較小的鄉鎮或同市區內可能共用同一個 3 碼郵遞區號，這是正常的。' },
]

export default function TaiwanPostalCodePageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '台灣郵遞區號查詢', url: 'https://toolcase.cc/zh-tw/taiwan-postal-code' },
        ]}
      />
      <ToolSchema
        name="台灣郵遞區號查詢"
        description="快速查詢台灣各縣市鄉鎮區的郵遞區號（3碼），支援搜尋、篩選，點擊即複製。"
        url="https://toolcase.cc/zh-tw/taiwan-postal-code"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '台灣郵遞區號查詢' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>台灣郵遞區號查詢</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>快速查詢台灣各縣市鄉鎮區的郵遞區號，支援搜尋和篩選功能。</p>
      <TaiwanPostalCode />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="taiwan-postal-code" locale="zh-tw" />
    </div>
    </>
  )
}
