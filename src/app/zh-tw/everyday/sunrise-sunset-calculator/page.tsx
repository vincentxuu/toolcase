import { Metadata } from 'next'
import SunriseSunsetCalculator from '@/components/tools/SunriseSunsetCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '日出日落計算機 - 天文時間計算器 | toolcase',
  description: '使用精確的天文公式計算任何地點和日期的日出、日落、正午太陽、民用曙暮光時間和日照長度。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/sunrise-sunset-calculator', languages: { en: 'https://toolcase.cc/everyday/sunrise-sunset-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/sunrise-sunset-calculator' } },
}

const faqs = [
  { question: '日出日落時間的準確度如何？', answer: '計算機使用精確的天文公式，包括太陽平均近點角、中心方程式和黃道經度計算。對大多數地點而言，時間準確度在 1-2 分鐘內。由於大氣折射和地形因素，實際時間可能會有輕微差異。' },
  { question: '什麼是民用曙暮光？', answer: '民用曙暮光是太陽在地平線下 0° 至 6° 之間的時期。在民用曙光開始（黎明）時，有足夠的自然光線進行大多數戶外活動而無需人工照明。民用暮光結束（黃昏）時，光線變得太暗而無法進行此類活動。' },
  { question: '我可以使用我目前的位置嗎？', answer: '可以！點擊「使用我的位置」按鈕，使用瀏覽器的地理定位 API 自動填入您的緯度和經度。您可能需要授予位置權限。' },
  { question: '什麼是正午太陽？', answer: '正午太陽是太陽在該日於您所在位置達到最高點（最大高度角）的時刻。由於時區、夏令時間和時間方程式的影響，它不一定是時鐘時間的中午 12:00。' },
]

export default function SunriseSunsetCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '日出日落計算機', url: 'https://toolcase.cc/zh-tw/everyday/sunrise-sunset-calculator' },
        ]}
      />
      <ToolSchema
        name="日出日落計算機"
        description="使用精確的天文公式計算任何地點和日期的日出、日落、正午太陽、民用曙暮光時間和日照長度。"
        url="https://toolcase.cc/zh-tw/everyday/sunrise-sunset-calculator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '日出日落計算機' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>日出日落計算機</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>使用天文公式計算日出、日落、曙暮光時間和日照長度。</p>
      <SunriseSunsetCalculator
        labels={{
          title: '日出日落計算機',
          date: '日期',
          latitude: '緯度',
          longitude: '經度',
          getLocation: '使用我的位置',
          calculate: '計算',
          results: '結果',
          sunrise: '日出',
          sunset: '日落',
          solarNoon: '正午太陽',
          dayLength: '日照長度',
          twilightBegin: '民用曙光開始',
          twilightEnd: '民用暮光結束',
          hours: '小時',
          minutes: '分鐘',
          note: '注意',
          noteText: '時間是根據指定位置和日期使用天文公式計算的。由於大氣條件的影響，實際時間可能會有輕微差異。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇日期並輸入緯度/經度座標（或點擊「使用我的位置」）。點擊「計算」即可查看日出、日落、正午太陽、日照長度和民用曙暮光時間。計算機使用精確的天文演算法，包括太陽位置計算、中心方程式和黃道經度。預設位置為台北（北緯 25.033°，東經 121.5654°）。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="sunrise-sunset-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
