import Image from 'next/image'

interface FeaturesProps {
  title: string;
  subtitle: string;
  featureList: Array<{
    title: string;
    description: string;
  }>;
  image?: string;
}

export default function Features({ title, subtitle, featureList, image }: FeaturesProps) {
  return (
    <section className="w-full h-[675px] bg-[#EAEAEA] relative">
      <div className="max-w-[1440px] h-full mx-auto relative">
        {/* Left Content */}
        <div className="absolute left-[140px] top-[142px] flex flex-col gap-6">
          <div className="flex flex-col gap-3 w-[509px]">
            <h2 className="font-inter font-bold text-[40px] leading-[48px] text-black">
              {title}
            </h2>
            <p className="font-inter font-bold text-[18px] leading-[22px] text-black">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Image on Right */}
        <div className="absolute w-[79px] h-[79px] left-[1026px] top-[250px]">
          <Image
            src={image || "/logo.svg"}
            alt="Features illustration"
            width={79}
            height={79}
            className="object-contain"
            priority
          />
        </div>

        {/* Feature List at Bottom */}
        <div className="absolute left-[140px] top-[512px] flex gap-[94px]">
          {featureList.map((feature, index) => (
            <div key={index} className="flex flex-col gap-[10px] w-[161px]">
              <h3 className="font-inter font-medium text-[18px] leading-[22px] text-black">
                {feature.title}
              </h3>
              <p className="font-inter font-normal text-[16px] leading-[19px] text-black">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 