"use client";
import React from "react";

interface BrandStoryProps {
  hero_image: string; // Direkt video URL (t.ex. "https://cdn.shopify.com/.../video.mp4")
  hero_title: string;
  hero_subtitle: string;
}

const BrandStory: React.FC<BrandStoryProps> = ({
  hero_image,
  hero_title,
  hero_subtitle,
}) => {
  return (
    <section className="flex justify-center px-4 sm:px-8 m-5">
      <div className="w-full max-w-7xl flex justify-center items-center flex-col mx-auto">
        {/* Videobild med text */}
        <video
          src={
            hero_image ||
            "https://cdn.shopify.com/videos/c/o/v/9e0d372617804c88bf4419c760d89258.mp4"
          }
          className="w-full sm:w-[80%] md:w-[60%] h-auto border-solid border-2 border-black"
          preload="auto"
          muted
          autoPlay
          loop
        >
          Din webbläsare stödjer inte video-taggen.
        </video>

        {/* Textöverlagring */}
        <div className="text-center mt-4">
          <h1 className="text-3xl sm:text-4xl font-bold">{hero_title}</h1>
          <p className="text-lg sm:text-xl text-gray-600">{hero_subtitle}</p>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
