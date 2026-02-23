'use client'
import { useState, useRef, useCallback } from 'react'

interface WebpConverterProps {
  labels?: {
    upload: string
    dragDrop: string
    orClick: string
    outputFormat: string
    quality: string
    convert: string
    download: string
    reset: string
    original: string
    converted: string
    fileSize: string
  }
}

const FORMATS = [
  { id: 'webp', label: 'WebP', mime: 'image/webp' },
  { id: 'png', label: 'PNG', mime: 'image/png' },
  { id: 'jpeg', label: 'JPG', mime: 'image/jpeg' },
]

export default function WebpConverter({ labels }: WebpConverterProps) {
  const l = {
    upload: labels?.upload ?? 'Upload Image',
    dragDrop: labels?.dragDrop ?? 'Drag & drop image here',
    orClick: labels?.orClick ?? 'or click to browse',
    outputFormat: labels?.outputFormat ?? 'Output Format',
    quality: labels?.quality ?? 'Quality',
    convert: labels?.convert ?? 'Convert',
    download: labels?.download ?? 'Download',
    reset: labels?.reset ?? 'Reset',
    original: labels?.original ?? 'Original',
    converted: labels?.converted ?? 'Converted',
    fileSize: labels?.fileSize ?? 'File Size',
  }

  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [format, setFormat] = useState('webp')
  const [quality, setQuality] = useState(85)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [resultSize, setResultSize] = useState(0)
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback((f: File) => {
    setFile(f)
    setResultUrl(null)
    const url = URL.createObjectURL(f)
    setPreview(url)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('image/')) handleFile(f)
  }, [handleFile])

  const convert = useCallback(() => {
    if (!file || !preview) return
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const fmt = FORMATS.find((f) => f.id === format)!
      canvas.toBlob((blob) => {
        if (!blob) return
        if (resultUrl) URL.revokeObjectURL(resultUrl)
        setResultUrl(URL.createObjectURL(blob))
        setResultSize(blob.size)
      }, fmt.mime, format === 'png' ? undefined : quality / 100)
    }
    img.src = preview
  }, [file, preview, format, quality, resultUrl])

  const handleDownload = useCallback(() => {
    if (!resultUrl || !file) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = file.name.replace(/\.[^.]+$/, '') + '.' + format
    a.click()
  }, [resultUrl, file, format])

  const handleReset = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview)
    if (resultUrl) URL.revokeObjectURL(resultUrl)
    setFile(null); setPreview(null); setResultUrl(null)
  }, [preview, resultUrl])

  const fmtSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'inherit', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem',
  })

  return (
    <div className="flex flex-col gap-4">
      {!file && (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          style={{ padding: '3rem', textAlign: 'center', cursor: 'pointer', border: '2px dashed', borderColor: dragging ? 'var(--color-primary)' : 'var(--color-border)', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)' }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🖼️</div>
          <div className="font-semibold">{l.dragDrop}</div>
          <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{l.orClick}</div>
          <input ref={fileRef} type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }} className="hidden" />
        </div>
      )}

      {file && preview && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: resultUrl ? '1fr 1fr' : '1fr', gap: '1rem' }}>
            <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
              <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
                {l.original} — {fmtSize(file.size)}
              </div>
              <img src={preview} alt="Original" style={{ width: '100%', display: 'block' }} />
            </div>
            {resultUrl && (
              <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
                <div style={{ padding: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontWeight: 600, fontSize: '0.85rem' }}>
                  {l.converted} — {fmtSize(resultSize)}
                </div>
                <img src={resultUrl} alt="Converted" style={{ width: '100%', display: 'block' }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{l.outputFormat}</label>
              <div className="flex gap-2">
                {FORMATS.map((f) => <button key={f.id} onClick={() => setFormat(f.id)} style={btnStyle(format === f.id)}>{f.label}</button>)}
              </div>
            </div>
            {format !== 'png' && (
              <div style={{ flex: '1 1 150px' }}>
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>{l.quality}: {quality}%</label>
                <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={convert} style={btnStyle(true)}>{l.convert}</button>
            {resultUrl && <button onClick={handleDownload} style={btnStyle(true)}>{l.download}</button>}
            <button onClick={handleReset} style={btnStyle(false)}>{l.reset}</button>
          </div>
        </>
      )}
    </div>
  )
}
