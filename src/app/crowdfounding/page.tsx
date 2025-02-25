import BrandStory  from "@/components/crowdfunding/brandStory";
import { getCrowdfoundingPage } from "@/lib/getCrowdfoundingData";
import IndustryEndorsements from "@/components/crowdfunding/industryEndorsements";
import SignUpSection from "@/components/crowdfunding/signUpSection";
export default async function page() {
  const {brandStory, industryEndorsements,signUpSection } = await getCrowdfoundingPage()

  return (
    <main>
      <BrandStory {...brandStory} />
      <SignUpSection {...signUpSection} />
      <IndustryEndorsements {...industryEndorsements} />
     
    </main>
  );
}

//---------------------------------------------------------------------------
// ALERT: detta kommer användas för uppbyggnaden behåll tills crowdfunding färdig
//---------------------------------------------------------------------------

// const sections = [
//   {
//     image: "/window.svg",
//     title: "First Selection Title ",
//     subtitle:
//       "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos, beatae culpa sequi fuga minus expedita tempore exercitationem hic placeat odio architecto voluptas maiores aliquid consequatur ipsa alias facere nam ducimus!",
//   },
//   {
//     subtitle:
//       " Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus non perferendis consequatur facere, sit maxime enim blanditiis delectus laboriosam dicta nesciunt omnis aperiam similique tenetur rerum sunt facilis debitis animi.",
//     placeholder: "Enter your text here...",
//     buttonText: "this don't work right now",
//   },
// ];
// <div className="flex items-center justify-center h-screen">
//       <div className="  text-center  w-[95%] bg-[rgb(226,233,234)]">

//         <section className=" flex justify-center  ">
//           <div className="w-[60%] flex justify-between  items-center ">
//             <div className="flex flex-col  text-left gap-3 w-[450px]">
//               <h1 className="text-3xl font-bold">{sections[0].title}</h1>
//               <p className="text-gray-600">{sections[0].subtitle}</p>
//             </div>
//             <div className=" ">
//               <Image
//                 src={sections[0].image || "/globe.svg"}
//                 alt={sections[0].title || "Default alt text"}
//                 width={450}
//                 height={450}
//                 className="max-w-full h-auto" // Ensures responsiveness
//               />
//             </div>
//           </div>
//         </section>

//         <section className="bg-[rgb(51,51,51)] justify-center flex">
//           <div className="  flex justify-between h-[200px] items-center  w-[60%]">
//             <p className="  text-left w-[666px] text-lg text-brown-500 text-white">
//               {sections[1].subtitle}
//             </p>
//             <div className="flex flex-col items-center gap-2.5 ">
//               <input
//                 type="text"
//                 placeholder={sections[1].placeholder}
//                 className="w-[350px] border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
           
//               <button
//                 className="w-[350px] bg-[#42b99f]
//                  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 {sections[1].buttonText}
//               </button>

              
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>

