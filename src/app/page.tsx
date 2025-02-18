import Header from '@/components/Header/index'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import AppSection from '@/components/AppSection'
import ProductShowcase from '@/components/ProductShowcase'
import Statement from '@/components/Statement'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

import { getHeaderData } from '@/lib/getHeaderData'
import { getPageData } from '@/lib/getPageData'
import { getFooterData } from '@/lib/getFooterData'
import { getTestimonialsData } from '@/lib/getTestimonialsData'

export default async function Home() {
  const { menuItems } = await getHeaderData()
  const pageData = await getPageData()
  const testimonialsData = await getTestimonialsData()
  const footerData = await getFooterData()

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header menuItems={menuItems} /> */}
      <Hero {...pageData.hero} />
      <Features {...pageData.features} />
      <AppSection image={pageData.app?.image} />
      <ProductShowcase {...pageData.crowdfunding} />
      <Statement {...pageData.statement} />
      <Testimonials {...testimonialsData} />
      <Newsletter />
      <Footer {...footerData} />
    </div>
  )
}
