import { Metadata } from 'next'
import IntegerBaseConverter from '@/components/tools/IntegerBaseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '整數進位轉換器 - 免費線上工具 | toolcase',
  description: '在二進位、八進位、十進位、十六進位及自訂進位之間轉換數字。免費線上進位轉換工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/integer-base-converter', languages: { en: 'https://toolcase.cc/integer-base-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/integer-base-converter' } },
}

const faqs = [
  { question: '什麼是進位制（基數）？', answer: '進位制（基數）是用來表示數字的唯一數位個數。十進位（基數 10）使用 0-9，二進位（基數 2）使用 0 和 1，八進位（基數 8）使用 0-7，十六進位（基數 16）使用 0-9 和 A-F。不同的進位制在不同的運算情境中各有用途——二進位用於硬體層級、十六進位用於記憶體位址和色碼、八進位用於 Unix 檔案權限。' },
  { question: '為什麼程式設計中常用十六進位？', answer: '十六進位（基數 16）在程式設計中很常用，因為每個十六進位數字恰好對應 4 個二進位位元，是表示二進位資料的精簡方式。例如二進位的 11111111 用十六進位只要 FF。這讓十六進位非常適合表示記憶體位址、色碼（#FF0000）、MAC 位址等二進位資料。' },
  { question: '二進位和電腦運算有什麼關係？', answer: '電腦使用電子信號運作，信號只有開和關兩種狀態，自然對應到二進位（基數 2）的 0 和 1。電腦中所有的資料——數字、文字、圖片——最終都以二進位位元的序列來儲存和處理。理解二進位是理解電腦如何在硬體層級運作的基礎。' },
]

export default function IntegerBaseConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>整數進位轉換器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在二進位、八進位、十進位、十六進位及自訂進位之間轉換整數。</p>
      <IntegerBaseConverter labels={{
        inputPlaceholder: '輸入一個數字...',
        inputBase: '輸入進位',
        binary: '二進位',
        octal: '八進位',
        decimal: '十進位',
        hexadecimal: '十六進位',
        customBase: '自訂',
        conversions: '轉換結果',
        copy: '複製',
        copied: '已複製！',
        invalidInput: '輸入的數字對所選進位無效',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇輸入進位（二進位、八進位、十進位、十六進位，或 2 到 36 的自訂進位），然後輸入數字。工具會即時轉換並同時顯示所有常用進位的值。點擊任何結果旁的複製按鈕，即可複製到剪貼簿。本轉換器支援任意大的整數。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="integer-base-converter" locale="zh-tw" />
    </div>
  )
}
