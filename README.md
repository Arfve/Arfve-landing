# Arfve Landing Page

A Next.js landing page integrated with Shopify Storefront API for a headphone product showcase.

## Project Overview

This project is a responsive landing page for Arfve headphones, built with Next.js and integrated with Shopify for content management. The site features multiple sections including hero banners, product features, testimonials, and more - all managed through Shopify's metafields and metaobjects.

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Shopify store with Storefront API access

### Environment Variables
Create a `.env.local` file with the following:
```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
```

### Installation & Development
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Test Shopify connection
npm run test:shopify

# Type checking
npm run typecheck
```

## Project Structure

```
ARFVE-LANDING/
├── src/
│ ├── app/
│ │ ├── faq/
│ │ │ └── page.tsx            # FAQ page with expandable Q&A
│ │ ├── about/                # About page
│ │ ├── crowdfounding/        # Crowdfunding campaign page
│ │ ├── legacy-1/             # Legacy page version
│ │ ├── api/                  # API routes
│ │ ├── globals.css           # Theme colors & responsive styles
│ │ ├── layout.tsx            # Root layout with fonts & header/footer
│ │ └── page.tsx              # Landing page with all sections
│ ├── components/
│ │ ├── Homepage/             # Landing page components
│ │ │ ├── Hero/               # Main banner with CMS content
│ │ │ ├── Features/           # Product features with image & text
│ │ │ ├── AppSection/         # App features with responsive images
│ │ │ ├── ProductShowcase/    # Scrollable product cards grid
│ │ │ ├── Statement/          # Dark themed brand statement
│ │ │ ├── Testimonials/       # Scrollable testimonial cards
│ │ │ └── Newsletter/         # Email signup with dark theme
│ │ ├── Header/               # Navigation with Shopify menu items
│ │ ├── Footer/               # Footer with nav, social & cookie settings
│ │ ├── About/                # About page components
│ │ ├── FAQ/                  # Expandable FAQ with animations
│ │ ├── crowdfunding/         # Crowdfunding page components
│ │ ├── Legacy1/              # Legacy components
│ │ └── icons/                # Icon components
│ ├── lib/
│ │ ├── shopify.ts            # Shopify API client & connection
│ │ ├── getHomePageData.ts    # Fetch homepage content
│ │ ├── getHeaderData.ts      # Fetch navigation menu
│ │ ├── getFooterData.ts      # Fetch footer content
│ │ ├── getAboutData.ts       # Fetch about page content
│ │ ├── getFaqPageData.ts     # Fetch FAQ content
│ │ ├── getCrowdfoundingData.ts # Fetch crowdfunding content
│ │ ├── getLegacyPageData.ts  # Fetch legacy page content
│ │ ├── getReservationData.ts # Fetch reservation data
│ │ └── getSignupCustomer.ts  # Customer signup utility
│ ├── types/
│ │ ├── shopify.ts            # TypeScript interfaces for Shopify data
│ │ ├── features.ts           # Feature component types
│ │ └── legacy.ts             # Legacy page types
│ └── styles/                 # Additional styles
├── public/                   # Static assets
├── .env.local                # Environment variables
├── next.config.ts            # Next.js configuration
├── package.json              # Dependencies and scripts
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── tsconfig.json             # TypeScript configuration
└── eslint.config.mjs         # ESLint configuration
```

## Data Flow

### Shopify Integration
1. Content is stored in Shopify using metafields and metaobjects
2. The `shopify.ts` file configures the Storefront API client
3. Data fetching functions retrieve content using GraphQL queries
4. Components receive and display the data

### Metafield Structure
Content is organized in Shopify metafields with this structure:
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
```typescript
const { body } = await shopifyFetch({
  query: `query GetData { 
    page(handle: "pagename") { 
      metafields(identifiers: [ {namespace: "section", key: "field"} ]) 
    } 
  }`
})
```

## Component Architecture

### Server Components (Default)
- Page components
- Data fetching utilities
- Static sections

### Client Components (Marked with "use client")
- Interactive UI elements (Header, Hero, Testimonials, Newsletter)

## Tech Stack

- **Frontend**: Next.js 15.1.7, React 19.0.0, TypeScript 5.7.3
- **Styling**: Tailwind CSS 3.4.1
- **CMS**: Shopify (using metafields and metaobjects)
- **API**: Shopify Storefront API Client 1.0.4
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## Key Features
- Responsive design with Tailwind CSS
- Dark/Light theme support
- Dynamic content from Shopify CMS
- Type-safe data fetching
- Multiple page templates (Home, About, FAQ, Crowdfunding)

## Shopify CMS Setup

1. Create pages in Shopify:
   - Homepage with metafields for sections
   - FAQ page with Q&A metafields
   - About page with content metafields
   - Crowdfunding page with campaign details

2. Setup Navigation:
   - Create menu with handle "main-menu-1"
   - Add links to pages

3. Configure Metafields:
   - Create appropriate namespace and key structure
   - Set up metaobjects for complex content types

## Deployment

The project is configured for deployment on Vercel or any platform supporting Next.js.