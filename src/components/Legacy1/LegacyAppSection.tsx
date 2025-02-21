'use client'

import Image from 'next/image'

interface LegacyAppFeature {
  title: string;
  description: string;
  subtext?: string;
  image?: string;
}

interface LegacyAppSectionProps {
  title: string;
  features: LegacyAppFeature[];
}

export default function LegacyAppSection({ title, features }: LegacyAppSectionProps) {
  return (
    <section className="w-full bg-[#F7F7F7]">
      <div className="max-w-[1000px] h-[610px] mx-auto">
        <div className="pt-[36px] pb-[24px]">
          <h2 className="text-3xl font-bold text-center mb-12 text-black">{title}</h2>
          <div className="flex gap-[64px] justify-center">
            {/* Features List Container */}
            <div className="w-[827px] h-[387px]">
              {/* Features List */}
              <div className="flex flex-col gap-[48px]">
                {features?.map((feature: LegacyAppFeature, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="w-6 h-6 mt-1">
                      {index === 0 && (
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path d="M12 3V13.55C11.41 13.21 10.73 13 10 13C7.79 13 6 14.79 6 17S7.79 21 10 21 14 19.21 14 17V7H18V3H12Z" fill="black"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path d="M12 14C13.66 14 15 12.66 15 11V5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM19 11H17.3C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.23 19 14.41 19 11Z" fill="black"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg viewBox="0 0 24 24" className="w-full h-full">
                          <path d="M16 1H8C6.34 1 5 2.34 5 4V20C5 21.66 6.34 23 8 23H16C17.66 23 19 21.66 19 20V4C19 2.34 17.66 1 16 1ZM17 18H7V4H17V18Z" fill="black"/>
                        </svg>
                      )}
                    </div>
                    {/* Feature Text */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 text-black">{feature.title}</h3>
                      <p className="text-gray-600 mb-1">{feature.description}</p>
                      <p className="text-gray-600">{feature.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Images */}
            <div className="flex gap-2">
              {[1, 2].map((_, index) => (
                <div key={index} className="relative w-[300px] h-[387px] bg-gray-100 rounded-2xl">
                  {features?.[0]?.image && (
                    <Image
                      src={features[0].image}
                      alt="App feature"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 