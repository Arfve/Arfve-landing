import { createStorefrontApiClient } from '@shopify/storefront-api-client'

type ShopifyVariables = Record<string, string | number | boolean | null | undefined>;

const shopifyConfig = {
  storeDomain: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
  apiVersion: "2024-04",
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
};

export const shopifyClient = createStorefrontApiClient(shopifyConfig);




export async function testConnection() {
  try {
    const result = await shopifyClient.request(`
      query {
        shop {
          name
        }
      }
    `);
    console.log("Successfully connected to Shopify:", result);
    return true;
  } catch (error) {
    console.error("Failed to connect to Shopify:", error);
    return false;
  }
}

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: ShopifyVariables;
}) {
  try {
    if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
      console.warn('Missing Shopify domain configuration')
      throw new Error('Missing Shopify configuration')
    }

    const result = await shopifyClient.request(query, { variables })
    return { status: 200, body: result }
  } catch (error) {
    console.error('Shopify Client Error:', error)
    return { 
      status: 500, 
      body: { 
        errors: error,
        data: null 
      } 
    }
  }
}

export async function testShopifyConnection() {
  const result = await shopifyFetch({
    query: `
      query {
        shop {
          name
        }
      }
    `
  })
  console.log('Shopify connection test:', result)
  return result
}