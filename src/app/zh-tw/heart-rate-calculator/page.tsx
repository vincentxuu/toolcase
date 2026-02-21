import { Metadata } from 'next'
import HeartRateZoneCalculator from '@/components/tools/HeartRateZoneCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '心率區間計算器 - 免費線上工具 | toolcase',
  description: '計算個人化的心率訓練區間。免費線上心率區間計算器，幫助您優化運動訓練效果。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/heart-rate-calculator', languages: { en: 'https://toolcase.cc/heart-rate-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/heart-rate-calculator' } },
}

const faqs = [
  { question: '什麼是心率訓練區間？', answer: '心率訓練區間是根據最大心率劃分的不同運動強度範圍。通常分為五個區間：恢復區（50-60%）、燃脂區（60-70%）、有氧區（70-80%）、無氧區（80-90%）和最大心率區（90-100%）。不同區間訓練的效果各不相同。' },
  { question: '如何測量靜息心率？', answer: '最佳測量時間是早晨剛醒來時，尚未起床前。將手指放在手腕或頸部的脈搏處，計算 60 秒內的心跳次數。連續測量幾天取平均值，會更加準確。一般成年人靜息心率為 60-100 次/分鐘。' },
  { question: '哪個心率區間最適合減脂？', answer: '雖然燃脂區（最大心率的 60-70%）燃燒脂肪的比例最高，但較高強度的有氧區間能消耗更多總熱量。最有效的減脂策略是結合不同強度的訓練，而不是僅在單一區間運動。' },
]

export default function HeartRateCalculatorPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>心率區間計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算您的個人化心率訓練區間，優化運動效果。</p>
      <HeartRateZoneCalculator labels={{ age: '年齡', restingHeartRate: '靜息心率', maxHeartRate: '最大心率', zone: '區間', recovery: '恢復', fatBurn: '燃脂', aerobic: '有氧', anaerobic: '無氧', max: '最大', bpm: '次/分', disclaimer: '本工具僅供參考，請在開始新的運動計畫前諮詢醫生。' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>輸入您的年齡和靜息心率，計算器會使用卡沃南公式計算出五個心率訓練區間。每個區間對應不同的運動強度和訓練目的，幫助您規劃更有效的運動計畫。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="heart-rate-calculator" locale="zh-tw" />
    </div>
  )
}
