"use client"
import { useState } from "react";

interface Review {
  title: string;
  subtitle: string;
  rate: number;
  name: string;
}

const AboutHero5 = ({ json5 }: { json5: Review[] }) => {
    
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % json5.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + json5.length) % json5.length
    );
  };
console.log(json5);

  return (
    <div className="flex items-center justify-center relative">
      <button
        className="absolute left-0 px-4 py-2 text-lg font-semibold bg-transparent border-2 rounded-full cursor-pointer"
        onClick={prevReview}
      >
        &#8249; Prev
      </button>

      <div className="transition-transform duration-500 ease-in-out transform flex flex-col items-center justify-center max-w-sm p-6 border rounded-lg">
        <h3 className="text-xl font-semibold">{json5[currentIndex].title}</h3>
        <p className="text-gray-600">{json5[currentIndex].subtitle}</p>
        <p className="font-bold">{json5[currentIndex].rate} Stars</p>
        <p className="italic">- {json5[currentIndex].name}</p>
      </div>

      <button
        className="absolute right-0 px-4 py-2 text-lg font-semibold bg-transparent border-2 rounded-full cursor-pointer"
        onClick={nextReview}
      >
        Next &#8250;
      </button>
    </div>
  );
};

export default AboutHero5;
