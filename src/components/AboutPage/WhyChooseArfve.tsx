"use client";

import React from "react";
import Image from "next/image";

interface Feature {
  title: string;
  description: string;
  image: string;
}

interface WhyChooseProps {
  title: string;
  description: string;
  features: Feature[];
}

export const WhyChoose: React.FC<WhyChooseProps> = ({ title, description, features }) => {
  return (
    <section className="py-16 px-10">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-4 text-lg">{description}</p>
      <div className="grid grid-cols-2 gap-6 mt-8">
        {features.map((feature, index) => (
          <div key={index} className="p-4 border rounded-lg flex flex-col items-center">
            <h3 className="text-xl font-bold">{feature.title}</h3>
            <p className="mt-2">{feature.description}</p>
            <Image src={feature.image} alt={feature.title} width={96} height={96} className="mt-4 object-contain" />
            </div>
        ))}
      </div>
    </section>
  );
};
