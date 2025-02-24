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
    <section className="w-full bg-[#F7F7F7] relative overflow-hidden group">
      <div className="max-w-[1000px] min-h-[610px] mx-auto px-4 sm:px-6">
        <div className="pt-8 sm:pt-[36px] pb-8 sm:pb-[24px]">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-black animate-fade-in">{title}</h2>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-[64px] justify-center">
            {/* Features List Container */}
            <div className="w-full lg:w-[827px] h-auto lg:h-[387px]">
              <div className="flex flex-col gap-6 sm:gap-[48px]">
                {features?.map((feature: LegacyAppFeature, index: number) => (
                  <div key={index} 
                       className="flex items-start gap-4 animate-fade-in-up"
                       style={{ animationDelay: `${index * 200}ms` }}>
                    {/* Icon */}
                    <div className="w-6 h-6 mt-1 transform hover:scale-110 transition-transform duration-300">
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
                    <div className="group">
                      <h3 className="font-semibold text-lg mb-2 text-black group-hover:translate-x-1 transition-transform duration-300">{feature.title}</h3>
                      <p className="text-gray-600 mb-1 group-hover:text-gray-800 transition-colors duration-300">{feature.description}</p>
                      <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">{feature.subtext}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Images */}
            <div className="flex flex-row gap-2 justify-center">
              {[1, 2].map((_, index) => (
                <div key={index} 
                     className="relative w-[140px] sm:w-[300px] h-[200px] sm:h-[387px] bg-white rounded-[20px] overflow-hidden
                              shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)]
                              hover:shadow-[0px_10px_40px_rgba(0,0,0,0.12)]
                              transform hover:scale-[1.02] transition-all duration-500
                              animate-float-in"
                     style={{ animationDelay: `${(index + 3) * 200}ms` }}>
                  {features?.[0]?.image && (
                    <Image
                      src={features[0].image}
                      alt="App feature"
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/5 to-transparent opacity-0 
                    group-hover:opacity-100 transition-opacity duration-1000" />
    </section>
  )
} 