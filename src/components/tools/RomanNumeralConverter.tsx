'use client'
import { useState, useMemo } from 'react'

interface RomanNumeralConverterProps {
  labels?: {
    decimal: string
    roman: string
    decimalToRoman: string
    romanToDecimal: string
    conversionTable: string
    invalidInput: string
    outOfRange: string
  }
}

const romanMap: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

const tableRows = [
  { decimal: 1, roman: 'I' }, { decimal: 4, roman: 'IV' }, { decimal: 5, roman: 'V' },
  { decimal: 9, roman: 'IX' }, { decimal: 10, roman: 'X' }, { decimal: 40, roman: 'XL' },
  { decimal: 50, roman: 'L' }, { decimal: 90, roman: 'XC' }, { decimal: 100, roman: 'C' },
  { decimal: 400, roman: 'CD' }, { decimal: 500, roman: 'D' }, { decimal: 900, roman: 'CM' },
  { decimal: 1000, roman: 'M' },
]

function decToRoman(num: number): string {
  if (num < 1 || num > 3999 || !Number.isInteger(num)) return ''
  let result = ''
  let remaining = num
  for (const [value, symbol] of romanMap) {
    while (remaining >= value) {
      result += symbol
      remaining -= value
    }
  }
  return result
}

function romanToDec(str: string): number | null {
  const upper = str.toUpperCase().trim()
  if (!upper || !/^[MDCLXVI]+$/.test(upper)) return null
  const map: Record<string, number> = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
  let total = 0
  for (let i = 0; i < upper.length; i++) {
    const current = map[upper[i]]
    const next = i + 1 < upper.length ? map[upper[i + 1]] : 0
    if (current < next) total -= current
    else total += current
  }
  if (total < 1 || total > 3999) return null
  // Validate by converting back
  if (decToRoman(total) !== upper) return null
  return total
}

export default function RomanNumeralConverter({ labels }: RomanNumeralConverterProps) {
  const l = {
    decimal: labels?.decimal ?? 'Decimal Number',
    roman: labels?.roman ?? 'Roman Numeral',
    decimalToRoman: labels?.decimalToRoman ?? 'Decimal to Roman',
    romanToDecimal: labels?.romanToDecimal ?? 'Roman to Decimal',
    conversionTable: labels?.conversionTable ?? 'Conversion Table',
    invalidInput: labels?.invalidInput ?? 'Invalid input',
    outOfRange: labels?.outOfRange ?? 'Number must be between 1 and 3999',
  }

  const [decInput, setDecInput] = useState('')
  const [romanInput, setRomanInput] = useState('')

  const romanResult = useMemo(() => {
    const num = parseInt(decInput, 10)
    if (isNaN(num)) return ''
    if (num < 1 || num > 3999) return l.outOfRange
    return decToRoman(num)
  }, [decInput, l.outOfRange])

  const decResult = useMemo(() => {
    if (!romanInput.trim()) return ''
    const result = romanToDec(romanInput)
    if (result === null) return l.invalidInput
    return result.toString()
  }, [romanInput, l.invalidInput])

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }
  const resultStyle: React.CSSProperties = {
    padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)', fontSize: '1.5rem', fontWeight: 700,
    textAlign: 'center', color: 'var(--color-primary)', minHeight: '3.5rem',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  }
  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
  }
  const isError = (text: string) => text === l.invalidInput || text === l.outOfRange

  return (
    <div className="flex flex-col gap-6">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={sectionStyle}>
          <div className="text-base font-semibold mb-4">{l.decimalToRoman}</div>
          <div className="mb-3">
            <label style={labelStyle}>{l.decimal}</label>
            <input
              type="number"
              style={inputStyle}
              value={decInput}
              onChange={(e) => setDecInput(e.target.value)}
              placeholder="1-3999"
              min={1}
              max={3999}
            />
          </div>
          <div style={{ ...resultStyle, color: isError(romanResult) ? '#ef4444' : 'var(--color-primary)', fontSize: isError(romanResult) ? '0.875rem' : '1.5rem' }}>
            {romanResult || '—'}
          </div>
        </div>

        <div style={sectionStyle}>
          <div className="text-base font-semibold mb-4">{l.romanToDecimal}</div>
          <div className="mb-3">
            <label style={labelStyle}>{l.roman}</label>
            <input
              type="text"
              style={{ ...inputStyle, textTransform: 'uppercase' }}
              value={romanInput}
              onChange={(e) => setRomanInput(e.target.value)}
              placeholder="MCMXCIX"
            />
          </div>
          <div style={{ ...resultStyle, color: isError(decResult) ? '#ef4444' : 'var(--color-primary)', fontSize: isError(decResult) ? '0.875rem' : '1.5rem' }}>
            {decResult || '—'}
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <div className="text-base font-semibold mb-4">{l.conversionTable}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.5rem' }}>
          {tableRows.map((row) => (
            <div key={row.decimal} style={{
              padding: '0.5rem', borderRadius: '0.375rem', border: '1px solid var(--color-border)',
              textAlign: 'center', fontSize: '0.85rem',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--color-primary)' }}>{row.roman}</div>
              <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.75rem' }}>{row.decimal}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
