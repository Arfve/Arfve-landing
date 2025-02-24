import React from 'react';

interface SignUpSectionProps {
    button_text: string;
    section_text: string;
    text_field: string;
}

const SignUpSection: React.FC<SignUpSectionProps> = ({ button_text, section_text, text_field }) => {

    
    return (
        <section className="bg-[rgb(51,51,51)] justify-center flex">
           <div className="  flex justify-between h-[200px] items-center  w-[60%]">
             <p className="  text-left w-[666px] text-lg text-brown-500 text-white">
               {section_text}
             </p>
             <div className="flex flex-col items-center gap-2.5 ">
               <input
                 type="text"
                 placeholder={text_field}
                 className="w-[350px] border border-gray-300  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />         
               <button
                 className="w-[350px] bg-[#42b99f]
                  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                 {button_text}
               </button>            
             </div>
           </div>
         </section>
    );
};

export default SignUpSection;