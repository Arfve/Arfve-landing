"use client"
import Image from "next/image";

interface Item {
  title: string;
  subtitle: string;
  image: string;
}

interface AboutHero3Props {
  json: {
    title: string;
    subtitle: string;
    items: Item[];
  };
}

export default function AboutHero3({ json }: AboutHero3Props) {
  if (!json) {
    return null;
  }

  // Helper function to check if it's the first image
  const isFirstImage = (idx: number) => idx === 0;

  // Helper function to validate image paths
  const getImagePath = (imagePath: string) => {
    if (!imagePath || !imagePath.startsWith('/')) {
      console.warn('Missing or invalid image path:', imagePath);
      return null;  // Return null instead of a fallback
    }
    return imagePath;
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-xl mx-auto py-24">
      {/* Left Section - Text */}
      <div className="flex flex-col items-start lg:w-1/2 w-full px-6 lg:px-0">
        <h1 className="font-inter font-bold text-[40px] leading-[48px] text-black mb-6">
          {json.title}
        </h1>
        <p className="font-inter font-medium text-[18px] leading-[22px] text-black">
          {json.subtitle}
        </p>
      </div>

      {/* Right Section - Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full px-6 lg:px-0 mt-12 lg:mt-0">
        {json.items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col justify-between items-center p-6 bg-white shadow-lg rounded-2xl"
            style={{ height: "auto", width: "100%" }}
          >
            {/* Image */}
            <div className="w-full h-32 mb-6 bg-gray-200 rounded-2xl overflow-hidden flex justify-center items-center">
              {getImagePath(item.image) ? (
                <Image
                  src={getImagePath(item.image)!}
                  alt={item.title}
                  width={100} // Reduced size for image width
                  height={75} // Reduced size for image height
                  className="object-cover"
                  priority={isFirstImage(index)}
                />
              ) : (
                <div className="w-full h-full bg-gray-300 flex justify-center items-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            {/* Text Content */}
            <div className="flex flex-col items-start w-full">
              <h2 className="font-inter text-[18px] leading-[22px] font-medium text-black mb-4">
                {item.title}
              </h2>
              <p className="font-inter text-[16px] leading-[19px] font-normal text-black">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
