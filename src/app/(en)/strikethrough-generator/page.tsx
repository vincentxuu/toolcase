import { Metadata } from 'next'
import StrikethroughGenerator from '@/components/tools/StrikethroughGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Strikethrough Text Generator | Online Tool',
  description: 'Free online strikethrough text generator. Support single line, double line, slash, tilde, and X mark styles. Copy to social media easily, support multiple languages.',
  keywords: ['strikethrough', 'strikethrough text', 'text generator', 'unicode strikethrough', 'social media text'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Strikethrough Text Generator</h1>
        <p className="mb-8 text-muted-foreground">
          Generate various strikethrough text effects easily! Support single line, double line, slash, tilde, and X mark styles. Using Unicode combining characters, copy directly to Facebook, Instagram, Twitter and other social media platforms.
        </p>
        <StrikethroughGenerator
          labels={{
            inputText: 'Input Text',
            inputPlaceholder: 'Enter your text here...',
            results: 'Results',
            copy: 'Copy',
            copied: 'Copied!',
            type1: 'Single Line',
            type2: 'Double Line',
            type3: 'Slash',
            type4: 'Tilde',
            type5: 'X Mark',
          }}
        />
      </div>
    </main>
  )
}
