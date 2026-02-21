'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface JsonFormatterProps {
  labels?: {
    format: string
    minify: string
    copy: string
    clear: string
    copied: string
    input: string
    output: string
    valid: string
    invalid: string
    tabSize: string
  }
}

export default function JsonFormatter({ labels }: JsonFormatterProps) {
  const l = {
    format: labels?.format ?? 'Format',
    minify: labels?.minify ?? 'Minify',
    copy: labels?.copy ?? 'Copy',
    clear: labels?.clear ?? 'Clear',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste your JSON here...',
    output: labels?.output ?? 'Formatted output will appear here...',
    valid: labels?.valid ?? 'Valid JSON',
    invalid: labels?.invalid ?? 'Invalid JSON',
    tabSize: labels?.tabSize ?? 'Tab size',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [tabSize, setTabSize] = useState(2)

  const handleFormat = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, tabSize))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input, tabSize])

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleFormat}>{l.format}</button>
        <button className="btn-secondary" onClick={handleMinify}>{l.minify}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.tabSize}:</label>
          <select
            value={tabSize}
            onChange={(e) => setTabSize(Number(e.target.value))}
            style={{
              padding: '0.375rem 0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '400px' }}
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            className="tool-textarea"
            style={{ height: '400px' }}
            placeholder={l.output}
            value={output}
            readOnly
          />
          {output && (
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
        >
          {l.invalid}: {error}
        </div>
      )}

      {output && !error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-success)',
            fontSize: '0.875rem',
          }}
        >
          {l.valid}
        </div>
      )}
    </div>
  )
}
