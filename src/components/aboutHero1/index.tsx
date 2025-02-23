import Image from "next/image";

interface HeroSectionProps {
  json: {
    title: string;    // "Upgrade. Evolve. Never Replace."
    subtitle: string; // Description text
    image: string;    // Hero image
  };
}

export default function AboutHero1({ json }: HeroSectionProps) {
  if (!json) {
    return null;
  }

  return (
    <section className="w-full bg-white flex justify-center">
      <div className="w-[1440px] flex flex-col items-start p-[96px_124px] relative">
        <div className="flex flex-row items-center justify-between w-full gap-[10px]">
          {/* Left Content */}
          <div className="w-1/2 pr-12">
            <h1 className="w-[509px] font-inter font-bold text-[40px] leading-[48px] text-black">
              {json.title}
            </h1>
            <p className="w-[509px] font-inter font-bold text-[18px] leading-[22px] text-black">
              {json.subtitle}
            </p>
          </div>

          {/* Right Image */}
          <div className="flex justify-center items-center p-[10px] w-[593px] h-[284px] bg-[#DEDEDE] rounded-[20px] overflow-hidden">
            {json.image && (
              <div className="relative w-full h-full">
                <Image
                  src={json.image}
                  alt="Hero"
                  fill
                  className="object-cover"
                  sizes="593px"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 