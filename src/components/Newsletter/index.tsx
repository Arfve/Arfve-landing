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
  placeholder 
}: NewsletterProps) {
  return (
    <section className="bg-black text-white flex flex-col md:flex-row justify-center items-center p-5 h-[202px] gap-10">
      <h2 className="text-3xl font-bold mb-6 md:mb-0 md:mr-6">{title}</h2>
      <div>
        <p>{subtitle}</p>
        <form className="md:w-1/2 flex md:items-center md:gap-x-4">
          <input
            type="email"
            required
            className="w-full md:w-auto bg-black text-white rounded-md px-3.5 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-b border-white"
            placeholder={placeholder}
          />
          <button
            type="submit"
            className="flex-none rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm border border-white">
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
