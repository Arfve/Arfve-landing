import Image from 'next/image'

export default function Features() {
  const features = [
    {
      title: "Reduce your pollution",
      description: "for an exceptional sound",
    },
    {
      title: "Good autonomy",
      description: "for an exceptional sound",
    },
    {
      title: "Good audio",
      description: "for an exceptional sound",
    },
    {
      title: "11mm speakers",
      description: "for an exceptional sound",
    },
  ]

  return (
    <section className="w-full min-h-[500px] md:h-[675px] bg-[#EAEAEA] px-6 md:px-32 py-16 md:py-32">
      <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        <div className="flex flex-col gap-8 max-w-[509px]">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Your best audio companion. But for life
            </h2>
            <p className="text-base md:text-lg font-bold leading-[22px]">
              Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-[94px]">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-2.5 w-full md:w-[161px]">
                <h3 className="text-lg font-medium">{feature.title}</h3>
                <p className="text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center md:items-start">
          <Image
            src="/product-features.svg"
            alt="Product Features"
            width={79}
            height={79}
            className="w-[200px] md:w-[300px] h-auto"
          />
        </div>
      </div>
    </section>
  )
} 