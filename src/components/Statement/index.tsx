"use client";

import Image from "next/image";

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="bg-[#090909] py-16 px-8 md:px-32">
      <div className="max-w-[1440px] mx-auto">
        <Image 
          src="/logo.svg"
          alt="Arfve"
          width={163}
          height={59.32}
          className="invert mb-16"
          priority
        />
        <div className="flex flex-col gap-3 w-full max-w-[1192px]">
          <h2 className="text-[28px] leading-[34px] font-semibold font-inter text-white">{title}</h2>
          <p className="text-[18px] leading-[22px] font-medium font-inter text-white">{content}</p>
        </div>
      </div>
    </section>
  );
}
