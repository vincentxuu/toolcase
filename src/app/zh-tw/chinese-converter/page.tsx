import { Metadata } from 'next'
import ChineseConverter from '@/components/tools/ChineseConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '簡繁轉換 - 免費線上工具 | toolcase',
  description: '即時在簡體中文和繁體中文之間轉換。免費線上簡繁轉換工具，即時轉換、不需註冊。',
  alternates: {
    canonical: 'https://toolcase.cc/zh-tw/chinese-converter',
    languages: {
      en: 'https://toolcase.cc/chinese-converter',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/chinese-converter',
    },
  },
}

const faqs = [
  {
    question: '簡體字和繁體字有什麼不同？',
    answer: '簡體字是在 1950-60 年代由中國大陸推行的，目的是提高識字率。簡體字比繁體字的筆畫少。繁體字目前在台灣、香港和澳門使用。',
  },
  {
    question: '轉換準確度如何？',
    answer: '轉換器涵蓋最常用的字元對應，能處理日常文字。某些依賴上下文的轉換（一個簡體字對應多個繁體字的情況）可能需要手動檢查。',
  },
  {
    question: '可以轉換長篇文字嗎？',
    answer: '可以！轉換器適用於任何長度的文字。轉換在你輸入時即時發生，直接在瀏覽器中完成。',
  },
  {
    question: '文字會被傳送到伺服器嗎？',
    answer: '不會。所有轉換都在你的瀏覽器中本地完成，使用內建的字元對應表。你的文字永遠不會離開你的裝置。',
  },
]

export default function ChineseConverterPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>簡繁轉換</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        即時在簡體中文和繁體中文字元之間轉換。
      </p>

      <ChineseConverter
        labels={{
          toTraditional: '轉繁體',
          toSimplified: '轉簡體',
          copy: '複製',
          copied: '已複製！',
          clear: '清除',
          swap: '交換',
          uploadFile: '上傳檔案',
          downloadFile: '下載',
          inputPlaceholder: '在此輸入中文文字...',
          outputPlaceholder: '轉換後的文字會顯示在這裡...',
          charCount: '個字元',
        }}
      />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何轉換中文文字</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          選擇轉換方向（簡體轉繁體或繁體轉簡體），然後在左側面板貼上或輸入中文文字。轉換後的文字會即時出現在右側面板。
          使用「交換」按鈕可以反轉方向並交換輸入和輸出文字。
        </p>
      </section>

      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="chinese-converter" locale="zh-tw" />
    </div>
  )
}
