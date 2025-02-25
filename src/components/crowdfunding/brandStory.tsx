"use client";
import React from "react";
import Image from "next/image";

interface BrandStoryProps {
  hero_img: string;
  hero_subtitle: string;
  hero_title: string;
}

const BrandStory: React.FC<BrandStoryProps> = ({
  hero_img,
  hero_subtitle,
  hero_title,
}) => {
  return (
    <section className=" flex justify-center  ">
      <div className="w-[70%] flex justify-between  items-center  m-14">
        <div className="flex flex-col  text-left gap-3 w-[450px]">
          <h1 className="text-3xl font-bold">{hero_title}</h1>
          <p className="text-gray-600">{hero_subtitle}</p>
        </div>
        <div className=" ">
          <Image
            src={hero_img || "/globe.svg"}
            alt={"Default alt text"}
            width={500}
            height={450}
            className="max-w-full h-auto" // Ensures responsiveness
          />
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
