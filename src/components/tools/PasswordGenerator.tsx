'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface PasswordGeneratorProps {
  labels?: {
    length: string
    uppercase: string
    lowercase: string
    numbers: string
    symbols: string
    generate: string
    copy: string
    copied: string
    strength: string
    weak: string
    fair: string
    strong: string
    veryStrong: string
  }
}

function generatePassword(length: number, upper: boolean, lower: boolean, nums: boolean, syms: boolean) {
  let chars = ''
  if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  if (lower) chars += 'abcdefghijklmnopqrstuvwxyz'
  if (nums) chars += '0123456789'
  if (syms) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
  if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'
  const arr = new Uint32Array(length)
  crypto.getRandomValues(arr)
  return Array.from(arr, (v) => chars[v % chars.length]).join('')
}

function getStrength(pwd: string): { level: number; color: string } {
  let score = 0
  if (pwd.length >= 8) score++
  if (pwd.length >= 12) score++
  if (pwd.length >= 16) score++
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++
  if (/\d/.test(pwd)) score++
  if (/[^a-zA-Z0-9]/.test(pwd)) score++
  if (score <= 2) return { level: 0, color: '#ef4444' }
  if (score <= 3) return { level: 1, color: '#f59e0b' }
  if (score <= 4) return { level: 2, color: '#3b82f6' }
  return { level: 3, color: '#10b981' }
}

export default function PasswordGenerator({ labels }: PasswordGeneratorProps) {
  const l = {
    length: labels?.length ?? 'Length',
    uppercase: labels?.uppercase ?? 'Uppercase (A-Z)',
    lowercase: labels?.lowercase ?? 'Lowercase (a-z)',
    numbers: labels?.numbers ?? 'Numbers (0-9)',
    symbols: labels?.symbols ?? 'Symbols (!@#$)',
    generate: labels?.generate ?? 'Generate',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    strength: labels?.strength ?? 'Strength',
    weak: labels?.weak ?? 'Weak',
    fair: labels?.fair ?? 'Fair',
    strong: labels?.strong ?? 'Strong',
    veryStrong: labels?.veryStrong ?? 'Very Strong',
  }

  const strengthLabels = [l.weak, l.fair, l.strong, l.veryStrong]
  const [length, setLength] = useState(16)
  const [upper, setUpper] = useState(true)
  const [lower, setLower] = useState(true)
  const [nums, setNums] = useState(true)
  const [syms, setSyms] = useState(true)
  const [password, setPassword] = useState(() => generatePassword(16, true, true, true, true))

  const handleGenerate = useCallback(() => {
    setPassword(generatePassword(length, upper, lower, nums, syms))
  }, [length, upper, lower, nums, syms])

  const strength = getStrength(password)

  const checkStyle = (checked: boolean): React.CSSProperties => ({
    padding: '0.75rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', userSelect: 'none',
    backgroundColor: checked ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: checked ? 'white' : 'var(--color-text)',
    border: checked ? 'none' : '1px solid var(--color-border)',
    fontWeight: 500, fontSize: '0.875rem', textAlign: 'center',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Password display */}
      <div style={{
        position: 'relative', padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)', fontFamily: "'Fira Code', monospace", fontSize: '1.25rem',
        wordBreak: 'break-all', letterSpacing: '0.05em', lineHeight: 1.6,
      }}>
        {password}
        <div className="absolute top-2 right-2">
          <CopyButton text={password} label={l.copy} copiedLabel={l.copied} />
        </div>
      </div>

      {/* Strength bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
          <span className="text-[var(--color-text-secondary)]">{l.strength}</span>
          <span style={{ color: strength.color, fontWeight: 600 }}>{strengthLabels[strength.level]}</span>
        </div>
        <div style={{ display: 'flex', gap: '0.25rem', height: '0.5rem' }}>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} style={{
              flex: 1, borderRadius: '0.25rem',
              backgroundColor: i <= strength.level ? strength.color : 'var(--color-border)',
            }} />
          ))}
        </div>
      </div>

      {/* Length slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{l.length}</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 700 }}>{length}</span>
        </div>
        <input type="range" min={4} max={64} value={length} onChange={(e) => { setLength(Number(e.target.value)); setPassword(generatePassword(Number(e.target.value), upper, lower, nums, syms)) }}
          style={{ width: '100%', accentColor: 'var(--color-primary)' }} />
      </div>

      {/* Character options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div style={checkStyle(upper)} onClick={() => { setUpper(!upper); setPassword(generatePassword(length, !upper, lower, nums, syms)) }}>{l.uppercase}</div>
        <div style={checkStyle(lower)} onClick={() => { setLower(!lower); setPassword(generatePassword(length, upper, !lower, nums, syms)) }}>{l.lowercase}</div>
        <div style={checkStyle(nums)} onClick={() => { setNums(!nums); setPassword(generatePassword(length, upper, lower, !nums, syms)) }}>{l.numbers}</div>
        <div style={checkStyle(syms)} onClick={() => { setSyms(!syms); setPassword(generatePassword(length, upper, lower, nums, !syms)) }}>{l.symbols}</div>
      </div>

      <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleGenerate} style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.875rem' }}>
        {l.generate}
      </button>
    </div>
  )
}
