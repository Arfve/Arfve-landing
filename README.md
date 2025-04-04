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
CROWDFUNDING_ADMIN_API=your-admin-api-token
LEGACY_1_PRODUCT_ID=gid://shopify/Product/your-product-id
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
│ │ │ ├── page.tsx            # Main crowdfunding page
│ │ │ └── reservation/        # Reservation subpage for crowdfunding
│ │ │   └── page.tsx          # Reservation form and guarantees
│ │ ├── legacy-1/             # Legacy page version
│ │ ├── api/                  # API routes
│ │ │ └── crowdfunding/       # Crowdfunding API endpoints
│ │ │   ├── route.ts          # API for fetching customer count
│ │ │   └── checkout/         # Checkout API endpoint
│ │ │     └── route.ts        # Creates Shopify checkout and returns URL
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
│ │ │ ├── brandStory.tsx      # Video hero section with overlay text
│ │ │ ├── signUpSection.tsx   # Email signup with customer counter
│ │ │ ├── industryEndorsements.tsx # Industry testimonials grid
│ │ │ ├── dummyBuild.tsx      # Placeholder content sections
│ │ │ └── CheckoutButton.tsx  # Button that redirects to Shopify checkout
│ │ ├── Legacy1/              # Legacy components
│ │ └── icons/                # Icon components
│ ├── lib/
│ │ ├── shopify.ts            # Shopify API client & utilities
│ │ ├── getHomePageData.ts    # Fetch homepage content
│ │ ├── getHeaderData.ts      # Fetch navigation menu
│ │ ├── getFooterData.ts      # Fetch footer content
│ │ ├── getAboutData.ts       # Fetch about page content
│ │ ├── getFaqPageData.ts     # Fetch FAQ content
│ │ ├── getCrowdfoundingData.ts # Fetch crowdfunding content
│ │ ├── getReservationData.ts # Fetch reservation page data
│ │ ├── getLegacyPageData.ts  # Fetch legacy page content
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
The project uses a centralized data fetching approach with reusable utilities:

```typescript
// Generic data fetching with error handling
const data = await fetchShopifyData<DataType>(query, variables, defaultValue);

// Generic metafield section parser
const section = parseMetafieldSection<SectionType>(fields, "section_key", customParsers);
```

## Crowdfunding Page Implementation

The crowdfunding page is a key feature of the site, designed to support the product's crowdfunding campaign with multiple interactive sections.

### Page Structure
The crowdfunding page (`/crowdfounding/page.tsx`) consists of several key components:
- **Brand Story**: Hero section with background video and overlay text
- **Sign-Up Section**: Email capture with real-time customer counter
- **Product Sections**: Multiple content blocks showcasing product features
- **Industry Endorsements**: Grid of testimonials from industry professionals

### Reservation Flow
The crowdfunding campaign includes a reservation system:
1. Users enter their email in the sign-up section
2. They are directed to the reservation page (`/crowdfounding/reservation/page.tsx`)
3. The reservation page displays product guarantees and confirmation details
4. Users click the "Reserve Legacy 1 Now" button to proceed to Shopify checkout
5. The checkout is created via the Shopify Storefront API and the user is redirected

### Shopify Checkout Integration
The crowdfunding page integrates with Shopify's checkout system:
1. The `CheckoutButton` component triggers an API call when clicked
2. The `/api/crowdfunding/checkout` endpoint creates a checkout in Shopify
3. The API automatically formats the product ID and fetches the product's default variant ID
4. The checkout includes the Legacy 1 product with a $1 reservation price
5. The user is redirected to the Shopify checkout URL to complete their reservation
6. After payment, the order is processed through Shopify's standard workflow

#### Product ID Format
The checkout API supports multiple product ID formats:
- Standard Shopify format: `gid://shopify/Product/12345678901234`
- Store URL format: `gid://shopify.com/store/storename/products/12345678901234`
- Numeric ID only: `12345678901234`

The API automatically converts any of these formats to the standard Shopify format required by the Storefront API.

### Required Shopify Setup
To enable the checkout integration:
1. Create a product in Shopify for the Legacy 1 headphones
2. Set the product price to $1 for the reservation
3. Add product details, images, and description
4. Get the product ID from Shopify and add it to your environment variables:
   ```
   LEGACY_1_PRODUCT_ID=gid://shopify/Product/your-product-id
   ```
   or any of the supported formats - the API will handle the conversion
5. The variant ID is automatically detected by the API

### Data Management
Crowdfunding data is managed through Shopify metafields:
- `getCrowdfoundingData.ts` fetches the main page content
- `getReservationData.ts` fetches the reservation page content
- Data is structured using TypeScript interfaces for type safety

### API Integration
The crowdfunding page includes API integration:
- `/api/crowdfunding/route.ts` connects to Shopify Admin API
- Retrieves real-time customer count for the campaign
- Uses session storage to cache API responses for performance
- `/api/crowdfunding/checkout/route.ts` creates Shopify checkouts

### Component Architecture
The crowdfunding components follow a modular structure:
- `brandStory.tsx`: Video hero with text overlay
- `signUpSection.tsx`: Email capture with customer counter
- `industryEndorsements.tsx`: Testimonial grid with images
- `dummyBuild.tsx`: Reusable content section template
- `CheckoutButton.tsx`: Client component that handles checkout redirection

### Shopify CMS Setup for Crowdfunding
1. Create a "crowdfunding" page in Shopify with metafields
2. Set up metaobjects for complex content types:
   - Brand story with video URL and overlay text
   - Sign-up section with button text and form fields
   - Industry endorsements with images and testimonials
3. Configure the reservation page with guarantees metaobject

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
- Shopify checkout integration for crowdfunding reservations

## Recent Code Improvements

### Checkout API Enhancements
- Implemented robust product ID format handling to support multiple formats:
  - Standard Shopify format: `gid://shopify/Product/12345678901234`
  - Store URL format: `gid://shopify.com/store/storename/products/12345678901234`
  - Numeric ID only: `12345678901234`
- Added a `formatProductId` function to automatically convert any product ID format to the standard Shopify format
- Created a `createVariantId` function to properly derive variant IDs from product IDs
- Added detailed logging for product ID processing to aid in debugging
- Improved error handling with nested try/catch blocks for better error recovery
- Updated environment variables with the correct product ID format

### Code Cleanup and Optimization
- Removed unnecessary console logs throughout the codebase while preserving essential error logs:
  - Cleaned up logs in data fetching utilities (`getLegacyPageData.ts`, `getReservationData.ts`, `getCrowdfoundingData.ts`, `getFaqPageData.ts`)
  - Removed debug logs from components (`brandStory.tsx`)
  - Cleaned up API routes (`crowdfunding/route.ts`, `crowdfunding/checkout/route.ts`)
  - Maintained important error logs for debugging purposes
- Fixed unused variables in error handling (using underscore convention for intentionally unused parameters)
- Retained connection status logs in `shopify.ts` for debugging Shopify integration issues

### Data Fetching Enhancements
- Added generic `fetchShopifyData` function for consistent error handling
- Created reusable `parseMetafieldSection` utility to reduce code duplication
- Improved type safety with proper TypeScript interfaces
- Added default values for missing data

### Type System Improvements
- Consolidated Shopify types to avoid duplication
- Added proper return types to all functions
- Improved component prop typing

### Error Handling
- Added consistent error handling across all data fetching functions
- Added proper null checks in components
- Improved fallback handling for missing data

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

4. Setup Products for Crowdfunding:
   - Create a product for the Legacy 1 headphones
   - Set the price to $1 for reservations
   - Configure product details and images
   - Note the product ID for environment variables
   - The variant ID is automatically detected by the API

## Deployment

The project is configured for deployment on Vercel or any platform supporting Next.js.

## Survey Implementation

The site includes a comprehensive user survey system designed to gather feedback and insights from potential customers. This data helps shape product development and marketing strategies.

### Survey Features
- **18-Question Survey**: Covers demographics, user preferences, product usage, and environmental concerns
- **Multiple Question Types**: Supports radio buttons, checkboxes, text areas, and email inputs
- **Validation**: Client-side validation ensures all required fields are completed
- **Skip Options**: Allows users to skip certain questions (like open-ended feedback)
- **Anonymous Option**: Users can choose to submit feedback anonymously
- **Thank You Page**: Displays a thank you message after successful submission

### Survey Flow
1. Users access the survey at `/survey`
2. They complete the 18-question form covering:
   - Demographics (age, gender)
   - Product usage (what they use earbuds for, preferred brands)
   - Feature preferences (battery life, sound quality, etc.)
   - Environmental concerns and sustainability preferences
   - Purchasing intentions
   - Contact information (optional)
3. Upon submission, data is validated client-side
4. If validation passes, data is sent to the `/api/survey` endpoint
5. The API stores responses in a MySQL database
6. Users see a thank you message with next steps

### Survey Data Structure
The survey questions are defined in `src/data/questions.json` with the following structure:
```typescript
interface Question {
  id: string;           // Unique identifier (e.g., "q1")
  text: string;         // Question text
  type: string;         // Question type (radio, checkbox, textarea, email)
  options?: string[];   // Available options for radio/checkbox questions
  otherOption?: boolean; // Whether to include an "Other" option
  likert?: boolean;     // Whether it's a Likert scale question
  Choice?: string;      // Description of choice type (e.g., "Single Choice")
}
```

### Database Integration
- Survey responses are stored in a MySQL database
- The database connection is configured in `src/lib/db.ts`
- The API endpoint handles data validation and storage
- Multiple choice answers are converted to comma-separated strings for storage

### Survey Components
- `SurveyForm.tsx`: Renders the survey form with all question types
- `EndSurvey.tsx`: Displays the thank you message after submission
- `page.tsx`: Manages form state, validation, and submission

### Required Database Setup
To enable the survey functionality:
1. Set up a MySQL database
2. Create a table named `usersfromsurvey` with columns for each question (Q1-Q18)
3. Configure database connection in environment variables:
   ```
   DB_HOST=your-db-host
   DB_USER=your-db-user
   DB_PASSWORD=your-db-password
   DB_NAME=your-db-name
   ```

### Survey Analytics
The collected data can be used for:
- Understanding customer demographics
- Identifying key feature preferences
- Gauging interest in sustainability features
- Building an email list for marketing
- Informing product development decisions

### AWS RDS Database Setup
The survey responses are stored in an AWS RDS MySQL database:

1. **Create an AWS RDS MySQL instance**:
   - Use the AWS Free Tier for cost-effective development
   - Select MySQL as the database engine
   - Configure with appropriate instance size (t2.micro for free tier)
   - Set up a secure master username and password

2. **Configure Security**:
   - Set up security groups to allow MySQL connections (port 3306) from your application
   - For development, you can allow connections from specific IP addresses
   - For production, consider using more restrictive security measures

3. **Database Schema**:
   - Create the `usersfromsurvey` table with columns for each question:
   ```sql
   CREATE TABLE usersfromsurvey (
       id INT AUTO_INCREMENT PRIMARY KEY,
       Q1 VARCHAR(255),
       Q2 VARCHAR(255),
       Q3 VARCHAR(255),
       Q4 VARCHAR(255),
       Q5 TEXT,
       Q6 TEXT,
       Q7 TEXT,
       Q8 VARCHAR(255),
       Q9 TEXT,
       Q10 VARCHAR(255),
       Q11 VARCHAR(255),
       Q12 VARCHAR(255),
       Q13 VARCHAR(255),
       Q14 VARCHAR(255),
       Q15 VARCHAR(255),
       Q16 TEXT,
       Q17 TEXT,
       Q18 VARCHAR(255),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. **Environment Variables**:
   - Set the following environment variables in your `.env.local` file:
   ```
   DB_HOST=your-rds-endpoint.region.rds.amazonaws.com
   DB_USER=your-db-username
   DB_PASSWORD=your-db-password
   DB_NAME=your-database-name
   ```

5. **Backup and Maintenance**:
   - Enable automated backups in RDS settings
   - Consider setting up a maintenance window during off-peak hours
   - Monitor database performance using AWS CloudWatch

### Survey Data Management
- The API endpoint at `/api/survey` handles data validation and storage
- Multiple choice answers are converted to comma-separated strings for storage
- The database connection is configured in `src/lib/db.ts` with proper error handling
- Environment variables are validated at application startup