'use client'
import { useState, useEffect } from 'react'

interface WorldClockProps {
  labels?: {
    title: string
    searchPlaceholder: string
  }
}

interface TimeZone {
  name: string
  city: string
  offset: string
  time: string
  date: string
}

const popularTimezones = [
  { name: 'America/New_York', city: 'New York' },
  { name: 'America/Los_Angeles', city: 'Los Angeles' },
  { name: 'America/Chicago', city: 'Chicago' },
  { name: 'Europe/London', city: 'London' },
  { name: 'Europe/Paris', city: 'Paris' },
  { name: 'Europe/Berlin', city: 'Berlin' },
  { name: 'Asia/Tokyo', city: 'Tokyo' },
  { name: 'Asia/Shanghai', city: 'Shanghai' },
  { name: 'Asia/Hong_Kong', city: 'Hong Kong' },
  { name: 'Asia/Singapore', city: 'Singapore' },
  { name: 'Asia/Dubai', city: 'Dubai' },
  { name: 'Asia/Taipei', city: 'Taipei' },
  { name: 'Australia/Sydney', city: 'Sydney' },
  { name: 'Pacific/Auckland', city: 'Auckland' },
  { name: 'America/Toronto', city: 'Toronto' },
  { name: 'America/Sao_Paulo', city: 'São Paulo' },
]

export default function WorldClock({ labels }: WorldClockProps) {
  const l = {
    title: labels?.title ?? 'World Clock',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search city...',
  }

  const [currentTime, setCurrentTime] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getTimeZoneInfo = (tz: { name: string; city: string }): TimeZone => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz.name,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz.name,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })

    // Get offset
    const offsetFormatter = new Intl.DateTimeFormat('en-US', {
      timeZone: tz.name,
      timeZoneName: 'shortOffset',
    })
    const parts = offsetFormatter.formatToParts(currentTime)
    const offsetPart = parts.find(part => part.type === 'timeZoneName')
    const offset = offsetPart ? offsetPart.value : ''

    return {
      name: tz.name,
      city: tz.city,
      offset,
      time: formatter.format(currentTime),
      date: dateFormatter.format(currentTime),
    }
  }

  const filteredTimezones = popularTimezones.filter(tz =>
    tz.city.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const timezones = filteredTimezones.map(getTimeZoneInfo)

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={l.searchPlaceholder}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Timezone grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {timezones.map((tz) => (
          <div
            key={tz.name}
            style={{
              padding: '1.25rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
              <div>
                <div style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {tz.city}
                </div>
                <div className="text-xs text-[var(--color-text-secondary)]">
                  {tz.offset}
                </div>
              </div>
            </div>

            <div style={{ fontFamily: "'Fira Code', monospace", fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {tz.time}
            </div>

            <div className="text-sm text-[var(--color-text-secondary)]">
              {tz.date}
            </div>
          </div>
        ))}
      </div>

      {filteredTimezones.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
          No cities found matching &quot;{searchTerm}&quot;
        </div>
      )}
    </div>
  )
}
