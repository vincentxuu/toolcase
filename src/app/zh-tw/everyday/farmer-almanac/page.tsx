import { Metadata } from 'next'
import FarmerAlmanac from '@/components/tools/FarmerAlmanac'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '農民曆 - 農曆查詢與宜忌事項 | toolcase',
  description: '查詢農曆日期、生肖、星座以及基於傳統農民曆智慧的宜忌事項。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/farmer-almanac', languages: { en: 'https://toolcase.cc/farmer-almanac', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/farmer-almanac' } },
}

const faqs = [
  { question: '什麼是農民曆？', answer: '農民曆是結合農曆日期與基於中國古代星象和曆法智慧的吉凶宜忌指引的傳統中國曆法。數百年來，人們一直使用它來規劃重要活動和事件。' },
  { question: '農曆日期轉換的準確度如何？', answer: '此工具提供農曆日期的簡化近似值，僅供教育和文化參考。對於重要事件的精確農曆計算，請諮詢官方農民曆或文化專家。' },
  { question: '什麼是宜忌事項？', answer: '根據傳統農民曆智慧，每天都有被視為吉祥（宜）或不吉祥（忌）的活動。這些包括婚嫁、搬家、開業等重要人生活動。此指引基於歷史文化習俗。' },
  { question: '我應該遵循農民曆的指引嗎？', answer: '農民曆代表傳統文化智慧和信仰。是否遵循其指引是基於您的文化背景和信仰的個人選擇。此工具僅提供文化教育和參考資訊。' },
]

export default function FarmerAlmanacPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '農民曆', url: 'https://toolcase.cc/zh-tw/farmer-almanac' },
        ]}
      />
      <ToolSchema
        name="農民曆"
        description="查詢農曆日期、生肖、星座以及基於傳統農民曆智慧的宜忌事項。"
        url="https://toolcase.cc/zh-tw/farmer-almanac"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '農民曆' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>農民曆</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>查詢農曆日期和傳統宜忌事項指引。</p>
      <FarmerAlmanac
        labels={{
          title: '農民曆',
          date: '日期',
          today: '今天',
          query: '查詢',
          results: '結果',
          lunarDate: '農曆日期',
          zodiac: '生肖',
          constellation: '星座',
          auspicious: '吉',
          inauspicious: '凶',
          appropriate: '宜',
          avoid: '忌',
          note: '注意',
          noteText: '此農民曆提供傳統農曆資訊和基於歷史農民曆數據的宜忌指引。僅供文化參考。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇要查詢的日期（或點擊「今天」查詢當前日期），然後點擊「查詢」即可查看農曆日期、該年的生肖、星座，以及基於傳統農民曆智慧的宜忌事項列表。此工具提供有關傳統農曆習俗的文化和教育資訊。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="farmer-almanac" locale="zh-tw" />
    </div>
    </>
  )
}
