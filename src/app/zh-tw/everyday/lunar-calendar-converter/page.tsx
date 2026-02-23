import { Metadata } from 'next'
import LunarCalendarConverter from '@/components/tools/LunarCalendarConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '農曆國曆轉換 - 免費線上工具 | toolcase',
  description: '國曆農曆雙向轉換，顯示天干地支及生肖。支援 1901 至 2100 年，免費線上農曆轉換器。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/lunar-calendar-converter', languages: { en: 'https://toolcase.cc/everyday/lunar-calendar-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/lunar-calendar-converter' } },
}

const faqs = [
  { question: '什麼是農曆（陰曆）？', answer: '農曆是中華文化使用的陰陽合曆，結合月相週期與太陽年，並透過閏月調整。用於決定傳統節日如春節、中秋節等。' },
  { question: '什麼是天干地支？', answer: '天干（甲乙丙丁戊己庚辛壬癸）和地支（子丑寅卯辰巳午未申酉戌亥）組成六十甲子循環，用於紀年。每年也對應十二生肖中的一種動物。' },
  { question: '什麼是閏月？', answer: '因為農曆 12 個月比國曆一年短約 11 天，大約每 2-3 年會多加一個閏月，以確保農曆與季節保持一致。閏月的月份與前一個月相同。' },
]

export default function LunarCalendarConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '農曆國曆轉換', url: 'https://toolcase.cc/zh-tw/everyday/lunar-calendar-converter' },
        ]}
      />
      <ToolSchema
        name="農曆國曆轉換"
        description="國曆農曆雙向轉換，顯示天干地支及生肖。支援 1901 至 2100 年，免費線上農曆轉換器。"
        url="https://toolcase.cc/zh-tw/everyday/lunar-calendar-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '農曆國曆轉換' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>農曆國曆轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>國曆與農曆雙向轉換，顯示天干地支及生肖。</p>
      <LunarCalendarConverter labels={{
        solarToLunar: '國曆轉農曆',
        lunarToSolar: '農曆轉國曆',
        solarDate: '國曆日期',
        lunarDate: '農曆日期',
        year: '年',
        month: '月',
        day: '日',
        leapMonth: '閏月',
        convert: '轉換',
        heavenlyStem: '天干',
        earthlyBranch: '地支',
        zodiac: '生肖',
        result: '轉換結果',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇轉換方向：國曆轉農曆或農曆轉國曆。國曆轉農曆時，使用日期選擇器選取日期；農曆轉國曆時，從下拉選單選擇年、月、日，若為閏月請勾選閏月選項。點擊「轉換」即可查看結果，包含天干地支及生肖資訊。支援 1901 至 2100 年的日期。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="lunar-calendar-converter" locale="zh-tw" />
    </div>
    </>
  )
}
