"use client";

import Image from "next/image";

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="flex flex-col items-start px-[124px] py-[64px] gap-[64px] w-[1440px] h-[341.32px] bg-[#090909]">
      {/* Main Content Container */}
      <div className="flex flex-col items-start w-[1192px] mx-auto gap-[64px]">
        {/* Logo */}
        <div className="w-[163px] h-[59.32px] relative">
          <Image
            src="/logo.svg"
            alt="Arfve Logo"
            width={163}
            height={59}
            className="w-[163px] h-[59.32px]"
            priority
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-[12px] w-[1192px] h-[90px]">
          <h2 className="font-inter font-semibold text-[28px] leading-[34px] text-white">
            {title}
          </h2>
          <p className="font-inter font-medium text-[18px] leading-[22px] text-white">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
