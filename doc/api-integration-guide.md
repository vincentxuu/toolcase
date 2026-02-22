# API 整合指南

> 需要後端/API 支援的工具整合說明

---

## 🌐 台灣政府開放資料 API

### 1. 台灣空氣品質指數 (AQI)

#### API 來源
- **環保署空氣品質監測網**
- API 文件: https://data.gov.tw/dataset/40448
- 更新頻率: 每小時

#### API 端點
```
GET https://data.moenv.gov.tw/api/v2/aqx_p_432
```

#### 請求參數
```typescript
interface AQIParams {
  limit?: number        // 限制回傳筆數
  offset?: number       // 跳過筆數
  sort?: string        // 排序欄位
  filters?: string     // 過濾條件
  api_key: string      // API 金鑰 (可能需要申請)
}
```

#### 回應格式
```json
{
  "records": [
    {
      "sitename": "士林",
      "county": "臺北市",
      "aqi": "54",
      "pollutant": "PM2.5",
      "status": "普通",
      "so2": "2",
      "co": "0.24",
      "o3": "33",
      "pm10": "35",
      "pm2.5": "16",
      "no2": "14",
      "latitude": "25.105417",
      "longitude": "121.515833",
      "publishtime": "2026-02-22 14:00"
    }
  ]
}
```

#### 實作建議
```typescript
// 使用 React Query
import { useQuery } from '@tanstack/react-query'

function useAQI(county?: string) {
  return useQuery({
    queryKey: ['aqi', county],
    queryFn: async () => {
      const params = new URLSearchParams({
        limit: '100',
        ...(county && { filters: `County,EQ,${county}` })
      })

      const res = await fetch(
        `https://data.moenv.gov.tw/api/v2/aqx_p_432?${params}`
      )

      if (!res.ok) throw new Error('Failed to fetch AQI data')

      return res.json()
    },
    staleTime: 1000 * 60 * 60, // 1 小時
    refetchInterval: 1000 * 60 * 60, // 每小時自動更新
  })
}
```

#### UI 設計
- 地圖模式: 顯示各測站 AQI
- 列表模式: 依縣市排序
- 詳細資訊: PM2.5, PM10, O3 等
- 顏色編碼: 綠(良好) → 黃(普通) → 橘(不健康) → 紅(非常不健康) → 紫(危害)

---

### 2. 公司統編查詢

#### API 來源
- **經濟部商業司**
- API 文件: https://data.gcis.nat.gov.tw/
- 限制: 每日請求次數限制

#### API 端點
```
GET https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6
```

#### 請求參數
```typescript
interface CompanyParams {
  $format: 'json'
  $filter: string  // 例如: "Business_Accounting_NO eq '12345678'"
  $skip?: number
  $top?: number
}
```

#### 回應格式
```json
[
  {
    "Business_Accounting_NO": "12345678",
    "Company_Name": "範例股份有限公司",
    "Capital_Stock_Amount": "1000000",
    "Company_Status": "核准設立",
    "Company_Status_Desc": "核准設立",
    "Responsible_Name": "王小明",
    "Company_Location": "臺北市信義區...",
    "Register_Organization": "臺北市政府",
    "Company_Setup_Date": "1050101"
  }
]
```

#### 實作建議
```typescript
async function queryCompany(taxId: string) {
  // 驗證統編格式 (8位數字)
  if (!/^\d{8}$/.test(taxId)) {
    throw new Error('統一編號格式錯誤')
  }

  const params = new URLSearchParams({
    $format: 'json',
    $filter: `Business_Accounting_NO eq '${taxId}'`
  })

  const res = await fetch(
    `https://data.gcis.nat.gov.tw/od/data/api/5F64D864-61CB-4D0D-8AD9-492047CC1EA6?${params}`
  )

  const data = await res.json()

  return data[0] || null
}

// 統編驗證演算法
function validateTaxId(taxId: string): boolean {
  if (!/^\d{8}$/.test(taxId)) return false

  const weights = [1, 2, 1, 2, 1, 2, 4, 1]
  const digits = taxId.split('').map(Number)

  let sum = 0
  for (let i = 0; i < 8; i++) {
    let product = digits[i] * weights[i]
    sum += Math.floor(product / 10) + (product % 10)
  }

  return sum % 10 === 0 ||
         (digits[6] === 7 && (sum + 1) % 10 === 0)
}
```

---

### 3. 台鐵時刻表查詢

#### API 來源
- **TDX 運輸資料流通服務**
- API 文件: https://tdx.transportdata.tw/
- 需要申請帳號取得 API Key

#### 認證方式
```typescript
// 取得 Access Token
async function getTDXToken(clientId: string, clientSecret: string) {
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch('https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${auth}`
    },
    body: 'grant_type=client_credentials'
  })

  const data = await res.json()
  return data.access_token
}
```

#### API 端點
```
GET https://tdx.transportdata.tw/api/basic/v2/Rail/TRA/DailyTimetable/TrainDate/{TrainDate}
```

#### 實作考量
- **快取策略**: 時刻表相對穩定,可快取較長時間
- **錯誤處理**: API 可能不穩定,需要重試機制
- **離線支援**: 考慮將常用路線時刻表存在 IndexedDB

---

## 🔧 需要後端服務的工具

### 網路速度測試

#### 為什麼需要後端?
- 需要上傳/下載測試檔案
- 需要測量延遲 (ping)
- 需要計算頻寬

#### 實作方案

##### 方案 A: 自建測速伺服器
```typescript
// 後端 (Cloudflare Workers)
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)

    // 下載測試 - 回傳隨機資料
    if (url.pathname === '/download') {
      const size = parseInt(url.searchParams.get('size') || '1048576') // 1MB
      const data = new Uint8Array(size)
      crypto.getRandomValues(data)

      return new Response(data, {
        headers: {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-cache'
        }
      })
    }

    // 上傳測試 - 接收資料
    if (url.pathname === '/upload' && request.method === 'POST') {
      const start = Date.now()
      await request.arrayBuffer()
      const duration = Date.now() - start

      return Response.json({ duration })
    }

    // Ping 測試
    if (url.pathname === '/ping') {
      return Response.json({ timestamp: Date.now() })
    }

    return new Response('Not found', { status: 404 })
  }
}
```

```typescript
// 前端
class SpeedTest {
  async measureDownload(sizeInMB: number): Promise<number> {
    const size = sizeInMB * 1024 * 1024
    const start = performance.now()

    const res = await fetch(`/api/download?size=${size}`)
    await res.arrayBuffer()

    const duration = (performance.now() - start) / 1000 // 秒
    const speedMbps = (size * 8) / (duration * 1000000)

    return speedMbps
  }

  async measureUpload(sizeInMB: number): Promise<number> {
    const size = sizeInMB * 1024 * 1024
    const data = new Uint8Array(size)
    crypto.getRandomValues(data)

    const start = performance.now()

    await fetch('/api/upload', {
      method: 'POST',
      body: data
    })

    const duration = (performance.now() - start) / 1000
    const speedMbps = (size * 8) / (duration * 1000000)

    return speedMbps
  }

  async measurePing(): Promise<number> {
    const measurements: number[] = []

    for (let i = 0; i < 5; i++) {
      const start = performance.now()
      await fetch('/api/ping')
      const latency = performance.now() - start
      measurements.push(latency)
    }

    return measurements.reduce((a, b) => a + b) / measurements.length
  }
}
```

##### 方案 B: 使用第三方服務
- **Fast.com API** (Netflix)
- **Cloudflare Speed Test API**
- **Ookla Speedtest API** (需付費)

推薦使用方案 B,維護成本低且準確度高。

---

## 🗺️ 地圖相關工具

### 台北捷運路線圖

#### 實作方案

##### 方案 A: SVG 靜態地圖
```typescript
// 優點: 簡單、快速、離線可用
// 缺點: 無法即時更新、互動有限

// 1. 取得官方路線圖 SVG
// 2. 加入互動元素
<svg viewBox="0 0 1000 800">
  <g id="stations">
    <circle
      id="taipei-main-station"
      cx="500"
      cy="400"
      r="5"
      className="station"
      onClick={() => handleStationClick('R10')}
    />
    {/* ... more stations */}
  </g>

  <g id="lines">
    <path d="M 100 100 L 500 400" className="red-line" />
    {/* ... more lines */}
  </g>
</svg>
```

##### 方案 B: 使用地圖 API
```typescript
// 使用 Mapbox 或 Google Maps
// 優點: 功能完整、可縮放
// 缺點: 需要 API Key、有使用限制

import mapboxgl from 'mapbox-gl'

function MRTMap() {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [121.5654, 25.0330],
      zoom: 11
    })

    // 加入捷運路線 GeoJSON
    map.on('load', () => {
      map.addSource('mrt-lines', {
        type: 'geojson',
        data: '/data/taipei-mrt.geojson'
      })

      map.addLayer({
        id: 'mrt-lines',
        type: 'line',
        source: 'mrt-lines',
        paint: {
          'line-color': ['get', 'color'],
          'line-width': 3
        }
      })
    })
  }, [])

  return <div id="map" style={{ width: '100%', height: '600px' }} />
}
```

#### 資料來源
- 台北捷運公司開放資料: https://data.gov.tw/dataset/73765
- GeoJSON 格式路線資料
- 站點座標、路線、票價資訊

---

## 💾 資料快取策略

### 快取層級

```typescript
// 1. Memory Cache (React Query)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,  // 5分鐘
      cacheTime: 1000 * 60 * 30, // 30分鐘
    },
  },
})

// 2. LocalStorage (長期資料)
function usePersistentState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

// 3. IndexedDB (大量資料)
// 適合儲存: 時刻表、路線圖、歷史資料
import { openDB } from 'idb'

const db = await openDB('toolcase-db', 1, {
  upgrade(db) {
    db.createObjectStore('timetables', { keyPath: 'id' })
    db.createObjectStore('routes', { keyPath: 'id' })
  }
})

async function cacheTimetable(data: Timetable) {
  await db.put('timetables', data)
}

async function getTimetable(id: string) {
  return await db.get('timetables', id)
}
```

---

## 🔐 API Key 管理

### 環境變數設置
```bash
# .env.local
NEXT_PUBLIC_TDX_CLIENT_ID=your_client_id
NEXT_PUBLIC_TDX_CLIENT_SECRET=your_client_secret
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token

# 敏感 API 通過後端代理
TDX_CLIENT_ID=your_client_id
TDX_CLIENT_SECRET=your_client_secret
```

### API 代理 (Cloudflare Workers)
```typescript
// 避免在前端暴露 API Key
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // 代理 TDX API
    if (url.pathname.startsWith('/api/tdx')) {
      const token = await getTDXToken(env.TDX_CLIENT_ID, env.TDX_CLIENT_SECRET)

      const tdxUrl = url.pathname.replace('/api/tdx', 'https://tdx.transportdata.tw/api/basic/v2')

      const res = await fetch(tdxUrl + url.search, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      return res
    }

    return new Response('Not found', { status: 404 })
  }
}
```

---

## ⚠️ 錯誤處理與降級方案

### 1. API 請求失敗
```typescript
function useAPIWithFallback<T>(
  apiCall: () => Promise<T>,
  fallbackData: T,
  options?: UseQueryOptions
) {
  return useQuery({
    ...options,
    queryFn: apiCall,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    onError: (error) => {
      console.error('API call failed:', error)
      // 使用快取或預設資料
    },
    placeholderData: fallbackData,
  })
}
```

### 2. 離線支援
```typescript
// Service Worker 快取 API 回應
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          // 回傳快取並在背景更新
          fetch(event.request).then((newResponse) => {
            caches.open('api-cache').then((cache) => {
              cache.put(event.request, newResponse)
            })
          })
          return response
        }
        return fetch(event.request)
      })
    )
  }
})
```

---

## 📊 效能監控

```typescript
// 追蹤 API 效能
function trackAPIPerformance(apiName: string, duration: number) {
  // 使用 Web Vitals 或自訂追蹤
  if (typeof window !== 'undefined' && 'performance' in window) {
    performance.mark(`${apiName}-end`)
    performance.measure(
      `${apiName}-duration`,
      `${apiName}-start`,
      `${apiName}-end`
    )
  }

  // 傳送到分析服務
  console.log(`API ${apiName} took ${duration}ms`)
}
```

---

**實作優先順序**:
1. ✅ 台灣空氣品質 - 最簡單且最有價值
2. ✅ 公司統編查詢 - 簡單且實用
3. ⭐ 台北捷運路線圖 - 中等難度
4. ⚠️ 台鐵時刻表 - 需要認證,較複雜
5. ⚠️ 網路速度測試 - 需要後端支援,最複雜
