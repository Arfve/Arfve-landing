"use client";

import { useState } from "react";
import React from "react";

interface FAQProps {
  children: React.ReactNode;
  answer: string;
}

const index = ({ children, answer }: FAQProps) => {
  const [isAnswerOpen, setIsAnwerOpen] = useState(false);

  return (
    <>
      <div className="relative w-full">
        {/* Question */}
        <div 
  className="flex items-center text-black w-full max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto justify-between py-4 font-semibold relative cursor-pointer sm:gap-x-[30px] md:gap-x-[15px]" 
  onClick={() => setIsAnwerOpen(!isAnswerOpen)}
        >
          {children}
          <div
            className={`cursor-pointer transform transition-transform duration-300 ${
              isAnswerOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            &#9660;
          </div>
        </div>

        {/* Answer */}
        <div
          className={`transition-[max-height, opacity] duration-500 ease-in-out overflow-hidden ${
            isAnswerOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 text-black text-left">{answer}</div>
        </div>

        {/* Underline */}
        <div className="h-[1px] w-full bg-black absolute bottom-0 left-0"></div>
      </div>
    </>
  );
};

export default index;
