import Header from '@/components/Header/index'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import AppSection from '@/components/AppSection'
import ProductShowcase from '@/components/ProductShowcase'
import Statement from '@/components/Statement'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Features />
      <AppSection />
      <ProductShowcase />
      <Statement />
      <Testimonials />
      <Newsletter />
      <Footer />
    </div>
  )
}
