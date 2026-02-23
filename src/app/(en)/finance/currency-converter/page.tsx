import { Metadata } from 'next'
import CurrencyConverter from '@/components/tools/CurrencyConverter'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'Currency Converter - Free Online Tool | toolcase',
  description: 'Convert between world currencies with live exchange rates. Free online currency converter supporting USD, EUR, TWD, JPY, GBP, and 30+ currencies.',
  alternates: { canonical: 'https://toolcase.cc/finance/currency-converter', languages: { en: 'https://toolcase.cc/finance/currency-converter', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/currency-converter' } },
}

const faqs = [
  { question: 'Where do the exchange rates come from?', answer: 'Our exchange rates are sourced from the European Central Bank (ECB) via the Frankfurter API. Rates are updated daily on business days and cached for one hour to ensure fast performance.' },
  { question: 'How accurate are the exchange rates?', answer: 'The rates reflect official ECB reference rates, which are widely used by financial institutions. However, actual exchange rates at banks or currency exchange services may differ slightly due to fees and spreads.' },
  { question: 'Which currencies are supported?', answer: 'We support over 30 currencies including USD, EUR, TWD, JPY, GBP, CNY, KRW, HKD, SGD, AUD, CAD, CHF, and many more. The most popular currencies are listed at the top of the dropdown for easy access.' },
]

export default function CurrencyConverterPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'Currency Converter', url: 'https://toolcase.cc/finance/currency-converter' },
        ]}
      />
      <ToolSchema
        name="Currency Converter"
        description="Convert between world currencies with live exchange rates. Free online currency converter supporting USD, EUR, TWD, JPY, GBP, and 30+ currencies."
        url="https://toolcase.cc/finance/currency-converter"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'Currency Converter' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Currency Converter</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Convert between world currencies with live exchange rates.</p>
      <CurrencyConverter />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter the amount you want to convert, select the source and target currencies, and the result will update automatically. Use the swap button to quickly reverse the conversion direction.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="currency-converter" locale="en" />
    </div>
    </>
  )
}
