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
<section className="w-full bg-[#DEDEDE] py-12 md:py-16 lg:py-24 flex justify-center overflow-hidden">      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Main Content */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 max-w-xl flex flex-col items-center lg:items-start">
            <div className="space-y-8 text-center lg:text-left w-full">
              <h2 className="font-inter font-bold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-black">
                {title}
              </h2>

              {/* Features Container */}
              <div className="flex flex-col gap-[32px] md:gap-[42px]">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col gap-3">
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
          </div>

          {/* Right Content - Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center">
            {image && (
              <div className="relative w-full max-w-[450px] aspect-[9/10]">
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
        </div>
      </div>
    </section>
  );
}
