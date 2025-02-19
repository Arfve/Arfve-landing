import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getNewsletterData() {
  const { body } = await shopifyFetch({
    query: `
      query GetNewsletter {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "newsletter_section", key: "reference"}
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
    title: findField('title') || 'Subscribe to our newsletter',
    subtitle: findField('subtitle') || 'Subscribe to our newsletter',
    buttonText: findField('button_text') || 'Subscribe',
    placeholder: findField('placeholder') || 'Enter your email'
  }
} 