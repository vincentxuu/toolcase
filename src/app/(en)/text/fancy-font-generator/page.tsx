import { Metadata } from 'next'
import FancyFontGenerator from '@/components/tools/FancyFontGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Instagram Font Generator | Online Tool',
  description: 'Free online Instagram font generator. 11 fancy font styles including bold, italic, script, circled, squared and more. Copy to Instagram, Facebook, Twitter easily.',
  keywords: ['Instagram fonts', 'fancy fonts', 'Unicode fonts', 'social media fonts', 'cool text', 'font generator'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Instagram Font Generator</h1>
        <p className="mb-8 text-muted-foreground">
          Create unique social media style! 11 fancy font styles including bold, italic, script, fraktur, circled, squared and more. Using Unicode characters, copy directly to Instagram, Facebook, Twitter and other platforms to make your posts stand out.
        </p>
        <FancyFontGenerator
          labels={{
            inputText: 'Input Text',
            inputPlaceholder: 'Enter your text here...',
            results: 'Fancy Fonts',
            copy: 'Copy',
            copied: 'Copied!',
          }}
        />
      </div>
    </main>
  )
}
