import { NextResponse } from 'next/server'

// In-memory cache
let cache: { data: Record<string, number>; timestamp: number } | null = null
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

export async function GET() {
  // If cache is fresh, use it
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json({ rates: cache.data, cached: true })
  }

  try {
    // Use frankfurter.app - free, no API key needed
    const res = await fetch('https://api.frankfurter.app/latest?from=USD')
    if (!res.ok) throw new Error('API fetch failed')
    const json = await res.json()

    // frankfurter doesn't include the base currency
    const rates: Record<string, number> = { USD: 1, ...json.rates }

    // Add TWD if not present (frankfurter may not have it)
    // frankfurter uses ECB data which doesn't include TWD
    // Fallback: use open.er-api.com for TWD
    if (!rates.TWD) {
      try {
        const twdRes = await fetch('https://open.er-api.com/v6/latest/USD')
        const twdJson = await twdRes.json()
        if (twdJson.rates?.TWD) {
          rates.TWD = twdJson.rates.TWD
        }
      } catch {
        // If fallback fails, use approximate rate
        rates.TWD = 32.5
      }
    }

    cache = { data: rates, timestamp: Date.now() }
    return NextResponse.json({ rates, cached: false })
  } catch {
    // If API fails and we have stale cache, use it
    if (cache) {
      return NextResponse.json({ rates: cache.data, cached: true, stale: true })
    }
    return NextResponse.json({ error: 'Failed to fetch exchange rates' }, { status: 500 })
  }
}
