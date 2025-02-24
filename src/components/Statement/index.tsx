"use client";

import Image from "next/image";

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="w-full bg-[#000000] flex justify-center">
      <div className="w-[1440px] flex flex-col items-center justify-center py-16 px-8 md:px-32">
        {/* Logo Container */}
        <div className="w-full max-w-[1192px] flex flex-col items-start">
          <div className="relative w-[163px] h-[59.32px]">
            <Image 
              src="/logo.svg"
              alt="Arfve"
              fill
              className="invert"
              priority
              sizes="163px"
            />
          </div>

          {/* Content Container */}
          <div className="flex flex-col gap-3 mt-16">
            <h2 className="font-inter font-semibold text-2xl md:text-[28px] leading-[34px] text-white max-w-[1192px]">
              {title}
            </h2>
            <p className="font-inter font-medium text-base md:text-[18px] leading-[22px] text-white max-w-[1192px]">
              {content}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
