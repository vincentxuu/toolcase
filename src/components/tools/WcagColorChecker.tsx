'use client'
import { useState, useCallback, useMemo } from 'react'

interface WcagColorCheckerProps {
  labels?: {
    title: string
    foreground: string
    background: string
    foregroundPlaceholder: string
    backgroundPlaceholder: string
    swap: string
    contrastRatio: string
    wcagAA: string
    wcagAAA: string
    normalText: string
    largeText: string
    pass: string
    fail: string
    level: string
    ratio: string
    preview: string
    sampleText: string
    guidelines: string
    guidelineDesc: string
  }
}

export default function WcagColorChecker({ labels }: WcagColorCheckerProps) {
  const l = {
    title: labels?.title ?? 'WCAG Color Checker',
    foreground: labels?.foreground ?? 'Foreground (Text)',
    background: labels?.background ?? 'Background',
    foregroundPlaceholder: labels?.foregroundPlaceholder ?? '#000000',
    backgroundPlaceholder: labels?.backgroundPlaceholder ?? '#FFFFFF',
    swap: labels?.swap ?? 'Swap Colors',
    contrastRatio: labels?.contrastRatio ?? 'Contrast Ratio',
    wcagAA: labels?.wcagAA ?? 'WCAG AA',
    wcagAAA: labels?.wcagAAA ?? 'WCAG AAA',
    normalText: labels?.normalText ?? 'Normal Text',
    largeText: labels?.largeText ?? 'Large Text',
    pass: labels?.pass ?? 'Pass',
    fail: labels?.fail ?? 'Fail',
    level: labels?.level ?? 'Level',
    ratio: labels?.ratio ?? 'Ratio',
    preview: labels?.preview ?? 'Preview',
    sampleText: labels?.sampleText ?? 'The quick brown fox jumps over the lazy dog',
    guidelines: labels?.guidelines ?? 'Accessibility Guidelines',
    guidelineDesc: labels?.guidelineDesc ?? 'WCAG 2.1 requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (AA level). AAA level requires 7:1 for normal text and 4.5:1 for large text.',
  }

  const [foreground, setForeground] = useState('#000000')
  const [background, setBackground] = useState('#FFFFFF')

  // Convert hex to RGB
  const hexToRgb = useCallback((hex: string): [number, number, number] | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
      : null
  }, [])

  // Calculate relative luminance
  const getLuminance = useCallback((rgb: [number, number, number]): number => {
    const [r, g, b] = rgb.map((val) => {
      const sRGB = val / 255
      return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }, [])

  // Calculate contrast ratio
  const getContrastRatio = useCallback(
    (fg: string, bg: string): number => {
      const fgRgb = hexToRgb(fg)
      const bgRgb = hexToRgb(bg)

      if (!fgRgb || !bgRgb) return 1

      const fgLum = getLuminance(fgRgb)
      const bgLum = getLuminance(bgRgb)

      const lighter = Math.max(fgLum, bgLum)
      const darker = Math.min(fgLum, bgLum)

      return (lighter + 0.05) / (darker + 0.05)
    },
    [hexToRgb, getLuminance]
  )

  const contrastRatio = useMemo(
    () => getContrastRatio(foreground, background),
    [foreground, background, getContrastRatio]
  )

  const handleSwap = useCallback(() => {
    setForeground(background)
    setBackground(foreground)
  }, [foreground, background])

  // Check WCAG compliance
  const wcagResults = useMemo(() => {
    return {
      normalAA: contrastRatio >= 4.5,
      normalAAA: contrastRatio >= 7,
      largeAA: contrastRatio >= 3,
      largeAAA: contrastRatio >= 4.5,
    }
  }, [contrastRatio])

  const ResultBadge = ({ pass }: { pass: boolean }) => (
    <span
      style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '0.375rem',
        fontSize: '0.875rem',
        fontWeight: 600,
        backgroundColor: pass ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
        color: pass ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
      }}
    >
      {pass ? l.pass : l.fail}
    </span>
  )

  return (
    <div className="flex flex-col gap-6">
      {/* Color Inputs */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.foreground}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                style={{
                  width: '60px',
                  height: '40px',
                  padding: '0.125rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                }}
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                placeholder={l.foregroundPlaceholder}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.background}
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                style={{
                  width: '60px',
                  height: '40px',
                  padding: '0.125rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                }}
              />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                placeholder={l.backgroundPlaceholder}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
          </div>

          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] sm:order-2 order-3 sm:w-auto w-full mb-0"
            onClick={handleSwap}
          >
            {l.swap}
          </button>
        </div>
      </div>

      {/* Contrast Ratio Display */}
      <div
        style={{
          padding: '2rem',
          borderRadius: '0.5rem',
          border: '2px solid var(--color-border)',
          textAlign: 'center',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="text-sm text-[var(--color-text-secondary)] mb-2">
          {l.contrastRatio}
        </div>
        <div style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-text)' }}>
          {contrastRatio.toFixed(2)}:1
        </div>
      </div>

      {/* WCAG Compliance Table */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          overflow: 'hidden',
        }}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left', borderBottom: '1px solid var(--color-border)' }}>
                {l.level}
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
                {l.normalText}
              </th>
              <th style={{ padding: '0.75rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)' }}>
                {l.largeText}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', fontWeight: 600 }}>
                {l.wcagAA}
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
                <ResultBadge pass={wcagResults.normalAA} />
              </td>
              <td style={{ padding: '0.75rem', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
                <ResultBadge pass={wcagResults.largeAA} />
              </td>
            </tr>
            <tr>
              <td style={{ padding: '0.75rem', fontWeight: 600 }}>
                {l.wcagAAA}
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <ResultBadge pass={wcagResults.normalAAA} />
              </td>
              <td style={{ padding: '0.75rem', textAlign: 'center' }}>
                <ResultBadge pass={wcagResults.largeAAA} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Preview */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          {l.preview}
        </h3>
        <div
          style={{
            backgroundColor: background,
            color: foreground,
            padding: '2rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
          }}
        >
          <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
            {l.sampleText}
          </p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            {l.sampleText}
          </p>
        </div>
      </div>

      {/* Guidelines */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}
      >
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'rgb(59, 130, 246)' }}>
          {l.guidelines}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {l.guidelineDesc}
        </p>
      </div>
    </div>
  )
}
