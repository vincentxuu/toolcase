'use client'
import { useState, useMemo, useCallback } from 'react'

interface LunarCalendarConverterProps {
  labels?: {
    solarToLunar: string
    lunarToSolar: string
    solarDate: string
    lunarDate: string
    year: string
    month: string
    day: string
    leapMonth: string
    convert: string
    heavenlyStem: string
    earthlyBranch: string
    zodiac: string
    result: string
  }
}

const lunarInfo = [
  0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
  0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
  0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
  0x06566, 0x0d4a0, 0x0ea50, 0x16a95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
  0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
  0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5b0, 0x14573, 0x052b0, 0x0a9a8, 0x0e950, 0x06aa0,
  0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
  0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b6a0, 0x195a6,
  0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
  0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x05ac0, 0x0ab60, 0x096d5, 0x092e0,
  0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
  0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
  0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
  0x05aa0, 0x076a3, 0x096d0, 0x04afb, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
  0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0,
  0x14b63, 0x09370, 0x049f8, 0x04970, 0x064b0, 0x168a6, 0x0ea50, 0x06aa0, 0x1a6c4, 0x0aae0,
  0x092e0, 0x0d2e3, 0x0c960, 0x0d557, 0x0d4a0, 0x0da50, 0x05d55, 0x056a0, 0x0a6d0, 0x055d4,
  0x052d0, 0x0a9b8, 0x0a950, 0x0b4a0, 0x0b6a6, 0x0ad50, 0x055a0, 0x0aba4, 0x0a5b0, 0x052b0,
  0x0b273, 0x06930, 0x07337, 0x06aa0, 0x0ad50, 0x14b55, 0x04b60, 0x0a570, 0x054e4, 0x0d160,
  0x0e968, 0x0d520, 0x0daa0, 0x16aa6, 0x056d0, 0x04ae0, 0x0a9d4, 0x0a4d0, 0x0d150, 0x0f252,
  0x0d520,
]

const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬']
const lunarMonthNames = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
const lunarDayNames = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十',
]

function leapMonth(y: number): number {
  return lunarInfo[y - 1900] & 0xf
}

function leapDays(y: number): number {
  if (leapMonth(y)) {
    return (lunarInfo[y - 1900] & 0x10000) ? 30 : 29
  }
  return 0
}

function monthDays(y: number, m: number): number {
  return (lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29
}

function yearDays(y: number): number {
  let sum = 348
  let i = 0x8000
  for (; i > 0x8; i >>= 1) {
    sum += (lunarInfo[y - 1900] & i) ? 1 : 0
  }
  return sum + leapDays(y)
}

function solarToLunar(sY: number, sM: number, sD: number): { year: number; month: number; day: number; isLeap: boolean } | null {
  const baseDate = new Date(1900, 0, 31)
  const targetDate = new Date(sY, sM - 1, sD)
  let offset = Math.round((targetDate.getTime() - baseDate.getTime()) / 86400000)

  if (offset < 0) return null

  let lunarYear = 1900
  let temp = 0
  for (lunarYear = 1900; lunarYear < 2101 && offset > 0; lunarYear++) {
    temp = yearDays(lunarYear)
    offset -= temp
  }
  if (offset < 0) {
    offset += temp
    lunarYear--
  }

  const leap = leapMonth(lunarYear)
  let isLeap = false
  let lunarMonth = 1
  for (lunarMonth = 1; lunarMonth < 13 && offset > 0; lunarMonth++) {
    if (leap > 0 && lunarMonth === (leap + 1) && !isLeap) {
      --lunarMonth
      isLeap = true
      temp = leapDays(lunarYear)
    } else {
      temp = monthDays(lunarYear, lunarMonth)
    }
    if (isLeap && lunarMonth === (leap + 1)) {
      isLeap = false
    }
    offset -= temp
  }

  if (offset === 0 && leap > 0 && lunarMonth === leap + 1) {
    if (isLeap) {
      isLeap = false
    } else {
      isLeap = true
      --lunarMonth
    }
  }
  if (offset < 0) {
    offset += temp
    --lunarMonth
  }

  const lunarDay = offset + 1
  return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap }
}

function lunarToSolar(lY: number, lM: number, lD: number, isLeapMonth: boolean): { year: number; month: number; day: number } | null {
  if (lY < 1900 || lY > 2100) return null

  const leap = leapMonth(lY)
  if (isLeapMonth && leap !== lM) return null

  const maxDay = isLeapMonth ? leapDays(lY) : monthDays(lY, lM)
  if (lD > maxDay || lD < 1) return null

  let offset = 0
  for (let y = 1900; y < lY; y++) {
    offset += yearDays(y)
  }

  let isAfterLeap = false
  for (let m = 1; m < lM; m++) {
    offset += monthDays(lY, m)
    if (m === leap) {
      offset += leapDays(lY)
    }
  }
  if (isLeapMonth) {
    offset += monthDays(lY, lM)
  } else if (!isAfterLeap && leap > 0 && lM > leap) {
    // leap month already counted in the loop
  }

  offset += lD - 1

  const baseDate = new Date(1900, 0, 31)
  const resultDate = new Date(baseDate.getTime() + offset * 86400000)

  return { year: resultDate.getFullYear(), month: resultDate.getMonth() + 1, day: resultDate.getDate() }
}

function getHeavenlyStem(year: number): string {
  return heavenlyStems[(year - 4) % 10]
}

function getEarthlyBranch(year: number): string {
  return earthlyBranches[(year - 4) % 12]
}

function getZodiac(year: number): string {
  return zodiacAnimals[(year - 4) % 12]
}

function getDaysInLunarMonth(y: number, m: number, isLeap: boolean): number {
  if (isLeap) return leapDays(y)
  return monthDays(y, m)
}

export default function LunarCalendarConverter({ labels }: LunarCalendarConverterProps) {
  const l = {
    solarToLunar: labels?.solarToLunar ?? 'Solar to Lunar',
    lunarToSolar: labels?.lunarToSolar ?? 'Lunar to Solar',
    solarDate: labels?.solarDate ?? 'Solar Date',
    lunarDate: labels?.lunarDate ?? 'Lunar Date',
    year: labels?.year ?? 'Year',
    month: labels?.month ?? 'Month',
    day: labels?.day ?? 'Day',
    leapMonth: labels?.leapMonth ?? 'Leap Month',
    convert: labels?.convert ?? 'Convert',
    heavenlyStem: labels?.heavenlyStem ?? 'Heavenly Stem',
    earthlyBranch: labels?.earthlyBranch ?? 'Earthly Branch',
    zodiac: labels?.zodiac ?? 'Zodiac',
    result: labels?.result ?? 'Result',
  }

  const [mode, setMode] = useState<'s2l' | 'l2s'>('s2l')
  const [solarInput, setSolarInput] = useState('')
  const [lunarYear, setLunarYear] = useState(2024)
  const [lunarMonth, setLunarMonth] = useState(1)
  const [lunarDay, setLunarDay] = useState(1)
  const [isLeap, setIsLeap] = useState(false)
  const [result, setResult] = useState<{
    solarDate?: string
    lunarDate?: string
    stem?: string
    branch?: string
    zodiac?: string
    isLeap?: boolean
    lunarYear?: number
  } | null>(null)

  const hasLeapMonth = useMemo(() => {
    const lm = leapMonth(lunarYear)
    return lm > 0 ? lm : 0
  }, [lunarYear])

  const maxDays = useMemo(() => {
    return getDaysInLunarMonth(lunarYear, lunarMonth, isLeap && hasLeapMonth === lunarMonth)
  }, [lunarYear, lunarMonth, isLeap, hasLeapMonth])

  const handleSolarToLunar = useCallback(() => {
    if (!solarInput) return
    const parts = solarInput.split('-')
    if (parts.length !== 3) return
    const [y, m, d] = parts.map(Number)
    if (!y || !m || !d) return
    const lunar = solarToLunar(y, m, d)
    if (!lunar) return
    const leapLabel = lunar.isLeap ? `(${l.leapMonth})` : ''
    setResult({
      solarDate: `${y}/${String(m).padStart(2, '0')}/${String(d).padStart(2, '0')}`,
      lunarDate: `農曆 ${lunar.year}年 ${leapLabel}${lunarMonthNames[lunar.month - 1]}月 ${lunarDayNames[lunar.day - 1]}`,
      stem: getHeavenlyStem(lunar.year),
      branch: getEarthlyBranch(lunar.year),
      zodiac: getZodiac(lunar.year),
      isLeap: lunar.isLeap,
      lunarYear: lunar.year,
    })
  }, [solarInput, l.leapMonth])

  const handleLunarToSolar = useCallback(() => {
    const isLeapInput = isLeap && hasLeapMonth === lunarMonth
    const solar = lunarToSolar(lunarYear, lunarMonth, lunarDay, isLeapInput)
    if (!solar) return
    const leapLabel = isLeapInput ? `(${l.leapMonth})` : ''
    setResult({
      solarDate: `${solar.year}/${String(solar.month).padStart(2, '0')}/${String(solar.day).padStart(2, '0')}`,
      lunarDate: `農曆 ${lunarYear}年 ${leapLabel}${lunarMonthNames[lunarMonth - 1]}月 ${lunarDayNames[lunarDay - 1]}`,
      stem: getHeavenlyStem(lunarYear),
      branch: getEarthlyBranch(lunarYear),
      zodiac: getZodiac(lunarYear),
      isLeap: isLeapInput,
      lunarYear: lunarYear,
    })
  }, [lunarYear, lunarMonth, lunarDay, isLeap, hasLeapMonth, l.leapMonth])

  const handleConvert = useCallback(() => {
    if (mode === 's2l') handleSolarToLunar()
    else handleLunarToSolar()
  }, [mode, handleSolarToLunar, handleLunarToSolar])

  const tabStyle = (active: boolean): React.CSSProperties => ({
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderBottom: active ? '2px solid var(--color-primary)' : '2px solid transparent',
    backgroundColor: 'transparent',
    color: active ? 'var(--color-primary)' : 'var(--color-text-secondary)',
    fontWeight: active ? 600 : 400,
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'color 0.2s, border-color 0.2s',
  })

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.625rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontSize: '0.9rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    flex: 1,
    minWidth: 0,
  }

  const resultRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '120px 1fr',
    gap: '0.375rem',
    fontSize: '0.9rem',
    alignItems: 'center',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Mode tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
        <button style={tabStyle(mode === 's2l')} onClick={() => { setMode('s2l'); setResult(null) }}>
          {l.solarToLunar}
        </button>
        <button style={tabStyle(mode === 'l2s')} onClick={() => { setMode('l2s'); setResult(null) }}>
          {l.lunarToSolar}
        </button>
      </div>

      {/* Input area */}
      <div style={{
        padding: '1.25rem',
        border: '1px solid var(--color-border)',
        borderRadius: '0.75rem',
        backgroundColor: 'var(--color-bg-secondary)',
      }}>
        {mode === 's2l' ? (
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
              {l.solarDate}
            </label>
            <input
              type="date"
              value={solarInput}
              onChange={(e) => setSolarInput(e.target.value)}
              min="1901-01-01"
              max="2100-12-31"
              style={inputStyle}
            />
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '80px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
                  {l.year}
                </label>
                <select value={lunarYear} onChange={(e) => { setLunarYear(Number(e.target.value)); setIsLeap(false) }} style={selectStyle}>
                  {Array.from({ length: 200 }, (_, i) => 1901 + i).map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '80px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
                  {l.month}
                </label>
                <select value={lunarMonth} onChange={(e) => setLunarMonth(Number(e.target.value))} style={selectStyle}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>{lunarMonthNames[m - 1]}月</option>
                  ))}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: '80px' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
                  {l.day}
                </label>
                <select value={lunarDay} onChange={(e) => setLunarDay(Number(e.target.value))} style={selectStyle}>
                  {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{lunarDayNames[d - 1]}</option>
                  ))}
                </select>
              </div>
            </div>
            {hasLeapMonth > 0 && hasLeapMonth === lunarMonth && (
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={isLeap}
                  onChange={(e) => setIsLeap(e.target.checked)}
                  style={{ accentColor: 'var(--color-primary)' }}
                />
                {l.leapMonth} (閏{lunarMonthNames[hasLeapMonth - 1]}月)
              </label>
            )}
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleConvert}
          style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.75rem', marginTop: '1rem' }}
        >
          {l.convert}
        </button>
      </div>

      {/* Result */}
      {result && (
        <div style={{
          padding: '1.25rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{l.result}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={resultRowStyle}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{l.solarDate}:</span>
              <span style={{ fontWeight: 500 }}>{result.solarDate}</span>
            </div>
            <div style={resultRowStyle}>
              <span style={{ color: 'var(--color-text-secondary)' }}>{l.lunarDate}:</span>
              <span style={{ fontWeight: 500 }}>{result.lunarDate}</span>
            </div>
            {result.lunarYear && (
              <>
                <div style={resultRowStyle}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{l.heavenlyStem}:</span>
                  <span style={{ fontWeight: 500 }}>{result.stem}</span>
                </div>
                <div style={resultRowStyle}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>{l.earthlyBranch}:</span>
                  <span style={{ fontWeight: 500 }}>{result.branch}</span>
                </div>
                <div style={resultRowStyle}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {result.stem}{result.branch}年
                  </span>
                  <span style={{ fontWeight: 500, fontSize: '1.25rem' }}>
                    {result.zodiac} ({l.zodiac})
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
