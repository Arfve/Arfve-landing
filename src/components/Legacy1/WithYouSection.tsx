'use client'

import Image from 'next/image'
import { WithYouSection as WithYouType } from '@/types/legacy'

interface WithYouSectionProps {
  data: WithYouType
}

export default function WithYouSection({ data }: WithYouSectionProps) {
  return (
    <section className="w-full py-12 sm:py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 animate-slide-in-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black hover:translate-x-2 transition-transform duration-300">{data.title}</h2>
            <p className="text-base sm:text-lg text-gray-600 animate-fade-in-up" style={{ animationDelay: '200ms' }}>{data.description}</p>
            <div className="space-y-2 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <h3 className="text-lg sm:text-xl font-semibold hover:text-blue-600 transition-colors duration-300">Replace them yourself</h3>
              <p className="text-gray-600">Coming soon on the store</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden 
                       transform hover:rotate-2 transition-transform duration-500
                       animate-float-in mt-8 lg:mt-0">
            {data.image && (
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover hover:scale-110 transition-transform duration-[1.5s]"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 