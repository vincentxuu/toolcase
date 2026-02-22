'use client'

const INDUSTRY_RATES = [
  { code: '01', industry: '農、牧業', rate: '0.15%' },
  { code: '02', industry: '林業', rate: '0.64%' },
  { code: '03', industry: '漁業', rate: '0.42%' },
  { code: '04', industry: '礦業及土石採取業', rate: '0.92%' },
  { code: '05', industry: '製造業', rate: '0.15% ~ 0.42%' },
  { code: '06', industry: '電力及燃氣供應業', rate: '0.22%' },
  { code: '07', industry: '用水供應及污染整治業', rate: '0.27%' },
  { code: '08', industry: '營建工程業', rate: '0.51%' },
  { code: '09', industry: '批發及零售業', rate: '0.11%' },
  { code: '10', industry: '運輸及倉儲業', rate: '0.18% ~ 0.51%' },
  { code: '11', industry: '住宿及餐飲業', rate: '0.12%' },
  { code: '12', industry: '出版影音及資通訊業', rate: '0.07%' },
  { code: '13', industry: '金融及保險業', rate: '0.04%' },
  { code: '14', industry: '不動產業', rate: '0.14%' },
  { code: '15', industry: '專業、科學及技術服務業', rate: '0.07%' },
  { code: '16', industry: '支援服務業', rate: '0.21%' },
  { code: '17', industry: '教育業', rate: '0.07%' },
  { code: '18', industry: '醫療保健及社會工作服務業', rate: '0.08%' },
  { code: '19', industry: '藝術、娛樂及休閒服務業', rate: '0.14%' },
  { code: '20', industry: '其他服務業', rate: '0.14%' },
]

const KEY_INFO = [
  { item: '適用對象', desc: '所有受僱勞工（含外籍勞工、部分工時勞工、4人以下事業單位）' },
  { item: '保險費率', desc: '依行業別 0.04% ~ 0.92%，另加上下班災害費率 0.07%' },
  { item: '費用負擔', desc: '全額由雇主負擔（勞工不用付費）' },
  { item: '投保薪資上限', desc: 'NT$72,800' },
  { item: '投保薪資下限', desc: '基本工資 NT$27,470' },
  { item: '施行日期', desc: '2022年5月1日起（勞工職業災害保險及保護法）' },
]

const BENEFITS_OVERVIEW = [
  { type: '醫療給付', desc: '門診、住院醫療費用' },
  { type: '傷病給付', desc: '不能工作第4日起，按平均投保薪資 70% 給付（第2年起50%）' },
  { type: '失能給付', desc: '依失能等級，一次金或年金' },
  { type: '死亡給付', desc: '喪葬津貼 + 遺屬年金/遺屬津貼' },
  { type: '失蹤給付', desc: '按月發給70%投保薪資' },
]

interface Props {
  labels?: {
    title?: string; desc?: string
    keyInfoTitle?: string; item?: string; description?: string
    industryTitle?: string; code?: string; industry?: string; rate?: string
    benefitsTitle?: string; type?: string
  }
}

export default function TwOccupationalAccidentInsurance({ labels }: Props) {
  const l = {
    title: labels?.title ?? '職災保險費率表',
    desc: labels?.desc ?? '113年度（2024）適用',
    keyInfoTitle: labels?.keyInfoTitle ?? '重要資訊',
    item: labels?.item ?? '項目',
    description: labels?.description ?? '說明',
    industryTitle: labels?.industryTitle ?? '行業別費率表',
    code: labels?.code ?? '代碼',
    industry: labels?.industry ?? '行業別',
    rate: labels?.rate ?? '費率',
    benefitsTitle: labels?.benefitsTitle ?? '給付項目概覽',
    type: labels?.type ?? '給付類別',
  }

  const cellStyle: React.CSSProperties = { padding: '0.75rem 1rem', borderBottom: '1px solid var(--color-border)' }
  const headerCell: React.CSSProperties = { ...cellStyle, fontWeight: 600, fontSize: '0.8125rem', color: 'var(--color-text-secondary)', borderBottom: '2px solid var(--color-border)' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
        <div style={{ fontSize: '0.875rem' }}>
          <strong>勞工職業災害保險：</strong>全額由雇主負擔，勞工不須繳納任何保費。自2022年5月1日起強制納保所有受僱勞工。
        </div>
      </div>

      {/* Key info */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.keyInfoTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <tbody>
            {KEY_INFO.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600, width: '30%' }}>{r.item}</td>
                <td style={cellStyle}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Industry rates */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.industryTitle}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.code}</th>
                <th style={{ ...headerCell, textAlign: 'left' }}>{l.industry}</th>
                <th style={{ ...headerCell, textAlign: 'center' }}>{l.rate}</th>
              </tr>
            </thead>
            <tbody>
              {INDUSTRY_RATES.map((r, i) => (
                <tr key={i}>
                  <td style={{ ...cellStyle, textAlign: 'center' }}>{r.code}</td>
                  <td style={cellStyle}>{r.industry}</td>
                  <td style={{ ...cellStyle, textAlign: 'center', fontWeight: 700, color: 'var(--color-primary)' }}>{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Benefits */}
      <div>
        <div style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.benefitsTitle}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
          <thead>
            <tr>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.type}</th>
              <th style={{ ...headerCell, textAlign: 'left' }}>{l.description}</th>
            </tr>
          </thead>
          <tbody>
            {BENEFITS_OVERVIEW.map((r, i) => (
              <tr key={i}>
                <td style={{ ...cellStyle, fontWeight: 600 }}>{r.type}</td>
                <td style={cellStyle}>{r.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
