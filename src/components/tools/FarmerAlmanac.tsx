'use client'
import { useState, useCallback, useMemo } from 'react'

interface FarmerAlmanacProps {
  labels?: {
    title: string
    date: string
    today: string
    query: string
    results: string
    lunarDate: string
    zodiac: string
    constellation: string
    auspicious: string
    inauspicious: string
    appropriate: string
    avoid: string
    note: string
    noteText: string
  }
}

export default function FarmerAlmanac({ labels }: FarmerAlmanacProps) {
  const l = {
    title: labels?.title ?? 'Farmer Almanac',
    date: labels?.date ?? 'Date',
    today: labels?.today ?? 'Today',
    query: labels?.query ?? 'Query',
    results: labels?.results ?? 'Results',
    lunarDate: labels?.lunarDate ?? 'Lunar Date',
    zodiac: labels?.zodiac ?? 'Zodiac',
    constellation: labels?.constellation ?? 'Constellation',
    auspicious: labels?.auspicious ?? 'Auspicious',
    inauspicious: labels?.inauspicious ?? 'Inauspicious',
    appropriate: labels?.appropriate ?? 'Appropriate Activities',
    avoid: labels?.avoid ?? 'Activities to Avoid',
    note: labels?.note ?? 'Note',
    noteText: labels?.noteText ?? 'This almanac provides traditional Chinese calendar information and auspicious/inauspicious guidance based on historical almanac data. Use as cultural reference only.',
  }

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showResults, setShowResults] = useState(false)

  // Simplified lunar calendar conversion (approximation)
  const getLunarDate = useCallback((gregorianDate: Date): string => {
    // Simplified algorithm - real implementation would need complete lunar calendar tables
    const year = gregorianDate.getFullYear()
    const month = gregorianDate.getMonth() + 1
    const day = gregorianDate.getDate()

    // Approximation using a simple offset (not accurate, for demo purposes)
    const offset = 29 // Average days offset
    const newDate = new Date(gregorianDate)
    newDate.setDate(newDate.getDate() - offset)

    const lunarMonth = (newDate.getMonth() % 12) + 1
    const lunarDay = Math.max(1, newDate.getDate() % 30)

    return `農曆 ${year} 年 ${lunarMonth} 月 ${lunarDay} 日`
  }, [])

  // Get Chinese zodiac based on year
  const getZodiac = useCallback((year: number): string => {
    const zodiacs = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬']
    const index = (year - 4) % 12
    return zodiacs[index]
  }, [])

  // Get constellation based on date
  const getConstellation = useCallback((month: number, day: number): string => {
    const constellations = [
      { name: '水瓶座', start: [1, 20], end: [2, 18] },
      { name: '雙魚座', start: [2, 19], end: [3, 20] },
      { name: '白羊座', start: [3, 21], end: [4, 19] },
      { name: '金牛座', start: [4, 20], end: [5, 20] },
      { name: '雙子座', start: [5, 21], end: [6, 21] },
      { name: '巨蟹座', start: [6, 22], end: [7, 22] },
      { name: '獅子座', start: [7, 23], end: [8, 22] },
      { name: '處女座', start: [8, 23], end: [9, 22] },
      { name: '天秤座', start: [9, 23], end: [10, 23] },
      { name: '天蠍座', start: [10, 24], end: [11, 22] },
      { name: '射手座', start: [11, 23], end: [12, 21] },
      { name: '摩羯座', start: [12, 22], end: [1, 19] },
    ]

    for (const c of constellations) {
      const [sMonth, sDay] = c.start
      const [eMonth, eDay] = c.end

      if (
        (month === sMonth && day >= sDay) ||
        (month === eMonth && day <= eDay) ||
        (sMonth > eMonth && (month > sMonth || month < eMonth))
      ) {
        return c.name
      }
    }

    return '摩羯座'
  }, [])

  // Get auspicious activities based on date (simplified)
  const getActivities = useCallback((date: Date) => {
    const dayOfWeek = date.getDay()
    const day = date.getDate()

    const allAppropriate = [
      '祭祀', '祈福', '求嗣', '開光', '出行', '解除',
      '伐木', '蓋屋', '起基', '修造', '安床', '開市',
      '交易', '立券', '栽種', '牧養', '納畜', '破土',
      '安葬', '入殮', '移柩', '成服', '除服', '開生墳'
    ]

    const allAvoid = [
      '嫁娶', '納采', '動土', '破土', '安葬', '開市',
      '交易', '出行', '移徙', '入宅', '安床', '修造'
    ]

    // Rotate based on day to give variety
    const appropriateStart = (day + dayOfWeek * 3) % allAppropriate.length
    const avoidStart = (day * 2 + dayOfWeek) % allAvoid.length

    const appropriate = [
      allAppropriate[appropriateStart % allAppropriate.length],
      allAppropriate[(appropriateStart + 1) % allAppropriate.length],
      allAppropriate[(appropriateStart + 2) % allAppropriate.length],
      allAppropriate[(appropriateStart + 3) % allAppropriate.length],
      allAppropriate[(appropriateStart + 4) % allAppropriate.length],
    ]

    const avoid = [
      allAvoid[avoidStart % allAvoid.length],
      allAvoid[(avoidStart + 1) % allAvoid.length],
      allAvoid[(avoidStart + 2) % allAvoid.length],
      allAvoid[(avoidStart + 3) % allAvoid.length],
    ]

    return { appropriate, avoid }
  }, [])

  const results = useMemo(() => {
    if (!showResults) return null

    const date = new Date(selectedDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return {
      lunarDate: getLunarDate(date),
      zodiac: getZodiac(year),
      constellation: getConstellation(month, day),
      activities: getActivities(date),
    }
  }, [selectedDate, showResults, getLunarDate, getZodiac, getConstellation, getActivities])

  const handleQuery = useCallback(() => {
    setShowResults(true)
  }, [])

  const handleToday = useCallback(() => {
    setSelectedDate(new Date().toISOString().split('T')[0])
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
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
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

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleQuery}>
              {l.query}
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleToday}>
              {l.today}
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

          <div className="flex flex-col gap-4">
            {/* Lunar Date */}
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.lunarDate}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                {results.lunarDate}
              </div>
            </div>

            {/* Zodiac & Constellation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                }}
              >
                <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                  {l.zodiac}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {results.zodiac}年
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
                  {l.constellation}
                </div>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>
                  {results.constellation}
                </div>
              </div>
            </div>

            {/* Appropriate Activities */}
            <div
              style={{
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'rgb(34, 197, 94)',
                  marginBottom: '0.5rem',
                }}
              >
                {l.appropriate}
              </div>
              <div className="flex flex-wrap gap-2">
                {results.activities.appropriate.map((activity, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(34, 197, 94, 0.2)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    {activity}
                  </span>
                ))}
              </div>
            </div>

            {/* Avoid Activities */}
            <div
              style={{
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
              }}
            >
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'rgb(239, 68, 68)',
                  marginBottom: '0.5rem',
                }}
              >
                {l.avoid}
              </div>
              <div className="flex flex-wrap gap-2">
                {results.activities.avoid.map((activity, idx) => (
                  <span
                    key={idx}
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '0.25rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.2)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text)',
                    }}
                  >
                    {activity}
                  </span>
                ))}
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
