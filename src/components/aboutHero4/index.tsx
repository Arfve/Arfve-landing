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

  const images = [json4.image_1, json4.image_2, json4.image_3];

  return (
    <section className="w-full py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {images.map((imageUrl, index) => (
            <div key={index} className="w-full md:w-1/3">
              <div className="relative aspect-[1438/177] w-full">
                <Image
                  src={imageUrl || '/placeholder.png'}
                  alt={`Bragi image ${index + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
