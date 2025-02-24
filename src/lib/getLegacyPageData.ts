import { shopifyFetch } from './shopify'
import { LegacyPageData } from '@/types/legacy'

interface MetaobjectField {
  value: string;
  reference?: {
    image?: {
      url: string;
    }
  }
}

interface Metaobject {
  fields: {
    title: MetaobjectField;
    description?: MetaobjectField;
    image?: MetaobjectField;
    features?: MetaobjectField;
  }
}

export async function getLegacyPageData(): Promise<LegacyPageData> {
  // Flytta defaultData hit, före try-blocket
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
          image: '/images/placeholders/tech-feature.jpg'
        }
      ],
    },
    legacyApp: {
      title: 'Legacy App',
      features: [
        {
          title: 'Personalized Sound',
          description: 'Personalized Sound & Audio',
          subtext: 'Dual connectivity',
          image: '/images/placeholders/app-feature.jpg'
        }
      ],
    }
  }

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
  `

  try {
    const response = await shopifyFetch({ query })
    console.log('Full response:', JSON.stringify(response?.body, null, 2))
    console.log('GraphQL errors:', response?.body?.errors)

    // Testa en enklare query först för att se om vi kan nå metaobjektet
    const simpleQuery = `
      query {
        metaobjects(type: "legacy_1_page_sections", first: 10) {
          nodes {
            id
            handle
            type
            fields {
              key
              value
            }
          }
        }
      }
    `
    const testResponse = await shopifyFetch({ query: simpleQuery })
    console.log('Available metaobjects:', JSON.stringify(testResponse?.body?.data, null, 2))

    if (!response?.body?.data?.metaobject) {
      console.warn('No metaobject found, using default data')
      return defaultData
    }

    const legacyPageData = response.body.data.metaobject.fields
    console.log('Legacy page data:', legacyPageData)

    // Extrahera data från metaobjektet
    const data = {
      hero: parseSection(legacyPageData, 'legacy_hero') || defaultData.hero,
      withYou: parseSection(legacyPageData, 'with_you') || defaultData.withYou,
      technology: parseSection(legacyPageData, 'technology') || defaultData.technology,
      legacyApp: parseSection(legacyPageData, 'legacy_app') || defaultData.legacyApp
    }

    return data

  } catch (error) {
    console.error('Error fetching legacy page data:', error)
    throw error
  }
}

function parseSection(fields: any[], key: string) {
  const field = fields.find((f: any) => f.key === key)
  if (!field?.reference?.fields) return null

  const result = field.reference.fields.reduce((acc: any, f: any) => {
    if (f.reference?.image?.url) {
      acc[f.key] = f.reference.image.url
    } else if (f.key === 'features') {
      try {
        acc[f.key] = JSON.parse(f.value || '[]')
      } catch {
        acc[f.key] = []
      }
    } else {
      acc[f.key] = f.value
    }
    return acc
  }, {})

  // Lägg till en tom features-array om den saknas
  if (key === 'technology' || key === 'legacy_app') {
    result.features = result.features || []
  }

  return result
} 