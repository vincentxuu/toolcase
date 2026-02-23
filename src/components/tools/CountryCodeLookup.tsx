'use client'
import { useState, useMemo } from 'react'

interface CountryCodeLookupProps {
  labels?: {
    title: string
    searchPlaceholder: string
    country: string
    dialCode: string
    flag: string
  }
}

const countryCodes = [
  { code: 'US', name: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '🇫🇷' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '🇨🇳' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '🇮🇳' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { code: 'RU', name: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { code: 'KR', name: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { code: 'TW', name: 'Taiwan', dialCode: '+886', flag: '🇹🇼' },
  { code: 'HK', name: 'Hong Kong', dialCode: '+852', flag: '🇭🇰' },
  { code: 'SG', name: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { code: 'TH', name: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { code: 'VN', name: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { code: 'PH', name: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { code: 'ID', name: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { code: 'NL', name: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { code: 'BE', name: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { code: 'SE', name: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { code: 'PL', name: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { code: 'TR', name: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { code: 'SA', name: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { code: 'IL', name: 'Israel', dialCode: '+972', flag: '🇮🇱' },
  { code: 'ZA', name: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { code: 'EG', name: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴' },
  { code: 'NZ', name: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { code: 'AT', name: 'Austria', dialCode: '+43', flag: '🇦🇹' },
  { code: 'CH', name: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { code: 'PT', name: 'Portugal', dialCode: '+351', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', dialCode: '+30', flag: '🇬🇷' },
  { code: 'CZ', name: 'Czech Republic', dialCode: '+420', flag: '🇨🇿' },
  { code: 'IE', name: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
]

export default function CountryCodeLookup({ labels }: CountryCodeLookupProps) {
  const l = {
    title: labels?.title ?? 'Country Code Lookup',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search country or dial code...',
    country: labels?.country ?? 'Country',
    dialCode: labels?.dialCode ?? 'Dial Code',
    flag: labels?.flag ?? 'Flag',
  }

  const [searchTerm, setSearchTerm] = useState('')

  const filteredCountries = useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    if (!term) return countryCodes

    return countryCodes.filter(
      (country) =>
        country.name.toLowerCase().includes(term) ||
        country.code.toLowerCase().includes(term) ||
        country.dialCode.includes(term)
    )
  }, [searchTerm])

  return (
    <div className="flex flex-col gap-6">
      {/* Search */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={l.searchPlaceholder}
          style={{
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Results */}
      <div style={{
        borderRadius: '0.5rem',
        border: '1px solid var(--color-border)',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '60px 1fr 120px',
          padding: '0.75rem 1rem',
          backgroundColor: 'var(--color-bg-secondary)',
          fontWeight: 600,
          fontSize: '0.875rem',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <div>{l.flag}</div>
          <div>{l.country}</div>
          <div>{l.dialCode}</div>
        </div>

        <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
          {filteredCountries.map((country) => (
            <div
              key={country.code}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr 120px',
                padding: '0.875rem 1rem',
                borderBottom: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                fontSize: '0.875rem',
              }}
            >
              <div style={{ fontSize: '1.5rem' }}>{country.flag}</div>
              <div style={{ fontWeight: 500 }}>{country.name}</div>
              <div style={{ fontFamily: "'Fira Code', monospace", fontWeight: 600, color: 'var(--color-primary)' }}>
                {country.dialCode}
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredCountries.length === 0 && (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
          No countries found matching &quot;{searchTerm}&quot;
        </div>
      )}

      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        Showing {filteredCountries.length} of {countryCodes.length} countries
      </div>
    </div>
  )
}
