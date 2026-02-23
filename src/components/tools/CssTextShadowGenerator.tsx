'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CssTextShadowGeneratorProps {
  labels?: {
    offsetX: string
    offsetY: string
    blur: string
    color: string
    opacity: string
    addShadow: string
    removeShadow: string
    preview: string
    cssCode: string
    copy: string
    copied: string
    shadow: string
    previewText: string
    fontSize: string
  }
}

interface ShadowConfig {
  offsetX: number
  offsetY: number
  blur: number
  color: string
  opacity: number
}

function hexToRgba(hex: string, opacity: number): string {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return `rgba(0,0,0,${opacity})`
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${opacity})`
}

function shadowToCSS(s: ShadowConfig): string {
  const rgba = hexToRgba(s.color, s.opacity)
  return `${s.offsetX}px ${s.offsetY}px ${s.blur}px ${rgba}`
}

export default function CssTextShadowGenerator({ labels }: CssTextShadowGeneratorProps) {
  const l = {
    offsetX: labels?.offsetX ?? 'Offset X',
    offsetY: labels?.offsetY ?? 'Offset Y',
    blur: labels?.blur ?? 'Blur',
    color: labels?.color ?? 'Color',
    opacity: labels?.opacity ?? 'Opacity',
    addShadow: labels?.addShadow ?? 'Add Shadow',
    removeShadow: labels?.removeShadow ?? 'Remove',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    shadow: labels?.shadow ?? 'Shadow',
    previewText: labels?.previewText ?? 'Preview Text',
    fontSize: labels?.fontSize ?? 'Font Size',
  }

  const [shadows, setShadows] = useState<ShadowConfig[]>([
    { offsetX: 2, offsetY: 2, blur: 4, color: '#000000', opacity: 0.5 },
  ])
  const [text, setText] = useState('Sample Text')
  const [fontSizePx, setFontSizePx] = useState(48)

  const updateShadow = useCallback((index: number, field: keyof ShadowConfig, value: number | string) => {
    setShadows(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }, [])

  const addShadow = useCallback(() => {
    setShadows(prev => [...prev, { offsetX: 2, offsetY: 2, blur: 4, color: '#000000', opacity: 0.3 }])
  }, [])

  const removeShadow = useCallback((index: number) => {
    if (shadows.length <= 1) return
    setShadows(prev => prev.filter((_, i) => i !== index))
  }, [shadows.length])

  const cssValue = shadows.map(shadowToCSS).join(', ')
  const cssCode = `text-shadow: ${cssValue};`

  const sliderRow = (label: string, value: number, min: number, max: number, step: number, onChange: (v: number) => void) => (
    <div className="flex flex-col gap-1">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
        <span>{label}</span>
        <span>{value}{label === l.opacity ? '' : 'px'}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )

  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    cursor: 'pointer',
    fontSize: '0.875rem',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Preview text input and font size */}
      <div className="flex gap-4 flex-wrap">
        <div style={{ flex: '1 1 250px' }}>
          <label style={{ display: 'block', marginBottom: '0.375rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.previewText}</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{
              width: '100%',
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontSize: '1rem',
            }}
          />
        </div>
        <div style={{ flex: '0 1 200px' }}>
          {sliderRow(l.fontSize, fontSizePx, 16, 72, 1, setFontSizePx)}
        </div>
      </div>

      {/* Shadow configs */}
      {shadows.map((shadow, i) => (
        <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{l.shadow} {i + 1}</span>
            {shadows.length > 1 && (
              <button onClick={() => removeShadow(i)} style={{ ...btnStyle, color: '#ef4444', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                {l.removeShadow}
              </button>
            )}
          </div>
          {sliderRow(l.offsetX, shadow.offsetX, -50, 50, 1, (v) => updateShadow(i, 'offsetX', v))}
          {sliderRow(l.offsetY, shadow.offsetY, -50, 50, 1, (v) => updateShadow(i, 'offsetY', v))}
          {sliderRow(l.blur, shadow.blur, 0, 50, 1, (v) => updateShadow(i, 'blur', v))}
          {sliderRow(l.opacity, shadow.opacity, 0, 1, 0.01, (v) => updateShadow(i, 'opacity', v))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className="text-xs text-[var(--color-text-secondary)]">{l.color}</span>
            <input
              type="color"
              value={shadow.color}
              onChange={(e) => updateShadow(i, 'color', e.target.value)}
              style={{ width: '36px', height: '36px', border: '1px solid var(--color-border)', borderRadius: '0.375rem', cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }}
            />
          </div>
        </div>
      ))}

      <button onClick={addShadow} style={btnStyle}>+ {l.addShadow}</button>

      {/* Preview */}
      <div className="flex flex-col gap-2">
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{l.preview}</span>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '3rem',
          borderRadius: '0.75rem',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          minHeight: '150px',
        }}>
          <span style={{
            fontSize: `${fontSizePx}px`,
            fontWeight: 700,
            color: 'var(--color-text)',
            textShadow: cssValue,
          }}>
            {text || 'Sample Text'}
          </span>
        </div>
      </div>

      {/* CSS Code */}
      <div className="flex flex-col gap-2">
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{l.cssCode}</span>
        <div className="flex gap-2 items-start">
          <pre
            style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontSize: '0.8125rem',
              fontFamily: 'monospace',
              color: 'var(--color-text)',
              overflow: 'auto',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {cssCode}
          </pre>
          <CopyButton text={cssCode} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>
    </div>
  )
}
