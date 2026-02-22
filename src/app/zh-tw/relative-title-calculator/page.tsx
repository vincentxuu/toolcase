import { Metadata } from 'next'
import RelativeTitleCalculator from '@/components/tools/RelativeTitleCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '親戚稱謂計算機 - 台灣家族關係稱謂查詢 | toolcase',
  description: '計算台灣家族關係稱謂。使用此互動工具學習如何稱呼中文家族結構中的親戚。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/relative-title-calculator', languages: { en: 'https://toolcase.cc/relative-title-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/relative-title-calculator' } },
}

const faqs = [
  { question: '如何使用此計算機？', answer: '從您到目標人物逐步選擇關係。例如，要找到您父親的父親，選擇兩次「父親」。工具將顯示該關係的正確中文稱謂。' },
  { question: '為什麼相似的關係有不同的稱謂？', answer: '中文家族結構區分父系和母系，並根據年齡層次和婚姻關係使用不同的稱謂。這反映了家族結構在中華文化中的重要性。' },
  { question: '可以用這個工具學習中文嗎？', answer: '當然可以！此工具非常適合學習中文家族關係詞彙，特別是如果您準備見中文家庭或學習中華文化。' },
]

export default function RelativeTitleCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: '親戚稱謂計算機', url: 'https://toolcase.cc/zh-tw/relative-title-calculator' },
        ]}
      />
      <ToolSchema
        name="親戚稱謂計算機"
        description="計算台灣家族關係稱謂。使用此互動工具學習如何稱呼中文家族結構中的親戚。"
        url="https://toolcase.cc/zh-tw/relative-title-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '親戚稱謂計算機' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>親戚稱謂計算機</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>計算台灣家族關係稱謂，學習如何稱呼中文親戚。</p>
      <RelativeTitleCalculator
        labels={{
          title: '親戚稱謂計算機',
          selectRelation: '選擇關係',
          addRelation: '新增',
          clear: '清除',
          result: '關係稱謂',
          you: '我',
          relation: '關係',
          noRelation: '未知關係',
          father: '父親',
          mother: '母親',
          son: '兒子',
          daughter: '女兒',
          elderBrother: '哥哥',
          youngerBrother: '弟弟',
          elderSister: '姐姐',
          youngerSister: '妹妹',
          husband: '先生',
          wife: '太太',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>通過逐一選擇關係來建立家族樹。從您自己開始，逐步添加每個關係。例如：父親 → 父親 = 爺爺，母親 → 兄弟 = 舅舅。</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="relative-title-calculator" locale="zh-tw" />
    </div>
    </>
  )
}
