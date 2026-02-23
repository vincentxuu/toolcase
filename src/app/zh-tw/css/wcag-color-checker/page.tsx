import { Metadata } from 'next'
import WcagColorChecker from '@/components/tools/WcagColorChecker'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'WCAG 配色檢查器 - 無障礙對比度工具 | toolcase',
  description: '檢查顏色對比度是否符合 WCAG 2.1 AA 和 AAA 標準。確保您的文字顏色對所有使用者都易於閱讀。免費無障礙工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/css/wcag-color-checker', languages: { en: 'https://toolcase.cc/css/wcag-color-checker', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/css/wcag-color-checker' } },
}

const faqs = [
  { question: '什麼是 WCAG？', answer: 'WCAG（Web Content Accessibility Guidelines，網頁內容無障礙指南）是網頁無障礙的國際標準。它定義了如何使網頁內容對殘障人士（包括視覺障礙者）更易於訪問。' },
  { question: '我需要什麼對比度？', answer: '對於 WCAG AA 級別，一般文字需要至少 4.5:1，大文字（18pt+ 或粗體 14pt+）需要 3:1。對於 AAA 級別（增強），一般文字需要 7:1，大文字需要 4.5:1。' },
  { question: '為什麼顏色對比很重要？', answer: '足夠的顏色對比確保弱視、色盲或在強光下查看螢幕的使用者可以閱讀文字。它不僅對殘障人士有益，對所有使用者都有幫助。' },
  { question: '我可以用這個測試我的網站嗎？', answer: '可以！輸入您的文字（前景）和背景顏色，以驗證它們是否符合無障礙標準。這有助於確保您的網站對所有人都可用。' },
]

export default function WcagColorCheckerPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc/zh-tw' },
          { name: 'WCAG 配色檢查器', url: 'https://toolcase.cc/zh-tw/css/wcag-color-checker' },
        ]}
      />
      <ToolSchema
        name="WCAG 配色檢查器"
        description="檢查顏色對比度是否符合 WCAG 2.1 AA 和 AAA 標準。確保您的文字顏色對所有使用者都易於閱讀。免費無障礙工具。"
        url="https://toolcase.cc/zh-tw/css/wcag-color-checker"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: 'WCAG 配色檢查器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WCAG 配色檢查器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>檢查顏色對比度，確保您的設計符合 WCAG 無障礙標準。</p>
      <WcagColorChecker
        labels={{
          title: 'WCAG 配色檢查器',
          foreground: '前景（文字）',
          background: '背景',
          foregroundPlaceholder: '#000000',
          backgroundPlaceholder: '#FFFFFF',
          swap: '交換顏色',
          contrastRatio: '對比度',
          wcagAA: 'WCAG AA',
          wcagAAA: 'WCAG AAA',
          normalText: '一般文字',
          largeText: '大文字（18pt+）',
          pass: '通過',
          fail: '未通過',
          level: '級別',
          ratio: '比率',
          preview: '預覽',
          sampleText: '快速的棕色狐狸跳過懶狗',
          guidelines: '無障礙指南',
          guidelineDesc: 'WCAG 2.1 要求一般文字的對比度至少為 4.5:1，大文字（18pt+ 或粗體 14pt+）為 3:1（AA 級別）。AAA 級別要求一般文字為 7:1，大文字為 4.5:1。',
        }}
      />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>使用方式</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          使用顏色選擇器或十六進位輸入欄位輸入您的前景（文字）和背景顏色。工具會自動計算對比度，並顯示是否通過 WCAG AA 和 AAA 標準（包括一般文字和大文字）。使用預覽區域查看您的顏色搭配效果。
        </p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="wcag-color-checker" locale="zh-tw" />
    </div>
    </>
  )
}
