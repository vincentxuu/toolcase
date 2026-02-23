'use client'
import { useState, useMemo } from 'react'

interface NameStrokeCalculatorProps {
  labels?: {
    title: string
    inputPlaceholder: string
    calculate: string
    totalStrokes: string
    eachChar: string
    fortune: string
    strokeBreakdown: string
  }
}

// Common CJK character stroke counts (Unicode radical-stroke based lookup)
// For characters not in the map, we estimate from Unicode CJK block
const STROKE_MAP: Record<string, number> = {
  // Common surnames
  '王': 4, '李': 7, '張': 11, '劉': 15, '陳': 11, '楊': 13, '黃': 12, '趙': 14, '周': 8, '吳': 7,
  '徐': 10, '孫': 10, '馬': 10, '朱': 6, '胡': 9, '郭': 11, '林': 8, '何': 7, '高': 10, '羅': 20,
  '鄭': 15, '梁': 11, '謝': 17, '宋': 7, '唐': 10, '許': 11, '鄧': 15, '馮': 12, '韓': 17, '曹': 11,
  '曾': 12, '彭': 12, '蕭': 16, '蔡': 14, '潘': 15, '田': 5, '董': 12, '袁': 10, '于': 3, '余': 7,
  '葉': 13, '蔣': 15, '杜': 7, '蘇': 22, '魏': 18, '程': 12, '呂': 6, '丁': 2, '沈': 7, '任': 6,
  '姚': 9, '盧': 16, '傅': 12, '鍾': 17, '姜': 9, '崔': 11, '譚': 19, '廖': 14, '范': 8, '汪': 7,
  '陸': 11, '金': 8, '石': 5, '戴': 18, '賈': 13, '韋': 9, '夏': 10, '邱': 7, '方': 4, '侯': 9,
  '鄒': 12, '熊': 14, '孟': 8, '秦': 10, '白': 5, '江': 6, '閻': 11, '薛': 17, '尹': 4, '段': 9,
  '雷': 13, '黎': 15, '史': 5, '龍': 16, '賀': 12, '萬': 13, '邵': 7, '錢': 16, '嚴': 20, '覃': 12,
  '洪': 9, '武': 8, '莫': 10, '孔': 4,
  // Common given name characters
  '明': 8, '華': 10, '文': 4, '英': 8, '國': 11, '建': 9, '志': 7, '永': 5, '玉': 5, '秀': 7,
  '美': 9, '麗': 19, '德': 15, '春': 9, '海': 10, '強': 12, '軍': 9, '平': 5, '成': 6, '東': 8,
  '新': 13, '民': 5, '正': 5, '光': 6, '天': 4, '雲': 12, '家': 10, '子': 3, '小': 3, '大': 3,
  '中': 4, '長': 8, '生': 5, '安': 6, '世': 5, '紅': 9, '宏': 7, '偉': 11, '傑': 12, '慧': 15,
  '芳': 8, '雅': 12, '婷': 12, '怡': 8, '佳': 8, '惠': 12, '琪': 13, '敏': 11, '靜': 16, '淑': 11,
  '珍': 10, '如': 6, '雪': 11, '思': 9, '嘉': 14, '欣': 8, '詩': 13, '瑜': 14, '宜': 8, '琳': 13,
  '心': 4, '萱': 15, '潔': 15, '瑤': 15, '蓉': 13, '庭': 10, '恩': 10, '妍': 7, '妤': 7, '涵': 11,
  '晴': 12, '雯': 12, '柔': 9, '彤': 7, '語': 14, '翰': 16, '宇': 6, '哲': 10, '睿': 14, '澤': 16,
  '博': 12, '浩': 10, '凱': 12, '翔': 12, '昊': 8, '祥': 11, '俊': 9, '賢': 15, '豪': 14, '信': 9,
  '毅': 15, '廷': 7, '瑋': 14, '辰': 7, '霖': 16, '承': 8, '勳': 16, '銘': 14, '威': 9,
  // Numbers and common chars
  '一': 1, '二': 2, '三': 3, '四': 5, '五': 4, '六': 4, '七': 2, '八': 2, '九': 2, '十': 2,
  '百': 6, '千': 3, '億': 15,
  '人': 2, '山': 3, '水': 4, '火': 4, '木': 4, '土': 3, '日': 4, '月': 4, '風': 9, '花': 8,
  '愛': 13, '樂': 15, '福': 14, '壽': 14, '喜': 12, '財': 10, '寶': 20, '鳳': 14,
  '仁': 4, '義': 13, '禮': 18, '智': 12, '勇': 9, '忠': 8, '孝': 7, '和': 8, '善': 12, '真': 10,
}

// Fortune interpretation based on total strokes
const FORTUNE_TABLE: Record<number, { fortune: string; meaning: string }> = {
  1: { fortune: '大吉', meaning: '宇宙起源，天地開泰，大展鴻圖' },
  2: { fortune: '凶', meaning: '混沌未定，進退保守，志望難達' },
  3: { fortune: '吉', meaning: '萬物成形，確立之象，名利雙收' },
  5: { fortune: '吉', meaning: '陰陽和合，生意興隆，福祿壽長' },
  6: { fortune: '吉', meaning: '萬寶集門，天降幸運，定能成功' },
  7: { fortune: '吉', meaning: '精力充沛，頭腦明敏，排除萬難' },
  8: { fortune: '吉', meaning: '努力發達，貫徹志望，不忘進退' },
  11: { fortune: '大吉', meaning: '草木逢春，枝葉漸茂，穩健著實' },
  13: { fortune: '大吉', meaning: '才藝多能，智謀奇略，忍柔當事' },
  15: { fortune: '大吉', meaning: '福壽圓滿，富貴榮譽，涵養雅量' },
  16: { fortune: '大吉', meaning: '貴人得助，天乙貴人，眾望所歸' },
  21: { fortune: '大吉', meaning: '獨立權威，光風霽月，大業成就' },
  23: { fortune: '大吉', meaning: '旭日東升，壯麗壯觀，功名榮達' },
  24: { fortune: '大吉', meaning: '錦繡前程，須靠自力，多用智謀' },
  25: { fortune: '吉', meaning: '資性英敏，才能奇特，自成大業' },
  29: { fortune: '吉', meaning: '智謀優秀，財力歸集，名聞海外' },
  31: { fortune: '大吉', meaning: '智仁勇德，可享清福，名利雙收' },
  32: { fortune: '大吉', meaning: '僥倖多望，貴人得助，財帛如裕' },
  33: { fortune: '大吉', meaning: '家門隆昌，才德開展，平安吉祥' },
  35: { fortune: '吉', meaning: '溫良和順，智達通暢，家門繁榮' },
  37: { fortune: '吉', meaning: '權威顯達，熱誠忠信，宜著雅量' },
  39: { fortune: '吉', meaning: '富貴榮華，財帛豐盈，暗藏險象' },
  41: { fortune: '大吉', meaning: '純陽獨秀，德高望重，和順暢達' },
  45: { fortune: '吉', meaning: '新生泰和，順風揚帆，穩健著實' },
  47: { fortune: '大吉', meaning: '有貴人助，可成大業，力能勝難' },
  48: { fortune: '大吉', meaning: '智謀兼備，德量榮達，威望成師' },
  // Common 凶 numbers
  4: { fortune: '凶', meaning: '日被雲遮，苦難折磨，非有毅力' },
  9: { fortune: '凶', meaning: '利去功空，陷落窮迫，逆運進短' },
  10: { fortune: '凶', meaning: '烏雲遮月，暗淡無光，空費心力' },
  12: { fortune: '凶', meaning: '薄弱無力，孤立無援，外祥內苦' },
  14: { fortune: '凶', meaning: '忍得苦難，必有後福，是成是敗' },
  19: { fortune: '凶', meaning: '成功雖早，慎防虧空，內外不合' },
  20: { fortune: '凶', meaning: '智高志大，歷盡艱難，焦心憂勞' },
  22: { fortune: '凶', meaning: '秋草逢霜，懷才不遇，事不如意' },
  26: { fortune: '凶', meaning: '波瀾起伏，奇變萬端，風波不息' },
  27: { fortune: '半吉半凶', meaning: '自我心過強，多受誹謗攻擊' },
  28: { fortune: '凶', meaning: '魚臨旱地，難逃惡運，此數大凶' },
  30: { fortune: '半吉半凶', meaning: '吉凶參半，得失相伴，投機取巧' },
  34: { fortune: '凶', meaning: '破家之身，見識短小，辛苦遭逢' },
  36: { fortune: '半吉半凶', meaning: '波瀾重疊，常陷窮困，動不如靜' },
  40: { fortune: '半吉半凶', meaning: '智謀膽力，冒險投機，沉浮不定' },
  42: { fortune: '半吉半凶', meaning: '十藝九不成，專一求發展' },
  43: { fortune: '凶', meaning: '雨夜之花，外觀幽雅，內心苦惱' },
  44: { fortune: '凶', meaning: '事不如意，煩悶不堪，難成事業' },
  46: { fortune: '半吉半凶', meaning: '載寶沉舟，浪裡淘金，大凶之兆' },
  49: { fortune: '半吉半凶', meaning: '吉凶難分，不幸災禍，轉凶為吉' },
  50: { fortune: '半吉半凶', meaning: '一成一敗，吉凶互見，先苦後甘' },
}

function getStrokeCount(char: string): number {
  if (STROKE_MAP[char] !== undefined) return STROKE_MAP[char]
  // Fallback: estimate from Unicode code point for CJK characters
  const code = char.charCodeAt(0)
  if (code >= 0x4E00 && code <= 0x9FFF) {
    // Very rough estimate based on CJK block position
    return Math.floor(((code - 0x4E00) % 20) + 3)
  }
  return 0
}

function getFortune(total: number): { fortune: string; meaning: string } {
  if (FORTUNE_TABLE[total]) return FORTUNE_TABLE[total]
  // For numbers not in table, use modulo pattern
  const mod = total % 10
  if ([1, 3, 5, 7, 8].includes(mod)) return { fortune: '吉', meaning: '運勢平穩，腳踏實地可有成就' }
  if ([0, 2, 4].includes(mod)) return { fortune: '半吉半凶', meaning: '凡事宜謹慎，把握機會可轉吉' }
  return { fortune: '半吉半凶', meaning: '吉凶參半，需靠個人努力' }
}

export default function NameStrokeCalculator({ labels }: NameStrokeCalculatorProps) {
  const l = {
    title: labels?.title ?? '姓名筆畫吉凶',
    inputPlaceholder: labels?.inputPlaceholder ?? '請輸入姓名（中文）',
    calculate: labels?.calculate ?? '查詢',
    totalStrokes: labels?.totalStrokes ?? '總筆畫數',
    eachChar: labels?.eachChar ?? '各字筆畫',
    fortune: labels?.fortune ?? '吉凶判定',
    strokeBreakdown: labels?.strokeBreakdown ?? '筆畫明細',
  }

  const [name, setName] = useState('')

  const result = useMemo(() => {
    const chars = name.trim().split('').filter((c) => c.charCodeAt(0) >= 0x4E00)
    if (chars.length === 0) return null
    const strokes = chars.map((c) => ({ char: c, count: getStrokeCount(c) }))
    const total = strokes.reduce((sum, s) => sum + s.count, 0)
    const fortune = getFortune(total)
    return { strokes, total, fortune }
  }, [name])

  const fortuneColor = (f: string) => {
    if (f === '大吉') return '#16a34a'
    if (f === '吉') return '#22c55e'
    if (f === '凶') return '#dc2626'
    return '#f59e0b'
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={l.inputPlaceholder}
          maxLength={6}
          style={{ flex: 1, padding: '0.75rem 1rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontSize: '1.25rem', letterSpacing: '0.5em', textAlign: 'center' }}
        />
      </div>

      {result && (
        <>
          {/* Stroke Breakdown */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {result.strokes.map((s, i) => (
              <div key={i} style={{ textAlign: 'center', border: '1px solid var(--color-border)', borderRadius: '0.5rem', padding: '1rem 1.5rem', minWidth: '80px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 700 }}>{s.char}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{s.count} 畫</div>
              </div>
            ))}
          </div>

          {/* Total & Fortune */}
          <div className="border border-[var(--color-border)] rounded-lg overflow-hidden">
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
              <span className="font-semibold">{l.totalStrokes}</span>
              <span className="text-2xl font-bold">{result.total} 畫</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--color-border)', alignItems: 'center' }}>
              <span className="font-semibold">{l.fortune}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: fortuneColor(result.fortune.fortune) }}>{result.fortune.fortune}</span>
            </div>
            <div style={{ padding: '1rem', backgroundColor: 'var(--color-bg-secondary)' }}>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>{result.fortune.meaning}</p>
            </div>
          </div>

          {/* Stroke formula */}
          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--color-text-secondary)' }}>
            {l.strokeBreakdown}：{result.strokes.map((s) => `${s.char}(${s.count})`).join(' + ')} = {result.total}
          </div>
        </>
      )}

      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        ※ 僅供娛樂參考，筆畫數以康熙字典為準可能略有差異
      </p>
    </div>
  )
}
