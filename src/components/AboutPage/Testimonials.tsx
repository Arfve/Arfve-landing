"use client";

import React from "react";

interface Testimonial {
  text: string;
  name: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section className="text-center py-16 px-10">
      <h2 className="text-3xl font-bold">Don’t take our word for it. Take theirs.</h2>
      {testimonials.map((testimonial, index) => (
        <div key={index} className="mt-8">
          <p className="text-lg italic">“{testimonial.text}”</p>
          <p className="mt-4 font-semibold">{testimonial.name}</p>
        </div>
      ))}
    </section>
  );
};

export default Testimonials;