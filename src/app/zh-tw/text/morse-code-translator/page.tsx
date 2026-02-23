import { Metadata } from 'next'
import MorseCodeTranslator from '@/components/tools/MorseCodeTranslator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '摩斯密碼翻譯器 - 文字轉摩斯密碼 | toolcase',
  description: '即時翻譯文字與摩斯密碼。支援音訊播放、參考表和複製到剪貼簿。免費線上摩斯密碼轉換工具。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/text/morse-code-translator', languages: { en: 'https://toolcase.cc/text/morse-code-translator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text/morse-code-translator' } },
}

const faqs = [
  { question: '摩斯密碼翻譯器如何運作？', answer: '此工具使用國際摩斯密碼標準，將每個字母、數字和常見標點符號對應為點（.）和劃（-）的組合。單字之間以斜線（/）分隔。可雙向翻譯：文字轉摩斯密碼，以及摩斯密碼轉文字。' },
  { question: '可以聆聽摩斯密碼嗎？', answer: '可以！點擊播放按鈕即可聽到摩斯密碼的音訊。工具使用 Web Audio API 以 600 Hz 頻率產生準確的點和劃聲音，遵循標準摩斯密碼時間比例。' },
  { question: '支援哪些字元？', answer: '翻譯器支援 26 個英文字母（A-Z）、數字（0-9），以及常見標點符號，包括句號、逗號、問號、驚嘆號、斜線、括號、冒號、分號等。' },
]

export default function MorseCodeTranslatorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '摩斯密碼翻譯器', url: 'https://toolcase.cc/zh-tw/text/morse-code-translator' },
        ]}
      />
      <ToolSchema
        name="摩斯密碼翻譯器"
        description="即時翻譯文字與摩斯密碼。支援音訊播放、參考表和複製到剪貼簿。免費線上摩斯密碼轉換工具。"
        url="https://toolcase.cc/zh-tw/text/morse-code-translator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '摩斯密碼翻譯器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>摩斯密碼翻譯器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>在文字與摩斯密碼之間互相轉換。可聆聽摩斯密碼音訊或查看完整參考表。</p>
      <MorseCodeTranslator labels={{ text: '文字', morseCode: '摩斯密碼', textToMorse: '文字轉摩斯', morseToText: '摩斯轉文字', play: '播放', stop: '停止', referenceChart: '參考表', copy: '複製', copied: '已複製！' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>選擇翻譯方向 — 文字轉摩斯或摩斯轉文字 — 然後輸入或貼上內容。翻譯結果會即時顯示在輸出欄位中。點擊複製即可複製結果。使用播放按鈕聆聽摩斯密碼音訊，或切換參考表查看字元與摩斯密碼的完整對照。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="morse-code-translator" locale="zh-tw" />
    </div>
    </>
  )
}
