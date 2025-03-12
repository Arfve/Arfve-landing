"use client";
import { useState } from "react";

interface Review {
  text: string;
  author: string;
  rating: number;
}

interface AboutHero5Props {
  json5: {
    title: string;
    reviews: Review[];
  };
}

export default function AboutHero5({ json5 }: AboutHero5Props) {
  const [currentReview, setCurrentReview] = useState(0);

  if (!json5?.reviews) return null;

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % json5.reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) =>
      prev === 0 ? json5.reviews.length - 1 : prev - 1
    );
  };

  return (
    <section className="relative w-full bg-[#243555] py-24 px-6 lg:px-52 flex flex-col items-center justify-center gap-9">
      {/* Stars */}
      <div className="relative w-[116px] h-5 flex gap-6 justify-center">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-5 h-5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="#FFEE00"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z" />
            </svg>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-52 w-full">
        {/* Previous Button */}
        <button
          data-tracking-id="previous-review-button"
          onClick={prevReview}
          className="w-[12.5px] h-[25px] flex items-center justify-center lg:ml-8"
        >
          <svg
            width="13"
            height="25"
            viewBox="0 0 13 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transform rotate-180"
          >
            <path
              d="M1 1L11 12.5L1 24"
              stroke="#E2E2E2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Review Content */}
        <div className="flex flex-col items-center gap-8 w-full lg:w-[730px]">
          <div className="flex flex-col items-center gap-6 w-full">
            <h1 className="text-2xl lg:text-4xl font-bold text-white text-center">
              {json5.title}
            </h1>

            <p className="text-base lg:text-lg font-medium text-white text-center leading-[22px]">
              {json5.reviews[currentReview].text}
            </p>

            <p className="text-base font-semibold text-white text-center">
              {json5.reviews[currentReview].author}
            </p>
          </div>

          {/* Dots */}
          <div className="flex gap-3 justify-center">
            {json5.reviews.map((_, index) => (
              <div
                key={index}
                className={`w-[9px] h-[9px] rounded-full ${
                  index === currentReview ? "bg-[#989696]" : "bg-[#BBB8B8]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Next Button */}
        <button
          data-tracking-id="next-review-button"
          onClick={nextReview}
          className="w-[12.5px] h-[25px] flex items-center justify-center lg:mr-8"
        >
          <svg
            width="13"
            height="25"
            viewBox="0 0 13 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 12.5L1 24"
              stroke="#E2E2E2"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
