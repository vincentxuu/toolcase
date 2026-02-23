'use client'
import { useState, useCallback } from 'react'

interface TaiwanIdValidatorProps {
  labels?: {
    businessId: string
    nationalId: string
    validate: string
    valid: string
    invalid: string
    generate: string
    male: string
    female: string
    enterBusinessId: string
    enterNationalId: string
    businessIdDesc: string
    nationalIdDesc: string
    generator: string
    disclaimer: string
  }
}

const letterMap: Record<string, number> = {
  A: 10, B: 11, C: 12, D: 13, E: 14, F: 15, G: 16, H: 17, I: 34,
  J: 18, K: 19, L: 20, M: 21, N: 22, O: 35, P: 23, Q: 24, R: 25,
  S: 26, T: 27, U: 28, V: 29, W: 32, X: 30, Y: 31, Z: 33,
}

const businessWeights = [1, 2, 1, 2, 1, 2, 4, 1]

function validateBusinessId(id: string): boolean {
  if (!/^\d{8}$/.test(id)) return false
  const digits = id.split('').map(Number)
  let sum = 0
  for (let i = 0; i < 8; i++) {
    const product = digits[i] * businessWeights[i]
    sum += product >= 10 ? Math.floor(product / 10) + (product % 10) : product
  }
  if (sum % 5 === 0) return true
  if (digits[6] === 7 && (sum + 1) % 5 === 0) return true
  return false
}

function validateNationalId(id: string): boolean {
  const upper = id.toUpperCase()
  if (!/^[A-Z]\d{9}$/.test(upper)) return false
  const letterCode = letterMap[upper[0]]
  if (letterCode === undefined) return false
  const allDigits = [Math.floor(letterCode / 10), letterCode % 10, ...upper.slice(1).split('').map(Number)]
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  let sum = 0
  for (let i = 0; i < 11; i++) {
    sum += allDigits[i] * weights[i]
  }
  return sum % 10 === 0
}

function randomBusinessId(): string {
  while (true) {
    const digits: number[] = []
    for (let i = 0; i < 8; i++) {
      digits.push(Math.floor(Math.random() * 10))
    }
    const id = digits.join('')
    if (validateBusinessId(id)) return id
  }
}

function randomNationalId(): string {
  const letters = Object.keys(letterMap)
  const letter = letters[Math.floor(Math.random() * letters.length)]
  const gender = [1, 2, 8, 9][Math.floor(Math.random() * 4)]
  const middle: number[] = []
  for (let i = 0; i < 7; i++) {
    middle.push(Math.floor(Math.random() * 10))
  }
  const letterCode = letterMap[letter]
  const allDigits = [Math.floor(letterCode / 10), letterCode % 10, gender, ...middle]
  const weights = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1]
  let sum = 0
  for (let i = 0; i < 10; i++) {
    sum += allDigits[i] * weights[i]
  }
  const checkDigit = (10 - (sum % 10)) % 10
  return letter + gender + middle.join('') + checkDigit
}

function getGenderInfo(id: string, maleLabel: string, femaleLabel: string): string | null {
  if (id.length < 2) return null
  const d = id[1]
  if (d === '1') return maleLabel
  if (d === '2') return femaleLabel
  if (d === '8' || d === '9') return `New format (${d})`
  return null
}

export default function TaiwanIdValidator({ labels }: TaiwanIdValidatorProps) {
  const l = {
    businessId: labels?.businessId ?? 'Business ID (統一編號)',
    nationalId: labels?.nationalId ?? 'National ID (身分證字號)',
    validate: labels?.validate ?? 'Validate',
    valid: labels?.valid ?? 'Valid',
    invalid: labels?.invalid ?? 'Invalid',
    generate: labels?.generate ?? 'Generate Random',
    male: labels?.male ?? 'Male',
    female: labels?.female ?? 'Female',
    enterBusinessId: labels?.enterBusinessId ?? 'Enter 8-digit business ID',
    enterNationalId: labels?.enterNationalId ?? 'Enter ID (e.g. A123456789)',
    businessIdDesc: labels?.businessIdDesc ?? 'Validate a Taiwan business registration number (統一編號).',
    nationalIdDesc: labels?.nationalIdDesc ?? 'Validate a Taiwan national identification number (身分證字號).',
    generator: labels?.generator ?? 'Random Generator',
    disclaimer: labels?.disclaimer ?? 'This tool only validates the format. It does not confirm whether the ID actually exists.',
  }

  const [bizId, setBizId] = useState('')
  const [bizResult, setBizResult] = useState<boolean | null>(null)
  const [natId, setNatId] = useState('')
  const [natResult, setNatResult] = useState<boolean | null>(null)
  const [natGender, setNatGender] = useState<string | null>(null)

  const handleBizValidate = useCallback(() => {
    setBizResult(validateBusinessId(bizId.trim()))
  }, [bizId])

  const handleNatValidate = useCallback(() => {
    const trimmed = natId.trim()
    setNatResult(validateNationalId(trimmed))
    setNatGender(getGenderInfo(trimmed.toUpperCase(), l.male, l.female))
  }, [natId, l.male, l.female])

  const handleGenBiz = useCallback(() => {
    const id = randomBusinessId()
    setBizId(id)
    setBizResult(true)
  }, [])

  const handleGenNat = useCallback(() => {
    const id = randomNationalId()
    setNatId(id)
    setNatResult(true)
    setNatGender(getGenderInfo(id, l.male, l.female))
  }, [l.male, l.female])

  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontFamily: 'monospace',
    fontSize: '1rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
  }

  const resultStyle = (isValid: boolean | null): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.375rem',
    padding: '0.375rem 0.75rem',
    borderRadius: '0.375rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    backgroundColor: isValid ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
    color: isValid ? 'var(--color-success)' : 'var(--color-error)',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Business ID Section */}
      <div style={sectionStyle}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{l.businessId}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{l.businessIdDesc}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            maxLength={8}
            placeholder={l.enterBusinessId}
            value={bizId}
            onChange={(e) => { setBizId(e.target.value); setBizResult(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleBizValidate()}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleBizValidate} style={{ whiteSpace: 'nowrap' }}>
            {l.validate}
          </button>
        </div>
        {bizResult !== null && (
          <div style={resultStyle(bizResult)}>
            {bizResult ? `\u2713 ${l.valid}` : `\u2717 ${l.invalid}`}
          </div>
        )}
      </div>

      {/* National ID Section */}
      <div style={sectionStyle}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{l.nationalId}</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>{l.nationalIdDesc}</p>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            maxLength={10}
            placeholder={l.enterNationalId}
            value={natId}
            onChange={(e) => { setNatId(e.target.value); setNatResult(null); setNatGender(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleNatValidate()}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleNatValidate} style={{ whiteSpace: 'nowrap' }}>
            {l.validate}
          </button>
        </div>
        {natResult !== null && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <div style={resultStyle(natResult)}>
              {natResult ? `\u2713 ${l.valid}` : `\u2717 ${l.invalid}`}
            </div>
            {natResult && natGender && (
              <span className="text-sm text-[var(--color-text-secondary)]">
                ({natGender})
              </span>
            )}
          </div>
        )}
      </div>

      {/* Random Generator Section */}
      <div style={sectionStyle}>
        <h3 className="font-semibold mb-3">{l.generator}</h3>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
            onClick={handleGenBiz}
            style={{ flex: '1 1 auto', justifyContent: 'center' }}
          >
            {l.generate} {l.businessId}
          </button>
          <button
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
            onClick={handleGenNat}
            style={{ flex: '1 1 auto', justifyContent: 'center' }}
          >
            {l.generate} {l.nationalId}
          </button>
        </div>
      </div>

      {/* Disclaimer */}
      <p style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        fontStyle: 'italic',
        margin: 0,
      }}>
        {l.disclaimer}
      </p>
    </div>
  )
}
