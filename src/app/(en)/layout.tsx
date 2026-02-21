import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar locale="en" />
      {children}
      <Footer locale="en" />
    </>
  )
}
