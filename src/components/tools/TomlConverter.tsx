'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface TomlConverterProps {
  labels?: {
    tomlToJson: string
    jsonToToml: string
    copy: string
    copied: string
    input: string
    output: string
    invalidInput: string
  }
}

// Simple TOML parser
function parseToml(toml: string): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  const lines = toml.split('\n')
  let currentTable: Record<string, unknown> = result
  let currentPath: string[] = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    // Skip empty lines and comments
    if (!line || line.startsWith('#')) continue

    // Table header [table] or [table.subtable]
    const tableMatch = line.match(/^\[([^\[\]]+)\]$/)
    if (tableMatch) {
      const path = tableMatch[1].split('.').map((s) => s.trim().replace(/^"|"$/g, ''))
      currentPath = path
      currentTable = result
      for (const key of path) {
        if (!(key in currentTable)) {
          currentTable[key] = {}
        }
        currentTable = currentTable[key] as Record<string, unknown>
      }
      continue
    }

    // Array of tables [[table]]
    const arrayTableMatch = line.match(/^\[\[([^\[\]]+)\]\]$/)
    if (arrayTableMatch) {
      const path = arrayTableMatch[1].split('.').map((s) => s.trim().replace(/^"|"$/g, ''))
      currentPath = path
      let target: Record<string, unknown> = result
      for (let j = 0; j < path.length - 1; j++) {
        if (!(path[j] in target)) {
          target[path[j]] = {}
        }
        target = target[path[j]] as Record<string, unknown>
      }
      const lastKey = path[path.length - 1]
      if (!(lastKey in target)) {
        target[lastKey] = []
      }
      const arr = target[lastKey] as unknown[]
      const newObj: Record<string, unknown> = {}
      arr.push(newObj)
      currentTable = newObj
      continue
    }

    // Key-value pair
    const kvMatch = line.match(/^([^=]+)=(.*)$/)
    if (kvMatch) {
      const key = kvMatch[1].trim().replace(/^"|"$/g, '')
      const rawValue = kvMatch[2].trim()
      currentTable[key] = parseTomlValue(rawValue, lines, i)
      continue
    }
  }

  return result
}

function parseTomlValue(value: string, _lines?: string[], _lineIndex?: number): unknown {
  // String (basic)
  if (value.startsWith('"') && value.endsWith('"')) {
    return value
      .slice(1, -1)
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\')
  }

  // String (literal)
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1)
  }

  // Boolean
  if (value === 'true') return true
  if (value === 'false') return false

  // Integer
  if (/^-?\d+$/.test(value)) return parseInt(value, 10)
  // Integer with underscores
  if (/^-?\d[\d_]*\d$/.test(value)) return parseInt(value.replace(/_/g, ''), 10)

  // Float
  if (/^-?\d+\.\d+$/.test(value)) return parseFloat(value)
  if (/^-?\d[\d_]*\.\d[\d_]*$/.test(value)) return parseFloat(value.replace(/_/g, ''))

  // Special floats
  if (value === 'inf' || value === '+inf') return Infinity
  if (value === '-inf') return -Infinity
  if (value === 'nan' || value === '+nan' || value === '-nan') return NaN

  // Datetime (store as string)
  if (/^\d{4}-\d{2}-\d{2}[T ]\d{2}:\d{2}/.test(value)) return value

  // Array
  if (value.startsWith('[')) {
    return parseTomlArray(value)
  }

  // Inline table
  if (value.startsWith('{') && value.endsWith('}')) {
    return parseTomlInlineTable(value)
  }

  // Unquoted string fallback
  return value
}

function parseTomlArray(value: string): unknown[] {
  const inner = value.slice(1, -1).trim()
  if (!inner) return []

  const items: unknown[] = []
  let current = ''
  let depth = 0
  let inStr = false
  let strChar = ''

  for (let i = 0; i < inner.length; i++) {
    const c = inner[i]

    if (inStr) {
      current += c
      if (c === strChar && inner[i - 1] !== '\\') inStr = false
      continue
    }

    if (c === '"' || c === "'") {
      inStr = true
      strChar = c
      current += c
      continue
    }

    if (c === '[' || c === '{') { depth++; current += c; continue }
    if (c === ']' || c === '}') { depth--; current += c; continue }

    if (c === ',' && depth === 0) {
      const trimmed = current.trim()
      if (trimmed) items.push(parseTomlValue(trimmed))
      current = ''
      continue
    }

    current += c
  }

  const trimmed = current.trim()
  if (trimmed) items.push(parseTomlValue(trimmed))

  return items
}

function parseTomlInlineTable(value: string): Record<string, unknown> {
  const inner = value.slice(1, -1).trim()
  if (!inner) return {}

  const result: Record<string, unknown> = {}
  const parts: string[] = []
  let current = ''
  let depth = 0
  let inStr = false
  let strChar = ''

  for (let i = 0; i < inner.length; i++) {
    const c = inner[i]

    if (inStr) {
      current += c
      if (c === strChar && inner[i - 1] !== '\\') inStr = false
      continue
    }

    if (c === '"' || c === "'") {
      inStr = true
      strChar = c
      current += c
      continue
    }

    if (c === '[' || c === '{') { depth++; current += c; continue }
    if (c === ']' || c === '}') { depth--; current += c; continue }

    if (c === ',' && depth === 0) {
      parts.push(current.trim())
      current = ''
      continue
    }

    current += c
  }
  if (current.trim()) parts.push(current.trim())

  for (const part of parts) {
    const eqIdx = part.indexOf('=')
    if (eqIdx === -1) continue
    const key = part.slice(0, eqIdx).trim().replace(/^"|"$/g, '')
    const val = part.slice(eqIdx + 1).trim()
    result[key] = parseTomlValue(val)
  }

  return result
}

// JSON to TOML converter
function jsonToToml(obj: unknown, prefix: string = ''): string {
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return tomlValueStr(obj)
  }

  const lines: string[] = []
  const record = obj as Record<string, unknown>
  const simpleEntries: [string, unknown][] = []
  const tableEntries: [string, Record<string, unknown>][] = []
  const arrayTableEntries: [string, unknown[]][] = []

  for (const [key, value] of Object.entries(record)) {
    if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null && !Array.isArray(value[0])) {
      arrayTableEntries.push([key, value])
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      tableEntries.push([key, value as Record<string, unknown>])
    } else {
      simpleEntries.push([key, value])
    }
  }

  // Output simple key-value pairs first
  for (const [key, value] of simpleEntries) {
    const safeKey = /^[a-zA-Z0-9_-]+$/.test(key) ? key : `"${key}"`
    lines.push(`${safeKey} = ${tomlValueStr(value)}`)
  }

  // Output sub-tables
  for (const [key, value] of tableEntries) {
    const tablePath = prefix ? `${prefix}.${key}` : key
    lines.push('')
    lines.push(`[${tablePath}]`)
    lines.push(jsonToToml(value, tablePath))
  }

  // Output array of tables
  for (const [key, arr] of arrayTableEntries) {
    const tablePath = prefix ? `${prefix}.${key}` : key
    for (const item of arr) {
      lines.push('')
      lines.push(`[[${tablePath}]]`)
      lines.push(jsonToToml(item, tablePath))
    }
  }

  return lines.join('\n')
}

function tomlValueStr(value: unknown): string {
  if (value === null || value === undefined) return '""'
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  if (typeof value === 'number') {
    if (!isFinite(value)) return value > 0 ? 'inf' : '-inf'
    if (isNaN(value)) return 'nan'
    return String(value)
  }
  if (typeof value === 'string') {
    const escaped = value
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
    return `"${escaped}"`
  }
  if (Array.isArray(value)) {
    const items = value.map((v) => tomlValueStr(v))
    return `[${items.join(', ')}]`
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
    const parts = entries.map(([k, v]) => {
      const safeKey = /^[a-zA-Z0-9_-]+$/.test(k) ? k : `"${k}"`
      return `${safeKey} = ${tomlValueStr(v)}`
    })
    return `{ ${parts.join(', ')} }`
  }
  return String(value)
}

export default function TomlConverter({ labels }: TomlConverterProps) {
  const l = {
    tomlToJson: labels?.tomlToJson ?? 'TOML \u2192 JSON',
    jsonToToml: labels?.jsonToToml ?? 'JSON \u2192 TOML',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste TOML or JSON...',
    output: labels?.output ?? 'Result will appear here...',
    invalidInput: labels?.invalidInput ?? 'Invalid input',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleTomlToJson = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = parseToml(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(`${l.invalidInput}: ${(e as Error).message}`)
      setOutput('')
    }
  }, [input, l.invalidInput])

  const handleJsonToToml = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(jsonToToml(parsed).trim())
      setError('')
    } catch (e) {
      setError(`${l.invalidInput}: ${(e as Error).message}`)
      setOutput('')
    }
  }, [input, l.invalidInput])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleTomlToJson}>{l.tomlToJson}</button>
        <button className="btn-secondary" onClick={handleJsonToToml}>{l.jsonToToml}</button>
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
          {error}
        </div>
      )}
    </div>
  )
}
