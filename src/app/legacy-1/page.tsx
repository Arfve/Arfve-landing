import { Metadata } from 'next'
import { getLegacyPageData } from '@/lib/getLegacyPageData'
import HeroSection from '@/components/Legacy1/HeroSection'
import WithYouSection from '@/components/Legacy1/WithYouSection'
import TechnologySection from '@/components/Legacy1/TechnologySection'
import LegacyAppSection from '@/components/Legacy1/LegacyAppSection'
import FAQSection from '@/components/Legacy1/FAQSection'

export const metadata: Metadata = {
  title: 'Legacy 1 | Arfve',
  description: 'Legacy 1 earphones and technology'
}

export default async function Legacy1Page() {
  // Fetch data with error handling
  const [pageData] = await Promise.all([
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getLegacyPageData().catch(_ => {
      // Silent error handling
      return null
    })
  ])

  if (!pageData) {
    // You might want to add an error boundary or fallback UI here
    return <div>Loading...</div>
  }

  return (
    <main className="w-full bg-white">
      <div className="max-w-[2000px] mx-auto"> {/* Prevent extreme stretching on ultra-wide screens */}
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
        <FAQSection 
          title={pageData.faq.title}
          faqs={pageData.faq.items}
        />
      </div>
    </main>
  )
} 