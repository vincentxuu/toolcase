import { Metadata } from 'next'
import SocialVideoSpeed from '@/components/tools/SocialVideoSpeed'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '社群影片快轉工具 - IG、TikTok、Threads 影片加速 | toolcase',
  description: '將長影片加速以符合社群媒體時間限制。預設 Instagram Reels、限時動態、Threads、Facebook Reels、TikTok、YouTube Shorts 和 X 的時長。在瀏覽器中處理。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/social-video-speed', languages: { en: 'https://toolcase.cc/social-video-speed', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/social-video-speed' } },
}

const faqs = [
  { question: '影片快轉工具是如何運作的？', answer: '上傳影片並選擇目標社群平台。工具會計算所需的加速倍數以符合平台時間限制，然後使用 FFmpeg（透過 WebAssembly 在瀏覽器中運行）以正確的速度重新編碼影片。' },
  { question: '影片會上傳到伺服器嗎？', answer: '不會。所有影片處理都在您的瀏覽器中使用 FFmpeg WebAssembly 進行。影片不會離開您的裝置。' },
  { question: '音訊會怎樣？', answer: '您可以選擇保留音訊（會加速以配合影片速度）或完全移除。在高倍速下保留音訊可能聽起來不自然。' },
  { question: '支援哪些影片格式？', answer: '工具接受 MP4、WebM 和 MOV 檔案，最大 500 MB。輸出一律為 MP4 格式，以確保與社群媒體平台的最佳相容性。' },
]

export default function SocialVideoSpeedPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>社群影片快轉工具</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>加速影片以符合社群媒體時間限制。選擇平台預設或自訂目標時長。</p>
      <SocialVideoSpeed labels={{
        upload: '上傳影片',
        dragDrop: '拖放影片至此',
        orClick: '或點擊瀏覽',
        originalDuration: '原始時長',
        targetDuration: '目標時長',
        platform: '平台',
        custom: '自訂',
        speedMultiplier: '速度',
        keepAudio: '保留音訊（加速）',
        removeAudio: '移除音訊',
        process: '開始加速',
        processing: '處理中…',
        download: '下載',
        preview: '預覽',
        reset: '重設',
        seconds: '秒',
        noSpeedNeeded: '影片已符合限制！無需加速。',
        maxFileSize: '最大檔案大小：500 MB',
        unsupportedFormat: '不支援的格式。請使用 MP4、WebM 或 MOV。',
        loadingFfmpeg: '載入影片引擎中…',
        errorProcessing: '處理影片時發生錯誤。請嘗試其他檔案。',
      }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳影片檔案，然後選擇目標平台（Instagram Reels、TikTok、YouTube Shorts 等）或設定自訂目標時長。工具會計算所需的加速倍數。選擇保留或移除音訊，然後點擊「開始加速」進行處理。完成後預覽結果並下載加速後的 MP4 檔案即可發布。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="social-video-speed" locale="zh-tw" />
    </div>
  )
}
