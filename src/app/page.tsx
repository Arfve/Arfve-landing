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
import { getHeroData } from '@/lib/getHeroData'
import { getFeaturesData } from '@/lib/getFeaturesData'
import { getAppSectionData } from '@/lib/getAppSectionData'
import { getProductShowcaseData } from '@/lib/getProductShowcaseData'
import { getStatementData } from '@/lib/getStatementData'
import { getTestimonialsData } from '@/lib/getTestimonialsData'
import { getFooterData } from '@/lib/getFooterData'

export default async function Home() {
  const headerData = await getHeaderData()
  const heroData = await getHeroData()
  const featuresData = await getFeaturesData()
  const appSectionData = await getAppSectionData()
  const productShowcaseData = await getProductShowcaseData()
  const statementData = await getStatementData()
  const testimonialsData = await getTestimonialsData()
  const footerData = await getFooterData()

  return (
    <div className="flex flex-col min-h-screen">
      <Header menuItems={headerData.menuItems} />
      <Hero {...heroData} />
      <Features {...featuresData} />
      <AppSection {...appSectionData} />
      <ProductShowcase {...productShowcaseData} />
      <Statement {...statementData} />
      <Testimonials {...testimonialsData} />
      <Newsletter />
      <Footer {...footerData} />
    </div>
  )
}
