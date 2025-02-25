import BrandStory  from "@/components/crowdfunding/brandStory";
import { getCrowdfoundingPage } from "@/lib/getCrowdfoundingData";
import IndustryEndorsements from "@/components/crowdfunding/industryEndorsements";
import SignUpSection from "@/components/crowdfunding/signUpSection";
export default async function page() {
  const {brandStory, industryEndorsements,signUpSection } = await getCrowdfoundingPage()

  return (
    <div>
      <BrandStory {...brandStory} />
      <SignUpSection {...signUpSection} />
      <IndustryEndorsements {...industryEndorsements} />
     
    </div>
  );
}

