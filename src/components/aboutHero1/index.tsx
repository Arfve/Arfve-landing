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
    <div className="flex flex-row items-center justify-between w-full max-w-screen-xl mx-auto py-16">
      {/* Left Content */}
      <div className="w-1/2 pr-12">
        <h1 className="text-4xl font-bold mb-4">
          {json.title}
        </h1>
        <p className="text-lg">
          {json.subtitle}
        </p>
      </div>

      {/* Right Image */}
      <div className="w-1/2">
        {json.image && (
          <img
            src={json.image}
            alt="Hero"
            className="w-full h-auto rounded-lg"
          />
        )}
      </div>
    </div>
  );
} 