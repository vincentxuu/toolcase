import { Metadata } from 'next'
import ScreenRecorder from '@/components/tools/ScreenRecorder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '螢幕錄影 - 免費線上錄製螢幕 | toolcase',
  description: '直接在瀏覽器中錄製螢幕、視窗或瀏覽器分頁。下載為 WebM 影片。無需安裝或註冊。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/screen-recorder', languages: { en: 'https://toolcase.cc/everyday/screen-recorder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/screen-recorder' } },
}

const faqs = [
  { question: '可以錄製什麼？', answer: '您可以錄製整個螢幕、特定應用程式視窗或瀏覽器分頁。開始錄製時，瀏覽器會提示您選擇要分享的內容。' },
  { question: '錄影儲存為什麼格式？', answer: '錄影儲存為 WebM 影片檔案，現代瀏覽器和影片播放器都廣泛支援此格式。' },
  { question: '我的錄影是否安全？', answer: '是的。錄影完全在您的瀏覽器中使用 MediaRecorder API 進行，不會上傳到任何伺服器。影片保留在您的裝置上。' },
]

export default function ScreenRecorderPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '螢幕錄影', url: 'https://toolcase.cc/zh-tw/everyday/screen-recorder' },
        ]}
      />
      <ToolSchema
        name="螢幕錄影"
        description="直接在瀏覽器中錄製螢幕、視窗或瀏覽器分頁。下載為 WebM 影片。無需安裝或註冊。"
        url="https://toolcase.cc/zh-tw/everyday/screen-recorder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '螢幕錄影' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>螢幕錄影</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>直接在瀏覽器中錄製螢幕、視窗或分頁。無需安裝。</p>
      <ScreenRecorder labels={{ startRecording: '開始錄製', stopRecording: '停止錄製', download: '下載', reset: '重設', recording: '錄製中…', preview: '預覽', selectScreen: '點擊選擇要錄製的螢幕、視窗或分頁。', includeAudio: '包含系統音訊' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="screen-recorder" locale="zh-tw" />
    </div>
    </>
  )
}
