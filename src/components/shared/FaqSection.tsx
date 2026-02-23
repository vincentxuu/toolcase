'use client'
import { useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export default function FaqSection({ items, title = 'FAQ' }: { items: FaqItem[]; title?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="border border-[var(--color-border)] rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 text-left bg-transparent border-0 text-[var(--color-text)] text-base font-medium cursor-pointer flex justify-between items-center"
            >
              {item.question}
              <span className={`transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-4 pb-4 text-[var(--color-text-secondary)] leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </section>
  )
}
