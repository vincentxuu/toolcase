'use client'
import { useState, useMemo } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface IntegerBaseConverterProps {
  labels?: {
    inputPlaceholder: string
    inputBase: string
    binary: string
    octal: string
    decimal: string
    hexadecimal: string
    customBase: string
    conversions: string
    copy: string
    copied: string
    invalidInput: string
  }
}

const BASES = [
  { name: 'Binary', short: 'BIN', base: 2 },
  { name: 'Octal', short: 'OCT', base: 8 },
  { name: 'Decimal', short: 'DEC', base: 10 },
  { name: 'Hexadecimal', short: 'HEX', base: 16 },
] as const

function isValidForBase(input: string, base: number): boolean {
  if (!input) return false
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz'
  const validDigits = digits.substring(0, base)
  const cleaned = input.toLowerCase().replace(/^-/, '')
  if (cleaned.length === 0) return false
  for (const ch of cleaned) {
    if (!validDigits.includes(ch)) return false
  }
  return true
}

function convertBase(input: string, fromBase: number, toBase: number): string {
  if (!input) return ''
  try {
    const negative = input.startsWith('-')
    const cleaned = negative ? input.substring(1) : input

    // Parse to BigInt using the from base
    let value = BigInt(0)
    const digits = '0123456789abcdefghijklmnopqrstuvwxyz'
    for (const ch of cleaned.toLowerCase()) {
      const digit = digits.indexOf(ch)
      if (digit === -1 || digit >= fromBase) return ''
      value = value * BigInt(fromBase) + BigInt(digit)
    }

    // Convert to target base
    if (value === BigInt(0)) return '0'

    let result = ''
    let remaining = value
    while (remaining > BigInt(0)) {
      const digit = Number(remaining % BigInt(toBase))
      result = digits[digit] + result
      remaining = remaining / BigInt(toBase)
    }

    if (toBase === 16) result = result.toUpperCase()

    return negative ? '-' + result : result
  } catch {
    return ''
  }
}

export default function IntegerBaseConverter({ labels }: IntegerBaseConverterProps) {
  const l = {
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter a number...',
    inputBase: labels?.inputBase ?? 'Input Base',
    binary: labels?.binary ?? 'Binary',
    octal: labels?.octal ?? 'Octal',
    decimal: labels?.decimal ?? 'Decimal',
    hexadecimal: labels?.hexadecimal ?? 'Hexadecimal',
    customBase: labels?.customBase ?? 'Custom',
    conversions: labels?.conversions ?? 'Conversions',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    invalidInput: labels?.invalidInput ?? 'Invalid input for selected base',
  }

  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [customBase, setCustomBase] = useState(10)
  const [useCustom, setUseCustom] = useState(false)

  const activeBase = useCustom ? customBase : fromBase

  const isValid = useMemo(() => {
    if (!input) return true
    return isValidForBase(input, activeBase)
  }, [input, activeBase])

  const conversions = useMemo(() => {
    if (!input || !isValid) return {}
    const results: Record<number, string> = {}
    for (const b of BASES) {
      results[b.base] = convertBase(input, activeBase, b.base)
    }
    if (useCustom && ![2, 8, 10, 16].includes(customBase)) {
      results[customBase] = convertBase(input, activeBase, customBase)
    }
    return results
  }, [input, activeBase, isValid, useCustom, customBase])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
  }

  const baseButtonStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.875rem',
    border: active ? 'none' : '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? 'white' : 'var(--color-text)',
  })

  const resultStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    wordBreak: 'break-all',
    color: 'var(--color-text)',
    lineHeight: 1.5,
  }

  const baseNames: Record<number, string> = {
    2: l.binary,
    8: l.octal,
    10: l.decimal,
    16: l.hexadecimal,
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input base selector */}
      <div>
        <span style={labelStyle}>{l.inputBase}</span>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginTop: '0.375rem' }}>
          {BASES.map((b) => (
            <button
              key={b.base}
              style={baseButtonStyle(!useCustom && fromBase === b.base)}
              onClick={() => { setFromBase(b.base); setUseCustom(false) }}
            >
              {b.short} ({b.base})
            </button>
          ))}
          <button
            style={baseButtonStyle(useCustom)}
            onClick={() => setUseCustom(true)}
          >
            {l.customBase}
          </button>
          {useCustom && (
            <input
              type="number"
              min={2}
              max={36}
              value={customBase}
              onChange={(e) => setCustomBase(Math.max(2, Math.min(36, parseInt(e.target.value) || 2)))}
              style={{
                width: '4rem',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            />
          )}
        </div>
      </div>

      {/* Input field */}
      <input
        type="text"
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ height: 'auto', padding: '0.75rem', fontFamily: 'monospace', fontSize: '1rem' }}
        placeholder={l.inputPlaceholder}
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
      />

      {/* Error */}
      {input && !isValid && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--color-error)',
          fontSize: '0.875rem',
        }}>
          {l.invalidInput}
        </div>
      )}

      {/* Conversions */}
      {input && isValid && Object.keys(conversions).length > 0 && (
        <div className="flex flex-col gap-3">
          <span style={labelStyle}>{l.conversions}</span>
          {BASES.map((b) => (
            <div key={b.base} className="flex flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, fontFamily: 'monospace' }}>
                {baseNames[b.base] ?? `Base ${b.base}`} ({b.short})
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ ...resultStyle, flex: 1 }}>
                  {conversions[b.base] || ''}
                </div>
                {conversions[b.base] && (
                  <CopyButton text={conversions[b.base]} label={l.copy} copiedLabel={l.copied} />
                )}
              </div>
            </div>
          ))}
          {useCustom && customBase && ![2, 8, 10, 16].includes(customBase) && conversions[customBase] && (
            <div className="flex flex-col gap-1">
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, fontFamily: 'monospace' }}>
                Base {customBase}
              </span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ ...resultStyle, flex: 1 }}>
                  {conversions[customBase]}
                </div>
                <CopyButton text={conversions[customBase]} label={l.copy} copiedLabel={l.copied} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
