import Image from "next/image";

export default function dummyBuild() {
  return (
    <section className="flex justify-center items-center w-full h-[647px] ">
      <div className="w-[80%] flex justify-between flex-wrap gap-8">

        <div className="w-full md:w-[36%] flex flex-col justify-center">
          <h4 className="text-5xl mb-6">Hello there, said Obi-Wan</h4>
          <p className="leading-relaxed text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
            reprehenderit nemo quaerat asperiores ea amet earum, delectus
            inventore voluptatem numquam qui nihil consectetur! Sequi voluptas
            numquam velit. Ex, adipisci quae! Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Repudiandae vero rerum beatae ratione
            repellendus odio ut, tempora ex dolorum magnam, earum quisquam nisi
            est! Vero molestias nostrum in ad vitae.
          </p>
        </div>

        <div className="w-full md:w-auto flex justify-center">
          <Image
            src="/Earphones-img.jpg"
            alt="Earphones product image"
            width={500}
            height={300}
            priority
          />
        </div>
      </div>
    </section>
  );
}
