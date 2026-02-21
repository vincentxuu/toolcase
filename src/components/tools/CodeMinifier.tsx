'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CodeMinifierProps {
  labels?: {
    minify: string
    clear: string
    copy: string
    copied: string
    input: string
    output: string
    html: string
    css: string
    javascript: string
    originalSize: string
    minifiedSize: string
    saved: string
  }
}

function minifyHTML(code: string): string {
  let result = code
  // Remove HTML comments
  result = result.replace(/<!--[\s\S]*?-->/g, '')
  // Remove whitespace between tags
  result = result.replace(/>\s+</g, '><')
  // Remove leading/trailing whitespace on lines
  result = result.replace(/^\s+/gm, '')
  // Collapse multiple whitespace into single space
  result = result.replace(/\s{2,}/g, ' ')
  return result.trim()
}

function minifyCSS(code: string): string {
  let result = code
  // Remove CSS comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove newlines and extra whitespace
  result = result.replace(/\s*\n\s*/g, '')
  result = result.replace(/\s{2,}/g, ' ')
  // Remove spaces around special characters
  result = result.replace(/\s*{\s*/g, '{')
  result = result.replace(/\s*}\s*/g, '}')
  result = result.replace(/\s*:\s*/g, ':')
  result = result.replace(/\s*;\s*/g, ';')
  result = result.replace(/\s*,\s*/g, ',')
  // Remove last semicolons before closing brace
  result = result.replace(/;}/g, '}')
  return result.trim()
}

function minifyJS(code: string): string {
  let result = code
  // Remove single-line comments (but not URLs like http://)
  result = result.replace(/(^|[^:])\/\/.*$/gm, '$1')
  // Remove multi-line comments
  result = result.replace(/\/\*[\s\S]*?\*\//g, '')
  // Remove leading whitespace on each line
  result = result.replace(/^\s+/gm, '')
  // Collapse multiple newlines
  result = result.replace(/\n{2,}/g, '\n')
  // Remove newlines where safe (after ; { } ,)
  result = result.replace(/;\s*\n/g, ';')
  result = result.replace(/{\s*\n/g, '{')
  result = result.replace(/}\s*\n/g, '}')
  result = result.replace(/,\s*\n/g, ',')
  // Collapse remaining whitespace
  result = result.replace(/\s{2,}/g, ' ')
  return result.trim()
}

type Tab = 'html' | 'css' | 'javascript'

export default function CodeMinifier({ labels }: CodeMinifierProps) {
  const l = {
    minify: labels?.minify ?? 'Minify',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste your code here...',
    output: labels?.output ?? 'Minified output will appear here...',
    html: labels?.html ?? 'HTML',
    css: labels?.css ?? 'CSS',
    javascript: labels?.javascript ?? 'JavaScript',
    originalSize: labels?.originalSize ?? 'Original',
    minifiedSize: labels?.minifiedSize ?? 'Minified',
    saved: labels?.saved ?? 'Saved',
  }

  const [tab, setTab] = useState<Tab>('html')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [stats, setStats] = useState<{ original: number; minified: number } | null>(null)

  const handleMinify = useCallback(() => {
    if (!input.trim()) return
    let result = ''
    switch (tab) {
      case 'html':
        result = minifyHTML(input)
        break
      case 'css':
        result = minifyCSS(input)
        break
      case 'javascript':
        result = minifyJS(input)
        break
    }
    setOutput(result)
    setStats({
      original: new TextEncoder().encode(input).length,
      minified: new TextEncoder().encode(result).length,
    })
  }, [input, tab])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setStats(null)
  }, [])

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: '1px solid var(--color-border)',
    borderBottom: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
    borderRadius: '0.375rem 0.375rem 0 0',
    backgroundColor: active ? 'var(--color-bg)' : 'var(--color-bg-secondary)',
    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    cursor: 'pointer',
    fontWeight: active ? 600 : 400,
    fontSize: '0.875rem',
  })

  const tabs: { key: Tab; label: string }[] = [
    { key: 'html', label: l.html },
    { key: 'css', label: l.css },
    { key: 'javascript', label: l.javascript },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {tabs.map((t) => (
          <button
            key={t.key}
            style={tabStyle(tab === t.key)}
            onClick={() => { setTab(t.key); setOutput(''); setStats(null) }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleMinify}>{l.minify}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '400px', fontFamily: 'monospace' }}
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            className="tool-textarea"
            style={{ height: '400px', fontFamily: 'monospace' }}
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

      {stats && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-success)',
            fontSize: '0.875rem',
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          <span>{l.originalSize}: {stats.original} bytes</span>
          <span>{l.minifiedSize}: {stats.minified} bytes</span>
          <span>{l.saved}: {stats.original > 0 ? ((1 - stats.minified / stats.original) * 100).toFixed(1) : 0}%</span>
        </div>
      )}
    </div>
  )
}
