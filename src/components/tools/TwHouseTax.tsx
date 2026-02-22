'use client'

const HOUSE_TAX_RATES = [
  { category: '自住用', type: '住家用', rate: '1.2%', note: '本人、配偶或直系親屬實際居住，全國限3戶' },
  { category: '非自住', type: '住家用（其他）', rate: '1.5% ~ 3.6%', note: '依持有戶數累進，各縣市不同' },
  { category: '非自住', type: '住家用（全國歸戶 2 戶以內）', rate: '2.0%', note: '各地方政府可自行調整' },
  { category: '非自住', type: '住家用（全國歸戶 3~4 戶）', rate: '2.4%', note: '各地方政府可自行調整' },
  { category: '非自住', type: '住家用（全國歸戶 5~6 戶）', rate: '3.6%', note: '各地方政府可自行調整' },
  { category: '非自住', type: '住家用（全國歸戶 7 戶以上）', rate: '4.8%', note: '各地方政府可自行調整' },
  { category: '營業用', type: '營業用', rate: '3.0%', note: '供營業使用' },
  { category: '營業用', type: '私人醫院、診所、自由職業事務所', rate: '3.0%', note: '' },
  { category: '其他', type: '人民團體使用', rate: '1.5%', note: '非營業使用' },
  { category: '其他', type: '空置房屋（出租或使用中）', rate: '依實際用途', note: '依使用性質課徵' },
]

const TAX_FORMULA_INFO = [
  { item: '計算公式', desc: '房屋稅 = 房屋課稅現值 × 稅率' },
  { item: '課稅期間', desc: '每年 7/1 ~ 隔年 6/30' },
  { item: '繳納期間', desc: '每年 5/1 ~ 5/31' },
  { item: '房屋現值', desc: '房屋標準單價 × 面積 × (1 − 折舊率 × 折舊年數) × 路段率' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    category?: string; type?: string; rate?: string; note?: string
    formulaTitle?: string; item?: string; description?: string
  }
}

export default function TwHouseTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '房屋稅稅率表',
    desc: labels?.desc ?? '113年度（2024）適用',
    category: labels?.category ?? '類別',
    type: labels?.type ?? '使用情形',
    rate: labels?.rate ?? '稅率',
    note: labels?.note ?? '備註',
    formulaTitle: labels?.formulaTitle ?? '計算說明',
    item: labels?.item ?? '項目',
    description: labels?.description ?? '說明',
  }

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.category}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {HOUSE_TAX_RATES.map((r, i) => (
              <tr key={i}>
                <td style={cellStyle}>{r.category}</td>
                <td style={cellStyle}>{r.type}</td>
                <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{r.rate}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Formula Info */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.formulaTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.description}</th>
            </tr>
          </thead>
          <tbody>
            {TAX_FORMULA_INFO.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600 }}>{r.item}</td>
                <td style={cellStyle}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderRadius: '0.5rem' }}>
        ※ 2024年7月起實施「囤房稅2.0」，非自住住家用房屋改採全國歸戶，稅率依持有戶數累進。各縣市得於法定範圍內自行訂定差別稅率。
      </div>
    </div>
  )
}
