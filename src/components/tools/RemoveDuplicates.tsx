'use client'
import { useState, useCallback } from 'react'

interface RemoveDuplicatesProps {
  labels?: {
    input: string
    output: string
    caseSensitive: string
    trimWhitespace: string
    sortOutput: string
    originalLines: string
    uniqueLines: string
    duplicatesRemoved: string
  }
}

export default function RemoveDuplicates({ labels }: RemoveDuplicatesProps) {
  const l = {
    input: labels?.input ?? 'Paste your text here (one item per line)...',
    output: labels?.output ?? 'Results will appear here...',
    caseSensitive: labels?.caseSensitive ?? 'Case sensitive',
    trimWhitespace: labels?.trimWhitespace ?? 'Trim whitespace',
    sortOutput: labels?.sortOutput ?? 'Sort output',
    originalLines: labels?.originalLines ?? 'Original lines',
    uniqueLines: labels?.uniqueLines ?? 'Unique lines',
    duplicatesRemoved: labels?.duplicatesRemoved ?? 'Duplicates removed',
  }

  const [input, setInput] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(true)
  const [trimWhitespace, setTrimWhitespace] = useState(true)
  const [sortOutput, setSortOutput] = useState(false)

  const processText = useCallback(() => {
    if (!input.trim()) return { output: '', original: 0, unique: 0, dupes: 0 }

    let lines = input.split('\n')
    const originalCount = lines.length

    if (trimWhitespace) {
      lines = lines.map((line) => line.trim())
    }

    const seen = new Set<string>()
    const unique: string[] = []

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase()
      if (!seen.has(key)) {
        seen.add(key)
        unique.push(line)
      }
    }

    const result = sortOutput ? [...unique].sort((a, b) => a.localeCompare(b)) : unique

    return {
      output: result.join('\n'),
      original: originalCount,
      unique: unique.length,
      dupes: originalCount - unique.length,
    }
  }, [input, caseSensitive, trimWhitespace, sortOutput])

  const result = processText()

  const toggleStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    userSelect: 'none',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
    border: active ? 'none' : '1px solid var(--color-border)',
    fontWeight: 500,
    fontSize: '0.8rem',
  })

  const statStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        <div style={toggleStyle(caseSensitive)} onClick={() => setCaseSensitive(!caseSensitive)}>
          {l.caseSensitive}
        </div>
        <div style={toggleStyle(trimWhitespace)} onClick={() => setTrimWhitespace(!trimWhitespace)}>
          {l.trimWhitespace}
        </div>
        <div style={toggleStyle(sortOutput)} onClick={() => setSortOutput(!sortOutput)}>
          {l.sortOutput}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
          placeholder={l.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
          placeholder={l.output}
          value={result.output}
          readOnly
        />
      </div>

      {input.trim() && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          <div style={statStyle}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text)' }}>{result.original}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">{l.originalLines}</div>
          </div>
          <div style={statStyle}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)' }}>{result.unique}</div>
            <div className="text-xs text-[var(--color-text-secondary)]">{l.uniqueLines}</div>
          </div>
          <div style={statStyle}>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: result.dupes > 0 ? '#ef4444' : 'var(--color-text)' }}>
              {result.dupes}
            </div>
            <div className="text-xs text-[var(--color-text-secondary)]">{l.duplicatesRemoved}</div>
          </div>
        </div>
      )}
    </div>
  )
}
