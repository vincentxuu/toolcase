import { Metadata } from 'next'
import PhoneNumberGenerator from '@/components/tools/PhoneNumberGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Taiwan Phone Number Generator | Online Tool',
  description: 'Free online Taiwan mobile phone number generator. Support Chunghwa Telecom, Taiwan Mobile, FarEasTone, Taiwan Star, and APTG carriers. Batch generate test phone numbers.',
  keywords: ['phone number generator', 'Taiwan mobile', 'test data', 'carrier prefix', 'phone format'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Taiwan Phone Number Generator</h1>
        <p className="mb-8 text-muted-foreground">
          Generate Taiwan mobile phone numbers easily! Support all major carriers including Chunghwa Telecom, Taiwan Mobile, FarEasTone, Taiwan Star, and APTG. Batch generate with custom formats, perfect for form testing and database seeding.
        </p>
        <PhoneNumberGenerator
          labels={{
            title: 'Taiwan Phone Number Generator',
            description: 'Generate valid Taiwan mobile phone numbers',
            carrier: 'Carrier',
            allCarriers: 'All Carriers',
            chunghwa: 'Chunghwa Telecom',
            taiwanMobile: 'Taiwan Mobile',
            farEasTone: 'FarEasTone',
            taiwanStar: 'Taiwan Star',
            aptg: 'APTG',
            count: 'Count',
            generate: 'Generate',
            results: 'Generated Numbers',
            copy: 'Copy',
            copied: 'Copied!',
            copyAll: 'Copy All',
            format: 'Format',
            withDashes: 'With Dashes',
            withoutDashes: 'Without Dashes',
          }}
        />
      </div>
    </main>
  )
}
