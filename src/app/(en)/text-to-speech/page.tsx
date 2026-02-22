import { Metadata } from 'next'
import TextToSpeech from '@/components/tools/TextToSpeech'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Text to Speech - Free Online Tool | toolcase',
  description:
    'Convert text to natural-sounding speech using your browser\'s built-in speech synthesis. Choose from multiple voices, adjust speed and pitch, and listen instantly.',
  alternates: {
    canonical: 'https://toolcase.cc/text-to-speech',
    languages: {
      en: 'https://toolcase.cc/text-to-speech',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/text-to-speech',
    },
  },
}

const faqs = [
  {
    question: 'How does the text-to-speech tool work?',
    answer:
      'The tool uses the Web Speech API built into modern browsers to synthesise speech from text. No server calls are made — your browser handles the entire conversion process locally, ensuring privacy and fast performance.',
  },
  {
    question: 'Can I choose different voices and languages?',
    answer:
      'Yes. The available voices depend on your browser and operating system. Most systems offer a selection of male and female voices in multiple languages. You can preview each voice and select the one that sounds best for your needs.',
  },
  {
    question: 'Can I adjust the speed and pitch of the speech?',
    answer:
      'Absolutely. Use the rate slider to speed up or slow down the speech, and the pitch slider to make the voice higher or lower. These adjustments let you fine-tune the output for presentations, accessibility, or personal preference.',
  },
]

export default function TextToSpeechPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Text to Speech', url: 'https://toolcase.cc/text-to-speech' },
        ]}
      />
      <ToolSchema
        name="Text to Speech"
        description="Convert text to natural-sounding speech using your browser\"
        url="https://toolcase.cc/text-to-speech"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Text to Speech' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Text to Speech</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Type or paste text and hear it read aloud with natural-sounding voices.
      </p>

      <TextToSpeech />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Enter or paste the text you want to hear into the text area. Select a voice from the dropdown menu and
          optionally adjust the speed and pitch sliders. Click &quot;Speak&quot; to start playback. You can pause,
          resume, or stop the speech at any time. The tool uses your browser&apos;s built-in speech synthesis engine, so
          no audio data is sent to any server. It works best in Chrome, Edge, and Safari.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="text-to-speech" locale="en" />
    </div>
    </>
  )
}
