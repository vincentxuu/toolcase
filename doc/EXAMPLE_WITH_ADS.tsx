/**
 * 工具頁面廣告整合範例
 *
 * 此檔案展示如何在工具頁面中正確放置廣告
 * 複製此範例並根據您的需求調整
 */

import { Metadata } from 'next'
import JsonFormatter from '@/components/tools/JsonFormatter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import AdSlot from '@/components/shared/AdSlot'
import { adConfig, isAdSlotConfigured } from '@/config/ads'

export const metadata: Metadata = {
  title: 'JSON Formatter & Validator - Free Online Tool | toolcase',
  description:
    'Format, validate, and beautify JSON data instantly. Free online JSON formatter with syntax highlighting and error detection.',
  alternates: {
    canonical: 'https://toolcase.cc/json-formatter',
    languages: {
      en: 'https://toolcase.cc/json-formatter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/json-formatter',
    },
  },
}

const faqs = [
  {
    question: 'What is JSON?',
    answer:
      'JSON (JavaScript Object Notation) is a lightweight data-interchange format that is easy for humans to read and write, and easy for machines to parse and generate.',
  },
  // ... 其他 FAQ
]

export default function JsonFormatterPageWithAds() {
  return (
    <div className="tool-container">
      {/* ====================
          方案一：簡單版（適合一般工具）
          ==================== */}

      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        JSON Formatter & Validator
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your JSON below to format, validate, and beautify it instantly.
      </p>

      {/* 工具主體 */}
      <JsonFormatter />

      {/* 📍 廣告位置 1: 工具下方（內容中廣告） */}
      {isAdSlotConfigured('inContent') && (
        <AdSlot
          adSlot={adConfig.slots.inContent.id}
          format={adConfig.slots.inContent.format}
          style={adConfig.slots.inContent.style}
        />
      )}

      {/* 說明區塊 */}
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>
          How to Format JSON Online
        </h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Simply paste your JSON data into the editor...
        </p>
      </section>

      {/* FAQ 區塊 */}
      <FaqSection items={faqs} />

      {/* 📍 廣告位置 2: 頁面底部（Footer 廣告） */}
      {isAdSlotConfigured('footer') && (
        <AdSlot
          adSlot={adConfig.slots.footer.id}
          format={adConfig.slots.footer.format}
          style={adConfig.slots.footer.style}
        />
      )}

      {/* 相關工具 */}
      <RelatedTools current="json-formatter" locale="en" />
    </div>
  )
}

/**
 * ====================
 * 方案二：高 RPM 工具版（適合金融、健康類）
 * ====================
 */
export function HighRPMToolPageExample() {
  return (
    <div className="tool-container">
      <div className="flex gap-6">
        {/* 主要內容區 */}
        <div className="flex-1">
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Mortgage Calculator
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
            Calculate your monthly mortgage payments instantly.
          </p>

          {/* 📍 廣告位置 1: 頁面頂部 */}
          {isAdSlotConfigured('header') && (
            <AdSlot
              adSlot={adConfig.slots.header.id}
              format={adConfig.slots.header.format}
              style={adConfig.slots.header.style}
            />
          )}

          {/* 工具主體 */}
          <div className="tool-component">
            {/* MortgageCalculator 元件 */}
          </div>

          {/* 📍 廣告位置 2: 工具下方 */}
          {isAdSlotConfigured('inContent') && (
            <AdSlot
              adSlot={adConfig.slots.inContent.id}
              format={adConfig.slots.inContent.format}
              style={adConfig.slots.inContent.style}
            />
          )}

          {/* 說明內容 */}
          <section style={{ marginTop: '3rem' }}>
            <h2>How It Works</h2>
            {/* ... */}
          </section>

          {/* 📍 廣告位置 3: 說明與 FAQ 之間 */}
          {isAdSlotConfigured('inContent') && (
            <AdSlot
              adSlot={adConfig.slots.inContent.id}
              format="rectangle"
              style={{ minHeight: '250px' }}
            />
          )}

          {/* FAQ */}
          <FaqSection items={[]} />

          {/* 📍 廣告位置 4: 頁面底部 */}
          {isAdSlotConfigured('footer') && (
            <AdSlot
              adSlot={adConfig.slots.footer.id}
              format={adConfig.slots.footer.format}
              style={adConfig.slots.footer.style}
            />
          )}
        </div>

        {/* 📍 側邊欄廣告（僅桌面版顯示） */}
        <aside className="hidden lg:block w-80">
          {isAdSlotConfigured('sidebar') && (
            <div className="sticky top-4">
              <AdSlot
                adSlot={adConfig.slots.sidebar.id}
                format={adConfig.slots.sidebar.format}
                style={adConfig.slots.sidebar.style}
              />
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

/**
 * ====================
 * 方案三：手動指定 Ad Slot ID
 * ====================
 */
export function ManualAdSlotExample() {
  return (
    <div className="tool-container">
      <h1>My Tool</h1>

      {/* 直接指定 ad slot ID */}
      <AdSlot adSlot="1234567890" />

      {/* 指定廣告格式 */}
      <AdSlot
        adSlot="1234567890"
        format="rectangle"
      />

      {/* 自訂樣式 */}
      <AdSlot
        adSlot="1234567890"
        format="horizontal"
        style={{ minHeight: '90px', marginTop: '3rem' }}
      />
    </div>
  )
}
