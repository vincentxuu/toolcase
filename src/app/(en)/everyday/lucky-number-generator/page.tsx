import { Metadata } from 'next'
import LuckyNumberGenerator from '@/components/tools/LuckyNumberGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Lucky Number Generator | Random Online Tool',
  description: 'Free online lucky number generator. Customize range and quantity, support lottery numbers and password generation. Generate your lucky numbers randomly.',
  keywords: ['lucky number', 'lottery', 'random numbers', 'number generator'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-bold">Lucky Number Generator</h1>
        <p className="mb-8 text-muted-foreground">
          Generate your lucky numbers! Customize number range and quantity, perfect for lottery numbers, password generation, and more. Let randomness decide your lucky numbers.
        </p>
        <LuckyNumberGenerator
          labels={{
            generate: 'Generate',
            minNumber: 'Min',
            maxNumber: 'Max',
            count: 'Count',
            allowDuplicates: 'Allow Duplicates',
            sort: 'Sort',
            result: 'Your Lucky Numbers',
            copy: 'Copy',
            copied: 'Copied!',
            generateAgain: 'Generate Again',
          }}
        />
      </div>
    </main>
  )
}
