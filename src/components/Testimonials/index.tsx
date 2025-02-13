"use client"

import Image from 'next/image'

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  imageUrl?: string
}

function TestimonialCard({ quote, author, role, imageUrl }: TestimonialCardProps) {
  return (
    <div className="flex-shrink-0 flex flex-col items-center gap-3 w-[200px] h-[310px]">
      <div className="flex justify-center items-center w-[200px] h-[200px] bg-[#DEDEDE] rounded-[20px] p-[10px] gap-[10px]">
        {imageUrl && (
          <div className="relative w-[79px] h-[79px]">
            <Image
              src={imageUrl}
              alt={`${author}'s testimonial`}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
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

interface TestimonialsProps {
  title: string;
  list: Array<{
    quote: string;
    author: string;
    role: string;
    imageUrl?: string;
  }>;
}

export default function Testimonials({ title, list = [] }: TestimonialsProps) {
  const defaultTestimonials = [
    {
      quote: "Amazing product!",
      author: "John Doe",
      role: "Tech Enthusiast",
      imageUrl: ""
    },
    {
      quote: "Best earphones ever",
      author: "Jane Smith",
      role: "Music Producer",
      imageUrl: ""
    }
  ]

  const displayTestimonials = list.length > 0 ? list : defaultTestimonials

  return (
    <section className="bg-[#090909] py-16 px-32">
      <h2 className="text-[28px] font-semibold text-white mb-8">{title}</h2>
      <div className="flex gap-8 overflow-x-auto">
        {displayTestimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            quote={testimonial.quote}
            author={testimonial.author}
            role={testimonial.role}
            imageUrl={testimonial.imageUrl}
          />
        ))}
      </div>
    </section>
  )
} 