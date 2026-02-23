'use client'
import { useState, useRef, useCallback } from 'react'

interface SvgToPngConverterProps {
  labels?: {
    uploadSvg: string
    pasteSvg: string
    preview: string
    scale: string
    convert: string
    download: string
    orPaste: string
    chooseFile: string
  }
}

export default function SvgToPngConverter({ labels }: SvgToPngConverterProps) {
  const l = {
    uploadSvg: labels?.uploadSvg ?? 'Upload SVG',
    pasteSvg: labels?.pasteSvg ?? 'Paste SVG Code',
    preview: labels?.preview ?? 'Preview',
    scale: labels?.scale ?? 'Scale',
    convert: labels?.convert ?? 'Convert to PNG',
    download: labels?.download ?? 'Download PNG',
    orPaste: labels?.orPaste ?? 'Or paste SVG code below',
    chooseFile: labels?.chooseFile ?? 'Choose SVG File',
  }

  const [svgCode, setSvgCode] = useState('')
  const [svgUrl, setSvgUrl] = useState<string | null>(null)
  const [pngUrl, setPngUrl] = useState<string | null>(null)
  const [scale, setScale] = useState(2)
  const [converting, setConverting] = useState(false)
  const [fileName, setFileName] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (ev) => {
      const text = ev.target?.result as string
      setSvgCode(text)
      const blob = new Blob([text], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      setSvgUrl(url)
      setPngUrl(null)
    }
    reader.readAsText(file)
  }, [])

  const handlePaste = useCallback((text: string) => {
    setSvgCode(text)
    setPngUrl(null)
    if (text.trim().startsWith('<svg') || text.trim().startsWith('<?xml')) {
      const blob = new Blob([text], { type: 'image/svg+xml' })
      const url = URL.createObjectURL(blob)
      setSvgUrl(url)
    } else {
      setSvgUrl(null)
    }
  }, [])

  const handleConvert = useCallback(() => {
    if (!svgCode.trim()) return
    setConverting(true)

    const svgBlob = new Blob([svgCode], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)
    const img = new Image()

    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.naturalWidth * scale
      canvas.height = img.naturalHeight * scale
      const ctx = canvas.getContext('2d')
      if (!ctx) { setConverting(false); return }
      ctx.scale(scale, scale)
      ctx.drawImage(img, 0, 0)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (blob) {
          const pngObjUrl = URL.createObjectURL(blob)
          setPngUrl(pngObjUrl)
        }
        setConverting(false)
      }, 'image/png')
    }

    img.onerror = () => {
      setConverting(false)
      URL.revokeObjectURL(url)
    }

    img.src = url
  }, [svgCode, scale])

  const handleDownload = useCallback(() => {
    if (!pngUrl) return
    const a = document.createElement('a')
    a.href = pngUrl
    a.download = (fileName ? fileName.replace(/\.svg$/i, '') : 'converted') + `_${scale}x.png`
    a.click()
  }, [pngUrl, fileName, scale])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '0.875rem',
  }
  const primaryBtn: React.CSSProperties = {
    ...btnStyle, backgroundColor: 'var(--color-primary)', color: '#fff', border: '1px solid var(--color-primary)',
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <label style={labelStyle}>{l.uploadSvg}</label>
        <input ref={fileInputRef} type="file" accept=".svg" onChange={handleFileUpload} className="hidden" />
        <button onClick={() => fileInputRef.current?.click()} style={btnStyle}>
          {l.chooseFile}
        </button>
        {fileName && <span style={{ marginLeft: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{fileName}</span>}
      </div>

      <div>
        <label style={labelStyle}>{l.orPaste}</label>
        <textarea
          style={{ ...inputStyle, minHeight: '150px', fontFamily: 'monospace', fontSize: '0.85rem', resize: 'vertical' }}
          value={svgCode}
          onChange={(e) => handlePaste(e.target.value)}
          placeholder="<svg>...</svg>"
        />
      </div>

      <div>
        <label style={labelStyle}>{l.scale}</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => { setScale(s); setPngUrl(null) }}
              style={scale === s ? primaryBtn : btnStyle}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {svgUrl && (
        <div>
          <label style={labelStyle}>{l.preview}</label>
          <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: '#fff', display: 'flex', justifyContent: 'center' }}>
            <img src={svgUrl} alt="SVG preview" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          </div>
        </div>
      )}

      <button onClick={handleConvert} style={{ ...primaryBtn, padding: '0.75rem 1.5rem', fontSize: '1rem' }} disabled={!svgCode.trim() || converting}>
        {converting ? '...' : l.convert}
      </button>

      {pngUrl && (
        <div className="flex flex-col gap-4">
          <div>
            <label style={labelStyle}>PNG {l.preview}</label>
            <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', display: 'flex', justifyContent: 'center' }}>
              <img src={pngUrl} alt="PNG result" style={{ maxWidth: '100%', maxHeight: '300px' }} />
            </div>
          </div>
          <button onClick={handleDownload} style={{ ...primaryBtn, padding: '0.75rem 1.5rem', fontSize: '1rem' }}>
            {l.download}
          </button>
        </div>
      )}
    </div>
  )
}
