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
      <div className="relative ">
        {/* Question */}
        <div className="flex items-center text-black w-[900px] justify-between py-4 font-semibold relative cursor-pointer" onClick={() => setIsAnwerOpen(!isAnswerOpen)}>
          {children}
          <div
            className={`cursor-pointer transform transition-transform duration-00 ${
              isAnswerOpen ? "rotate-180" : "rotate-0"
            }`}
            onClick={() => setIsAnwerOpen(!isAnswerOpen)}
          >
            &#9660;
          </div>
        </div>
        <div
          className={`transition-[max-height, opacity] duration-500 ease-in-out overflow-hidden ${
            isAnswerOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="p-4 text-black text-left">{answer}</div>
        </div>
        <div className="after:content-[''] after:h-[1px] after:w-full after:bg-black after:absolute after:bottom-0 after:-translate-x-1/2 "></div>
      </div>
    </>
  );
};

export default index;
