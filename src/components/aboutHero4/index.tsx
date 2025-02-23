"use client";
import Image from "next/image";

interface AboutHero4Props {
  json4: {
    image_1: string;
    image_2: string;
    image_3: string;
  }
}

export const AboutHero4: React.FC<AboutHero4Props> = ({ json4 }) => {
  if (!json4) return null;

  return (
    <section 
      className="relative w-[1438px] h-[177px] mx-auto flex justify-center items-center px-[354px] py-16 bg-white"
      style={{ gap: "184px" }}
    >
      {[json4.image_1, json4.image_2, json4.image_3].map((imageUrl, index) => (
        <div 
          key={index}
          className="relative w-[126px] h-[49px] flex-none"
        >
          <Image
            src={imageUrl || '/rfv.png'}
            alt={`Logo ${index + 1}`}
            fill
            sizes="(max-width: 768px) 33vw, 126px"
            className="object-contain"
          />
        </div>
      ))}
    </section>
  );
};
