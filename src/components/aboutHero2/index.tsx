import Image from "next/image";

interface VisionHeroProps {
  json: {
    title: string;      
    image: string;      
    subtitle_1: string; 
    text_1: string;     
    subtitle_2: string; 
    text_2: string;     
  };
}

export default function AboutHero2({ json }: VisionHeroProps) {
  if (!json) return null;

  return (
    <section className="w-full bg-[#F7F7F7] flex justify-center">
      <div className="w-[1440px] h-[593px] flex flex-row relative">
        {/* Left Image Container */}
        <div className="w-1/2 relative">
          {json.image && (
            <div className="relative w-full h-full">
              <Image
                src={json.image}
                alt="Vision"
                fill
                className="object-cover"
                sizes="720px"
              />
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="w-1/2 flex flex-col items-start p-16 gap-[42px]">
          <h1 className="w-[606px] h-[48px] font-inter font-bold text-[40px] leading-[48px] text-black">
            {json.title}
          </h1>

          {/* Vision Section */}
          <div className="flex flex-col items-start gap-3 w-[606px] h-[134px]">
            <h3 className="font-inter font-semibold text-[28px] leading-[34px] text-black">
              {json.subtitle_1}
            </h3>
            <p className="font-inter font-medium text-[18px] leading-[22px] text-black">
              {json.text_1}
            </p>
          </div>

          {/* Innovation Section */}
          <div className="flex flex-col items-start gap-3 w-[606px] h-[134px]">
            <h3 className="font-inter font-semibold text-[28px] leading-[34px] text-black">
              {json.subtitle_2}
            </h3>
            <p className="font-inter font-medium text-[18px] leading-[22px] text-black">
              {json.text_2}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 