'use client'
import { useState } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CssClipPathGeneratorProps {
  labels?: {
    shape: string
    circle: string
    ellipse: string
    triangle: string
    polygon: string
    pentagon: string
    hexagon: string
    star: string
    radius: string
    radiusX: string
    radiusY: string
    preview: string
    cssCode: string
    copy: string
    copied: string
  }
}

type ShapeType = 'circle' | 'ellipse' | 'triangle' | 'polygon' | 'pentagon' | 'hexagon' | 'star'

function getClipPath(shape: ShapeType, params: { radius: number; radiusX: number; radiusY: number }): string {
  switch (shape) {
    case 'circle':
      return `circle(${params.radius}% at 50% 50%)`
    case 'ellipse':
      return `ellipse(${params.radiusX}% ${params.radiusY}% at 50% 50%)`
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)'
    case 'polygon':
      return 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)'
    case 'pentagon': {
      const pts = Array.from({ length: 5 }, (_, i) => {
        const angle = (i * 72 - 90) * (Math.PI / 180)
        const x = 50 + 50 * Math.cos(angle)
        const y = 50 + 50 * Math.sin(angle)
        return `${x.toFixed(1)}% ${y.toFixed(1)}%`
      })
      return `polygon(${pts.join(', ')})`
    }
    case 'hexagon': {
      const pts = Array.from({ length: 6 }, (_, i) => {
        const angle = (i * 60 - 90) * (Math.PI / 180)
        const x = 50 + 50 * Math.cos(angle)
        const y = 50 + 50 * Math.sin(angle)
        return `${x.toFixed(1)}% ${y.toFixed(1)}%`
      })
      return `polygon(${pts.join(', ')})`
    }
    case 'star': {
      const pts: string[] = []
      for (let i = 0; i < 10; i++) {
        const angle = (i * 36 - 90) * (Math.PI / 180)
        const r = i % 2 === 0 ? 50 : 20
        const x = 50 + r * Math.cos(angle)
        const y = 50 + r * Math.sin(angle)
        pts.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`)
      }
      return `polygon(${pts.join(', ')})`
    }
    default:
      return 'circle(50% at 50% 50%)'
  }
}

export default function CssClipPathGenerator({ labels }: CssClipPathGeneratorProps) {
  const l = {
    shape: labels?.shape ?? 'Shape',
    circle: labels?.circle ?? 'Circle',
    ellipse: labels?.ellipse ?? 'Ellipse',
    triangle: labels?.triangle ?? 'Triangle',
    polygon: labels?.polygon ?? 'Polygon',
    pentagon: labels?.pentagon ?? 'Pentagon',
    hexagon: labels?.hexagon ?? 'Hexagon',
    star: labels?.star ?? 'Star',
    radius: labels?.radius ?? 'Radius',
    radiusX: labels?.radiusX ?? 'Radius X',
    radiusY: labels?.radiusY ?? 'Radius Y',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [shape, setShape] = useState<ShapeType>('circle')
  const [radius, setRadius] = useState(50)
  const [radiusX, setRadiusX] = useState(50)
  const [radiusY, setRadiusY] = useState(40)

  const clipPath = getClipPath(shape, { radius, radiusX, radiusY })
  const cssCode = `clip-path: ${clipPath};`

  const shapes: { key: ShapeType; label: string }[] = [
    { key: 'circle', label: l.circle },
    { key: 'ellipse', label: l.ellipse },
    { key: 'triangle', label: l.triangle },
    { key: 'polygon', label: l.polygon },
    { key: 'pentagon', label: l.pentagon },
    { key: 'hexagon', label: l.hexagon },
    { key: 'star', label: l.star },
  ]

  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    cursor: 'pointer',
    fontSize: '0.8125rem',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Shape selector */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.shape}</span>
        <div className="flex flex-wrap gap-2">
          {shapes.map((s) => (
            <button
              key={s.key}
              onClick={() => setShape(s.key)}
              style={{
                ...btnStyle,
                backgroundColor: shape === s.key ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                color: shape === s.key ? '#fff' : 'var(--color-text)',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Parameters */}
      {shape === 'circle' && (
        <div className="flex flex-col gap-1">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            <span>{l.radius}</span>
            <span>{radius}%</span>
          </div>
          <input type="range" min={5} max={50} value={radius} onChange={(e) => setRadius(Number(e.target.value))} className="w-full" />
        </div>
      )}
      {shape === 'ellipse' && (
        <>
          <div className="flex flex-col gap-1">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              <span>{l.radiusX}</span>
              <span>{radiusX}%</span>
            </div>
            <input type="range" min={5} max={50} value={radiusX} onChange={(e) => setRadiusX(Number(e.target.value))} className="w-full" />
          </div>
          <div className="flex flex-col gap-1">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              <span>{l.radiusY}</span>
              <span>{radiusY}%</span>
            </div>
            <input type="range" min={5} max={50} value={radiusY} onChange={(e) => setRadiusY(Number(e.target.value))} className="w-full" />
          </div>
        </>
      )}

      {/* Preview */}
      <div className="flex flex-col gap-2">
        <span style={labelStyle}>{l.preview}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div
            style={{
              width: '250px',
              height: '250px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              clipPath: clipPath,
              transition: 'clip-path 0.3s ease',
            }}
          />
        </div>
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
