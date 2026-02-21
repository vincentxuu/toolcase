'use client'
import { useState } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CssFlexboxPlaygroundProps {
  labels?: {
    flexDirection: string
    justifyContent: string
    alignItems: string
    flexWrap: string
    gap: string
    childCount: string
    preview: string
    cssCode: string
    copy: string
    copied: string
  }
}

const CHILD_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899']

export default function CssFlexboxPlayground({ labels }: CssFlexboxPlaygroundProps) {
  const l = {
    flexDirection: labels?.flexDirection ?? 'flex-direction',
    justifyContent: labels?.justifyContent ?? 'justify-content',
    alignItems: labels?.alignItems ?? 'align-items',
    flexWrap: labels?.flexWrap ?? 'flex-wrap',
    gap: labels?.gap ?? 'gap',
    childCount: labels?.childCount ?? 'Child Count',
    preview: labels?.preview ?? 'Preview',
    cssCode: labels?.cssCode ?? 'CSS Code',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [direction, setDirection] = useState('row')
  const [justify, setJustify] = useState('flex-start')
  const [align, setAlign] = useState('stretch')
  const [wrap, setWrap] = useState('nowrap')
  const [gap, setGap] = useState(8)
  const [childCount, setChildCount] = useState(4)

  const directionOptions = ['row', 'row-reverse', 'column', 'column-reverse']
  const justifyOptions = ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly']
  const alignOptions = ['stretch', 'flex-start', 'flex-end', 'center', 'baseline']
  const wrapOptions = ['nowrap', 'wrap', 'wrap-reverse']

  const cssCode = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
flex-wrap: ${wrap};
gap: ${gap}px;`

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 500,
    marginBottom: '0.25rem',
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.5rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.8125rem',
    width: '100%',
    fontFamily: 'monospace',
  }

  const selectRow = (label: string, value: string, options: string[], onChange: (v: string) => void) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={labelStyle}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={selectStyle}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' }}>
        {selectRow(l.flexDirection, direction, directionOptions, setDirection)}
        {selectRow(l.justifyContent, justify, justifyOptions, setJustify)}
        {selectRow(l.alignItems, align, alignOptions, setAlign)}
        {selectRow(l.flexWrap, wrap, wrapOptions, setWrap)}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={labelStyle}>{l.gap}: {gap}px</span>
          <input
            type="range"
            min={0}
            max={40}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={labelStyle}>{l.childCount}: {childCount}</span>
          <input
            type="range"
            min={1}
            max={6}
            value={childCount}
            onChange={(e) => setChildCount(Number(e.target.value))}
            style={{ width: '100%', marginTop: '0.5rem' }}
          />
        </div>
      </div>

      {/* Preview */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <span style={labelStyle}>{l.preview}</span>
        <div
          style={{
            display: 'flex',
            flexDirection: direction as React.CSSProperties['flexDirection'],
            justifyContent: justify,
            alignItems: align,
            flexWrap: wrap as React.CSSProperties['flexWrap'],
            gap: `${gap}px`,
            minHeight: '250px',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '2px dashed var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
          }}
        >
          {Array.from({ length: childCount }, (_, i) => (
            <div
              key={i}
              style={{
                minWidth: '60px',
                minHeight: '60px',
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: CHILD_COLORS[i % CHILD_COLORS.length],
                color: '#fff',
                fontWeight: 700,
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i + 1}
            </div>
          ))}
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
