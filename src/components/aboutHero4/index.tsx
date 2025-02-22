"use client";
import Image from "next/image";

interface Json4Item {
  image: string;
  text: string;
}

interface AboutHero4Props {
  json4: {
    title: string;
    items: Json4Item[];
  };
}

export function AboutHero4({ json4 }: AboutHero4Props) {
  if (!json4 || !json4.items) {
    return null;
  }

  return (
    <div className="flex flex-col items-center py-16">
      {json4.title && (
        <h2 className="text-2xl font-semibold mb-8">{json4.title}</h2>
      )}
      <div className="flex justify-center gap-48">
        {json4.items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Image
              src={item.image || "/window.svg"}
              alt={`Bragi ${index + 1}`}
              width={50}
              height={50}
            />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
