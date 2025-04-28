"use client"

interface TextSectionProps {
  heading: string
  subtext: string
}

export default function TextSection({ heading, subtext }: TextSectionProps) {
  return (
    <section className="relative py-16 px-6 bg-white">
      <div className="max-w-[1440px] mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#243555] mb-6">{heading}</h2>
        <p className="text-lg text-[#243555] max-w-2xl mx-auto">{subtext}</p>
      </div>
    </section>
  )
} 