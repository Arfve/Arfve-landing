# Arfve Headphones Landing Page - Project Map

## Project Overview
- A Next.js landing page for Arfve Headphones.
- Integrates with Shopify via the Storefront API to fetch dynamic content.
- Displays multiple sections: Header, Hero, Features, App, Product Showcase, Statement, Testimonials, Newsletter, and Footer.
- The Testimonials section (currently under development) will use structured data from Shopify metafields.

## Environment & Configuration
- **Environment Variables:**
  - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`: Your Shopify store domain.
  - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`: Shopify Storefront API access token.
- A development fallback in `shopify.ts` provides default testimonial data when credentials aren't set up.

## Data Flow & Structure
- **Data Sources:**
  - Main sections (hero, features, statement, etc.) are fetched using `src/lib/getPageData.ts`.
  - Testimonials will be fetched separately (to be implemented in `src/lib/getTestimonialsData.ts`).
- **Metafield Querying:**
  - Queries use a namespace/key pattern (e.g., for hero: `{namespace: "hero", key: "title"}`).
  - Testimonials data is expected either under the namespace `custom` or `testimonials`, with:
    - `testimonials_title` (string) for the section title.
    - `testimonials_list` (JSON) containing an array of testimonial objects.
- **Testimonial Data Structure:**
  ```typescript
  interface TestimonialData {
    title: string;
    list: Array<{
      quote: string;
      author: string;
      role: string;
      imageUrl?: string;
    }>;
  }
  ```
- **Schema:**
  - Defined in `src/schemas/testimonials/section.json` to validate testimonial items.

## File Structure & Components

### Data Fetching
1. **`src/lib/getPageData.ts`**
   - Fetches general homepage data including hero, features, etc.
   - Testimonials metafields have been removed from this query.
2. **`src/lib/getTestimonialsData.ts` (TO CREATE)**
   - A new file to specifically query testimonials data from Shopify.
   - Expected GraphQL snippet:
     ```graphql
     query GetTestimonials {
       page(handle: "homepage") {
         metafields(first: 10, namespace: "testimonials") {
           edges {
             node {
               id
               namespace
               key
               value
             }
           }
         }
       }
     }
     ```
3. **`src/lib/shopify.ts`**
   - Sets up Shopify Storefront API client.
   - Provides a development fallback if environment variables are missing.

### Components
1. **Header & Footer**
   - Use menu queries and a combined menu/metafields approach (see `getHeaderData.ts` and `getFooterData.ts`).
2. **Testimonials**
   - **`src/components/Testimonials/index.tsx`**:  
     Expects props (`title` and `list`) once testimonials data is properly fetched.  
     Renders a horizontally scrolling container of testimonial cards.
   - **`src/components/Testimonials/TestimonialCard.tsx`**:  
     Renders individual testimonial cards including an image (with Shopify URL conversion), quote, author, and role.
3. **Other Sections**
   - Hero, Features, App Section, Product Showcase, Statement, and Newsletter are implemented and working from similar patterns.

## Design & Styling
- **Color Scheme:**
  - Primary Background: `#FFFFFF`
  - Dark Background: `#090909` (used in the Testimonials section)
  - Gray Shades: Light Gray (`#DEDEDE`), Dark Gray (`#1F1F1F`), Darker Gray (`#090909`)
- **Testimonials Layout:**
  - Container with dark background.
  - Title: 28px, semibold, white text.
  - Cards Container: Horizontally scrollable layout.
  - Individual Cards: 200px × 310px with an image container (200px × 200px) that uses a gray background and displays a placeholder if no image is provided.

## Next Steps
1. **Shopify Metafields Setup:**
   - Create metafields in Shopify for Testimonials:
     - **Namespace:** testimonials (or custom)
     - **Keys:** 
       - `title`: A string for the testimonials section title.
       - `list`: A JSON array for individual testimonial objects.
2. **Implement Testimonials Data Fetching:**
   - Create and test `src/lib/getTestimonialsData.ts` to fetch the testimonials data using the correct namespace/key.
3. **Update the Testimonials Component:**
   - Modify `src/components/Testimonials/index.tsx` as needed once new data is available.
   - Add error handling, responsive design adjustments, and loading states.
4. **Workflow & Quality Assurance:**
   - Merge protection on the master branch.
   - Pull requests must be reviewed by at least one reviewer.
   - Linting, formatting, and testing to run via a GitHub workflow.
   - Deploy a test/staging site for pre-production validation.

## Reference Implementations
- **Navigation:** See `getHeaderData.ts` for a menu-based query.
- **Footer:** See `getFooterData.ts` for a combined menu and metafields query.
- **Shopify Client:** Managed in `src/lib/shopify.ts`.

## Additional Notes
- The project uses TypeScript with Next.js.
- Data is dynamically fetched from Shopify using GraphQL.
- Consistency in design and data patterns is maintained across sections.
- The development fallback in `shopify.ts` ensures that the site displays meaningful data even in local development without proper Shopify credentials.

---

This map should provide a concise yet complete overview for anyone continuing the build tomorrow. If you need further splits or additional details on any part, let me know!