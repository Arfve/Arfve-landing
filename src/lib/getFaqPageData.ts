import { shopifyFetch } from './shopify';

// Type for metafield fields from Shopify response
interface Metafield {
  key: string;
  value: string;
  reference?: {
    fields?: Metafield[];
  };
}

// Type for FAQ items matching your Shopify JSON
interface FaqItem {
  question: string;
  answer: string;
}

// Type for the FAQ page data used in faq/page.tsx
interface FaqPageData {
  title: string;
  faqs: FaqItem[];
}

export async function getFaqPageData(): Promise<FaqPageData> {
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
    const faqListField = faqSections.find((field: Metafield) => field.key === 'faq_list');

    if (!faqListField) {
      // No need to log this as it's not an error, just a data state
      return {
        title: 'FAQ',
        faqs: [],
      };
    }

    try {
      // Parse the FAQ list JSON
      const faqList = JSON.parse(faqListField.value || '[]') as FaqItem[];

      return {
        title: body?.data?.page?.title || 'FAQ',
        faqs: faqList,
      };
    } catch (e) {
      // Keep this error log as it's helpful for debugging JSON parsing issues
      console.error('Error parsing FAQ list JSON:', e);
      return {
        title: 'FAQ',
        faqs: [],
      };
    }
  } catch (error) {
    // Keep this error log as it's helpful for debugging API issues
    console.error('Failed to get FAQ page data:', error);
    return {
      title: 'FAQ',
      faqs: [],
    };
  }
}