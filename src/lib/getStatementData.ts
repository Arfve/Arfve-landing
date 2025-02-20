import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getStatementData() {
  const { body } = await shopifyFetch({
    query: `
      query GetStatement {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "statement_section", key: "reference"}
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
    content: findField('content') || ''
  }
} 