import Image from 'next/image'

interface FeaturesProps {
  title: string;
  subtitle: string;
  featureList: Array<{
    title: string;
    description: string;
    image?: string;
  }>;
  image?: string;
}

export default function Features({ title, subtitle, featureList, image }: FeaturesProps) {
  return (
    <section className="w-full min-h-[500px] md:h-[675px] bg-[#EAEAEA] px-6 md:px-32 py-16 md:py-32">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        <div className="flex flex-col gap-8 max-w-[509px]">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
            <p className="text-base md:text-lg font-bold leading-[22px]">{subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-[94px]">
            {featureList.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2.5 w-full md:w-[161px]">
                {feature.image && (
                  <div className="relative w-[40px] h-[40px]">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center md:items-start">
          {image && (
            <div className="relative w-[200px] md:w-[300px] h-[300px]">
              <Image
                src={image}
                alt="Product Features"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
} 