"use client";
import { useState } from "react";

interface TechSpecs {
  title: string;
  groups: Array<{
    name: string;
    description: string;
  }>;
}

interface TechSpecsProps {
  productTS: TechSpecs | null;
}

export default function TechSpecs({ productTS }: TechSpecsProps) {
  const [openSpecIndex, setOpenSpecIndex] = useState<number | null>(null);
  const handleToggleSpec = (index: number) =>
    setOpenSpecIndex((prev) => (prev === index ? null : index));
  if (!productTS) return null;
  return (
    <main className="m-0 flex items-center min-w-xs min-h-[72.5vh] bg-white overflow-hidden w-full">
      <div className=" w-[840px] mx-auto p-8 text-center">
        <h1 className="text-2xl text-black font-semibold mb-6 text-center sm:text-left font-f">
          {productTS.title}
        </h1>
        {productTS.groups.map((group, index) => {
          const isOpen = openSpecIndex === index;
          return (
            <div key={index} className="relative mb-4">
              <div
                className="flex items-center text-black w-full max-w-[90%] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[900px] mx-auto justify-between py-4 font-semibold relative cursor-pointer sm:gap-x-[30px] md:gap-x-[15px]"
                onClick={() => handleToggleSpec(index)}>
                {group.name}
                <div
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    isOpen ? " rotate-[-90deg] " : "rotate-90"
                  }`}>
                  &gt;
                </div>
              </div>
              <div
                className={`transition-[max-height,opacity] duration-500 ease-in-out overflow-hidden ${
                  isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}>
                <div className="p-4 text-black text-left">
                  {group.description}
                </div>
              </div>
              <div className="after:content-[''] after:h-[1px] after:w-full after:bg-black after:absolute after:bottom-0 after:-translate-x-1/2"></div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
