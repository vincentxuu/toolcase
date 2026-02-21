'use client'
import { useState, useRef, useCallback } from 'react'

interface FaviconGeneratorProps {
  labels?: {
    uploadImage: string
    orUseText: string
    textInput: string
    generate: string
    download: string
    downloadAll: string
    preview: string
    htmlTags: string
    copyTags: string
    copied: string
    sourceImage: string
  }
}

const SIZES = [16, 32, 48, 180, 192, 512]

export default function FaviconGenerator({ labels }: FaviconGeneratorProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    orUseText: labels?.orUseText ?? 'Or use text/emoji',
    textInput: labels?.textInput ?? 'Text / Emoji',
    generate: labels?.generate ?? 'Generate Favicons',
    download: labels?.download ?? 'Download',
    downloadAll: labels?.downloadAll ?? 'Download All',
    preview: labels?.preview ?? 'Preview',
    htmlTags: labels?.htmlTags ?? 'HTML Link Tags',
    copyTags: labels?.copyTags ?? 'Copy Tags',
    copied: labels?.copied ?? 'Copied!',
    sourceImage: labels?.sourceImage ?? 'Source Image',
  }

  const [sourceUrl, setSourceUrl] = useState('')
  const [textInput, setTextInput] = useState('')
  const [favicons, setFavicons] = useState<{ size: number; url: string }[]>([])
  const [copied, setCopied] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setSourceUrl(url)
    setTextInput('')
    setFavicons([])
  }, [])

  const generateFromSource = useCallback((source: HTMLImageElement | HTMLCanvasElement) => {
    const results: { size: number; url: string }[] = []
    const canvas = canvasRef.current
    if (!canvas) return

    for (const size of SIZES) {
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, size, size)
      ctx.drawImage(source, 0, 0, size, size)
      const url = canvas.toDataURL('image/png')
      results.push({ size, url })
    }
    setFavicons(results)
  }, [])

  const handleGenerate = useCallback(() => {
    if (sourceUrl) {
      const img = new Image()
      img.crossOrigin = 'anonymous'
      img.onload = () => generateFromSource(img)
      img.src = sourceUrl
    } else if (textInput.trim()) {
      const canvas = document.createElement('canvas')
      canvas.width = 512
      canvas.height = 512
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.fillStyle = '#f0f0f0'
      ctx.fillRect(0, 0, 512, 512)
      ctx.font = '400px sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#000'
      ctx.fillText(textInput.trim().substring(0, 2), 256, 270)
      generateFromSource(canvas)
    }
  }, [sourceUrl, textInput, generateFromSource])

  const handleDownload = useCallback((url: string, size: number) => {
    const a = document.createElement('a')
    a.href = url
    a.download = `favicon-${size}x${size}.png`
    a.click()
  }, [])

  const htmlTags = favicons.length > 0 ? [
    '<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">',
    '<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">',
    '<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">',
    '<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">',
    '<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">',
    '<link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png">',
  ].join('\n') : ''

  const handleCopyTags = useCallback(() => {
    navigator.clipboard.writeText(htmlTags)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [htmlTags])

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
    width: '200px',
  }

  const cardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-secondary" onClick={() => fileRef.current?.click()}>
          {l.uploadImage}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        {sourceUrl && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {l.sourceImage} ✓
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <span style={labelStyle}>{l.orUseText}</span>
        <input
          type="text"
          value={textInput}
          onChange={(e) => { setTextInput(e.target.value); setSourceUrl(''); setFavicons([]) }}
          placeholder="A"
          maxLength={2}
          style={inputStyle}
        />
      </div>

      <div>
        <button
          className="btn-primary"
          onClick={handleGenerate}
          disabled={!sourceUrl && !textInput.trim()}
        >
          {l.generate}
        </button>
      </div>

      {favicons.length > 0 && (
        <>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {favicons.map(({ size, url }) => (
              <div key={size} style={cardStyle}>
                <div style={{
                  width: Math.max(size, 48),
                  height: Math.max(size, 48),
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fff',
                  borderRadius: '0.25rem',
                  border: '1px solid var(--color-border)',
                }}>
                  <img src={url} alt={`${size}x${size}`} width={size} height={size} style={{ imageRendering: size <= 32 ? 'pixelated' : 'auto' }} />
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {size}x{size}
                </span>
                <button
                  className="btn-secondary"
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                  onClick={() => handleDownload(url, size)}
                >
                  {l.download}
                </button>
              </div>
            ))}
          </div>

          <div style={{
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>
                {l.htmlTags}
              </span>
              <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }} onClick={handleCopyTags}>
                {copied ? l.copied : l.copyTags}
              </button>
            </div>
            <pre style={{
              fontSize: '0.75rem',
              color: 'var(--color-text-secondary)',
              overflowX: 'auto',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              margin: 0,
            }}>
              {htmlTags}
            </pre>
          </div>
        </>
      )}
    </div>
  )
}
