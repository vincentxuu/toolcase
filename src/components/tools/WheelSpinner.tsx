'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Play, Plus, Trash2, RotateCcw, Sparkles } from 'lucide-react'

interface WheelOption {
  id: string
  text: string
  color: string
}

interface WheelSpinnerProps {
  labels?: {
    addOption: string
    optionPlaceholder: string
    spin: string
    reset: string
    winner: string
    minOptions: string
    delete: string
  }
}

export default function WheelSpinner({ labels }: WheelSpinnerProps) {
  const l = {
    addOption: labels?.addOption ?? 'Add Option',
    optionPlaceholder: labels?.optionPlaceholder ?? 'Enter option...',
    spin: labels?.spin ?? 'Spin!',
    reset: labels?.reset ?? 'Reset',
    winner: labels?.winner ?? 'Winner:',
    minOptions: labels?.minOptions ?? 'Add at least 2 options to spin',
    delete: labels?.delete ?? 'Delete',
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [options, setOptions] = useState<WheelOption[]>([
    { id: '1', text: 'Option 1', color: '#FF6B6B' },
    { id: '2', text: 'Option 2', color: '#4ECDC4' },
    { id: '3', text: 'Option 3', color: '#45B7D1' },
    { id: '4', text: 'Option 4', color: '#FFA07A' },
    { id: '5', text: 'Option 5', color: '#98D8C8' },
    { id: '6', text: 'Option 6', color: '#F7DC6F' },
  ])
  const [newOption, setNewOption] = useState('')
  const [isSpinning, setIsSpinning] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const [winner, setWinner] = useState<string | null>(null)

  // Generate random color
  const generateColor = () => {
    const hue = Math.floor(Math.random() * 360)
    return `hsl(${hue}, 70%, 60%)`
  }

  // Add option
  const addOption = () => {
    if (!newOption.trim()) return
    const newOpt: WheelOption = {
      id: Date.now().toString(),
      text: newOption.trim(),
      color: generateColor(),
    }
    setOptions([...options, newOpt])
    setNewOption('')
  }

  // Delete option
  const deleteOption = (id: string) => {
    if (options.length <= 2) return
    setOptions(options.filter(opt => opt.id !== id))
  }

  // Update option text
  const updateOption = (id: string, text: string) => {
    setOptions(options.map(opt => (opt.id === id ? { ...opt, text } : opt)))
  }

  // Draw wheel
  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 20

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    const anglePerOption = (2 * Math.PI) / options.length

    options.forEach((option, index) => {
      const startAngle = rotation + index * anglePerOption
      const endAngle = startAngle + anglePerOption

      // Draw segment
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = option.color
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(startAngle + anglePerOption / 2)
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 16px sans-serif'
      ctx.fillText(option.text, radius * 0.65, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI)
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(centerX + radius + 10, centerY)
    ctx.lineTo(centerX + radius - 15, centerY - 15)
    ctx.lineTo(centerX + radius - 15, centerY + 15)
    ctx.closePath()
    ctx.fillStyle = '#333'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 2
    ctx.stroke()
  }, [options])

  // Spin wheel
  const spinWheel = () => {
    if (options.length < 2 || isSpinning) return

    setIsSpinning(true)
    setWinner(null)

    const spinDuration = 3000 // 3 seconds
    const spinRotations = 5 + Math.random() * 5 // 5-10 rotations
    const finalRotation = currentRotation + spinRotations * 2 * Math.PI + Math.random() * 2 * Math.PI
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)

      // Easing function (ease out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      const rotation = currentRotation + (finalRotation - currentRotation) * easeOut

      setCurrentRotation(rotation)
      drawWheel(rotation)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        // Calculate winner
        const normalizedRotation = rotation % (2 * Math.PI)
        const anglePerOption = (2 * Math.PI) / options.length
        // Pointer is at the right, so we calculate from PI/2
        const pointerAngle = (2 * Math.PI - normalizedRotation) % (2 * Math.PI)
        const winnerIndex = Math.floor(pointerAngle / anglePerOption)
        setWinner(options[winnerIndex].text)
      }
    }

    animate()
  }

  // Reset
  const reset = () => {
    setCurrentRotation(0)
    setWinner(null)
    drawWheel(0)
  }

  // Initial draw and redraw on options change
  useEffect(() => {
    drawWheel(currentRotation)
  }, [options, currentRotation, drawWheel])

  useEffect(() => {
    drawWheel(currentRotation)
  }, [currentRotation, drawWheel])

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Wheel Canvas */}
      <Card className="p-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              className="max-w-full"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>

          {/* Winner Display */}
          {winner && (
            <div className="animate-bounce rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 text-center">
              <p className="text-sm font-medium text-white opacity-90">{l.winner}</p>
              <p className="text-3xl font-bold text-white">{winner}</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              onClick={spinWheel}
              disabled={options.length < 2 || isSpinning}
              size="lg"
              className="gap-2"
            >
              <Play className="h-5 w-5" />
              {l.spin}
            </Button>
            <Button onClick={reset} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {l.reset}
            </Button>
          </div>

          {options.length < 2 && (
            <p className="text-sm text-muted-foreground">{l.minOptions}</p>
          )}
        </div>
      </Card>

      {/* Options List */}
      <Card className="p-6">
        <div className="space-y-4">
          <h3 className="font-semibold">選項設定</h3>

          {/* Add Option */}
          <div className="flex gap-2">
            <Input
              value={newOption}
              onChange={e => setNewOption(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addOption()}
              placeholder={l.optionPlaceholder}
              className="flex-1"
            />
            <Button onClick={addOption} className="gap-2">
              <Plus className="h-4 w-4" />
              {l.addOption}
            </Button>
          </div>

          {/* Options Grid */}
          <div className="grid gap-2 sm:grid-cols-2">
            {options.map((option, index) => (
              <div
                key={option.id}
                className="flex items-center gap-2 rounded-lg border p-3"
                style={{ borderLeft: `4px solid ${option.color}` }}
              >
                <div
                  className="h-4 w-4 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                <Input
                  value={option.text}
                  onChange={e => updateOption(option.id, e.target.value)}
                  className="flex-1 border-0 p-0 focus-visible:ring-0"
                />
                <Button
                  onClick={() => deleteOption(option.id)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                  disabled={options.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 至少需要 2 個選項才能開始抽獎</li>
          <li>• 點擊選項文字可以編輯內容</li>
          <li>• 每個選項都會自動分配不同的顏色</li>
          <li>• 輪盤會隨機旋轉 5-10 圈後停止</li>
          <li>• 適合團隊活動、抽獎、決策等場景</li>
        </ul>
      </Card>
    </div>
  )
}
