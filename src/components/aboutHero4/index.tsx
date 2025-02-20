"use client ";
import Image from "next/image";

interface Json4Item {
  image: string;
  text: string;
}

interface AboutHero4Props {
  json4: Json4Item[];
}

export function AboutHero4({ json4 }: AboutHero4Props) {
  return (
    <div className="flex justify-center gap-48">
      {json4.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <Image
            src={"/window.svg"}
            alt={`Bragi ${index + 1}`}
            width={50}
            height={50}
          />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
