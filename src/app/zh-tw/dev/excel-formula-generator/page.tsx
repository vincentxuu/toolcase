import { Metadata } from 'next'
import ExcelFormulaGenerator from '@/components/tools/ExcelFormulaGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Excel 公式產生器 - 常用公式與範例 | toolcase',
  description: '瀏覽並複製常用 Excel 公式與語法範例。包括數學、統計、邏輯、文字、日期、查詢和財務函數。免費參考工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/dev/excel-formula-generator', languages: { en: 'https://toolcase.cc/dev/excel-formula-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/dev/excel-formula-generator' } },
}

const faqs = [
  { question: '如何在 Excel 中使用這些公式？', answer: '點擊任何公式旁邊的「複製」按鈕將其複製到剪貼簿。然後貼到您的 Excel 儲存格中。將範例儲存格參照（如 A1、B1）替換為您的實際儲存格參照。' },
  { question: '有哪些公式類別？', answer: '工具包括數學與三角函數、統計、邏輯、文字、日期與時間、查詢與參照以及財務公式。使用類別下拉選單進行篩選，或按公式名稱或說明搜尋。' },
  { question: '我可以修改公式嗎？', answer: '可以！顯示的語法是範本。複製後，將通用參數替換為您的特定儲存格參照、值或條件。範例向您展示如何正確構造公式。' },
  { question: '語法是什麼意思？', answer: '語法顯示公式結構。必需參數顯示時不帶方括號，而可選參數則在 [方括號] 中。例如，=SUM(number1, [number2]) 表示 number1 是必需的，但 number2 是可選的。' },
]

export default function ExcelFormulaGeneratorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'Excel 公式產生器', url: 'https://toolcase.cc/zh-tw/dev/excel-formula-generator' },
        ]}
      />
      <ToolSchema
        name="Excel 公式產生器"
        description="瀏覽並複製常用 Excel 公式與語法範例。包括數學、統計、邏輯、文字、日期、查詢和財務函數。免費參考工具。"
        url="https://toolcase.cc/zh-tw/dev/excel-formula-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'Excel 公式產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Excel 公式產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>瀏覽常用 Excel 公式的語法、說明和範例。複製並在試算表中使用。</p>
      <ExcelFormulaGenerator
        labels={{
          title: 'Excel 公式產生器',
          category: '類別',
          allCategories: '所有類別',
          math: '數學與三角函數',
          statistical: '統計',
          logical: '邏輯',
          text: '文字',
          dateTime: '日期與時間',
          lookup: '查詢與參照',
          financial: '財務',
          searchPlaceholder: '搜尋公式...',
          formulaName: '公式',
          syntax: '語法',
          description: '說明',
          example: '範例',
          copy: '複製',
          copied: '已複製！',
          noResults: '找不到公式',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          按類別瀏覽公式或搜尋特定函數。每個公式卡片顯示語法（如何構造它）、功能說明和實用範例。點擊「複製」將公式語法複製到剪貼簿。
        </p>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          複製後，將公式貼到您的 Excel 儲存格中，並將通用參照（A1、B1 等）替換為您的實際儲存格參照。範例向您展示如何使用實際資料套用公式。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="excel-formula-generator" locale="zh-tw" />
    </div>
    </>
  )
}
