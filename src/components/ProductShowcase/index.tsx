import Image from 'next/image'

interface FeatureCardProps {
  title: string
  description?: string
  imageUrl?: string
  className?: string
}

function FeatureCard({ title, description, imageUrl, className = "" }: FeatureCardProps) {
  return (
    <div className={`bg-white rounded-[20px] shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)] p-5 ${className}`}>
      <div className="flex justify-center items-center bg-[#DEDEDE] rounded-[20px] p-2.5 mb-2.5">
        {imageUrl && (
          <div className="relative w-[79px] h-[79px]">
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-base">{description}</p>}
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
  features?: Feature[];
  title?: string;
  subtitle?: string;
  buttonText?: string;
}

export default function ProductShowcase({ features = [], title, subtitle, buttonText }: ProductShowcaseProps) {
  const defaultFeatures: Feature[] = [
    {
      title: "11mm speakers",
      description: "for an exceptional sound",
      className: "w-[295px] h-[322px]"
    },
    {
      title: "Up to 34 hours of autonomy",
      description: "Long-lasting battery life",
      className: "w-[295px] h-[268px]"
    },
    {
      title: "AI driven",
      description: "Access in one click to your favorite LLM",
      className: "w-[295px] h-[268px]"
    },
    {
      title: "The best industry ANC",
      description: "listen your music like at home",
      className: "w-[336px] h-[261px]"
    },
    {
      title: "AI driven",
      description: "Access in one click to your favorite LLM",
      className: "w-[336px] h-[268px]"
    },
    {
      title: "AI driven",
      description: "Access in one click to your favorite LLM",
      className: "w-[336px] h-[331px]"
    }
  ]

  const displayFeatures = features.length > 0 
    ? features.map((f, i) => ({ ...f, className: defaultFeatures[i]?.className }))
    : defaultFeatures

  return (
    <section className="flex justify-center items-center p-16 gap-2.5 bg-white">
      <div className="flex gap-16 max-w-[1312px]">
        <div className="flex gap-2.5">
          <div className="flex flex-col gap-2.5">
            {displayFeatures.slice(0, 3).map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.image}
                className={feature.className}
              />
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            {displayFeatures.slice(3, 6).map((feature, index) => (
              <FeatureCard
                key={index + 3}
                title={feature.title}
                description={feature.description}
                imageUrl={feature.image}
                className={feature.className}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-[607px] mt-auto">
          <h2 className="text-4xl font-bold leading-[48px]">
            {title || "Go to the crowdfunding platform"}
          </h2>
          <p className="text-lg font-bold leading-[22px]">
            {subtitle || "Be one of the first backers and support the new AI revolution."}
          </p>
          <button className="w-[156px] h-[43px] bg-[#1F1F1F] text-white rounded-lg">
            {buttonText || "Support now"}
          </button>
        </div>
      </div>
    </section>
  )
} 