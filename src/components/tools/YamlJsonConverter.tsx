'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'
import { Alert } from '@/components/ui/alert'

interface YamlJsonConverterProps {
  labels?: {
    input: string
    output: string
    yamlToJson: string
    jsonToYaml: string
    copy: string
    copied: string
    invalidInput: string
  }
}

// Simple YAML parser for basic cases
function parseYaml(yaml: string): unknown {
  const lines = yaml.split('\n')
  return parseYamlLines(lines, 0, 0).value
}

function parseYamlLines(
  lines: string[],
  startIndex: number,
  baseIndent: number
): { value: unknown; nextIndex: number } {
  if (startIndex >= lines.length) return { value: null, nextIndex: startIndex }

  const firstLine = lines[startIndex]
  const trimmed = firstLine.trim()

  // Empty or comment
  if (trimmed === '' || trimmed.startsWith('#')) {
    return parseYamlLines(lines, startIndex + 1, baseIndent)
  }

  // Check if this is an array item at current indent
  const currentIndent = firstLine.length - firstLine.trimStart().length
  if (trimmed.startsWith('- ')) {
    return parseYamlArray(lines, startIndex, currentIndent)
  }

  // Otherwise it's an object
  return parseYamlObject(lines, startIndex, currentIndent)
}

function parseYamlArray(
  lines: string[],
  startIndex: number,
  baseIndent: number
): { value: unknown[]; nextIndex: number } {
  const result: unknown[] = []
  let i = startIndex

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('#')) { i++; continue }

    const indent = line.length - line.trimStart().length
    if (indent < baseIndent) break
    if (indent > baseIndent) break

    if (!trimmed.startsWith('- ')) break

    const afterDash = trimmed.slice(2)

    // Check if value contains a colon (nested object)
    if (afterDash.includes(': ') || afterDash.endsWith(':')) {
      // Inline key-value after dash: treat as single object
      const key = afterDash.includes(': ') ? afterDash.split(': ')[0].trim() : afterDash.replace(':', '').trim()
      const val = afterDash.includes(': ') ? parseYamlValue(afterDash.slice(afterDash.indexOf(': ') + 2).trim()) : null

      // Check for more keys at deeper indent
      const obj: Record<string, unknown> = { [key]: val }
      let j = i + 1
      while (j < lines.length) {
        const nextLine = lines[j]
        const nextTrimmed = nextLine.trim()
        if (nextTrimmed === '' || nextTrimmed.startsWith('#')) { j++; continue }
        const nextIndent = nextLine.length - nextLine.trimStart().length
        if (nextIndent <= baseIndent) break
        if (nextIndent > baseIndent + 2) { j++; continue }

        if (nextTrimmed.includes(': ')) {
          const nk = nextTrimmed.split(': ')[0].trim()
          const nv = parseYamlValue(nextTrimmed.slice(nextTrimmed.indexOf(': ') + 2).trim())
          obj[nk] = nv
        }
        j++
      }

      result.push(Object.keys(obj).length === 1 && val !== null ? obj : obj)
      i = j
    } else {
      result.push(parseYamlValue(afterDash))
      i++
    }
  }

  return { value: result, nextIndex: i }
}

function parseYamlObject(
  lines: string[],
  startIndex: number,
  baseIndent: number
): { value: Record<string, unknown>; nextIndex: number } {
  const result: Record<string, unknown> = {}
  let i = startIndex

  while (i < lines.length) {
    const line = lines[i]
    const trimmed = line.trim()
    if (trimmed === '' || trimmed.startsWith('#')) { i++; continue }

    const indent = line.length - line.trimStart().length
    if (indent < baseIndent) break
    if (indent > baseIndent) break

    const colonIdx = trimmed.indexOf(':')
    if (colonIdx === -1) { i++; continue }

    const key = trimmed.slice(0, colonIdx).trim()
    const afterColon = trimmed.slice(colonIdx + 1).trim()

    if (afterColon === '' || afterColon === '|' || afterColon === '>') {
      // Nested value on next lines
      let nextNonEmpty = i + 1
      while (nextNonEmpty < lines.length && lines[nextNonEmpty].trim() === '') nextNonEmpty++

      if (nextNonEmpty < lines.length) {
        const nextIndent = lines[nextNonEmpty].length - lines[nextNonEmpty].trimStart().length
        if (nextIndent > baseIndent) {
          const nested = parseYamlLines(lines, nextNonEmpty, nextIndent)
          result[key] = nested.value
          i = nested.nextIndex
          continue
        }
      }
      result[key] = null
      i++
    } else {
      result[key] = parseYamlValue(afterColon)
      i++
    }
  }

  return { value: result, nextIndex: i }
}

function parseYamlValue(val: string): unknown {
  if (val === 'null' || val === '~' || val === '') return null
  if (val === 'true') return true
  if (val === 'false') return false
  if (/^-?\d+$/.test(val)) return parseInt(val, 10)
  if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val)
  // Remove surrounding quotes
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1)
  }
  // Inline array [a, b, c]
  if (val.startsWith('[') && val.endsWith(']')) {
    return val
      .slice(1, -1)
      .split(',')
      .map((s) => parseYamlValue(s.trim()))
  }
  return val
}

// JSON to YAML converter
function jsonToYaml(obj: unknown, indent: number = 0): string {
  const prefix = '  '.repeat(indent)

  if (obj === null || obj === undefined) return 'null'
  if (typeof obj === 'boolean') return obj ? 'true' : 'false'
  if (typeof obj === 'number') return String(obj)
  if (typeof obj === 'string') {
    // Quote strings that could be ambiguous
    if (
      obj === '' ||
      obj === 'true' || obj === 'false' || obj === 'null' ||
      /^-?\d+(\.\d+)?$/.test(obj) ||
      obj.includes(':') || obj.includes('#') ||
      obj.includes('\n')
    ) {
      return `"${obj.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`
    }
    return obj
  }

  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    return obj
      .map((item) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          const entries = Object.entries(item)
          if (entries.length === 0) return `${prefix}- {}`
          const firstLine = `${prefix}- ${entries[0][0]}: ${jsonToYaml(entries[0][1], indent + 2)}`
          const rest = entries
            .slice(1)
            .map(([k, v]) => `${prefix}  ${k}: ${jsonToYaml(v, indent + 2)}`)
            .join('\n')
          return rest ? `${firstLine}\n${rest}` : firstLine
        }
        return `${prefix}- ${jsonToYaml(item, indent + 1)}`
      })
      .join('\n')
  }

  if (typeof obj === 'object') {
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    return entries
      .map(([k, v]) => {
        if (typeof v === 'object' && v !== null) {
          const nested = jsonToYaml(v, indent + 1)
          return `${prefix}${k}:\n${nested}`
        }
        return `${prefix}${k}: ${jsonToYaml(v, indent + 1)}`
      })
      .join('\n')
  }

  return String(obj)
}

export default function YamlJsonConverter({ labels }: YamlJsonConverterProps) {
  const l = {
    input: labels?.input ?? 'Paste YAML or JSON...',
    output: labels?.output ?? 'Result will appear here...',
    yamlToJson: labels?.yamlToJson ?? 'YAML \u2192 JSON',
    jsonToYaml: labels?.jsonToYaml ?? 'JSON \u2192 YAML',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    invalidInput: labels?.invalidInput ?? 'Invalid input',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleYamlToJson = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = parseYaml(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(`${l.invalidInput}: ${(e as Error).message}`)
      setOutput('')
    }
  }, [input, l.invalidInput])

  const handleJsonToYaml = useCallback(() => {
    if (!input.trim()) return
    try {
      const parsed = JSON.parse(input)
      setOutput(jsonToYaml(parsed))
      setError('')
    } catch (e) {
      setError(`${l.invalidInput}: ${(e as Error).message}`)
      setOutput('')
    }
  }, [input, l.invalidInput])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleYamlToJson}>{l.yamlToJson}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleJsonToYaml}>{l.jsonToYaml}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[400px] font-mono"
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
        <Alert variant="error">
          {error}
        </Alert>
      )}
    </div>
  )
}
