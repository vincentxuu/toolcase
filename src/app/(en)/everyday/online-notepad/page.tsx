import { Metadata } from 'next'
import OnlineNotepad from '@/components/tools/OnlineNotepad'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Online Notepad - Free Text Editor with Auto-Save | toolcase',
  description: 'Write and save notes instantly with our free online notepad. Features auto-save to local storage, character and word count, and download as .txt file.',
  alternates: { canonical: 'https://toolcase.cc/everyday/online-notepad', languages: { en: 'https://toolcase.cc/everyday/online-notepad', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/everyday/online-notepad' } },
}

const faqs = [
  { question: 'Will my notes be saved if I close the browser?', answer: 'Yes! Your notes are automatically saved to your browser\'s local storage every time you type. When you reopen the page, your notes will be right where you left them.' },
  { question: 'Is my data private?', answer: 'Absolutely. All notes are stored locally in your browser. Nothing is sent to any server, so your data stays completely private on your device.' },
  { question: 'Can I download my notes?', answer: 'Yes, click the "Download .txt" button to save your notes as a plain text file to your computer at any time.' },
]

export default function OnlineNotepadPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Online Notepad', url: 'https://toolcase.cc/everyday/online-notepad' },
        ]}
      />
      <ToolSchema
        name="Online Notepad"
        description="Write and save notes instantly with our free online notepad. Features auto-save to local storage, character and word count, and download as .txt file."
        url="https://toolcase.cc/everyday/online-notepad"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Online Notepad' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Online Notepad</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>A simple, distraction-free notepad with auto-save. Your notes are stored locally and never leave your browser.</p>
      <OnlineNotepad />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Simply start typing in the text area above. Your notes are automatically saved to your browser every time you make a change. Use the character and word counters to track your progress. When you are done, download your notes as a .txt file or clear the notepad to start fresh.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="online-notepad" locale="en" />
    </div>
    </>
  )
}
