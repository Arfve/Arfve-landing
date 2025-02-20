"use client";

import TestimonialCard from './TestimonialCard';
import { TestimonialsData, Testimonial } from '@/types/shopify';


interface TestimonialsProps {
  title: string;
  testimonials: Testimonial[];
}
export default function Testimonials({ title, testimonials = [] }: TestimonialsProps) {
  return (
    <section className="w-full bg-[#090909] py-16 px-8 md:px-32">
      <div className="max-w-[1192px] mx-auto">
        <h2 className="text-[28px] font-semibold text-white mb-8">{title}</h2>
        <div className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide">
          {testimonials.map((testimonial, index) => (
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
    </section>
  );
}
