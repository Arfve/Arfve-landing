"use client";

import Image from "next/image";
import React from "react";

interface BeMoreHumanProps {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export const BeMoreHuman: React.FC<BeMoreHumanProps> = ({ title, subtitle, description, image }) => {
  return (
    <section className="flex items-center py-16 px-10">
      <Image src={image} alt={title} width={400} height={300} className="object-contain" />
      <div className="ml-10">
        <h4 className="text-lg font-bold">{title}</h4>
        <h2 className="text-3xl font-semibold mt-2">{subtitle}</h2>
        <p className="mt-4 text-lg">{description}</p>
      </div>
    </section>
  );
};
