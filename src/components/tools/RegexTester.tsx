'use client'
import { useState, useMemo } from 'react'

interface RegexTesterProps {
  labels?: {
    pattern: string
    flags: string
    testString: string
    matches: string
    matchCount: string
    noMatches: string
    invalidRegex: string
    matchDetails: string
  }
}

interface MatchInfo {
  index: number
  value: string
  groups: string[]
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export default function RegexTester({ labels }: RegexTesterProps) {
  const l = {
    pattern: labels?.pattern ?? 'Regex Pattern',
    flags: labels?.flags ?? 'Flags',
    testString: labels?.testString ?? 'Test String',
    matches: labels?.matches ?? 'Matches',
    matchCount: labels?.matchCount ?? 'Match count',
    noMatches: labels?.noMatches ?? 'No matches found',
    invalidRegex: labels?.invalidRegex ?? 'Invalid regex',
    matchDetails: labels?.matchDetails ?? 'Match Details',
  }

  const [pattern, setPattern] = useState('')
  const [flagG, setFlagG] = useState(true)
  const [flagI, setFlagI] = useState(false)
  const [flagM, setFlagM] = useState(false)
  const [flagS, setFlagS] = useState(false)
  const [testStr, setTestStr] = useState('')

  const flags = useMemo(() => {
    let f = ''
    if (flagG) f += 'g'
    if (flagI) f += 'i'
    if (flagM) f += 'm'
    if (flagS) f += 's'
    return f
  }, [flagG, flagI, flagM, flagS])

  const { error, matchInfos, highlightedHtml } = useMemo(() => {
    if (!pattern || !testStr) {
      return { error: '', matchInfos: [] as MatchInfo[], highlightedHtml: escapeHtml(testStr) }
    }

    let regex: RegExp
    try {
      regex = new RegExp(pattern, flags)
    } catch (e) {
      return {
        error: (e as Error).message,
        matchInfos: [] as MatchInfo[],
        highlightedHtml: escapeHtml(testStr),
      }
    }

    const infos: MatchInfo[] = []

    if (flags.includes('g')) {
      let m: RegExpExecArray | null
      const seenIndices = new Set<number>()
      while ((m = regex.exec(testStr)) !== null) {
        if (seenIndices.has(m.index)) break // prevent infinite loop on zero-length matches
        seenIndices.add(m.index)
        infos.push({
          index: m.index,
          value: m[0],
          groups: m.slice(1),
        })
        if (m[0].length === 0) regex.lastIndex++ // advance past zero-length matches
      }
    } else {
      const m = regex.exec(testStr)
      if (m) {
        infos.push({
          index: m.index,
          value: m[0],
          groups: m.slice(1),
        })
      }
    }

    // Build highlighted HTML
    let html = ''
    let lastIndex = 0
    for (const info of infos) {
      html += escapeHtml(testStr.slice(lastIndex, info.index))
      html += `<mark style="background-color:rgba(59,130,246,0.3);border-radius:2px;padding:1px 0">${escapeHtml(info.value)}</mark>`
      lastIndex = info.index + info.value.length
    }
    html += escapeHtml(testStr.slice(lastIndex))

    return { error: '', matchInfos: infos, highlightedHtml: html }
  }, [pattern, flags, testStr])

  const inputStyle: React.CSSProperties = {
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.9375rem',
    fontFamily: 'monospace',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.8125rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    marginBottom: '0.25rem',
  }

  const checkboxStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.375rem',
    cursor: 'pointer',
    fontSize: '0.875rem',
    color: 'var(--color-text)',
    userSelect: 'none',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Pattern */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>{l.pattern}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            style={{ ...inputStyle, flex: 1 }}
            placeholder="Enter regex pattern..."
          />
          <span style={{ fontSize: '1.25rem', color: 'var(--color-text-secondary)', fontFamily: 'monospace' }}>/{flags}</span>
        </div>
      </div>

      {/* Flags */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>{l.flags}</span>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <label style={checkboxStyle}>
            <input type="checkbox" checked={flagG} onChange={(e) => setFlagG(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
            <code>g</code> global
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" checked={flagI} onChange={(e) => setFlagI(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
            <code>i</code> case-insensitive
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" checked={flagM} onChange={(e) => setFlagM(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
            <code>m</code> multiline
          </label>
          <label style={checkboxStyle}>
            <input type="checkbox" checked={flagS} onChange={(e) => setFlagS(e.target.checked)} style={{ accentColor: 'var(--color-primary)' }} />
            <code>s</code> dotAll
          </label>
        </div>
      </div>

      {/* Error */}
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
          {l.invalidRegex}: {error}
        </div>
      )}

      {/* Test String */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={labelStyle}>{l.testString}</span>
        <textarea
          className="tool-textarea"
          style={{ height: '150px', fontFamily: 'monospace' }}
          value={testStr}
          onChange={(e) => setTestStr(e.target.value)}
          placeholder="Enter test string..."
        />
      </div>

      {/* Highlighted matches */}
      {testStr && pattern && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={labelStyle}>{l.matches}</span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
              {l.matchCount}: <strong>{matchInfos.length}</strong>
            </span>
          </div>
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              lineHeight: 1.6,
              color: 'var(--color-text)',
            }}
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        </div>
      )}

      {/* No matches */}
      {testStr && pattern && !error && matchInfos.length === 0 && (
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
          {l.noMatches}
        </div>
      )}

      {/* Match details */}
      {matchInfos.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={labelStyle}>{l.matchDetails}</span>
          <div
            style={{
              maxHeight: '250px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.375rem',
            }}
          >
            {matchInfos.map((info, i) => (
              <div
                key={i}
                style={{
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8125rem',
                  fontFamily: 'monospace',
                  color: 'var(--color-text)',
                }}
              >
                <span style={{ color: 'var(--color-text-secondary)' }}>#{i + 1}</span>{' '}
                <span style={{ fontWeight: 600 }}>"{info.value}"</span>{' '}
                <span style={{ color: 'var(--color-text-secondary)' }}>at index {info.index}</span>
                {info.groups.length > 0 && (
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {' '}| groups: [{info.groups.map((g, gi) => (
                      <span key={gi}>
                        {gi > 0 && ', '}
                        "{g}"
                      </span>
                    ))}]
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
