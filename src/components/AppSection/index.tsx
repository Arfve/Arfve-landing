import Image from 'next/image'

export default function AppSection() {
  const features = [
    {
      title: "Customize everthing",
      description: "Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade."
    },
    {
      title: "A shortcut to your best AI assistant",
      description: "Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar. Dor tira att spediskap depude. Os od tidaning plus petening och dasade."
    }
  ]

  return (
    <section className="w-full h-[675px] bg-section-light relative">
      <div className="absolute left-[114px] top-[65px] flex flex-col gap-[42px] max-w-[606px] py-16">
        <h2 className="text-4xl font-bold">Arfve app</h2>

        {features.map((feature, index) => (
          <div key={index} className="flex flex-col gap-3">
            <h3 className="text-[28px] font-semibold leading-[34px]">
              {feature.title}
            </h3>
            <p className="text-lg font-medium leading-[22px]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      <div className="absolute right-[140px] top-[309px]">
        <Image
          src="/app-preview.svg"
          alt="Arfve App Preview"
          width={79}
          height={79}
        />
      </div>
    </section>
  )
} 