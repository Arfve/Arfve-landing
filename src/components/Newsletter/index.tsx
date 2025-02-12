export default function Newsletter() {
  return (
    <section className="flex justify-center items-center py-16 px-32 bg-[#090909]">
      <div className="flex gap-16 max-w-[1192px] w-full">
        <div className="flex flex-col gap-3">
          <h2 className="text-[28px] font-semibold text-white">
            Subscribe to our newsletter
          </h2>
          <div className="flex flex-col gap-2">
            <p className="text-lg font-medium text-white">
              Subscribe to our newsletter
            </p>
            <div className="flex gap-3">
              <div className="flex border-b border-white pb-2.5 px-2.5 w-[242px]">
                <input
                  type="email"
                  placeholder="email"
                  className="bg-transparent text-white outline-none w-full"
                />
              </div>
              <button className="px-4 py-3 border border-white rounded-lg text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 