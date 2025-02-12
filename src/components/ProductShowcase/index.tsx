import Image from 'next/image'

type FeatureCardProps = {
  title: string
  description?: string
  imageUrl: string
  className?: string
}

function FeatureCard({ title, description, imageUrl, className = "" }: FeatureCardProps) {
  return (
    <div className={`bg-white rounded-[20px] shadow-[0px_0px_16.6px_rgba(0,0,0,0.1)] p-5 ${className}`}>
      <div className="flex justify-center items-center bg-[#DEDEDE] rounded-[20px] p-2.5 mb-2.5">
        <Image
          src={imageUrl}
          alt={title}
          width={79}
          height={79}
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <h3 className="text-lg font-medium">{title}</h3>
        {description && <p className="text-base">{description}</p>}
      </div>
    </div>
  )
}

export default function ProductShowcase() {
  return (
    <section className="flex justify-center items-center p-16 gap-2.5 bg-white">
      <div className="flex gap-16 max-w-[1312px]">
        <div className="flex gap-2.5">
          <div className="flex flex-col gap-2.5">
            <FeatureCard
              title="11mm speakers"
              description="for an exceptional sound"
              imageUrl="/feature-speakers.svg"
              className="w-[295px] h-[322px]"
            />
            <FeatureCard
              title="Up to 34 hours of autonomy"
              imageUrl="/feature-battery.svg"
              className="w-[295px] h-[268px]"
            />
            <FeatureCard
              title="AI driven"
              description="Access in one click to your favorite LLM"
              imageUrl="/feature-ai.svg"
              className="w-[295px] h-[268px]"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            <FeatureCard
              title="The best industry ANC"
              description="listen your music like at home"
              imageUrl="/feature-anc.svg"
              className="w-[336px] h-[261px]"
            />
            <FeatureCard
              title="AI driven"
              description="Access in one click to your favorite LLM"
              imageUrl="/feature-ai-2.svg"
              className="w-[336px] h-[268px]"
            />
            <FeatureCard
              title="AI driven"
              description="Access in one click to your favorite LLM"
              imageUrl="/feature-ai-3.svg"
              className="w-[336px] h-[331px]"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 max-w-[607px] mt-auto">
          <h2 className="text-4xl font-bold leading-[48px]">
            Go to the crownfunding platform
          </h2>
          <p className="text-lg font-bold leading-[22px]">
            Be one of the first backers and support the new AI revolution.
          </p>
          <button className="w-[156px] h-[43px] bg-[#1F1F1F] text-white rounded-lg">
            Support now
          </button>
        </div>
      </div>
    </section>
  )
} 