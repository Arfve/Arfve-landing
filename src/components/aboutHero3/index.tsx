"use client"

interface AboutHero3Props {
  json: {
    title: string;
    subtitle: string;
    items: {
      title: string;
      subtitle: string;
      image: string;
    }[];
  };
}

export default function AboutHero3({ json }: AboutHero3Props) {
  if (!json) {
    return null;
  }

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

      {/* Right Section - Cards */}
      <div className="grid grid-cols-2 gap-6 w-1/2">
        {/* First part of items */}
        <div
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            width: "336px",
            height: "268px",
          }}>
          <h2 className="text-xl font-semibold mt-4">
            {json.items[0].title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {json.items[0].subtitle}
          </p>
          <div className="w-full h-24 bg-gray-300 rounded-lg flex items-center justify-center mt-4">
            {json.items[0].image ? (
              <img
                src={json.items[0].image}
                alt={json.items[0].title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Image</span>
            )}
          </div>
        </div>

        <div
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center mt-4"
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            width: "336px",
            height: "268px",
          }}>
          <div className="w-full h-24 bg-gray-300 rounded-lg flex items-center justify-center">
            {json.items[1].image ? (
              <img
                src={json.items[1].image}
                alt={json.items[1].title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Image</span>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {json.items[1].title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {json.items[1].subtitle}
          </p>
        </div>

        {/* Second part of items */}
        <div
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center"
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            width: "336px",
            height: "268px",
          }}>
          <div className="w-full h-24 bg-gray-300 rounded-lg flex items-center justify-center">
            {json.items[2].image ? (
              <img
                src={json.items[2].image}
                alt={json.items[2].title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Image</span>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {json.items[2].title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {json.items[2].subtitle}
          </p>
        </div>

        <div
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center text-center mt-4"
          style={{
            background: "#FFFFFF",
            boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
            borderRadius: "20px",
            width: "336px",
            height: "268px",
          }}>
          <div className="w-full h-24 bg-gray-300 rounded-lg flex items-center justify-center">
            {json.items[3].image ? (
              <img
                src={json.items[3].image}
                alt={json.items[3].title}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <span className="text-gray-500">Image</span>
            )}
          </div>
          <h2 className="text-xl font-semibold mt-4">
            {json.items[3].title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {json.items[3].subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
