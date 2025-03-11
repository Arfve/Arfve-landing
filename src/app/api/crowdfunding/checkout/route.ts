import { shopifyClient } from "@/lib/shopify";
import { NextResponse } from "next/server";

// The product ID for the Legacy 1 headphones in Shopify
// This should be configured in your environment variables in production
const LEGACY_1_PRODUCT_ID = process.env.LEGACY_1_PRODUCT_ID || "gid://shopify/Product/your-product-id";

// Function to ensure the product ID is in the correct format
function formatProductId(productId: string): string {
  // If it's already in the correct format, return it
  if (productId.startsWith("gid://shopify/Product/")) {
    return productId;
  }
  
  // If it's in the format gid://shopify.com/store/storename/products/12345
  const storeProductMatch = productId.match(/gid:\/\/shopify\.com\/store\/.*\/products\/(\d+)/);
  if (storeProductMatch) {
    return `gid://shopify/Product/${storeProductMatch[1]}`;
  }
  
  // If it's just a numeric ID
  if (/^\d+$/.test(productId)) {
    return `gid://shopify/Product/${productId}`;
  }
  
  // If it contains a numeric ID somewhere
  const numericMatch = productId.match(/(\d+)/);
  if (numericMatch) {
    return `gid://shopify/Product/${numericMatch[1]}`;
  }
  
  // Return the original if we can't format it
  return productId;
}

// Function to extract numeric ID from a product or variant ID
function extractNumericId(id: string): string {
  const match = id.match(/\/(?:Product|ProductVariant)\/(\d+)$/);
  if (match) {
    return match[1];
  }
  
  // Try to find any numeric sequence
  const numericMatch = id.match(/(\d+)/);
  if (numericMatch) {
    return numericMatch[1];
  }
  
  throw new Error("Could not extract numeric ID");
}

// Function to create a direct checkout URL
function createDirectCheckoutUrl(variantId: string, quantity: number = 1): string {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com";
  const numericId = extractNumericId(variantId);
  
  // Create a direct checkout URL using Shopify's checkout template
  return `https://${shopDomain}/cart/${numericId}:${quantity}`;
}

export async function POST() {
  try {
    // Format the product ID to ensure it's in the correct format
    const formattedProductId = formatProductId(LEGACY_1_PRODUCT_ID);
    
    // First, get the product variant ID
    try {
      const productResponse = await shopifyClient.request(`
        query getProductVariants($productId: ID!) {
          product(id: $productId) {
            title
            variants(first: 1) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      `, {
        variables: {
          productId: formattedProductId
        }
      });
      
      // Extract the variant ID from the response
      const variantId = productResponse?.data?.product?.variants?.edges?.[0]?.node?.id;
      
      if (variantId) {
        // Try to create a cart first
        try {
          const cartResponse = await shopifyClient.request(`
            mutation cartCreate($input: CartInput!) {
              cartCreate(input: $input) {
                cart {
                  id
                  checkoutUrl
                }
                userErrors {
                  field
                  message
                }
              }
            }
          `, {
            variables: {
              input: {
                lines: [
                  {
                    merchandiseId: variantId,
                    quantity: 1
                  }
                ]
              }
            }
          });
          
          // Check for user errors (like "sold out")
          const userErrors = cartResponse?.data?.cartCreate?.userErrors || [];
          if (userErrors.length > 0) {
            // If the product is sold out or has other errors, use direct checkout URL
            const directCheckoutUrl = createDirectCheckoutUrl(variantId);
            return NextResponse.json({ checkoutUrl: directCheckoutUrl });
          }
          
          // Extract the checkout URL from the cart response
          const checkoutUrl = cartResponse?.data?.cartCreate?.cart?.checkoutUrl;
          
          if (checkoutUrl) {
            return NextResponse.json({ checkoutUrl });
          } else {
            // Fallback to direct checkout URL if no checkout URL is returned
            const directCheckoutUrl = createDirectCheckoutUrl(variantId);
            return NextResponse.json({ checkoutUrl: directCheckoutUrl });
          }
        } catch (
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          cartError
        ) {
          // If cart creation fails, use direct checkout URL
          const directCheckoutUrl = createDirectCheckoutUrl(variantId);
          return NextResponse.json({ checkoutUrl: directCheckoutUrl });
        }
      } else {
        // If we can't get the variant ID, try a direct URL to the product
        const numericId = extractNumericId(formattedProductId);
        const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com";
        const productUrl = `https://${shopDomain}/products/${numericId}`;
        
        return NextResponse.json({ checkoutUrl: productUrl });
      }
    } catch (
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      error
    ) {
      // Fallback: Redirect to the product page directly
      try {
        const numericId = extractNumericId(formattedProductId);
        const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "your-store.myshopify.com";
        const productUrl = `https://${shopDomain}/products/${numericId}`;
        
        return NextResponse.json({ checkoutUrl: productUrl });
      } catch (
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fallbackError
      ) {
        throw new Error("All checkout attempts failed");
      }
    }
  } catch (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    error: any
  ) {
    return NextResponse.json(
      { error: "Failed to create checkout: " + (error.message || "Unknown error") },
      { status: 500 }
    );
  }
} 