'use client'
import { useState, useMemo } from 'react'

interface ChmodCalculatorProps {
  labels?: {
    owner: string
    group: string
    others: string
    read: string
    write: string
    execute: string
    numeric: string
    symbolic: string
    command: string
    copy: string
    copied: string
  }
}

const PERMS = ['read', 'write', 'execute'] as const
const BITS = [4, 2, 1]
const ROLES = ['owner', 'group', 'others'] as const
const LETTERS = ['r', 'w', 'x']

export default function ChmodCalculator({ labels }: ChmodCalculatorProps) {
  const l = {
    owner: labels?.owner ?? 'Owner',
    group: labels?.group ?? 'Group',
    others: labels?.others ?? 'Others',
    read: labels?.read ?? 'Read',
    write: labels?.write ?? 'Write',
    execute: labels?.execute ?? 'Execute',
    numeric: labels?.numeric ?? 'Numeric',
    symbolic: labels?.symbolic ?? 'Symbolic',
    command: labels?.command ?? 'Command',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [perms, setPerms] = useState([
    [true, true, false],  // owner: rw-
    [true, false, false], // group: r--
    [true, false, false], // others: r--
  ])
  const [copied, setCopied] = useState(false)

  const toggle = (role: number, perm: number) => {
    const next = perms.map((r) => [...r])
    next[role][perm] = !next[role][perm]
    setPerms(next)
  }

  const numeric = useMemo(() => perms.map((r) => r.reduce((s, v, i) => s + (v ? BITS[i] : 0), 0)).join(''), [perms])

  const symbolic = useMemo(() =>
    perms.map((r) => r.map((v, i) => (v ? LETTERS[i] : '-')).join('')).join(''), [perms])

  const command = `chmod ${numeric} <file>`

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(command) } catch { /* ignore */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const roleLabels = [l.owner, l.group, l.others]
  const permLabels = [l.read, l.write, l.execute]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '0.5rem', borderBottom: '2px solid var(--color-border)' }}></th>
            {permLabels.map((p) => (
              <th key={p} style={{ textAlign: 'center', padding: '0.5rem', borderBottom: '2px solid var(--color-border)', fontWeight: 600 }}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROLES.map((_, ri) => (
            <tr key={ri}>
              <td style={{ padding: '0.5rem', fontWeight: 600, borderBottom: '1px solid var(--color-border)' }}>{roleLabels[ri]}</td>
              {PERMS.map((_, pi) => (
                <td key={pi} style={{ textAlign: 'center', padding: '0.5rem', borderBottom: '1px solid var(--color-border)' }}>
                  <input type="checkbox" checked={perms[ri][pi]} onChange={() => toggle(ri, pi)} style={{ width: '18px', height: '18px', cursor: 'pointer' }} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
        <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.numeric}</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace' }}>{numeric}</div>
        </div>
        <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.symbolic}</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'monospace' }}>{symbolic}</div>
        </div>
      </div>

      <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)', fontFamily: 'monospace', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{command}</span>
        <button onClick={handleCopy} style={{ padding: '0.3rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.375rem', backgroundColor: 'var(--color-primary)', color: '#fff', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
          {copied ? l.copied : l.copy}
        </button>
      </div>
    </div>
  )
}
