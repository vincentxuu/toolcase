import { Metadata } from 'next'
import SocialVideoSpeed from '@/components/tools/SocialVideoSpeed'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Social Video Speed Tool - Speed Up Videos for IG, TikTok, Threads | toolcase',
  description: 'Speed up long videos to fit social media time limits. Preset durations for Instagram Reels, Stories, Threads, Facebook Reels, TikTok, YouTube Shorts, and X. Processed in your browser.',
  alternates: { canonical: 'https://toolcase.cc/image/social-video-speed', languages: { en: 'https://toolcase.cc/image/social-video-speed', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/image/social-video-speed' } },
}

const faqs = [
  { question: 'How does the video speed tool work?', answer: 'Upload your video and select a target social media platform. The tool calculates the speed multiplier needed to fit within the platform time limit, then uses FFmpeg (running in your browser via WebAssembly) to re-encode the video at the correct speed.' },
  { question: 'Is my video uploaded to a server?', answer: 'No. All video processing happens locally in your browser using FFmpeg WebAssembly. Your video never leaves your device.' },
  { question: 'What happens to the audio?', answer: 'You can choose to keep audio (it will be sped up to match the video speed) or remove it entirely. Keeping audio at high speed multipliers may sound unnatural.' },
  { question: 'What video formats are supported?', answer: 'The tool accepts MP4, WebM, and MOV files up to 500 MB. The output is always MP4 for maximum compatibility with social media platforms.' },
]

export default function SocialVideoSpeedPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Social Video Speed Tool', url: 'https://toolcase.cc/image/social-video-speed' },
        ]}
      />
      <ToolSchema
        name="Social Video Speed Tool"
        description="Speed up long videos to fit social media time limits. Preset durations for Instagram Reels, Stories, Threads, Facebook Reels, TikTok, YouTube Shorts, and X. Processed in your browser."
        url="https://toolcase.cc/image/social-video-speed"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Social Video Speed Tool' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Social Video Speed Tool</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Speed up videos to fit social media time limits. Select a platform preset or set a custom target duration.</p>
      <SocialVideoSpeed />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Upload a video file, then choose a target platform (Instagram Reels, TikTok, YouTube Shorts, etc.) or set a custom target duration. The tool will calculate the required speed multiplier. Choose whether to keep or remove audio, then click &quot;Speed Up Video&quot; to process. Once done, preview the result and download the sped-up MP4 file ready for posting.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="social-video-speed" locale="en" />
    </div>
    </>
  )
}
