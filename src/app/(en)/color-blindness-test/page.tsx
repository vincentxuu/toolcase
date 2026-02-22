import { Metadata } from 'next'
import ColorBlindnessTest from '@/components/tools/ColorBlindnessTest'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: 'Color Blindness Test | Online Tool',
  description: 'Free online color blindness test based on Ishihara plates. Quick screening for red-green color blindness and color vision deficiency. For reference only.',
  keywords: [
    'color blindness test',
    'color vision test',
    'Ishihara test',
    'red green color blind',
    'vision test',
  ],
}

export default async function Page() {
  const dict = await getDictionary('en')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">Color Blindness Test</h1>
        <p className="mb-8 text-muted-foreground">
          Simple online color blindness screening tool! Based on the famous Ishihara color blind test
          principle, quickly detect red-green color blindness or other color vision deficiencies. This
          test is for preliminary screening only - consult an eye care professional for accurate diagnosis.
        </p>
        <ColorBlindnessTest
          labels={{
            title: 'Color Blindness Test',
            subtitle: 'Ishihara Test',
            start: 'Start Test',
            next: 'Next',
            submit: 'View Result',
            restart: 'Restart Test',
            whatNumber: 'What number do you see?',
            enterAnswer: 'Enter the number',
            correct: 'Correct',
            incorrect: 'Incorrect',
            result: 'Test Result',
            normalVision: 'Normal color vision',
            possibleRedGreen: 'Possible red-green color blindness',
            possibleProtan: 'Possible protanopia (red deficiency)',
            possibleDeutan: 'Possible deuteranopia (green deficiency)',
            disclaimer: 'Important',
            disclaimerText:
              'This is a screening test only. For accurate diagnosis, please consult an eye care professional.',
            howToUse: 'How to use',
            tip1: 'View in good lighting conditions',
            tip2: 'Keep normal viewing distance from screen',
            tip3: 'Answer what number you see in each plate',
          }}
        />
      </div>
    </main>
  )
}
