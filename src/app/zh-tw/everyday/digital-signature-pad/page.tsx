import { Metadata } from 'next'
import DigitalSignaturePad from '@/components/tools/DigitalSignaturePad'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '電子簽名板 - 繪製與下載簽名 | toolcase',
  description: '在電子簽名板上繪製您的簽名，並下載為透明或白色背景的 PNG 圖片。支援桌面和行動裝置。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/everyday/digital-signature-pad', languages: { en: 'https://toolcase.cc/everyday/digital-signature-pad', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/digital-signature-pad' } },
}

const faqs = [
  { question: '可以在手機上使用嗎？', answer: '可以！簽名板支援行動裝置和平板的觸控輸入，您可以用手指或觸控筆繪製。' },
  { question: '簽名儲存為什麼格式？', answer: '簽名下載為 PNG 圖片。您可以選擇透明背景（適合疊加在文件上）或白色背景。' },
]

export default function DigitalSignaturePadPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '電子簽名板', url: 'https://toolcase.cc/zh-tw/everyday/digital-signature-pad' },
        ]}
      />
      <ToolSchema
        name="電子簽名板"
        description="在電子簽名板上繪製您的簽名，並下載為透明或白色背景的 PNG 圖片。支援桌面和行動裝置。"
        url="https://toolcase.cc/zh-tw/everyday/digital-signature-pad"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '電子簽名板' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>電子簽名板</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>繪製您的簽名並下載為 PNG。支援透明和白色背景。</p>
      <DigitalSignaturePad labels={{ drawSignature: '在下方繪製您的簽名', clear: '清除', download: '下載 PNG', penColor: '筆色', penSize: '筆寬', backgroundColor: '背景', transparent: '透明', white: '白色' }} />
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="digital-signature-pad" locale="zh-tw" />
    </div>
    </>
  )
}
