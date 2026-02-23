'use client'
import { useState, useCallback, useRef, useEffect } from 'react'

interface LogoGeneratorProps {
  labels?: {
    title: string
    text: string
    textPlaceholder: string
    template: string
    textOnly: string
    circleIcon: string
    squareIcon: string
    fontSize: string
    backgroundColor: string
    textColor: string
    iconColor: string
    download: string
    preview: string
    customize: string
  }
}

export default function LogoGenerator({ labels }: LogoGeneratorProps) {
  const l = {
    title: labels?.title ?? 'Logo Generator',
    text: labels?.text ?? 'Logo Text',
    textPlaceholder: labels?.textPlaceholder ?? 'Your Brand',
    template: labels?.template ?? 'Template',
    textOnly: labels?.textOnly ?? 'Text Only',
    circleIcon: labels?.circleIcon ?? 'Circle Icon',
    squareIcon: labels?.squareIcon ?? 'Square Icon',
    fontSize: labels?.fontSize ?? 'Font Size',
    backgroundColor: labels?.backgroundColor ?? 'Background Color',
    textColor: labels?.textColor ?? 'Text Color',
    iconColor: labels?.iconColor ?? 'Icon Color',
    download: labels?.download ?? 'Download PNG',
    preview: labels?.preview ?? 'Preview',
    customize: labels?.customize ?? 'Customize',
  }

  const [text, setText] = useState('Your Brand')
  const [template, setTemplate] = useState<'text' | 'circle' | 'square'>('text')
  const [fontSize, setFontSize] = useState(48)
  const [bgColor, setBgColor] = useState('#ffffff')
  const [textColor, setTextColor] = useState('#000000')
  const [iconColor, setIconColor] = useState('#3b82f6')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw logo on canvas
  const drawLogo = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Set font
    ctx.font = `bold ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    if (template === 'text') {
      // Text only
      ctx.fillStyle = textColor
      ctx.fillText(text, centerX, centerY)
    } else if (template === 'circle') {
      // Circle icon + text
      const iconSize = fontSize * 0.8
      const iconX = centerX - ctx.measureText(text).width / 2 - iconSize - 20
      const iconY = centerY

      // Draw circle
      ctx.fillStyle = iconColor
      ctx.beginPath()
      ctx.arc(iconX, iconY, iconSize / 2, 0, Math.PI * 2)
      ctx.fill()

      // Draw text
      ctx.fillStyle = textColor
      ctx.fillText(text, centerX + iconSize / 2, centerY)
    } else if (template === 'square') {
      // Square icon + text
      const iconSize = fontSize * 0.8
      const iconX = centerX - ctx.measureText(text).width / 2 - iconSize - 20
      const iconY = centerY

      // Draw square
      ctx.fillStyle = iconColor
      ctx.fillRect(iconX - iconSize / 2, iconY - iconSize / 2, iconSize, iconSize)

      // Draw text
      ctx.fillStyle = textColor
      ctx.fillText(text, centerX + iconSize / 2, centerY)
    }
  }, [text, template, fontSize, bgColor, textColor, iconColor])

  // Redraw when parameters change
  useEffect(() => {
    drawLogo()
  }, [drawLogo])

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Create download link
    canvas.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `logo-${text.toLowerCase().replace(/\s+/g, '-')}.png`
      link.click()
      URL.revokeObjectURL(url)
    })
  }, [text])

  return (
    <div className="flex flex-col gap-6">
      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.preview}
        </h3>
        <div
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            padding: '2rem',
            backgroundColor: 'var(--color-bg-secondary)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <canvas
            ref={canvasRef}
            width={800}
            height={400}
            style={{
              maxWidth: '100%',
              height: 'auto',
              border: '1px solid var(--color-border)',
              borderRadius: '0.25rem',
            }}
          />
        </div>
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleDownload}>
            {l.download}
          </button>
        </div>
      </div>

      {/* Customize */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.customize}
        </h3>

        <div className="flex flex-col gap-4">
          {/* Text Input */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.text}
            </label>
            <input
              type="text"
              placeholder={l.textPlaceholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          {/* Template Selection */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.template}
            </label>
            <div className="flex gap-2 flex-wrap">
              <button
                className={template === 'text' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
                onClick={() => setTemplate('text')}
              >
                {l.textOnly}
              </button>
              <button
                className={template === 'circle' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
                onClick={() => setTemplate('circle')}
              >
                {l.circleIcon}
              </button>
              <button
                className={template === 'square' ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
                onClick={() => setTemplate('square')}
              >
                {l.squareIcon}
              </button>
            </div>
          </div>

          {/* Font Size */}
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.fontSize}: {fontSize}px
            </label>
            <input
              type="range"
              min="24"
              max="96"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{
                width: '100%',
                accentColor: 'var(--color-primary)',
              }}
            />
          </div>

          {/* Colors */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.backgroundColor}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{
                    width: '50px',
                    height: '40px',
                    padding: '0.125rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.textColor}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{
                    width: '50px',
                    height: '40px',
                    padding: '0.125rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                  }}
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                  }}
                />
              </div>
            </div>

            {template !== 'text' && (
              <div>
                <label className="block mb-2 text-sm font-semibold">
                  {l.iconColor}
                </label>
                <div className="flex gap-2 items-center">
                  <input
                    type="color"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    style={{
                      width: '50px',
                      height: '40px',
                      padding: '0.125rem',
                      borderRadius: '0.375rem',
                      border: '1px solid var(--color-border)',
                      cursor: 'pointer',
                    }}
                  />
                  <input
                    type="text"
                    value={iconColor}
                    onChange={(e) => setIconColor(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '0.5rem',
                      borderRadius: '0.375rem',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text)',
                      fontSize: '0.75rem',
                      fontFamily: 'monospace',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
