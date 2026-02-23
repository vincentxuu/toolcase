import { Metadata } from 'next'
import InvoiceGenerator from '@/components/tools/InvoiceGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: '發票產生器 - 免費線上工具 | toolcase',
  description: '免費線上建立專業發票。新增公司資訊、品項明細自動計算、稅率設定，可直接從瀏覽器列印。',
  alternates: { canonical: 'https://toolcase.cc/zh-tw/finance/invoice-generator', languages: { en: 'https://toolcase.cc/finance/invoice-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/finance/invoice-generator' } },
}

const faqs = [
  { question: '可以將發票儲存為 PDF 嗎？', answer: '點擊「列印發票」按鈕，然後在瀏覽器的列印對話框中選擇「儲存為 PDF」。這是在任何瀏覽器中產生 PDF 最可靠的方式，無需額外軟體。' },
  { question: '這個工具會自動計算稅額嗎？', answer: '會。在稅率欄位中輸入百分比，工具會根據小計自動計算稅額，並加入最終總額中。' },
  { question: '我的發票資料會被儲存嗎？', answer: '不會。所有資料都留在您的瀏覽器中，不會傳送到任何伺服器。關閉或重新整理頁面後資料會消失，請確保在離開頁面前列印或儲存為 PDF。' },
]

export default function InvoiceGeneratorPageZhTw() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: '首頁', url: 'https://toolcase.cc' },
          { name: '發票產生器', url: 'https://toolcase.cc/zh-tw/finance/invoice-generator' },
        ]}
      />
      <ToolSchema
        name="發票產生器"
        description="免費線上建立專業發票。新增公司資訊、品項明細自動計算、稅率設定，可直接從瀏覽器列印。"
        url="https://toolcase.cc/zh-tw/finance/invoice-generator"
        category="UtilitiesApplication"
      />
    <div className="max-w-4xl mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { name: '首頁', href: '/zh-tw' },
            { name: '發票產生器' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>發票產生器</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>建立專業發票，自動計算金額，可列印或儲存為 PDF。</p>
      <InvoiceGenerator labels={{ companyName: '公司名稱', clientName: '客戶名稱', invoiceNumber: '發票編號', date: '日期', dueDate: '到期日', description: '品項說明', quantity: '數量', unitPrice: '單價', amount: '金額', addItem: '新增品項', removeItem: '移除', subtotal: '小計', taxRate: '稅率', tax: '稅額', total: '總計', preview: '預覽', print: '列印發票', invoice: '發票', billTo: '帳單對象' }} />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>如何使用</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>填寫公司名稱、客戶名稱、發票編號、日期和稅率。新增品項明細，輸入說明、數量和單價，金額會自動計算。發票預覽會即時更新。點擊「列印發票」使用瀏覽器的列印對話框列印或儲存為 PDF。</p>
      </section>
      <FaqSection items={faqs} title="常見問題" />
      <RelatedTools current="invoice-generator" locale="zh-tw" />
    </div>
    </>
  )
}
