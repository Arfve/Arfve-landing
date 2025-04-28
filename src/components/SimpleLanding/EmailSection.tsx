"use client"

import Image from "next/image"

interface EmailSectionProps {
  heading: string
  subtext: string
  image?: string
}

export default function EmailSection({ heading, subtext, image }: EmailSectionProps) {
  return (
    <section className="relative py-16 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center gap-12">
        {image && (
          <div className="relative w-full md:w-1/2 aspect-[4/3]">
            <Image
              src={image}
              alt="Email section image"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
        
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-[#243555]">{heading}</h2>
          <p className="text-lg text-[#243555]">{subtext}</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#243555]"
            />
            <button 
              type="submit"
              className="flex items-center justify-center gap-2 rounded-[300px] bg-[#243555] px-6 py-2 text-sm text-white shadow-sm hover:bg-gray-800 transition-colors"
            >
              <Image src="/Icon.png" alt="Icon" width={20} height={20} className="w-5 h-5" />
              <span>Sign up</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  )
} 