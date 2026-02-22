import { Metadata } from 'next'
import WifiQrGenerator from '@/components/tools/WifiQrGenerator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'WiFi QR Code Generator - Share WiFi Password | toolcase',
  description: 'Generate a QR code for your WiFi network. Guests can scan the code to connect instantly without typing the password. Supports WPA, WEP, and open networks.',
  alternates: { canonical: 'https://toolcase.cc/wifi-qr-generator', languages: { en: 'https://toolcase.cc/wifi-qr-generator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/wifi-qr-generator' } },
}

const faqs = [
  { question: 'How does the WiFi QR code work?', answer: 'The QR code encodes your WiFi network credentials in a standard format (WIFI:S:ssid;T:encryption;P:password;;). When someone scans this QR code with their phone camera, their device automatically connects to your WiFi network.' },
  { question: 'Is it safe to share WiFi via QR code?', answer: 'The QR code is generated entirely in your browser — no data is sent to any server. However, be mindful of who can physically see the QR code, as anyone who scans it will be able to connect to your network.' },
  { question: 'What encryption types are supported?', answer: 'The generator supports WPA/WPA2 (most common), WEP (legacy), and open (no password) networks.' },
]

export default function WifiQrGeneratorPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>WiFi QR Code Generator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Generate a QR code for your WiFi network so guests can connect instantly by scanning.</p>
      <WifiQrGenerator />
      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>Enter your WiFi network name (SSID), password, and select the encryption type. The tool generates a QR code that guests can scan with their phone camera to connect to your WiFi network instantly, without needing to type the password.</p>
      </section>
      <FaqSection items={faqs} />
      <RelatedTools current="wifi-qr-generator" locale="en" />
    </div>
  )
}
