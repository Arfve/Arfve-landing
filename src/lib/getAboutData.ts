import { shopifyFetch } from "./shopify";
import { Metafield } from "@/types/shopify";

export async function getAboutPageData() {
  const { body } = await shopifyFetch({
    query: `
      query GetAboutPage {
        page(handle: "about") {
          metafields(identifiers: [
            {namespace: "about", key: "be_more_human_description"},
             {namespace: "about", key: "section3JSON"}
              {namespace: "about", key: "section4"},
              {namespace: "about", key: "section5"}

         
          ]) {
            key
            namespace
            value
          }
        }
      }
    `,
  });

  const metafields: Metafield[] = body?.data?.page?.metafields || [];

  const findMetafield = (namespace: string, key: string) => {
    const field = metafields.find(
      (m) => m?.namespace === namespace && m?.key === key
    );
    return field?.value;
  };
  //Ändra about3 till about så det blir mer korrekt!
  return {
    about3: {
      title: findMetafield("about", "be_more_human_description"),
      json: JSON.parse(findMetafield("about", "section3JSON") || "[]"),
      json4: JSON.parse(findMetafield("about", "section4") || "[]"),
      json5: JSON.parse(findMetafield("about", "section5") || "[]"),
    },
  };
}
