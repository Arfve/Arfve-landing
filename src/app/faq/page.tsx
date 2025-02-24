import React from "react";
import Questions from "@/components/FAQ";
import { getFaqPageData } from "@/lib/getFaqPageData";

interface FaqPageData {
    title: string;
    faqs: {
        question: string;
        answer: string;
    }[];
}

const page = async () => {
    // Get the data and ensure we have a default structure
    const rawData = await getFaqPageData();
    
    // If the data is an array, convert it to the expected format
    const faqPageData: FaqPageData = Array.isArray(rawData) 
        ? {
            title: 'FAQ',
            faqs: rawData.map(item => ({
                question: item.question,
                answer: item.answer
            }))
        }
        : rawData || { title: 'FAQ', faqs: [] };
    
    const renderFaqContent = () => {
        if (!faqPageData.faqs || !Array.isArray(faqPageData.faqs)) return null;
        
        return faqPageData.faqs.map((faq, index) => (
            <Questions key={index} answer={faq.answer}>{faq.question}</Questions>
        ));
    }

    return (
        <main className="m-0 flex items-center min-w-xs min-h-[69.2vh] bg-white" >
            <div className="max-w-7xl mx-auto p-8 text-center">
                <h1 className="text-2xl text-black font-semibold mb-6 text-left">{faqPageData.title}</h1>
                {renderFaqContent()}
            </div>
        </main>
    );
};

export default page;
