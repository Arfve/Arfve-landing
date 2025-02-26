import { shopifyFetch } from "./shopify";

// Define what a field from Shopify looks like
interface ShopifyField {
  key: string;
  value: string;
  reference?: {
    image?: {
      url: string;
    };
    fields?: ShopifyField[];
  };
}

type guarantees = {
  buttonText: string | null;
  image: string | null;
  subtitle: string | null;
  title: string ;
};
type reservation = {
  buttonText: string | null;
  image: string | null;
  guarantees: guarantees[] | null; // Gör guarantees till en array
  subtitle: string | null;
  title: string | null;
};
// Function to get the value of a specific key
const getFieldValue = (fields: ShopifyField[], key: string): string | null => {
  const field = fields.find((f) => f.key === key);
  return field && field.value ? field.value : null;
};

interface Guarantee {
  buttonText: string | null;
  image: string | null;
  subtitle: string | null;
  title: string;
}

const parseGuarantees = (guarantees: string): Guarantee[] | null => {
  try {
    return JSON.parse(guarantees);
  } catch (error) {
    console.error("Error parsing guarantees:", error);
    return null;
  }
};

export async function GetReservationPage() {
  const { body } = await shopifyFetch({
    query: `
      query GetReservationPage {
        page(handle: "reservation") {
          metafields(identifiers: [{namespace: "reservation", key: "reference"}]) {
            reference {
              ... on Metaobject {
                fields {
                  key
                  value
                  reference {
                    ... on MediaImage {
                      image {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
  });

  // Check for missing values and return them
  const metafields = body.data.page.metafields[0].reference.fields;

  const buttonText = getFieldValue(metafields, "button_text");
  const guaranteesStr = getFieldValue(metafields, "guarantees");
  const guarantees = guaranteesStr ? parseGuarantees(guaranteesStr) : null;
  const image: string | null = metafields.find((f: ShopifyField) => f.key === "image" && f.reference?.image)
    ?.reference?.image?.url || null;
  const subtitle = getFieldValue(metafields, "subtitle");
  
  const title = getFieldValue(metafields, "title");
if(title !== null){
  console.log(1);
  
}
  // Log the values (or handle them as needed)
  const data: reservation = {
    buttonText,
    guarantees,
    image,
    subtitle,
    title,
  };

  // Return the values
  return {
    data
  };
}
