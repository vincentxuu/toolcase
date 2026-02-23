'use client'
import { useState } from 'react'

interface Props {
  labels?: {
    original: string; modified: string; compare: string
    added: string; removed: string; unchanged: string; noChanges: string
  }
}

export default function DiffChecker({ labels }: Props) {
  const l = {
    original: labels?.original ?? 'Original',
    modified: labels?.modified ?? 'Modified',
    compare: labels?.compare ?? 'Compare',
    added: labels?.added ?? 'Added',
    removed: labels?.removed ?? 'Removed',
    unchanged: labels?.unchanged ?? 'Unchanged',
    noChanges: labels?.noChanges ?? 'No changes found',
  }

  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diff, setDiff] = useState<{ type: 'added' | 'removed' | 'unchanged'; text: string }[]>([])
  const [compared, setCompared] = useState(false)

  const compare = () => {
    const origLines = original.split('\n')
    const modLines = modified.split('\n')
    const result: { type: 'added' | 'removed' | 'unchanged'; text: string }[] = []

    const origSet = new Set(origLines)
    const modSet = new Set(modLines)

    // Simple LCS-based diff
    const m = origLines.length
    const n = modLines.length
    const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0))

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (origLines[i - 1] === modLines[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }

    let i = m, j = n
    const ops: { type: 'added' | 'removed' | 'unchanged'; text: string }[] = []
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && origLines[i - 1] === modLines[j - 1]) {
        ops.push({ type: 'unchanged', text: origLines[i - 1] })
        i--; j--
      } else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) {
        ops.push({ type: 'added', text: modLines[j - 1] })
        j--
      } else {
        ops.push({ type: 'removed', text: origLines[i - 1] })
        i--
      }
    }
    ops.reverse()
    setDiff(ops)
    setCompared(true)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', minHeight: '200px', padding: '0.75rem', border: '1px solid var(--color-border)',
    borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)',
    fontSize: '0.875rem', fontFamily: "'Fira Code', monospace", resize: 'vertical',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }

  const addedCount = diff.filter(d => d.type === 'added').length
  const removedCount = diff.filter(d => d.type === 'removed').length

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.original}</label>
          <textarea style={inputStyle} value={original} onChange={(e) => setOriginal(e.target.value)} />
        </div>
        <div>
          <label style={labelStyle}>{l.modified}</label>
          <textarea style={inputStyle} value={modified} onChange={(e) => setModified(e.target.value)} />
        </div>
      </div>
      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={compare} style={{ alignSelf: 'center' }}>{l.compare}</button>
      {compared && (
        <div>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            <span style={{ color: '#22c55e' }}>+ {addedCount} {l.added}</span>
            <span style={{ color: '#ef4444' }}>- {removedCount} {l.removed}</span>
          </div>
          {diff.length === 0 || (addedCount === 0 && removedCount === 0) ? (
            <p className="text-[var(--color-text-secondary)]">{l.noChanges}</p>
          ) : (
            <div style={{ borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--color-border)', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem' }}>
              {diff.map((d, idx) => (
                <div key={idx} style={{
                  padding: '0.25rem 0.75rem',
                  backgroundColor: d.type === 'added' ? 'rgba(34,197,94,0.1)' : d.type === 'removed' ? 'rgba(239,68,68,0.1)' : 'transparent',
                  borderLeft: `3px solid ${d.type === 'added' ? '#22c55e' : d.type === 'removed' ? '#ef4444' : 'transparent'}`,
                  color: d.type === 'added' ? '#22c55e' : d.type === 'removed' ? '#ef4444' : 'var(--color-text)',
                }}>
                  <span style={{ opacity: 0.5, marginRight: '0.5rem' }}>{d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}</span>
                  {d.text || ' '}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
