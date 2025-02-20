import Image from 'next/image'

interface FeatureCardProps {
  title: string
  description?: string
  imageUrl?: string
  className?: string
}

function FeatureCard({ title, description, imageUrl }: FeatureCardProps) {
  return (
    <div className="flex flex-col justify-center items-center p-5 gap-[10px] bg-white shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)] rounded-[20px]">
      <div className="flex justify-center items-center p-[10px] w-[255px] h-[202px] bg-[#DEDEDE] rounded-[20px]">
        {imageUrl && (
          <div className="relative w-[79px] h-[79px]">
            <Image src={imageUrl} alt={title} fill className="object-contain" />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[10px] w-[161px]">
        <h3 className="font-inter font-medium text-[18px] leading-[22px] text-black">{title}</h3>
        {description && <p className="font-inter font-normal text-[16px] leading-[19px] text-black">{description}</p>}
      </div>
    </div>
  )
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
}

export default function ProductShowcase({ features, title, subtitle, buttonText }: ProductShowcaseProps) {
  const defaultSizes = [
    "w-[295px] h-[322px]",
    "w-[295px] h-[268px]",
    "w-[295px] h-[268px]",
    "w-[336px] h-[261px]",
    "w-[336px] h-[268px]",
    "w-[336px] h-[331px]"
  ];

  const displayFeatures = features.map((f, i) => ({ ...f, className: defaultSizes[i % 6] }));
  const leftFeatures = displayFeatures.filter((_, i) => i % 2 === 0);
  const rightFeatures = displayFeatures.filter((_, i) => i % 2 === 1);

  return (
    <section className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-8 md:px-32">
        <div className="flex flex-col justify-center py-16">
          <div className="flex flex-col sm:flex-row gap-[10px] w-full max-w-[1192px]">
            {/* Features Container */}
            <div className="flex gap-[10px]">
              {/* Left Column */}
              <div className="flex flex-col gap-[10px] w-full sm:w-[295px] h-[400px] sm:h-[878px] overflow-y-auto scrollbar-thin">
                {leftFeatures.map((feature, index) => (
                  <FeatureCard key={index * 2} {...feature} />
                ))}
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-[10px] w-full sm:w-[336px] h-[400px] sm:h-[880px] overflow-y-auto scrollbar-thin">
                {rightFeatures.map((feature, index) => (
                  <FeatureCard key={index * 2 + 1} {...feature} />
                ))}
              </div>
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start p-0 gap-3 w-full sm:w-[607px] sm:h-[185px] sm:ml-auto sm:my-auto">
              <h2 className="w-full sm:w-[607px] font-inter font-bold text-[32px] sm:text-[40px] leading-[40px] sm:leading-[48px] text-black">{title}</h2>
              <p className="w-full sm:w-[607px] font-inter font-bold text-[16px] sm:text-[18px] leading-[20px] sm:leading-[22px] text-black">{subtitle}</p>
              <button className="flex justify-center items-center px-4 py-3 w-[156px] h-[43px] bg-[#1F1F1F] rounded-lg">
                <span className="font-inter font-normal text-[16px] leading-[19px] text-white">{buttonText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 