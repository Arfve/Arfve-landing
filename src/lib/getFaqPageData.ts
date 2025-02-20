import { shopifyFetch } from "./shopify";

export async function getFaqPageData() {
  try {
    const { body } = await shopifyFetch({
      query: `
        query GetFaqPage {
          page(handle: "faq") {
            title
            metafields(identifiers: [{namespace: "faq_sections", key: "reference"}]) {
              reference {
                ... on Metaobject {
                  fields {
                    key
                    value
                    reference {
                      ... on Metaobject {
                        fields {
                          key
                          value
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });

    // Get the FAQ sections from the response
    const faqSections = body?.data?.page?.metafields?.[0]?.reference?.fields || [];

    // Find the FAQ list field
    const faqListField = faqSections.find((field: any) => field.key === 'faq_list');
    
    if (!faqListField) {
      console.log("No FAQ list field found");
      return {
        title: "FAQ",
        faqs: []
      };
    }

    try {
      // Parse the FAQ list JSON
      const faqList = JSON.parse(faqListField.value || '[]');
      console.log("Parsed FAQ data:", faqList);

      return {
        title: body?.data?.page?.title || "FAQ",
        faqs: faqList
      };
    } catch (e) {
      console.error("Error parsing FAQ list JSON:", e);
      return {
        title: "FAQ",
        faqs: []
      };
    }
  } catch (error) {
    console.error("Failed to get FAQ page data:", error);
    return {
      title: "FAQ",
      faqs: []
    };
  }
}
