// import Header from '@/components/Header/index'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import AppSection from '@/components/AppSection'
import ProductShowcase from '@/components/ProductShowcase'
import Statement from '@/components/Statement'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'

import { getHomePageData } from '@/lib/getHomePageData'

export default async function Home() {
  const { 
    heroSection, 
    featuresSection, 
    appSection,
    statementSection,
    newsletterSection,
    testimonialsSection,
    productShowcaseSection 
  } = await getHomePageData()

  return (
    <div className="flex flex-col min-h-screen">
      {heroSection && (
        <Hero
          title={heroSection.title}
          subtitle={heroSection.subtitle}
          buttonText={heroSection.buttonText}
          image={heroSection.image}
        />
      )}
      {featuresSection && <Features {...featuresSection} />}
      {appSection && <AppSection {...appSection} features={appSection.features || []} />}
      
      {productShowcaseSection && (
        <ProductShowcase 
          {...productShowcaseSection} 
          features={productShowcaseSection.features || []} 
        />
      )}
      {statementSection && <Statement {...statementSection} />}
      {testimonialsSection && <Testimonials {...testimonialsSection} />}
      {newsletterSection && <Newsletter {...newsletterSection} />}
    </div>
  );
}
