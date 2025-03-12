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
    <section className="flex justify-center">
  <div className="w-full   ">
    
    {/* Videobild med text */}
    <div className="relative  overflow-hidden  ">
      <video
        src={hero_image || "https://cdn.shopify.com/videos/c/o/v/9e0d372617804c88bf4419c760d89258.mp4"}
        className="w-full h-auto"
        preload="auto"
        muted
        autoPlay
        loop
      >
        Din webbläsare stödjer inte video-taggen.
      </video>

      {/* Textöverlagring */}
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray p-4 mix-blend-difference">
        <h1 className="text-4xl font-bold">{hero_title}</h1>
        <p className="text-xl  text-gray">{hero_subtitle}</p>
      </div>
    </div>
  </div>
</section>


  );
};

export default BrandStory;
