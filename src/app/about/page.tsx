import React from "react";
import AboutHero3 from "@/components/aboutHero3";
import { AboutHero4 } from "@/components/aboutHero4";
import { getAboutPageData } from "@/lib/getAboutData";

const Page = async () => {
  const pageData = await getAboutPageData();
  console.log("Page Data:", pageData);
  const { json, json4 } = pageData.about3;

  console.log("-----------------");

  console.log("json:", json);
  console.log("json4:", json4);
  console.log("-----------------");

  return (
    <div>
      <AboutHero3 json={json} />
      <AboutHero4 json4={json4} />
    </div>
  );
};

export default Page;
