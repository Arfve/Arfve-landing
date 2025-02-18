import React from "react";
import Questions from "@/components/FAQ";
import { getFaqPageData } from "@/lib/getFaqPageData";

interface FaqPageData {
    question: string;
    answer: string;
}

const page = async () => {



    const faqPageData: FaqPageData[] = await getFaqPageData() || [];

    
    const renderFaqContent = () => {
        return faqPageData.map((faq, index) => {
            return (
                <Questions key={index} answer={faq.answer}>{faq.question}</Questions>
            )
        })
    }

  return (
      
    <main className="m-0 flex items-center min-w-xs min-h-[72.5vh] bg-white" >
        <div className="max-w-7xl mx-auto p-8 text-center">
           {renderFaqContent()}
        </div>
    </main>
)
};

export default page;
