"use client";
import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
}

function FeatureCard({
  title,
  description,
  imageUrl,
  className,
}: FeatureCardProps) {
  return (
    <div className={`flex flex-col justify-start items-center p-5 gap-[10px] bg-[#F3F3F3] rounded-[20px] my-3 w-full max-w-[336px] ${className || ""}`}>
      <div className="w-full aspect-[255/202] relative bg-[#DEDEDE] rounded-[20px] overflow-hidden">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover" 
            style={{ objectPosition: "center" }} 
          />
        )}
      </div>

      <div className="flex flex-col gap-[10px] w-full items-center">
        <h3 className="font-semibold text-[18px] leading-[28px] text-black mr-[80px]">
          {title}
        </h3>
        {description && (
          <p className="font-body font-normal leading-[28px] text-[#000000]">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

interface ProductShowcaseProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image: string;
  features: Array<{
    title: string;
    description?: string;
    imageUrl?: string;
  }>;
}

export default function ProductShowcase({
  features,
  title,
  subtitle,
  buttonText,
}: ProductShowcaseProps) {
  return (
    <section className="w-full bg-white flex justify-center overflow-hidden">
      <div className="max-w-[1440px] w-full flex flex-col items-center justify-center p-4 md:p-8 lg:p-16 relative">
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          {/* Features Container */}
          <div className="w-full lg:w-1/2 h-[878px] relative overflow-hidden">
            <div className="h-[20%] w-full z-[1] absolute top-0 bg-gradient-to-t from-transparent to-white"></div>

            <div className="flex gap-4 md:gap-10 h-full">
              {/* Left Column */}
              <div className="w-1/2 h-full overflow-hidden">
                <div className="w-full gap-[40px] animate-scrollDown">
                  {features
                    .filter((_, i) => i % 2 === 0)
                    .map((feature, index) => (
                      <FeatureCard
                        key={index * 2}
                        {...feature}
                        className="feature-card"
                      />
                    ))}
                  {features
                    .filter((_, i) => i % 2 === 0)
                    .map((feature, index) => (
                      <FeatureCard
                        key={`dup-${index * 2}`}
                        {...feature}
                        className="feature-card"
                      />
                    ))}
                </div>
              </div>

              {/* Right Column */}
              <div className="w-1/2 h-full overflow-hidden">
                <div className="w-full gap-[40px] animate-scrollUp">
                  {features
                    .filter((_, i) => i % 2 === 1)
                    .map((feature, index) => (
                      <FeatureCard key={index} {...feature} className="feature-card" />
                    ))}
                  {features
                    .filter((_, i) => i % 2 === 1)
                    .map((feature, index) => (
                      <FeatureCard key={`dup-${index}`} {...feature} className="feature-card" />
                    ))}
                </div>
              </div>
            </div>

            <div className="h-[20%] w-full z-1 absolute bg-gradient-to-b from-transparent to-white bottom-0"></div>
          </div>

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-6">
            <div className="space-y-4 text-center lg:text-left w-full">
              <h2 className="font-inter font-bold text-2xl md:text-3xl lg:text-[40px] leading-tight text-black">
                {title}
              </h2>
              <p className="font-body text-[18px] font-normal leading-[28px] text-[#000000]">
                {subtitle}
              </p>
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-3 w-[156px] h-[43px] bg-[#243555] rounded-[300px] hover:bg-black transition-colors">
              <Link
                href="/crowdfounding"
                className="flex items-center gap-2"
              >
                <Image
                  src="/Icon.png"
                  alt="Icon"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="font-inter font-normal text-[16px] leading-[19px] text-white">
                  {buttonText}
                </span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
