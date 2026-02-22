'use client'

const MINIMUM_WAGE_HISTORY = [
  { year: '2025', monthly: 28590, hourly: 190, effectiveDate: '2025/01/01', increase: '3.45%' },
  { year: '2024', monthly: 27470, hourly: 183, effectiveDate: '2024/01/01', increase: '4.05%' },
  { year: '2023', monthly: 26400, hourly: 176, effectiveDate: '2023/01/01', increase: '4.56%' },
  { year: '2022', monthly: 25250, hourly: 168, effectiveDate: '2022/01/01', increase: '5.21%' },
  { year: '2021', monthly: 24000, hourly: 160, effectiveDate: '2021/01/01', increase: '1.47%' },
  { year: '2020', monthly: 23800, hourly: 158, effectiveDate: '2020/01/01', increase: '3.03%' },
  { year: '2019', monthly: 23100, hourly: 150, effectiveDate: '2019/01/01', increase: '5.00%' },
  { year: '2018', monthly: 22000, hourly: 140, effectiveDate: '2018/01/01', increase: '4.76%' },
  { year: '2017', monthly: 21009, hourly: 133, effectiveDate: '2017/01/01', increase: '5.00%' },
  { year: '2016', monthly: 20008, hourly: 126, effectiveDate: '2016/01/01', increase: '5.03%' },
  { year: '2015', monthly: 20008, hourly: 120, effectiveDate: '2015/07/01', increase: '3.81%' },
  { year: '2014', monthly: 19273, hourly: 115, effectiveDate: '2014/07/01', increase: '1.65%' },
  { year: '2013', monthly: 19047, hourly: 109, effectiveDate: '2013/04/01', increase: '1.42%' },
  { year: '2012', monthly: 18780, hourly: 103, effectiveDate: '2012/01/01', increase: '5.03%' },
  { year: '2011', monthly: 17880, hourly: 98, effectiveDate: '2011/01/01', increase: '3.47%' },
]

const RELATED_INFO = [
  { item: '2025年月薪基本工資', value: 'NT$28,590' },
  { item: '2025年時薪基本工資', value: 'NT$190' },
  { item: '適用對象', value: '全國所有受僱勞工（含外籍勞工、部分工時勞工）' },
  { item: '審議機制', value: '基本工資審議委員會每年第三季開會，隔年1月實施' },
  { item: '違反罰則', value: '處 NT$20,000 ~ NT$1,000,000 罰鍰' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    year?: string; monthlyWage?: string; hourlyWage?: string
    effectiveDate?: string; increase?: string
    keyInfoTitle?: string; item?: string; value?: string
  }
}

export default function TwMinimumWage({ labels }: Props) {
  const l = {
    title: labels?.title ?? '基本工資歷年一覽表',
    desc: labels?.desc ?? '2011 ~ 2025',
    year: labels?.year ?? '年度',
    monthlyWage: labels?.monthlyWage ?? '月薪（元）',
    hourlyWage: labels?.hourlyWage ?? '時薪（元）',
    effectiveDate: labels?.effectiveDate ?? '生效日期',
    increase: labels?.increase ?? '調幅',
    keyInfoTitle: labels?.keyInfoTitle ?? '重要資訊',
    item: labels?.item ?? '項目',
    value: labels?.value ?? '說明',
  }

  const fmt = (n: number) => n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Current highlight */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>2025 年月薪基本工資</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)' }}>NT${fmt(28590)}</div>
        </div>
        <div style={{ padding: '1.5rem', borderRadius: '0.75rem', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' }}>2025 年時薪基本工資</div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#10b981' }}>NT${fmt(190)}</div>
        </div>
      </div>

      {/* History table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.year}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.monthlyWage}</th>
              <th style={{ ...headerCell, textAlign: 'right' }}>{l.hourlyWage}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.effectiveDate}</th>
              <th style={{ ...headerCell, textAlign: 'center' }}>{l.increase}</th>
            </tr>
          </thead>
          <tbody>
            {MINIMUM_WAGE_HISTORY.map((r, i) => (
              <tr key={i} style={i === 0 ? { backgroundColor: 'rgba(59,130,246,0.08)' } : {}}>
                <td style={{ ...cellStyle, textAlign: 'center', fontWeight: i === 0 ? 700 : 400 }}>{r.year}</td>
                <td style={{ ...cellStyle, textAlign: 'right', fontWeight: 700, color: i === 0 ? 'var(--color-primary)' : 'inherit' }}>NT${fmt(r.monthly)}</td>
                <td style={{ ...cellStyle, textAlign: 'right' }}>NT${fmt(r.hourly)}</td>
                <td style={{ ...cellStyle, textAlign: 'center', fontSize: '0.8125rem' }}>{r.effectiveDate}</td>
                <td style={{ ...cellStyle, textAlign: 'center', color: '#10b981' }}>+{r.increase}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Key info */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.keyInfoTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <tbody>
            {RELATED_INFO.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600, width: '35%' }}>{r.item}</td>
                <td style={cellStyle}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
