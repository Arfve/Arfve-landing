"use client";

import Image from 'next/image'

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image?: string;
}

export default function Hero({ title, subtitle, buttonText, image }: HeroProps) {
  const fallbackImage = "/product-hero.svg";

  return (
    <section className="relative min-h-[500px] md:h-[675px] bg-[#dedede] px-6 py-12 md:p-0">
      <div className='h-[675px] flex items-center gap-20'>
        <Image 
          src={image || fallbackImage}
          alt={title}
          width={400}
          height={400}
          className="object-contain"
          unoptimized
        />

        <div className='flex flex-col items-start justify-center'>
          <strong className='text-6xl mb-4 text-black'>{title}</strong>
          <p className='text-xl my-4 text-black'>{subtitle}</p>
          <button className='flex-none rounded-md bg-[#1f1f1f] px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-gray-800'>
            <p className='px-1'>{buttonText}</p>
          </button>
        </div>
      </div>
    </section>
  )
}
