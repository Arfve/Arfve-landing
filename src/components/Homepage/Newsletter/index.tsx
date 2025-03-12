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
  return (
    <section className="bg-black text-white flex flex-col md:flex-row justify-center items-center p-5 h-[202px] gap-10">
      <h2 className="text-3xl font-bold mb-6 md:mb-0 md:mr-6">{title}</h2>
      <div className="w-[362px] h-[74px] flex flex-col gap-[9px]">
        {/* Subtitle / Header */}
        <p className="w-full h-[22px] font-inter font-medium text-[18px] leading-[22px] text-white">
          {subtitle}
        </p>
        <form className="w-full flex items-center gap-[12px]">
          {/* Input Container matching Frame 68 */}
          <div className="w-[242px] h-[39px] flex items-end p-[10px] gap-[10px] border-b border-white box-border">
            <input
              type="email"
              required
              className="w-full bg-black text-white text-[16px] leading-[19px] placeholder-gray-400 focus:outline-none"
              placeholder={placeholder}
            />
          </div>
          {/* Button styled as per your Figma Button */}
          <button
            data-tracking-id="newsletter-button"
            type="submit"
            className="flex-none w-[108px] h-[43px] flex justify-center items-center px-[16px] py-[12px] gap-[8px] border border-white rounded-[8px] bg-black text-[16px] leading-[19px] font-normal text-white">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
