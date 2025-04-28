import { shopifyFetch } from "./shopify";

export async function getSimpleLandingData() {
  console.log('Fetching simple landing data...');
  const { body } = await shopifyFetch({
    query: `
      query GetSimpleLandingData {
        page(handle: "simple_landing") {
          metafields(identifiers: [
            {namespace: "simple_landing", key: "hero_media"},
            {namespace: "simple_landing", key: "main_heading"},
            {namespace: "simple_landing", key: "sub_heading"},
            {namespace: "simple_landing", key: "email_heading"},
            {namespace: "simple_landing", key: "email_section_subtext"},
            {namespace: "simple_landing", key: "email_section_image"}
          ]) {
            key
            value
            reference {
              ... on MediaImage {
                image {
                  url
                }
              }
            }
          }
        }
      }
    `,
  });

  console.log('Response body:', body);
  const metafields = body?.data?.page?.metafields || [];
  console.log('Metafields:', metafields);
  
  const data = {
    heroMedia: metafields.find((field: any) => field.key === "hero_media")?.reference?.image?.url,
    mainHeading: metafields.find((field: any) => field.key === "main_heading")?.value,
    subHeading: metafields.find((field: any) => field.key === "sub_heading")?.value,
    emailHeading: metafields.find((field: any) => field.key === "email_heading")?.value,
    emailSubtext: metafields.find((field: any) => field.key === "email_section_subtext")?.value,
    emailImage: metafields.find((field: any) => field.key === "email_section_image")?.reference?.image?.url
  };
  
  console.log('Processed data:', data);
  return data;
} 