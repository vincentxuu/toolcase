'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface ColorPaletteGeneratorProps {
  labels?: {
    baseColor: string
    complementary: string
    analogous: string
    triadic: string
    splitComplementary: string
    monochromatic: string
    copy: string
    copied: string
    clickToCopy: string
  }
}

function hex2hsl(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  let r = parseInt(m[1], 16) / 255
  let g = parseInt(m[2], 16) / 255
  let b = parseInt(m[3], 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l * 100]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h = 0
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h * 360, s * 100, l * 100]
}

function hsl2hex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  let r: number, g: number, b: number
  if (s === 0) {
    r = g = b = l
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue2rgb(p, q, h / 360 + 1 / 3)
    g = hue2rgb(p, q, h / 360)
    b = hue2rgb(p, q, h / 360 - 1 / 3)
  }
  return '#' + [r, g, b].map(v => Math.round(Math.max(0, Math.min(1, v)) * 255).toString(16).padStart(2, '0')).join('')
}

function generatePalettes(h: number, s: number, l: number) {
  return {
    complementary: [
      hsl2hex(h, s, l),
      hsl2hex(h + 180, s, l),
      hsl2hex(h + 180, s * 0.8, l * 1.1),
      hsl2hex(h, s * 0.8, l * 0.9),
      hsl2hex(h + 180, s * 0.6, l * 1.2),
    ],
    analogous: [
      hsl2hex(h - 30, s, l),
      hsl2hex(h - 15, s, l),
      hsl2hex(h, s, l),
      hsl2hex(h + 15, s, l),
      hsl2hex(h + 30, s, l),
    ],
    triadic: [
      hsl2hex(h, s, l),
      hsl2hex(h + 120, s, l),
      hsl2hex(h + 240, s, l),
      hsl2hex(h + 120, s * 0.7, l * 1.1),
      hsl2hex(h + 240, s * 0.7, l * 1.1),
    ],
    splitComplementary: [
      hsl2hex(h, s, l),
      hsl2hex(h + 150, s, l),
      hsl2hex(h + 210, s, l),
      hsl2hex(h + 150, s * 0.8, l * 1.1),
      hsl2hex(h + 210, s * 0.8, l * 1.1),
    ],
    monochromatic: [
      hsl2hex(h, s, Math.max(10, l - 30)),
      hsl2hex(h, s, Math.max(10, l - 15)),
      hsl2hex(h, s, l),
      hsl2hex(h, s, Math.min(90, l + 15)),
      hsl2hex(h, s, Math.min(90, l + 30)),
    ],
  }
}

export default function ColorPaletteGenerator({ labels }: ColorPaletteGeneratorProps) {
  const l = {
    baseColor: labels?.baseColor ?? 'Base Color',
    complementary: labels?.complementary ?? 'Complementary',
    analogous: labels?.analogous ?? 'Analogous',
    triadic: labels?.triadic ?? 'Triadic',
    splitComplementary: labels?.splitComplementary ?? 'Split-Complementary',
    monochromatic: labels?.monochromatic ?? 'Monochromatic',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    clickToCopy: labels?.clickToCopy ?? 'Click a color to copy its hex code',
  }

  const [hex, setHex] = useState('#3b82f6')
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const hsl = hex2hsl(hex)
  const palettes = hsl ? generatePalettes(hsl[0], hsl[1], hsl[2]) : null

  const copyColor = useCallback(async (color: string) => {
    try {
      await navigator.clipboard.writeText(color.toUpperCase())
    } catch {
      const ta = document.createElement('textarea')
      ta.value = color.toUpperCase()
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopiedColor(color)
    setTimeout(() => setCopiedColor(null), 1500)
  }, [])

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '0.5rem',
  }

  const renderPalette = (name: string, colors: string[]) => (
    <div key={name} style={{ marginBottom: '1.5rem' }}>
      <div style={labelStyle}>{name}</div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {colors.map((color, i) => (
          <button
            key={i}
            onClick={() => copyColor(color)}
            title={color.toUpperCase()}
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '0.5rem',
              backgroundColor: color,
              border: copiedColor === color ? '3px solid var(--color-text)' : '1px solid var(--color-border)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '0.25rem',
              position: 'relative',
            }}
          >
            <span
              style={{
                fontSize: '0.625rem',
                fontFamily: 'monospace',
                backgroundColor: 'rgba(0,0,0,0.5)',
                color: '#fff',
                padding: '1px 4px',
                borderRadius: '3px',
              }}
            >
              {copiedColor === color ? l.copied : color.toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <span style={labelStyle}>{l.baseColor}</span>
        <input
          type="color"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          style={{
            width: '44px',
            height: '44px',
            border: '1px solid var(--color-border)',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            padding: 0,
            backgroundColor: 'transparent',
          }}
        />
        <input
          type="text"
          value={hex.toUpperCase()}
          onChange={(e) => {
            const v = e.target.value
            setHex(v)
          }}
          style={{ ...inputStyle, width: '120px' }}
          placeholder="#000000"
        />
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.clickToCopy}</p>

      {palettes && (
        <>
          {renderPalette(l.complementary, palettes.complementary)}
          {renderPalette(l.analogous, palettes.analogous)}
          {renderPalette(l.triadic, palettes.triadic)}
          {renderPalette(l.splitComplementary, palettes.splitComplementary)}
          {renderPalette(l.monochromatic, palettes.monochromatic)}
        </>
      )}
    </div>
  )
}
