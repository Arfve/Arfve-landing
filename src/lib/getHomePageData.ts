import { shopifyFetch } from "./shopify";

// Define what a field from Shopify looks like
interface ShopifyField {
  key: string;      // The name of the field
  value: string;    // The value stored in the field
  reference?: {     // Optional: Used for images and other referenced content
    image?: {
      url: string;
    };
    fields?: ShopifyField[];
  };
}

export async function getHomePageData() {
  // Fetch data from Shopify using GraphQL
  // We're getting all sections from a single "Homepage Sections" metaobject
  const { body } = await shopifyFetch({
    query: `
      query GetHomePageSections {
        page(handle: "homepage") {
          metafields(identifiers: [{namespace: "homepage_sections", key: "reference"}]) {
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
                }
              }
            }
          }
        }
      }
    `,
  });

  // Get all the sections from the response, or empty array if nothing found
  const homepageSections = body?.data?.page?.metafields?.[0]?.reference?.fields || [];

  // Helper function to find and parse a specific section (like hero, features, etc)
  const parseSection = (key: string) => {
    // Find the section we want by its key (e.g., "hero_section")
    const section = homepageSections.find((field: ShopifyField) => field.key === key);
    if (!section) return null;

    if (section.reference) {
      const fields = section.reference.fields || [];
      // Convert the fields into an object our components can use
      return fields.reduce((acc: Record<string, any>, field: ShopifyField) => {
        // Handle different types of fields:
        
        // 1. Images
        if (field.reference?.image?.url) {
          acc[field.key] = field.reference.image.url;
        } 
        // 2. Feature lists (used in Features component)
        else if (field.key === 'feature_list') {
          try {
            acc['featureList'] = JSON.parse(field.value || '[]');
          } catch {
            acc['featureList'] = [];
          }
        }
        // 3. Features (used in Product Showcase)
        else if (field.key === 'features') {
          try {
            acc['features'] = JSON.parse(field.value || '[]');
          } catch {
            acc['features'] = [];
          }
        }
        // 4. Testimonials list
        else if (field.key === 'list') {
          try {
            acc['list'] = JSON.parse(field.value || '[]');
          } catch {
            acc['list'] = [];
          }
        }
        // 5. App section features (special handling for numbered features)
        else if (field.key.startsWith('feature_') && field.key.endsWith('_title')) {
          if (!acc.features) acc.features = [];
          const index = parseInt(field.key.split('_')[1]) - 1;
          if (!acc.features[index]) acc.features[index] = {};
          acc.features[index].title = field.value;
        }
        else if (field.key.startsWith('feature_') && field.key.endsWith('_description')) {
          if (!acc.features) acc.features = [];
          const index = parseInt(field.key.split('_')[1]) - 1;
          if (!acc.features[index]) acc.features[index] = {};
          acc.features[index].description = field.value;
        }
        // 6. Button text (convert to camelCase for React)
        else if (field.key === 'button_text') {
          acc['buttonText'] = field.value;
        }
        // 7. All other fields
        else {
          acc[field.key] = field.value;
        }
        return acc;
      }, {});
    }

    return section.value;
  };

  // Return all sections needed for the homepage
  // Each section is parsed from the Homepage Sections metaobject
  return {
    heroSection: parseSection("hero_section"),
    featuresSection: parseSection("features_section"),
    appSection: parseSection("app_section"),
    statementSection: parseSection("statement_section"),
    newsletterSection: parseSection("newsletter_section"),
    testimonialsSection: parseSection("testimonials_section"),
    productShowcaseSection: parseSection("product_showcase_section")
  };
}
