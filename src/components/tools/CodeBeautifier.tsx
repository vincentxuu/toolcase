'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CodeBeautifierProps {
  labels?: {
    beautify: string
    clear: string
    copy: string
    copied: string
    input: string
    output: string
    html: string
    css: string
    javascript: string
    indentSize: string
  }
}

function beautifyHTML(code: string, indent: number): string {
  const tab = ' '.repeat(indent)
  let result = ''
  let level = 0

  // Normalize: remove extra whitespace between tags
  const normalized = code.replace(/>\s+</g, '><').trim()

  const selfClosingTags = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr',
  ])

  // Split by tags
  const tokens = normalized.match(/(<[^>]+>|[^<]+)/g) || []

  for (const token of tokens) {
    const trimmed = token.trim()
    if (!trimmed) continue

    if (trimmed.startsWith('</')) {
      // Closing tag
      level = Math.max(0, level - 1)
      result += tab.repeat(level) + trimmed + '\n'
    } else if (trimmed.startsWith('<')) {
      // Opening or self-closing tag
      const tagMatch = trimmed.match(/^<(\w+)/)
      const tagName = tagMatch ? tagMatch[1].toLowerCase() : ''
      const isSelfClosing = selfClosingTags.has(tagName) || trimmed.endsWith('/>')

      result += tab.repeat(level) + trimmed + '\n'
      if (!isSelfClosing && !trimmed.startsWith('<!')) {
        level++
      }
    } else {
      // Text content
      result += tab.repeat(level) + trimmed + '\n'
    }
  }

  return result.trimEnd()
}

function beautifyCSS(code: string, indent: number): string {
  const tab = ' '.repeat(indent)
  let result = ''
  let level = 0

  // Normalize
  let normalized = code.replace(/\/\*[\s\S]*?\*\//g, (match) => '/*COMMENT*/' + match + '/*ENDCOMMENT*/')
  normalized = code.trim()

  const chars = normalized.split('')
  let current = ''
  let inString = false
  let stringChar = ''

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]

    if (inString) {
      current += c
      if (c === stringChar && chars[i - 1] !== '\\') inString = false
      continue
    }

    if (c === '"' || c === "'") {
      inString = true
      stringChar = c
      current += c
      continue
    }

    if (c === '{') {
      result += tab.repeat(level) + current.trim() + ' {\n'
      current = ''
      level++
    } else if (c === '}') {
      if (current.trim()) {
        result += tab.repeat(level) + current.trim() + '\n'
        current = ''
      }
      level = Math.max(0, level - 1)
      result += tab.repeat(level) + '}\n\n'
    } else if (c === ';') {
      result += tab.repeat(level) + current.trim() + ';\n'
      current = ''
    } else {
      current += c
    }
  }

  if (current.trim()) {
    result += current.trim()
  }

  return result.replace(/\n{3,}/g, '\n\n').trimEnd()
}

function beautifyJS(code: string, indent: number): string {
  const tab = ' '.repeat(indent)
  let result = ''
  let level = 0
  let current = ''
  let inString = false
  let stringChar = ''
  let inTemplate = false

  const chars = code.trim().split('')

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]

    if (inString) {
      current += c
      if (c === stringChar && chars[i - 1] !== '\\') inString = false
      continue
    }

    if (inTemplate) {
      current += c
      if (c === '`' && chars[i - 1] !== '\\') inTemplate = false
      continue
    }

    if (c === '"' || c === "'") {
      inString = true
      stringChar = c
      current += c
      continue
    }

    if (c === '`') {
      inTemplate = true
      current += c
      continue
    }

    if (c === '{') {
      result += tab.repeat(level) + current.trim() + ' {\n'
      current = ''
      level++
    } else if (c === '}') {
      if (current.trim()) {
        result += tab.repeat(level) + current.trim() + '\n'
        current = ''
      }
      level = Math.max(0, level - 1)
      result += tab.repeat(level) + '}\n'
    } else if (c === ';') {
      result += tab.repeat(level) + current.trim() + ';\n'
      current = ''
    } else {
      current += c
    }
  }

  if (current.trim()) {
    result += tab.repeat(level) + current.trim() + '\n'
  }

  // Clean up spacing
  result = result.replace(/\n{3,}/g, '\n\n')
  // Fix opening brace on empty line
  result = result.replace(/^\s+{\s*$/gm, ' {')
  return result.trimEnd()
}

type Tab = 'html' | 'css' | 'javascript'

export default function CodeBeautifier({ labels }: CodeBeautifierProps) {
  const l = {
    beautify: labels?.beautify ?? 'Beautify',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste your code here...',
    output: labels?.output ?? 'Beautified output will appear here...',
    html: labels?.html ?? 'HTML',
    css: labels?.css ?? 'CSS',
    javascript: labels?.javascript ?? 'JavaScript',
    indentSize: labels?.indentSize ?? 'Indent size',
  }

  const [tab, setTab] = useState<Tab>('html')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indentSize, setIndentSize] = useState(2)

  const handleBeautify = useCallback(() => {
    if (!input.trim()) return
    let result = ''
    switch (tab) {
      case 'html':
        result = beautifyHTML(input, indentSize)
        break
      case 'css':
        result = beautifyCSS(input, indentSize)
        break
      case 'javascript':
        result = beautifyJS(input, indentSize)
        break
    }
    setOutput(result)
  }, [input, tab, indentSize])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
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
            onClick={() => { setTab(t.key); setOutput('') }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleBeautify}>{l.beautify}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.indentSize}:</label>
          <select
            value={indentSize}
            onChange={(e) => setIndentSize(Number(e.target.value))}
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
          </select>
        </div>
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
    </div>
  )
}
