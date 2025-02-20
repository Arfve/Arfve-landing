import { getPageData } from "@/lib/getPageData";
import { UpgradeEvolve } from "./UpgradeEvolve";
import { BeMoreHuman } from "./BeMoreHuman";
import { WhyChoose } from "./WhyChooseArfve";
import { Bragi } from "./Bragi";
import Testimonials from "@/components/Testimonials";
import { AboutPageData } from "@/types/shopify"; // Ensure correct path

export default async function AboutPage() {
  const data: AboutPageData = await getPageData();
  console.log("About Page Data:", data);

  if (!data) return <p>Loading...</p>;

  return (
    <>
      <UpgradeEvolve
        title={data.about.upgrade.title}
        description={data.about.upgrade.description}
        image={data.about.upgrade.image}
      />
      <BeMoreHuman
        title={data.about.beMoreHuman.title}
        subtitle={data.about.beMoreHuman.subtitle}
        description={data.about.beMoreHuman.description}
        image={data.about.beMoreHuman.image}
      />
      <WhyChoose
        title={data.about.whyChoose.title}
        description={data.about.whyChoose.description}
        features={data.about.whyChoose.features}
      />
      <Bragi items={data.about.bragi} />
      <Testimonials
        title={data.about.testimonials.title}
        testimonials={data.about.testimonials.list}
      />
    </>
  );
}
