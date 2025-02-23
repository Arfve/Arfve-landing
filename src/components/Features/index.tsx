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
    <section className="flex justify-center items-center bg-[#F2F4F3] py-12">
      <div className="max-w-[1440px] w-full px-24">
        <div className="flex flex-col">

          {/* Top Section (Text and Image) */}
          <div className="flex flex-col lg:flex-row items-center">

            {/* Left Content (Text) */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0 flex flex-col justify-center">
              <div className="max-w-[500px]">
                <h2 className="text-[40px] leading-[48px] font-bold text-black">{title}</h2>
                <p className="text-[18px] leading-[22px] text-black mt-4">{subtitle}</p>
                <p className="text-[16px] leading-[24px] text-black mt-6">{description}</p>
              </div>
            </div>

            {/* Right Content (Image) */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              {image ? (
                <Image
                  src={image || "/placeholder.svg"}
                  alt="Features illustration"
                  width={400}
                  height={400}
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-[64px] h-[64px] flex justify-center items-center">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Feature List (Bottom Section) */}
          <div className="mt-24 w-[926px] h-[92px]">
            <div className="flex justify-between">
              {featureList.map((feature, index) => (
                <div key={index} className="w-1/4 max-w-[200px]">
                  <h3 className="text-[18px] leading-[24px] font-inter font-medium text-black mb-2">{feature.title}</h3> {/*  Updated title styles */}
                  <p className="text-[16px] leading-[20px] font-inter font-normal text-black">{feature.description}</p> {/* Updated description styles */}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
