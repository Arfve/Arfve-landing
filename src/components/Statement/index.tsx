"use client";

import Image from "next/image";

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="bg-[#000000] py-16 px-8 md:px-32 ">
      <div className=" mx-auto">
        <div className="relative w-[163px] h-[59.32px]">
          <Image 
            src="/logo.svg"
            alt="Arfve"
            fill
            className="invert"
            priority
          />
        </div>
        <div className="flex flex-col gap-3 w-full max-w-[1192px] mt-16">
          <h2 className="text-[28px] leading-[34px] font-semibold font-inter text-white">{title}</h2>
          <p className="text-[18px] leading-[22px] font-medium font-inter text-white">{content}</p>
        </div>
      </div>
    </section>
  );
}
