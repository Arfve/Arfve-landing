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
    <section className="w-full min-h-[675px] bg-[#DEDEDE] flex flex-col justify-center items-center px-6 py-12 md:py-16">
      <div className="w-full max-w-[1440px] flex flex-col md:flex-row justify-between items-center relative">
        
        {/* Left Content */}
        <div className="flex flex-col gap-8 max-w-full md:max-w-[600px] text-center md:text-left">
          <h2 className="font-inter font-bold text-[28px] md:text-[40px] leading-[1.2] text-black">
            {title}
          </h2>

          {/* Features */}
          <div className="flex flex-col gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-inter font-semibold text-[20px] md:text-[28px] leading-[1.2] text-black">
                  {feature.title}
                </h3>
                <p className="font-inter font-medium text-[16px] md:text-[18px] leading-[1.5] text-black">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Image on Right (Desktop) */}
        <div className="hidden md:flex w-[350px] lg:w-[450px] h-[400px] lg:h-[500px] justify-center items-center">
          {image && (
            <Image
              src={image}
              alt="App Preview"
              width={450}
              height={500}
              className="object-contain"
              priority
            />
          )}
        </div>

        {/* Image on Bottom (Mobile) */}
        <div className="flex md:hidden w-full h-[300px] mt-8 justify-center">
          {image && (
            <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
              <Image
                src={image}
                alt="App Preview"
                fill
                sizes="(max-width: 768px) 300px"
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
