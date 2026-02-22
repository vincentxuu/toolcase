import { Metadata } from 'next'
import PressureConverter from '@/components/tools/PressureConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '壓力轉換器 - Pa、bar、PSI、atm、mmHg | toolcase',
  description: '在壓力單位之間轉換，包括帕斯卡、巴、PSI、大氣壓、托爾、毫米汞柱等。支援所有常用壓力單位的即時轉換。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/pressure-converter', languages: { en: 'https://toolcase.cc/pressure-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/pressure-converter' } },
}

const faqs = [
  { question: '支援哪些壓力單位？', answer: '轉換器支援帕斯卡（Pa）、百帕（hPa）、千帕（kPa）、兆帕（MPa）、巴、毫巴、PSI、大氣壓（atm）、托爾、毫米汞柱和英寸汞柱。' },
  { question: '標準大氣壓是多少？', answer: '標準大氣壓為 1 atm = 101,325 Pa = 1.01325 bar = 14.696 PSI = 760 mmHg = 760 Torr。' },
]

export default function PressureConverterPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '壓力轉換器', url: 'https://toolcase.cc/zh-tw/pressure-converter' },
        ]}
      />
      <ToolSchema
        name="壓力轉換器"
        description="在壓力單位之間轉換，包括帕斯卡、巴、PSI、大氣壓、托爾、毫米汞柱等。支援所有常用壓力單位的即時轉換。"
        url="https://toolcase.cc/zh-tw/pressure-converter"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '壓力轉換器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>壓力轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在所有常用壓力單位之間即時轉換。</p>
      <PressureConverter labels={{ value: '數值', from: '從', result: '轉換結果', enterValue: '輸入數值' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="pressure-converter" locale="zh-tw" />
    </div>
    </>
  )
}
