import { testConnection } from '../lib/shopify'
import { getTestimonialsData } from '../lib/getTestimonialsData'
import { getHeaderData } from '../lib/getHeaderData'
import { TestimonialsData } from '@/types/shopify'

async function testTestimonials() {
  console.log('\nTesting Testimonials Data...')
  try {
    const data = await getTestimonialsData()
    console.log('Testimonials Data:', data)

    // Validate structure
    if (!data.title) {
      console.error('❌ Missing title')
      return false
    }

    if (!Array.isArray(data.list)) {
      console.error('❌ List is not an array')
      return false
    }

    // Validate content
    if (data.list.length === 0) {
      console.warn('⚠️ No testimonials found')
    } else {
      console.log('✅ Found', data.list.length, 'testimonials')
      
      // Validate first item structure
      const first = data.list[0]
      if (!first.quote || !first.author || !first.role) {
        console.error('❌ Invalid testimonial structure')
        return false
      }
    }

    return true
  } catch (error) {
    console.error('❌ Testimonials test failed:', error)
    return false
  }
}

async function main() {
  console.log('Testing Shopify Integration...\n')

  // Test basic connection
  const connected = await testConnection()
  if (!connected) {
    console.error('❌ Failed to connect to Shopify')
    process.exit(1)
  }
  console.log('✅ Connected to Shopify')

  // Test header data (already working)
  const headerData = await getHeaderData()
  if (headerData.menuItems.length > 0) {
    console.log('✅ Header menu items loaded')
  } else {
    console.warn('⚠️ No header menu items found')
  }

  // Test testimonials
  const testimonialsOk = await testTestimonials()
  if (!testimonialsOk) {
    console.error('❌ Testimonials test failed')
    process.exit(1)
  }
  console.log('✅ Testimonials test passed')
}

main().catch(error => {
  console.error('Test failed:', error)
  process.exit(1)
}) 