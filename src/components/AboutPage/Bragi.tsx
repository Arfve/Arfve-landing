"use client";

import React from "react";

interface BragiProps {
  items: string[];
}

export const Bragi: React.FC<BragiProps> = ({ items }) => {
  return (
    <section className="py-16 px-10 flex justify-around">
      {items.map((item, index) => (
        <div key={index} className="text-center">
          <div className="text-6xl">🔲</div> {/* Placeholder for actual symbol */}
          <p className="mt-4">{item}</p>
        </div>
      ))}
    </section>
  );
};
