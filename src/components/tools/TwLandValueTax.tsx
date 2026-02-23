'use client'

const GENERAL_RATES = [
  { bracket: '未超過累進起點地價', rate: '10‰', note: '基本稅率' },
  { bracket: '超過 ~ 5 倍', rate: '15‰', note: '' },
  { bracket: '超過 5 ~ 10 倍', rate: '25‰', note: '' },
  { bracket: '超過 10 ~ 15 倍', rate: '35‰', note: '' },
  { bracket: '超過 15 ~ 20 倍', rate: '45‰', note: '' },
  { bracket: '超過 20 倍以上', rate: '55‰', note: '最高稅率' },
]

const SPECIAL_RATES = [
  { type: '自用住宅用地', rate: '2‰', condition: '本人、配偶或直系親屬設籍，面積限制：都市300㎡、非都市700㎡' },
  { type: '工業用地', rate: '10‰', condition: '經主管機關核准之工業用地' },
  { type: '公共設施保留地', rate: '6‰', condition: '依法劃設之公共設施保留地' },
  { type: '公有土地', rate: '10‰', condition: '政府機關使用之公有土地' },
]

const TAX_INFO = [
  { item: '計算公式', desc: '地價稅 = 課稅地價 × 稅率' },
  { item: '累進起點地價', desc: '由各縣市每年公告，通常約 NT$50萬 ~ NT$500萬 不等' },
  { item: '課稅期間', desc: '每年 1/1 ~ 12/31' },
  { item: '繳納期間', desc: '每年 11/1 ~ 11/30' },
  { item: '自用住宅申請', desc: '需於每年 9/22 前向稅捐處提出申請' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    generalTitle?: string; specialTitle?: string; infoTitle?: string
    bracket?: string; rate?: string; note?: string
    type?: string; condition?: string; item?: string; description?: string
  }
}

export default function TwLandValueTax({ labels }: Props) {
  const l = {
    title: labels?.title ?? '地價稅稅率表',
    desc: labels?.desc ?? '113年度（2024）適用',
    generalTitle: labels?.generalTitle ?? '一般用地累進稅率',
    specialTitle: labels?.specialTitle ?? '特別稅率',
    infoTitle: labels?.infoTitle ?? '重要資訊',
    bracket: labels?.bracket ?? '級距',
    rate: labels?.rate ?? '稅率',
    note: labels?.note ?? '備註',
    type: labels?.type ?? '用地類型',
    condition: labels?.condition ?? '適用條件',
    item: labels?.item ?? '項目',
    description: labels?.description ?? '說明',
  }

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }

  return (
    <div className="flex flex-col gap-6">
      {/* General progressive rates */}
      <div>
        <div className="text-base font-semibold mb-3">{l.generalTitle}</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.bracket}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
              </tr>
            </thead>
            <tbody>
              {GENERAL_RATES.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.bracket}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{r.rate}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special rates */}
      <div>
        <div className="text-base font-semibold mb-3">{l.specialTitle}</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.condition}</th>
              </tr>
            </thead>
            <tbody>
              {SPECIAL_RATES.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: '#10b981' }}>{r.rate}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div>
        <div className="text-base font-semibold mb-3">{l.infoTitle}</div>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {TAX_INFO.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600, width: '30%' }}>{r.item}</td>
                <td style={cellStyle}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
