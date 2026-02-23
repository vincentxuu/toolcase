'use client'
import { useState, useCallback } from 'react'

interface TaxIdValidatorProps {
  labels?: {
    title: string
    inputLabel: string
    inputPlaceholder: string
    validate: string
    clear: string
    result: string
    valid: string
    invalid: string
    format: string
    status: string
  }
}

// Taiwan Business Tax ID (統一編號) validation
function validateTaxId(id: string): boolean {
  const digits = id.replace(/\D/g, '')
  if (digits.length !== 8) return false

  const weights = [1, 2, 1, 2, 1, 2, 4, 1]
  let sum = 0

  for (let i = 0; i < 8; i++) {
    let product = parseInt(digits[i], 10) * weights[i]
    sum += Math.floor(product / 10) + (product % 10)
  }

  // Special case for 7th digit = 7
  if (parseInt(digits[6], 10) === 7 && (sum % 10 === 0 || (sum + 1) % 10 === 0)) {
    return true
  }

  return sum % 10 === 0 || (sum % 5 === 0 && parseInt(digits[6], 10) === 7)
}

export default function TaxIdValidator({ labels }: TaxIdValidatorProps) {
  const l = {
    title: labels?.title ?? 'Taiwan Tax ID Validator',
    inputLabel: labels?.inputLabel ?? 'Tax ID (統一編號)',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter 8-digit tax ID...',
    validate: labels?.validate ?? 'Validate',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    valid: labels?.valid ?? 'Valid',
    invalid: labels?.invalid ?? 'Invalid',
    format: labels?.format ?? 'Format',
    status: labels?.status ?? 'Status',
  }

  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ isValid: boolean } | null>(null)

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setResult(null)
      return
    }

    const isValid = validateTaxId(input)
    setResult({ isValid })
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setResult(null)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 8)
    setInput(value)
    if (result) setResult(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input section */}
      <div>
        <label className="block font-medium mb-2 text-sm">
          {l.inputLabel}
        </label>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder={l.inputPlaceholder}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontFamily: "'Fira Code', monospace",
            fontSize: '1.25rem',
            letterSpacing: '0.2em',
          }}
          maxLength={8}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleValidate}
          disabled={input.length !== 8}
        >
          {l.validate}
        </button>
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={handleClear}
          disabled={!input && !result}
        >
          {l.clear}
        </button>
      </div>

      {/* Result section */}
      {result && (
        <div
          style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: result.isValid ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
            border: `1px solid ${result.isValid ? '#10b981' : '#ef4444'}`,
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text)' }}>
            {l.result}
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--color-text-secondary)]">{l.status}:</span>
            <span
              style={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: result.isValid ? '#10b981' : '#ef4444',
              }}
            >
              {result.isValid ? '✓ ' : '✗ '}
              {result.isValid ? l.valid : l.invalid}
            </span>
          </div>
        </div>
      )}

      {/* Info note */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          fontSize: '0.813rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <strong className="text-[var(--color-text)]">Note:</strong> This tool validates Taiwan Business Tax ID (統一編號) format using the official algorithm.
        It does not verify if the business is currently active or registered.
      </div>
    </div>
  )
}
