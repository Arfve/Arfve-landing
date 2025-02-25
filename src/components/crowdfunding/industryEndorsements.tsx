import React from "react";
import Image from "next/image";

interface industryEndorsementsProps {
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

const IndustryEndorsements: React.FC<industryEndorsementsProps> = (props) => {
  console.log(props);

  return (
    <div className="flex flex-col text-center py-8 gap-5">
      <h1 className="text-4xl font-semibold">{props.title}</h1>
      <h2 className="text-lg">{props.subtitle}</h2>
      <div className="flex justify-evenly gap-2 px-5">
        {props.array.map((item, index) => (
          <div key={index} className="flex flex-col max-w-max gap-2">
            {/* Text with fixed height */}
            <div className="h-[150px] flex items-center justify-center text-center">
              <div>
                <h3 className="text-lg font-medium mb-1">"{item.subtitle}"</h3>
                <p className="text-sm">
                  {item.name}, {item.position} at {item.company}
                </p>
              </div>
            </div>

            {/* Image with fixed size */}
            <div className="w-[300px] h-[300px] overflow-hidden rounded-lg flex self-center">
              <Image
                src={item.image}
                alt={item.company}
                width={300}
                height={300}
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryEndorsements;
