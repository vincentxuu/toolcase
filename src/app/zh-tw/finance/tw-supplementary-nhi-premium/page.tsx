import { Metadata } from 'next'
import TwSupplementaryNhiPremium from '@/components/tools/TwSupplementaryNhiPremium'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '二代健保補充保費 - 費率門檻與試算 | toolcase',
  description: '二代健保補充保費費率2.11%，單次給付超過2萬元即需扣繳。含股利、兼職、租金等各類所得扣費說明與試算。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/tw-supplementary-nhi-premium', languages: { en: 'https://toolcase.cc/finance/tw-supplementary-nhi-premium', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/tw-supplementary-nhi-premium' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '二代健保補充保費', url: 'https://toolcase.cc/zh-tw/finance/tw-supplementary-nhi-premium' },
        ]}
      />
      <ToolSchema
        name="二代健保補充保費"
        description="二代健保補充保費費率2.11%，單次給付超過2萬元即需扣繳。含股利、兼職、租金等各類所得扣費說明與試算。"
        url="https://toolcase.cc/zh-tw/finance/tw-supplementary-nhi-premium"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '二代健保補充保費' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>二代健保補充保費</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>二代健保補充保費費率2.11%，含各類所得扣費門檻（股利、兼職、租金等）與快速試算。</p>
      <TwSupplementaryNhiPremium />
      <RelatedTools current="tw-supplementary-nhi-premium" locale="zh-tw" />
    </div>
    </>
  )
}
