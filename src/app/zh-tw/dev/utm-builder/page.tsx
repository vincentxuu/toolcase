import { Metadata } from 'next'
import UtmBuilder from '@/components/tools/UtmBuilder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'UTM 網址產生器 - 免費線上工具 | toolcase',
  description: '快速產生帶有 UTM 追蹤參數的網址，方便在 Google Analytics 中追蹤行銷活動成效。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/utm-builder', languages: { en: 'https://toolcase.cc/dev/utm-builder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/utm-builder' } },
}

const faqs = [
  { question: '什麼是 UTM 參數？', answer: 'UTM（Urchin Tracking Module）參數是加在網址後面的追蹤標籤，讓 Google Analytics 可以辨別流量來源。包含五個參數：source（來源）、medium（媒介）、campaign（活動名稱）、term（關鍵字）和 content（內容）。' },
  { question: '哪些 UTM 參數是必填的？', answer: 'source（來源）、medium（媒介）和 campaign（活動名稱）是必填的。term（關鍵字）通常用於付費搜尋廣告，content（內容）用於 A/B 測試，這兩個為選填。' },
  { question: 'UTM 參數怎麼在 Google Analytics 中查看？', answer: '在 Google Analytics 4 中，進入「報表」>「流量開發」>「流量開發概覽」，可以看到依 source、medium 和 campaign 分類的流量資料。這些資料可以幫助您了解哪個行銷管道帶來最多流量和轉換。' },
]

export default function UtmBuilderPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: 'UTM 網址產生器', url: 'https://toolcase.cc/zh-tw/dev/utm-builder' },
        ]}
      />
      <ToolSchema
        name="UTM 網址產生器"
        description="快速產生帶有 UTM 追蹤參數的網址，方便在 Google Analytics 中追蹤行銷活動成效。"
        url="https://toolcase.cc/zh-tw/dev/utm-builder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'UTM 網址產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>UTM 網址產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>產生帶有 UTM 追蹤參數的網址，追蹤行銷活動成效。</p>
      <UtmBuilder labels={{ websiteUrl: '網站網址', source: '來源', medium: '媒介', campaignName: '活動名稱', term: '關鍵字', content: '內容', generatedUrl: '產生的網址', copy: '複製', copied: '已複製！', required: '必填' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入您的網站網址，填寫來源（如 facebook、google）、媒介（如 social、cpc、email）和活動名稱等必填參數。選填的關鍵字和內容可依需求填寫。工具會即時產生帶有 UTM 參數的完整網址，一鍵複製後即可用於行銷活動中，方便在 Google Analytics 追蹤成效。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="utm-builder" locale="zh-tw" />
    </div>
    </>
  )
}
