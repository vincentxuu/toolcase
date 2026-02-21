'use client'
import { useState } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface GlassmorphismGeneratorProps {
  labels?: {
    blurAmount: string
    transparency: string
    borderOpacity: string
    saturation: string
    backgroundColor: string
    preview: string
    cssCode: string
    copy: string
    copied: string
  }
}

export default function GlassmorphismGenerator({ labels }: GlassmorphismGeneratorProps) {
  const l = {
    blurAmount: labels?.blurAmount ?? 'Blur Amount',
    transparency: labels?.transparency ?? 'Transparency',
    borderOpacity: labels?.borderOpacity ?? 'Border Opacity',
    saturation: labels?.saturation ?? 'Saturation',
    backgroundColor: labels?.backgroundColor ?? 'Background Color',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [blur, setBlur] = useState(12)
  const [transparency, setTransparency] = useState(0.25)
  const [borderOpacity, setBorderOpacity] = useState(0.2)
  const [saturation, setSaturation] = useState(180)
  const [bgColor, setBgColor] = useState('#6366f1')

  // Parse hex to rgb
  const hexToRgb = (hex: string) => {
    const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
    if (!m) return { r: 99, g: 102, b: 241 }
    return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
  }

  const rgb = hexToRgb(bgColor)
  const glassBackground = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`
  const glassBorder = `rgba(255, 255, 255, ${borderOpacity})`

  const cssCode = `background: ${glassBackground};
backdrop-filter: blur(${blur}px) saturate(${saturation}%);
-webkit-backdrop-filter: blur(${blur}px) saturate(${saturation}%);
border: 1px solid ${glassBorder};
border-radius: 16px;`

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

  const sliderRow = (label: string, value: number, min: number, max: number, step: number, onChange: (v: number) => void, suffix: string = '') => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
        <span>{label}</span>
        <span>{value}{suffix}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%' }}
      />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sliderRow(l.blurAmount, blur, 0, 40, 1, setBlur, 'px')}
        {sliderRow(l.transparency, transparency, 0, 1, 0.01, setTransparency)}
        {sliderRow(l.borderOpacity, borderOpacity, 0, 1, 0.01, setBorderOpacity)}
        {sliderRow(l.saturation, saturation, 100, 300, 1, setSaturation, '%')}

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={labelStyle}>{l.backgroundColor}</span>
          <input
            type="color"
            value={bgColor}
            onChange={(e) => setBgColor(e.target.value)}
            style={{ width: '40px', height: '40px', border: '1px solid var(--color-border)', borderRadius: '0.375rem', cursor: 'pointer', padding: 0, backgroundColor: 'transparent' }}
          />
          <span style={{ fontSize: '0.8125rem', fontFamily: 'monospace', color: 'var(--color-text)' }}>{bgColor.toUpperCase()}</span>
        </div>
      </div>

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={labelStyle}>{l.preview}</span>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '300px',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            border: '1px solid var(--color-border)',
            background: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
          }}
        >
          {/* Background shapes for glass effect visibility */}
          <div style={{ position: 'absolute', top: '20px', left: '30px', width: '100px', height: '100px', borderRadius: '50%', background: '#f59e0b', opacity: 0.8 }} />
          <div style={{ position: 'absolute', bottom: '30px', right: '40px', width: '120px', height: '80px', borderRadius: '1rem', background: '#ef4444', opacity: 0.7 }} />
          <div style={{ position: 'absolute', top: '60px', right: '80px', width: '80px', height: '80px', borderRadius: '50%', background: '#10b981', opacity: 0.8 }} />

          {/* Glass card */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '260px',
              height: '160px',
              background: glassBackground,
              backdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              WebkitBackdropFilter: `blur(${blur}px) saturate(${saturation}%)`,
              border: `1px solid ${glassBorder}`,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.125rem',
              fontWeight: 600,
              textShadow: '0 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Glass Card
          </div>
        </div>
      </div>

      {/* CSS Code */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.cssCode}</span>
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
