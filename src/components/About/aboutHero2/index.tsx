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
    <section className="w-full max-w-[1440px] min-h-[675px] bg-[#F7F7F7] flex flex-col lg:flex-row justify-center items-center mx-auto px-6 lg:px-12 py-12">
      {/* Left Image */}
      <div className="relative w-full lg:w-1/2 flex justify-center items-center">
        {json.image && (
          <Image
            src={json.image}
            alt="Vision"
            width={600}
            height={400}
            className="object-cover rounded-2xl shadow-md"
            priority
          />
        )}
      </div>

      {/* Right Content */}
      <div className="flex flex-col justify-center items-start text-center lg:text-left lg:w-1/2 w-full gap-6">
        <h2 className="font-inter font-bold text-[24px] lg:text-[40px] leading-[1.2] text-black break-words">
          {json.title}
        </h2>

        {/* Vision Section */}
        <div className="flex flex-col items-center lg:items-start gap-2 w-full max-w-[606px]">
          <h3 className="font-inter font-semibold text-[20px] lg:text-[28px] leading-[1.2] text-black">
            {json.subtitle_1}
          </h3>
          <p className="font-inter font-medium text-[16px] lg:text-[18px] leading-[1.5] text-black">
            {json.text_1}
          </p>
        </div>

        {/* Innovation Section */}
        <div className="flex flex-col items-center lg:items-start gap-2 w-full max-w-[606px]">
          <h3 className="font-inter font-semibold text-[20px] lg:text-[28px] leading-[1.2] text-black">
            {json.subtitle_2}
          </h3>
          <p className="font-inter font-medium text-[16px] lg:text-[18px] leading-[1.5] text-black">
            {json.text_2}
          </p>
        </div>
      </div>
    </section>
  );
}
