import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getPageData() {
  const { body } = await shopifyFetch({
    query: `
      query GetPageData {
        page(handle: "${pageHandle}") {
          title
          metafields(identifiers: [
            {namespace: "app", key: "image"},
            {namespace: "crowdfunding", key: "title"},
            {namespace: "crowdfunding", key: "subtitle"},
            {namespace: "crowdfunding", key: "button_text"},
            {namespace: "crowdfunding", key: "features"},
            {namespace: "about3",key: "title"}

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
    hero: {
      title: findMetafield('hero', 'title') || 'Legacy 1',
      subtitle: findMetafield('hero', 'subtitle') || 'The first earphones with a replaceable battery.',
      buttonText: findMetafield('hero', 'button_text') || 'Learn more',
      image: findMetafield('hero', 'image') || null
    },
    features: {
      title: findMetafield('features', 'title') || "Your best audio companion",
      subtitle: findMetafield('features', 'subtitle') || "But for life",
      featureList: JSON.parse(findMetafield('features', 'feature_list') || '[]'),
      image: findMetafield('features', 'image')
    },
    statement: {
      title: findMetafield('statement', 'title') || "Our statement",
      content: findMetafield('statement', 'content') || "Default statement content"
    },
    app: {
      image: findMetafield("app", "image"),
    },
    crowdfunding: {
      title: findMetafield("crowdfunding", "title"),
      subtitle: findMetafield("crowdfunding", "subtitle"),
      buttonText: findMetafield("crowdfunding", "button_text"),
      features: JSON.parse(findMetafield("crowdfunding", "features") || "[]"),
    },
    about3: {
      title: findMetafield("about3", "title"),
    },
  };
}
