'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface JsonToTypescriptProps {
  labels?: {
    convert: string
    clear: string
    copy: string
    copied: string
    input: string
    output: string
    rootName: string
    invalidJson: string
  }
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function sanitizeName(s: string): string {
  return s.replace(/[^a-zA-Z0-9_]/g, '_').replace(/^(\d)/, '_$1')
}

function inferType(
  value: unknown,
  name: string,
  interfaces: Map<string, string>,
  depth: number
): string {
  if (value === null || value === undefined) return 'null'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'number') return Number.isInteger(value) ? 'number' : 'number'
  if (typeof value === 'boolean') return 'boolean'

  if (Array.isArray(value)) {
    if (value.length === 0) return 'unknown[]'
    const types = new Set<string>()
    for (const item of value) {
      types.add(inferType(item, name + 'Item', interfaces, depth + 1))
    }
    const uniqueTypes = Array.from(types)
    if (uniqueTypes.length === 1) return uniqueTypes[0] + '[]'
    return '(' + uniqueTypes.join(' | ') + ')[]'
  }

  if (typeof value === 'object') {
    const interfaceName = capitalize(sanitizeName(name))
    generateInterface(value as Record<string, unknown>, interfaceName, interfaces, depth + 1)
    return interfaceName
  }

  return 'unknown'
}

function generateInterface(
  obj: Record<string, unknown>,
  name: string,
  interfaces: Map<string, string>,
  depth: number
): void {
  const lines: string[] = []
  lines.push(`export interface ${name} {`)

  const entries = Object.entries(obj)
  for (const [key, value] of entries) {
    const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`
    const typeName = inferType(value, key, interfaces, depth)
    lines.push(`  ${safeName}: ${typeName};`)
  }

  lines.push('}')
  interfaces.set(name, lines.join('\n'))
}

function jsonToTypescript(json: string, rootName: string): string {
  const parsed = JSON.parse(json)
  const interfaces = new Map<string, string>()

  if (Array.isArray(parsed)) {
    if (parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      generateInterface(parsed[0] as Record<string, unknown>, rootName, interfaces, 0)
      const result: string[] = []
      // Add nested interfaces first (reverse order)
      const keys = Array.from(interfaces.keys())
      for (let i = keys.length - 1; i >= 0; i--) {
        result.push(interfaces.get(keys[i])!)
      }
      result.push('')
      result.push(`export type ${rootName}List = ${rootName}[];`)
      return result.join('\n\n')
    }
    const itemType = parsed.length > 0 ? inferType(parsed[0], rootName, interfaces, 0) : 'unknown'
    return `export type ${rootName} = ${itemType}[];`
  }

  if (typeof parsed === 'object' && parsed !== null) {
    generateInterface(parsed as Record<string, unknown>, rootName, interfaces, 0)
    const result: string[] = []
    const keys = Array.from(interfaces.keys())
    for (let i = keys.length - 1; i >= 0; i--) {
      result.push(interfaces.get(keys[i])!)
    }
    return result.join('\n\n')
  }

  return `export type ${rootName} = ${typeof parsed};`
}

export default function JsonToTypescript({ labels }: JsonToTypescriptProps) {
  const l = {
    convert: labels?.convert ?? 'Convert',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste your JSON here...',
    output: labels?.output ?? 'TypeScript interfaces will appear here...',
    rootName: labels?.rootName ?? 'Root interface name',
    invalidJson: labels?.invalidJson ?? 'Invalid JSON',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [rootName, setRootName] = useState('Root')

  const handleConvert = useCallback(() => {
    if (!input.trim()) return
    try {
      const result = jsonToTypescript(input, rootName || 'Root')
      setOutput(result)
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input, rootName])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setError('')
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleConvert}>{l.convert}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>{l.clear}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto' }}>
          <label className="text-sm text-[var(--color-text-secondary)]">{l.rootName}:</label>
          <input
            type="text"
            value={rootName}
            onChange={(e) => setRootName(e.target.value)}
            style={{
              padding: '0.375rem 0.5rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              width: '120px',
              fontFamily: 'monospace',
            }}
          />
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
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[400px] font-mono"
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
          {l.invalidJson}: {error}
        </div>
      )}
    </div>
  )
}
