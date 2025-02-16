"use client";

import Image from "next/image";

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="flex flex-col items-start px-[124px] py-[64px] gap-[64px] w-full max-w-[1440px] mx-auto h-auto bg-[#090909]">
      {/* Main Content Container */}
      <div className="flex flex-col items-start gap-[12px] w-full max-w-[1192px] mx-auto">
        {/* Logo */}
        <div className="w-[163px] h-[59.32px] relative">
          <Image
            src="/logo.svg"
            alt="Arfve Logo"
            width={163}
            height={59.32}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-[12px] w-full">
          {/* Title */}
          <h2 className="font-inter font-semibold text-[28px] leading-[34px] text-white w-full max-w-[1192px]">
            {title}
          </h2>

          {/* Content */}
          <p className="font-inter font-medium text-[18px] leading-[22px] text-white w-full max-w-[1192px]">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
