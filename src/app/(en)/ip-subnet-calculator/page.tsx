import { Metadata } from 'next'
import IpSubnetCalculator from '@/components/tools/IpSubnetCalculator'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'IP Subnet Calculator - CIDR, Network & Hosts | toolcase',
  description: 'Calculate IP subnet details including network address, broadcast address, subnet mask, host range, and total usable hosts from any IP and CIDR notation.',
  alternates: { canonical: 'https://toolcase.cc/ip-subnet-calculator', languages: { en: 'https://toolcase.cc/ip-subnet-calculator', 'zh-Hant-TW': 'https://toolcase.cc/zh-tw/ip-subnet-calculator' } },
}

const faqs = [
  { question: 'What is CIDR notation?', answer: 'CIDR (Classless Inter-Domain Routing) notation uses a slash followed by a number (e.g., /24) to indicate the number of bits in the subnet mask. /24 means the first 24 bits are the network portion, leaving 8 bits for hosts (254 usable hosts).' },
  { question: 'What is the difference between network and broadcast address?', answer: 'The network address is the first address in a subnet (all host bits are 0) and identifies the network itself. The broadcast address is the last address (all host bits are 1) and is used to send data to all hosts on the subnet.' },
]

export default function IpSubnetCalculatorPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'IP Subnet Calculator', url: 'https://toolcase.cc/ip-subnet-calculator' },
        ]}
      />
      <ToolSchema
        name="IP Subnet Calculator"
        description="Calculate IP subnet details including network address, broadcast address, subnet mask, host range, and total usable hosts from any IP and CIDR notation."
        url="https://toolcase.cc/ip-subnet-calculator"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'IP Subnet Calculator' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>IP Subnet Calculator</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Calculate subnet details from any IPv4 address and CIDR prefix. See network range, mask, and host count.</p>
      <IpSubnetCalculator />
      <FaqSection items={faqs} />
      <RelatedTools current="ip-subnet-calculator" locale="en" />
    </div>
    </>
  )
}
