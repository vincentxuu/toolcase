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

  const addedCount = diff.filter(d => d.type === 'added').length
  const removedCount = diff.filter(d => d.type === 'removed').length

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.original}</label>
          <textarea className="w-full min-h-[200px] p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm font-['Fira_Code',monospace] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" value={original} onChange={(e) => setOriginal(e.target.value)} />
        </div>
        <div>
          <label className="block mb-1.5 font-medium text-sm text-[var(--color-text-secondary)]">{l.modified}</label>
          <textarea className="w-full min-h-[200px] p-3 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] text-sm font-['Fira_Code',monospace] resize-y focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]" value={modified} onChange={(e) => setModified(e.target.value)} />
        </div>
      </div>
      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0 self-center" onClick={compare}>{l.compare}</button>
      {compared && (
        <div>
          <div className="flex gap-4 mb-3 text-sm">
            <span className="text-green-500">+ {addedCount} {l.added}</span>
            <span className="text-red-500">- {removedCount} {l.removed}</span>
          </div>
          {diff.length === 0 || (addedCount === 0 && removedCount === 0) ? (
            <p className="text-[var(--color-text-secondary)]">{l.noChanges}</p>
          ) : (
            <div className="rounded-lg overflow-hidden border border-[var(--color-border)] font-['Fira_Code',monospace] text-[0.8rem]">
              {diff.map((d, idx) => (
                <div
                  key={idx}
                  className={`py-1 px-3 ${
                    d.type === 'added'
                      ? 'bg-green-500/10 border-l-[3px] border-l-green-500 text-green-500'
                      : d.type === 'removed'
                      ? 'bg-red-500/10 border-l-[3px] border-l-red-500 text-red-500'
                      : 'border-l-[3px] border-l-transparent text-[var(--color-text)]'
                  }`}
                >
                  <span className="opacity-50 mr-2">{d.type === 'added' ? '+' : d.type === 'removed' ? '-' : ' '}</span>
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
