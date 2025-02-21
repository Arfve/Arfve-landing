'use client'

import Image from 'next/image'
import { TechnologyFeature } from '@/types/legacy'

interface TechnologySectionProps {
  title: string
  features: TechnologyFeature[]
}

export default function TechnologySection({ title, features }: TechnologySectionProps) {
  const featureArray = Array.isArray(features) ? features : [];
  
  return (
    <section className="w-[1453px] h-[853px] mx-auto relative">
      <h2 className="text-3xl font-bold text-center mb-12 text-black">{title}</h2>
      <div className="absolute w-[1292px] h-[600px] top-[155px] left-[81px]">
        <div className="grid grid-cols-4 gap-[10px] h-full">
          {featureArray.map((feature: TechnologyFeature, index: number) => (
            <div key={index} className="flex flex-col h-full">
              {index % 2 === 0 ? (
                // Text överst för jämna index
                <>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                  <div className="relative flex-1 bg-gray-100 rounded-lg">
                    {feature.image && feature.image !== "" && (
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
                </>
              ) : (
                // Bild överst för udda index
                <>
                  <div className="relative flex-1 bg-gray-100 rounded-lg">
                    {feature.image && feature.image !== "" && (
                      <Image
                        src={feature.image}
                        alt={feature.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 