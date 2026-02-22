import { Metadata } from 'next'
import TwMinimumWage from '@/components/tools/TwMinimumWage'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '基本工資歷年表 - 月薪/時薪歷年調整 | toolcase',
  description: '台灣基本工資歷年一覽（2011~2025），含月薪、時薪、生效日期與歷年調幅。2025年月薪28,590元、時薪190元。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/tw-minimum-wage', languages: { en: 'https://toolcase.cc/tw-minimum-wage', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/tw-minimum-wage' } },
}

export default function Page() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '基本工資歷年表', url: 'https://toolcase.cc/zh-tw/tw-minimum-wage' },
        ]}
      />
      <ToolSchema
        name="基本工資歷年表"
        description="台灣基本工資歷年一覽（2011~2025），含月薪、時薪、生效日期與歷年調幅。2025年月薪28,590元、時薪190元。"
        url="https://toolcase.cc/zh-tw/tw-minimum-wage"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '基本工資歷年表' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>基本工資歷年表</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>台灣基本工資（月薪/時薪）歷年調整一覽表（2011~2025），含生效日期與每年調幅。</p>
      <TwMinimumWage />
      <RelatedTools current="tw-minimum-wage" locale="zh-tw" />
    </div>
    </>
  )
}
