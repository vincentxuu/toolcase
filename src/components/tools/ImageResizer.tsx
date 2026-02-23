'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageResizerProps {
  labels?: {
    uploadImage: string
    width: string
    height: string
    lockAspectRatio: string
    resize: string
    download: string
    preview: string
    originalSize: string
    newSize: string
    originalDimensions: string
    newDimensions: string
  }
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageResizer({ labels }: ImageResizerProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    width: labels?.width ?? 'Width',
    height: labels?.height ?? 'Height',
    lockAspectRatio: labels?.lockAspectRatio ?? 'Lock Aspect Ratio',
    resize: labels?.resize ?? 'Resize',
    download: labels?.download ?? 'Download',
    preview: labels?.preview ?? 'Preview',
    originalSize: labels?.originalSize ?? 'Original Size',
    newSize: labels?.newSize ?? 'New Size',
    originalDimensions: labels?.originalDimensions ?? 'Original Dimensions',
    newDimensions: labels?.newDimensions ?? 'New Dimensions',
  }

  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [originalUrl, setOriginalUrl] = useState('')
  const [resizedUrl, setResizedUrl] = useState('')
  const [resizedBlob, setResizedBlob] = useState<Blob | null>(null)
  const [origWidth, setOrigWidth] = useState(0)
  const [origHeight, setOrigHeight] = useState(0)
  const [newWidth, setNewWidth] = useState(0)
  const [newHeight, setNewHeight] = useState(0)
  const [lockRatio, setLockRatio] = useState(true)
  const [originalSize, setOriginalSize] = useState(0)
  const [resizedSize, setResizedSize] = useState(0)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const aspectRatio = useRef(1)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setOriginalSize(file.size)
    setResizedUrl('')
    setResizedBlob(null)
    setResizedSize(0)

    const url = URL.createObjectURL(file)
    setOriginalUrl(url)

    const img = new Image()
    img.onload = () => {
      setOrigWidth(img.naturalWidth)
      setOrigHeight(img.naturalHeight)
      setNewWidth(img.naturalWidth)
      setNewHeight(img.naturalHeight)
      aspectRatio.current = img.naturalWidth / img.naturalHeight
    }
    img.src = url
  }, [])

  const handleWidthChange = useCallback((val: number) => {
    setNewWidth(val)
    if (lockRatio) {
      setNewHeight(Math.round(val / aspectRatio.current))
    }
  }, [lockRatio])

  const handleHeightChange = useCallback((val: number) => {
    setNewHeight(val)
    if (lockRatio) {
      setNewWidth(Math.round(val * aspectRatio.current))
    }
  }, [lockRatio])

  const handleResize = useCallback(() => {
    if (!originalFile || newWidth <= 0 || newHeight <= 0) return

    const img = new Image()
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, newWidth, newHeight)

      canvas.toBlob(
        (blob) => {
          if (!blob) return
          setResizedBlob(blob)
          setResizedSize(blob.size)
          const url = URL.createObjectURL(blob)
          setResizedUrl(url)
        },
        'image/png'
      )
    }
    img.src = originalUrl
  }, [originalFile, originalUrl, newWidth, newHeight])

  const handleDownload = useCallback(() => {
    if (!resizedUrl) return
    const a = document.createElement('a')
    a.href = resizedUrl
    a.download = `resized_${newWidth}x${newHeight}.png`
    a.click()
  }, [resizedUrl, newWidth, newHeight])

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

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '100px',
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

      {origWidth > 0 && (
        <div className="flex gap-4 flex-wrap">
          <div style={cardStyle}>
            <span style={labelStyle}>{l.originalDimensions}: </span>
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
              {origWidth} x {origHeight}
            </span>
          </div>
          <div style={cardStyle}>
            <span style={labelStyle}>{l.originalSize}: </span>
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
              {formatBytes(originalSize)}
            </span>
          </div>
        </div>
      )}

      {originalFile && (
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-2">
            <label style={labelStyle}>{l.width}:</label>
            <input
              type="number"
              value={newWidth}
              onChange={(e) => handleWidthChange(Number(e.target.value))}
              min={1}
              style={inputStyle}
            />
          </div>

          <div className="flex items-center gap-2">
            <label style={labelStyle}>{l.height}:</label>
            <input
              type="number"
              value={newHeight}
              onChange={(e) => handleHeightChange(Number(e.target.value))}
              min={1}
              style={inputStyle}
            />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={lockRatio}
              onChange={(e) => setLockRatio(e.target.checked)}
            />
            <span style={labelStyle}>{l.lockAspectRatio}</span>
          </label>

          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleResize}>
            {l.resize}
          </button>
        </div>
      )}

      {resizedSize > 0 && (
        <div className="flex gap-4 flex-wrap">
          <div style={cardStyle}>
            <span style={labelStyle}>{l.newDimensions}: </span>
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
              {newWidth} x {newHeight}
            </span>
          </div>
          <div style={cardStyle}>
            <span style={labelStyle}>{l.newSize}: </span>
            <span style={{ color: 'var(--color-text)', fontWeight: 600 }}>
              {formatBytes(resizedSize)}
            </span>
          </div>
        </div>
      )}

      {resizedUrl && (
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
              src={resizedUrl}
              alt="Resized preview"
              style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '0.25rem' }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
