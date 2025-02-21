"use client"
import { useState } from "react";

interface Review {
  title: string;
  subtitle: string;
  rate: number;
  name: string;
}

interface AboutHero5Props {
  json5: {
    title: string;
    reviews: Review[];
  };
}

const AboutHero5 = ({ json5 }: AboutHero5Props) => {
  if (!json5 || !json5.reviews || json5.reviews.length === 0) {
    return null;
  }
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const reviews = json5.reviews;

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  return (
    <div className="flex flex-col items-center py-16 bg-gray-800 text-white">
      <h2 className="text-2xl font-semibold mb-8">{json5.title}</h2>
      
      <div className="flex items-center justify-center relative">
        <button
          className="absolute left-0 px-4 py-2 text-lg font-semibold bg-transparent border-2 rounded-full cursor-pointer"
          onClick={prevReview}
        >
          &#8249; Prev
        </button>

        <div className="flex flex-col items-center justify-center max-w-sm p-6">
          <div className="flex mb-4">
            {[...Array(reviews[currentIndex].rate)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </div>

          <h3 className="text-xl font-semibold">{reviews[currentIndex].title}</h3>
          <p className="text-center">{reviews[currentIndex].subtitle}</p>
          <p className="italic mt-4">- {reviews[currentIndex].name}</p>
        </div>

        <button
          className="absolute right-0 px-4 py-2 text-lg font-semibold bg-transparent border-2 rounded-full cursor-pointer"
          onClick={nextReview}
        >
          Next &#8250;
        </button>
      </div>
    </div>
  );
};

export default AboutHero5;
