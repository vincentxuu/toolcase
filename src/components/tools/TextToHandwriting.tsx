'use client'
import { useState, useRef, useCallback } from 'react'

interface TextToHandwritingProps {
  labels?: {
    inputText: string
    fontSize: string
    inkColor: string
    paperColor: string
    paperWhite: string
    paperLined: string
    paperGrid: string
    generate: string
    download: string
    preview: string
    placeholder: string
  }
}

type PaperType = 'white' | 'lined' | 'grid'

export default function TextToHandwriting({ labels }: TextToHandwritingProps) {
  const l = {
    inputText: labels?.inputText ?? 'Text',
    fontSize: labels?.fontSize ?? 'Font Size',
    inkColor: labels?.inkColor ?? 'Ink Color',
    paperColor: labels?.paperColor ?? 'Paper Style',
    paperWhite: labels?.paperWhite ?? 'White',
    paperLined: labels?.paperLined ?? 'Lined',
    paperGrid: labels?.paperGrid ?? 'Grid',
    generate: labels?.generate ?? 'Generate',
    download: labels?.download ?? 'Download PNG',
    preview: labels?.preview ?? 'Preview',
    placeholder: labels?.placeholder ?? 'Type your text here...',
  }

  const [text, setText] = useState('')
  const [fontSize, setFontSize] = useState(24)
  const [inkColor, setInkColor] = useState('#1a1a6e')
  const [paperType, setPaperType] = useState<PaperType>('lined')
  const [resultUrl, setResultUrl] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const drawPaper = (ctx: CanvasRenderingContext2D, w: number, h: number, type: PaperType) => {
    // Paper background
    ctx.fillStyle = '#fdf6e3'
    ctx.fillRect(0, 0, w, h)

    if (type === 'lined') {
      ctx.strokeStyle = '#c8d8e8'
      ctx.lineWidth = 1
      const lineSpacing = fontSize * 1.8
      for (let y = lineSpacing + 40; y < h; y += lineSpacing) {
        ctx.beginPath()
        ctx.moveTo(40, y)
        ctx.lineTo(w - 40, y)
        ctx.stroke()
      }
      // Red margin line
      ctx.strokeStyle = '#e8a0a0'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(70, 0)
      ctx.lineTo(70, h)
      ctx.stroke()
    } else if (type === 'grid') {
      ctx.strokeStyle = '#d8e0e8'
      ctx.lineWidth = 0.5
      const gridSize = 24
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }
  }

  const handleGenerate = useCallback(() => {
    if (!text.trim()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const lineSpacing = fontSize * 1.8
    const paddingX = paperType === 'lined' ? 80 : 50
    const paddingY = 50
    const maxWidth = 700 - paddingX * 2

    // Pre-calculate lines for canvas height
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return
    tempCtx.font = `${fontSize}px cursive`

    const lines: string[] = []
    const paragraphs = text.split('\n')
    for (const paragraph of paragraphs) {
      if (paragraph === '') {
        lines.push('')
        continue
      }
      const words = paragraph.split(' ')
      let currentLine = ''
      for (const word of words) {
        const testLine = currentLine ? currentLine + ' ' + word : word
        const metrics = tempCtx.measureText(testLine)
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine)
          currentLine = word
        } else {
          currentLine = testLine
        }
      }
      if (currentLine) lines.push(currentLine)
    }

    const canvasWidth = 700
    const canvasHeight = Math.max(400, paddingY * 2 + lines.length * lineSpacing + 20)

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    drawPaper(ctx, canvasWidth, canvasHeight, paperType)

    ctx.font = `${fontSize}px cursive`
    ctx.fillStyle = inkColor
    ctx.textBaseline = 'top'

    let y = paddingY
    for (const line of lines) {
      // Add slight random offsets for handwriting feel
      const offsetX = (Math.random() - 0.5) * 2
      const offsetY = (Math.random() - 0.5) * 1.5
      ctx.fillText(line, paddingX + offsetX, y + offsetY)
      y += lineSpacing
    }

    setResultUrl(canvas.toDataURL('image/png'))
  }, [text, fontSize, inkColor, paperType])

  const handleDownload = useCallback(() => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'handwriting.png'
    a.click()
  }, [resultUrl])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
  }

  const selectStyle: React.CSSProperties = { ...inputStyle }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={labelStyle}>{l.inputText}</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={l.placeholder}
          rows={5}
          style={{
            ...inputStyle,
            width: '100%',
            maxWidth: '500px',
            resize: 'vertical',
            fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.fontSize}:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Math.max(12, Number(e.target.value)))}
            min={12}
            max={60}
            style={{ ...inputStyle, width: '70px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.inkColor}:</label>
          <input
            type="color"
            value={inkColor}
            onChange={(e) => setInkColor(e.target.value)}
            style={{ width: '36px', height: '30px', border: 'none', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.paperColor}:</label>
          <select value={paperType} onChange={(e) => setPaperType(e.target.value as PaperType)} style={selectStyle}>
            <option value="white">{l.paperWhite}</option>
            <option value="lined">{l.paperLined}</option>
            <option value="grid">{l.paperGrid}</option>
          </select>
        </div>

        <button className="btn-primary" onClick={handleGenerate} disabled={!text.trim()}>
          {l.generate}
        </button>
      </div>

      {resultUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
              {l.preview}
            </span>
            <button className="btn-primary" onClick={handleDownload}>{l.download}</button>
          </div>
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            textAlign: 'center',
            overflowX: 'auto',
          }}>
            <img src={resultUrl} alt="Handwriting preview" style={{ maxWidth: '100%', borderRadius: '0.25rem' }} />
          </div>
        </div>
      )}
    </div>
  )
}
