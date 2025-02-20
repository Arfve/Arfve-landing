"use client";

import Image from "next/image";
import React from "react";

interface UpgradeEvolveProps {
  title: string;
  description: string;
  image: string;
}

export const UpgradeEvolve: React.FC<UpgradeEvolveProps> = ({ title, description, image }) => {
  return (
    <section className="flex justify-between items-center py-16 px-10">
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="mt-4 text-lg">{description}</p>
      </div>
      <Image src={image} alt={title} width={400} height={300} className="object-contain" />
    </section>
  );
};
