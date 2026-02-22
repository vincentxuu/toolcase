import Script from 'next/script'

interface ToolSchemaProps {
  name: string
  description: string
  url: string
  category?: string
}

export default function ToolSchema({ name, description, url, category }: ToolSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    url: url,
    applicationCategory: category || 'UtilitiesApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  }

  return (
    <Script
      id="tool-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
