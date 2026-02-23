'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface SqlFormatterProps {
  labels?: {
    format: string
    clear: string
    copy: string
    copied: string
    input: string
    output: string
    tabSize: string
    uppercase: string
  }
}

const SQL_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'IS', 'NULL',
  'LIKE', 'BETWEEN', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END',
  'AS', 'ON', 'USING', 'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN',
  'FULL JOIN', 'CROSS JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN',
  'FULL OUTER JOIN', 'NATURAL JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'FETCH',
  'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
  'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE', 'TRUNCATE',
  'CREATE INDEX', 'DROP INDEX',
  'PRIMARY KEY', 'FOREIGN KEY', 'REFERENCES', 'CONSTRAINT',
  'DEFAULT', 'CHECK', 'UNIQUE', 'INDEX',
  'ASC', 'DESC', 'DISTINCT', 'ALL', 'TOP', 'WITH',
  'INTO', 'TABLE', 'COLUMN', 'ADD', 'DROP', 'ALTER',
  'COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
  'IF', 'BEGIN', 'COMMIT', 'ROLLBACK', 'GRANT', 'REVOKE',
]

// Keywords that should start a new line
const NEWLINE_KEYWORDS = [
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR',
  'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL JOIN',
  'CROSS JOIN', 'LEFT OUTER JOIN', 'RIGHT OUTER JOIN', 'FULL OUTER JOIN', 'NATURAL JOIN',
  'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET',
  'UNION', 'UNION ALL', 'INTERSECT', 'EXCEPT',
  'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM',
  'ON', 'USING',
]

// Keywords that should be indented
const INDENT_KEYWORDS = [
  'AND', 'OR', 'ON', 'USING', 'SET',
]

function formatSQL(sql: string, tabSize: number, uppercaseKeywords: boolean): string {
  // Normalize whitespace
  let normalized = sql.replace(/\s+/g, ' ').trim()

  // Uppercase keywords by sorting longest first so multi-word matches first
  const sortedKeywords = [...SQL_KEYWORDS].sort((a, b) => b.length - a.length)

  if (uppercaseKeywords) {
    for (const kw of sortedKeywords) {
      const regex = new RegExp('\\b' + kw.replace(/ /g, '\\s+') + '\\b', 'gi')
      normalized = normalized.replace(regex, kw)
    }
  }

  const tab = ' '.repeat(tabSize)
  const sortedNewlineKeywords = [...NEWLINE_KEYWORDS].sort((a, b) => b.length - a.length)

  // Add newlines before major keywords
  let result = normalized
  for (const kw of sortedNewlineKeywords) {
    const regex = new RegExp('\\s+(' + kw.replace(/ /g, '\\s+') + ')\\b', 'gi')
    result = result.replace(regex, (match, group) => {
      const keyword = uppercaseKeywords ? kw : group
      return '\n' + keyword
    })
  }

  // Split into lines and handle indentation
  const lines = result.split('\n').map((line) => line.trim()).filter(Boolean)
  const formattedLines: string[] = []

  for (const line of lines) {
    // Check if line starts with an indent keyword
    const upperLine = line.toUpperCase()
    let shouldIndent = false
    for (const kw of INDENT_KEYWORDS) {
      if (upperLine.startsWith(kw + ' ') || upperLine === kw) {
        shouldIndent = true
        break
      }
    }
    formattedLines.push(shouldIndent ? tab + line : line)
  }

  return formattedLines.join('\n')
}

export default function SqlFormatter({ labels }: SqlFormatterProps) {
  const l = {
    format: labels?.format ?? 'Format',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    input: labels?.input ?? 'Paste your SQL query here...',
    output: labels?.output ?? 'Formatted SQL will appear here...',
    tabSize: labels?.tabSize ?? 'Tab size',
    uppercase: labels?.uppercase ?? 'Uppercase keywords',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [tabSize, setTabSize] = useState(2)
  const [uppercase, setUppercase] = useState(true)

  const handleFormat = useCallback(() => {
    if (!input.trim()) return
    const result = formatSQL(input, tabSize, uppercase)
    setOutput(result)
  }, [input, tabSize, uppercase])

  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleFormat}>{l.format}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>{l.clear}</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            {l.uppercase}
          </label>
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
            </select>
          </div>
        </div>
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
    </div>
  )
}
