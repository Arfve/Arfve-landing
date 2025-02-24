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
    <section className="w-full bg-white">
      <div className="max-w-[1453px] mx-auto px-4 sm:px-6 py-12 lg:py-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-black animate-fade-in">{title}</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-[10px]">
          {featureArray.map((feature: TechnologyFeature, index: number) => (
            <div 
              key={index} 
              className="flex flex-col justify-center items-center p-4 sm:p-5 gap-[10px] bg-white rounded-[20px]
                       hover:scale-[1.02] transition-all duration-500 ease-out
                       hover:shadow-[0px_10px_40px_rgba(0,0,0,0.12)]
                       animate-float-in motion-reduce:animate-none
                       shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)]"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {index % 2 === 0 ? (
                <>
                  <div className="flex flex-col gap-[10px] w-full sm:w-[161px] group-hover:translate-y-[-5px] transition-transform duration-500">
                    <h3 className="font-inter font-medium text-[16px] sm:text-[18px] leading-[22px] text-black 
                                group-hover:text-blue-600 transition-colors duration-300">{feature.title}</h3>
                    <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[19px] text-black 
                               opacity-80 group-hover:opacity-100 transition-opacity duration-300">{feature.description}</p>
                  </div>
                  <div className="flex justify-center items-center p-[10px] w-full sm:w-[255px] h-[180px] sm:h-[202px] 
                               bg-[#DEDEDE] rounded-[20px] overflow-hidden
                               group-hover:bg-[#E5E5E5] transition-all duration-500
                               group-hover:shadow-inner">
                    {feature.image && feature.image !== "" && (
                      <div className="relative w-full h-full transform group-hover:scale-110 
                                   transition-transform duration-700 ease-out">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover rounded-[20px] group-hover:brightness-105 
                                  transition-all duration-500"
                        />
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-center items-center p-[10px] w-full sm:w-[255px] h-[180px] sm:h-[202px] 
                               bg-[#DEDEDE] rounded-[20px] overflow-hidden">
                    {feature.image && feature.image !== "" && (
                      <div className="relative w-full h-full">
                        <Image
                          src={feature.image}
                          alt={feature.title}
                          fill
                          className="object-cover rounded-[20px]"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-[10px] w-full sm:w-[161px]">
                    <h3 className="font-inter font-medium text-[16px] sm:text-[18px] leading-[22px] text-black">{feature.title}</h3>
                    <p className="font-inter font-normal text-[14px] sm:text-[16px] leading-[19px] text-black">{feature.description}</p>
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