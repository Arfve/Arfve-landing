import { testConnection } from '../lib/shopify.js'

async function main() {
  console.log('Testing Shopify connection...')
  const success = await testConnection()
  if (success) {
    console.log('✅ Successfully connected to Shopify')
  } else {
    console.log('❌ Failed to connect to Shopify')
  }
}

main() 