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

export async function getLegacyPageData(): Promise<LegacyPageData> {
  const defaultData: LegacyPageData = {
    hero: {
      title: 'Legacy 1',
      image: '/images/placeholders/hero.jpg',
    },
    withYou: {
      title: 'With you for a long time',
      description: 'Default description text',
      image: '/images/placeholders/with-you.jpg',
    },
    technology: {
      title: 'Technology That Evolves With You',
      features: [
        {
          title: '11mm speakers',
          description: 'For an exceptional sound',
          image: '/images/placeholders/tech-feature.jpg',
        },
      ],
    },
    legacyApp: {
      title: 'Legacy App',
      features: [
        {
          title: 'Personalized Sound',
          description: 'Personalized Sound & Audio',
          subtext: 'Dual connectivity',
          image: '/images/placeholders/app-feature.jpg',
        },
      ],
    },
  };

  const query = `
    query GetLegacyPage {
      metaobject(handle: {
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await shopifyFetch({ query });

    if (!response?.body?.data?.metaobject) {
      console.warn('No metaobject found, using default data');
      return defaultData;
    }

    const legacyPageData = response.body.data.metaobject.fields as MetaobjectFields;

    const data = {
      hero: parseSection<LegacyHero>(legacyPageData, 'legacy_hero') || defaultData.hero,
      withYou:
        parseSection<WithYouSection>(legacyPageData, 'with_you') || defaultData.withYou,
      technology:
        parseSection<{ title: string; features: TechnologyFeature[] }>(
          legacyPageData,
          'technology'
        ) || defaultData.technology,
      legacyApp:
        parseSection<{ title: string; features: LegacyAppFeature[] }>(
          legacyPageData,
          'legacy_app'
        ) || defaultData.legacyApp,
    };

    return data;
  } catch (error) {
    console.error('Error fetching legacy page data:', error);
    throw error;
  }
}

function parseSection<T>(fields: MetaobjectFields, key: string): T | null {
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
