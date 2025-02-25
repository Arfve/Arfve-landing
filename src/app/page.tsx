import Hero from '@/components/Homepage/Hero';
import Features from '@/components/Homepage/Features';
import AppSection from '@/components/Homepage/AppSection';
import ProductShowcase from '@/components/Homepage/ProductShowcase';
import Statement from '@/components/Homepage/Statement';
import Testimonials from '@/components/Homepage/Testimonials';
import Newsletter from '@/components/Homepage/Newsletter';
import { getHomePageData } from '@/lib/getHomePageData';

export default async function Home() {
  const {
    heroSection,
    featuresSection,
    appSection,
    statementSection,
    newsletterSection,
    testimonialsSection,
    productShowcaseSection,
  } = await getHomePageData();

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