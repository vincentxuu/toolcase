'use client'
import { useState, useCallback } from 'react'
import { diffLines, diffJson, Change } from 'diff'

interface JsonDiffComparatorProps {
  labels?: {
    title: string
    leftJson: string
    rightJson: string
    leftPlaceholder: string
    rightPlaceholder: string
    compare: string
    clear: string
    viewMode: string
    unifiedView: string
    splitView: string
    jsonMode: string
    textMode: string
    formatJson: string
    invalidJson: string
    noDifferences: string
    differences: string
    added: string
    removed: string
    unchanged: string
  }
}

export default function JsonDiffComparator({ labels }: JsonDiffComparatorProps) {
  const l = {
    title: labels?.title ?? 'JSON Diff Comparator',
    leftJson: labels?.leftJson ?? 'Original JSON',
    rightJson: labels?.rightJson ?? 'Modified JSON',
    leftPlaceholder: labels?.leftPlaceholder ?? 'Paste original JSON here...',
    rightPlaceholder: labels?.rightPlaceholder ?? 'Paste modified JSON here...',
    compare: labels?.compare ?? 'Compare',
    clear: labels?.clear ?? 'Clear',
    viewMode: labels?.viewMode ?? 'View Mode',
    unifiedView: labels?.unifiedView ?? 'Unified',
    splitView: labels?.splitView ?? 'Split',
    jsonMode: labels?.jsonMode ?? 'JSON Mode',
    textMode: labels?.textMode ?? 'Text Mode',
    formatJson: labels?.formatJson ?? 'Format JSON',
    invalidJson: labels?.invalidJson ?? 'Invalid JSON',
    noDifferences: labels?.noDifferences ?? 'No differences found',
    differences: labels?.differences ?? 'Differences',
    added: labels?.added ?? 'Added',
    removed: labels?.removed ?? 'Removed',
    unchanged: labels?.unchanged ?? 'Unchanged',
  }

  const [leftInput, setLeftInput] = useState('')
  const [rightInput, setRightInput] = useState('')
  const [diff, setDiff] = useState<Change[]>([])
  const [viewMode, setViewMode] = useState<'unified' | 'split'>('unified')
  const [compareMode, setCompareMode] = useState<'json' | 'text'>('json')
  const [error, setError] = useState('')

  const handleCompare = useCallback(() => {
    if (!leftInput || !rightInput) return

    setError('')
    try {
      let result: Change[]

      if (compareMode === 'json') {
        // Try to parse as JSON
        const leftObj = JSON.parse(leftInput)
        const rightObj = JSON.parse(rightInput)
        result = diffJson(leftObj, rightObj)
      } else {
        // Compare as text
        result = diffLines(leftInput, rightInput)
      }

      setDiff(result)
    } catch (e) {
      setError(`${l.invalidJson}: ${(e as Error).message}`)
      setDiff([])
    }
  }, [leftInput, rightInput, compareMode, l.invalidJson])

  const handleFormatJson = useCallback((input: string, setter: (value: string) => void) => {
    try {
      const parsed = JSON.parse(input)
      setter(JSON.stringify(parsed, null, 2))
      setError('')
    } catch (e) {
      setError(`${l.invalidJson}: ${(e as Error).message}`)
    }
  }, [l.invalidJson])

  const handleClear = useCallback(() => {
    setLeftInput('')
    setRightInput('')
    setDiff([])
    setError('')
  }, [])

  const renderDiffLine = (change: Change, index: number) => {
    const backgroundColor = change.added
      ? 'rgba(34, 197, 94, 0.15)'
      : change.removed
      ? 'rgba(239, 68, 68, 0.15)'
      : 'transparent'

    const borderLeftColor = change.added
      ? 'rgb(34, 197, 94)'
      : change.removed
      ? 'rgb(239, 68, 68)'
      : 'var(--color-border)'

    const prefix = change.added ? '+ ' : change.removed ? '- ' : '  '

    return (
      <div
        key={index}
        style={{
          backgroundColor,
          borderLeft: `3px solid ${borderLeftColor}`,
          padding: '0.25rem 0.5rem',
          fontFamily: 'monospace',
          fontSize: '0.875rem',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
        }}
      >
        <span style={{ color: 'var(--color-text-tertiary)', marginRight: '0.5rem' }}>
          {prefix}
        </span>
        {change.value}
      </div>
    )
  }

  const renderSplitView = () => {
    const leftChanges: Change[] = []
    const rightChanges: Change[] = []

    diff.forEach((change) => {
      if (change.removed) {
        leftChanges.push(change)
      } else if (change.added) {
        rightChanges.push(change)
      } else {
        leftChanges.push(change)
        rightChanges.push(change)
      }
    })

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
            {l.leftJson}
          </h3>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              overflow: 'auto',
              maxHeight: '400px',
            }}
          >
            {leftChanges.map((change, i) => renderDiffLine(change, i))}
          </div>
        </div>
        <div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-text-secondary)' }}>
            {l.rightJson}
          </h3>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              overflow: 'auto',
              maxHeight: '400px',
            }}
          >
            {rightChanges.map((change, i) => renderDiffLine(change, i))}
          </div>
        </div>
      </div>
    )
  }

  const stats = {
    added: diff.filter((c) => c.added).length,
    removed: diff.filter((c) => c.removed).length,
    unchanged: diff.filter((c) => !c.added && !c.removed).length,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn-primary" onClick={handleCompare}>
          {l.compare}
        </button>
        <button className="btn-secondary" onClick={handleClear}>
          {l.clear}
        </button>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {/* Compare Mode */}
          <select
            value={compareMode}
            onChange={(e) => setCompareMode(e.target.value as 'json' | 'text')}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="json">{l.jsonMode}</option>
            <option value="text">{l.textMode}</option>
          </select>

          {/* View Mode */}
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value as 'unified' | 'split')}
            style={{
              padding: '0.5rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="unified">{l.unifiedView}</option>
            <option value="split">{l.splitView}</option>
          </select>
        </div>
      </div>

      {/* Input Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>{l.leftJson}</label>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={() => handleFormatJson(leftInput, setLeftInput)}
            >
              {l.formatJson}
            </button>
          </div>
          <textarea
            className="tool-textarea"
            style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.875rem' }}
            placeholder={l.leftPlaceholder}
            value={leftInput}
            onChange={(e) => setLeftInput(e.target.value)}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600 }}>{l.rightJson}</label>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={() => handleFormatJson(rightInput, setRightInput)}
            >
              {l.formatJson}
            </button>
          </div>
          <textarea
            className="tool-textarea"
            style={{ minHeight: '200px', fontFamily: 'monospace', fontSize: '0.875rem' }}
            placeholder={l.rightPlaceholder}
            value={rightInput}
            onChange={(e) => setRightInput(e.target.value)}
          />
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      {/* Diff Results */}
      {diff.length > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{l.differences}</h3>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem' }}>
              <span style={{ color: 'rgb(34, 197, 94)' }}>
                {l.added}: {stats.added}
              </span>
              <span style={{ color: 'rgb(239, 68, 68)' }}>
                {l.removed}: {stats.removed}
              </span>
              <span style={{ color: 'var(--color-text-tertiary)' }}>
                {l.unchanged}: {stats.unchanged}
              </span>
            </div>
          </div>

          {viewMode === 'unified' ? (
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                overflow: 'auto',
                maxHeight: '400px',
              }}
            >
              {diff.map((change, i) => renderDiffLine(change, i))}
            </div>
          ) : (
            renderSplitView()
          )}

          {stats.added === 0 && stats.removed === 0 && (
            <div
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--color-text-secondary)',
                backgroundColor: 'var(--color-bg-secondary)',
                borderRadius: '0.5rem',
              }}
            >
              {l.noDifferences}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
