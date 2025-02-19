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












arfve-landing/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx        # Root layout with font configurations
│   │   └── page.tsx          # Homepage component
│   ├── components/
│   │   ├── AboutHero1/
│   │   ├── AboutHero2/
│   │   ├── AboutHero3/
│   │   ├── AboutHero4/
│   │   ├── AppSection/       # App showcase component
│   │   ├── Features/         # Product features section
│   │   ├── Footer/           # Site footer with navigation and social links
│   │   ├── Header/           # Site header with navigation
│   │   ├── Hero/            # Main hero section
│   │   ├── Newsletter/       # Newsletter subscription component
│   │   ├── ProductShowcase/  # Product features grid
│   │   ├── Statement/        # Company statement section
│   │   └── Testimonials/     # Customer testimonials section
│   ├── lib/
│   │   ├── getAboutPageData.ts
│   │   ├── getFooterData.ts  # Footer data fetching
│   │   ├── getHeaderData.ts  # Header data fetching
│   │   ├── getPageData.ts    # Main page data fetching
│   │   ├── getTestimonialsData.ts
│   │   └── shopify.ts        # Shopify client configuration
│   ├── scripts/
│   │   └── test-shopify-connection.ts
│   └── types/
│       └── shopify.ts        # TypeScript interfaces for Shopify data
├── public/
│   └── logo.svg
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json






# Arfve Landing Page Project Structure

## Core Configuration Files
- `next.config.ts`: Next.js configuration
  - Configures image domains for Shopify CDN
  - Handles remote patterns for external images

- `tailwind.config.ts`: Tailwind CSS configuration
  - Custom color scheme variables
  - Font family configurations (Inter)
  - Custom spacing and typography settings
  - Responsive design breakpoints

- `package.json`: Project dependencies and scripts
  - Next.js 15.1.7
  - React 19.0.0
  - Shopify Storefront API client
  - Development utilities (TypeScript, ESLint)
  - Custom scripts including Shopify connection testing

## Source Directory (`src/`)
### App Directory (`src/app/`)
- Modern Next.js App Router structure
- `layout.tsx`: Root layout with font configurations (Geist, Inter)
- `page.tsx`: Homepage component assembling all sections
- `globals.css`: Global styles and CSS variables

### Components Directory (`src/components/`)
Organized by feature sections:
1. Hero Sections
   - AboutHero1-4: About page hero variations
   - Hero: Main landing page hero

2. Content Sections
   - AppSection: App showcase
   - Features: Product features display
   - ProductShowcase: Product demonstration
   - Statement: Company statement
   - Testimonials: Customer reviews

3. Layout Components
   - Header: Site navigation
   - Footer: Site footer with menus
   - Newsletter: Email subscription






## Data Layer (`src/lib/`)
- **shopify.ts**: Core Shopify client configuration
  - Handles API client setup
  - Environment variable management
  - Development fallbacks
  
- **Data Fetching Utilities**:
  - `getPageData.ts`: Main homepage content
  - `getHeaderData.ts`: Navigation menu
  - `getFooterData.ts`: Footer content and social links
  - `getTestimonialsData.ts`: Testimonials section
  - `getAboutPageData.ts`: About page content

## Component Structure (`src/components/`)
1. **Layout Components**
   - Header: Site navigation with mobile responsiveness
   - Footer: Site footer with dynamic menu and social links
   
2. **Page Sections**
   - Hero: Main landing section
   - Features: Product features grid
   - AppSection: App showcase
   - Statement: Company statement
   - ProductShowcase: Product display grid
   - Newsletter: Email subscription
   - AboutHero1-4: About page variations

## Types (`src/types/`)
- `shopify.ts`: TypeScript interfaces for:
  - Metafields
  - Navigation items
  - Component props
  - API responses




# Data Flow and Component Integration

## Shopify Integration
### Metafield Structure
- Each component's data is stored in Shopify metafields
- Namespace organization:
  ```typescript
  {
    hero: { title, subtitle, button_text, image }
    features: { title, subtitle, feature_list, image }
    statement: { title, content }
    app: { image }
    crowdfunding: { title, subtitle, button_text, features }
    footer: { copyright, cookie_settings_text, social_links }
    testimonials: { title, list }
  }
  ```

### Data Fetching Pattern
1. **Base Query Structure**:typescript
const { body } = await shopifyFetch({
query: query GetData { page(handle: "pagename") { metafields(identifiers: [ {namespace: "section", key: "field"} ]) } }
})

2. **Error Handling**:
- Fallback data for development
- Type-safe error responses
- Console warnings for debugging

## Component Data Flow
1. **Page Level** (`src/app/page.tsx`):typescript
export default async function Page() {
const { menuItems } = await getHeaderData()
const pageData = await getPageData()
const footerData = await getFooterData()
// Component props are passed from here
}

2. **Component Level** (`src/components/Hero.tsx`):typescript
export default function Hero({ title, subtitle, buttonText, image }: HeroProps) {
// Component logic and rendering
}






## Component Architecture
### Data Components
- Server Components (default)
  - Page components
  - Data fetching utilities
  - Static sections

### Client Components
Marked with "use client":
- Header (for mobile menu)
- Hero (for interactions)
- Testimonials (for carousel)
- Newsletter (for form handling)







////////////////INFO/////////////////

Key Structure and Components
App Router: Uses the modern Next.js App Router structure.

TypeScript: Fully typed, including Shopify data interfaces.

Tailwind CSS: Custom configured for responsive design.

Shopify Integration: Uses Shopify Storefront API for content management.

Core Directories
src/app/: Contains the main page and layout components.

src/components/: Houses all reusable components, organized by feature.

src/lib/: Data fetching utilities and Shopify client configuration.

src/types/: TypeScript interfaces for Shopify data and component props.

Data Flow
Data is stored in Shopify metafields, organized by component namespaces.

Server-side data fetching occurs in page components and utility functions.

Data is passed down to components as props.

Component Architecture
Mostly server components for static content and data fetching.

Client components (marked with "use client") for interactive elements.

Key Files
next.config.ts: Configures image domains and remote patterns.

tailwind.config.ts: Custom color scheme, typography, and responsive breakpoints.

src/lib/shopify.ts: Core Shopify client configuration.