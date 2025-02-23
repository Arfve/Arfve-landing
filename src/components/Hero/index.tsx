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
    <section className="flex justify-center items-center bg-[#dedede]">
        <div className="max-w-[1440px] w-full h-[675px] flex">
        <div className="relative w-1/2 h-full bg-white">
          <Image
            src={image || "/placeholder.svg"}
            alt={title || "Arfve Headphones"}
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 px-12">
          <h1 className="text-6xl mb-4 text-black text-center font-bold">{title}</h1>
          <p className="text-xl my-4 text-black text-center">{subtitle}</p>
          <button className="flex-none rounded-md bg-[#1f1f1f] px-3.5 py-2.5 text-sm text-white shadow-sm hover:bg-gray-800 transition-colors">
            <span className="px-1">{buttonText}</span>
          </button>
        </div>
      </div>
    </section>
  )
}

