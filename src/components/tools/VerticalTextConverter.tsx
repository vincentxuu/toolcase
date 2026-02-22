'use client'
import { useState } from 'react'

interface VerticalTextConverterProps {
  labels?: {
    title: string
    input: string
    inputPlaceholder: string
    orientation: string
    rightToLeft: string
    leftToRight: string
    preview: string
  }
}

export default function VerticalTextConverter({ labels }: VerticalTextConverterProps) {
  const l = {
    title: labels?.title ?? 'Vertical Text Converter',
    input: labels?.input ?? 'Input Text',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter text to display vertically...',
    orientation: labels?.orientation ?? 'Orientation',
    rightToLeft: labels?.rightToLeft ?? 'Right to Left',
    leftToRight: labels?.leftToRight ?? 'Left to Right',
    preview: labels?.preview ?? 'Preview',
  }

  const [text, setText] = useState('')
  const [orientation, setOrientation] = useState<'rl' | 'lr'>('rl')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
          {l.input}
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={l.inputPlaceholder}
          style={{
            width: '100%',
            minHeight: '150px',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Orientation options */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          {l.orientation}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
          <button
            onClick={() => setOrientation('rl')}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: orientation === 'rl' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: orientation === 'rl' ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {l.rightToLeft}
          </button>
          <button
            onClick={() => setOrientation('lr')}
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              border: orientation === 'lr' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
              backgroundColor: orientation === 'lr' ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
              color: 'var(--color-text)',
              fontWeight: 500,
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {l.leftToRight}
          </button>
        </div>
      </div>

      {/* Preview */}
      {text && (
        <div>
          <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            {l.preview}
          </label>
          <div
            style={{
              padding: '2rem',
              borderRadius: '0.75rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              minHeight: '300px',
              display: 'flex',
              justifyContent: orientation === 'rl' ? 'flex-end' : 'flex-start',
              overflow: 'auto',
            }}
          >
            <div
              style={{
                writingMode: 'vertical-rl',
                textOrientation: 'upright',
                fontSize: '1.25rem',
                lineHeight: 2,
                direction: orientation === 'rl' ? 'rtl' : 'ltr',
                whiteSpace: 'pre-wrap',
              }}
            >
              {text}
            </div>
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.813rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--color-text)' }}>Vertical Writing:</strong> This tool displays text in vertical format, commonly used in traditional Chinese, Japanese, and Korean typography.
        Right-to-left is the traditional orientation for Chinese and Japanese text.
      </div>
    </div>
  )
}
