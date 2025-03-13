// lib/getProductData.ts
import { shopifyFetch } from "./shopify";

interface ShopifyField {
  key: string;
  value: string;
}

const getFieldValue = (fields: ShopifyField[], key: string): string | null => {
  const field = fields.find((f) => f.key === key);
  return field?.value || null;
};

export async function GetReservationPage() {
  try {
    const { body } = await shopifyFetch({
      query: `
        query GetProductPage {
          page(handle: "product") {
            metafields(identifiers: [{namespace: "product", key: "reference"}]) {
              reference {
                ... on Metaobject {
                  fields {
                    key
                    value
                  }
                }
              }
            }
          }
        }
      `,
    });

    const metaobject = body.data.page.metafields[0].reference;
    const fields: ShopifyField[] = metaobject.fields;

    const productGID = getFieldValue(fields, "product_data");

    const productTSString = getFieldValue(fields, "techspecs");
    let productTS = null;
    if (productTSString) {
      try {
        productTS = JSON.parse(productTSString);
      } catch (err) {
        console.error("Error parsing techspecs JSON:", err);
      }
    }

    if (!productGID) {
      console.error("No product_data field found in the metaobject.");
      return null;
    }

    const { body: productBody } = await shopifyFetch({
      query: `
          query GetProductById($id: ID!) {
    node(id: $id) {
      ... on Product {
        id
        title
        descriptionHtml
        onlineStoreUrl
        images(first: 10) {
          edges {
            node {
              url
              altText
            }
              
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              title
              selectedOptions {
                name
                value
              }
              priceV2 {
                amount
                currencyCode
              }
                image{
                url
                }
            }
          }
        }
      }
    }
  }

      `,
      variables: { id: productGID },
    });

    const product = productBody.data.node;


    return { product, productTS };
  } catch (error) {
    console.error("Error retrieving product data:", error);
    return null;
  }
}
