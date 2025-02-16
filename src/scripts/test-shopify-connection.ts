import * as dotenv from 'dotenv';
// Load .env.local first
dotenv.config({ path: '.env.local' });

import { shopifyClient, shopifyFetch } from '../lib/shopify';

async function testShopifyConnection() {
  // First, log the environment variables to verify they're loaded
  console.log('\n🔍 Checking Environment Variables...\n');
  console.log({
    domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    env: process.env.NODE_ENV
  });

  console.log('\n🔍 Testing Shopify Connection...\n');

  // 1. Check environment variables
  console.log('Environment Variables:');
  console.log('- Store Domain:', process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ? '✅' : '❌');
  console.log('- Access Token:', process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ? '✅' : '❌');
  console.log('- Admin Token:', process.env.SHOPIFY_ADMIN_ACCESS_TOKEN ? '✅' : '❌');
  console.log('- Environment:', process.env.NODE_ENV);

  // 2. Test basic shop query
  try {
    console.log('\nTesting basic shop query...');
    const { body } = await shopifyFetch({
      query: `
        query {
          shop {
            name
            primaryDomain {
              url
            }
          }
        }
      `
    });
    console.log('✅ Shop query successful:', body.data.shop.name);
  } catch (error) {
    console.error('❌ Shop query failed:', error);
  }

  // 3. Test homepage metafields
  try {
    console.log('\nTesting homepage metafields...');
    const { body } = await shopifyFetch({
      query: `
        query {
          page(handle: "homepage") {
            title
            handle
            metafields(first: 5) {
              edges {
                node {
                  namespace
                  key
                }
              }
            }
          }
        }
      `
    });
    
    if (body.data?.page) {
      console.log('✅ Homepage found');
      console.log('Metafields found:', body.data.page.metafields.edges.length);
      body.data.page.metafields.edges.forEach(({ node }: any) => {
        console.log(`- ${node.namespace}.${node.key}`);
      });
    } else {
      console.log('❌ Homepage not found');
    }
  } catch (error) {
    console.error('❌ Metafields query failed:', error);
  }

  // 4. Test testimonials specifically
  try {
    console.log('\nTesting testimonials metafields...');
    const { body } = await shopifyFetch({
      query: `
        query {
          page(handle: "homepage") {
            metafields(
              identifiers: [
                {namespace: "testimonials", key: "title"},
                {namespace: "testimonials", key: "list"}
              ]
            ) {
              key
              namespace
              value
            }
          }
        }
      `
    });

    const testimonials = body.data?.page?.metafields;
    if (testimonials?.length > 0) {
      console.log('✅ Testimonials metafields found:');
      testimonials.forEach((field: any) => {
        console.log(`- ${field.namespace}.${field.key}`);
      });
    } else {
      console.log('❌ No testimonials metafields found');
    }
  } catch (error) {
    console.error('❌ Testimonials query failed:', error);
  }
}

// Run the tests
testShopifyConnection().catch(console.error); 