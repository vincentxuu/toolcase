'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface BoxShadowGeneratorProps {
  labels?: {
    offsetX: string
    offsetY: string
    blur: string
    spread: string
    color: string
    opacity: string
    inset: string
    addShadow: string
    removeShadow: string
    preview: string
    cssCode: string
    copy: string
    copied: string
    shadow: string
  }
}

interface ShadowConfig {
  offsetX: number
  offsetY: number
  blur: number
  spread: number
  color: string
  opacity: number
  inset: boolean
}

function hexToRgba(hex: string, opacity: number): string {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return `rgba(0,0,0,${opacity})`
  return `rgba(${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}, ${opacity})`
}

function shadowToCSS(s: ShadowConfig): string {
  const rgba = hexToRgba(s.color, s.opacity)
  return `${s.inset ? 'inset ' : ''}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${rgba}`
}

export default function BoxShadowGenerator({ labels }: BoxShadowGeneratorProps) {
  const l = {
    offsetX: labels?.offsetX ?? 'Offset X',
    offsetY: labels?.offsetY ?? 'Offset Y',
    blur: labels?.blur ?? 'Blur',
    spread: labels?.spread ?? 'Spread',
    color: labels?.color ?? 'Color',
    opacity: labels?.opacity ?? 'Opacity',
    inset: labels?.inset ?? 'Inset',
    addShadow: labels?.addShadow ?? 'Add Shadow',
    removeShadow: labels?.removeShadow ?? 'Remove',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    shadow: labels?.shadow ?? 'Shadow',
  }

  const [shadows, setShadows] = useState<ShadowConfig[]>([
    { offsetX: 4, offsetY: 4, blur: 10, spread: 0, color: '#000000', opacity: 0.25, inset: false },
  ])

  const updateShadow = useCallback((index: number, field: keyof ShadowConfig, value: number | string | boolean) => {
    setShadows(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }, [])

  const addShadow = useCallback(() => {
    setShadows(prev => [...prev, { offsetX: 0, offsetY: 2, blur: 8, spread: 0, color: '#000000', opacity: 0.15, inset: false }])
  }, [])

  const removeShadow = useCallback((index: number) => {
    if (shadows.length <= 1) return
    setShadows(prev => prev.filter((_, i) => i !== index))
  }, [shadows.length])

  const cssValue = shadows.map(shadowToCSS).join(', ')
  const cssCode = `box-shadow: ${cssValue};`

  const sliderRow = (label: string, value: number, min: number, max: number, onChange: (v: number) => void) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
        <span>{label}</span>
        <span>{value}{label === l.opacity ? '' : 'px'}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={label === l.opacity ? 0.01 : 1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Shadow configs */}
      {shadows.map((shadow, i) => (
        <div key={i} style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-text)' }}>{l.shadow} {i + 1}</span>
            {shadows.length > 1 && (
              <button onClick={() => removeShadow(i)} style={{ ...btnStyle, color: '#ef4444', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>
                {l.removeShadow}
              </button>
            )}
          </div>
          {sliderRow(l.offsetX, shadow.offsetX, -50, 50, (v) => updateShadow(i, 'offsetX', v))}
          {sliderRow(l.offsetY, shadow.offsetY, -50, 50, (v) => updateShadow(i, 'offsetY', v))}
          {sliderRow(l.blur, shadow.blur, 0, 100, (v) => updateShadow(i, 'blur', v))}
          {sliderRow(l.spread, shadow.spread, -50, 50, (v) => updateShadow(i, 'spread', v))}
          {sliderRow(l.opacity, shadow.opacity, 0, 1, (v) => updateShadow(i, 'opacity', v))}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.color}</span>
            <input
              type="color"
              value={shadow.color}
              onChange={(e) => updateShadow(i, 'color', e.target.value)}
              style={{ width: '36px', height: '36px', border: '1px solid var(--color-border)', borderRadius: '0.375rem', cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }}
            />
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={shadow.inset}
                onChange={(e) => updateShadow(i, 'inset', e.target.checked)}
              />
              {l.inset}
            </label>
          </div>
        </div>
      ))}

      <button onClick={addShadow} style={btnStyle}>+ {l.addShadow}</button>

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{l.preview}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              borderRadius: '1rem',
              backgroundColor: 'var(--color-bg)',
              boxShadow: cssValue,
            }}
          />
        </div>
      </div>

      {/* CSS Code */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }}>{l.cssCode}</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
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
