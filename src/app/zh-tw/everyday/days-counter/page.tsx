import { Metadata } from 'next'
import DaysCounter from '@/components/tools/DaysCounter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '倒數日計算 - 計算任何日期的倒數 | toolcase',
  description: '計算距離任何日期的天數、小時、分鐘和秒數。非常適合追蹤生日、紀念日、截止日期和特殊活動。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/days-counter', languages: { en: 'https://toolcase.cc/everyday/days-counter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/days-counter' } },
}

const faqs = [
  { question: '倒數計時有多準確？', answer: '倒數計時每秒更新一次，精確到秒。它會自動考慮您的本地時區。' },
  { question: '可以計算過去日期的天數嗎？', answer: '可以！如果您選擇過去的日期，計數器將顯示自該日期以來經過了多少天、小時、分鐘和秒。' },
  { question: '它適用於遠期的未來日期嗎？', answer: '是的，您可以倒數至未來的任何日期，無論是明天還是多年後。' },
]

export default function DaysCounterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '倒數日計算', url: 'https://toolcase.cc/zh-tw/everyday/days-counter' },
        ]}
      />
      <ToolSchema
        name="倒數日計算"
        description="計算距離任何日期的天數、小時、分鐘和秒數。非常適合追蹤生日、紀念日、截止日期和特殊活動。"
        url="https://toolcase.cc/zh-tw/everyday/days-counter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '倒數日計算' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>倒數日計算</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>倒數至任何特殊日期，或查看自重要事件以來已經過了多少時間。</p>
      <DaysCounter
        labels={{
          title: '倒數日計算',
          eventName: '事件名稱',
          eventNamePlaceholder: '例如：我的生日、結婚紀念日...',
          targetDate: '目標日期',
          today: '今天',
          calculate: '計算',
          clear: '清除',
          result: '結果',
          daysRemaining: '剩餘天數',
          daysPassed: '已過天數',
          days: '天',
          hours: '小時',
          minutes: '分鐘',
          seconds: '秒',
          isToday: '事件就是今天！',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入事件名稱並選擇目標日期。點擊計算以查看顯示天數、小時、分鐘和秒數的即時倒數計時。倒數計時每秒自動更新。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="days-counter" locale="zh-tw" />
    </div>
    </>
  )
}
