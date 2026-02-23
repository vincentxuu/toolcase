'use client'

const EXEMPTIONS = [
  { item: '一般免稅額（每人）', amount: 97000, note: '' },
  { item: '年滿70歲免稅額（每人）', amount: 145500, note: '本人、配偶或受扶養直系尊親屬' },
]

const STANDARD_DEDUCTIONS = [
  { item: '單身標準扣除額', amount: 131000, note: '' },
  { item: '有配偶標準扣除額', amount: 262000, note: '合併申報' },
]

const ITEMIZED_DEDUCTIONS = [
  { item: '捐贈（一般）', limit: '所得總額 20%', note: '對教育、文化、公益慈善機構' },
  { item: '捐贈（政府、國防）', limit: '無上限', note: '全額列報' },
  { item: '保險費', limit: '每人 NT$24,000', note: '人身保險費（不含健保費）' },
  { item: '全民健保費', limit: '無上限', note: '全額列報' },
  { item: '醫藥及生育費', limit: '無上限', note: '掛號費不可列報' },
  { item: '災害損失', limit: '無上限', note: '需申報並經核定' },
  { item: '購屋借款利息', limit: 'NT$300,000', note: '自用住宅，減除儲蓄投資特別扣除額後的餘額' },
  { item: '房屋租金支出', limit: 'NT$180,000', note: '自住，不得與購屋借款利息同時列報' },
  { item: '政治獻金', limit: '所得總額 20%，上限 NT$200,000', note: '個人對候選人/政黨' },
]

const SPECIAL_DEDUCTIONS = [
  { item: '薪資所得特別扣除額', amount: 218000, note: '每人' },
  { item: '儲蓄投資特別扣除額', amount: 270000, note: '存款利息、公債利息等' },
  { item: '身心障礙特別扣除額', amount: 218000, note: '每人' },
  { item: '教育學費特別扣除額', amount: 25000, note: '每人（子女就讀大專以上）' },
  { item: '幼兒學前特別扣除額', amount: 150000, note: '每人（6歲以下子女）' },
  { item: '長期照顧特別扣除額', amount: 120000, note: '每人' },
  { item: '基本生活費差額', amount: 0, note: '每人 NT$210,000（2024），可保障基本生活所需' },
]

const BASIC_LIVING_EXPENSE = 210000 // 2024

interface Props {
  labels?: {
    title?: string; desc?: string
    exemptionTitle?: string; standardTitle?: string; itemizedTitle?: string
    specialTitle?: string; basicLivingTitle?: string
    item?: string; amount?: string; limit?: string; note?: string
  }
}

export default function TwTaxDeductions({ labels }: Props) {
  const l = {
    title: labels?.title ?? '免稅額與扣除額一覽',
    desc: labels?.desc ?? '113年度（2024）申報適用',
    exemptionTitle: labels?.exemptionTitle ?? '免稅額',
    standardTitle: labels?.standardTitle ?? '標準扣除額',
    itemizedTitle: labels?.itemizedTitle ?? '列舉扣除額項目',
    specialTitle: labels?.specialTitle ?? '特別扣除額',
    basicLivingTitle: labels?.basicLivingTitle ?? '基本生活費',
    item: labels?.item ?? '項目',
    amount: labels?.amount ?? '金額',
    limit: labels?.limit ?? '上限',
    note: labels?.note ?? '備註',
  }

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }
  const sectionStyle: React.CSSProperties = { fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }

  return (
    <div className="flex flex-col gap-6">
      {/* Basic living expense highlight */}
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
        <div className="text-sm">
          <strong>{l.basicLivingTitle}：</strong>2024年度每人基本生活所需費用 NT${fmt(BASIC_LIVING_EXPENSE)}。
          申報戶基本生活費總額超過免稅額+標準/列舉扣除額+特別扣除額（部分）合計數之差額，可自所得總額中減除。
        </div>
      </div>

      {/* Exemptions */}
      <div>
        <div style={sectionStyle}>{l.exemptionTitle}</div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.amount}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {EXEMPTIONS.map((r, i) => (
              <tr key={i}>
                <td style={cellStyle}>{r.item}</td>
                <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.amount)}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Standard deductions */}
      <div>
        <div style={sectionStyle}>{l.standardTitle}</div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.amount}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {STANDARD_DEDUCTIONS.map((r, i) => (
              <tr key={i}>
                <td style={cellStyle}>{r.item}</td>
                <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(r.amount)}</td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Itemized deductions */}
      <div>
        <div style={sectionStyle}>{l.itemizedTitle}</div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
                <th style={{ ...headerCell, textAlign: 'right' }}>{l.limit}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
              </tr>
            </thead>
            <tbody>
              {ITEMIZED_DEDUCTIONS.map((r, i) => (
                <tr key={i}>
                  <td style={cellStyle}>{r.item}</td>
                  <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 600 }}>{r.limit}</td>
                  <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Special deductions */}
      <div>
        <div style={sectionStyle}>{l.specialTitle}</div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.item}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.amount}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.note}</th>
            </tr>
          </thead>
          <tbody>
            {SPECIAL_DEDUCTIONS.map((r, i) => (
              <tr key={i}>
                <td style={cellStyle}>{r.item}</td>
                <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {r.amount > 0 ? `NT$${fmt(r.amount)}` : '依計算'}
                </td>
                <td style={{ ...cellStyle, fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
