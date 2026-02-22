'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface CoinFlipProps {
  labels?: {
    flip: string
    reset: string
    heads: string
    tails: string
    stats: string
    result: string
  }
}

export default function CoinFlip({ labels }: CoinFlipProps) {
  const l = {
    flip: labels?.flip ?? 'Flip Coin',
    reset: labels?.reset ?? 'Reset',
    heads: labels?.heads ?? 'Heads',
    tails: labels?.tails ?? 'Tails',
    stats: labels?.stats ?? 'Statistics',
    result: labels?.result ?? 'Result',
  }

  const [result, setResult] = useState<'heads' | 'tails' | null>(null)
  const [isFlipping, setIsFlipping] = useState(false)
  const [stats, setStats] = useState({ heads: 0, tails: 0 })

  const flipCoin = () => {
    if (isFlipping) return

    setIsFlipping(true)

    // 動畫效果
    setTimeout(() => {
      const coinResult = Math.random() < 0.5 ? 'heads' : 'tails'
      setResult(coinResult)
      setStats(prev => ({
        ...prev,
        [coinResult]: prev[coinResult] + 1
      }))
      setIsFlipping(false)
    }, 600)
  }

  const reset = () => {
    setResult(null)
    setStats({ heads: 0, tails: 0 })
  }

  const total = stats.heads + stats.tails
  const headsPercent = total > 0 ? Math.round((stats.heads / total) * 100) : 0
  const tailsPercent = total > 0 ? Math.round((stats.tails / total) * 100) : 0

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* 硬幣顯示 */}
      <Card className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <div
            className={`relative h-40 w-40 rounded-full bg-gradient-to-br transition-all duration-500 ${
              isFlipping
                ? 'animate-spin from-yellow-400 to-yellow-600'
                : result === 'heads'
                ? 'from-yellow-400 to-yellow-600'
                : result === 'tails'
                ? 'from-gray-400 to-gray-600'
                : 'from-gray-300 to-gray-400'
            } shadow-xl flex items-center justify-center`}
          >
            <div className="text-4xl font-bold text-white">
              {result === 'heads' ? '👑' : result === 'tails' ? '🪙' : '?'}
            </div>
          </div>

          {result && !isFlipping && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">{l.result}</p>
              <p className="text-3xl font-bold">
                {result === 'heads' ? l.heads : l.tails}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button onClick={flipCoin} disabled={isFlipping} size="lg">
              {isFlipping ? '🪙 ...' : l.flip}
            </Button>
            <Button onClick={reset} variant="outline" size="lg">
              {l.reset}
            </Button>
          </div>
        </div>
      </Card>

      {/* 統計資訊 */}
      {total > 0 && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">{l.stats}</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">👑</span>
                <span>{l.heads}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${headsPercent}%` }}
                  />
                </div>
                <span className="w-20 text-right font-mono">
                  {stats.heads} ({headsPercent}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🪙</span>
                <span>{l.tails}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-2 w-32 overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full bg-gray-500 transition-all duration-300"
                    style={{ width: `${tailsPercent}%` }}
                  />
                </div>
                <span className="w-20 text-right font-mono">
                  {stats.tails} ({tailsPercent}%)
                </span>
              </div>
            </div>

            <div className="pt-2 text-sm text-muted-foreground">
              總計: {total} 次
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
