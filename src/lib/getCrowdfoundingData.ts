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

// Define the industry endorsement structure
interface IndustryEndorsement {
  title: string;
  subtitle: string;
  array: Array<{
    subtitle: string;
    image: string;
    name: string;
    position: string;
    company: string;
  }>;
}

// Define the return type for fields
type FieldValue = string | IndustryEndorsement | Record<string, string>;

export async function getCrowdfoundingPage() {
  const { body } = await shopifyFetch({
    query: `
      query GetCrowdFundingPage {
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
console.log(crowdfundingFields[0].reference.fields);

  const parseField = (key: string) => {
    const field = crowdfundingFields.find((f: ShopifyField) => f.key === key);
    if (!field) return null;
    https://cdn.shopify.com/videos/c/o/v/9e0d372617804c88bf4419c760d89258.mp4
    if (field.reference) {
      const fields = field.reference.fields || [];
      return fields.reduce((acc: Record<string, FieldValue>, f: ShopifyField) => {
        if (f.reference?.image?.url) {
          acc[f.key] = f.reference.image.url;
        }
        else if (f.key === 'industry_endorsements') {
          try {
            acc['industryEndorsements'] = JSON.parse(f.value || '{}') as IndustryEndorsement;
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
      } catch {
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
