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

// Function to get the value of a specific key
const getFieldValue = (fields: ShopifyField[], key: string): string | null => {
  const field = fields.find(f => f.key === key);
  return field && field.value ? field.value : null;
};


interface Guarantee {

  id: string;
  description: string;
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

  const buttonText = getFieldValue(metafields, 'button_text');
  const guaranteesStr = getFieldValue(metafields, 'guarantees');
  const guarantees = guaranteesStr ? parseGuarantees(guaranteesStr) : null;
  const image = metafields.find(f => f.key === 'image' && f.reference?.image)?.reference?.image?.url;
  const subtitle = getFieldValue(metafields, 'subtitle');
  const title = getFieldValue(metafields, 'title');

  // Log the values (or handle them as needed)


  // Return the values
  return {
    buttonText,
    guarantees,
    image,
    subtitle,
    title,
  };
}
