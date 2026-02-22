import { Metadata } from 'next'
import JwtDecoder from '@/components/tools/JwtDecoder'
import FaqSection from '@/components/shared/FaqSection'
import RelatedTools from '@/components/shared/RelatedTools'
import Breadcrumbs from '@/components/shared/Breadcrumbs'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import ToolSchema from '@/components/seo/ToolSchema'

export const metadata: Metadata = {
  title: 'JWT Decoder - Free Online Tool | toolcase',
  description:
    'Decode and inspect JWT (JSON Web Token) tokens instantly. View header, payload, expiration, and claims without any server processing.',
  alternates: {
    canonical: 'https://toolcase.cc/jwt-decoder',
    languages: {
      en: 'https://toolcase.cc/jwt-decoder',
      'zh-Hant-TW': 'https://toolcase.cc/zh-tw/jwt-decoder',
    },
  },
}

const faqs = [
  {
    question: 'What is a JWT?',
    answer:
      'JWT (JSON Web Token) is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three parts: a header (algorithm and type), a payload (claims and data), and a signature for verification.',
  },
  {
    question: 'Is it safe to paste my JWT here?',
    answer:
      'Yes. All decoding happens entirely in your browser. No tokens are sent to any server. However, you should never share your JWT tokens publicly as they may contain sensitive information.',
  },
  {
    question: 'Can this tool verify JWT signatures?',
    answer:
      'This tool decodes and displays the JWT contents but does not verify signatures, as that would require the signing secret or public key. It is designed for inspection and debugging purposes.',
  },
  {
    question: 'What does the expiration check show?',
    answer:
      'If the JWT payload contains an "exp" (expiration) claim, the tool automatically checks whether the token has expired and displays the expiration date and time.',
  },
]

export default function JwtDecoderPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://toolcase.cc' },
          { name: 'JWT Decoder', url: 'https://toolcase.cc/jwt-decoder' },
        ]}
      />
      <ToolSchema
        name="JWT Decoder"
        description="Decode and inspect JWT (JSON Web Token) tokens instantly. View header, payload, expiration, and claims without any server processing."
        url="https://toolcase.cc/jwt-decoder"
        category="UtilitiesApplication"
      />
    <div className="tool-container">
        <Breadcrumbs
          items={[
            { name: 'Home', href: '/' },
            { name: 'JWT Decoder' },
          ]}
        />
      <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>JWT Decoder</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>
        Paste your JWT token below to decode and inspect its header, payload, and expiration status.
      </p>

      <JwtDecoder />

      <section style={{ marginTop: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>How to Decode a JWT Token</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          Paste your complete JWT token into the input field above. The tool will automatically decode and display
          the header and payload in a formatted JSON view. It also checks the token&apos;s expiration status if an
          &quot;exp&quot; claim is present. You can copy individual sections using the copy buttons.
        </p>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.75rem' }}>Understanding JWT Structure</h2>
        <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
          A JWT consists of three parts separated by dots: the header (specifying the algorithm and token type),
          the payload (containing claims like issuer, subject, expiration, and custom data), and the signature
          (used to verify the token&apos;s integrity). Each part is Base64URL-encoded.
        </p>
      </section>

      <FaqSection items={faqs} />
      <RelatedTools current="jwt-decoder" locale="en" />
    </div>
    </>
  )
}
