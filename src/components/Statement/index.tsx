"use client"

import Image from "next/image"

interface StatementProps {
  title: string;
  content: string;
}

export default function Statement({ title, content }: StatementProps) {
  return (
    <section className="flex flex-col items-start mx-auto px-[124px] py-16 gap-16 w-[1440px] h-[341.32px] bg-[#090909]">
      <div className="flex flex-col items-start w-[1192px] mx-auto gap-16">
        {/* Logo */}
        <div className="w-[163px] h-[59.32px] relative">
          <Image
            src="/logo.svg"
            alt="Arfve Logo"
            fill
            style={{ objectFit: 'contain' }}
            className="brightness-0 invert"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col items-start gap-3 w-[1192px] h-[90px]">
          <h2 className="w-[1192px] h-[34px] font-inter font-semibold text-[28px] leading-[34px] text-white">
            {title}
          </h2>
          <p className="w-[1192px] h-[44px] font-inter font-medium text-lg leading-[22px] text-white">
            {content}
          </p>
        </div>
      </div>
    </section>
  )
} 