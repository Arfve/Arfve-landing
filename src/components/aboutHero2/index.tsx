interface VisionHeroProps {
  json: {
    title: string;      // "Be more human"
    image: string;      // Left side image
    subtitle_1: string; // "A Bold vision for the future"
    text_1: string;     // First paragraph text
    subtitle_2: string; // "Arfve innovation"
    text_2: string;     // Second paragraph text
  };
}

export default function AboutHero2({ json }: VisionHeroProps) {
  if (!json) return null;

  return (
    <div className="relative w-[1440px] h-[593px] bg-[#F7F7F7]">
      {/* Left Image */}
      <div className="absolute w-[79px] h-[79px] left-[314px] top-[251px]">
        {json.image && (
          <img
            src={json.image}
            alt="Vision"
            className="absolute left-[6.25%] right-[6.25%] top-[12.5%] bottom-[12.5%] bg-[#7D7D7D]"
          />
        )}
      </div>

      {/* Right Content */}
      <div className="absolute flex flex-col items-start p-16 gap-[42px] w-[606px] h-[528px] left-[720px] top-[33px]">
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
  );
} 