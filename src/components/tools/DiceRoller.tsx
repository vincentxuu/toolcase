'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface DiceRollerProps {
  labels?: {
    roll: string
    reset: string
    diceCount: string
    result: string
    total: string
    history: string
  }
}

export default function DiceRoller({ labels }: DiceRollerProps) {
  const l = {
    roll: labels?.roll ?? 'Roll Dice',
    reset: labels?.reset ?? 'Reset',
    diceCount: labels?.diceCount ?? 'Number of Dice',
    result: labels?.result ?? 'Result',
    total: labels?.total ?? 'Total',
    history: labels?.history ?? 'History',
  }

  const [diceCount, setDiceCount] = useState(2)
  const [results, setResults] = useState<number[]>([])
  const [isRolling, setIsRolling] = useState(false)
  const [history, setHistory] = useState<{ dice: number[]; sum: number; time: string }[]>([])

  const rollDice = () => {
    if (isRolling) return

    setIsRolling(true)

    // 動畫效果
    const animationDuration = 600
    const animationSteps = 10
    const stepDuration = animationDuration / animationSteps

    let step = 0
    const interval = setInterval(() => {
      const randomDice = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
      setResults(randomDice)
      step++

      if (step >= animationSteps) {
        clearInterval(interval)
        setIsRolling(false)

        const finalResults = Array.from({ length: diceCount }, () => Math.floor(Math.random() * 6) + 1)
        setResults(finalResults)

        const sum = finalResults.reduce((a, b) => a + b, 0)
        const time = new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        setHistory(prev => [{ dice: finalResults, sum, time }, ...prev.slice(0, 9)])
      }
    }, stepDuration)
  }

  const reset = () => {
    setResults([])
    setHistory([])
  }

  const getDiceFace = (value: number) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return faces[value - 1] || '?'
  }

  const total = results.reduce((a, b) => a + b, 0)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* 控制面板 */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium">{l.diceCount}:</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  onClick={() => setDiceCount(num)}
                  className={`h-10 w-10 rounded-lg border-2 font-bold transition-colors ${
                    diceCount === num
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary'
                  }`}
                  disabled={isRolling}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={rollDice} disabled={isRolling} size="lg">
              {isRolling ? '🎲 ...' : l.roll}
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              {l.reset}
            </Button>
          </div>
        </div>
      </Card>

      {/* 骰子顯示 */}
      {results.length > 0 && (
        <Card className="p-8">
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              {results.map((value, index) => (
                <div
                  key={index}
                  className={`flex h-24 w-24 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 text-6xl text-white shadow-xl transition-transform ${
                    isRolling ? 'animate-bounce' : 'hover:scale-105'
                  }`}
                >
                  {getDiceFace(value)}
                </div>
              ))}
            </div>

            {!isRolling && (
              <div className="text-center">
                <p className="text-sm text-muted-foreground">{l.total}</p>
                <p className="text-5xl font-bold">{total}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* 歷史紀錄 */}
      {history.length > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">{l.history}</h3>
          <div className="space-y-2">
            {history.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                  <div className="flex gap-1">
                    {item.dice.map((d, i) => (
                      <span key={i} className="text-2xl">
                        {getDiceFace(d)}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">=</span>
                  <span className="text-xl font-bold">{item.sum}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
