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

  // At the top of the component
  const isFirstImage = (idx: number) => idx === 0;

  // Then in the image components, replace priority={index === 0} with:
  const getImagePath = (imagePath: string) => {
    if (!imagePath || !imagePath.startsWith('/')) {
      console.warn('Missing or invalid image path:', imagePath);
      return null;  // Return null instead of a fallback
    }
    return imagePath;
  };

  return (
    <div className="flex flex-row items-center justify-center w-full max-w-screen-xl mx-auto py-16">
      {/* Left Section */}
      <div 
        className="flex flex-col items-start p-0"
        style={{ 
          width: "565px",
          height: "226px",
          position: "relative",
        }}>
        <div 
          className="flex flex-col items-start p-0 gap-[12px]"
          style={{
            position: "absolute",
            width: "437px",
            height: "192px",
            left: "0px",
            top: "0px",
          }}>
          <h1 
            className="font-inter font-bold text-[40px] leading-[48px] text-black"
            style={{
              width: "437px",
              height: "48px",
              alignSelf: "stretch",
            }}>
            {json.title}
          </h1>
          <p 
            className="font-inter font-medium text-[18px] leading-[22px] text-black"
            style={{
              width: "437px",
              height: "132px",
              alignSelf: "stretch",
            }}>
            {json.subtitle}
          </p>
        </div>
      </div>

      {/* Right Section - Cards Grid */}
      <div className="grid grid-cols-2 gap-6 w-1/2">
        {json.items.map((item, index) => {
          // Top left card - title on top, image below
          if (index === 0) {
            return (
              <div
                key={index}
                className="flex flex-col items-start p-5"
                style={{
                  width: "336px",
                  height: "261px",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  gap: "26px",
                }}>
                {/* Text first */}
                <div className="flex flex-col items-start p-0" style={{ width: "296px", height: "51px", gap: "10px" }}>
                  <h2 className="font-inter text-[18px] leading-[22px] font-medium text-black w-[296px] h-[22px]">{item.title}</h2>
                  <p className="font-inter text-[16px] leading-[19px] font-normal text-black w-[296px] h-[19px]">{item.subtitle}</p>
                </div>
                {/* Image below */}
                <div className="flex justify-center items-center rounded-[20px] overflow-hidden" style={{ width: "296px", height: "144px", background: "#DEDEDE" }}>
                  <div className="relative w-full h-full">
                    {getImagePath(item.image) ? (
                      <Image
                        src={getImagePath(item.image)!}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={isFirstImage(index)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }
          
          // Top right card
          if (index === 1) {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-5"
                style={{
                  width: "295px",
                  height: "322px",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  gap: "10px",
                }}>
                {/* Image Container */}
                <div 
                  className="flex justify-center items-center rounded-[20px] overflow-hidden"
                  style={{
                    width: "255px",
                    height: "202px",
                    background: "#DEDEDE",
                  }}>
                  <div className="relative w-full h-full">
                    {getImagePath(item.image) ? (
                      <Image
                        src={getImagePath(item.image)!}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={isFirstImage(index)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Text Content */}
                <div 
                  className="flex flex-col items-start p-0"
                  style={{
                    width: "161px",
                    height: "70px",
                    gap: "10px",
                  }}>
                  <h2 
                    className="font-inter font-medium text-[18px] leading-[22px] text-black"
                    style={{
                      width: "161px",
                      height: "22px",
                      alignSelf: "stretch",
                    }}>
                    {item.title}
                  </h2>
                  <p 
                    className="font-inter font-normal text-[16px] leading-[19px] text-black"
                    style={{
                      width: "161px",
                      height: "38px",
                      alignSelf: "stretch",
                    }}>
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          }

          // Bottom left card - image on top, title below
          if (index === 2) {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-5"
                style={{
                  width: "336px",
                  height: "268px",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  gap: "10px",
                }}>
                {/* Image first */}
                <div className="flex justify-center items-center rounded-[20px] overflow-hidden" style={{ width: "296px", height: "148px", background: "#DEDEDE" }}>
                  <div className="relative w-full h-full">
                    {getImagePath(item.image) ? (
                      <Image
                        src={getImagePath(item.image)!}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={isFirstImage(index)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Text below */}
                <div className="flex flex-col items-start p-0 gap-[10px]" style={{ width: "161px", height: "70px" }}>
                  <h2 className="font-inter text-[18px] leading-[22px] font-medium text-black w-[161px] h-[22px]">{item.title}</h2>
                  <p className="font-inter text-[16px] leading-[19px] font-normal text-black w-[161px] h-[38px]">{item.subtitle}</p>
                </div>
              </div>
            );
          }

          // Bottom right card
          if (index === 3) {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center p-5"
                style={{
                  width: "295px",
                  height: "268px",
                  background: "#FFFFFF",
                  boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "20px",
                  gap: "10px",
                }}>
                {/* Text Content */}
                <div 
                  className="flex flex-col items-start p-0"
                  style={{
                    width: "255px",
                    height: "44px",
                    gap: "10px",
                    alignSelf: "stretch",
                  }}>
                  <h2 
                    className="font-inter font-medium text-[18px] leading-[22px] text-black"
                    style={{
                      width: "255px",
                      height: "44px",
                      alignSelf: "stretch",
                    }}>
                    {item.title}
                  </h2>
                </div>

                {/* Image Container */}
                <div 
                  className="flex justify-center items-center rounded-[20px] overflow-hidden"
                  style={{
                    width: "255px",
                    height: "174px",
                    background: "#DEDEDE",
                  }}>
                  <div className="relative w-full h-full">
                    {getImagePath(item.image) ? (
                      <Image
                        src={getImagePath(item.image)!}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                        priority={isFirstImage(index)}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          // Default card style for other positions
          return (
            <div
              key={index}
              className="flex flex-col justify-center items-center p-5"
              style={{
                width: "336px",
                height: "268px",
                background: "#FFFFFF",
                boxShadow: "0px 0px 16.6px rgba(0, 0, 0, 0.1)",
                borderRadius: "20px",
                gap: "10px",
              }}>
              {/* Default layout */}
              <div className="flex justify-center items-center rounded-[20px] overflow-hidden" style={{ width: "296px", height: "148px", background: "#DEDEDE" }}>
                <div className="relative w-full h-full">
                  {getImagePath(item.image) ? (
                    <Image
                      src={getImagePath(item.image)!}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                      priority={isFirstImage(index)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-start p-0 gap-[10px]" style={{ width: "161px", height: "70px" }}>
                <h2 className="font-inter text-[18px] leading-[22px] font-medium text-black">{item.title}</h2>
                <p className="font-inter text-[16px] leading-[19px] font-normal text-black">{item.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
