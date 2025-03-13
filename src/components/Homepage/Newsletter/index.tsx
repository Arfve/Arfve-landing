"use client";
import { useState, useEffect } from "react";

interface NewsletterProps {
  title: string;
  subtitle: string;
  buttonText: string;
  placeholder: string;
}

export default function Newsletter({
  title,
  subtitle,
  buttonText,
  placeholder,
}: NewsletterProps) {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubscriberCount() {
      try {
        const response = await fetch("/api/newsletter");
        const data = await response.json();
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    }
    fetchSubscriberCount();
  }, []);

  return (
    <section className="bg-black text-white flex flex-col md:flex-row justify-center items-center p-5 h-[202px] gap-10">
      {/* Titel */}
      <h2 className="text-3xl font-bold mb-6 md:mb-0 md:mr-6">{title}</h2>

      <div className="w-[362px] h-[74px] flex flex-col gap-[9px]">
        {/* Undertitel */}
        <p className="w-full h-[22px] font-inter font-medium text-[18px] leading-[22px] text-white">
          {subtitle}
        </p>

        <form className="w-full flex flex-row items-center gap-[12px]">
          <div className="flex-1 h-[39px] flex items-end p-[10px] gap-[10px] border-b border-white box-border">
            <input
              type="email"
              required
              className="w-[242px] bg-black text-white text-[16px] leading-[19px] placeholder-gray-400 focus:outline-none"
              placeholder={placeholder}
            />
          </div>

          <button
            type="submit"
            className="flex-none w-[108px] h-[43px] flex justify-center items-center px-[16px] py-[12px] gap-[8px] border border-white rounded-[8px] bg-black text-[16px] leading-[19px] font-normal text-white"
          >
            {buttonText}
          </button>

          <span className="text-white text-sm ml-2">
            {loading
              ? "Loading..."
              : `Already ${count ?? 0} subscribed`}
          </span>
        </form>
      </div>
    </section>
  );
}
