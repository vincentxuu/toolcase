'use client'
import { useState, useMemo } from 'react'

interface ZodiacSignLookupProps {
  labels?: {
    title: string
    selectMonth: string
    selectDay: string
    month: string
    day: string
    lookup: string
    yourSign: string
    dateRange: string
    element: string
    traits: string
    months: string[]
    signs: { name: string; traits: string }[]
    fire: string
    earth: string
    air: string
    water: string
  }
}

const SIGNS = [
  { key: 'capricorn', start: [1, 1], end: [1, 19], element: 'earth' },
  { key: 'aquarius', start: [1, 20], end: [2, 18], element: 'air' },
  { key: 'pisces', start: [2, 19], end: [3, 20], element: 'water' },
  { key: 'aries', start: [3, 21], end: [4, 19], element: 'fire' },
  { key: 'taurus', start: [4, 20], end: [5, 20], element: 'earth' },
  { key: 'gemini', start: [5, 21], end: [6, 21], element: 'air' },
  { key: 'cancer', start: [6, 22], end: [7, 22], element: 'water' },
  { key: 'leo', start: [7, 23], end: [8, 22], element: 'fire' },
  { key: 'virgo', start: [8, 23], end: [9, 22], element: 'earth' },
  { key: 'libra', start: [9, 23], end: [10, 23], element: 'air' },
  { key: 'scorpio', start: [10, 24], end: [11, 22], element: 'water' },
  { key: 'sagittarius', start: [11, 23], end: [12, 21], element: 'fire' },
  { key: 'capricorn2', start: [12, 22], end: [12, 31], element: 'earth' },
]

const EMOJIS = ['♑', '♒', '♓', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐']
const SIGN_RANGES = [
  '12/22 – 1/19', '1/20 – 2/18', '2/19 – 3/20', '3/21 – 4/19',
  '4/20 – 5/20', '5/21 – 6/21', '6/22 – 7/22', '7/23 – 8/22',
  '8/23 – 9/22', '9/23 – 10/23', '10/24 – 11/22', '11/23 – 12/21',
]

const DEFAULT_SIGN_NAMES = [
  { name: '摩羯座 Capricorn', traits: '務實、自律、有耐心、責任感強，目標導向且意志堅定' },
  { name: '水瓶座 Aquarius', traits: '獨立、創新、人道主義、思想前衛，重視自由與社會理想' },
  { name: '雙魚座 Pisces', traits: '感性、富同理心、直覺強、浪漫，想像力豐富且善解人意' },
  { name: '牡羊座 Aries', traits: '勇敢、積極、有活力、領導力強，直率且充滿行動力' },
  { name: '金牛座 Taurus', traits: '穩重、可靠、有耐心、享受生活，重視物質安全與美好事物' },
  { name: '雙子座 Gemini', traits: '聰明、善溝通、適應力強、好奇心旺盛，多才多藝且思維敏捷' },
  { name: '巨蟹座 Cancer', traits: '重感情、顧家、直覺敏銳、保護欲強，溫柔且富有同情心' },
  { name: '獅子座 Leo', traits: '自信、慷慨、有領袖魅力、熱情，喜歡被關注且有創造力' },
  { name: '處女座 Virgo', traits: '細心、分析力強、追求完美、務實，注重細節且有服務精神' },
  { name: '天秤座 Libra', traits: '公平、優雅、善社交、愛好和平，追求平衡與和諧的關係' },
  { name: '天蠍座 Scorpio', traits: '神秘、意志力強、洞察力佳、專注，情感深邃且忠誠' },
  { name: '射手座 Sagittarius', traits: '樂觀、愛冒險、追求自由、哲學思考，熱愛旅行與探索' },
]

const DEFAULT_MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

function getSignIndex(month: number, day: number): number {
  for (let i = 0; i < SIGNS.length; i++) {
    const s = SIGNS[i]
    const afterStart = month > s.start[0] || (month === s.start[0] && day >= s.start[1])
    const beforeEnd = month < s.end[0] || (month === s.end[0] && day <= s.end[1])
    if (afterStart && beforeEnd) {
      if (s.key === 'capricorn2') return 0
      return i
    }
  }
  return 0
}

function daysInMonth(m: number): number {
  return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]
}

export default function ZodiacSignLookup({ labels }: ZodiacSignLookupProps) {
  const l = {
    title: labels?.title ?? '星座查詢',
    selectMonth: labels?.selectMonth ?? '選擇月份',
    selectDay: labels?.selectDay ?? '選擇日期',
    month: labels?.month ?? '月',
    day: labels?.day ?? '日',
    lookup: labels?.lookup ?? '查詢星座',
    yourSign: labels?.yourSign ?? '你的星座',
    dateRange: labels?.dateRange ?? '日期範圍',
    element: labels?.element ?? '元素',
    traits: labels?.traits ?? '性格特質',
    months: labels?.months ?? DEFAULT_MONTHS,
    signs: labels?.signs ?? DEFAULT_SIGN_NAMES,
    fire: labels?.fire ?? '火象',
    earth: labels?.earth ?? '土象',
    air: labels?.air ?? '風象',
    water: labels?.water ?? '水象',
  }

  const elementNames: Record<string, string> = { fire: l.fire, earth: l.earth, air: l.air, water: l.water }
  const elementColors: Record<string, string> = {
    fire: '#ef4444', earth: '#a16207', air: '#6366f1', water: '#0ea5e9',
  }

  const [month, setMonth] = useState(1)
  const [day, setDay] = useState(1)
  const [result, setResult] = useState<number | null>(null)

  const maxDay = useMemo(() => daysInMonth(month), [month])

  const handleLookup = () => {
    setResult(getSignIndex(month, day > maxDay ? maxDay : day))
  }

  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.625rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    minWidth: '100px',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'end', flexWrap: 'wrap' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.month}</label>
            <select value={month} onChange={(e) => { setMonth(Number(e.target.value)); setResult(null) }} style={selectStyle}>
              {l.months.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.day}</label>
            <select value={day > maxDay ? maxDay : day} onChange={(e) => { setDay(Number(e.target.value)); setResult(null) }} style={selectStyle}>
              {Array.from({ length: maxDay }, (_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
            </select>
          </div>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleLookup} style={{ whiteSpace: 'nowrap' }}>
            {l.lookup}
          </button>
        </div>
      </div>

      {/* Result */}
      {result !== null && (
        <div style={{
          ...sectionStyle,
          textAlign: 'center',
          padding: '2rem 1.25rem',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{EMOJIS[result]}</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.25rem' }}>{l.signs[result].name}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
              {l.dateRange}: {SIGN_RANGES[result]}
            </span>
            <span style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: elementColors[SIGNS[result === 0 ? 0 : result].element],
            }}>
              {l.element}: {elementNames[SIGNS[result === 0 ? 0 : result].element]}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto' }}>
            {l.signs[result].traits}
          </p>
        </div>
      )}

      {/* All Signs Reference Table */}
      <div style={sectionStyle}>
        <h3 className="font-semibold mb-3">
          {labels ? 'All Zodiac Signs' : '十二星座一覽'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th className="p-2 text-left">{labels ? 'Sign' : '星座'}</th>
                <th className="p-2 text-left">{l.dateRange}</th>
                <th className="p-2 text-left">{l.element}</th>
                <th className="p-2 text-left">{l.traits}</th>
              </tr>
            </thead>
            <tbody>
              {l.signs.map((sign, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: result === i ? 'rgba(37,99,235,0.06)' : 'transparent',
                }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {EMOJIS[i]} {sign.name}
                  </td>
                  <td style={{ padding: '0.5rem', whiteSpace: 'nowrap' }}>{SIGN_RANGES[i]}</td>
                  <td style={{ padding: '0.5rem', color: elementColors[SIGNS[i === 0 ? 0 : i].element], fontWeight: 600 }}>
                    {elementNames[SIGNS[i === 0 ? 0 : i].element]}
                  </td>
                  <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{sign.traits}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
