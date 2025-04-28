"use client"

import Image from "next/image"

interface HeroSectionProps {
  mainHeading: string
  subHeading: string
  heroMedia?: string
}

export default function HeroSection({ 
  mainHeading,
  subHeading,
  heroMedia
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[500px] md:h-[675px] bg-[#F3F3F3] px-6 py-12 md:p-0 overflow-hidden">
      <div className="max-w-[1440px] h-full mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        {heroMedia && (
          <div className="relative w-full md:w-1/2 aspect-[5/4] mb-8 md:mb-0">
            <Image 
              src={heroMedia}
              alt={mainHeading || "Arfve Technology"}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-12">
          <h1 className="text-4xl md:text-6xl mb-4 text-[#243555] font-bold">{mainHeading}</h1>
          <p className="text-lg md:text-xl my-4 text-[#243555]">{subHeading}</p>
        </div>
      </div>
    </section>
  )
} 