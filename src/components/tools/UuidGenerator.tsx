'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface UuidGeneratorProps {
  labels?: {
    generateUuid: string
    generateUlid: string
    copy: string
    copied: string
    bulkGenerate: string
    version: string
    uuidV4: string
    ulid: string
    result: string
    bulkResult: string
    count: string
  }
}

function generateULID(): string {
  const ENCODING = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'
  const TIME_LEN = 10
  const RANDOM_LEN = 16

  const now = Date.now()
  let timeStr = ''
  let t = now
  for (let i = TIME_LEN - 1; i >= 0; i--) {
    timeStr = ENCODING[t % 32] + timeStr
    t = Math.floor(t / 32)
  }

  let randomStr = ''
  const randomBytes = new Uint8Array(RANDOM_LEN)
  crypto.getRandomValues(randomBytes)
  for (let i = 0; i < RANDOM_LEN; i++) {
    randomStr += ENCODING[randomBytes[i] % 32]
  }

  return timeStr + randomStr
}

export default function UuidGenerator({ labels }: UuidGeneratorProps) {
  const l = {
    generateUuid: labels?.generateUuid ?? 'Generate UUID',
    generateUlid: labels?.generateUlid ?? 'Generate ULID',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    bulkGenerate: labels?.bulkGenerate ?? 'Bulk Generate',
    version: labels?.version ?? 'Version Info',
    uuidV4: labels?.uuidV4 ?? 'UUID v4 (Random)',
    ulid: labels?.ulid ?? 'ULID (Sortable)',
    result: labels?.result ?? 'Result',
    bulkResult: labels?.bulkResult ?? 'Bulk Result',
    count: labels?.count ?? 'Count',
  }

  const [uuid, setUuid] = useState('')
  const [ulid, setUlid] = useState('')
  const [bulkResults, setBulkResults] = useState('')
  const [activeType, setActiveType] = useState<'uuid' | 'ulid'>('uuid')
  const [bulkCount, setBulkCount] = useState(5)

  const handleGenerateUuid = useCallback(() => {
    const id = crypto.randomUUID()
    setUuid(id)
    setActiveType('uuid')
  }, [])

  const handleGenerateUlid = useCallback(() => {
    const id = generateULID()
    setUlid(id)
    setActiveType('ulid')
  }, [])

  const handleBulkGenerate = useCallback(() => {
    const results: string[] = []
    for (let i = 0; i < bulkCount; i++) {
      if (activeType === 'uuid') {
        results.push(crypto.randomUUID())
      } else {
        results.push(generateULID())
      }
    }
    setBulkResults(results.join('\n'))
  }, [activeType, bulkCount])

  const resultStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    fontFamily: 'monospace',
    fontSize: '1rem',
    wordBreak: 'break-all',
    color: 'var(--color-text)',
    lineHeight: 1.6,
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
  }

  const activeTabStyle = (isActive: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.875rem',
    border: 'none',
    backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: isActive ? 'white' : 'var(--color-text)',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Type selector */}
      <div className="flex gap-2">
        <button style={activeTabStyle(activeType === 'uuid')} onClick={() => setActiveType('uuid')}>
          {l.uuidV4}
        </button>
        <button style={activeTabStyle(activeType === 'ulid')} onClick={() => setActiveType('ulid')}>
          {l.ulid}
        </button>
      </div>

      {/* Generate buttons */}
      <div className="flex gap-2 flex-wrap">
        {activeType === 'uuid' ? (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleGenerateUuid}>{l.generateUuid}</button>
        ) : (
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleGenerateUlid}>{l.generateUlid}</button>
        )}
      </div>

      {/* Result */}
      {(activeType === 'uuid' && uuid) && (
        <div className="flex flex-col gap-1">
          <span style={labelStyle}>{l.uuidV4}</span>
          <div className="flex items-center gap-2">
            <div style={{ ...resultStyle, flex: 1 }}>{uuid}</div>
            <CopyButton text={uuid} label={l.copy} copiedLabel={l.copied} />
          </div>
        </div>
      )}

      {(activeType === 'ulid' && ulid) && (
        <div className="flex flex-col gap-1">
          <span style={labelStyle}>{l.ulid}</span>
          <div className="flex items-center gap-2">
            <div style={{ ...resultStyle, flex: 1 }}>{ulid}</div>
            <CopyButton text={ulid} label={l.copy} copiedLabel={l.copied} />
          </div>
        </div>
      )}

      {/* Bulk Generate */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
        <span style={labelStyle}>{l.bulkGenerate}</span>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap' }}>
          {[1, 5, 10, 50].map((count) => (
            <button
              key={count}
              className={bulkCount === count ? 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0' : 'inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]'}
              onClick={() => setBulkCount(count)}
            >
              {count}
            </button>
          ))}
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleBulkGenerate}>
            {l.bulkGenerate} ({bulkCount})
          </button>
        </div>
      </div>

      {bulkResults && (
        <div className="flex flex-col gap-1">
          <span style={labelStyle}>{l.bulkResult}</span>
          <div className="relative">
            <textarea
              className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
              style={{ height: '200px', fontFamily: 'monospace' }}
              value={bulkResults}
              readOnly
            />
            <div className="absolute top-2 right-2">
              <CopyButton text={bulkResults} label={l.copy} copiedLabel={l.copied} />
            </div>
          </div>
        </div>
      )}

      {/* Version info */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.8125rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <span style={{ fontWeight: 600, marginBottom: '0.25rem', display: 'block' }}>{l.version}</span>
        <div><strong>UUID v4:</strong> 128-bit, randomly generated, RFC 4122 compliant. Format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx</div>
        <div><strong>ULID:</strong> 128-bit, timestamp-based sortable ID (Crockford Base32). Format: 10 chars timestamp + 16 chars random</div>
      </div>
    </div>
  )
}
