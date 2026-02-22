'use client'
import { useState, useRef, useCallback, useEffect } from 'react'

interface DigitalSignaturePadProps {
  labels?: {
    drawSignature: string
    clear: string
    download: string
    penColor: string
    penSize: string
    backgroundColor: string
    transparent: string
    white: string
  }
}

export default function DigitalSignaturePad({ labels }: DigitalSignaturePadProps) {
  const l = {
    drawSignature: labels?.drawSignature ?? 'Draw your signature below',
    clear: labels?.clear ?? 'Clear',
    download: labels?.download ?? 'Download PNG',
    penColor: labels?.penColor ?? 'Pen Color',
    penSize: labels?.penSize ?? 'Pen Size',
    backgroundColor: labels?.backgroundColor ?? 'Background',
    transparent: labels?.transparent ?? 'Transparent',
    white: labels?.white ?? 'White',
  }

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [drawing, setDrawing] = useState(false)
  const [hasDrawn, setHasDrawn] = useState(false)
  const [penColor, setPenColor] = useState('#000000')
  const [penSize, setPenSize] = useState(3)
  const [bgTransparent, setBgTransparent] = useState(true)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!
    const rect = canvas.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    }
  }

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true)
    setHasDrawn(true)
    lastPosRef.current = getPos(e)
  }

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing || !lastPosRef.current) return
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = penColor
    ctx.lineWidth = penSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    lastPosRef.current = pos
  }

  const stopDraw = () => { setDrawing(false); lastPosRef.current = null }

  const clear = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setHasDrawn(false)
  }, [])

  const download = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let dataUrl: string
    if (!bgTransparent) {
      const tmpCanvas = document.createElement('canvas')
      tmpCanvas.width = canvas.width
      tmpCanvas.height = canvas.height
      const tmpCtx = tmpCanvas.getContext('2d')!
      tmpCtx.fillStyle = '#ffffff'
      tmpCtx.fillRect(0, 0, tmpCanvas.width, tmpCanvas.height)
      tmpCtx.drawImage(canvas, 0, 0)
      dataUrl = tmpCanvas.toDataURL('image/png')
    } else {
      dataUrl = canvas.toDataURL('image/png')
    }
    const a = document.createElement('a')
    a.href = dataUrl
    a.download = 'signature.png'
    a.click()
  }, [bgTransparent])

  // Prevent scrolling on touch devices when drawing
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const prevent = (e: TouchEvent) => { if (drawing) e.preventDefault() }
    canvas.addEventListener('touchmove', prevent, { passive: false })
    return () => canvas.removeEventListener('touchmove', prevent)
  }, [drawing])

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'inherit', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{l.drawSignature}</p>

      <canvas
        ref={canvasRef}
        width={800}
        height={300}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
        onTouchStart={startDraw}
        onTouchMove={draw}
        onTouchEnd={stopDraw}
        style={{
          width: '100%',
          height: '200px',
          border: '2px solid var(--color-border)',
          borderRadius: '0.5rem',
          cursor: 'crosshair',
          touchAction: 'none',
          backgroundColor: bgTransparent ? 'transparent' : '#ffffff',
          backgroundImage: bgTransparent ? 'linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee), linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee)' : 'none',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      />

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.penColor}</label>
          <input type="color" value={penColor} onChange={(e) => setPenColor(e.target.value)} style={{ width: '36px', height: '30px', border: 'none', cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.penSize}</label>
          <input type="range" min={1} max={10} value={penSize} onChange={(e) => setPenSize(Number(e.target.value))} style={{ width: '100px' }} />
          <span style={{ fontSize: '0.85rem' }}>{penSize}px</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontWeight: 600, fontSize: '0.85rem' }}>{l.backgroundColor}</label>
          <button onClick={() => setBgTransparent(true)} style={btnStyle(bgTransparent)}>{l.transparent}</button>
          <button onClick={() => setBgTransparent(false)} style={btnStyle(!bgTransparent)}>{l.white}</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={clear} style={btnStyle(false)}>{l.clear}</button>
        <button onClick={download} disabled={!hasDrawn} style={{ ...btnStyle(true), opacity: hasDrawn ? 1 : 0.5, cursor: hasDrawn ? 'pointer' : 'default' }}>{l.download}</button>
      </div>
    </div>
  )
}
