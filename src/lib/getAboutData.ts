import { shopifyFetch } from './shopify';

// Type for metafield fields from Shopify response
interface Metafield {
  key: string;
  value: string;
  reference?: {
    fields?: Metafield[];
    image?: { url: string };
  };
}

// Type for reviews in about_reviews_section
interface Review {
  // Adjust based on your JSON structure, e.g.:
  text: string;
  author: string;
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
      const section = aboutSections.find((field: Metafield) => field.key === key);

      if (!section?.reference?.fields) {
        return null;
      }

      const fields = section.reference.fields;
      const result = fields.reduce((acc: Record<string, string | Review[]>, field: Metafield) => {
        // Handle image fields
        if (field.reference?.image?.url) {
          acc[field.key] = field.reference.image.url;
        }
        // Handle reviews section specifically
        else if (field.key === 'about_reviews_section') {
          try {
            const reviewsData = JSON.parse(field.value);
            acc.title = "Don't take our word for it. Take theirs.";
            acc.reviews = reviewsData.reviews as Review[];
          } catch {
            acc.title = '';
            acc.reviews = [];
          }
        }
        // Handle JSON fields (for AboutHero3's items)
        else if (field.key === 'items') {
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
      heroSection: parseSection('about_main_hero'),
      visionHeroSection: parseSection('about_vision_hero'),
      visionSection: parseSection('about_vision_section'),
      innovationSection: parseSection('about_innovation_section'),
      reviewsSection: parseSection('about_reviews_section'),
    };

    return result;
  } catch (error) {
    console.error('Failed to get about page data:', error);
    return null;
  }
}