import { Metadata } from 'next'
import ScreenRecorder from '@/components/tools/ScreenRecorder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Screen Recorder - Record Screen Online Free | toolcase',
  description: 'Record your screen, window, or browser tab directly in the browser. Download as WebM video. No installation or signup required.',
  alternates: { canonical: 'https://toolcase.cc/everyday/screen-recorder', languages: { en: 'https://toolcase.cc/everyday/screen-recorder', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/screen-recorder' } },
}

const faqs = [
  { question: 'What can I record?', answer: 'You can record your entire screen, a specific application window, or a browser tab. The browser will prompt you to choose what to share when you start recording.' },
  { question: 'What format is the recording saved in?', answer: 'Recordings are saved as WebM video files, which are widely supported by modern browsers and video players. You can convert to MP4 using our other tools if needed.' },
  { question: 'Is my recording private?', answer: 'Yes. The recording is done entirely in your browser using the MediaRecorder API. Nothing is uploaded to any server. The video stays on your device.' },
]

export default function ScreenRecorderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Screen Recorder', url: 'https://toolcase.cc/everyday/screen-recorder' },
        ]}
      />
      <ToolSchema
        name="Screen Recorder"
        description="Record your screen, window, or browser tab directly in the browser. Download as WebM video. No installation or signup required."
        url="https://toolcase.cc/everyday/screen-recorder"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Screen Recorder' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Screen Recorder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Record your screen, window, or tab directly in the browser. No installation needed.</p>
      <ScreenRecorder />
      <FaqSection items={faqs} />
      <RelatedTools current="screen-recorder" locale="en" />
    </div>
    </>
  )
}
