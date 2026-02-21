'use client'
import { useState, useCallback, useEffect } from 'react'

interface IpAddressLookupProps {
  labels?: {
    yourIp: string
    lookupIp: string
    lookup: string
    detectMyIp: string
    ip: string
    city: string
    region: string
    country: string
    isp: string
    timezone: string
    coordinates: string
    loading: string
    error: string
    placeholder: string
  }
}

interface IpDetails {
  ip: string
  city: string
  region: string
  country_name: string
  org: string
  timezone: string
  latitude: number
  longitude: number
}

export default function IpAddressLookup({ labels }: IpAddressLookupProps) {
  const l = {
    yourIp: labels?.yourIp ?? 'Your IP Address',
    lookupIp: labels?.lookupIp ?? 'Look Up IP Address',
    lookup: labels?.lookup ?? 'Look Up',
    detectMyIp: labels?.detectMyIp ?? 'Detect My IP',
    ip: labels?.ip ?? 'IP Address',
    city: labels?.city ?? 'City',
    region: labels?.region ?? 'Region',
    country: labels?.country ?? 'Country',
    isp: labels?.isp ?? 'ISP / Organization',
    timezone: labels?.timezone ?? 'Timezone',
    coordinates: labels?.coordinates ?? 'Coordinates',
    loading: labels?.loading ?? 'Loading...',
    error: labels?.error ?? 'Error fetching IP details. Please try again.',
    placeholder: labels?.placeholder ?? 'Enter an IP address...',
  }

  const [myIp, setMyIp] = useState('')
  const [inputIp, setInputIp] = useState('')
  const [details, setDetails] = useState<IpDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchDetails = useCallback(async (ip: string) => {
    setLoading(true)
    setError('')
    setDetails(null)
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      if (data.error) throw new Error(data.reason || 'Invalid IP')
      setDetails(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : l.error)
    } finally {
      setLoading(false)
    }
  }, [l.error])

  const detectMyIp = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://api.ipify.org?format=json')
      const data = await res.json()
      setMyIp(data.ip)
      setInputIp(data.ip)
      await fetchDetails(data.ip)
    } catch {
      setError(l.error)
      setLoading(false)
    }
  }, [fetchDetails, l.error])

  const handleLookup = useCallback(() => {
    if (!inputIp.trim()) return
    fetchDetails(inputIp.trim())
  }, [inputIp, fetchDetails])

  useEffect(() => {
    detectMyIp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '200px',
  }

  const cardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const rows: { label: string; value: string }[] = details ? [
    { label: l.ip, value: details.ip },
    { label: l.city, value: details.city || '-' },
    { label: l.region, value: details.region || '-' },
    { label: l.country, value: details.country_name || '-' },
    { label: l.isp, value: details.org || '-' },
    { label: l.timezone, value: details.timezone || '-' },
    { label: l.coordinates, value: details.latitude && details.longitude ? `${details.latitude}, ${details.longitude}` : '-' },
  ] : []

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {myIp && (
        <div style={cardStyle}>
          <span style={labelStyle}>{l.yourIp}: </span>
          <span style={{ color: 'var(--color-text)', fontWeight: 600, fontFamily: 'monospace' }}>{myIp}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.lookupIp}:</label>
          <input
            type="text"
            value={inputIp}
            onChange={(e) => setInputIp(e.target.value)}
            placeholder={l.placeholder}
            style={inputStyle}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
          />
        </div>
        <button className="btn-primary" onClick={handleLookup} disabled={!inputIp.trim() || loading}>
          {l.lookup}
        </button>
        <button className="btn-secondary" onClick={detectMyIp} disabled={loading}>
          {l.detectMyIp}
        </button>
      </div>

      {loading && <p style={{ color: 'var(--color-text-secondary)' }}>{l.loading}</p>}
      {error && <p style={{ color: '#ef4444' }}>{error}</p>}

      {details && (
        <div style={{
          ...cardStyle,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
        }}>
          {rows.map((row) => (
            <div key={row.label} style={{ display: 'flex', gap: '1rem', padding: '0.5rem 0', borderBottom: '1px solid var(--color-border)' }}>
              <span style={{ ...labelStyle, minWidth: '140px' }}>{row.label}</span>
              <span style={{ color: 'var(--color-text)', fontFamily: 'monospace' }}>{row.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
