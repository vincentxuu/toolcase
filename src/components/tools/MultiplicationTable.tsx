'use client'
import { useState } from 'react'

interface MultiplicationTableProps {
  labels?: {
    range: string
    highlight: string
    clickToCopy: string
    copied: string
  }
}

export default function MultiplicationTable({ labels }: MultiplicationTableProps) {
  const l = {
    range: labels?.range ?? '範圍',
    highlight: labels?.highlight ?? '點擊格子可複製算式',
    clickToCopy: labels?.clickToCopy ?? '點擊複製',
    copied: labels?.copied ?? '已複製！',
  }

  const [maxNum, setMaxNum] = useState(9)
  const [highlighted, setHighlighted] = useState<string | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const nums = Array.from({ length: maxNum }, (_, i) => i + 1)

  const handleClick = (a: number, b: number) => {
    const text = `${a} × ${b} = ${a * b}`
    navigator.clipboard.writeText(text)
    const key = `${a}-${b}`
    setHighlighted(key)
    setCopiedText(text)
    setTimeout(() => { setHighlighted(null); setCopiedText(null) }, 1200)
  }

  const cellBase: React.CSSProperties = {
    padding: '0.4rem 0.3rem',
    textAlign: 'center',
    borderBottom: '1px solid var(--color-border)',
    borderRight: '1px solid var(--color-border)',
    fontSize: maxNum > 12 ? '0.7rem' : '0.85rem',
    cursor: 'pointer',
    transition: 'background 0.15s',
    whiteSpace: 'nowrap',
  }

  return (
    <div className="flex flex-col gap-4">
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <label className="font-semibold">{l.range}</label>
        <select
          value={maxNum}
          onChange={(e) => setMaxNum(Number(e.target.value))}
          style={{ padding: '0.4rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
        >
          {[9, 12, 15, 19].map((n) => (
            <option key={n} value={n}>1 ~ {n}</option>
          ))}
        </select>
        {copiedText && (
          <span style={{ fontSize: '0.85rem', color: 'var(--color-primary)', fontWeight: 600 }}>{l.copied} {copiedText}</span>
        )}
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...cellBase, fontWeight: 700, backgroundColor: 'var(--color-bg-secondary)', minWidth: '2rem' }}>×</th>
              {nums.map((n) => (
                <th key={n} style={{ ...cellBase, fontWeight: 700, backgroundColor: 'var(--color-bg-secondary)', minWidth: '2.5rem' }}>{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {nums.map((a) => (
              <tr key={a}>
                <td style={{ ...cellBase, fontWeight: 700, backgroundColor: 'var(--color-bg-secondary)' }}>{a}</td>
                {nums.map((b) => {
                  const key = `${a}-${b}`
                  const isHL = highlighted === key
                  return (
                    <td
                      key={b}
                      onClick={() => handleClick(a, b)}
                      title={`${a} × ${b} = ${a * b}`}
                      style={{
                        ...cellBase,
                        backgroundColor: isHL ? 'var(--color-primary)' : a === b ? 'var(--color-bg-secondary)' : 'transparent',
                        color: isHL ? '#fff' : 'inherit',
                        fontWeight: a === b ? 600 : 400,
                      }}
                    >
                      {a * b}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>{l.highlight}</p>
    </div>
  )
}
