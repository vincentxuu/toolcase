'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageWatermarkProps {
  labels?: {
    uploadImage: string
    watermarkText: string
    fontSize: string
    color: string
    opacity: string
    position: string
    posCenter: string
    posTopLeft: string
    posTopRight: string
    posBottomLeft: string
    posBottomRight: string
    posTiled: string
    apply: string
    download: string
    preview: string
  }
}

type Position = 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'tiled'

export default function ImageWatermark({ labels }: ImageWatermarkProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    watermarkText: labels?.watermarkText ?? 'Watermark Text',
    fontSize: labels?.fontSize ?? 'Font Size',
    color: labels?.color ?? 'Color',
    opacity: labels?.opacity ?? 'Opacity',
    position: labels?.position ?? 'Position',
    posCenter: labels?.posCenter ?? 'Center',
    posTopLeft: labels?.posTopLeft ?? 'Top Left',
    posTopRight: labels?.posTopRight ?? 'Top Right',
    posBottomLeft: labels?.posBottomLeft ?? 'Bottom Left',
    posBottomRight: labels?.posBottomRight ?? 'Bottom Right',
    posTiled: labels?.posTiled ?? 'Tiled',
    apply: labels?.apply ?? 'Apply Watermark',
    download: labels?.download ?? 'Download',
    preview: labels?.preview ?? 'Preview',
  }

  const [originalUrl, setOriginalUrl] = useState('')
  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState('')
  const [wmText, setWmText] = useState('Watermark')
  const [fontSize, setFontSize] = useState(32)
  const [color, setColor] = useState('#ffffff')
  const [opacity, setOpacity] = useState(50)
  const [position, setPosition] = useState<Position>('center')
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setResultUrl('')
    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
  }, [])

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r},${g},${b},${alpha})`
  }

  const handleApply = useCallback(() => {
    if (!originalUrl || !wmText.trim()) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.drawImage(img, 0, 0)
      ctx.font = `${fontSize}px sans-serif`
      ctx.fillStyle = hexToRgba(color, opacity / 100)

      const text = wmText.trim()
      const metrics = ctx.measureText(text)
      const textWidth = metrics.width
      const textHeight = fontSize

      if (position === 'tiled') {
        ctx.textAlign = 'left'
        ctx.textBaseline = 'top'
        const spacingX = textWidth + 60
        const spacingY = textHeight + 60
        for (let y = 0; y < canvas.height; y += spacingY) {
          for (let x = 0; x < canvas.width; x += spacingX) {
            ctx.save()
            ctx.translate(x + spacingX / 2, y + spacingY / 2)
            ctx.rotate(-Math.PI / 6)
            ctx.fillText(text, -textWidth / 2, -textHeight / 2)
            ctx.restore()
          }
        }
      } else {
        let x: number, y: number
        switch (position) {
          case 'top-left':
            ctx.textAlign = 'left'
            ctx.textBaseline = 'top'
            x = 20
            y = 20
            break
          case 'top-right':
            ctx.textAlign = 'right'
            ctx.textBaseline = 'top'
            x = canvas.width - 20
            y = 20
            break
          case 'bottom-left':
            ctx.textAlign = 'left'
            ctx.textBaseline = 'bottom'
            x = 20
            y = canvas.height - 20
            break
          case 'bottom-right':
            ctx.textAlign = 'right'
            ctx.textBaseline = 'bottom'
            x = canvas.width - 20
            y = canvas.height - 20
            break
          default: // center
            ctx.textAlign = 'center'
            ctx.textBaseline = 'middle'
            x = canvas.width / 2
            y = canvas.height / 2
            break
        }
        ctx.fillText(text, x, y)
      }

      setResultUrl(canvas.toDataURL('image/png'))
    }
    img.src = originalUrl
  }, [originalUrl, wmText, fontSize, color, opacity, position])

  const handleDownload = useCallback(() => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'watermarked.png'
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

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
          {l.uploadImage}
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        {originalFile && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{originalFile.name}</span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={labelStyle}>{l.watermarkText}</label>
        <input
          type="text"
          value={wmText}
          onChange={(e) => setWmText(e.target.value)}
          style={{ ...inputStyle, maxWidth: '300px' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.fontSize}:</label>
          <input
            type="number"
            value={fontSize}
            onChange={(e) => setFontSize(Math.max(8, Number(e.target.value)))}
            min={8}
            max={200}
            style={{ ...inputStyle, width: '70px' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.color}:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{ width: '36px', height: '30px', border: 'none', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.opacity}: {opacity}%</label>
          <input
            type="range"
            min={5}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(Number(e.target.value))}
            style={{ width: '120px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.position}:</label>
          <select value={position} onChange={(e) => setPosition(e.target.value as Position)} style={selectStyle}>
            <option value="center">{l.posCenter}</option>
            <option value="top-left">{l.posTopLeft}</option>
            <option value="top-right">{l.posTopRight}</option>
            <option value="bottom-left">{l.posBottomLeft}</option>
            <option value="bottom-right">{l.posBottomRight}</option>
            <option value="tiled">{l.posTiled}</option>
          </select>
        </div>

        <button className="btn-primary" onClick={handleApply} disabled={!originalFile || !wmText.trim()}>
          {l.apply}
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
          }}>
            <img src={resultUrl} alt="Watermarked preview" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.25rem' }} />
          </div>
        </div>
      )}
    </div>
  )
}
