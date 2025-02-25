import React from "react";
import Image from "next/image";


interface industryEndorsementsProps {
  array: {
    subtitle: string;
    image: string;
    position: string;
    company: string;
  }[];
  subtitle: string;
  title: string;
}

const IndustryEndorsements: React.FC<industryEndorsementsProps> = (
  props
) => {
  console.log(props);

  return (
    <div className="flex flex-col text-center ">
      <h1 className="text-4xl font-semibold">{props.title}</h1>
      <h2>{props.subtitle}</h2>
      <div>
        {props.array.map((item, index) => (
          <div key={index}>
            <Image 
              src={item.image} 
              alt={item.company} 
              width={200} 
              height={200} 
              layout="responsive" 
            />
            <h3>{item.subtitle}</h3>
            <p>
              {item.position} at {item.company}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryEndorsements;
