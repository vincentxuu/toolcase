import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WebsiteSchema from '@/components/seo/WebsiteSchema'
import OrganizationSchema from '@/components/seo/OrganizationSchema'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WebsiteSchema />
      <OrganizationSchema />
      <Navbar locale="en" />
      {children}
      <Footer locale="en" />
    </>
  )
}
