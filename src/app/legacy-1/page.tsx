import { Metadata } from 'next'
import { getLegacyPageData } from '@/lib/getLegacyPageData'
import { LegacyPageData } from '@/types/legacy'
import HeroSection from '@/components/Legacy1/HeroSection'
import WithYouSection from '@/components/Legacy1/WithYouSection'
import TechnologySection from '@/components/Legacy1/TechnologySection'
import LegacyAppSection from '@/components/Legacy1/LegacyAppSection'
import { testShopifyConnection } from '@/lib/shopify'

export const metadata: Metadata = {
  title: 'Legacy 1 | Arfve',
  description: 'Legacy 1 earphones and technology'
}

export default async function Legacy1Page() {
  // Kör testet först
  const connectionTest = await testShopifyConnection()
  console.log('Connection test result:', connectionTest)

  const pageData: LegacyPageData = await getLegacyPageData()
  
  console.log('Page Data:', pageData) // För debugging
  
  return (
    <main className="w-full bg-white">
      <HeroSection data={pageData.hero} />
      <WithYouSection data={pageData.withYou} />
      <TechnologySection 
        title={pageData.technology.title} 
        features={pageData.technology.features} 
      />
      <LegacyAppSection 
        title={pageData.legacyApp.title}
        features={pageData.legacyApp.features}
      />
    </main>
  )
} 