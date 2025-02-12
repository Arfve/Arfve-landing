"use client"

import Image from "next/image"

export default function Statement() {
  return (
    <section className="flex flex-col items-start mx-auto px-[124px] py-16 gap-16 w-[1440px] h-[341.32px] bg-[#090909]">
      <div className="flex flex-col items-start w-[1192px] mx-auto gap-16">
        {/* Logo */}
        <div className="w-[163px] h-[59.32px]">
          <Image
            src="/logo.svg"
            alt="Arfve Logo"
            width={163}
            height={59.32}
            className="w-[163px] h-[59.32px] brightness-0 invert"
          />
        </div>

        {/* Frame 46 - Content */}
        <div className="flex flex-col items-start gap-3 w-[1192px] h-[90px]">
          <h2 className="w-[1192px] h-[34px] font-inter font-semibold text-[28px] leading-[34px] text-white">
            Our statement
          </h2>
          <p className="w-[1192px] h-[44px] font-inter font-medium text-lg leading-[22px] text-white">
            Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade. Faprede mubopun exov om än daboss repör. E-learning nenodöbel antel.
          </p>
        </div>
      </div>
    </section>
  )
} 