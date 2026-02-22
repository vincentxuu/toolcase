import { Metadata } from 'next'
import FuelCostCalculator from '@/components/tools/FuelCostCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '油費計算器 - 免費線上工具 | toolcase',
  description: '計算旅程的油費。輸入距離、油耗和油價，估算需要多少油量和費用。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/fuel-cost-calculator', languages: { en: 'https://toolcase.cc/fuel-cost-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/fuel-cost-calculator' } },
}

const faqs = [
  { question: '如何查詢我的車輛油耗？', answer: '查看車輛的使用手冊或油耗標示。您也可以自行計算：加滿油後行駛至油快用完，記錄行駛距離和加油量，再用距離除以油量即可。也可以在網路上查詢車型的油耗數據。' },
  { question: 'km/L 和 mpg 有什麼不同？', answer: 'km/L（公里/公升）是公制國家使用的單位，表示每公升燃油可行駛的公里數。mpg（英里/加侖）是美國和英國使用的單位。換算方式：1 mpg 約等於 0.425 km/L。' },
  { question: '如何提升油耗效率？', answer: '保持穩定車速、避免急加速和急煞車、保持輪胎正確胎壓、減少車上多餘重量、在高速公路上使用定速巡航，並定期保養車輛。在高速行駛時，使用冷氣比開窗更省油，因為開窗會增加風阻。' },
]

export default function FuelCostCalculatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '油費計算器', url: 'https://toolcase.cc/zh-tw/fuel-cost-calculator' },
        ]}
      />
      <ToolSchema
        name="油費計算器"
        description="計算旅程的油費。輸入距離、油耗和油價，估算需要多少油量和費用。"
        url="https://toolcase.cc/zh-tw/fuel-cost-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '油費計算器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>油費計算器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>估算旅程所需的油量和費用。</p>
      <FuelCostCalculator labels={{ unitSystem: '單位系統', metric: '公制', imperial: '英制', tripDistance: '行程距離', fuelEfficiency: '油耗', fuelPrice: '油價', roundTrip: '來回行程', fuelNeeded: '所需油量', totalCost: '總費用', oneWay: '單程', roundTripLabel: '來回', km: '公里', miles: '英里', kmPerL: 'km/L', mpg: 'mpg', perLiter: '$/L', perGallon: '$/gal' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇偏好的單位系統（公制或英制），輸入行程距離、車輛油耗和目前油價。如果需要計算來回行程，請開啟來回選項。計算器會顯示所需的總油量和預估費用。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="fuel-cost-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
