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
    <section className="w-full bg-[#F2F4F3] py-12">
      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row justify-between items-center h-full min-h-[400px] px-6 lg:px-12">
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start lg:w-1/2 mb-4 lg:mb-0 w-full px-4">
          <h2 className="font-inter font-bold text-[24px] lg:text-[40px] leading-[32px] lg:leading-[48px] text-black mb-2">
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
        <div className="flex justify-center lg:w-1/2 w-full px-4">
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
      <div className="mt-12 flex flex-col lg:flex-row justify-around items-center w-[90%] mx-auto">
        {featureList.map((feature, index) => (
          <div key={index} className="flex flex-col mx-4 text-center w-full lg:w-[20%] mb-6 lg:mb-0 gap-2">
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
