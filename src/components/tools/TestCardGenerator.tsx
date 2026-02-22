'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface TestCardGeneratorProps {
  labels?: {
    title: string
    cardType: string
    generate: string
    generatedCard: string
    copy: string
    copied: string
    note: string
  }
}

// Generate a valid card number using Luhn algorithm
function generateCardNumber(prefix: string, length: number): string {
  const numberLength = length - 1 // Reserve last digit for checksum
  let number = prefix

  // Generate random digits to fill the length
  while (number.length < numberLength) {
    number += Math.floor(Math.random() * 10)
  }

  // Calculate Luhn checksum
  let sum = 0
  let isEven = true

  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  const checksum = (10 - (sum % 10)) % 10
  return number + checksum
}

const cardTypes = [
  { name: 'Visa', prefix: '4', length: 16, color: '#1A1F71' },
  { name: 'MasterCard', prefix: '5', length: 16, color: '#EB001B' },
  { name: 'American Express', prefix: '34', length: 15, color: '#006FCF' },
  { name: 'Discover', prefix: '6011', length: 16, color: '#FF6000' },
  { name: 'JCB', prefix: '35', length: 16, color: '#0E4C96' },
  { name: 'Diners Club', prefix: '36', length: 14, color: '#0079BE' },
]

export default function TestCardGenerator({ labels }: TestCardGeneratorProps) {
  const l = {
    title: labels?.title ?? 'Test Card Generator',
    cardType: labels?.cardType ?? 'Card Type',
    generate: labels?.generate ?? 'Generate',
    generatedCard: labels?.generatedCard ?? 'Generated Card Number',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    note: labels?.note ?? 'Note: These are test card numbers for development purposes only.',
  }

  const [selectedType, setSelectedType] = useState(cardTypes[0])
  const [generatedNumber, setGeneratedNumber] = useState<string>('')

  const handleGenerate = useCallback(() => {
    const cardNumber = generateCardNumber(selectedType.prefix, selectedType.length)
    const formatted = cardNumber.match(/.{1,4}/g)?.join(' ') || cardNumber
    setGeneratedNumber(formatted)
  }, [selectedType])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Card type selection */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          {l.cardType}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
          {cardTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: selectedType.name === type.name ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: selectedType.name === type.name ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Generate button */}
      <button
        className="btn-primary"
        onClick={handleGenerate}
        style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}
      >
        {l.generate}
      </button>

      {/* Generated card number */}
      {generatedNumber && (
        <div
          style={{
            position: 'relative',
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-primary)',
          }}
        >
          <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--color-text-secondary)' }}>
            {l.generatedCard}
          </div>

          <div style={{
            fontFamily: "'Fira Code', monospace",
            fontSize: '1.5rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            marginBottom: '0.75rem',
            wordBreak: 'break-all',
          }}>
            {generatedNumber}
          </div>

          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            {selectedType.name}
          </div>

          <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
            <CopyButton text={generatedNumber} label={l.copy} copiedLabel={l.copied} />
          </div>
        </div>
      )}

      {/* Warning note */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid #ef4444',
          fontSize: '0.813rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: '#ef4444' }}>⚠️ Warning:</strong> {l.note} These numbers pass Luhn validation but are NOT real credit cards.
        Use them only for testing payment forms, not for actual transactions.
      </div>
    </div>
  )
}
