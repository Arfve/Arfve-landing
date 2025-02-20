import { shopifyFetch } from './shopify'

export async function getAppSectionData() {
  const { body } = await shopifyFetch({
    query: `
      query GetAppSection {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "app_section", key: "reference"}
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

  return {
    title: findField('title') || 'Arfve app',
    features: [
      {
        title: findField('feature_1_title') || 'Customize everything',
        description: findField('feature_1_description') || 'Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar...'
      },
      {
        title: findField('feature_2_title') || 'A shortcut to your best AI assistant',
        description: findField('feature_2_description') || 'Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar...'
      }
    ],
    image: findField('image') || '/placeholder.png'
  }
} 