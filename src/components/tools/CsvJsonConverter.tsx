'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface CsvJsonConverterProps {
  labels?: {
    input: string
    output: string
    csvToJson: string
    jsonToCsv: string
    copy: string
    copied: string
    invalidInput: string
  }
}

function parseCsv(csv: string): Record<string, string>[] {
  const lines: string[][] = []
  let current: string[] = []
  let field = ''
  let inQuotes = false
  const text = csv.trim()

  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    const next = text[i + 1]

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        field += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        current.push(field)
        field = ''
      } else if (ch === '\r' && next === '\n') {
        current.push(field)
        field = ''
        lines.push(current)
        current = []
        i++
      } else if (ch === '\n') {
        current.push(field)
        field = ''
        lines.push(current)
        current = []
      } else {
        field += ch
      }
    }
  }

  current.push(field)
  if (current.length > 0 && !(current.length === 1 && current[0] === '')) {
    lines.push(current)
  }

  if (lines.length < 2) return []

  const headers = lines[0]
  const result: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const row: Record<string, string> = {}
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = lines[i][j] ?? ''
    }
    result.push(row)
  }

  return result
}

function jsonToCsvString(data: Record<string, unknown>[]): string {
  if (!Array.isArray(data) || data.length === 0) return ''

  const headers = Object.keys(data[0])

  const escapeField = (value: unknown): string => {
    const str = value == null ? '' : String(value)
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"'
    }
    return str
  }

  const lines = [headers.map(escapeField).join(',')]
  for (const row of data) {
    lines.push(headers.map((h) => escapeField(row[h])).join(','))
  }

  return lines.join('\n')
}

export default function CsvJsonConverter({ labels }: CsvJsonConverterProps) {
  const l = {
    input: labels?.input ?? 'Paste CSV or JSON here...',
    output: labels?.output ?? 'Result will appear here...',
    csvToJson: labels?.csvToJson ?? 'CSV → JSON',
    jsonToCsv: labels?.jsonToCsv ?? 'JSON → CSV',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    invalidInput: labels?.invalidInput ?? 'Invalid input',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleCsvToJson = useCallback(() => {
    if (!input.trim()) return
    try {
      const result = parseCsv(input)
      if (result.length === 0) {
        setError(l.invalidInput)
        setOutput('')
        return
      }
      setOutput(JSON.stringify(result, null, 2))
      setError('')
    } catch {
      setError(l.invalidInput)
      setOutput('')
    }
  }, [input, l.invalidInput])

  const handleJsonToCsv = useCallback(() => {
    if (!input.trim()) return
    try {
      const data = JSON.parse(input)
      if (!Array.isArray(data) || data.length === 0) {
        setError(l.invalidInput)
        setOutput('')
        return
      }
      const csv = jsonToCsvString(data)
      setOutput(csv)
      setError('')
    } catch {
      setError(l.invalidInput)
      setOutput('')
    }
  }, [input, l.invalidInput])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleCsvToJson}>{l.csvToJson}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleJsonToCsv}>{l.jsonToCsv}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
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
          {error}
        </div>
      )}
    </div>
  )
}
