'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface BorderRadiusGeneratorProps {
  labels?: {
    topLeft: string
    topRight: string
    bottomRight: string
    bottomLeft: string
    linkCorners: string
    preview: string
    cssCode: string
    copy: string
    copied: string
    allCorners: string
  }
}

export default function BorderRadiusGenerator({ labels }: BorderRadiusGeneratorProps) {
  const l = {
    topLeft: labels?.topLeft ?? 'Top Left',
    topRight: labels?.topRight ?? 'Top Right',
    bottomRight: labels?.bottomRight ?? 'Bottom Right',
    bottomLeft: labels?.bottomLeft ?? 'Bottom Left',
    linkCorners: labels?.linkCorners ?? 'Link All Corners',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    allCorners: labels?.allCorners ?? 'All Corners',
  }

  const [tl, setTl] = useState(16)
  const [tr, setTr] = useState(16)
  const [br, setBr] = useState(16)
  const [bl, setBl] = useState(16)
  const [linked, setLinked] = useState(true)

  const updateCorner = useCallback((corner: string, value: number) => {
    if (linked) {
      setTl(value); setTr(value); setBr(value); setBl(value)
    } else {
      switch (corner) {
        case 'tl': setTl(value); break
        case 'tr': setTr(value); break
        case 'br': setBr(value); break
        case 'bl': setBl(value); break
      }
    }
  }, [linked])

  const allSame = tl === tr && tr === br && br === bl
  const cssValue = allSame ? `${tl}px` : `${tl}px ${tr}px ${br}px ${bl}px`
  const cssCode = `border-radius: ${cssValue};`

  const inputStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '80px',
    textAlign: 'center',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
  }

  const cornerControl = (label: string, value: number, key: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'center' }}>
      <span style={labelStyle}>{label}</span>
      <input
        type="number"
        min={0}
        max={200}
        value={value}
        onChange={(e) => updateCorner(key, Math.max(0, Number(e.target.value)))}
        style={inputStyle}
      />
      <input
        type="range"
        min={0}
        max={200}
        value={value}
        onChange={(e) => updateCorner(key, Number(e.target.value))}
        style={{ width: '100px' }}
      />
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Link toggle */}
      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', color: 'var(--color-text)' }}>
        <input
          type="checkbox"
          checked={linked}
          onChange={(e) => setLinked(e.target.checked)}
        />
        {l.linkCorners}
      </label>

      {/* Corner controls */}
      {linked ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', alignItems: 'center' }}>
          <span style={labelStyle}>{l.allCorners}</span>
          <input
            type="number"
            min={0}
            max={200}
            value={tl}
            onChange={(e) => updateCorner('tl', Math.max(0, Number(e.target.value)))}
            style={inputStyle}
          />
          <input
            type="range"
            min={0}
            max={200}
            value={tl}
            onChange={(e) => updateCorner('tl', Number(e.target.value))}
            style={{ width: '200px' }}
          />
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', justifyItems: 'center' }}>
          {cornerControl(l.topLeft, tl, 'tl')}
          {cornerControl(l.topRight, tr, 'tr')}
          {cornerControl(l.bottomLeft, bl, 'bl')}
          {cornerControl(l.bottomRight, br, 'br')}
        </div>
      )}

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={labelStyle}>{l.preview}</span>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: 'var(--color-accent, #3b82f6)',
              borderRadius: cssValue,
              transition: 'border-radius 0.2s',
            }}
          />
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
