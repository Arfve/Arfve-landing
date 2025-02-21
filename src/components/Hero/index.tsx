"use client";

import Image from 'next/image'

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image?: string;
}

export default function Hero({ title, subtitle, buttonText, image }: HeroProps) {
  return (
    <section className="relative w-full max-w-[1440px] min-h-[500px] md:h-[675px] bg-[#dedede] mx-auto px-6 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full px-6">
        {image && (
          <div className="relative w-full md:w-1/2 flex justify-center">
            <Image 
              src={image}
              alt={title || "Arfve Headphones"}
              width={500} 
              height={400} 
              className="object-contain rounded-2xl shadow-lg" 
              priority
            />
          </div>
        )}

        <div className='flex flex-col items-center md:items-start justify-center w-full md:w-1/2 px-6 text-center md:text-left'>
          <strong className='text-6xl mb-4 text-black text-center'>{title}</strong>
          <p className='text-xl my-4 text-black text-center'>{subtitle}</p>
          <button className='flex-none rounded-md bg-[#1f1f1f] px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-gray-800'>
            <p className='px-1'>{buttonText}</p>
          </button>
        </div>
      </div>
    </section>
  )
}