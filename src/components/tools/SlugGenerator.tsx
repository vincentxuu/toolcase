'use client'
import { useState, useMemo } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface SlugGeneratorProps {
  labels?: {
    inputPlaceholder: string
    separator: string
    lowercase: string
    trim: string
    maxLength: string
    noLimit: string
    result: string
    copy: string
    copied: string
  }
}

function generateSlug(text: string, separator: string, toLowercase: boolean, trimSlug: boolean, maxLength: number): string {
  let slug = text

  // Normalize unicode characters
  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  // Convert to lowercase if option is enabled
  if (toLowercase) {
    slug = slug.toLowerCase()
  }

  // Replace non-alphanumeric characters with separator
  slug = slug.replace(/[^a-zA-Z0-9]+/g, separator)

  // Trim separator from start and end
  if (trimSlug) {
    const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    slug = slug.replace(new RegExp(`^${escapedSep}+|${escapedSep}+$`, 'g'), '')
  }

  // Remove consecutive separators
  const escapedSep = separator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  slug = slug.replace(new RegExp(`${escapedSep}{2,}`, 'g'), separator)

  // Apply max length
  if (maxLength > 0 && slug.length > maxLength) {
    slug = slug.substring(0, maxLength)
    // Remove trailing separator after truncation
    if (trimSlug) {
      slug = slug.replace(new RegExp(`${escapedSep}+$`, 'g'), '')
    }
  }

  return slug
}

export default function SlugGenerator({ labels }: SlugGeneratorProps) {
  const l = {
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter text to generate a slug...',
    separator: labels?.separator ?? 'Separator',
    lowercase: labels?.lowercase ?? 'Lowercase',
    trim: labels?.trim ?? 'Trim separators',
    maxLength: labels?.maxLength ?? 'Max length',
    noLimit: labels?.noLimit ?? 'No limit',
    result: labels?.result ?? 'Result',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [separator, setSeparator] = useState('-')
  const [toLowercase, setToLowercase] = useState(true)
  const [trimSlug, setTrimSlug] = useState(true)
  const [maxLength, setMaxLength] = useState(0)

  const slug = useMemo(() => {
    if (!input) return ''
    return generateSlug(input, separator, toLowercase, trimSlug, maxLength)
  }, [input, separator, toLowercase, trimSlug, maxLength])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }

  const optionStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.875rem',
    border: active ? 'none' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input */}
      <textarea
        className="tool-textarea"
        style={{ height: '100px' }}
        placeholder={l.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {/* Options */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={labelStyle}>{l.separator}</span>
          <div style={{ display: 'flex', gap: '0.375rem' }}>
            <button style={optionStyle(separator === '-')} onClick={() => setSeparator('-')}>
              - (hyphen)
            </button>
            <button style={optionStyle(separator === '_')} onClick={() => setSeparator('_')}>
              _ (underscore)
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button style={optionStyle(toLowercase)} onClick={() => setToLowercase(!toLowercase)}>
            {l.lowercase}
          </button>
          <button style={optionStyle(trimSlug)} onClick={() => setTrimSlug(!trimSlug)}>
            {l.trim}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={labelStyle}>{l.maxLength}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="number"
              min={0}
              max={200}
              value={maxLength}
              onChange={(e) => setMaxLength(Math.max(0, parseInt(e.target.value) || 0))}
              style={{
                width: '5rem',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {maxLength === 0 ? l.noLimit : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Result */}
      {slug && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          <span style={labelStyle}>{l.result}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              flex: 1,
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '1rem',
              wordBreak: 'break-all',
              color: 'var(--color-text)',
              lineHeight: 1.6,
            }}>
              {slug}
            </div>
            <CopyButton text={slug} label={l.copy} copiedLabel={l.copied} />
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
            {slug.length} characters
          </span>
        </div>
      )}
    </div>
  )
}
