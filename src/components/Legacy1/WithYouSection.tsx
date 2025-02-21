'use client'

import Image from 'next/image'
import { WithYouSection as WithYouType } from '@/types/legacy'

interface WithYouSectionProps {
  data: WithYouType
}

export default function WithYouSection({ data }: WithYouSectionProps) {
  return (
    <section className="w-full py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold mb-6 text-black">{data.title}</h2>
            <p className="text-lg text-gray-600">{data.description}</p>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Replace them yourself</h3>
              <p className="text-gray-600">Coming soon on the store</p>
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden">
            {data.image && (
              <Image
                src={data.image}
                alt={data.title}
                fill
                className="object-cover"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 