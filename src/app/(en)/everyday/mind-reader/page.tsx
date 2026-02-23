import { Metadata } from 'next'
import MindReader from '@/components/tools/MindReader'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Mind Reader Game | Online Tool',
  description: 'Fun mind reading mathematical magic game! Think of a number, follow the steps, and the system will guess your thought. Learn the mathematical principle behind it.',
  keywords: ['mind reader', 'math magic', 'interactive game', 'number game', 'magic trick', 'entertainment'],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Mind Reader Game</h1>
        <p className="mb-8 text-muted-foreground">
          Amazing mind reading magic! Think of a number between 1 and 10, follow simple mathematical steps, and the system will accurately guess your final thought. This is a classic mathematical magic trick - learn the principle and amaze your friends!
        </p>
        <MindReader
          labels={{
            title: 'Mind Reader',
            subtitle: 'I can read your mind!',
            start: 'Start',
            next: 'Next',
            restart: 'Try Again',
            step1: 'Think of any number between 1 and 10',
            step2: 'Multiply it by 9',
            step3: 'Add the digits of the result together',
            step4: 'Subtract 5 from the result',
            step5: 'Convert the number to a letter (1=A, 2=B, 3=C, 4=D...)',
            result: 'I know what you\'re thinking!',
            resultText: 'You\'re thinking of the letter',
            howItWorks: '💡 How it works',
            explanation: 'Mathematical principle',
            yourNumber: 'Your number',
            enterNumber: 'Enter your number',
            tryAgain: 'Try with another number',
          }}
        />
      </div>
    </main>
  )
}
