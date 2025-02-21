import Image from 'next/image'

interface FeaturesProps {
  title: string;
  subtitle: string;
  description: string;
  featureList: Array<{
    title: string;
    description: string;
  }>;
  image?: string;
}

export default function Features({ title, subtitle, description, featureList, image }: FeaturesProps) {
  return (
    <section className="w-full max-w-[1440px] min-h-[675px] bg-[#EAEAEA] flex flex-col justify-center items-center mx-auto px-4 lg:px-12 py-8">
      <div className="w-full flex flex-col lg:flex-row justify-between items-center h-full">
        
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start lg:w-1/2 w-full mb-6 lg:mb-0 text-center lg:text-left">
        <h2 className="font-inter font-bold text-[24px] lg:text-[40px] leading-[1.2] text-black mb-2 break-words">
  {title}
</h2>

          <p className="font-inter font-normal text-[16px] lg:text-[18px] leading-[20px] lg:leading-[22px] text-black mb-4">
            {subtitle}
          </p>
          <p className="font-inter font-normal text-[14px] lg:text-[16px] leading-[18px] lg:leading-[20px] text-black">
            {description}
          </p>
        </div>

        {/* Image on Right */}
        <div className="flex justify-center lg:w-1/2 w-full">
          {image ? (
            <Image
              src={image}
              alt="Features illustration"
              width={300}
              height={300}
              className="object-contain rounded-2xl"
              priority
            />
          ) : (
            <div className="w-[100px] h-[100px] bg-gray-300 rounded-2xl flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.158 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.9-2.9m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l-2.9-2.9M3.75 17.25h16.5m-16.5 3.75h16.5" />
                </svg>
            </div>
          )}
        </div>
      </div>

      {/* Feature List at Bottom */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[90%] mx-auto">
        {featureList.map((feature, index) => (
          <div key={index} className="text-center">
            <h3 className="font-inter font-medium text-[16px] leading-[20px] text-black">
              {feature.title}
            </h3>
            <p className="font-inter font-normal text-[14px] leading-[18px] text-black lg:w-[200px] mx-auto">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
