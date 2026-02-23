'use client'
import { useState, useRef, useCallback } from 'react'

interface ImageCropperProps {
  labels?: {
    uploadImage: string
    rotation: string
    scale: string
    download: string
    reset: string
  }
}

export default function ImageCropper({ labels }: ImageCropperProps) {
  const l = {
    uploadImage: labels?.uploadImage ?? 'Upload Image',
    rotation: labels?.rotation ?? 'Rotation',
    scale: labels?.scale ?? 'Scale',
    download: labels?.download ?? 'Download',
    reset: labels?.reset ?? 'Reset',
  }

  const [originalFile, setOriginalFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [rotation, setRotation] = useState(0)
  const [scale, setScale] = useState(1)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setOriginalFile(file)
    setRotation(0)
    setScale(1)

    const url = URL.createObjectURL(file)
    setImageUrl(url)

    const img = new Image()
    img.onload = () => {
      imgRef.current = img
    }
    img.src = url
  }, [])

  const handleReset = useCallback(() => {
    setRotation(0)
    setScale(1)
  }, [])

  const renderToCanvas = useCallback((): HTMLCanvasElement | null => {
    const img = imgRef.current
    if (!img) return null

    const canvas = canvasRef.current
    if (!canvas) return null

    const rad = (rotation * Math.PI) / 180
    const absCos = Math.abs(Math.cos(rad))
    const absSin = Math.abs(Math.sin(rad))

    const scaledW = img.naturalWidth * scale
    const scaledH = img.naturalHeight * scale

    const canvasW = Math.ceil(scaledW * absCos + scaledH * absSin)
    const canvasH = Math.ceil(scaledW * absSin + scaledH * absCos)

    canvas.width = canvasW
    canvas.height = canvasH

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.clearRect(0, 0, canvasW, canvasH)
    ctx.save()
    ctx.translate(canvasW / 2, canvasH / 2)
    ctx.rotate(rad)
    ctx.scale(scale, scale)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
    ctx.restore()

    return canvas
  }, [rotation, scale])

  const handleDownload = useCallback(() => {
    const canvas = renderToCanvas()
    if (!canvas) return

    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const baseName = originalFile?.name.replace(/\.[^.]+$/, '') ?? 'cropped'
      const a = document.createElement('a')
      a.href = url
      a.download = `${baseName}-edited.png`
      a.click()
      URL.revokeObjectURL(url)
    }, 'image/png')
  }, [renderToCanvas, originalFile])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    minWidth: '120px',
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

      {imageUrl && (
        <>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={labelStyle}>{l.rotation}: {rotation}°</label>
              <input
                type="range"
                min={-180}
                max={180}
                step={1}
                value={rotation}
                onChange={(e) => setRotation(Number(e.target.value))}
                className="flex-1"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <label style={labelStyle}>{l.scale}: {scale.toFixed(2)}x</label>
              <input
                type="range"
                min={0.1}
                max={3}
                step={0.05}
                value={scale}
                onChange={(e) => setScale(Number(e.target.value))}
                className="flex-1"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleReset}>
              {l.reset}
            </button>
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
            overflow: 'hidden',
          }}>
            <img
              src={imageUrl}
              alt="Preview"
              style={{
                maxWidth: '100%',
                maxHeight: '400px',
                borderRadius: '0.25rem',
                transform: `rotate(${rotation}deg) scale(${scale})`,
                transition: 'transform 0.15s ease',
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}
