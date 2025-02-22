'use client'

import Image from 'next/image'
import { LegacyHero } from '@/types/legacy'

interface HeroSectionProps {
  data: LegacyHero
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="w-full h-[300px] sm:h-[410px] relative bg-black overflow-hidden">
      <div className="max-w-[1453px] h-full mx-auto px-4 sm:px-6 relative">
        {data.image && (
          <div className="absolute inset-0 animate-scale-fade-in">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover opacity-90 hover:scale-105 transition-transform duration-[2s]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent animate-fade-in" />
          </div>
        )}
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl font-bold text-center px-4 text-white animate-slide-up-fade 
                        [text-shadow:_0_2px_10px_rgba(0,0,0,0.3)]
                        hover:scale-[1.02] transition-transform duration-500">{data.title}</h1>
        </div>
      </div>
    </section>
  )
} 