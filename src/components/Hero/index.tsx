import Image from 'next/image'

interface HeroProps {
  title: string;
  subtitle: string;
  buttonText: string;
  image?: string;
}

export default function Hero({ title, subtitle, buttonText, image }: HeroProps) {
  return (
    <section className="relative min-h-[500px] md:h-[675px] bg-section-light px-6 py-12 md:p-0">
      <div className="md:absolute md:right-[140px] md:top-[205px] flex flex-col gap-8 max-w-[509px] text-center md:text-left">
        <h1 className="text-4xl md:text-[64px] font-bold leading-tight md:leading-[77px]">
          {title}
        </h1>
        <p className="text-base md:text-lg font-medium">
          {subtitle}
        </p>
        <button className="w-[130px] h-[43px] bg-button-primary text-white rounded-lg mx-auto md:mx-0">
          {buttonText}
        </button>
      </div>
      <div className="mt-12 md:mt-0 md:absolute md:left-[383px] md:top-[296px] flex justify-center">
        {image && (
          <div className="relative w-[120px] md:w-[79px] h-[79px]">
            <Image
              src={image}
              alt={title}
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
        )}
      </div>
    </section>
  )
} 