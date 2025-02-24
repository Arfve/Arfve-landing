import { shopifyFetch } from "./shopify";

// Define what a field from Shopify looks like
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

export async function getCrowdfoundingPage() {
  const { body } = await shopifyFetch({
    query: `
      query GetFaqPage {
        page(handle: "crowdfunding") {
          metafields(identifiers: [{namespace: "crowdfounding", key: "reference"}]) {
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

  const crowdfundingFields = body?.data?.page?.metafields?.[0]?.reference?.fields || [];

  const parseField = (key: string) => {
    const field = crowdfundingFields.find((f: ShopifyField) => f.key === key);
    if (!field) return null;

    if (field.reference) {
      const fields = field.reference.fields || [];
      return fields.reduce((acc: Record<string, any>, f: ShopifyField) => {


        if (f.reference?.image?.url) {
          acc[f.key] = f.reference.image.url;
        }
        else if (f.key === 'industry_endorsements') {
          try {
            acc['industryEndorsements'] = JSON.parse(f.value || '{}');
          } catch {
            acc['industryEndorsements'] = {};
          }
        }

        else {
          acc[f.key] = f.value;
        }
        return acc;
      }, {});
    }


    if (field.value) {
      try {
        return JSON.parse(field.value);
      } catch (e) {
        return field.value;
      }
    }
    return null;
  };

  return {
    brandStory: parseField("brand_story"),
    industryEndorsements: parseField("industry_endorsements"),
    signUpSection: parseField("sign_up_section"),
  };
}
