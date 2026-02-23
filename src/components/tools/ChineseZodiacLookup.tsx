'use client'
import { useState } from 'react'

interface ChineseZodiacLookupProps {
  labels?: {
    enterYear: string
    yearPlaceholder: string
    lookup: string
    yourZodiac: string
    element: string
    traits: string
    compatible: string
    incompatible: string
    animals: { name: string; traits: string; compatible: string; incompatible: string }[]
    elements: string[]
    allAnimals: string
  }
}

const ANIMAL_EMOJIS = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐴', '🐏', '🐒', '🐓', '🐕', '🐷']

const DEFAULT_ANIMALS = [
  { name: '鼠', traits: '聰明、機智、靈活、有魅力，善於社交且適應力強', compatible: '龍、猴、牛', incompatible: '馬、羊' },
  { name: '牛', traits: '勤勞、踏實、可靠、有耐心，意志堅定且值得信賴', compatible: '鼠、蛇、雞', incompatible: '羊、馬' },
  { name: '虎', traits: '勇敢、自信、有領導力、熱情，充滿正義感且敢於冒險', compatible: '馬、狗、豬', incompatible: '猴、蛇' },
  { name: '兔', traits: '溫和、優雅、善良、謹慎，有藝術天分且人緣好', compatible: '羊、狗、豬', incompatible: '雞、龍' },
  { name: '龍', traits: '自信、有野心、精力充沛、幸運，天生具有領袖魅力', compatible: '鼠、猴、雞', incompatible: '狗、兔' },
  { name: '蛇', traits: '智慧、優雅、直覺強、神秘，善於思考且有洞察力', compatible: '牛、雞、猴', incompatible: '虎、豬' },
  { name: '馬', traits: '活力充沛、愛好自由、熱情開朗，行動力強且樂觀進取', compatible: '虎、羊、狗', incompatible: '鼠、牛' },
  { name: '羊', traits: '溫柔、有同理心、有創意、和平，重視和諧且有藝術氣質', compatible: '兔、馬、豬', incompatible: '牛、鼠' },
  { name: '猴', traits: '聰明、機靈、幽默風趣、多才多藝，創造力豐富且善於解決問題', compatible: '鼠、龍、蛇', incompatible: '虎、豬' },
  { name: '雞', traits: '勤奮、務實、觀察力敏銳、有條理，準時且注重細節', compatible: '牛、龍、蛇', incompatible: '兔、狗' },
  { name: '狗', traits: '忠誠、正直、有責任感、勇敢，值得信賴且充滿正義感', compatible: '虎、兔、馬', incompatible: '龍、雞' },
  { name: '豬', traits: '善良、寬厚、真誠、樂觀，重感情且有慈悲心', compatible: '虎、兔、羊', incompatible: '蛇、猴' },
]

const DEFAULT_ELEMENTS = ['金', '水', '木', '火', '土']

const ELEMENT_COLORS = ['#a16207', '#0ea5e9', '#22c55e', '#ef4444', '#92400e']

function getAnimalIndex(year: number): number {
  return ((year - 4) % 12 + 12) % 12
}

function getElementIndex(year: number): number {
  return Math.floor(((year - 4) % 10 + 10) % 10 / 2)
}

export default function ChineseZodiacLookup({ labels }: ChineseZodiacLookupProps) {
  const l = {
    enterYear: labels?.enterYear ?? '輸入出生年份',
    yearPlaceholder: labels?.yearPlaceholder ?? '例如：1990',
    lookup: labels?.lookup ?? '查詢生肖',
    yourZodiac: labels?.yourZodiac ?? '你的生肖',
    element: labels?.element ?? '五行',
    traits: labels?.traits ?? '性格特質',
    compatible: labels?.compatible ?? '相合',
    incompatible: labels?.incompatible ?? '相沖',
    animals: labels?.animals ?? DEFAULT_ANIMALS,
    elements: labels?.elements ?? DEFAULT_ELEMENTS,
    allAnimals: labels?.allAnimals ?? '十二生肖一覽',
  }

  const [year, setYear] = useState('')
  const [result, setResult] = useState<{ animal: number; element: number } | null>(null)

  const handleLookup = () => {
    const y = parseInt(year, 10)
    if (isNaN(y) || y < 1) return
    setResult({ animal: getAnimalIndex(y), element: getElementIndex(y) })
  }

  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.625rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    width: '160px',
  }

  const tagStyle = (color: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color,
    backgroundColor: color + '18',
  })

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div style={sectionStyle}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginBottom: '0.375rem' }}>
          {l.enterYear}
        </label>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="number"
            min={1}
            max={2200}
            placeholder={l.yearPlaceholder}
            value={year}
            onChange={(e) => { setYear(e.target.value); setResult(null) }}
            onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
            style={inputStyle}
          />
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
          <div style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>{ANIMAL_EMOJIS[result.animal]}</div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {l.animals[result.animal].name}
          </h3>
          <div className="mb-4">
            <span style={{
              ...tagStyle(ELEMENT_COLORS[result.element]),
            }}>
              {l.element}: {l.elements[result.element]}
            </span>
          </div>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 1rem' }}>
            {l.animals[result.animal].traits}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <span style={tagStyle('#22c55e')}>
              {l.compatible}: {l.animals[result.animal].compatible}
            </span>
            <span style={tagStyle('#ef4444')}>
              {l.incompatible}: {l.animals[result.animal].incompatible}
            </span>
          </div>
        </div>
      )}

      {/* All Animals Reference Table */}
      <div style={sectionStyle}>
        <h3 className="font-semibold mb-3">{l.allAnimals}</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th className="p-2 text-left">{labels ? 'Animal' : '生肖'}</th>
                <th className="p-2 text-left">{l.traits}</th>
                <th className="p-2 text-left">{l.compatible}</th>
                <th className="p-2 text-left">{l.incompatible}</th>
              </tr>
            </thead>
            <tbody>
              {l.animals.map((animal, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: result?.animal === i ? 'rgba(37,99,235,0.06)' : 'transparent',
                }}>
                  <td style={{ padding: '0.5rem', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {ANIMAL_EMOJIS[i]} {animal.name}
                  </td>
                  <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{animal.traits}</td>
                  <td style={{ padding: '0.5rem', color: '#22c55e', fontWeight: 500 }}>{animal.compatible}</td>
                  <td style={{ padding: '0.5rem', color: '#ef4444', fontWeight: 500 }}>{animal.incompatible}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
