"use client"

import Image from "next/image"

interface FeaturesProps {
  title: string
  subtitle: string
  description: string
  featureList: Array<{
    title: string
    description: string
  }>
  image?: string
}

export default function Features({ title, subtitle, description, featureList, image }: FeaturesProps) {
  return (
    <section className="w-full bg-[#F2F4F3] py-12 md:py-16 lg:py-24 flex justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 max-w-xl flex flex-col items-center lg:items-start">
            <div className="space-y-4 text-center lg:text-left w-full">
              <h2 className="font-inter font-bold text-2xl md:text-3xl lg:text-[40px] leading-tight text-black">
                {title}
              </h2>
              <p className="font-inter text-base md:text-lg lg:text-[18px] text-black">
                {subtitle}
              </p>
              <p className="font-inter text-sm md:text-base lg:text-[16px] text-black">
                {description}
              </p>
            </div>
          </div>

          {/* Image on Right */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            {image ? (
              <div className="relative w-full max-w-[300px] aspect-square">
                <Image
                  src={image}
                  alt="Features illustration"
                  width={300}
                  height={300}
                  className="object-contain rounded-2xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>
            ) : (
              <div className="w-[100px] h-[100px] bg-gray-300 rounded-2xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.158 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9-2.9m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l-2.9-2.9M3.75 17.25h16.5m-16.5 3.75h16.5" />
                </svg>
              </div>
            )}
          </div>
        </div>

        {/* Feature List */}
        <div className="w-full mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl px-4">
          {featureList.map((feature, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center text-center space-y-2 p-4"
            >
              <h3 className="font-inter font-medium text-base lg:text-[16px] text-black">
                {feature.title}
              </h3>
              <p className="font-inter text-sm lg:text-[14px] text-black max-w-[200px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
