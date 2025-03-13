import { shopifyFetch } from './shopify';
import { 
  LegacyPageData, 
  LegacyHero, 
  WithYouSection,
  LegacyAppFeature,
  TechnologyFeature
} from '@/types/legacy';

// Define a type for metaobject fields
interface MetaobjectField {
  key: string; // Add 'key' to represent the field's key
  value: string;
  reference?: {
    image?: {
      url: string;
    };
    fields?: MetaobjectField[];
  };
}

// Define a type for metaobject fields array
type MetaobjectFields = MetaobjectField[];

interface ShopifyResponse {
  legacySection?: {
    fields: MetaobjectField[];
  };
  faqSection?: {
    fields: MetaobjectField[];
  };
}

export async function getLegacyPageData(): Promise<LegacyPageData> {
  const defaultData: LegacyPageData = {
    hero: {
      title: 'Legacy 1',
      image: '/images/legacy1/hero.jpg',
    },
    withYou: {
      title: 'With you for a long time',
      description: 'Default description text',
      image: '/images/legacy1/with-you.jpg',
    },
    technology: {
      title: 'Technology That Evolves With You',
      features: [],
    },
    legacyApp: {
      title: 'Legacy App',
      features: [],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: []
    }
  };

  const query = `
    query GetLegacyPageWithFAQ {
      legacySection: metaobject(handle: {
        handle: "legacy-1-sections-9qrktril",
        type: "legacy_1_sections"
      }) {
        fields {
          key
          value
          reference {
            ... on Metaobject {
              handle
              type
              fields {
                key
                value
                reference {
                  ... on MediaImage {
                    image {
                      url
                      altText
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        }
      }
      faqSection: metaobject(handle: {
        handle: "FAQ",
        type: "faq_sections"
      }) {
        fields {
          key
          value
          __typename
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });
    
    const data = response.body.data as ShopifyResponse;
    const legacyPageData = data?.legacySection?.fields;
    const faqData = data?.faqSection?.fields;

    if (!legacyPageData) console.debug('No legacy data found');
    if (!faqData) console.debug('No FAQ data found');

    return {
      hero: parseSection<LegacyHero>(legacyPageData, 'legacy_hero') || defaultData.hero,
      withYou: parseSection<WithYouSection>(legacyPageData, 'with_you') || defaultData.withYou,
      technology: parseSection<{ title: string; features: TechnologyFeature[] }>(
        legacyPageData,
        'technology'
      ) || defaultData.technology,
      legacyApp: parseSection<{ title: string; features: LegacyAppFeature[] }>(
        legacyPageData,
        'legacy_app'
      ) || defaultData.legacyApp,
      faq: {
        title: faqData?.find((f: MetaobjectField) => f.key === 'title')?.value || defaultData.faq.title,
        items: (() => {
          try {
            const faqList = faqData?.find((f: MetaobjectField) => f.key === 'faq_list')?.value;
            return faqList ? JSON.parse(faqList) : defaultData.faq.items;
          } catch (e) {
            console.error('Error parsing FAQ list:', e);
            return defaultData.faq.items;
          }
        })()
      }
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    return defaultData;
  }
}

function parseSection<T>(fields: MetaobjectFields | undefined, key: string): T | null {
  if (!fields) return null;
  const field = fields.find((f) => f.key === key);
  if (!field?.reference?.fields) return null;

  const result = field.reference.fields.reduce<Record<string, unknown>>((acc, f) => {
    if (f.reference?.image?.url) {
      acc[f.key] = f.reference.image.url;
    } else if (f.key === 'features') {
      try {
        acc[f.key] = JSON.parse(f.value || '[]');
      } catch {
        acc[f.key] = [];
      }
    } else {
      acc[f.key] = f.value;
    }
    return acc;
  }, {});

  return result as T;
}
