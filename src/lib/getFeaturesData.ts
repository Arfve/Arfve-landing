import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getFeaturesData() {
  const { body } = await shopifyFetch({
    query: `
      query GetFeatures {
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "features", key: "title"},
            {namespace: "features", key: "subtitle"},
            {namespace: "features", key: "feature_list"},
            {namespace: "features", key: "image"}
          ]) {
            key
            namespace
            value
            reference {
              ... on MediaImage {
                id
                image {
                  url
                }
              }
            }
          }
        }
      }
    `
  })

  const metafields = body?.data?.page?.metafields || [];
  
  const findMetafield = (key: string) => {
    const field = metafields.find((m: Metafield) => m?.key === key);
    if (field?.reference?.image?.url) {
      return field.reference.image.url;
    }
    return field?.value;
  };

  return {
    title: findMetafield('title') || 'Your best audio companion. But for life',
    subtitle: findMetafield('subtitle') || 'Lörem ipsum lose nyska rektiga nyfriskjobb eftersom berenar...',
    featureList: JSON.parse(findMetafield('feature_list') || JSON.stringify([
      {
        title: "Reduce your pollution",
        description: "for an exceptional sound"
      },
      {
        title: "Good autonomy",
        description: "for an exceptional sound"
      },
      {
        title: "Good audio",
        description: "for an exceptional sound"
      },
      {
        title: "11mm speakers",
        description: "for an exceptional sound"
      }
    ])),
    image: findMetafield('image')
  }
} 