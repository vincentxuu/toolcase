'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'

interface LuckyNumberGeneratorProps {
  labels?: {
    generate: string
    minNumber: string
    maxNumber: string
    count: string
    allowDuplicates: string
    sort: string
    result: string
    copy: string
    copied: string
    generateAgain: string
  }
}

export default function LuckyNumberGenerator({ labels }: LuckyNumberGeneratorProps) {
  const l = {
    generate: labels?.generate ?? 'Generate',
    minNumber: labels?.minNumber ?? 'Min',
    maxNumber: labels?.maxNumber ?? 'Max',
    count: labels?.count ?? 'Count',
    allowDuplicates: labels?.allowDuplicates ?? 'Allow Duplicates',
    sort: labels?.sort ?? 'Sort',
    result: labels?.result ?? 'Your Lucky Numbers',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    generateAgain: labels?.generateAgain ?? 'Generate Again',
  }

  const [min, setMin] = useState(1)
  const [max, setMax] = useState(49)
  const [count, setCount] = useState(6)
  const [allowDuplicates, setAllowDuplicates] = useState(false)
  const [sort, setSort] = useState(true)
  const [numbers, setNumbers] = useState<number[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  const generateNumbers = () => {
    if (min >= max) return
    if (!allowDuplicates && count > (max - min + 1)) {
      alert(`Cannot generate ${count} unique numbers from range ${min}-${max}`)
      return
    }

    setIsGenerating(true)
    setCopySuccess(false)

    setTimeout(() => {
      const generated: number[] = []
      const available = Array.from({ length: max - min + 1 }, (_, i) => min + i)

      for (let i = 0; i < count; i++) {
        if (allowDuplicates) {
          const num = Math.floor(Math.random() * (max - min + 1)) + min
          generated.push(num)
        } else {
          const index = Math.floor(Math.random() * available.length)
          generated.push(available[index])
          available.splice(index, 1)
        }
      }

      if (sort) {
        generated.sort((a, b) => a - b)
      }

      setNumbers(generated)
      setIsGenerating(false)
    }, 600)
  }

  const copyNumbers = async () => {
    const text = numbers.join(', ')
    await navigator.clipboard.writeText(text)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 設定面板 */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium">{l.minNumber}</label>
              <Input
                type="number"
                value={min}
                onChange={e => setMin(parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">{l.maxNumber}</label>
              <Input
                type="number"
                value={max}
                onChange={e => setMax(parseInt(e.target.value) || 0)}
                className="w-full"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">{l.count}</label>
              <Input
                type="number"
                value={count}
                onChange={e => setCount(parseInt(e.target.value) || 1)}
                min={1}
                max={20}
                className="w-full"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={allowDuplicates}
                onChange={e => setAllowDuplicates(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">{l.allowDuplicates}</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={sort}
                onChange={e => setSort(e.target.checked)}
                className="h-4 w-4"
              />
              <span className="text-sm">{l.sort}</span>
            </label>
          </div>

          <Button onClick={generateNumbers} className="w-full" size="lg" disabled={isGenerating}>
            <Sparkles className="mr-2 h-4 w-4" />
            {numbers.length > 0 ? l.generateAgain : l.generate}
          </Button>
        </div>
      </Card>

      {/* 結果顯示 */}
      {numbers.length > 0 && (
        <Card className="p-8">
          <div className="space-y-6">
            <h3 className="text-center text-lg font-semibold text-muted-foreground">
              {l.result}
            </h3>

            <div className="flex flex-wrap justify-center gap-4">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-3xl font-bold text-white shadow-lg transition-all ${
                    isGenerating ? 'animate-bounce' : 'hover:scale-110'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {num}
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3">
              <Button onClick={copyNumbers} variant="outline">
                {copySuccess ? l.copied : l.copy}
              </Button>
            </div>

            {/* 預設組合快捷按鈕 */}
            <div className="border-t pt-6">
              <p className="mb-3 text-center text-sm text-muted-foreground">常用組合</p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMin(1)
                    setMax(49)
                    setCount(6)
                    setAllowDuplicates(false)
                    setSort(true)
                  }}
                >
                  樂透 (1-49, 6個)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMin(1)
                    setMax(100)
                    setCount(5)
                    setAllowDuplicates(false)
                    setSort(true)
                  }}
                >
                  幸運數字 (1-100, 5個)
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMin(0)
                    setMax(9)
                    setCount(4)
                    setAllowDuplicates(true)
                    setSort(false)
                  }}
                >
                  4位密碼 (0-9, 4個)
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
