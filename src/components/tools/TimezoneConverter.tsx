'use client'
import { useState, useMemo, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface TimezoneConverterProps {
  labels?: {
    sourceTimezone: string
    targetTimezone: string
    date: string
    time: string
    convertedTime: string
    currentTime: string
    timeDifference: string
    swap: string
    hours: string
    modeConverter: string
    modeMeeting: string
    workingHoursLabel: string
    meetingPlannerDesc: string
  }
  locale?: 'en' | 'zh-tw'
}

const TIMEZONES_DATA = [
  // UTC
  { id: 'UTC', en: 'UTC', zh: 'UTC' },

  // Americas - North America
  { id: 'America/New_York', en: 'New York, USA (EST/EDT)', zh: '紐約, 美國 (EST/EDT)' },
  { id: 'America/Chicago', en: 'Chicago, USA (CST/CDT)', zh: '芝加哥, 美國 (CST/CDT)' },
  { id: 'America/Denver', en: 'Denver, USA (MST/MDT)', zh: '丹佛, 美國 (MST/MDT)' },
  { id: 'America/Phoenix', en: 'Phoenix, USA (MST)', zh: '鳳凰城, 美國 (MST)' },
  { id: 'America/Los_Angeles', en: 'Los Angeles, USA (PST/PDT)', zh: '洛杉磯, 美國 (PST/PDT)' },
  { id: 'America/Anchorage', en: 'Anchorage, USA (AKST/AKDT)', zh: '安克拉治, 美國 (AKST/AKDT)' },
  { id: 'Pacific/Honolulu', en: 'Honolulu, USA (HST)', zh: '檀香山, 美國 (HST)' },
  { id: 'America/Toronto', en: 'Toronto, Canada (EST/EDT)', zh: '多倫多, 加拿大 (EST/EDT)' },
  { id: 'America/Vancouver', en: 'Vancouver, Canada (PST/PDT)', zh: '溫哥華, 加拿大 (PST/PDT)' },
  { id: 'America/Edmonton', en: 'Edmonton, Canada (MST/MDT)', zh: '愛民頓, 加拿大 (MST/MDT)' },
  { id: 'America/Winnipeg', en: 'Winnipeg, Canada (CST/CDT)', zh: '溫尼伯, 加拿大 (CST/CDT)' },
  { id: 'America/Halifax', en: 'Halifax, Canada (AST/ADT)', zh: '哈利法克斯, 加拿大 (AST/ADT)' },
  { id: 'America/Mexico_City', en: 'Mexico City, Mexico (CST/CDT)', zh: '墨西哥城, 墨西哥 (CST/CDT)' },

  // Americas - Central & South America
  { id: 'America/Bogota', en: 'Bogotá, Colombia (COT)', zh: '波哥大, 哥倫比亞 (COT)' },
  { id: 'America/Lima', en: 'Lima, Peru (PET)', zh: '利馬, 秘魯 (PET)' },
  { id: 'America/Santiago', en: 'Santiago, Chile (CLT/CLST)', zh: '聖地亞哥, 智利 (CLT/CLST)' },
  { id: 'America/Buenos_Aires', en: 'Buenos Aires, Argentina (ART)', zh: '布宜諾斯艾利斯, 阿根廷 (ART)' },
  { id: 'America/Sao_Paulo', en: 'São Paulo, Brazil (BRT/BRST)', zh: '聖保羅, 巴西 (BRT/BRST)' },
  { id: 'America/Caracas', en: 'Caracas, Venezuela (VET)', zh: '卡拉卡斯, 委內瑞拉 (VET)' },

  // Europe - Western
  { id: 'Europe/London', en: 'London, UK (GMT/BST)', zh: '倫敦, 英國 (GMT/BST)' },
  { id: 'Europe/Dublin', en: 'Dublin, Ireland (GMT/IST)', zh: '都柏林, 愛爾蘭 (GMT/IST)' },
  { id: 'Europe/Lisbon', en: 'Lisbon, Portugal (WET/WEST)', zh: '里斯本, 葡萄牙 (WET/WEST)' },
  { id: 'Atlantic/Reykjavik', en: 'Reykjavik, Iceland (GMT)', zh: '雷克雅維克, 冰島 (GMT)' },

  // Europe - Central
  { id: 'Europe/Paris', en: 'Paris, France (CET/CEST)', zh: '巴黎, 法國 (CET/CEST)' },
  { id: 'Europe/Berlin', en: 'Berlin, Germany (CET/CEST)', zh: '柏林, 德國 (CET/CEST)' },
  { id: 'Europe/Munich', en: 'Munich, Germany (CET/CEST)', zh: '慕尼黑, 德國 (CET/CEST)' },
  { id: 'Europe/Amsterdam', en: 'Amsterdam, Netherlands (CET/CEST)', zh: '阿姆斯特丹, 荷蘭 (CET/CEST)' },
  { id: 'Europe/Brussels', en: 'Brussels, Belgium (CET/CEST)', zh: '布魯塞爾, 比利時 (CET/CEST)' },
  { id: 'Europe/Luxembourg', en: 'Luxembourg City, Luxembourg (CET/CEST)', zh: '盧森堡市, 盧森堡 (CET/CEST)' },
  { id: 'Europe/Madrid', en: 'Madrid, Spain (CET/CEST)', zh: '馬德里, 西班牙 (CET/CEST)' },
  { id: 'Europe/Barcelona', en: 'Barcelona, Spain (CET/CEST)', zh: '巴塞隆納, 西班牙 (CET/CEST)' },
  { id: 'Europe/Rome', en: 'Rome, Italy (CET/CEST)', zh: '羅馬, 義大利 (CET/CEST)' },
  { id: 'Europe/Milan', en: 'Milan, Italy (CET/CEST)', zh: '米蘭, 義大利 (CET/CEST)' },
  { id: 'Europe/Vienna', en: 'Vienna, Austria (CET/CEST)', zh: '維也納, 奧地利 (CET/CEST)' },
  { id: 'Europe/Prague', en: 'Prague, Czech Republic (CET/CEST)', zh: '布拉格, 捷克 (CET/CEST)' },
  { id: 'Europe/Warsaw', en: 'Warsaw, Poland (CET/CEST)', zh: '華沙, 波蘭 (CET/CEST)' },
  { id: 'Europe/Budapest', en: 'Budapest, Hungary (CET/CEST)', zh: '布達佩斯, 匈牙利 (CET/CEST)' },
  { id: 'Europe/Stockholm', en: 'Stockholm, Sweden (CET/CEST)', zh: '斯德哥爾摩, 瑞典 (CET/CEST)' },
  { id: 'Europe/Copenhagen', en: 'Copenhagen, Denmark (CET/CEST)', zh: '哥本哈根, 丹麥 (CET/CEST)' },
  { id: 'Europe/Oslo', en: 'Oslo, Norway (CET/CEST)', zh: '奧斯陸, 挪威 (CET/CEST)' },
  { id: 'Europe/Zurich', en: 'Zurich, Switzerland (CET/CEST)', zh: '蘇黎世, 瑞士 (CET/CEST)' },
  { id: 'Europe/Geneva', en: 'Geneva, Switzerland (CET/CEST)', zh: '日內瓦, 瑞士 (CET/CEST)' },
  { id: 'Europe/Bratislava', en: 'Bratislava, Slovakia (CET/CEST)', zh: '布拉提斯拉瓦, 斯洛伐克 (CET/CEST)' },
  { id: 'Europe/Ljubljana', en: 'Ljubljana, Slovenia (CET/CEST)', zh: '盧比安納, 斯洛維尼亞 (CET/CEST)' },
  { id: 'Europe/Zagreb', en: 'Zagreb, Croatia (CET/CEST)', zh: '札格瑞布, 克羅埃西亞 (CET/CEST)' },
  { id: 'Europe/Belgrade', en: 'Belgrade, Serbia (CET/CEST)', zh: '貝爾格勒, 塞爾維亞 (CET/CEST)' },

  // Europe - Eastern
  { id: 'Europe/Athens', en: 'Athens, Greece (EET/EEST)', zh: '雅典, 希臘 (EET/EEST)' },
  { id: 'Europe/Helsinki', en: 'Helsinki, Finland (EET/EEST)', zh: '赫爾辛基, 芬蘭 (EET/EEST)' },
  { id: 'Europe/Bucharest', en: 'Bucharest, Romania (EET/EEST)', zh: '布加勒斯特, 羅馬尼亞 (EET/EEST)' },
  { id: 'Europe/Sofia', en: 'Sofia, Bulgaria (EET/EEST)', zh: '索菲亞, 保加利亞 (EET/EEST)' },
  { id: 'Europe/Tallinn', en: 'Tallinn, Estonia (EET/EEST)', zh: '塔林, 愛沙尼亞 (EET/EEST)' },
  { id: 'Europe/Riga', en: 'Riga, Latvia (EET/EEST)', zh: '里加, 拉脫維亞 (EET/EEST)' },
  { id: 'Europe/Vilnius', en: 'Vilnius, Lithuania (EET/EEST)', zh: '維爾紐斯, 立陶宛 (EET/EEST)' },
  { id: 'Europe/Istanbul', en: 'Istanbul, Turkey (TRT)', zh: '伊斯坦堡, 土耳其 (TRT)' },
  { id: 'Europe/Moscow', en: 'Moscow, Russia (MSK)', zh: '莫斯科, 俄羅斯 (MSK)' },
  { id: 'Europe/Kiev', en: 'Kyiv, Ukraine (EET/EEST)', zh: '基輔, 烏克蘭 (EET/EEST)' },
  { id: 'Europe/Minsk', en: 'Minsk, Belarus (MSK)', zh: '明斯克, 白俄羅斯 (MSK)' },
  { id: 'Europe/Chisinau', en: 'Chisinau, Moldova (EET/EEST)', zh: '基希涅夫, 摩爾多瓦 (EET/EEST)' },

  // Middle East
  { id: 'Asia/Dubai', en: 'Dubai, UAE (GST)', zh: '杜拜, 阿聯酋 (GST)' },
  { id: 'Asia/Riyadh', en: 'Riyadh, Saudi Arabia (AST)', zh: '利雅德, 沙烏地阿拉伯 (AST)' },
  { id: 'Asia/Kuwait', en: 'Kuwait City, Kuwait (AST)', zh: '科威特城, 科威特 (AST)' },
  { id: 'Asia/Bahrain', en: 'Manama, Bahrain (AST)', zh: '麥納瑪, 巴林 (AST)' },
  { id: 'Asia/Qatar', en: 'Doha, Qatar (AST)', zh: '多哈, 卡達 (AST)' },
  { id: 'Asia/Jerusalem', en: 'Jerusalem, Israel (IST/IDT)', zh: '耶路撒冷, 以色列 (IST/IDT)' },
  { id: 'Asia/Beirut', en: 'Beirut, Lebanon (EET/EEST)', zh: '貝魯特, 黎巴嫩 (EET/EEST)' },
  { id: 'Asia/Tehran', en: 'Tehran, Iran (IRST/IRDT)', zh: '德黑蘭, 伊朗 (IRST/IRDT)' },

  // Africa
  { id: 'Africa/Cairo', en: 'Cairo, Egypt (EET)', zh: '開羅, 埃及 (EET)' },
  { id: 'Africa/Johannesburg', en: 'Johannesburg, South Africa (SAST)', zh: '約翰尼斯堡, 南非 (SAST)' },
  { id: 'Africa/Lagos', en: 'Lagos, Nigeria (WAT)', zh: '拉哥斯, 奈及利亞 (WAT)' },
  { id: 'Africa/Nairobi', en: 'Nairobi, Kenya (EAT)', zh: '奈洛比, 肯亞 (EAT)' },
  { id: 'Africa/Casablanca', en: 'Casablanca, Morocco (WET/WEST)', zh: '卡薩布蘭卡, 摩洛哥 (WET/WEST)' },

  // Asia - South & Central
  { id: 'Asia/Kolkata', en: 'Mumbai, India (IST)', zh: '孟買, 印度 (IST)' },
  { id: 'Asia/Karachi', en: 'Karachi, Pakistan (PKT)', zh: '喀拉蚩, 巴基斯坦 (PKT)' },
  { id: 'Asia/Dhaka', en: 'Dhaka, Bangladesh (BST)', zh: '達卡, 孟加拉 (BST)' },
  { id: 'Asia/Kathmandu', en: 'Kathmandu, Nepal (NPT)', zh: '加德滿都, 尼泊爾 (NPT)' },
  { id: 'Asia/Colombo', en: 'Colombo, Sri Lanka (IST)', zh: '可倫坡, 斯里蘭卡 (IST)' },
  { id: 'Asia/Tashkent', en: 'Tashkent, Uzbekistan (UZT)', zh: '塔什干, 烏茲別克 (UZT)' },
  { id: 'Asia/Almaty', en: 'Almaty, Kazakhstan (ALMT)', zh: '阿拉木圖, 哈薩克 (ALMT)' },

  // Asia - Southeast
  { id: 'Asia/Bangkok', en: 'Bangkok, Thailand (ICT)', zh: '曼谷, 泰國 (ICT)' },
  { id: 'Asia/Singapore', en: 'Singapore (SGT)', zh: '新加坡 (SGT)' },
  { id: 'Asia/Kuala_Lumpur', en: 'Kuala Lumpur, Malaysia (MYT)', zh: '吉隆坡, 馬來西亞 (MYT)' },
  { id: 'Asia/Jakarta', en: 'Jakarta, Indonesia (WIB)', zh: '雅加達, 印尼 (WIB)' },
  { id: 'Asia/Manila', en: 'Manila, Philippines (PHT)', zh: '馬尼拉, 菲律賓 (PHT)' },
  { id: 'Asia/Ho_Chi_Minh', en: 'Ho Chi Minh, Vietnam (ICT)', zh: '胡志明市, 越南 (ICT)' },
  { id: 'Asia/Yangon', en: 'Yangon, Myanmar (MMT)', zh: '仰光, 緬甸 (MMT)' },

  // Asia - East
  { id: 'Asia/Hong_Kong', en: 'Hong Kong (HKT)', zh: '香港 (HKT)' },
  { id: 'Asia/Taipei', en: 'Taipei, Taiwan (CST)', zh: '台北, 台灣 (CST)' },
  { id: 'Asia/Shanghai', en: 'Shanghai, China (CST)', zh: '上海, 中國 (CST)' },
  { id: 'Asia/Macau', en: 'Macau (CST)', zh: '澳門 (CST)' },
  { id: 'Asia/Tokyo', en: 'Tokyo, Japan (JST)', zh: '東京, 日本 (JST)' },
  { id: 'Asia/Seoul', en: 'Seoul, South Korea (KST)', zh: '首爾, 南韓 (KST)' },
  { id: 'Asia/Pyongyang', en: 'Pyongyang, North Korea (KST)', zh: '平壤, 北韓 (KST)' },
  { id: 'Asia/Ulaanbaatar', en: 'Ulaanbaatar, Mongolia (ULAT)', zh: '烏蘭巴托, 蒙古 (ULAT)' },

  // Oceania
  { id: 'Australia/Sydney', en: 'Sydney, Australia (AEST/AEDT)', zh: '雪梨, 澳洲 (AEST/AEDT)' },
  { id: 'Australia/Melbourne', en: 'Melbourne, Australia (AEST/AEDT)', zh: '墨爾本, 澳洲 (AEST/AEDT)' },
  { id: 'Australia/Brisbane', en: 'Brisbane, Australia (AEST)', zh: '布里斯本, 澳洲 (AEST)' },
  { id: 'Australia/Perth', en: 'Perth, Australia (AWST)', zh: '伯斯, 澳洲 (AWST)' },
  { id: 'Australia/Adelaide', en: 'Adelaide, Australia (ACST/ACDT)', zh: '阿德萊德, 澳洲 (ACST/ACDT)' },
  { id: 'Pacific/Auckland', en: 'Auckland, New Zealand (NZST/NZDT)', zh: '奧克蘭, 紐西蘭 (NZST/NZDT)' },
  { id: 'Pacific/Fiji', en: 'Suva, Fiji (FJT/FJST)', zh: '蘇瓦, 斐濟 (FJT/FJST)' },
  { id: 'Pacific/Guam', en: 'Guam, USA (ChST)', zh: '關島, 美國 (ChST)' },
]

function formatInTimezone(date: Date, tz: string): string {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(date)
}

function getTimezoneOffsetMinutes(date: Date, tz: string): number {
  const utcStr = date.toLocaleString('en-US', { timeZone: 'UTC' })
  const tzStr = date.toLocaleString('en-US', { timeZone: tz })
  const utcDate = new Date(utcStr)
  const tzDate = new Date(tzStr)
  return (tzDate.getTime() - utcDate.getTime()) / 60000
}

export default function TimezoneConverter({ labels, locale }: TimezoneConverterProps) {
  const pathname = usePathname()
  // Auto-detect locale from URL if not provided
  const currentLocale = locale || (pathname?.includes('/zh-tw') ? 'zh-tw' : 'en')

  // State declarations
  const [mode, setMode] = useState<'converter' | 'meeting'>('converter')
  const [sourceTz, setSourceTz] = useState('UTC')
  const [targetTz, setTargetTz] = useState('Asia/Taipei')
  const [dateStr, setDateStr] = useState('')
  const [timeStr, setTimeStr] = useState('')
  const [now, setNow] = useState(new Date())
  const [mounted, setMounted] = useState(false)
  const [sourceSearch, setSourceSearch] = useState('')
  const [targetSearch, setTargetSearch] = useState('')

  // Generate timezone list based on locale
  const TIMEZONES = useMemo(() => {
    return TIMEZONES_DATA.map(tz => ({
      id: tz.id,
      label: currentLocale === 'zh-tw' ? tz.zh : tz.en
    }))
  }, [currentLocale])

  // Filter timezones based on search for source
  const filteredSourceTimezones = useMemo(() => {
    if (!sourceSearch) return TIMEZONES
    const search = sourceSearch.toLowerCase()
    return TIMEZONES.filter(tz =>
      tz.label.toLowerCase().includes(search)
    )
  }, [TIMEZONES, sourceSearch])

  // Filter timezones based on search for target
  const filteredTargetTimezones = useMemo(() => {
    if (!targetSearch) return TIMEZONES
    const search = targetSearch.toLowerCase()
    return TIMEZONES.filter(tz =>
      tz.label.toLowerCase().includes(search)
    )
  }, [TIMEZONES, targetSearch])

  const l = {
    sourceTimezone: labels?.sourceTimezone ?? 'Source Timezone',
    targetTimezone: labels?.targetTimezone ?? 'Target Timezone',
    date: labels?.date ?? 'Date',
    time: labels?.time ?? 'Time',
    convertedTime: labels?.convertedTime ?? 'Converted Time',
    currentTime: labels?.currentTime ?? 'Current Time',
    timeDifference: labels?.timeDifference ?? 'Time Difference',
    swap: labels?.swap ?? 'Swap',
    hours: labels?.hours ?? 'hours',
    modeConverter: labels?.modeConverter ?? 'Time Converter',
    modeMeeting: labels?.modeMeeting ?? 'Meeting Planner',
    workingHoursLabel: labels?.workingHoursLabel ?? 'Working hours (9 AM - 6 PM)',
    meetingPlannerDesc: labels?.meetingPlannerDesc ?? 'Find the best meeting time across timezones',
  }

  useEffect(() => {
    setMounted(true)
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    setDateStr(`${yyyy}-${mm}-${dd}`)
    const hh = String(today.getHours()).padStart(2, '0')
    const min = String(today.getMinutes()).padStart(2, '0')
    setTimeStr(`${hh}:${min}`)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const convertedResult = useMemo(() => {
    if (!dateStr || !timeStr) return null
    try {
      const sourceOffset = getTimezoneOffsetMinutes(new Date(), sourceTz)
      const [year, month, day] = dateStr.split('-').map(Number)
      const [hour, minute] = timeStr.split(':').map(Number)
      const utcDate = new Date(Date.UTC(year, month - 1, day, hour, minute))
      const adjustedUtc = new Date(utcDate.getTime() - sourceOffset * 60000)
      const targetFormatted = formatInTimezone(adjustedUtc, targetTz)
      return targetFormatted
    } catch {
      return null
    }
  }, [dateStr, timeStr, sourceTz, targetTz])

  const timeDiff = useMemo(() => {
    const ref = new Date()
    const srcOffset = getTimezoneOffsetMinutes(ref, sourceTz)
    const tgtOffset = getTimezoneOffsetMinutes(ref, targetTz)
    const diffMinutes = tgtOffset - srcOffset
    const diffHours = diffMinutes / 60
    const sign = diffHours >= 0 ? '+' : ''
    return `${sign}${diffHours % 1 === 0 ? diffHours : diffHours.toFixed(1)} ${l.hours}`
  }, [sourceTz, targetTz, l.hours])

  const handleSwap = () => {
    setSourceTz(targetTz)
    setTargetTz(sourceTz)
  }

  // Meeting planner: 24-hour comparison
  const timeComparison = useMemo(() => {
    const comparisons = []
    const baseDate = new Date()

    for (let hour = 0; hour < 24; hour++) {
      const sourceDate = new Date(baseDate)
      sourceDate.setHours(hour, 0, 0, 0)

      // Format source time
      const sourceFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: sourceTz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      // Format target time with weekday
      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTz,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })

      const targetWeekdayFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetTz,
        weekday: 'short',
      })

      const targetParts = targetFormatter.formatToParts(sourceDate)
      const targetHour = parseInt(targetParts.find(p => p.type === 'hour')?.value || '0')
      const targetMinute = targetParts.find(p => p.type === 'minute')?.value || '00'
      const targetWeekday = targetWeekdayFormatter.format(sourceDate)

      // 睡覺時間定義為 23:00-7:00 (11PM-7AM)
      const isSourceAwake = hour >= 7 && hour < 23
      const isTargetAwake = targetHour >= 7 && targetHour < 23
      const isBothAwake = isSourceAwake && isTargetAwake

      comparisons.push({
        sourceHour: hour,
        sourceTime: sourceFormatter.format(sourceDate),
        targetTime: `${targetHour.toString().padStart(2, '0')}:${targetMinute}`,
        targetWeekday,
        isSourceAwake,
        isTargetAwake,
        isBothAwake,
      })
    }

    return comparisons
  }, [sourceTz, targetTz])

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '1rem',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.375rem',
    fontWeight: 600,
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  }

  const sourceCity = TIMEZONES.find(tz => tz.id === sourceTz)
  const targetCity = TIMEZONES.find(tz => tz.id === targetTz)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Mode Tabs */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        borderBottom: '2px solid var(--color-border)',
        marginBottom: '0.5rem',
      }}>
        <button
          onClick={() => setMode('converter')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: mode === 'converter' ? 'var(--color-bg-secondary)' : 'transparent',
            border: 'none',
            borderBottom: mode === 'converter' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: mode === 'converter' ? 'var(--color-text)' : 'var(--color-text-secondary)',
            fontWeight: mode === 'converter' ? 600 : 400,
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          {l.modeConverter}
        </button>
        <button
          onClick={() => setMode('meeting')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: mode === 'meeting' ? 'var(--color-bg-secondary)' : 'transparent',
            border: 'none',
            borderBottom: mode === 'meeting' ? '2px solid var(--color-primary)' : '2px solid transparent',
            color: mode === 'meeting' ? 'var(--color-text)' : 'var(--color-text-secondary)',
            fontWeight: mode === 'meeting' ? 600 : 400,
            cursor: 'pointer',
            marginBottom: '-2px',
          }}
        >
          {l.modeMeeting}
        </button>
      </div>

      {/* Converter Mode */}
      {mode === 'converter' && (
        <>
          {/* Current time in both zones */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                {l.currentTime} - {TIMEZONES.find(t => t.id === sourceTz)?.label ?? sourceTz}
              </div>
              <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
                {mounted ? formatInTimezone(now, sourceTz) : '--:--:--'}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: '0.75rem',
              border: '1px solid var(--color-border)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>
                {l.currentTime} - {TIMEZONES.find(t => t.id === targetTz)?.label ?? targetTz}
              </div>
              <div style={{ fontSize: '1.25rem', fontFamily: 'monospace', fontWeight: 700 }}>
                {mounted ? formatInTimezone(now, targetTz) : '--:--:--'}
              </div>
            </div>
          </div>

          {/* Timezone selectors with individual search */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label style={labelStyle}>{l.sourceTimezone}</label>
              <input
                type="text"
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                placeholder={currentLocale === 'zh-tw' ? '🔍 搜尋...' : '🔍 Search...'}
                style={{
                  ...inputStyle,
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <select
                value={sourceTz}
                onChange={(e) => setSourceTz(e.target.value)}
                style={inputStyle}
              >
                {filteredSourceTimezones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-secondary" onClick={handleSwap} style={{ marginBottom: '0.125rem' }}>⇄</button>
            <div>
              <label style={labelStyle}>{l.targetTimezone}</label>
              <input
                type="text"
                value={targetSearch}
                onChange={(e) => setTargetSearch(e.target.value)}
                placeholder={currentLocale === 'zh-tw' ? '🔍 搜尋...' : '🔍 Search...'}
                style={{
                  ...inputStyle,
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <select
                value={targetTz}
                onChange={(e) => setTargetTz(e.target.value)}
                style={inputStyle}
              >
                {filteredTargetTimezones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and time inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={labelStyle}>{l.date}</label>
              <input
                type="date"
                value={dateStr}
                onChange={(e) => setDateStr(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>{l.time}</label>
              <input
                type="time"
                value={timeStr}
                onChange={(e) => setTimeStr(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Result */}
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>{l.convertedTime}</div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', fontFamily: 'monospace' }}>
              {convertedResult ?? '--'}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.75rem' }}>
              {l.timeDifference}: {timeDiff}
            </div>
          </div>
        </>
      )}

      {/* Meeting Planner Mode */}
      {mode === 'meeting' && (
        <>
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            fontSize: '0.875rem',
            color: 'var(--color-text-secondary)',
          }}>
            {l.meetingPlannerDesc}
          </div>

          {/* Timezone selectors with individual search */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label style={labelStyle}>{l.sourceTimezone}</label>
              <input
                type="text"
                value={sourceSearch}
                onChange={(e) => setSourceSearch(e.target.value)}
                placeholder={currentLocale === 'zh-tw' ? '🔍 搜尋...' : '🔍 Search...'}
                style={{
                  ...inputStyle,
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <select
                value={sourceTz}
                onChange={(e) => setSourceTz(e.target.value)}
                style={inputStyle}
              >
                {filteredSourceTimezones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
            <button className="btn-secondary" onClick={handleSwap} style={{ marginBottom: '0.125rem' }}>⇄</button>
            <div>
              <label style={labelStyle}>{l.targetTimezone}</label>
              <input
                type="text"
                value={targetSearch}
                onChange={(e) => setTargetSearch(e.target.value)}
                placeholder={currentLocale === 'zh-tw' ? '🔍 搜尋...' : '🔍 Search...'}
                style={{
                  ...inputStyle,
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              />
              <select
                value={targetTz}
                onChange={(e) => setTargetTz(e.target.value)}
                style={inputStyle}
              >
                {filteredTargetTimezones.map(tz => (
                  <option key={tz.id} value={tz.id}>
                    {tz.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Legend */}
          <div style={{
            padding: '1rem',
            backgroundColor: 'var(--color-bg-secondary)',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
          }}>
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  borderRadius: '4px',
                }} />
                <span>{l.workingHoursLabel}</span>
              </div>
            </div>
          </div>

          {/* Time Comparison Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.9rem',
            }}>
              <thead>
                <tr style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderBottom: '2px solid var(--color-border)',
                }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>
                    {sourceCity?.label || sourceTz}
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>
                    {targetCity?.label || targetTz}
                  </th>
                </tr>
              </thead>
              <tbody>
                {timeComparison.map((item, idx) => {
                  let backgroundColor = 'transparent'
                  if (item.isBothAwake) {
                    backgroundColor = 'rgba(34, 197, 94, 0.15)'
                  }

                  return (
                    <tr
                      key={idx}
                      style={{
                        borderBottom: '1px solid var(--color-border)',
                        backgroundColor,
                      }}
                    >
                      <td style={{
                        padding: '0.75rem',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: item.isSourceAwake ? 600 : 400,
                      }}>
                        {item.sourceTime}
                      </td>
                      <td style={{
                        padding: '0.75rem',
                        fontFamily: "'Fira Code', monospace",
                        fontWeight: item.isTargetAwake ? 600 : 400,
                      }}>
                        {item.targetTime}
                        <span style={{
                          marginLeft: '0.5rem',
                          fontSize: '0.75rem',
                          color: 'var(--color-text-secondary)',
                        }}>
                          {item.targetWeekday}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
