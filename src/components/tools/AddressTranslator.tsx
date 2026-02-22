'use client'
import { useState, useMemo } from 'react'

interface AddressTranslatorProps {
  labels?: {
    inputLabel: string
    inputPlaceholder: string
    result: string
    copy: string
    copied: string
    note: string
    city: string
    district: string
    road: string
  }
}

// Taiwan city/district name mapping (Chinese → English)
const CITY_MAP: Record<string, string> = {
  '台北市': 'Taipei City', '臺北市': 'Taipei City',
  '新北市': 'New Taipei City',
  '桃園市': 'Taoyuan City',
  '台中市': 'Taichung City', '臺中市': 'Taichung City',
  '台南市': 'Tainan City', '臺南市': 'Tainan City',
  '高雄市': 'Kaohsiung City',
  '基隆市': 'Keelung City',
  '新竹市': 'Hsinchu City',
  '新竹縣': 'Hsinchu County',
  '苗栗縣': 'Miaoli County',
  '彰化縣': 'Changhua County',
  '南投縣': 'Nantou County',
  '雲林縣': 'Yunlin County',
  '嘉義市': 'Chiayi City',
  '嘉義縣': 'Chiayi County',
  '屏東縣': 'Pingtung County',
  '宜蘭縣': 'Yilan County',
  '花蓮縣': 'Hualien County',
  '台東縣': 'Taitung County', '臺東縣': 'Taitung County',
  '澎湖縣': 'Penghu County',
  '金門縣': 'Kinmen County',
  '連江縣': 'Lienchiang County',
}

const DISTRICT_MAP: Record<string, string> = {
  // 台北市
  '中正區': 'Zhongzheng Dist.', '大同區': 'Datong Dist.', '中山區': 'Zhongshan Dist.',
  '松山區': 'Songshan Dist.', '大安區': 'Da\'an Dist.', '萬華區': 'Wanhua Dist.',
  '信義區': 'Xinyi Dist.', '士林區': 'Shilin Dist.', '北投區': 'Beitou Dist.',
  '內湖區': 'Neihu Dist.', '南港區': 'Nangang Dist.', '文山區': 'Wenshan Dist.',
  // 新北市
  '板橋區': 'Banqiao Dist.', '汐止區': 'Xizhi Dist.', '新店區': 'Xindian Dist.',
  '永和區': 'Yonghe Dist.', '中和區': 'Zhonghe Dist.', '土城區': 'Tucheng Dist.',
  '三峽區': 'Sanxia Dist.', '樹林區': 'Shulin Dist.', '鶯歌區': 'Yingge Dist.',
  '三重區': 'Sanchong Dist.', '新莊區': 'Xinzhuang Dist.', '泰山區': 'Taishan Dist.',
  '林口區': 'Linkou Dist.', '蘆洲區': 'Luzhou Dist.', '五股區': 'Wugu Dist.',
  '八里區': 'Bali Dist.', '淡水區': 'Tamsui Dist.', '三芝區': 'Sanzhi Dist.',
  '石門區': 'Shimen Dist.', '瑞芳區': 'Ruifang Dist.', '平溪區': 'Pingxi Dist.',
  '雙溪區': 'Shuangxi Dist.', '貢寮區': 'Gongliao Dist.', '深坑區': 'Shenkeng Dist.',
  '石碇區': 'Shiding Dist.', '坪林區': 'Pinglin Dist.', '烏來區': 'Wulai Dist.',
  '萬里區': 'Wanli Dist.', '金山區': 'Jinshan Dist.',
  // 桃園市
  '桃園區': 'Taoyuan Dist.', '中壢區': 'Zhongli Dist.', '平鎮區': 'Pingzhen Dist.',
  '龍潭區': 'Longtan Dist.', '楊梅區': 'Yangmei Dist.', '新屋區': 'Xinwu Dist.',
  '觀音區': 'Guanyin Dist.', '龜山區': 'Guishan Dist.', '八德區': 'Bade Dist.',
  '大溪區': 'Daxi Dist.', '復興區': 'Fuxing Dist.', '大園區': 'Dayuan Dist.',
  '蘆竹區': 'Luzhu Dist.',
  // 台中市
  '中區': 'Central Dist.', '東區': 'East Dist.', '南區': 'South Dist.',
  '西區': 'West Dist.', '北區': 'North Dist.', '北屯區': 'Beitun Dist.',
  '西屯區': 'Xitun Dist.', '南屯區': 'Nantun Dist.', '太平區': 'Taiping Dist.',
  '大里區': 'Dali Dist.', '霧峰區': 'Wufeng Dist.', '烏日區': 'Wuri Dist.',
  '豐原區': 'Fengyuan Dist.', '后里區': 'Houli Dist.', '石岡區': 'Shigang Dist.',
  '東勢區': 'Dongshi Dist.', '和平區': 'Heping Dist.', '新社區': 'Xinshe Dist.',
  '潭子區': 'Tanzi Dist.', '大雅區': 'Daya Dist.', '神岡區': 'Shengang Dist.',
  '大肚區': 'Dadu Dist.', '沙鹿區': 'Shalu Dist.', '龍井區': 'Longjing Dist.',
  '梧棲區': 'Wuqi Dist.', '清水區': 'Qingshui Dist.', '大甲區': 'Dajia Dist.',
  '外埔區': 'Waipu Dist.',
  // 台南市
  '中西區': 'West Central Dist.', '安平區': 'Anping Dist.', '安南區': 'Annan Dist.',
  '永康區': 'Yongkang Dist.', '歸仁區': 'Guiren Dist.', '新化區': 'Xinhua Dist.',
  '仁德區': 'Rende Dist.', '關廟區': 'Guanmiao Dist.', '官田區': 'Guantian Dist.',
  '麻豆區': 'Madou Dist.', '佳里區': 'Jiali Dist.', '新營區': 'Xinying Dist.',
  '善化區': 'Shanhua Dist.', '新市區': 'Xinshi Dist.', '安定區': 'Anding Dist.',
  // 高雄市
  '新興區': 'Xinxing Dist.', '前金區': 'Qianjin Dist.', '苓雅區': 'Lingya Dist.',
  '鹽埕區': 'Yancheng Dist.', '鼓山區': 'Gushan Dist.', '旗津區': 'Qijin Dist.',
  '前鎮區': 'Qianzhen Dist.', '三民區': 'Sanmin Dist.', '楠梓區': 'Nanzih Dist.',
  '小港區': 'Xiaogang Dist.', '左營區': 'Zuoying Dist.', '仁武區': 'Renwu Dist.',
  '大社區': 'Dashe Dist.', '岡山區': 'Gangshan Dist.', '鳳山區': 'Fengshan Dist.',
  '大寮區': 'Daliao Dist.', '林園區': 'Linyuan Dist.', '鳥松區': 'Niaosong Dist.',
  '大樹區': 'Dashu Dist.', '旗山區': 'Qishan Dist.', '美濃區': 'Meinong Dist.',
}

// Common road/lane/alley suffixes
const ROAD_SUFFIX_MAP: [RegExp, string][] = [
  [/(\d+)巷/g, 'Ln. $1'],
  [/(\d+)弄/g, 'Aly. $1'],
  [/(\d+)號/g, 'No. $1'],
  [/(\d+)樓/g, '$1F'],
  [/之(\d+)/g, '-$1'],
  [/(\d+)段/g, 'Sec. $1'],
]

const ROAD_MAP: Record<string, string> = {
  '路': 'Rd.', '街': 'St.', '大道': 'Blvd.', '大路': 'Rd.',
  '巷': 'Ln.', '弄': 'Aly.', '號': 'No.',
}

function translateAddress(input: string): string {
  let addr = input.trim()
  if (!addr) return ''

  // Extract postal code if present
  let postalCode = ''
  const postalMatch = addr.match(/^(\d{3,5})\s*/)
  if (postalMatch) {
    postalCode = postalMatch[1]
    addr = addr.slice(postalMatch[0].length)
  }

  // Find and extract city
  let cityEn = ''
  let remaining = addr
  for (const [cn, en] of Object.entries(CITY_MAP)) {
    if (addr.includes(cn)) {
      cityEn = en
      remaining = remaining.replace(cn, '')
      break
    }
  }

  // Find and extract district
  let districtEn = ''
  for (const [cn, en] of Object.entries(DISTRICT_MAP)) {
    if (remaining.includes(cn)) {
      districtEn = en
      remaining = remaining.replace(cn, '')
      break
    }
  }

  // Process the remaining part (road, number, floor, etc.)
  let roadPart = remaining.trim()

  // Apply number-based replacements
  for (const [re, replacement] of ROAD_SUFFIX_MAP) {
    roadPart = roadPart.replace(re, replacement)
  }

  // Split and reverse parts for English address order
  // Try to identify road name - use Wade-Giles / Hanyu Pinyin as placeholder
  let roadEn = roadPart
  for (const [cn, en] of Object.entries(ROAD_MAP)) {
    roadEn = roadEn.replace(new RegExp(cn, 'g'), ` ${en}`)
  }

  // Build English address (reverse order: number, road, district, city, postal)
  const parts: string[] = []
  if (roadEn.trim()) parts.push(roadEn.trim())
  if (districtEn) parts.push(districtEn)
  if (cityEn) parts.push(cityEn)
  if (postalCode) parts.push(postalCode)

  // Always add Taiwan
  parts.push('Taiwan')

  return parts.join(', ')
}

export default function AddressTranslator({ labels }: AddressTranslatorProps) {
  const l = {
    inputLabel: labels?.inputLabel ?? '中文地址',
    inputPlaceholder: labels?.inputPlaceholder ?? '例：100 台北市中正區重慶南路一段122號3樓',
    result: labels?.result ?? '英文地址',
    copy: labels?.copy ?? '複製',
    copied: labels?.copied ?? '已複製！',
    note: labels?.note ?? '※ 路名翻譯僅供參考，正式英譯請以中華郵政為準',
    city: labels?.city ?? '縣市',
    district: labels?.district ?? '鄉鎮市區',
    road: labels?.road ?? '路街門牌',
  }

  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => translateAddress(input), [input])

  const handleCopy = () => {
    if (!result) return
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.inputLabel}</label>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={l.inputPlaceholder}
          style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1rem' }}
        />
      </div>

      {result && (
        <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0.75rem', backgroundColor: 'var(--color-bg-secondary)', borderBottom: '1px solid var(--color-border)' }}>
            <span style={{ fontWeight: 600 }}>{l.result}</span>
            <button
              onClick={handleCopy}
              style={{ padding: '0.25rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.25rem', background: 'none', cursor: 'pointer', fontSize: '0.85rem', color: copied ? 'var(--color-primary)' : 'inherit' }}
            >
              {copied ? l.copied : l.copy}
            </button>
          </div>
          <div style={{ padding: '1rem 0.75rem', fontSize: '1.1rem', fontFamily: 'monospace', wordBreak: 'break-word' }}>
            {result}
          </div>
        </div>
      )}

      <div style={{ border: '1px solid var(--color-border)', borderRadius: '0.5rem', padding: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>英文地址書寫格式：</p>
        <p style={{ margin: 0 }}>樓, 號, 巷/弄, 段, 路/街, 區, 市/縣, 郵遞區號, Taiwan</p>
        <p style={{ margin: '0.5rem 0 0 0' }}>例：3F., No. 122, Sec. 1, Chongqing S. Rd., Zhongzheng Dist., Taipei City 100, Taiwan</p>
      </div>

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', margin: 0, textAlign: 'center' }}>
        {l.note}
      </p>
    </div>
  )
}
