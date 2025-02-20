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

export async function getHomePageData() {
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

  const homepageSections = body?.data?.page?.metafields?.[0]?.reference?.fields || [];

  const parseSection = (key: string) => {
    const section = homepageSections.find((field: ShopifyField) => field.key === key);
    if (!section) return null;

    if (section.reference) {
      const fields = section.reference.fields || [];
      const result = fields.reduce((acc: Record<string, any>, field: ShopifyField) => {
        if (field.reference?.image?.url) {
          acc[field.key] = field.reference.image.url;
        } else if (field.key === 'feature_list') {
          try {
            acc['featureList'] = JSON.parse(field.value || '[]');
          } catch {
            acc['featureList'] = [];
          }
        } else if (field.key === 'features') {
          try {
            acc['features'] = JSON.parse(field.value || '[]');
          } catch {
            acc['features'] = [];
          }
        } else if (field.key === 'list') {
          try {
            acc['list'] = JSON.parse(field.value || '[]');
          } catch {
            acc['list'] = [];
          }
        } else if (field.key.startsWith('feature_') && field.key.endsWith('_title')) {
          if (!acc.features) acc.features = [];
          const index = parseInt(field.key.split('_')[1]) - 1;
          if (!acc.features[index]) acc.features[index] = {};
          acc.features[index].title = field.value;
        } else if (field.key.startsWith('feature_') && field.key.endsWith('_description')) {
          if (!acc.features) acc.features = [];
          const index = parseInt(field.key.split('_')[1]) - 1;
          if (!acc.features[index]) acc.features[index] = {};
          acc.features[index].description = field.value;
        } else if (field.key === 'button_text') {
          acc['buttonText'] = field.value;
        } else {
          acc[field.key] = field.value;
        }
        return acc;
      }, {});

      console.log(`Parsed ${key}:`, result);
      return result;
    }

    return section.value;
  };

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
