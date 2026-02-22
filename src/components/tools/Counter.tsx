'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Minus, Plus, RotateCcw, Trash2 } from 'lucide-react'

interface CounterItem {
  id: string
  name: string
  value: number
  step: number
  target?: number
}

interface CounterProps {
  labels?: {
    addCounter: string
    reset: string
    step: string
    target: string
    optional: string
    counterName: string
    delete: string
  }
}

export default function Counter({ labels }: CounterProps) {
  const l = {
    addCounter: labels?.addCounter ?? 'Add Counter',
    reset: labels?.reset ?? 'Reset',
    step: labels?.step ?? 'Step',
    target: labels?.target ?? 'Target',
    optional: labels?.optional ?? 'optional',
    counterName: labels?.counterName ?? 'Counter Name',
    delete: labels?.delete ?? 'Delete',
  }

  const [counters, setCounters] = useState<CounterItem[]>([
    { id: '1', name: 'Counter 1', value: 0, step: 1 }
  ])

  // 從 localStorage 載入
  useEffect(() => {
    const saved = localStorage.getItem('counters')
    if (saved) {
      try {
        setCounters(JSON.parse(saved))
      } catch (e) {
        // ignore
      }
    }
  }, [])

  // 儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('counters', JSON.stringify(counters))
  }, [counters])

  const increment = (id: string) => {
    setCounters(prev =>
      prev.map(c => (c.id === id ? { ...c, value: c.value + c.step } : c))
    )
  }

  const decrement = (id: string) => {
    setCounters(prev =>
      prev.map(c => (c.id === id ? { ...c, value: c.value - c.step } : c))
    )
  }

  const resetCounter = (id: string) => {
    setCounters(prev => prev.map(c => (c.id === id ? { ...c, value: 0 } : c)))
  }

  const deleteCounter = (id: string) => {
    if (counters.length === 1) return
    setCounters(prev => prev.filter(c => c.id !== id))
  }

  const updateName = (id: string, name: string) => {
    setCounters(prev => prev.map(c => (c.id === id ? { ...c, name } : c)))
  }

  const updateStep = (id: string, step: number) => {
    setCounters(prev => prev.map(c => (c.id === id ? { ...c, step } : c)))
  }

  const updateTarget = (id: string, target: number | undefined) => {
    setCounters(prev => prev.map(c => (c.id === id ? { ...c, target } : c)))
  }

  const addCounter = () => {
    const newId = Date.now().toString()
    setCounters(prev => [
      ...prev,
      { id: newId, name: `Counter ${prev.length + 1}`, value: 0, step: 1 }
    ])
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {counters.map(counter => {
        const progress = counter.target
          ? Math.min(100, Math.round((counter.value / counter.target) * 100))
          : 0

        return (
          <Card key={counter.id} className="p-6">
            <div className="space-y-6">
              {/* 名稱和設置 */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1 space-y-3">
                  <Input
                    value={counter.name}
                    onChange={e => updateName(counter.id, e.target.value)}
                    className="text-lg font-semibold"
                    placeholder={l.counterName}
                  />
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">{l.step}:</label>
                      <div className="flex gap-1">
                        {[1, 5, 10].map(s => (
                          <button
                            key={s}
                            onClick={() => updateStep(counter.id, s)}
                            className={`h-8 w-12 rounded border text-sm transition-colors ${
                              counter.step === s
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-border hover:border-primary'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-muted-foreground">
                        {l.target} ({l.optional}):
                      </label>
                      <Input
                        type="number"
                        value={counter.target || ''}
                        onChange={e => {
                          const val = e.target.value ? parseInt(e.target.value) : undefined
                          updateTarget(counter.id, val)
                        }}
                        className="w-24"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>

                {counters.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCounter(counter.id)}
                    className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* 計數顯示 */}
              <div className="text-center">
                <div className="mb-4 text-6xl font-bold tabular-nums">
                  {counter.value.toLocaleString()}
                </div>

                {counter.target && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <span>{progress}%</span>
                      <span>·</span>
                      <span>
                        {counter.value.toLocaleString()} / {counter.target.toLocaleString()}
                      </span>
                    </div>
                    <div className="mx-auto h-2 w-full max-w-md overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* 控制按鈕 */}
              <div className="flex justify-center gap-3">
                <Button
                  onClick={() => decrement(counter.id)}
                  size="lg"
                  variant="outline"
                  className="h-16 w-16"
                >
                  <Minus className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => increment(counter.id)}
                  size="lg"
                  className="h-16 w-16"
                >
                  <Plus className="h-6 w-6" />
                </Button>
                <Button
                  onClick={() => resetCounter(counter.id)}
                  size="lg"
                  variant="outline"
                  className="h-16 w-16"
                >
                  <RotateCcw className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </Card>
        )
      })}

      {/* 新增計數器按鈕 */}
      <Button onClick={addCounter} variant="outline" className="w-full" size="lg">
        + {l.addCounter}
      </Button>
    </div>
  )
}
