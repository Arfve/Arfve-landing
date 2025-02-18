import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getPageData() {
  const { body } = await shopifyFetch({
    query: `
      query GetHomepage {
        page(handle: "homepage") {
          title
          metafields(identifiers: [
            {namespace: "app", key: "image"},
            {namespace: "crowdfunding", key: "title"},
            {namespace: "crowdfunding", key: "subtitle"},
            {namespace: "crowdfunding", key: "button_text"},
            {namespace: "crowdfunding", key: "features"}
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

  const metafields: Metafield[] = body?.data?.page?.metafields || [];

  const findMetafield = (namespace: string, key: string) => {
    const field = metafields.find(m => m?.namespace === namespace && m?.key === key);
    if (field?.reference?.image?.url) {
      return field.reference.image.url;
    }
    return field?.value;
  };

  return {
    app: {
      image: findMetafield('app', 'image')
    },
    crowdfunding: {
      title: findMetafield('crowdfunding', 'title'),
      subtitle: findMetafield('crowdfunding', 'subtitle'),
      buttonText: findMetafield('crowdfunding', 'button_text'),
      features: JSON.parse(findMetafield('crowdfunding', 'features') || '[]')
    }
  }
}