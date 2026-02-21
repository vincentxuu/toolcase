import { Metadata } from 'next'
import IpAddressLookup from '@/components/tools/IpAddressLookup'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'

export const metadata: Metadata = {
  title: 'IP Address Lookup - Free Online Tool | toolcase',
  description:
    'Look up any IP address to find its geolocation, ISP, timezone, and coordinates. Automatically detects your own IP address. Free and instant results.',
  alternates: {
    canonical: 'https://toolcase.cc/ip-address-lookup',
    languages: {
      en: 'https://toolcase.cc/ip-address-lookup',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ip-address-lookup',
    },
  },
}

const faqs = [
  {
    question: 'How accurate is the IP geolocation?',
    answer:
      'IP geolocation is generally accurate to the city level for most commercial ISPs. However, VPN users, mobile networks, and corporate proxies may show the location of the VPN server or network gateway rather than the actual user location.',
  },
  {
    question: 'Can I look up any IP address?',
    answer:
      'You can look up any public IPv4 or IPv6 address. Private IP addresses (such as 192.168.x.x or 10.x.x.x) are used on local networks and cannot be geolocated.',
  },
  {
    question: 'Is my IP address saved or logged?',
    answer:
      'This tool sends your IP to a third-party geolocation API (ipapi.co) to retrieve location data. We do not store or log any IP addresses on our servers. Refer to ipapi.co\'s privacy policy for their data handling practices.',
  },
]

export default function IpAddressLookupPage() {
  return (
    <div className="tool-container">
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>IP Address Lookup</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Find geolocation, ISP, and timezone information for any IP address — or detect your own.
      </p>

      <IpAddressLookup />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Use</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Your IP address is detected automatically when the page loads. To look up a different IP,
          enter it in the input field and click &quot;Look Up&quot;. The tool displays the city, region,
          country, ISP, timezone, and geographic coordinates associated with that IP address.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="ip-address-lookup" locale="en" />
    </div>
  )
}
