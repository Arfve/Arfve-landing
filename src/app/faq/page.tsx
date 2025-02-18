import React from "react";
import Question from "@/components/FAQ";

const page = () => {
  return (
      
    <main className="m-0 flex items-center min-w-xs min-h-[72.5vh] bg-white" >
        <div className="max-w-7xl mx-auto p-8 text-center">
            <Question answer="Lorem ipsum">Are earphones suitables for sport activities ?</Question>
            <Question answer="Lorem ipsum">Is there some money back policy ?</Question>
        </div>
    </main>
)
};

export default page;
