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

  // Function to get local image or fallback
  const getImagePath = (imagePath: string) => {
    // If it's already a local path, use it
    if (imagePath.startsWith('/')) {
      return imagePath;
    }
    // Otherwise use a default image from public folder
    return '/window.svg'; // or any other default image you have
  };

  return (
    <div className="flex flex-row items-center justify-center w-full max-w-screen-xl mx-auto py-16">
      {/* Left Section */}
      <div
        className="w-1/2 pr-12"
        style={{ width: "437px", height: "170px", left: "0px", top: "28px" }}>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: "700",
            fontSize: "40px",
            lineHeight: "48px",
            color: "#000000",
          }}>
          <h1>{json.title}</h1>
        </div>
        <div
          style={{
            fontFamily: "Inter",
            fontWeight: "500",
            fontSize: "18px",
            lineHeight: "22px",
            color: "#000000",
          }}>
          <p>{json.subtitle}</p>
        </div>
      </div>

      {/* Right Section - Cards Grid */}
      <div className="grid grid-cols-2 gap-6 w-1/2">
        {json.items.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
            style={{
              background: "#FFFFFF",
              boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
              borderRadius: "20px",
              width: "336px",
              height: "268px",
            }}>
            <div className="w-full h-24 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Image
                src={getImagePath(item.image)}
                alt={item.title}
                width={100}
                height={100}
                className="object-contain"
                priority
              />
            </div>
            <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
            <p className="text-sm text-gray-600 mt-2">{item.subtitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
