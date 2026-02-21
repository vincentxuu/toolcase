'use client'
import { useState, useCallback, useRef, useEffect } from 'react'
import QRCode from 'qrcode'

interface QrGeneratorProps {
  labels?: {
    generate: string
    download: string
    clear: string
    placeholder: string
    size: string
    color: string
    bgColor: string
  }
}

export default function QrGenerator({ labels }: QrGeneratorProps) {
  const l = {
    generate: labels?.generate ?? 'Generate',
    download: labels?.download ?? 'Download PNG',
    clear: labels?.clear ?? 'Clear',
    placeholder: labels?.placeholder ?? 'Enter text or URL...',
    size: labels?.size ?? 'Size',
    color: labels?.color ?? 'Color',
    bgColor: labels?.bgColor ?? 'Background',
  }

  const [input, setInput] = useState('')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [size, setSize] = useState(256)
  const [color, setColor] = useState('#000000')
  const [bgColor, setBgColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) return
    try {
      const url = await QRCode.toDataURL(input, {
        width: size,
        margin: 2,
        color: { dark: color, light: bgColor },
      })
      setQrDataUrl(url)
    } catch {
      setQrDataUrl('')
    }
  }, [input, size, color, bgColor])

  useEffect(() => {
    if (input.trim()) {
      const timer = setTimeout(handleGenerate, 300)
      return () => clearTimeout(timer)
    }
  }, [input, size, color, bgColor, handleGenerate])

  const handleDownload = useCallback(() => {
    if (!qrDataUrl) return
    const link = document.createElement('a')
    link.download = 'qrcode.png'
    link.href = qrDataUrl
    link.click()
  }, [qrDataUrl])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <textarea
        className="tool-textarea"
        style={{ minHeight: '100px' }}
        placeholder={l.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.size}:</label>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            style={{
              padding: '0.375rem 0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
          >
            <option value={128}>128px</option>
            <option value={256}>256px</option>
            <option value={512}>512px</option>
            <option value={1024}>1024px</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.color}:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.bgColor}:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>

        {qrDataUrl && (
          <button className="btn-primary" onClick={handleDownload}>{l.download}</button>
        )}
      </div>

      {qrDataUrl && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '0.75rem',
            border: '1px solid var(--color-border)',
          }}
        >
          <img src={qrDataUrl} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}
