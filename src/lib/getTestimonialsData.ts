import { shopifyFetch } from './shopify';
import { TestimonialsData } from '@/types/shopify';

export async function getTestimonialsData(): Promise<TestimonialsData> {
  try {
    const { body } = await shopifyFetch({
      query: `
        query GetTestimonials {
          page(handle: "homepage") {
            titleMetafield: metafield(namespace: "testimonials", key: "title") {
              value
            }
            listMetafield: metafield(namespace: "testimonials", key: "list") {
              value
            }
          }
        }
      `
    });

    const title = body?.data?.page?.titleMetafield?.value || 'What our customers say';
    let list = [];

    try {
      const listRaw = body?.data?.page?.listMetafield?.value || '[]';
      list = JSON.parse(listRaw);
    } catch (error) {
      console.warn('Failed to parse testimonials list JSON:', error);
    }

    return { title, list };
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return {
      title: 'What our customers say',
      list: []
    };
  }
}
