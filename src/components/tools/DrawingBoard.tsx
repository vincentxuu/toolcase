'use client'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Pencil, Eraser, Trash2, Download, Undo, Redo } from 'lucide-react'

interface DrawingBoardProps {
  labels?: {
    tool: string
    pen: string
    eraser: string
    color: string
    size: string
    clear: string
    download: string
    undo: string
    redo: string
    confirmClear: string
  }
}

interface DrawAction {
  tool: 'pen' | 'eraser'
  color: string
  size: number
  points: { x: number; y: number }[]
}

export default function DrawingBoard({ labels }: DrawingBoardProps) {
  const l = {
    tool: labels?.tool ?? 'Tool',
    pen: labels?.pen ?? 'Pen',
    eraser: labels?.eraser ?? 'Eraser',
    color: labels?.color ?? 'Color',
    size: labels?.size ?? 'Size',
    clear: labels?.clear ?? 'Clear',
    download: labels?.download ?? 'Download',
    undo: labels?.undo ?? 'Undo',
    redo: labels?.redo ?? 'Redo',
    confirmClear: labels?.confirmClear ?? 'Clear the canvas?',
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen')
  const [color, setColor] = useState('#000000')
  const [size, setSize] = useState(3)
  const [history, setHistory] = useState<DrawAction[]>([])
  const [historyStep, setHistoryStep] = useState(-1)
  const [currentAction, setCurrentAction] = useState<DrawAction | null>(null)

  const colors = [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
    '#FFA500',
    '#800080',
    '#FFC0CB',
    '#A52A2A',
  ]

  const sizes = [1, 3, 5, 10, 15, 20]

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Fill with white background
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  // Redraw canvas from history
  const redrawCanvas = (actions: DrawAction[]) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear and fill white
    ctx.fillStyle = '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw all actions
    actions.forEach(action => {
      if (action.points.length < 2) return

      ctx.strokeStyle = action.tool === 'eraser' ? '#FFFFFF' : action.color
      ctx.lineWidth = action.size
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      ctx.beginPath()
      ctx.moveTo(action.points[0].x, action.points[0].y)

      for (let i = 1; i < action.points.length; i++) {
        ctx.lineTo(action.points[i].x, action.points[i].y)
      }

      ctx.stroke()
    })
  }

  // Get mouse position relative to canvas
  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return { x: 0, y: 0 }

    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    }
  }

  // Start drawing
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e)
    setIsDrawing(true)
    setCurrentAction({
      tool,
      color,
      size,
      points: [pos],
    })
  }

  // Draw
  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentAction) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const pos = getMousePos(e)

    // Add point to current action
    const newAction = {
      ...currentAction,
      points: [...currentAction.points, pos],
    }
    setCurrentAction(newAction)

    // Draw on canvas
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : color
    ctx.lineWidth = size
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    const lastPoint = currentAction.points[currentAction.points.length - 1]

    ctx.beginPath()
    ctx.moveTo(lastPoint.x, lastPoint.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.stroke()
  }

  // Stop drawing
  const stopDrawing = () => {
    if (isDrawing && currentAction && currentAction.points.length > 1) {
      // Remove any future history
      const newHistory = history.slice(0, historyStep + 1)
      newHistory.push(currentAction)
      setHistory(newHistory)
      setHistoryStep(newHistory.length - 1)
    }

    setIsDrawing(false)
    setCurrentAction(null)
  }

  // Undo
  const undo = () => {
    if (historyStep > -1) {
      const newStep = historyStep - 1
      setHistoryStep(newStep)
      redrawCanvas(history.slice(0, newStep + 1))
    }
  }

  // Redo
  const redo = () => {
    if (historyStep < history.length - 1) {
      const newStep = historyStep + 1
      setHistoryStep(newStep)
      redrawCanvas(history.slice(0, newStep + 1))
    }
  }

  // Clear canvas
  const clearCanvas = () => {
    if (window.confirm(l.confirmClear)) {
      const canvas = canvasRef.current
      if (!canvas) return

      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      setHistory([])
      setHistoryStep(-1)
    }
  }

  // Download canvas
  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const link = document.createElement('a')
    link.download = `drawing-${Date.now()}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Toolbar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Tool Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{l.tool}:</span>
            <div className="flex rounded-md border">
              <button
                onClick={() => setTool('pen')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  tool === 'pen'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                <Pencil className="h-4 w-4" />
                {l.pen}
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  tool === 'eraser'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-background hover:bg-muted'
                }`}
              >
                <Eraser className="h-4 w-4" />
                {l.eraser}
              </button>
            </div>
          </div>

          {/* Color Selection */}
          {tool === 'pen' && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{l.color}:</span>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`h-8 w-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      color === c ? 'border-primary ring-2 ring-primary/50' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300"
                  title="Custom color"
                />
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{l.size}:</span>
            <div className="flex gap-1">
              {sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border transition-colors ${
                    size === s
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-gray-300 hover:bg-muted'
                  }`}
                >
                  <div
                    className="rounded-full bg-current"
                    style={{
                      width: `${Math.min(s, 12)}px`,
                      height: `${Math.min(s, 12)}px`,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="ml-auto flex gap-2">
            <Button onClick={undo} variant="outline" size="sm" disabled={historyStep < 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button onClick={redo} variant="outline" size="sm" disabled={historyStep >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button onClick={clearCanvas} variant="outline" size="sm" className="gap-2">
              <Trash2 className="h-4 w-4" />
              {l.clear}
            </Button>
            <Button onClick={downloadCanvas} variant="primary" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              {l.download}
            </Button>
          </div>
        </div>
      </Card>

      {/* Canvas */}
      <Card className="overflow-hidden p-4">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="w-full cursor-crosshair rounded border border-gray-300"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </Card>

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 選擇畫筆或橡皮擦工具開始繪圖</li>
          <li>• 點擊顏色圓圈選擇預設顏色,或使用顏色選擇器自訂顏色</li>
          <li>• 調整筆刷大小以繪製不同粗細的線條</li>
          <li>• 使用撤銷/重做功能修正錯誤</li>
          <li>• 完成後可下載為 PNG 圖片</li>
        </ul>
      </Card>
    </div>
  )
}
