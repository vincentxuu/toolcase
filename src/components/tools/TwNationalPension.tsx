'use client'

const NP_INFO = [
  { item: '保險費率', value: '10%（2024年）' },
  { item: '月投保金額', value: 'NT$19,761' },
  { item: '每月保費', value: 'NT$1,976（= 19,761 × 10%）' },
  { item: '被保險人自付', value: 'NT$1,186（60%）' },
  { item: '政府補助', value: 'NT$790（40%）' },
]

const SUBSIDY_RATES = [
  { category: '一般被保險人', selfPay: '60%', govSubsidy: '40%', monthlyPay: 1186 },
  { category: '低收入戶', selfPay: '0%', govSubsidy: '100%', monthlyPay: 0 },
  { category: '中低收入戶', selfPay: '30%', govSubsidy: '70%', monthlyPay: 593 },
  { category: '所得未達一定標準', selfPay: '45%', govSubsidy: '55%', monthlyPay: 889 },
  { category: '身心障礙（極重度/重度）', selfPay: '0%', govSubsidy: '100%', monthlyPay: 0 },
  { category: '身心障礙（中度）', selfPay: '30%', govSubsidy: '70%', monthlyPay: 593 },
  { category: '身心障礙（輕度）', selfPay: '45%', govSubsidy: '55%', monthlyPay: 889 },
]

const BENEFITS = [
  { type: '老年年金', desc: '月投保金額 × 保險年資 × 0.65%，或 NT$3,772（擇優領取）', condition: '年滿65歲' },
  { type: '老年基本保證年金', desc: 'NT$3,772/月（2024年）', condition: '年滿65歲，未領取其他社會保險老年給付' },
  { type: '身心障礙年金', desc: '月投保金額 × 保險年資 × 1.3%，基本保障 NT$5,065/月', condition: '經評估為重度以上身心障礙' },
  { type: '遺屬年金', desc: '月投保金額 × 保險年資 × 1.3%，基本保障 NT$3,772/月', condition: '被保險人死亡' },
  { type: '喪葬給付', desc: '月投保金額 × 5 = NT$98,805', condition: '被保險人死亡' },
  { type: '生育給付', desc: '月投保金額 × 2 = NT$39,522（雙胞胎加倍）', condition: '分娩或早產' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    basicInfo?: string; item?: string; value?: string
    subsidyTitle?: string; category?: string; selfPay?: string; govSubsidy?: string; monthlyPay?: string
    benefitsTitle?: string; type?: string; description?: string; condition?: string
  }
}

export default function TwNationalPension({ labels }: Props) {
  const l = {
    title: labels?.title ?? '國民年金保險',
    desc: labels?.desc ?? '113年度（2024）適用',
    basicInfo: labels?.basicInfo ?? '基本資訊',
    item: labels?.item ?? '項目',
    value: labels?.value ?? '金額/費率',
    subsidyTitle: labels?.subsidyTitle ?? '各身分別保費負擔',
    category: labels?.category ?? '身分別',
    selfPay: labels?.selfPay ?? '自付比例',
    govSubsidy: labels?.govSubsidy ?? '政府補助',
    monthlyPay: labels?.monthlyPay ?? '每月自付',
    benefitsTitle: labels?.benefitsTitle ?? '給付項目',
    type: labels?.type ?? '給付類別',
    description: labels?.description ?? '給付標準',
    condition: labels?.condition ?? '請領條件',
  }

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div style={{ fontSize: '0.875rem' }}>
          <strong>適用對象：</strong>年滿25歲、未滿65歲，未參加勞保、農保、公教保、軍保的國民。包含家庭主婦、待業者等。
        </div>
      </div>

      {/* Basic info */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.basicInfo}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <tbody>
            {NP_INFO.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600, width: '40%' }}>{r.item}</td>
                <td style={{ ...cellStyle, fontWeight: 700, color: 'var(--color-primary)' }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Subsidy rates by category */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.subsidyTitle}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.category}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.selfPay}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.govSubsidy}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.monthlyPay}</th>
              </tr>
            </thead>
            <tbody>
              {SUBSIDY_RATES.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.category}</td>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>{r.selfPay}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', color: '#10b981' }}>{r.govSubsidy}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: r.monthlyPay === 0 ? '#10b981' : 'var(--color-primary)' }}>
                    {r.monthlyPay === 0 ? '免繳' : `NT$${fmt(r.monthlyPay)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.benefitsTitle}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.description}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.condition}</th>
              </tr>
            </thead>
            <tbody>
              {BENEFITS.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                  <td style={cellStyle}>{r.desc}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
