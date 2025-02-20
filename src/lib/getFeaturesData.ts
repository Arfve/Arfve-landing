import { shopifyFetch } from './shopify'

export async function getFeaturesData() {
  const { body } = await shopifyFetch({
    query: `
      query GetFeatures {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "homepage_feature_section", key: "reference"}
          ]) {
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

  const data = {
    title: findField('titel') || '',
    subtitle: findField('subtitle') || '',
    featureList: JSON.parse(findField('feature_list') || '[]'),
    image: findField('image') || ''
  }
  return data
} 