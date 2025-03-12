"use client";
import Link from "next/link";

import React, { useEffect, useState } from "react";
interface SignUpSectionProps {
  button_text: string;
  section_text: string;
  text_field: string;
}

const SignUpSection: React.FC<SignUpSectionProps> = ({
  button_text,
  section_text,
  text_field,
}) => {
  const [customersCount, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {

        const storedCustomers = sessionStorage.getItem("customers");

        if (storedCustomers && storedCustomers !== "undefined") {
          setCustomers(JSON.parse(storedCustomers));
        } else {

          const response = await fetch(
            "http://localhost:3000/api/crowdfunding"
          );
          const customersCount = await response.json();

          if (customersCount) {
            setCustomers(customersCount);

         
            sessionStorage.setItem("customers", JSON.stringify(customersCount));
          }
        }
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };

    fetchCustomers();
  }, []);


  return (
    <section className="bg-[rgb(51,51,51)] justify-center flex">
      <div className="  flex justify-between h-[200px] items-center  w-[60%]">
        <p className="  text-left w-[666px] text-lg text-brown-500 text-white">
          {section_text} Antal registerade: {customersCount} av 1000
        </p>
        <div className="flex flex-col items-center gap-2.5 ">
          <input
            type="text"
            placeholder={text_field}
            className="w-[350px] border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link href="/crowdfounding/reservation">
            <button
            data-tracking-id="signup-button"
              className="w-[350px] bg-[#42b99f]
                  hover:bg-[#308a76] text-white font-bold py-2 px-4 rounded">
              {button_text}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignUpSection;
