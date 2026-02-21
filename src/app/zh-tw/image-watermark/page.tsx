import { Metadata } from 'next'
import ImageWatermark from '@/components/tools/ImageWatermark'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: '圖片浮水印 - 免費線上工具 | toolcase',
  description: '線上為圖片加上文字浮水印。可自訂文字、字體大小、顏色、透明度及位置。支援滿版浮水印。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/image-watermark', languages: { en: 'https://toolcase.cc/image-watermark', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image-watermark' } },
}

const faqs = [
  { question: '浮水印有哪些位置可以選擇？', answer: '可以將浮水印放在中央、四個角落（左上、右上、左下、右下），或以對角線重複排列覆蓋整張圖片，以提供最大程度的保護。' },
  { question: '可以調整浮水印的透明度嗎？', answer: '可以。使用透明度滑桿設定 5% 到 100% 的透明度。通常 30-50% 是理想的值，既能保護圖片又不會過於干擾內容。' },
  { question: '圖片會被上傳到伺服器嗎？', answer: '不會。所有浮水印處理完全在您的瀏覽器中使用 Canvas API 完成，圖片不會離開您的裝置。' },
]

export default function ImageWatermarkPageZhTw() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>圖片浮水印</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>為圖片加上自訂文字浮水印，支援多種位置與滿版模式。</p>
      <ImageWatermark labels={{ uploadImage: '上傳圖片', watermarkText: '浮水印文字', fontSize: '字體大小', color: '顏色', opacity: '透明度', position: '位置', posCenter: '中央', posTopLeft: '左上', posTopRight: '右上', posBottomLeft: '左下', posBottomRight: '右下', posTiled: '滿版', apply: '套用浮水印', download: '下載', preview: '預覽' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>上傳圖片，然後輸入浮水印文字。自訂字體大小、顏色、透明度和位置。選擇「滿版」可產生覆蓋整張圖片的重複對角線浮水印。點擊「套用浮水印」預覽效果，滿意後即可下載。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="image-watermark" locale="zh-tw" />
    </div>
  )
}
