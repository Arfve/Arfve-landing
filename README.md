This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.







The exact padding/spacing measurements from Figma
The exact font styles and weights
The exact colors (if different from what we have in globals.css)
4. Any hover states or interactions
Any responsive behavior requirements
Any specific alignment requirements






Check if Shopify API Is Being Called or Fallback Data Is Used
• In your shopify.ts, the fallback data is only used when NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is not set.
• Since you’re seeing an empty array (rather than the fallback items), it means your real Shopify API is being queried.
• Verify that your environment variables (NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN) are correct.
2. Verify the Homepage Handle
• Your query uses:
› page(handle: "homepage") { … }
• Double-check in your Shopify Admin that the page you expect to use for testimonials has its handle set to exactly "homepage".
• If the handle is different (e.g., "home" or something else), the query won’t return any metafields.
Ensure Metafields Exist on the Homepage
• Your GraphQL query looks for metafields with keys: "testimonials.title" and "testimonials.list".
• In Shopify Admin, go to the homepage (or the page you’re targeting) and verify that you’ve created metafields with these exact keys (including casing and punctuation).
• Also make sure these metafields are published and available in the storefront API.
Test the GraphQL Query Directly
• Use a GraphQL explorer (or Postman) with your Shopify Storefront API credentials.
• Run the exact query from getTestimonialsData.ts to see if Shopify returns any metafields.
• This will help determine whether it’s a Shopify configuration issue versus a code issue.
5. Review JSON Parsing and Data Logging
• Since your code attempts to parse the JSON for testimonials.list, confirm that the metafield value in Shopify is a valid JSON string (e.g., a JSON array of testimonials).
• Look for any warnings from the try/catch in getTestimonialsData.ts (though none are mentioned in your logs).
By following these checks, you can determine whether the issue lies with:
• The environment (using live Shopify vs. fallback),
• The query (make sure the page handle and keys match the ones in Shopify), or
• The metafield setup in your Shopify Admin.
Once you verify that the homepage in Shopify holds valid metafields for "testimonials.title" and "testimonials.list" (with the correct key, value format, and publication status), your Testimonials component should receive the expected data.