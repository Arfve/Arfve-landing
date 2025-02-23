import Image from "next/image";

interface Feature {
  title: string;
  description: string;
}

interface AppSectionProps {
  title: string;
  features: Feature[];
  image: string;
}

export default function AppSection({
  title,
  features,
  image,
}: AppSectionProps) {
  return (
    <section className="w-full min-h-[500px] md:h-[675px] bg-[#DEDEDE] px-6 py-12 md:p-0">
<div className="w-full h-full flex flex-col md:flex-row justify-center items-center md:ml-24">
        {/* Main Content Container */}
        <div className="w-[606px] h-[528px] p-[32px_0px] md:p-[64px_0px]"> {/* Removed flex and alignment classes */}
          {/* Title */}
          <h2 className="font-inter font-bold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-black">
            {title}
          </h2>

          {/* Features Container */}
          <div className="flex flex-col gap-[32px] md:gap-[42px]">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-3">
                <h3 className="font-inter font-semibold text-[24px] md:text-[28px] leading-[30px] md:leading-[34px] text-black">
                  {feature.title}
                </h3>
                <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[20px] md:leading-[22px] text-black">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="w-full md:w-[55%] flex justify-end items-center md:mr-24">
          {image && (
            <div className="relative w-[80%] h-[400px]">
              <Image
                src={image}
                alt="App Preview"
                fill
                sizes="(max-width: 768px) 100vw, 450px"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>

        {/* Mobile Image */}
        <div className="flex md:hidden w-full h-[300px] mt-8 items-center justify-center">
          {image && (
            <div className="relative w-[300px] h-[300px]">
              <Image
                src={image}
                alt="App Preview"
                fill
                sizes="300px"
                className="object-contain"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
