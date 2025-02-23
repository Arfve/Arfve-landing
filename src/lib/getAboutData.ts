import { shopifyFetch } from "./shopify";

interface ShopifyField {
  key: string;
  value: string;
  reference?: {
    image?: {
      url: string;
    };
    fields?: ShopifyField[];
  };
}

export async function getAboutPageData() {
  try {
    const { body } = await shopifyFetch({
      query: `
        query GetAboutPage {
          page(handle: "about") {
            title
            metafields(identifiers: [{namespace: "about_page_sections", key: "reference"}]) {
              reference {
                ... on Metaobject {
                  handle
                  id
                  fields {
                    key
                    value
                    reference {
                      ... on Metaobject {
                        fields {
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
                      ... on MediaImage {
                        image {
                          url
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

    const aboutSections = body?.data?.page?.metafields?.[0]?.reference?.fields || [];

    const parseSection = (key: string) => {
      const section = aboutSections.find((field: any) => field.key === key);

      if (!section?.reference?.fields) {
        return null;
      }

      const fields = section.reference.fields;
      const result = fields.reduce((acc: Record<string, any>, field: any) => {
        // Handle image fields
        if (field.reference?.image?.url) {
          // Remove 'about_innovation_section.' prefix from the key if it exists
          const cleanKey = field.key.replace('about_innovation_section.', '');
          acc[cleanKey] = field.reference.image.url;
        }
        // Handle JSON fields (items and reviews)
        else if (['items', 'reviews'].includes(field.key)) {
          try {
            acc[field.key] = JSON.parse(field.value || '[]');
          } catch {
            acc[field.key] = [];
          }
        }
        // Handle regular text fields
        else {
          acc[field.key] = field.value;
        }
        return acc;
      }, {});

      return result;
    };

    const result = {
      heroSection: parseSection("about_main_hero"),
      visionHeroSection: parseSection("about_vision_hero"),
      visionSection: parseSection("about_vision_section"),
      innovationSection: parseSection("about_innovation_section"),
      whyChooseSection: parseSection("about_why_choose_section")
    };

    return result;

  } catch (error) {
    console.error("Failed to get about page data:", error);
    return null;
  }
}
