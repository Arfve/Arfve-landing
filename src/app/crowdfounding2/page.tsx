import Image from "next/image";

export default function page() {
  const data = {
    page: {
      image: "/file.svg",
      title: "Reserve Your Legacy 1",
      subtitle: "Earbuds for Just $1-Get 45% Off at Launch!",
      description:
        "By pledging just $1, you secure an exclusive 45% discount on the Legacy 1 Earbuds—exceptional sound, perfect fit, next-level ANC—and a front-row seat to a tech revolution.",
      button_text: "Reserve Legacy 1 Now",
      gradients: [
        {
          image: "/file.svg",
          title: "100% Refund Guarantee",
          subtitle:
            "If you cancel your reservation, we guarantee you a full refund at any time before the project moves into production.",
        },
        {
          image: "/file.svg",
          title: "Transparency Guarantee",
          subtitle:
            "We will be transparent about the progress of our project throughout the entire campaign.",
        },
        {
          image: "/file.svg",
          title: "Secure Payment",
          subtitle:
            "All orders are processed through our secure network. Your credit card information is never stored in any way. We respect your privacy.",
        },
      ],
    },
  };

  const { image, title, subtitle, description, button_text, gradients } =
    data.page;

  return (
    <div className="flex justify-center ">
      <div className="relative w-[95%]  shadow-2xl ">
        <div className="flex mx-auto p-8  flex-col gap-14 justify-center w-[70%]">
          <div className="flex  md:flex-row  justify-between gap-x-20  w-[90%]">
            <div className="  text-center md:text-right relative overflow-hidden ">
              <Image
                src={image || "/file.svg" }
                alt={title}
                width={500}
                height={500}
                className="max-w-md mx-auto bg-slate-500 "
              />
            </div>

            <div className="w-[560px] md:text-left text-center ">
              <h1 className="text-4xl font-bold mb-4">{title}</h1>
              <h2 className="text-2xl font-bold mb-4">{subtitle}</h2>
              <p className="text-lg mb-6">{description}</p>
              <button className="bg-[rgb(37,211,156)] py-3 px-6 rounded-lg font-bold text-white  w-full">
                {button_text}
              </button>
            </div>
          </div>

          <div className=" flex gap-5 justify-evenly ">
            {gradients.map((gradient, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg text-left p-7 h-[225px] w-[60%] flex gap-5 select-none">
                <div className="w-[150px] h-[50px]">
                  <Image
                    src={gradient.image}
                    alt={gradient.title}
                    width={75}
                    height={500}
                    className=""
                  />
                </div>

                <div>
                  <h5 className="text-2xl font-bold mb-1">{gradient.title}</h5>
                  <p className="text-gray-600">{gradient.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
