import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getHeroData() {
  const { body } = await shopifyFetch({
    query: `
      query GetHeroSection {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "hero_section", key: "reference"}
          ]) {
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
  })

  const fields = body?.data?.page?.metafields?.[0]?.reference?.fields || [];
  
  const findField = (key: string) => {
    const field = fields.find((f: { key: string }) => f.key === key);
    if (field?.reference?.image?.url) {
      return field.reference.image.url;
    }
    return field?.value;
  };

  return {
    title: findField('title') || 'Legacy 1',
    subtitle: findField('subtitle') || 'The first earphones with a replaceable battery.',
    buttonText: findField('button_text') || 'Learn more',
    image: findField('image') || null
  }
} 