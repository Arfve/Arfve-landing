import { GetReservationPage } from "@/lib/getReservationData ";
import Image from "next/image";

export default async function page() {

  //väldig onödig kod fixa det vid kod minsking!
  const { data} = await GetReservationPage();
const  { buttonText , guarantees:guarantees, image, subtitle, title } = data
  return (
    <div>
      <div>
        <div className="flex mx-auto p-8 flex-col gap-14 justify-center w-[70%]">
          <div className="flex md:flex-row justify-between gap-x-20 w-[90%]">
            <div className="text-center md:text-right relative overflow-hidden ">
              <Image
                src={image || "/globe.svg"}
                alt={title || "default alt text"}
                width={500}
                height={500}
                className="max-w-md mx-auto bg-slate-500 "
              />
            </div>

            <div className="w-[560px] md:text-left text-center ">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <h2 className="text-2xl font-bold mb-4">{subtitle}</h2>
              <button className="bg-[rgb(37,211,156)] py-3 px-6 rounded-lg font-bold text-white w-full">
                {buttonText}
              </button>
            </div>
          </div>

          {/* Kontrollera att guarantees är en array och rendera den */}
          {guarantees && guarantees.length > 0 && (
            <div className="flex gap-5 justify-evenly ">
              {guarantees.map((guarantee, index) => {
                console.log(guarantee);
                
                return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg text-left p-7 h-[225px] w-[60%] flex gap-5 select-none">
                  <div className="w-[150px] h-[50px]">
                    <Image
                      src={guarantee.image || "/globe.svg"}
                      alt={"the image"}
                      width={75}
                      height={500}
                      className=""
                    />
                  </div>

                  <div>
                    <h5 className="text-2xl font-bold mb-1">
                      {guarantee?.title}
                    </h5>
                    <p className="text-gray-600">{guarantee.subtitle}</p>
                  </div>
                </div>)
              
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
