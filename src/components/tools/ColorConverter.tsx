'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface ColorConverterProps {
  labels?: {
    hex: string
    rgb: string
    hsl: string
    preview: string
    copy: string
    copied: string
  }
}

function hex2rgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function rgb2hsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, Math.round(l * 100)]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)]
}

function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  h /= 360; s /= 100; l /= 100
  if (s === 0) {
    const v = Math.round(l * 255)
    return [v, v, v]
  }
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return [
    Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
    Math.round(hue2rgb(p, q, h) * 255),
    Math.round(hue2rgb(p, q, h - 1 / 3) * 255),
  ]
}

function rgb2hex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('')
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

export default function ColorConverter({ labels }: ColorConverterProps) {
  const l = {
    hex: labels?.hex ?? 'HEX',
    rgb: labels?.rgb ?? 'RGB',
    hsl: labels?.hsl ?? 'HSL',
    preview: labels?.preview ?? 'Preview',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [hex, setHex] = useState('#3b82f6')
  const [r, setR] = useState(59)
  const [g, setG] = useState(130)
  const [b, setB] = useState(246)
  const [h, setH] = useState(217)
  const [s, setS] = useState(91)
  const [li, setLi] = useState(60)

  const updateFromHex = useCallback((hexVal: string) => {
    setHex(hexVal)
    const rgb = hex2rgb(hexVal)
    if (rgb) {
      setR(rgb[0]); setG(rgb[1]); setB(rgb[2])
      const hsl = rgb2hsl(rgb[0], rgb[1], rgb[2])
      setH(hsl[0]); setS(hsl[1]); setLi(hsl[2])
    }
  }, [])

  const updateFromRgb = useCallback((rr: number, gg: number, bb: number) => {
    rr = clamp(rr, 0, 255); gg = clamp(gg, 0, 255); bb = clamp(bb, 0, 255)
    setR(rr); setG(gg); setB(bb)
    setHex(rgb2hex(rr, gg, bb))
    const hsl = rgb2hsl(rr, gg, bb)
    setH(hsl[0]); setS(hsl[1]); setLi(hsl[2])
  }, [])

  const updateFromHsl = useCallback((hh: number, ss: number, ll: number) => {
    hh = clamp(hh, 0, 360); ss = clamp(ss, 0, 100); ll = clamp(ll, 0, 100)
    setH(hh); setS(ss); setLi(ll)
    const rgb = hsl2rgb(hh, ss, ll)
    setR(rgb[0]); setG(rgb[1]); setB(rgb[2])
    setHex(rgb2hex(rgb[0], rgb[1], rgb[2]))
  }, [])

  const hexStr = hex.toUpperCase()
  const rgbStr = `rgb(${r}, ${g}, ${b})`
  const hslStr = `hsl(${h}, ${s}%, ${li}%)`

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

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Color preview swatch */}
      <div className="flex flex-col gap-2">
        <span style={labelStyle}>{l.preview}</span>
        <div
          style={{
            width: '100%',
            height: '120px',
            borderRadius: '0.75rem',
            backgroundColor: hexStr,
            border: '1px solid var(--color-border)',
          }}
        />
      </div>

      {/* HEX */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.hex}</span>
        <div style={rowStyle}>
          <input
            type="color"
            value={hex}
            onChange={(e) => updateFromHex(e.target.value)}
            style={{
              width: '40px',
              height: '40px',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              padding: 0,
              backgroundColor: 'transparent',
            }}
          />
          <input
            type="text"
            value={hexStr}
            onChange={(e) => {
              const val = e.target.value
              setHex(val)
              if (/^#[0-9a-f]{6}$/i.test(val)) {
                updateFromHex(val)
              }
            }}
            style={{ ...inputStyle, fontFamily: 'monospace' }}
            placeholder="#000000"
          />
          <CopyButton text={hexStr} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>

      {/* RGB */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.rgb}</span>
        <div style={rowStyle}>
          <div style={{ display: 'flex', gap: '0.375rem', flex: 1 }}>
            <div className="flex-1">
              <span style={labelStyle}>R</span>
              <input
                type="number"
                min={0}
                max={255}
                value={r}
                onChange={(e) => updateFromRgb(Number(e.target.value), g, b)}
                style={inputStyle}
              />
            </div>
            <div className="flex-1">
              <span style={labelStyle}>G</span>
              <input
                type="number"
                min={0}
                max={255}
                value={g}
                onChange={(e) => updateFromRgb(r, Number(e.target.value), b)}
                style={inputStyle}
              />
            </div>
            <div className="flex-1">
              <span style={labelStyle}>B</span>
              <input
                type="number"
                min={0}
                max={255}
                value={b}
                onChange={(e) => updateFromRgb(r, g, Number(e.target.value))}
                style={inputStyle}
              />
            </div>
          </div>
          <CopyButton text={rgbStr} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>

      {/* HSL */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.hsl}</span>
        <div style={rowStyle}>
          <div style={{ display: 'flex', gap: '0.375rem', flex: 1 }}>
            <div className="flex-1">
              <span style={labelStyle}>H</span>
              <input
                type="number"
                min={0}
                max={360}
                value={h}
                onChange={(e) => updateFromHsl(Number(e.target.value), s, li)}
                style={inputStyle}
              />
            </div>
            <div className="flex-1">
              <span style={labelStyle}>S%</span>
              <input
                type="number"
                min={0}
                max={100}
                value={s}
                onChange={(e) => updateFromHsl(h, Number(e.target.value), li)}
                style={inputStyle}
              />
            </div>
            <div className="flex-1">
              <span style={labelStyle}>L%</span>
              <input
                type="number"
                min={0}
                max={100}
                value={li}
                onChange={(e) => updateFromHsl(h, s, Number(e.target.value))}
                style={inputStyle}
              />
            </div>
          </div>
          <CopyButton text={hslStr} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>
    </div>
  )
}
