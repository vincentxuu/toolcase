'use client'
import { useState, useMemo } from 'react'

interface ClothingSizeChartProps {
  labels?: {
    gender: string
    men: string
    women: string
    category: string
    tops: string
    bottoms: string
    size: string
    chest: string
    waist: string
    hips: string
    note: string
  }
}

const MEN_TOPS = [
  { tw: 'XS', us: 'XS', eu: '44', uk: '34', jp: 'S', chest: '84-88' },
  { tw: 'S', us: 'S', eu: '46', uk: '36', jp: 'S', chest: '88-92' },
  { tw: 'M', us: 'M', eu: '48', uk: '38', jp: 'M', chest: '92-96' },
  { tw: 'L', us: 'L', eu: '50', uk: '40', jp: 'L', chest: '96-100' },
  { tw: 'XL', us: 'XL', eu: '52', uk: '42', jp: 'LL', chest: '100-104' },
  { tw: '2XL', us: 'XXL', eu: '54', uk: '44', jp: '3L', chest: '104-108' },
  { tw: '3XL', us: 'XXXL', eu: '56', uk: '46', jp: '4L', chest: '108-112' },
]

const MEN_BOTTOMS = [
  { tw: 'XS', us: '28', eu: '42', uk: '28', jp: 'S', waist: '71-74' },
  { tw: 'S', us: '30', eu: '44', uk: '30', jp: 'S', waist: '74-78' },
  { tw: 'M', us: '32', eu: '46', uk: '32', jp: 'M', waist: '78-82' },
  { tw: 'L', us: '34', eu: '48', uk: '34', jp: 'L', waist: '82-86' },
  { tw: 'XL', us: '36', eu: '50', uk: '36', jp: 'LL', waist: '86-90' },
  { tw: '2XL', us: '38', eu: '52', uk: '38', jp: '3L', waist: '90-94' },
  { tw: '3XL', us: '40', eu: '54', uk: '40', jp: '4L', waist: '94-98' },
]

const WOMEN_TOPS = [
  { tw: 'XS', us: '0-2', eu: '32', uk: '4', jp: '5', chest: '76-80' },
  { tw: 'S', us: '4-6', eu: '34', uk: '6-8', jp: '7', chest: '80-84' },
  { tw: 'M', us: '8-10', eu: '36-38', uk: '10-12', jp: '9', chest: '84-88' },
  { tw: 'L', us: '12-14', eu: '40-42', uk: '14-16', jp: '11', chest: '88-92' },
  { tw: 'XL', us: '16-18', eu: '44', uk: '18', jp: '13', chest: '92-96' },
  { tw: '2XL', us: '20', eu: '46', uk: '20', jp: '15', chest: '96-100' },
]

const WOMEN_BOTTOMS = [
  { tw: 'XS', us: '0-2', eu: '32', uk: '4', jp: '5', waist: '60-64', hips: '84-88' },
  { tw: 'S', us: '4-6', eu: '34', uk: '6-8', jp: '7', waist: '64-68', hips: '88-92' },
  { tw: 'M', us: '8-10', eu: '36-38', uk: '10-12', jp: '9', waist: '68-72', hips: '92-96' },
  { tw: 'L', us: '12-14', eu: '40-42', uk: '14-16', jp: '11', waist: '72-76', hips: '96-100' },
  { tw: 'XL', us: '16-18', eu: '44', uk: '18', jp: '13', waist: '76-80', hips: '100-104' },
  { tw: '2XL', us: '20', eu: '46', uk: '20', jp: '15', waist: '80-84', hips: '104-108' },
]

const cellStyle: React.CSSProperties = { padding: '0.5rem 0.4rem', textAlign: 'center', borderBottom: '1px solid var(--color-border)', fontSize: '0.85rem', whiteSpace: 'nowrap' }
const headerStyle: React.CSSProperties = { ...cellStyle, fontWeight: 600, borderBottom: '2px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }

export default function ClothingSizeChart({ labels }: ClothingSizeChartProps) {
  const l = {
    gender: labels?.gender ?? '性別',
    men: labels?.men ?? '男裝',
    women: labels?.women ?? '女裝',
    category: labels?.category ?? '類型',
    tops: labels?.tops ?? '上衣',
    bottoms: labels?.bottoms ?? '下身',
    size: labels?.size ?? '尺寸',
    chest: labels?.chest ?? '胸圍 (cm)',
    waist: labels?.waist ?? '腰圍 (cm)',
    hips: labels?.hips ?? '臀圍 (cm)',
    note: labels?.note ?? '※ 尺寸為近似值，實際尺寸因品牌而異',
  }

  const [gender, setGender] = useState<'men' | 'women'>('men')
  const [category, setCategory] = useState<'tops' | 'bottoms'>('tops')

  const data = useMemo(() => {
    if (gender === 'men') return category === 'tops' ? MEN_TOPS : MEN_BOTTOMS
    return category === 'tops' ? WOMEN_TOPS : WOMEN_BOTTOMS
  }, [gender, category])

  const isBottoms = category === 'bottoms'
  const isWomenBottoms = gender === 'women' && isBottoms

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          {(['men', 'women'] as const).map((g) => (
            <button key={g} onClick={() => setGender(g)}
              style={{ padding: '0.5rem 1.25rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', backgroundColor: gender === g ? 'var(--color-primary)' : 'var(--color-bg-secondary)', color: gender === g ? '#fff' : 'inherit' }}>
              {g === 'men' ? l.men : l.women}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          {(['tops', 'bottoms'] as const).map((c) => (
            <button key={c} onClick={() => setCategory(c)}
              style={{ padding: '0.5rem 1.25rem', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', backgroundColor: category === c ? 'var(--color-primary)' : 'var(--color-bg-secondary)', color: category === c ? '#fff' : 'inherit' }}>
              {c === 'tops' ? l.tops : l.bottoms}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--color-border)', borderRadius: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={headerStyle}>TW</th>
              <th style={headerStyle}>US</th>
              <th style={headerStyle}>EU</th>
              <th style={headerStyle}>UK</th>
              <th style={headerStyle}>JP</th>
              {!isBottoms && <th style={headerStyle}>{l.chest}</th>}
              {isBottoms && <th style={headerStyle}>{l.waist}</th>}
              {isWomenBottoms && <th style={headerStyle}>{l.hips}</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 700 }}>{row.tw}</td>
                <td style={cellStyle}>{row.us}</td>
                <td style={cellStyle}>{row.eu}</td>
                <td style={cellStyle}>{row.uk}</td>
                <td style={cellStyle}>{row.jp}</td>
                {!isBottoms && <td style={cellStyle}>{(row as typeof MEN_TOPS[0]).chest}</td>}
                {isBottoms && <td style={cellStyle}>{(row as typeof MEN_BOTTOMS[0]).waist}</td>}
                {isWomenBottoms && <td style={cellStyle}>{(row as typeof WOMEN_BOTTOMS[0]).hips}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', margin: 0 }}>{l.note}</p>
    </div>
  )
}
