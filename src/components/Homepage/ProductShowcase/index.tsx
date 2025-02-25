"use client";
import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";

interface FeatureCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  reverseImage?: boolean;
}

function FeatureCard({
  title,
  description,
  imageUrl,
  reverseImage = false,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-[10px] bg-white shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)] rounded-[20px] my-3 w-full max-w-[336px]">
      {reverseImage ? (
        <>
          <div className="w-full aspect-[255/202] relative bg-[#DEDEDE] rounded-[20px] overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            )}
          </div>
          <div className="flex flex-col gap-[10px] w-full">
            <h3 className="font-inter font-medium text-[18px] leading-[22px] text-black">
              {title}
            </h3>
            {description && (
              <p className="font-inter font-normal text-[16px] leading-[19px] text-black">
                {description}
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-[10px] w-full">
            <h3 className="font-inter font-medium text-[18px] leading-[22px] text-black">
              {title}
            </h3>
            {description && (
              <p className="font-inter font-normal text-[16px] leading-[19px] text-black">
                {description}
              </p>
            )}
          </div>
          <div className="w-full aspect-[255/202] relative bg-[#DEDEDE] rounded-[20px] overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
              />
            )}
          </div>
        </>
      )}
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
  const displayFeatures = features.map((f, i) => ({
    ...f,
    reverseImage: i % 3 === 2, // Every third card has the image at the bottom
  }));
  const leftFeatures = displayFeatures.filter((_, i) => i % 2 === 0);
  const rightFeatures = displayFeatures.filter((_, i) => i % 2 === 1);

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
                  {leftFeatures.map((feature, index) => (
                    <FeatureCard
                      key={index * 2}
                      {...feature}
                      className="feature-card"
                    />
                  ))}
                  {leftFeatures.map((feature, index) => (
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
                  {rightFeatures.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                  {rightFeatures.map((feature, index) => (
                    <FeatureCard key={`dup-${index}`} {...feature} />
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
              <p className="font-inter font-bold text-base md:text-lg lg:text-[18px] leading-snug text-black">
                {subtitle}
              </p>
            </div>
            <button className="flex justify-center items-center px-4 py-3 w-[156px] h-[43px] bg-[#1F1F1F] rounded-lg hover:bg-black transition-colors">
              <Link href="/crowdfounding">
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
