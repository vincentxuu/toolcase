import { Metadata } from 'next'
import TextToSpeech from '@/components/tools/TextToSpeech'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '文字轉語音 - 免費線上工具 | toolcase',
  description: '將文字轉換為語音朗讀，支援多種語音、速度和音調調整。免費線上 TTS 文字轉語音工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text-to-speech', languages: { en: 'https://toolcase.cc/text-to-speech', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text-to-speech' } },
}

const faqs = [
  { question: '支援哪些語言的語音？', answer: '可用的語音取決於您的瀏覽器和作業系統。大多數現代瀏覽器都支援中文（國語）、英文、日文等多種語言的語音。您可以在語音選單中查看所有可用的選項。' },
  { question: '可以調整朗讀的速度和音調嗎？', answer: '可以。使用速度滑桿可以加快或放慢朗讀速度，音調滑桿可以調整聲音的高低。這對於語言學習或無障礙需求非常實用。' },
  { question: '這個工具需要網路連線嗎？', answer: '文字轉語音功能使用瀏覽器內建的 Web Speech API，大部分語音已預先安裝在您的裝置上，因此不需要額外的網路連線即可使用。不過某些語音可能需要下載。' },
]

export default function TextToSpeechPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '文字轉語音', url: 'https://toolcase.cc/zh-tw/text-to-speech' },
        ]}
      />
      <ToolSchema
        name="文字轉語音"
        description="將文字轉換為語音朗讀，支援多種語音、速度和音調調整。免費線上 TTS 文字轉語音工具。"
        url="https://toolcase.cc/zh-tw/text-to-speech"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '文字轉語音' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>文字轉語音</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>將文字轉換為語音朗讀，支援多種語音和速度調整。</p>
      <TextToSpeech labels={{ text: '文字', voice: '語音', rate: '速度', pitch: '音調', play: '播放', pause: '暫停', stop: '停止', speaking: '播放中...', paused: '已暫停', ready: '就緒' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>在文字輸入區域輸入或貼上您要朗讀的內容，選擇語音類型，調整朗讀速度和音調，然後點擊播放即可聆聽。朗讀過程中可以暫停或停止。適合用於校對文章、語言學習或無障礙輔助。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="text-to-speech" locale="zh-tw" />
    </div>
    </>
  )
}
