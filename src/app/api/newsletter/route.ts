// src/app/api/newsletter/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const SHOPIFY_STORE = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN; 
  const SHOPIFY_ACCESS_TOKEN = process.env.SHOPIFY_ACCESS_TOKEN_NEWSLETTER;
  const API_VERSION = "2023-10"; 

  if (!SHOPIFY_STORE || !SHOPIFY_ACCESS_TOKEN) {
    return NextResponse.json({ error: "Miljövariabler saknas" }, { status: 500 });
  }

  interface Customer {
    id: number;
    email: string;
    first_name: string;
    last_name: string;

  }

  let customers: Customer[] = [];
  let url: string | null = `https://${SHOPIFY_STORE}/admin/api/${API_VERSION}/customers.json?limit=250&accepts_marketing=true`;

  try {
    while (url) {
      const response: Response = await fetch(url, {
        headers: {
          "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const errorBody = await response.text();
        return NextResponse.json({ error: errorBody }, { status: response.status });
      }

      const data = await response.json();
      customers = customers.concat(data.customers);

      const linkHeader = response.headers.get("link");
      if (linkHeader && linkHeader.includes('rel="next"')) {
        const nextUrlMatch = linkHeader.match(/<([^>]+)>;\s*rel="next"/);
        url = nextUrlMatch ? nextUrlMatch[1] : null;
      } else {
        url = null;
      }
    }

    return NextResponse.json({ count: customers.length, customers });
  } catch (error: unknown) {
    console.error("Fel vid hämtning från Shopify API:", error);
    return NextResponse.json(
      { error: "Något gick fel när vi hämtade data" },
      { status: 500 }
    );
  }
}
