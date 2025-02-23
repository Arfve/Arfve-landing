"use client";
import "@/styles/globals.css";
import Image from "next/image";
import Link from "next/link";
interface FeatureCardProps {
  title: string;
  description?: string;
  imageUrl?: string;
  className?: string;
  reverseImage?: boolean; // New prop to reverse the image
}

function FeatureCard({
  title,
  description,
  imageUrl,
  reverseImage = false,
}: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-[10px] bg-white shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)] rounded-[20px] my-3">
      {/* Image Position */}
      {reverseImage ? (
        <>
          <div className="flex justify-center items-center w-[255px] h-[202px] bg-[#DEDEDE] rounded-[20px] overflow-hidden">
            {imageUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-[10px] w-[161px]">
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
          <div className="flex flex-col gap-[10px] w-[161px]">
            <h3 className="font-inter font-medium text-[18px] leading-[22px] text-black">
              {title}
            </h3>
            {description && (
              <p className="font-inter font-normal text-[16px] leading-[19px] text-black">
                {description}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center w-[255px] h-[202px] bg-[#DEDEDE] rounded-[20px] overflow-hidden">
            {imageUrl && (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

interface Feature {
  title: string;
  description?: string;
  image?: string;
  className?: string;
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
  const defaultSizes = [
    "w-[295px] h-[322px]",
    "w-[295px] h-[268px]",
    "w-[295px] h-[268px]",
    "w-[336px] h-[261px]",
    "w-[336px] h-[268px]",
    "w-[336px] h-[331px]",
  ];

  const displayFeatures = features.map((f, i) => ({
    ...f,
    className: defaultSizes[i % 6],
    reverseImage: i % 3 === 2, // Every third card has the image at the bottom
  }));
  const leftFeatures = displayFeatures.filter((_, i) => i % 2 === 0);
  const rightFeatures = displayFeatures.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] px-8 md:px-32">
        <div className="flex flex-col justify-center py-16 ">
          <div className="flex flex-col sm:flex-row gap-[80px] w-full max-w-[1192px] ">
            {/* Features Container */}
            <div className="flex gap-10 w-full sm:w-[631px] h-[400px] sm:h-[878px] relative">
              <div className="h-[20%] w-full z-[1] absolute top-0 bg-gradient-to-t from-transparent to-white"></div>

              {/* Left Column */}
              <div className="flex flex-col w-full sm:w-[295px] h-[400px] sm:h-[58px] infinite-scroll-wrapper">
                <div className="w-[fit-content] reverse gap-[40px] animate-scrollDown">
                  {leftFeatures.map((feature, index) => (
                    <FeatureCard
                      key={index * 2}
                      {...feature}
                      className="feature-card"
                    />
                  ))}
                  {/* Duplicate the content for a seamless loop */}
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
              <div className="flex flex-col w-full sm:w-[336px] h-[400px] sm:h-[880px] infinite-scroll-wrapper ">
                <div className="w-[fit-content]  gap-[40px] animate-scrollUp">
                  {rightFeatures.map((feature, index) => (
                    <FeatureCard key={index} {...feature} />
                  ))}
                  {/* Duplicate the content */}
                  {rightFeatures.map((feature, index) => (
                    <FeatureCard key={`dup-${index}`} {...feature} />
                  ))}
                </div>
              </div>

              <div className="h-[20%] w-full z-1 absolute bg-gradient-to-b from-[rgba(255,255,255,0)] to-white bottom-0"></div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start p-0 gap-3 w-full sm:w-[607px] sm:h-[185px] sm:ml-auto sm:my-auto">
              <h2 className="w-full sm:w-[607px] font-inter font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] text-black">
                {title}
              </h2>
              <p className="w-full sm:w-[607px] font-inter font-bold text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] text-black">
                {subtitle}
              </p>
              <button className="flex justify-center items-center px-4 py-3 w-[156px] h-[43px] bg-[#1F1F1F] rounded-lg">
                <span className="font-inter font-normal text-[16px] leading-[19px] text-white">
                  <Link href="/crowdfounding">
                    {buttonText}
                  </Link>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
