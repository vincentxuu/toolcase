'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface GradientGeneratorProps {
  labels?: {
    type: string
    linear: string
    radial: string
    angle: string
    colorStops: string
    addStop: string
    remove: string
    preview: string
    cssCode: string
    copy: string
    copied: string
  }
}

interface ColorStop {
  color: string
  position: number
}

export default function GradientGenerator({ labels }: GradientGeneratorProps) {
  const l = {
    type: labels?.type ?? 'Gradient Type',
    linear: labels?.linear ?? 'Linear',
    radial: labels?.radial ?? 'Radial',
    angle: labels?.angle ?? 'Angle',
    colorStops: labels?.colorStops ?? 'Color Stops',
    addStop: labels?.addStop ?? 'Add Color Stop',
    remove: labels?.remove ?? 'Remove',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#3b82f6', position: 0 },
    { color: '#8b5cf6', position: 100 },
  ])

  const updateStop = useCallback((index: number, field: 'color' | 'position', value: string | number) => {
    setStops(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }, [])

  const addStop = useCallback(() => {
    setStops(prev => [...prev, { color: '#10b981', position: 50 }])
  }, [])

  const removeStop = useCallback((index: number) => {
    if (stops.length <= 2) return
    setStops(prev => prev.filter((_, i) => i !== index))
  }, [stops.length])

  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const stopsStr = sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')
  const cssValue = gradientType === 'linear'
    ? `linear-gradient(${angle}deg, ${stopsStr})`
    : `radial-gradient(circle, ${stopsStr})`
  const cssCode = `background: ${cssValue};`

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

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
      {/* Gradient type */}
      <div className="flex gap-2 items-center">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.type}</span>
        <button
          onClick={() => setGradientType('linear')}
          style={{ ...btnStyle, backgroundColor: gradientType === 'linear' ? 'var(--color-accent)' : 'var(--color-bg-secondary)', color: gradientType === 'linear' ? '#fff' : 'var(--color-text)' }}
        >
          {l.linear}
        </button>
        <button
          onClick={() => setGradientType('radial')}
          style={{ ...btnStyle, backgroundColor: gradientType === 'radial' ? 'var(--color-accent)' : 'var(--color-bg-secondary)', color: gradientType === 'radial' ? '#fff' : 'var(--color-text)' }}
        >
          {l.radial}
        </button>
      </div>

      {/* Angle control (linear only) */}
      {gradientType === 'linear' && (
        <div className="flex flex-col gap-2">
          <span style={labelStyle}>{l.angle}: {angle}°</span>
          <input
            type="range"
            min={0}
            max={360}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="w-full"
          />
        </div>
      )}

      {/* Color stops */}
      <div className="flex flex-col gap-3">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.colorStops}</span>
        {stops.map((stop, i) => (
          <div key={i} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <input
              type="color"
              value={stop.color}
              onChange={(e) => updateStop(i, 'color', e.target.value)}
              style={{ width: '40px', height: '40px', border: '1px solid var(--color-border)', borderRadius: '0.375rem', cursor: 'pointer', padding: 0, backgroundColor: 'transparent', flexShrink: 0 }}
            />
            <input
              type="text"
              value={stop.color.toUpperCase()}
              onChange={(e) => updateStop(i, 'color', e.target.value)}
              style={{ ...inputStyle, fontFamily: 'monospace' }}
              className="w-full sm:w-[100px]"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={stop.position}
              onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
              style={inputStyle}
              className="w-full sm:w-[70px]"
            />
            <span style={labelStyle}>%</span>
            {stops.length > 2 && (
              <button onClick={() => removeStop(i)} style={{ ...btnStyle, color: '#ef4444', padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                {l.remove}
              </button>
            )}
          </div>
        ))}
        <button onClick={addStop} style={btnStyle}>+ {l.addStop}</button>
      </div>

      {/* Preview */}
      <div className="flex flex-col gap-2">
        <span style={labelStyle}>{l.preview}</span>
        <div
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '0.75rem',
            background: cssValue,
            border: '1px solid var(--color-border)',
          }}
        />
      </div>

      {/* CSS Code */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.cssCode}</span>
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
