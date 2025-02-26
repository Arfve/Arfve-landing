import Image from "next/image";

interface AboutHero4Props {
  json4: {
    image_1: string;
    image_2: string;
    image_3: string;
  };
}

export const AboutHero4: React.FC<AboutHero4Props> = ({ json4 }) => {
  if (!json4) return null;

  return (
    <section 
      className="relative w-full h-auto mx-auto flex flex-col md:flex-row justify-center items-center px-6 py-16 bg-white md:px-[354px] md:w-[1438px] md:h-[177px]"
      style={{ gap: "10vw" }} // Adjust gap for different screens
    >
      {[json4.image_1, json4.image_2, json4.image_3].map((imageUrl, index) => (
        <div 
          key={index}
          className="relative flex-none w-full md:w-[126px] h-[49px] sm:w-[126px] sm:h-[126px]"
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
