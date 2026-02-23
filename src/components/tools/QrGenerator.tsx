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
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ minHeight: '100px' }}
        placeholder={l.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{l.size}:</label>
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

        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{l.color}:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{l.bgColor}:</label>
          <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
        </div>

        {qrDataUrl && (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleDownload}>{l.download}</button>
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

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
