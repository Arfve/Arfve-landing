"use client"

import Image from "next/image"

interface HeroProps {
  title: string
  subtitle: string
  buttonText: string
  image?: string
}

export default function Hero({ title, subtitle, buttonText, image }: HeroProps) {
  return (
<section className="relative min-h-[500px] md:h-[675px] bg-[#F3F3F3] px-6 py-12 md:p-0 overflow-hidden">      <div className="max-w-[1440px] h-full mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left"> {/* Changed flex settings */}
        {image && (
          <div className="relative w-full md:w-1/2 aspect-[5/4] mb-8 md:mb-0"> {/* Adjusted width and margin */}
            <Image 
              src={image}
              alt={title || "Arfve Headphones"}
              fill
              className="object-contain" 
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        )}

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 px-12"> {/* Adjusted width */}
          <h1 className="text-4xl md:text-6xl mb-4 text-[#243555] font-bold">{title}</h1> {/* Adjusted font size */}
          <p className="text-lg md:text-xl my-4 text-[#243555]">{subtitle}</p> {/* Adjusted font size */}
          <button className="flex items-center gap-2 rounded-[300px] bg-[#243555] px-4 py-2 text-sm text-white shadow-sm hover:bg-gray-800 transition-colors">
          <Image src="/Icon.png" alt="Icon" width={20} height={20} className="w-5 h-5" />
          <span>{buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
