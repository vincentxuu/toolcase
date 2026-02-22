import Script from 'next/script'

export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'toolcase',
    url: 'https://toolcase.cc',
    logo: 'https://toolcase.cc/logo.png',
    description: 'Free online tools for everyone - no sign-up required',
    sameAs: [],
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
