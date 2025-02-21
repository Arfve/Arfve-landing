'use client'

import Image from 'next/image'
import { LegacyHero } from '@/types/legacy'

interface HeroSectionProps {
  data: LegacyHero
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="w-full h-[410px] relative bg-gray-100">
      <div className="max-w-[1453px] h-full mx-auto relative">
        {data.image && (
          <div className="absolute inset-0">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-5xl font-bold text-center px-4 text-black">{data.title}</h1>
        </div>
      </div>
    </section>
  )
} 