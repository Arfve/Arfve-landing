import React from "react";
import Image from "next/image";

interface IndustryEndorsementsProps {
  array: {
    subtitle: string;
    image: string;
    position: string;
    company: string;
    name: string;
  }[];
  subtitle: string;
  title: string;
}

const IndustryEndorsements: React.FC<IndustryEndorsementsProps> = (props) => {
  return (
    <div className="flex flex-col items-center text-center p-8">
      <h1 className="text-4xl font-bold mb-6">{props.title}</h1>
      <h2 className="text-lg max-w-2xl mb-12">{props.subtitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl">
        {props.array.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.company}
              width={350}
              height={350}
              className="rounded-lg object-cover"
            />
            <p className="mt-6 text-lg italic">{item.subtitle} </p>
            <p className="mt-4 font-semibold">
              {item.position}, {item.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryEndorsements;
