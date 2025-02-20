import { shopifyFetch } from './shopify';
import { TestimonialsData } from '@/types/shopify';

export async function getTestimonialsData(): Promise<TestimonialsData> {
  const { body } = await shopifyFetch({
    query: `
      query GetTestimonials {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "testimonials_section", key: "reference"}
          ]) {
            value
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
    `
  });

  const fields = body?.data?.page?.metafields?.[0]?.reference?.fields || [];
  
  const findField = (key: string) => {
    const field = fields.find((f: { key: string }) => f.key === key);
    if (field?.reference?.image?.url) {
      return field.reference.image.url;
    }
    return field?.value;
  };

  return {
    title: findField('title') || 'What our customers say',
    list: JSON.parse(findField('list') || '[]')
  };
}
