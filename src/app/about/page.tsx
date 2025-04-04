import React from "react";
import AboutHero1 from '@/components/About/aboutHero1';
import AboutHero2 from '@/components/About/aboutHero2';
import AboutHero3 from '@/components/About/aboutHero3';
import { AboutHero4 } from '@/components/About/aboutHero4';
import AboutHero5 from '@/components/About/aboutHero5';
import { getAboutPageData } from "@/lib/getAboutData";

const Page = async () => {
  const pageData = await getAboutPageData();
  
  if (!pageData) {
    return <div>Loading...</div>;
  }

  const { 
    heroSection,          // About Main hero
    visionHeroSection,    // About Vision hero
    visionSection,        // Why choose arfve/about vision section
    innovationSection,    // About Innovation section
    reviewsSection        // Reviews section (AboutHero5)
  } = pageData;

  return (
    <main className="flex flex-col min-h-screen bg-white text-black">
      <div className="flex-1">
        {heroSection && <AboutHero1 json={heroSection} />}
        {visionHeroSection && <AboutHero2 json={visionHeroSection} />}
        {visionSection && <AboutHero3 json={visionSection} />}
        {innovationSection && <AboutHero4 json4={innovationSection} />}
        {reviewsSection && <AboutHero5 json5={reviewsSection} />}
      </div>
    </main>
  );
};

export default Page;
