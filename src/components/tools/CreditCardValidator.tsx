'use client'
import { useState, useCallback } from 'react'

interface CreditCardValidatorProps {
  labels?: {
    title: string
    inputLabel: string
    inputPlaceholder: string
    validate: string
    clear: string
    result: string
    valid: string
    invalid: string
    cardType: string
    cardNumber: string
    unknown: string
    // Card types
    visa: string
    mastercard: string
    amex: string
    discover: string
    dinersclub: string
    jcb: string
    unionpay: string
  }
}

interface ValidationResult {
  isValid: boolean
  cardType: string
  message: string
}

// Luhn algorithm for card validation
function luhnCheck(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, '')
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Detect card type based on number pattern
function detectCardType(cardNumber: string): string {
  const digits = cardNumber.replace(/\D/g, '')

  // Visa: starts with 4
  if (/^4/.test(digits)) return 'visa'

  // MasterCard: starts with 51-55 or 2221-2720
  if (/^5[1-5]/.test(digits) || /^2(2[2-9][1-9]|[3-6][0-9]{2}|7[0-1][0-9]|720)/.test(digits)) {
    return 'mastercard'
  }

  // American Express: starts with 34 or 37
  if (/^3[47]/.test(digits)) return 'amex'

  // Discover: starts with 6011, 622126-622925, 644-649, or 65
  if (/^6011/.test(digits) || /^62212[6-9]/.test(digits) || /^6229[01][0-9]/.test(digits) ||
      /^62292[0-5]/.test(digits) || /^64[4-9]/.test(digits) || /^65/.test(digits)) {
    return 'discover'
  }

  // Diners Club: starts with 300-305, 36, or 38
  if (/^3(0[0-5]|[68])/.test(digits)) return 'dinersclub'

  // JCB: starts with 3528-3589
  if (/^35(2[89]|[3-8][0-9])/.test(digits)) return 'jcb'

  // UnionPay: starts with 62
  if (/^62/.test(digits) && digits.length >= 16) return 'unionpay'

  return 'unknown'
}

export default function CreditCardValidator({ labels }: CreditCardValidatorProps) {
  const l = {
    title: labels?.title ?? 'Credit Card Validator',
    inputLabel: labels?.inputLabel ?? 'Card Number',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter credit card number...',
    validate: labels?.validate ?? 'Validate',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Result',
    valid: labels?.valid ?? 'Valid',
    invalid: labels?.invalid ?? 'Invalid',
    cardType: labels?.cardType ?? 'Card Type',
    cardNumber: labels?.cardNumber ?? 'Card Number',
    unknown: labels?.unknown ?? 'Unknown',
    visa: labels?.visa ?? 'Visa',
    mastercard: labels?.mastercard ?? 'MasterCard',
    amex: labels?.amex ?? 'American Express',
    discover: labels?.discover ?? 'Discover',
    dinersclub: labels?.dinersclub ?? 'Diners Club',
    jcb: labels?.jcb ?? 'JCB',
    unionpay: labels?.unionpay ?? 'UnionPay',
  }

  const cardTypeLabels: Record<string, string> = {
    visa: l.visa,
    mastercard: l.mastercard,
    amex: l.amex,
    discover: l.discover,
    dinersclub: l.dinersclub,
    jcb: l.jcb,
    unionpay: l.unionpay,
    unknown: l.unknown,
  }

  const [input, setInput] = useState('')
  const [result, setResult] = useState<ValidationResult | null>(null)

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setResult(null)
      return
    }

    const isValid = luhnCheck(input)
    const cardType = detectCardType(input)

    setResult({
      isValid,
      cardType,
      message: isValid ? l.valid : l.invalid,
    })
  }, [input, l.valid, l.invalid])

  const handleClear = useCallback(() => {
    setInput('')
    setResult(null)
  }, [])

  // Auto-format card number with spaces
  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '')
    const parts = digits.match(/.{1,4}/g) || []
    return parts.join(' ')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setInput(formatted)
    // Clear result when input changes
    if (result) setResult(null)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Input section */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.875rem' }}>
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
            fontSize: '1rem',
          }}
          maxLength={23} // Max length with spaces for 19 digits
        />
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          className="btn-primary"
          onClick={handleValidate}
          disabled={!input.trim()}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          {l.validate}
        </button>
        <button
          className="btn-secondary"
          onClick={handleClear}
          disabled={!input && !result}
          style={{ flex: 1, justifyContent: 'center' }}
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

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Validation status */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Status:</span>
              <span
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  color: result.isValid ? '#10b981' : '#ef4444',
                }}
              >
                {result.isValid ? '✓ ' : '✗ '}
                {result.message}
              </span>
            </div>

            {/* Card type */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.cardType}:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>
                {cardTypeLabels[result.cardType] || l.unknown}
              </span>
            </div>

            {/* Card number */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{l.cardNumber}:</span>
              <span style={{ fontSize: '0.875rem', fontFamily: "'Fira Code', monospace" }}>
                {input}
              </span>
            </div>
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
        <strong style={{ color: 'var(--color-text)' }}>Note:</strong> This tool validates card number format using the Luhn algorithm.
        It does not verify if the card is active or has funds. All validation happens in your browser.
      </div>
    </div>
  )
}
