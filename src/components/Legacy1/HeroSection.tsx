'use client'

import Image from 'next/image'
import { LegacyHero } from '@/types/legacy'

interface HeroSectionProps {
  data: LegacyHero
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="w-full h-[250px] xs:h-[300px] sm:h-[410px] md:h-[500px] relative bg-black overflow-hidden">
      <div className="max-w-[1453px] h-full mx-auto px-3 xs:px-4 sm:px-6 relative">
        {data.image && (
          <div className="absolute inset-0 animate-scale-fade-in">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover object-center opacity-90 hover:scale-105 transition-transform duration-[2s]"
              priority
              sizes="(max-width: 480px) 100vw,
                     (max-width: 768px) 100vw,
                     100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent animate-fade-in" />
          </div>
        )}
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center 
                        px-2 xs:px-4 text-white animate-slide-up-fade 
                        [text-shadow:_0_2px_10px_rgba(0,0,0,0.4)]
                        hover:scale-[1.02] transition-transform duration-500
                        max-w-[280px] xs:max-w-[400px] sm:max-w-[600px] md:max-w-[800px]">
            {data.title}
          </h1>
        </div>
      </div>
    </section>
  )
} 