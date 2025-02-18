"use client";

import TestimonialCard from './TestimonialCard';
import { TestimonialsData } from '@/types/shopify';

export default function Testimonials({ title, list = [] }: TestimonialsData) {
  return (
    <section className="w-full bg-[#090909] py-16 px-8 md:px-32">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-[42px] w-full max-w-[1192px]">
          {/* Title */}
          <h2 className="text-[40px] leading-[48px] font-bold font-inter text-white">
            {title}
          </h2>

          {/* Cards Container */}
          <div className="flex items-center gap-10 overflow-x-auto scrollbar-hide">
            {list.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                imageUrl={testimonial.imageUrl}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
