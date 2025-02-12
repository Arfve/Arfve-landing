"use client"

import Image from 'next/image'
import { useState } from 'react'

type TestimonialCardProps = {
  quote: string
  author: string
  role: string
  imageUrl: string
}

function TestimonialCard({ quote, author, role, imageUrl }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-3 w-[200px] h-[310px]">
      <div className="flex justify-center items-center w-[200px] h-[200px] bg-[#DEDEDE] rounded-[20px] p-[10px] gap-[10px]">
        <div className="w-[79px] h-[79px]" />
      </div>
      <div className="flex flex-col items-start gap-3 w-[200px] h-[98px]">
        <p className="w-[200px] h-[48px] font-inter font-bold text-[20px] leading-[24px] text-white">
          {quote}
        </p>
        <p className="w-[200px] h-[38px] font-inter font-normal text-base leading-[19px] text-white">
          {author}<br />{role}
        </p>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const testimonials = [
    {
      quote: "The best product of the year",
      author: "Tim Cook",
      role: "CEO @ Apple",
      imageUrl: "/testimonial-1.svg"
    },
    {
      quote: "Revolutionary sound quality",
      author: "Mark Zuckerberg",
      role: "CEO @ Meta",
      imageUrl: "/testimonial-2.svg"
    },
    {
      quote: "Game-changing innovation",
      author: "Sundar Pichai",
      role: "CEO @ Google",
      imageUrl: "/testimonial-3.svg"
    },
    {
      quote: "Outstanding battery life",
      author: "Satya Nadella",
      role: "CEO @ Microsoft",
      imageUrl: "/testimonial-4.svg"
    },
    {
      quote: "Perfect for daily use",
      author: "Jensen Huang",
      role: "CEO @ NVIDIA",
      imageUrl: "/testimonial-5.svg"
    },
    {
      quote: "Exceptional design",
      author: "Lisa Su",
      role: "CEO @ AMD",
      imageUrl: "/testimonial-6.svg"
    },
    {
      quote: "Incredible experience",
      author: "Andy Jassy",
      role: "CEO @ Amazon",
      imageUrl: "/testimonial-7.svg"
    },
    {
      quote: "Next level audio",
      author: "Pat Gelsinger",
      role: "CEO @ Intel",
      imageUrl: "/testimonial-8.svg"
    },
    {
      quote: "Simply amazing",
      author: "Elon Musk",
      role: "CEO @ Tesla",
      imageUrl: "/testimonial-9.svg"
    }
  ]

  return (
    <section className="flex flex-col items-start w-full bg-[#090909]">
      <div className="w-[1440px] mx-auto px-[124px]">
        <div className="flex flex-col items-start py-16 gap-[42px]">
          <h2 className="font-inter font-bold text-[40px] leading-[48px] text-white">
            They talk about us
          </h2>
          <div className="flex flex-row items-center gap-[40px] w-[1400px] overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 