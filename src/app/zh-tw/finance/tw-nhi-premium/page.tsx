import { Metadata } from 'next'
import TwNhiPremium from '@/components/tools/TwNhiPremium'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '健保投保級距表 - 全民健保保費查詢 | toolcase',
  description: '全民健康保險投保金額分級表，輸入月薪即可查詢適用級距與每月自付保費金額。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-nhi-premium', languages: { en: 'https://toolcase.cc/finance/tw-nhi-premium', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-nhi-premium' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '健保投保級距表', url: 'https://toolcase.cc/zh-tw/finance/tw-nhi-premium' },
        ]}
      />
      <ToolSchema
        name="健保投保級距表"
        description="全民健康保險投保金額分級表，輸入月薪即可查詢適用級距與每月自付保費金額。"
        url="https://toolcase.cc/zh-tw/finance/tw-nhi-premium"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '健保投保級距表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>健保投保級距表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>全民健康保險投保金額分級表，輸入月薪即可查詢適用級距與每月自付保費。費率5.17%，被保險人自付30%。</p>
      <TwNhiPremium />
      <RelatedTools current="tw-nhi-premium" locale="zh-tw" />
    </div>
    </>
  )
}
