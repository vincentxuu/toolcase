import { Metadata } from 'next'
import PhoneNumberGenerator from '@/components/tools/PhoneNumberGenerator'
import { getDictionary } from '@/i18n'

export const metadata: Metadata = {
  title: '手機號碼產生器 | 線上工具',
  description: '免費線上台灣手機號碼產生器,支援中華電信、台灣大哥大、遠傳、台灣之星、亞太電信等各大電信商號段。批量產生測試用手機號碼。',
  keywords: ['手機號碼產生器', '台灣手機號碼', '電話號碼產生', '測試資料', '電信商號段'],
}

export default async function Page() {
  const dict = await getDictionary('zh-tw')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">台灣手機號碼產生器</h1>
        <p className="mb-8 text-muted-foreground">
          快速產生台灣手機號碼!支援中華電信、台灣大哥大、遠傳、台灣之星、亞太電信等各大電信商號段。可批量產生、自訂格式,適合表單測試、資料庫測試等使用。
        </p>
        <PhoneNumberGenerator
          labels={{
            title: '台灣手機號碼產生器',
            description: '產生有效的台灣手機號碼',
            carrier: '電信商',
            allCarriers: '所有電信商',
            chunghwa: '中華電信',
            taiwanMobile: '台灣大哥大',
            farEasTone: '遠傳電信',
            taiwanStar: '台灣之星',
            aptg: '亞太電信',
            count: '產生數量',
            generate: '產生號碼',
            results: '產生的號碼',
            copy: '複製',
            copied: '已複製!',
            copyAll: '複製全部',
            format: '號碼格式',
            withDashes: '含連字號',
            withoutDashes: '不含連字號',
          }}
        />
      </div>
    </main>
  )
}
