'use client'
import { useState, useCallback } from 'react'

interface PasswordStrengthCheckerProps {
  labels?: {
    title: string
    inputPlaceholder: string
    strength: string
    weak: string
    fair: string
    strong: string
    veryStrong: string
    length: string
    uppercase: string
    lowercase: string
    numbers: string
    symbols: string
    requirements: string
  }
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

export default function PasswordStrengthChecker({ labels }: PasswordStrengthCheckerProps) {
  const l = {
    title: labels?.title ?? 'Password Strength Checker',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter your password to check its strength...',
    strength: labels?.strength ?? 'Strength',
    weak: labels?.weak ?? 'Weak',
    fair: labels?.fair ?? 'Fair',
    strong: labels?.strong ?? 'Strong',
    veryStrong: labels?.veryStrong ?? 'Very Strong',
    length: labels?.length ?? 'Length',
    uppercase: labels?.uppercase ?? 'Uppercase letters',
    lowercase: labels?.lowercase ?? 'Lowercase letters',
    numbers: labels?.numbers ?? 'Numbers',
    symbols: labels?.symbols ?? 'Symbols',
    requirements: labels?.requirements ?? 'Requirements',
  }

  const strengthLabels = [l.weak, l.fair, l.strong, l.veryStrong]
  const [password, setPassword] = useState('')

  const strength = getStrength(password)

  const requirements = [
    { label: `${l.length} ≥ 8`, met: password.length >= 8 },
    { label: `${l.length} ≥ 12`, met: password.length >= 12 },
    { label: `${l.length} ≥ 16`, met: password.length >= 16 },
    { label: l.uppercase, met: /[A-Z]/.test(password) },
    { label: l.lowercase, met: /[a-z]/.test(password) },
    { label: l.numbers, met: /\d/.test(password) },
    { label: l.symbols, met: /[^a-zA-Z0-9]/.test(password) },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Password input */}
      <div>
        <textarea
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={l.inputPlaceholder}
          style={{
            width: '100%',
            minHeight: '120px',
            padding: '1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontFamily: "'Fira Code', monospace",
            fontSize: '1rem',
            resize: 'vertical',
          }}
        />
      </div>

      {/* Strength indicator */}
      {password && (
        <>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>{l.strength}</span>
              <span style={{ color: strength.color, fontWeight: 700 }}>{strengthLabels[strength.level]}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.25rem', height: '0.5rem' }}>
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    borderRadius: '0.25rem',
                    backgroundColor: i <= strength.level ? strength.color : 'var(--color-border)',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Requirements checklist */}
          <div>
            <div style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.75rem', color: 'var(--color-text)' }}>
              {l.requirements}
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              {requirements.map((req, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    backgroundColor: req.met ? 'rgba(16, 185, 129, 0.1)' : 'var(--color-bg-secondary)',
                    color: req.met ? '#10b981' : 'var(--color-text-secondary)',
                    fontSize: '0.875rem',
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{req.met ? '✓' : '○'}</span>
                  <span>{req.label}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
