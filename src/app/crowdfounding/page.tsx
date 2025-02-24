import Image from "next/image";
import Quotes from "@/components/crowdfounding1";
import { getCrowdfoundingPage } from "@/lib/getCrowdfoundingData";
export default async function page() {
  const { brandStory, industryEndorsements, signUpSection } =
    await getCrowdfoundingPage();

    console.log(industryEndorsements);

    function renderIndustryQuotes(){

      return industryEndorsements.map((item: {}, i) => {
        return (

        )
      })
    }
    

  const sections = [
    {
      image: "/window.svg",
      title: "First Selection Title ",
      subtitle:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, beatae culpa sequi fuga minus expedita tempore exercitationem hic placeat odio architecto voluptas maiores aliquid consequatur ipsa alias facere nam ducimus!",
    },
    {
      subtitle:
        " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus non perferendis consequatur facere, sit maxime enim blanditiis delectus laboriosam dicta nesciunt omnis aperiam similique tenetur rerum sunt facilis debitis animi.",
      placeholder: "Enter your text here...",
      buttonText: "this don't work right now",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen text-black">
      <div
        className="  text-center  w-[95%] bg-[rgb(226,233,234)]
"
      >
        {/* Hero Section */}
        <section className=" flex justify-center  ">
          <div className="w-[60%] flex justify-between items-center ">
            <div className="flex flex-col  text-left gap-3 w-[450px]">
              <h1 className="text-3xl font-bold">{brandStory.hero_title}</h1>
              <p className="text-gray-600">{brandStory.hero_subtitle}</p>
            </div>
            <div className=" ">
              <Image
                src={sections[0].image || "/globe.svg"}
                alt={sections[0].title || "Default alt text"}
                width={450}
                height={450}
                className="max-w-full h-auto" // Ensures responsiveness
              />
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="bg-[rgb(51,51,51)] justify-center flex">
          <div className="  flex justify-between h-[200px] items-center  w-[60%]">
            <p className="  text-left w-[666px] text-lg text-brown-500 text-white">
              {signUpSection.section_text}
            </p>
            <div className="flex flex-col items-center gap-2.5 ">
              <input
                type="text"
                placeholder={signUpSection.text_field}
                className="w-[350px] border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                className="w-[350px] bg-[#42b99f]
                 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                {signUpSection.button_text}
              </button>
            </div>
          </div>
        </section>
        {/*Industry Endorsements*/}
        <section>
          <h3>{industryEndorsements.title}</h3>
          <p>{industryEndorsements.subtitle}</p>
        </section>
      </div>
    </div>
  );
}
