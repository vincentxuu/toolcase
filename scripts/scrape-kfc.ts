/**
 * KFC Taiwan Coupon Scraper
 *
 * Strategy: Launch Playwright browser, intercept the XHR call to
 * https://olo-api.kfcclub.com.tw/menu/v1/QueryCoupons
 * (IP-restricted, only reachable from a real browser on the page),
 * then save the structured result to data/kfc-coupons.json.
 *
 * Run: pnpm tsx scripts/scrape-kfc.ts
 * Deps: pnpm add -D playwright tsx
 *       npx playwright install chromium
 */

import { chromium } from 'playwright'
import fs from 'fs'
import path from 'path'

interface KfcCoupon {
  couponCode: string
  category: string
  categoryId: string
  imageUrl: string
  imageAlt: string
  productCode: string
}

const IMAGE_BASE = 'https://kfcoosfs.kfcclub.com.tw'
const COUPON_PAGE = 'https://www.kfcclub.com.tw/Coupon'
const API_URL = 'https://olo-api.kfcclub.com.tw/menu/v1/QueryCoupons'
const OUT_PATH = path.join(process.cwd(), 'data', 'kfc-coupons.json')

async function scrape(): Promise<KfcCoupon[]> {
  const browser = await chromium.launch({ headless: true })
  const context = await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    locale: 'zh-TW',
  })
  const page = await context.newPage()

  let coupons: KfcCoupon[] = []

  // Intercept the API response before it leaves the browser
  page.on('response', async (response) => {
    if (response.url().includes('/menu/v1/QueryCoupons')) {
      try {
        const json = await response.json()
        if (json?.Success && Array.isArray(json?.Data)) {
          coupons = json.Data.map((item: Record<string, string>) => ({
            couponCode: item.CouponCode ?? '',
            category: item.Category ?? '',
            categoryId: item.CT_ID ?? '',
            imageUrl: `${IMAGE_BASE}/${item.ImgNameNew ?? ''}`,
            imageAlt: item.ImgAlt ?? '',
            productCode: item.Fcode ?? '',
          }))
          console.log(`Got ${coupons.length} coupons from API`)
        }
      } catch {
        // response might not be JSON
      }
    }
  })

  console.log('Opening KFC coupon page...')
  await page.goto(COUPON_PAGE, { waitUntil: 'networkidle', timeout: 30000 })

  // Click "查看現有優惠券" accordion to trigger the API call
  const accordionBtn = page.locator('text=查看現有優惠券').first()
  if (await accordionBtn.isVisible()) {
    await accordionBtn.click()
    console.log('Clicked accordion, waiting for API response...')
    await page.waitForTimeout(5000)
  }

  // Fallback: if intercept missed, wait longer
  if (coupons.length === 0) {
    await page.waitForTimeout(5000)
  }

  await browser.close()
  return coupons
}

async function main() {
  console.log('Starting KFC coupon scraper...')

  const coupons = await scrape()

  if (coupons.length === 0) {
    console.error('No coupons found. The page structure may have changed.')
    process.exit(1)
  }

  const outDir = path.dirname(OUT_PATH)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  const result = {
    source: 'kfcclub.com.tw',
    updatedAt: new Date().toISOString(),
    total: coupons.length,
    coupons,
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(result, null, 2), 'utf-8')
  console.log(`Saved ${coupons.length} coupons to ${OUT_PATH}`)

  // Print sample
  console.log('\nSample coupon:')
  console.log(JSON.stringify(coupons[0], null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
