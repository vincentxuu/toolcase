'use client'
import { useState, useCallback, useMemo } from 'react'

interface SunriseSunsetCalculatorProps {
  labels?: {
    title: string
    date: string
    latitude: string
    longitude: string
    getLocation: string
    calculate: string
    results: string
    sunrise: string
    sunset: string
    solarNoon: string
    dayLength: string
    twilightBegin: string
    twilightEnd: string
    hours: string
    minutes: string
    note: string
    noteText: string
  }
}

export default function SunriseSunsetCalculator({ labels }: SunriseSunsetCalculatorProps) {
  const l = {
    title: labels?.title ?? 'Sunrise & Sunset Calculator',
    date: labels?.date ?? 'Date',
    latitude: labels?.latitude ?? 'Latitude',
    longitude: labels?.longitude ?? 'Longitude',
    getLocation: labels?.getLocation ?? 'Use My Location',
    calculate: labels?.calculate ?? 'Calculate',
    results: labels?.results ?? 'Results',
    sunrise: labels?.sunrise ?? 'Sunrise',
    sunset: labels?.sunset ?? 'Sunset',
    solarNoon: labels?.solarNoon ?? 'Solar Noon',
    dayLength: labels?.dayLength ?? 'Day Length',
    twilightBegin: labels?.twilightBegin ?? 'Civil Twilight Begin',
    twilightEnd: labels?.twilightEnd ?? 'Civil Twilight End',
    hours: labels?.hours ?? 'hours',
    minutes: labels?.minutes ?? 'minutes',
    note: labels?.note ?? 'Note',
    noteText: labels?.noteText ?? 'Times are calculated for the specified location and date using astronomical formulas. Actual times may vary slightly due to atmospheric conditions.',
  }

  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [latitude, setLatitude] = useState(25.033)  // Taipei
  const [longitude, setLongitude] = useState(121.5654)
  const [showResults, setShowResults] = useState(false)

  // Astronomical calculations
  const calculateSunTimes = useCallback((lat: number, lng: number, dateStr: string) => {
    const d = new Date(dateStr)
    const n = Math.floor((d.getTime() / 86400000) + 2440588) - 2451545

    // Mean solar time
    const J = n - lng / 360

    // Solar mean anomaly
    const M = (357.5291 + 0.98560028 * J) % 360

    // Equation of center
    const C = 1.9148 * Math.sin(M * Math.PI / 180) +
              0.02 * Math.sin(2 * M * Math.PI / 180) +
              0.0003 * Math.sin(3 * M * Math.PI / 180)

    // Ecliptic longitude
    const lambda = (M + C + 180 + 102.9372) % 360

    // Solar transit
    const Jtransit = 2451545 + J + 0.0053 * Math.sin(M * Math.PI / 180) -
                     0.0069 * Math.sin(2 * lambda * Math.PI / 180)

    // Declination of the sun
    const delta = Math.asin(Math.sin(lambda * Math.PI / 180) *
                           Math.sin(23.44 * Math.PI / 180)) * 180 / Math.PI

    // Hour angle
    const latRad = lat * Math.PI / 180
    const deltaRad = delta * Math.PI / 180
    const cosH = (Math.sin(-0.83 * Math.PI / 180) - Math.sin(latRad) * Math.sin(deltaRad)) /
                 (Math.cos(latRad) * Math.cos(deltaRad))

    if (cosH > 1) {
      // Polar night
      return null
    } else if (cosH < -1) {
      // Polar day
      return null
    }

    const H = Math.acos(cosH) * 180 / Math.PI

    // Sunrise and sunset
    const Jrise = Jtransit - H / 360
    const Jset = Jtransit + H / 360

    // Civil twilight
    const cosH_twilight = (Math.sin(-6 * Math.PI / 180) - Math.sin(latRad) * Math.sin(deltaRad)) /
                          (Math.cos(latRad) * Math.cos(deltaRad))
    const H_twilight = Math.acos(Math.min(1, Math.max(-1, cosH_twilight))) * 180 / Math.PI
    const Jtwi_begin = Jtransit - H_twilight / 360
    const Jtwi_end = Jtransit + H_twilight / 360

    // Convert Julian day to time
    const julianToTime = (jd: number) => {
      const hours = ((jd - Math.floor(jd)) * 24 + 12) % 24
      const h = Math.floor(hours)
      const m = Math.floor((hours - h) * 60)
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    }

    return {
      sunrise: julianToTime(Jrise),
      sunset: julianToTime(Jset),
      solarNoon: julianToTime(Jtransit),
      twilightBegin: julianToTime(Jtwi_begin),
      twilightEnd: julianToTime(Jtwi_end),
      dayLength: H * 2 / 15, // Convert to hours
    }
  }, [])

  const results = useMemo(() => {
    if (!showResults) return null
    return calculateSunTimes(latitude, longitude, date)
  }, [showResults, latitude, longitude, date, calculateSunTimes])

  const handleGetLocation = useCallback(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(Number(position.coords.latitude.toFixed(4)))
        setLongitude(Number(position.coords.longitude.toFixed(4)))
      })
    }
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.date}
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.latitude}
              </label>
              <input
                type="number"
                step="0.0001"
                value={latitude}
                onChange={(e) => setLatitude(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '0.875rem',
                }}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.longitude}
              </label>
              <input
                type="number"
                step="0.0001"
                value={longitude}
                onChange={(e) => setLongitude(Number(e.target.value))}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  backgroundColor: 'var(--color-bg)',
                  color: 'var(--color-text)',
                  fontSize: '0.875rem',
                }}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={() => setShowResults(true)}>
              {l.calculate}
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleGetLocation}>
              {l.getLocation}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      {showResults && results && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {l.results}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.sunrise}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {results.sunrise}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.sunset}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {results.sunset}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.solarNoon}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {results.solarNoon}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.dayLength}
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                {Math.floor(results.dayLength)}h {Math.round((results.dayLength % 1) * 60)}m
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.twilightBegin}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {results.twilightBegin}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.twilightEnd}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {results.twilightEnd}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}
      >
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'rgb(59, 130, 246)' }}>
          {l.note}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {l.noteText}
        </p>
      </div>
    </div>
  )
}
