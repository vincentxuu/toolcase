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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleFormat}>{l.format}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleMinify}>{l.minify}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>{l.clear}</button>
        <div className="flex items-center gap-2">
          <label className="text-sm text-[var(--color-text-secondary)]">{l.tabSize}:</label>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '400px' }}
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '400px' }}
            placeholder={l.output}
            value={output}
            readOnly
          />
          {output && (
            <div className="absolute top-2 right-2">
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
