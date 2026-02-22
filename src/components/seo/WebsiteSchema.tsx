import Script from 'next/script'

export default function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'toolcase',
    description: 'Free online tools for everyone',
    url: 'https://toolcase.cc',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://toolcase.cc/?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: ['en', 'zh-Hant-TW'],
  }

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
