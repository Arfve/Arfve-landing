import Image from "next/image";

interface HeroSectionProps {
  json: {
    title: string;    // "Upgrade. Evolve. Never Replace."
    subtitle: string; // Description text
    image: string;    // Hero image
  };
}

export default function AboutHero1({ json }: HeroSectionProps) {
  if (!json) {
    return null;
  }

  return (
    <section className="relative w-full max-w-[1440px] min-h-[500px] md:h-[675px] bg-white mx-auto px-6 py-12">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full h-full px-6">
        
        {/* Left Content */}
        <div className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 px-6 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">
            {json.title}
          </h1>
          <p className="text-lg md:text-xl text-black mb-4">
            {json.subtitle}
          </p>
        </div>

        {/* Right Image */}
        {json.image && (
          <div className="relative w-full md:w-1/2 flex justify-center">
            <div className="w-[90%] max-w-[593px] h-[284px] md:h-[350px] bg-[#DEDEDE] rounded-[20px] overflow-hidden flex justify-center items-center">
              <Image
                src={json.image}
                alt="Hero"
                width={500}
                height={350}
                className="object-cover rounded-2xl shadow-lg"
                priority
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
} 