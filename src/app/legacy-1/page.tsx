import FAQ from '@/components/FAQ'

export default async function Legacy1Page() {
  return (
    <main className="w-full bg-white">
      <section className="flex flex-col items-center w-[1453px] mx-auto py-12 px-[300px] gap-3 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center w-full">FAQ</h2>
        <div className="space-y-4 w-full">
          <FAQ answer="Ja, våra hörlurar är designade för att vara vattentåliga och passar perfekt för sportaktiviteter.">
            Are earphones suitables for sport activities ?
          </FAQ>
          
          <FAQ answer="Vi erbjuder 30 dagars pengarna-tillbaka-garanti på alla våra produkter.">
            Is there some money back policy ?
          </FAQ>
          
          <FAQ answer="Vi erbjuder 30 dagars pengarna-tillbaka-garanti på alla våra produkter.">
            Is there some money back policy ?
          </FAQ>
          
          <FAQ answer="Vi erbjuder 30 dagars pengarna-tillbaka-garanti på alla våra produkter.">
            Is there some money back policy ?
          </FAQ>
        </div>
      </section>
    </main>
  )
} 