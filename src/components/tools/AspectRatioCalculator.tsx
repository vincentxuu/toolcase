'use client'
import { useState, useMemo, useCallback } from 'react'

interface AspectRatioCalculatorProps {
  labels?: {
    width: string
    height: string
    ratio: string
    lockRatio: string
    presets: string
    calculate: string
    simplifiedRatio: string
  }
}

const presetRatios = [
  { label: '16:9', w: 16, h: 9 },
  { label: '4:3', w: 4, h: 3 },
  { label: '1:1', w: 1, h: 1 },
  { label: '21:9', w: 21, h: 9 },
  { label: '9:16', w: 9, h: 16 },
  { label: '3:2', w: 3, h: 2 },
  { label: '5:4', w: 5, h: 4 },
]

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a))
  b = Math.abs(Math.round(b))
  while (b) {
    const t = b
    b = a % b
    a = t
  }
  return a
}

export default function AspectRatioCalculator({ labels }: AspectRatioCalculatorProps) {
  const l = {
    width: labels?.width ?? 'Width',
    height: labels?.height ?? 'Height',
    ratio: labels?.ratio ?? 'Aspect Ratio',
    lockRatio: labels?.lockRatio ?? 'Lock Ratio',
    presets: labels?.presets ?? 'Preset Ratios',
    calculate: labels?.calculate ?? 'Calculate',
    simplifiedRatio: labels?.simplifiedRatio ?? 'Simplified Ratio',
  }

  const [width, setWidth] = useState(1920)
  const [height, setHeight] = useState(1080)
  const [locked, setLocked] = useState(false)
  const [lockedRatio, setLockedRatio] = useState<{ w: number; h: number } | null>(null)

  const simplified = useMemo(() => {
    if (width <= 0 || height <= 0) return { w: 0, h: 0 }
    const d = gcd(width, height)
    return { w: width / d, h: height / d }
  }, [width, height])

  const handleLockToggle = useCallback(() => {
    if (!locked && width > 0 && height > 0) {
      const d = gcd(width, height)
      setLockedRatio({ w: width / d, h: height / d })
    }
    setLocked(!locked)
  }, [locked, width, height])

  const handleWidthChange = useCallback((val: number) => {
    setWidth(val)
    if (locked && lockedRatio && lockedRatio.w > 0) {
      setHeight(Math.round((val * lockedRatio.h) / lockedRatio.w))
    }
  }, [locked, lockedRatio])

  const handleHeightChange = useCallback((val: number) => {
    setHeight(val)
    if (locked && lockedRatio && lockedRatio.h > 0) {
      setWidth(Math.round((val * lockedRatio.w) / lockedRatio.h))
    }
  }, [locked, lockedRatio])

  const handlePreset = useCallback((w: number, h: number) => {
    const d = gcd(w, h)
    setLockedRatio({ w: w / d, h: h / d })
    setLocked(true)
    const newHeight = Math.round((width * h) / w)
    setHeight(newHeight)
  }, [width])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '0.875rem',
  }
  const activeBtnStyle: React.CSSProperties = {
    ...btnStyle, backgroundColor: 'var(--color-primary)', color: '#fff', border: '1px solid var(--color-primary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.width} (px)</label>
          <input type="number" style={inputStyle} value={width} onChange={(e) => handleWidthChange(Number(e.target.value))} min={1} />
        </div>
        <div>
          <label style={labelStyle}>{l.height} (px)</label>
          <input type="number" style={inputStyle} value={height} onChange={(e) => handleHeightChange(Number(e.target.value))} min={1} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={handleLockToggle}
          style={locked ? activeBtnStyle : btnStyle}
        >
          {locked ? '🔒' : '🔓'} {l.lockRatio}
        </button>
        {locked && lockedRatio && (
          <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            ({lockedRatio.w}:{lockedRatio.h})
          </span>
        )}
      </div>

      <div style={{ padding: '2rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.simplifiedRatio}</div>
        <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          {width > 0 && height > 0 ? `${simplified.w}:${simplified.h}` : '—'}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
          {width} × {height} px
        </div>
      </div>

      {/* Visual ratio preview */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            width: width >= height ? '200px' : `${(width / height) * 200}px`,
            height: height >= width ? '200px' : `${(height / width) * 200}px`,
            maxWidth: '200px', maxHeight: '200px',
            border: '2px solid var(--color-primary)',
            borderRadius: '0.5rem',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
            fontSize: '0.8rem', color: 'var(--color-text-secondary)',
          }}
        >
          {simplified.w}:{simplified.h}
        </div>
      </div>

      <div>
        <label style={labelStyle}>{l.presets}</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {presetRatios.map((p) => (
            <button
              key={p.label}
              onClick={() => handlePreset(p.w, p.h)}
              style={locked && lockedRatio?.w === p.w && lockedRatio?.h === p.h ? activeBtnStyle : btnStyle}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Common resolutions table */}
      <div style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Resolution</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: 'var(--color-text-secondary)' }}>{l.ratio}</th>
              <th style={{ padding: '0.5rem', textAlign: 'left', color: 'var(--color-text-secondary)' }}>Name</th>
            </tr>
          </thead>
          <tbody>
            {[
              { res: '1920×1080', ratio: '16:9', name: 'Full HD' },
              { res: '2560×1440', ratio: '16:9', name: 'QHD' },
              { res: '3840×2160', ratio: '16:9', name: '4K UHD' },
              { res: '1280×720', ratio: '16:9', name: 'HD' },
              { res: '1024×768', ratio: '4:3', name: 'XGA' },
              { res: '2560×1080', ratio: '21:9', name: 'UltraWide' },
              { res: '1080×1920', ratio: '9:16', name: 'Mobile' },
            ].map((r) => (
              <tr key={r.res} style={{ borderBottom: '1px solid var(--color-border)' }}>
                <td style={{ padding: '0.5rem' }}>{r.res}</td>
                <td style={{ padding: '0.5rem', color: 'var(--color-primary)', fontWeight: 600 }}>{r.ratio}</td>
                <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{r.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
