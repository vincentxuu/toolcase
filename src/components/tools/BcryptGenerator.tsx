'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface BcryptGeneratorProps {
  labels?: {
    generate: string
    clear: string
    copy: string
    copied: string
    password: string
    algorithm: string
    hash: string
    useSalt: string
    salt: string
    generateSalt: string
    saltedInput: string
    passwordPlaceholder: string
    saltPlaceholder: string
  }
}

type Algorithm = 'SHA-256' | 'SHA-384' | 'SHA-512'

async function computeHash(algorithm: Algorithm, text: string): Promise<string> {
  const data = new TextEncoder().encode(text)
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

function generateRandomSalt(length: number = 16): string {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array).map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function BcryptGenerator({ labels }: BcryptGeneratorProps) {
  const l = {
    generate: labels?.generate ?? 'Generate Hash',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    password: labels?.password ?? 'Password',
    algorithm: labels?.algorithm ?? 'Algorithm',
    hash: labels?.hash ?? 'Hash Result',
    useSalt: labels?.useSalt ?? 'Use salt',
    salt: labels?.salt ?? 'Salt',
    generateSalt: labels?.generateSalt ?? 'Generate Salt',
    saltedInput: labels?.saltedInput ?? 'Salted input',
    passwordPlaceholder: labels?.passwordPlaceholder ?? 'Enter password to hash...',
    saltPlaceholder: labels?.saltPlaceholder ?? 'Enter or generate a salt...',
  }

  const [password, setPassword] = useState('')
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256')
  const [useSalt, setUseSalt] = useState(false)
  const [salt, setSalt] = useState('')
  const [hashResult, setHashResult] = useState('')
  const [saltedInput, setSaltedInput] = useState('')
  const [computing, setComputing] = useState(false)

  const handleGenerate = useCallback(async () => {
    if (!password) return
    setComputing(true)
    try {
      const input = useSalt ? salt + password : password
      setSaltedInput(useSalt ? input : '')
      const hash = await computeHash(algorithm, input)
      setHashResult(hash)
    } catch {
      setHashResult('Error computing hash')
    }
    setComputing(false)
  }, [password, algorithm, useSalt, salt])

  const handleGenerateSalt = useCallback(() => {
    setSalt(generateRandomSalt())
  }, [])

  const handleClear = useCallback(() => {
    setPassword('')
    setSalt('')
    setHashResult('')
    setSaltedInput('')
  }, [])

  const inputStyle: React.CSSProperties = {
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '0.375rem',
    display: 'block',
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label style={labelStyle}>{l.password}</label>
        <input
          type="text"
          style={inputStyle}
          placeholder={l.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div>
          <label style={labelStyle}>{l.algorithm}</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
            style={{
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="SHA-256">SHA-256</option>
            <option value="SHA-384">SHA-384</option>
            <option value="SHA-512">SHA-512</option>
          </select>
        </div>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', cursor: 'pointer', paddingBottom: '0.625rem' }}>
          <input
            type="checkbox"
            checked={useSalt}
            onChange={(e) => setUseSalt(e.target.checked)}
            style={{ cursor: 'pointer' }}
          />
          {l.useSalt}
        </label>
      </div>

      {useSalt && (
        <div>
          <label style={labelStyle}>{l.salt}</label>
          <div className="flex gap-2">
            <input
              type="text"
              style={{ ...inputStyle, flex: 1 }}
              placeholder={l.saltPlaceholder}
              value={salt}
              onChange={(e) => setSalt(e.target.value)}
            />
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleGenerateSalt} style={{ whiteSpace: 'nowrap' }}>
              {l.generateSalt}
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleGenerate} disabled={computing}>
          {l.generate}
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>{l.clear}</button>
      </div>

      {useSalt && saltedInput && (
        <div>
          <label style={{ ...labelStyle, fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{l.saltedInput}</label>
          <div
            style={{
              padding: '0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              wordBreak: 'break-all',
              color: 'var(--color-text-secondary)',
            }}
          >
            {saltedInput}
          </div>
        </div>
      )}

      {hashResult && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
            <label style={labelStyle}>{l.hash} ({algorithm})</label>
            <CopyButton text={hashResult} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div
            style={{
              padding: '0.75rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              wordBreak: 'break-all',
              color: 'var(--color-text)',
              lineHeight: 1.5,
            }}
          >
            {hashResult}
          </div>
        </div>
      )}
    </div>
  )
}
