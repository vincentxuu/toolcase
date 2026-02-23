'use client'
import { useState, useMemo } from 'react'

interface ColorBlindnessSimulatorProps {
  labels?: {
    inputColor: string
    originalColor: string
    simulatedColors: string
    protanopia: string
    deuteranopia: string
    tritanopia: string
    protanomaly: string
    deuteranomaly: string
    tritanomaly: string
    achromatopsia: string
    hexValue: string
  }
}

function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.replace('#', '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (!m) return null
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

function applyMatrix(rgb: [number, number, number], matrix: number[][]): [number, number, number] {
  const [r, g, b] = rgb.map(v => v / 255)
  // Linearize sRGB
  const lin = [r, g, b].map(v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))
  const out = [
    matrix[0][0] * lin[0] + matrix[0][1] * lin[1] + matrix[0][2] * lin[2],
    matrix[1][0] * lin[0] + matrix[1][1] * lin[1] + matrix[1][2] * lin[2],
    matrix[2][0] * lin[0] + matrix[2][1] * lin[1] + matrix[2][2] * lin[2],
  ]
  // De-linearize
  const srgb = out.map(v => {
    v = Math.max(0, Math.min(1, v))
    return v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055
  })
  return [Math.round(srgb[0] * 255), Math.round(srgb[1] * 255), Math.round(srgb[2] * 255)]
}

// Color vision deficiency simulation matrices (Brettel/Vienot)
const matrices: Record<string, number[][]> = {
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.011820, 0.042940, 0.968881],
  ],
  tritanopia: [
    [1.255528, -0.076749, -0.178779],
    [-0.078411, 0.930809, 0.147602],
    [0.004733, 0.691367, 0.303900],
  ],
  protanomaly: [
    [0.458064, 0.679578, -0.137642],
    [0.092785, 0.846313, 0.060902],
    [-0.007494, -0.016807, 1.024301],
  ],
  deuteranomaly: [
    [0.547494, 0.607765, -0.155259],
    [0.181692, 0.781742, 0.036566],
    [-0.010410, 0.027275, 0.983136],
  ],
  tritanomaly: [
    [1.017277, 0.027029, -0.044306],
    [-0.006113, 0.958479, 0.047634],
    [0.006379, 0.248708, 0.744913],
  ],
  achromatopsia: [
    [0.2126, 0.7152, 0.0722],
    [0.2126, 0.7152, 0.0722],
    [0.2126, 0.7152, 0.0722],
  ],
}

export default function ColorBlindnessSimulator({ labels }: ColorBlindnessSimulatorProps) {
  const l = {
    inputColor: labels?.inputColor ?? 'Input Color',
    originalColor: labels?.originalColor ?? 'Original Color',
    simulatedColors: labels?.simulatedColors ?? 'Simulated Colors',
    protanopia: labels?.protanopia ?? 'Protanopia (Red-blind)',
    deuteranopia: labels?.deuteranopia ?? 'Deuteranopia (Green-blind)',
    tritanopia: labels?.tritanopia ?? 'Tritanopia (Blue-blind)',
    protanomaly: labels?.protanomaly ?? 'Protanomaly (Red-weak)',
    deuteranomaly: labels?.deuteranomaly ?? 'Deuteranomaly (Green-weak)',
    tritanomaly: labels?.tritanomaly ?? 'Tritanomaly (Blue-weak)',
    achromatopsia: labels?.achromatopsia ?? 'Achromatopsia (Total)',
    hexValue: labels?.hexValue ?? 'HEX',
  }

  const [hex, setHex] = useState('#3b82f6')

  const simulations = useMemo(() => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    const types: { key: string; label: string }[] = [
      { key: 'protanopia', label: l.protanopia },
      { key: 'deuteranopia', label: l.deuteranopia },
      { key: 'tritanopia', label: l.tritanopia },
      { key: 'protanomaly', label: l.protanomaly },
      { key: 'deuteranomaly', label: l.deuteranomaly },
      { key: 'tritanomaly', label: l.tritanomaly },
      { key: 'achromatopsia', label: l.achromatopsia },
    ]
    return types.map(t => {
      const simRgb = applyMatrix(rgb, matrices[t.key])
      return { ...t, hex: rgbToHex(simRgb[0], simRgb[1], simRgb[2]) }
    })
  }, [hex, l.protanopia, l.deuteranopia, l.tritanopia, l.protanomaly, l.deuteranomaly, l.tritanomaly, l.achromatopsia])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

  const swatchStyle: React.CSSProperties = {
    width: '100%',
    height: '80px',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.inputColor}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <input
            type="color"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            style={{
              width: '48px',
              height: '48px',
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
              const val = e.target.value
              setHex(val)
            }}
            style={{
              padding: '0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontSize: '1rem',
              fontFamily: 'monospace',
              width: '140px',
            }}
            placeholder="#000000"
          />
        </div>
      </div>

      {/* Original */}
      <div className="flex flex-col gap-2">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.originalColor}</span>
        <div style={{ ...swatchStyle, height: '100px', backgroundColor: hex }} />
        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {l.hexValue}: {hex.toUpperCase()}
        </span>
      </div>

      {/* Simulated Colors */}
      <div className="flex flex-col gap-3">
        <span style={{ ...labelStyle, fontWeight: 600, fontSize: '0.875rem' }}>{l.simulatedColors}</span>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
          {simulations?.map(sim => (
            <div
              key={sim.key}
              style={{
                padding: '0.75rem',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text)' }}>
                {sim.label}
              </span>
              <div style={{ ...swatchStyle, backgroundColor: sim.hex }} />
              <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                {l.hexValue}: {sim.hex.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
