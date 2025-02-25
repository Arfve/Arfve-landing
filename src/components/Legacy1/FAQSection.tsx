'use client'

import { useState } from 'react'

interface FAQSectionProps {
  title: string;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function FAQSection({ title, faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="max-w-[900px] mx-auto">
          <h2 className="text-4xl font-bold mb-8">
            {title}
          </h2>
          {faqs.slice(0, 4).map((faq, index) => (
            <div key={index} className="relative border-b border-black">
              {/* Question */}
              <div
                className="flex items-center text-black justify-between py-4 font-medium relative cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <div
                  className={`cursor-pointer transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg 
                    width="12" 
                    height="8" 
                    viewBox="0 0 12 8" 
                    fill="none"
                  >
                    <path d="M1 1L6 6L11 1" stroke="black" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div
                className={`transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="py-4 text-black/70">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 