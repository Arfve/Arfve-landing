import { createStorefrontApiClient } from '@shopify/storefront-api-client'

// Add debug logging
console.log('Environment variables:', {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
  token: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN?.slice(0, 5) + '...' // Log only first 5 chars for security
});

if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not defined');
}

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) {
  throw new Error('NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is not defined');
}

type ShopifyVariables = Record<string, string | number | boolean | null | undefined>;

const shopifyConfig = {
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,  // Remove https:// prefix
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