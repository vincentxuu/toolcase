'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Eye, Check, X, RotateCcw, ChevronRight } from 'lucide-react'

interface TestPlate {
  id: number
  answer: string
  normalVision: string
  redGreenBlind: string
  description: string
  colors: { normal: string; rg: string }
}

interface ColorBlindnessTestProps {
  labels?: {
    title: string
    subtitle: string
    start: string
    next: string
    submit: string
    restart: string
    whatNumber: string
    enterAnswer: string
    correct: string
    incorrect: string
    result: string
    normalVision: string
    possibleRedGreen: string
    possibleProtan: string
    possibleDeutan: string
    disclaimer: string
    disclaimerText: string
    howToUse: string
    tip1: string
    tip2: string
    tip3: string
  }
}

export default function ColorBlindnessTest({ labels }: ColorBlindnessTestProps) {
  const l = {
    title: labels?.title ?? 'Color Blindness Test',
    subtitle: labels?.subtitle ?? 'Ishihara Test',
    start: labels?.start ?? 'Start Test',
    next: labels?.next ?? 'Next',
    submit: labels?.submit ?? 'Submit',
    restart: labels?.restart ?? 'Restart Test',
    whatNumber: labels?.whatNumber ?? 'What number do you see?',
    enterAnswer: labels?.enterAnswer ?? 'Enter the number',
    correct: labels?.correct ?? 'Correct',
    incorrect: labels?.incorrect ?? 'Incorrect',
    result: labels?.result ?? 'Test Result',
    normalVision: labels?.normalVision ?? 'Normal color vision',
    possibleRedGreen: labels?.possibleRedGreen ?? 'Possible red-green color blindness',
    possibleProtan: labels?.possibleProtan ?? 'Possible protanopia (red deficiency)',
    possibleDeutan: labels?.possibleDeutan ?? 'Possible deuteranopia (green deficiency)',
    disclaimer: labels?.disclaimer ?? 'Important',
    disclaimerText:
      labels?.disclaimerText ??
      'This is a screening test only. For accurate diagnosis, please consult an eye care professional.',
    howToUse: labels?.howToUse ?? 'How to use',
    tip1: labels?.tip1 ?? 'View in good lighting conditions',
    tip2: labels?.tip2 ?? 'Keep normal viewing distance from screen',
    tip3: labels?.tip3 ?? 'Answer what number you see in each plate',
  }

  // Simplified test plates with descriptions
  const testPlates: TestPlate[] = [
    {
      id: 1,
      answer: '12',
      normalVision: '12',
      redGreenBlind: 'Nothing or very faint',
      description: '正常色覺者能看到 12',
      colors: { normal: '#e74c3c', rg: '#95a5a6' },
    },
    {
      id: 2,
      answer: '8',
      normalVision: '8',
      redGreenBlind: '3',
      description: '正常色覺看到 8,紅綠色盲看到 3',
      colors: { normal: '#2ecc71', rg: '#e67e22' },
    },
    {
      id: 3,
      answer: '6',
      normalVision: '6',
      redGreenBlind: 'Nothing',
      description: '正常色覺者能看到 6',
      colors: { normal: '#3498db', rg: '#95a5a6' },
    },
    {
      id: 4,
      answer: '29',
      normalVision: '29',
      redGreenBlind: '70',
      description: '正常色覺看到 29,紅綠色盲看到 70',
      colors: { normal: '#e74c3c', rg: '#27ae60' },
    },
    {
      id: 5,
      answer: '45',
      normalVision: '45',
      redGreenBlind: 'Nothing',
      description: '正常色覺者能看到 45',
      colors: { normal: '#9b59b6', rg: '#95a5a6' },
    },
  ]

  const [started, setStarted] = useState(false)
  const [currentPlate, setCurrentPlate] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [answers, setAnswers] = useState<boolean[]>([])
  const [showResult, setShowResult] = useState(false)

  const handleStart = () => {
    setStarted(true)
    setCurrentPlate(0)
    setAnswers([])
    setUserAnswer('')
    setShowResult(false)
  }

  const handleSubmit = () => {
    const plate = testPlates[currentPlate]
    const isCorrect =
      userAnswer.trim() === plate.answer || userAnswer.trim() === plate.normalVision

    setAnswers([...answers, isCorrect])

    if (currentPlate < testPlates.length - 1) {
      setCurrentPlate(currentPlate + 1)
      setUserAnswer('')
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setStarted(false)
    setCurrentPlate(0)
    setAnswers([])
    setUserAnswer('')
    setShowResult(false)
  }

  const correctCount = answers.filter(a => a).length
  const totalCount = answers.length

  const getResult = () => {
    const percentage = (correctCount / totalCount) * 100

    if (percentage >= 80) {
      return {
        type: 'success',
        title: l.normalVision,
        description: '您的色覺檢測結果正常,能夠正確辨識大部分顏色。',
      }
    } else if (percentage >= 40) {
      return {
        type: 'warning',
        title: l.possibleRedGreen,
        description: '您可能有輕微的紅綠色盲。建議諮詢眼科專業醫師進行詳細檢查。',
      }
    } else {
      return {
        type: 'error',
        title: l.possibleRedGreen,
        description: '檢測結果顯示您可能有紅綠色盲。強烈建議諮詢眼科專業醫師。',
      }
    }
  }

  // Generate simple Ishihara-style pattern
  const generatePattern = (plateId: number) => {
    const dots = []
    const size = 300
    const dotSize = 12
    const plate = testPlates[plateId]

    // Generate background dots
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * (size - dotSize * 2) + dotSize
      const y = Math.random() * (size - dotSize * 2) + dotSize
      const isNumber = Math.random() > 0.7

      dots.push({
        x,
        y,
        size: dotSize + Math.random() * 8,
        color: isNumber ? plate.colors.normal : plate.colors.rg,
      })
    }

    return dots
  }

  if (!started) {
    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 text-white">
          <div className="text-center">
            <Eye className="mx-auto mb-4 h-16 w-16" />
            <h2 className="mb-2 text-3xl font-bold">{l.title}</h2>
            <p className="text-lg opacity-90">{l.subtitle}</p>
          </div>
        </Card>

        <Card className="p-8">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-xl font-semibold">{l.howToUse}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {l.tip1}</li>
                <li>• {l.tip2}</li>
                <li>• {l.tip3}</li>
              </ul>
            </div>
            <Button onClick={handleStart} className="w-full" size="lg">
              {l.start}
            </Button>
          </div>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950">
          <h4 className="mb-2 font-semibold text-yellow-900 dark:text-yellow-100">
            ⚠️ {l.disclaimer}
          </h4>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">{l.disclaimerText}</p>
        </Card>
      </div>
    )
  }

  if (showResult) {
    const result = getResult()

    return (
      <div className="mx-auto max-w-4xl space-y-6">
        <Card
          className={`p-8 ${
            result.type === 'success'
              ? 'border-green-500 bg-green-50 dark:bg-green-950'
              : result.type === 'warning'
                ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950'
                : 'border-red-500 bg-red-50 dark:bg-red-950'
          }`}
        >
          <div className="space-y-4 text-center">
            {result.type === 'success' ? (
              <Check className="mx-auto h-16 w-16 text-green-600" />
            ) : (
              <Eye className="mx-auto h-16 w-16 text-yellow-600" />
            )}
            <div>
              <h3 className="mb-2 text-2xl font-bold">{l.result}</h3>
              <p className="mb-4 text-lg">
                {l.correct}: {correctCount} / {totalCount}
              </p>
              <h4 className="mb-2 text-xl font-semibold">{result.title}</h4>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
            <Button onClick={handleRestart} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {l.restart}
            </Button>
          </div>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-900 dark:bg-yellow-950">
          <h4 className="mb-2 font-semibold text-yellow-900 dark:text-yellow-100">
            ⚠️ {l.disclaimer}
          </h4>
          <p className="text-sm text-yellow-800 dark:text-yellow-200">{l.disclaimerText}</p>
        </Card>
      </div>
    )
  }

  const plate = testPlates[currentPlate]
  const dots = generatePattern(currentPlate)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          第 {currentPlate + 1} / {testPlates.length} 張
        </p>
        <div className="flex gap-2">
          {testPlates.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors ${
                index < currentPlate
                  ? 'bg-green-500'
                  : index === currentPlate
                    ? 'bg-blue-500'
                    : 'bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Test Plate */}
      <Card className="p-8">
        <div className="space-y-6">
          <h3 className="text-center text-xl font-semibold">{l.whatNumber}</h3>

          {/* Simulated Ishihara Plate */}
          <div className="flex justify-center">
            <div className="relative overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <svg width="300" height="300" viewBox="0 0 300 300">
                <circle cx="150" cy="150" r="150" fill="#f3f4f6" className="dark:fill-gray-800" />
                {dots.map((dot, index) => (
                  <circle
                    key={index}
                    cx={dot.x}
                    cy={dot.y}
                    r={dot.size}
                    fill={dot.color}
                    opacity={0.8 + Math.random() * 0.2}
                  />
                ))}
              </svg>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mx-auto max-w-xs space-y-4">
            <Input
              type="text"
              value={userAnswer}
              onChange={e => setUserAnswer(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && userAnswer && handleSubmit()}
              placeholder={l.enterAnswer}
              className="text-center text-2xl"
              autoFocus
            />
            <Button onClick={handleSubmit} disabled={!userAnswer} className="w-full gap-2" size="lg">
              {currentPlate < testPlates.length - 1 ? (
                <>
                  {l.next}
                  <ChevronRight className="h-5 w-5" />
                </>
              ) : (
                l.submit
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 關於色盲</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• <strong>紅色盲 (Protanopia):</strong> 缺乏紅色感光細胞,難以分辨紅色</li>
          <li>• <strong>綠色盲 (Deuteranopia):</strong> 缺乏綠色感光細胞,難以分辨綠色</li>
          <li>• <strong>藍色盲 (Tritanopia):</strong> 較罕見,難以分辨藍色和黃色</li>
          <li>• 約 8% 的男性和 0.5% 的女性有某種程度的色盲</li>
        </ul>
      </Card>
    </div>
  )
}
