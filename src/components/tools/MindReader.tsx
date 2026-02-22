'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Brain, Sparkles, RotateCcw, ArrowRight } from 'lucide-react'

interface MindReaderProps {
  labels?: {
    title: string
    subtitle: string
    start: string
    next: string
    restart: string
    step1: string
    step2: string
    step3: string
    step4: string
    step5: string
    result: string
    resultText: string
    howItWorks: string
    explanation: string
    yourNumber: string
    enterNumber: string
    tryAgain: string
  }
}

export default function MindReader({ labels }: MindReaderProps) {
  const l = {
    title: labels?.title ?? 'Mind Reader',
    subtitle: labels?.subtitle ?? 'I can read your mind!',
    start: labels?.start ?? 'Start',
    next: labels?.next ?? 'Next',
    restart: labels?.restart ?? 'Try Again',
    step1: labels?.step1 ?? 'Think of any number between 1 and 10',
    step2: labels?.step2 ?? 'Multiply it by 9',
    step3: labels?.step3 ?? 'Add the digits of the result together',
    step4: labels?.step4 ?? 'Subtract 5 from the result',
    step5: labels?.step5 ?? 'Convert the number to a letter (1=A, 2=B, 3=C, etc.)',
    result: labels?.result ?? 'I know what you\'re thinking!',
    resultText: labels?.resultText ?? 'You\'re thinking of the letter',
    howItWorks: labels?.howItWorks ?? 'How it works',
    explanation: labels?.explanation ?? 'The mathematical principle',
    yourNumber: labels?.yourNumber ?? 'Your number',
    enterNumber: labels?.enterNumber ?? 'Enter your number',
    tryAgain: labels?.tryAgain ?? 'Try with another number',
  }

  const [step, setStep] = useState(0)
  const [userNumber, setUserNumber] = useState<number | null>(null)

  const steps = [
    {
      title: l.step1,
      description: '選擇任何 1 到 10 之間的數字,記在心裡',
      showInput: true,
    },
    {
      title: l.step2,
      description: `將您的數字 ${userNumber} 乘以 9`,
      calculation: userNumber ? `${userNumber} × 9 = ${userNumber * 9}` : '',
    },
    {
      title: l.step3,
      description: userNumber
        ? `將 ${userNumber * 9} 的各位數字相加 (${userNumber * 9 >= 10 ? `${Math.floor((userNumber * 9) / 10)} + ${(userNumber * 9) % 10} = ${Math.floor((userNumber * 9) / 10) + ((userNumber * 9) % 10)}` : userNumber * 9})`
        : '將結果的各位數字相加',
      calculation: '',
    },
    {
      title: l.step4,
      description: '將結果減去 5',
      calculation: '9 - 5 = 4',
    },
    {
      title: l.step5,
      description: '將數字轉換成字母 (1=A, 2=B, 3=C, 4=D...)',
      calculation: '4 = D',
    },
  ]

  const handleStart = () => {
    if (userNumber && userNumber >= 1 && userNumber <= 10) {
      setStep(1)
    }
  }

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1)
    }
  }

  const handleRestart = () => {
    setStep(0)
    setUserNumber(null)
  }

  // Countries starting with D
  const countries = [
    '丹麥 (Denmark)',
    '多明尼加 (Dominican Republic)',
    '吉布地 (Djibouti)',
    '多米尼克 (Dominica)',
  ]

  const randomCountry = countries[Math.floor(Math.random() * countries.length)]

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      {step === 0 && (
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white">
          <div className="text-center">
            <Brain className="mx-auto mb-4 h-16 w-16" />
            <h2 className="mb-2 text-3xl font-bold">{l.title}</h2>
            <p className="text-lg opacity-90">{l.subtitle}</p>
          </div>
        </Card>
      )}

      {/* Game Steps */}
      {step === 0 && (
        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-center text-xl font-semibold">{l.step1}</h3>
              <div className="mx-auto max-w-xs space-y-4">
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={userNumber || ''}
                  onChange={e => {
                    const val = parseInt(e.target.value)
                    if (val >= 1 && val <= 10) {
                      setUserNumber(val)
                    } else if (e.target.value === '') {
                      setUserNumber(null)
                    }
                  }}
                  placeholder={l.enterNumber}
                  className="text-center text-2xl"
                />
                <Button onClick={handleStart} disabled={!userNumber} className="w-full gap-2" size="lg">
                  {l.start}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {step > 0 && step <= steps.length && (
        <Card className="p-8">
          <div className="space-y-6">
            {/* Progress */}
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-12 rounded-full transition-colors ${
                    index < step ? 'bg-purple-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                />
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center">
              <div className="mb-2 text-sm font-medium text-purple-600 dark:text-purple-400">
                步驟 {step}/{steps.length}
              </div>
              <h3 className="mb-4 text-2xl font-bold">{steps[step - 1].title}</h3>
              <p className="mb-4 text-lg text-muted-foreground">{steps[step - 1].description}</p>
              {steps[step - 1].calculation && (
                <div className="mx-auto max-w-md rounded-lg bg-muted p-4">
                  <p className="text-xl font-mono font-semibold">{steps[step - 1].calculation}</p>
                </div>
              )}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <Button onClick={handleRestart} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                {l.restart}
              </Button>
              <Button onClick={handleNext} className="gap-2" size="lg">
                {l.next}
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Final Result */}
      {step > steps.length && (
        <Card className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 text-white">
          <div className="space-y-6 text-center">
            <Sparkles className="mx-auto h-16 w-16 animate-pulse" />
            <div>
              <h3 className="mb-2 text-2xl font-bold">{l.result}</h3>
              <p className="mb-4 text-lg opacity-90">{l.resultText}</p>
              <div className="mx-auto mb-4 inline-block rounded-lg bg-white/20 px-8 py-4 backdrop-blur-sm">
                <p className="text-6xl font-bold">D</p>
              </div>
              <p className="mb-6 text-lg">
                想一個以 D 開頭的國家...
                <br />
                <span className="text-2xl font-bold">{randomCountry}</span>
              </p>
            </div>
            <Button onClick={handleRestart} variant="outline" className="gap-2 bg-white text-purple-600">
              <RotateCcw className="h-4 w-4" />
              {l.tryAgain}
            </Button>
          </div>
        </Card>
      )}

      {/* Explanation */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-3 font-semibold text-blue-900 dark:text-blue-100">{l.howItWorks}</h4>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
          <p>
            <strong>數學原理:</strong>
          </p>
          <ul className="ml-4 space-y-1">
            <li>• 任何 1-10 的數字乘以 9,結果都是 9 的倍數</li>
            <li>• 9 的倍數的各位數字相加必定等於 9 (如: 18→1+8=9, 27→2+7=9)</li>
            <li>• 9 - 5 = 4,所以不論選什麼數字,最終都會得到 4</li>
            <li>• 4 對應字母 D,而以 D 開頭的國家最常見的是丹麥 (Denmark)</li>
          </ul>
          <p className="mt-4">
            <strong>試試看:</strong> 用不同的數字驗證這個魔術!
          </p>
        </div>
      </Card>
    </div>
  )
}
