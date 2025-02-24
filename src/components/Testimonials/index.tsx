"use client";

import TestimonialCard from "./TestimonialCard";
import { TestimonialsData } from "@/types/shopify";

export default function Testimonials({ title, list = [] }: TestimonialsData) {
  return (
    <section className="w-full bg-[#000000] flex justify-center">
      <div className="w-[1440px] flex flex-col py-16 px-8 md:px-32">
        <div className="flex flex-col gap-[42px] w-full max-w-[1192px]">
          {/* Title */}
          <h2 className="text-[40px] leading-[48px] font-bold font-inter text-white">
            {title} 
          </h2>

          {/* Cards Container */}
          <div className="overflow-hidden w-full">
            {/* Duplicate the testimonial cards for a seamless loop */}
            <div className="flex items-center animate-scrollRight gap-[40px] w-[fit-content]">
              {list.map((testimonial, index) => (
                <TestimonialCard
                  key={`first-${index}`}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  imageUrl={testimonial.imageUrl}
                />
              ))}
              {list.map((testimonial, index) => (
                <TestimonialCard
                  key={`second-${index}`}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  role={testimonial.role}
                  imageUrl={testimonial.imageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
