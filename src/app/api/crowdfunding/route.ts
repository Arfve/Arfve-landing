export async function GET() {
const ACCESS_TOKEN = process.env.CROWDFUNDING_ADMIN_API;
const SHOP = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

if (!ACCESS_TOKEN) {
  throw new Error("Missing ACCESS_TOKEN");
}

const url = `https://${SHOP}/admin/api/2023-10/customers.json`;

try {
  console.log("Welcome to our backend!");
  
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": ACCESS_TOKEN,
    },
  });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();


    return Response.json(data.customers.length);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    return new Response(JSON.stringify({ error: "Error fetching customers" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
