import SimpleLanding from '@/components/SimpleLanding';
import { getSimpleLandingData } from '@/lib/getSimpleLandingData';

export default async function Home() {
  const data = await getSimpleLandingData();
  
  // Use fallback values if no data is returned
  return (
    <SimpleLanding
      videoUrl={data?.heroMedia || "/HeroVideo 1.mp4"}
      mainHeading={data?.mainHeading || "WE'RE BUILDING TECHNOLOGY THAT'S MORE THAN SMART"}
      subHeading={data?.subHeading || "THAT'S MORE THAN SMART"}
      emailHeading={data?.emailHeading || "We're shaping a sustainable future for audio devices."}
      emailSubtext={data?.emailSubtext || "More to come - stay tuned"}
      emailImage={data?.emailImage || "/Arfve6.jpg"}
    />
  );
}