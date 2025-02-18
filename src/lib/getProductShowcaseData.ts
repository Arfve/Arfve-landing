import { shopifyFetch } from './shopify'

export async function getProductShowcaseData() {
  const { body } = await shopifyFetch({
    query: `
      query GetProductShowcase {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "product_showcase_section", key: "reference"}
          ]) {
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
    `
  })

  const fields = body?.data?.page?.metafields?.[0]?.reference?.fields || [];
  
  const findField = (key: string) => {
    const field = fields.find((f: { key: string }) => f.key === key);
    return field?.value;
  };

  return {
    title: findField('title') || '',
    subtitle: findField('subtitle') || '',
    buttonText: findField('button_text') || '',
    features: JSON.parse(findField('features') || '[]')
  }
} 