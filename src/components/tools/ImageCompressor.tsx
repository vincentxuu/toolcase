'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageCompressorProps {
  labels?: {
    uploadImage: string
    quality: string
    format: string
    originalSize: string
    compressedSize: string
    savings: string
    download: string
    preview: string
    compress: string
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageCompressor({ labels }: ImageCompressorProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    quality: labels?.quality ?? 'Quality',
    format: labels?.format ?? 'Format',
    originalSize: labels?.originalSize ?? 'Original Size',
    compressedSize: labels?.compressedSize ?? 'Compressed Size',
    savings: labels?.savings ?? 'Savings',
    download: labels?.download ?? 'Download',
    preview: labels?.preview ?? 'Preview',
    compress: labels?.compress ?? 'Compress',
  }

  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState('')
  const [compressedUrl, setCompressedUrl] = useState('')
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)
  const [quality, setQuality] = useState(80)
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalSize(file.size)
    setCompressedUrl('')
    setCompressedBlob(null)
    setCompressedSize(0)

    const url = URL.createObjectURL(file)
    setOriginalUrl(url)
  }, [])

  const handleCompress = useCallback(() => {
    if (!originalFile) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          if (!blob) return
          setCompressedBlob(blob)
          setCompressedSize(blob.size)
          const url = URL.createObjectURL(blob)
          setCompressedUrl(url)
        },
        format,
        quality / 100
      )
    }
    img.src = originalUrl
  }, [originalFile, originalUrl, quality, format])

  const handleDownload = useCallback(() => {
    if (!compressedUrl) return
    const ext = format === 'image/webp' ? 'webp' : 'jpg'
    const a = document.createElement('a')
    a.href = compressedUrl
    a.download = `compressed.${ext}`
    a.click()
  }, [compressedUrl, format])

  const savingsPercent = originalSize > 0 && compressedSize > 0
    ? ((1 - compressedSize / originalSize) * 100).toFixed(1)
    : null

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const cardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  return (
    <div className="flex flex-col gap-4">
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex gap-4 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={() => fileRef.current?.click()}>
          {l.uploadImage}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {originalFile && (
          <span className="text-sm text-[var(--color-text-secondary)]">
            {originalFile.name}
          </span>
        )}
      </div>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex items-center gap-2">
          <label style={labelStyle}>{l.quality}: {quality}%</label>
          <input
            type="range"
            min={1}
            max={100}
            value={quality}
            onChange={(e) => setQuality(Number(e.target.value))}
            className="w-32 sm:w-40"
          />
        </div>

        <div className="flex items-center gap-2">
          <label style={labelStyle}>{l.format}:</label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value as 'image/jpeg' | 'image/webp')}
            style={{
              padding: '0.375rem 0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="image/jpeg">JPEG</option>
            <option value="image/webp">WebP</option>
          </select>
        </div>

        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleCompress}
          disabled={!originalFile}
        >
          {l.compress}
        </button>
      </div>

      {originalSize > 0 && (
        <div className="flex gap-4 flex-wrap">
          <div style={cardStyle}>
            <span style={labelStyle}>{l.originalSize}: </span>
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{formatBytes(originalSize)}</span>
          </div>
          {compressedSize > 0 && (
            <>
              <div style={cardStyle}>
                <span style={labelStyle}>{l.compressedSize}: </span>
                <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>{formatBytes(compressedSize)}</span>
              </div>
              <div style={cardStyle}>
                <span style={labelStyle}>{l.savings}: </span>
                <span style={{
                  color: Number(savingsPercent) > 0 ? 'var(--color-primary)' : 'var(--color-text)',
                  fontWeight: 600,
                }}>
                  {savingsPercent}%
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {compressedUrl && (
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text)' }}>
              {l.preview}
            </span>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleDownload}>
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
              src={compressedUrl}
              alt="Compressed preview"
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.25rem' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
