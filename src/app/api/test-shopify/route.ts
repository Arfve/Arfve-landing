import { testShopifyConnection } from '@/lib/shopify'
import { NextResponse } from 'next/server'

export async function GET() {
  const result = await testShopifyConnection()
  return NextResponse.json(result)
} 