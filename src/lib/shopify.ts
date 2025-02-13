import {createStorefrontApiClient} from '@shopify/storefront-api-client'

const isDevelopment = process.env.NODE_ENV === 'development'

const shopifyConfig = {
  storeDomain: `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}`,
  apiVersion: '2024-04',
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
}

export const shopifyClient = createStorefrontApiClient(shopifyConfig)

export async function testConnection() {
  try {
    const result = await shopifyClient.request(`
      query {
        shop {
          name
        }
      }
    `)
    console.log('Successfully connected to Shopify:', result)
    return true
  } catch (error) {
    console.error('Failed to connect to Shopify:', error)
    return false
  }
}

export async function shopifyFetch({ query, variables = {} }: { query: string, variables?: Record<string, any> }) {
  try {
    if (!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && isDevelopment) {
      console.warn('Shopify credentials not set up. Using default data.')
      return {
        status: 200,
        body: { data: null }
      }
    }

    const result = await shopifyClient.request(query, {
      variables
    })

    return {
      status: 200,
      body: result
    }
  } catch (error) {
    if (isDevelopment) {
      console.warn('Shopify API error:', error)
      return {
        status: 200,
        body: { data: null }
      }
    }
    
    console.error('Shopify Client Error:', error)
    return {
      status: 500,
      error: 'Error receiving data'
    }
  }
} 