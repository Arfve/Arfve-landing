import Image from 'next/image'

interface Feature {
  title: string;
  description: string;
}

interface AppSectionProps {
  title: string;
  features: Feature[];
  image: string;
}

export default function AppSection({ title, features, image }: AppSectionProps) {
  return (
    <section className="w-full min-h-[500px] md:h-[675px] bg-[#DEDEDE] relative px-6 py-12 md:p-0">
      <div className="max-w-[1440px] h-full mx-auto relative">
        {/* Main Content Container */}
        <div className="flex flex-col md:absolute md:left-[114px] md:top-[65px] gap-[42px] p-[32px_0px] md:p-[64px_0px] w-full md:w-[606px] md:h-[528px]">
          {/* Title */}
          <h2 className="font-inter font-bold text-[32px] md:text-[40px] leading-[40px] md:leading-[48px] text-black w-full md:w-[606px] md:h-[48px]">
            {title}
          </h2>

          {/* Features Container */}
          <div className="flex flex-col gap-[32px] md:gap-[42px] w-full md:w-[606px]">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-3 w-full md:w-[606px] md:h-[134px]">
                <h3 className="font-inter font-semibold text-[24px] md:text-[28px] leading-[30px] md:leading-[34px] text-black w-full md:w-[606px] md:h-[34px]">
                  {feature.title}
                </h3>
                <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[20px] md:leading-[22px] text-black w-full md:w-[606px] md:h-[88px]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:flex md:absolute md:right-[120px] md:top-[73.5px] md:w-[450px] md:h-[500px] items-center justify-center">
          {image && (
            <div className="relative w-full h-full">
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
  )
} 