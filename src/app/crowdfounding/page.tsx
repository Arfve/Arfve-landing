import BrandStory  from "@/components/crowdfunding/brandStory";
import { getCrowdfoundingPage } from "@/lib/getCrowdfoundingData";
import IndustryEndorsements from "@/components/crowdfunding/industryEndorsements";
import SignUpSection from "@/components/crowdfunding/signUpSection";
import DummyBuild from "@/components/crowdfunding/dummyBuild";
export default async function page() {
  const {brandStory, industryEndorsements,signUpSection } = await getCrowdfoundingPage()

  return (
    <main>
      <BrandStory {...brandStory} />
      <SignUpSection {...signUpSection} />
      <DummyBuild/>
      <DummyBuild/>
      <DummyBuild/>
      <DummyBuild/>
      <SignUpSection {...signUpSection} />
      <IndustryEndorsements {...industryEndorsements} />
     
    </main>
  );
}

