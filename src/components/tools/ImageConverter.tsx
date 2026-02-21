'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageConverterProps {
  labels?: {
    uploadImage: string
    outputFormat: string
    preview: string
    download: string
    convert: string
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageConverter({ labels }: ImageConverterProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    outputFormat: labels?.outputFormat ?? 'Output Format',
    preview: labels?.preview ?? 'Preview',
    download: labels?.download ?? 'Download',
    convert: labels?.convert ?? 'Convert',
  }

  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState('')
  const [convertedUrl, setConvertedUrl] = useState('')
  const [convertedSize, setConvertedSize] = useState(0)
  const [format, setFormat] = useState<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setConvertedUrl('')
    setConvertedSize(0)

    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
  }, [])

  const handleConvert = useCallback(() => {
    if (!originalFile || !originalUrl) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      if (format === 'image/jpeg') {
        ctx.fillStyle = '#FFFFFF'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (!blob) return
          setConvertedSize(blob.size)
          const url = URL.createObjectURL(blob)
          setConvertedUrl(url)
        },
        format,
        format === 'image/jpeg' ? 0.92 : undefined
      )
    }
    img.src = originalUrl
  }, [originalFile, originalUrl, format])

  const handleDownload = useCallback(() => {
    if (!convertedUrl) return
    const extMap: Record<string, string> = {
      'image/png': 'png',
      'image/jpeg': 'jpg',
      'image/webp': 'webp',
    }
    const ext = extMap[format] ?? 'png'
    const baseName = originalFile?.name.replace(/\.[^.]+$/, '') ?? 'converted'
    const a = document.createElement('a')
    a.href = convertedUrl
    a.download = `${baseName}.${ext}`
    a.click()
  }, [convertedUrl, format, originalFile])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
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
        {originalFile && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {originalFile.name} ({formatBytes(originalFile.size)})
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.outputFormat}:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'image/png' | 'image/jpeg' | 'image/webp')}
            style={{
              padding: '0.375rem 0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="image/png">PNG</option>
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        <button
          className="btn-primary"
          onClick={handleConvert}
          disabled={!originalFile}
        >
          {l.convert}
        </button>
      </div>

      {convertedUrl && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>
              <span style={{ fontWeight: 600 }}>{l.preview}</span>
              {convertedSize > 0 && (
                <span style={{ color: 'var(--color-text-secondary)', marginLeft: '0.5rem' }}>
                  ({formatBytes(convertedSize)})
                </span>
              )}
            </span>
            <button className="btn-primary" onClick={handleDownload}>
              {l.download}
            </button>
          </div>
          <div style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '0.5rem',
            backgroundColor: 'var(--color-bg-secondary)',
            textAlign: 'center',
          }}>
            <img
              src={convertedUrl}
              alt="Converted preview"
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.25rem' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
