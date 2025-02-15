import { shopifyFetch } from './shopify'
import { Metafield } from '@/types/shopify'

export async function getPageData() {
  const { body } = await shopifyFetch({
    query: `
      query GetHomepage {
        page(handle: "homepage") {
          title
          metafields(identifiers: [
            {namespace: "hero", key: "title"},
            {namespace: "hero", key: "subtitle"},
            {namespace: "hero", key: "button_text"},
            {namespace: "hero", key: "image"},
            {namespace: "features", key: "title"},
            {namespace: "features", key: "subtitle"},
            {namespace: "features", key: "feature_list"},
            {namespace: "features", key: "image"},
            {namespace: "statement", key: "title"},
            {namespace: "statement", key: "content"},
            {namespace: "app", key: "image"},
            {namespace: "crowdfunding", key: "title"},
            {namespace: "crowdfunding", key: "subtitle"},
            {namespace: "crowdfunding", key: "button_text"},
            {namespace: "crowdfunding", key: "features"}
          ]) {
            key
            namespace
            value
          }
        }
      }
    `
  })

  const metafields: Metafield[] = body?.data?.page?.metafields || [];

  const findMetafield = (namespace: string, key: string) => 
    metafields.find(m => m?.namespace === namespace && m?.key === key)?.value;

  return {
    hero: {
      title: findMetafield('hero', 'title') || "Legacy 1",
      subtitle: findMetafield('hero', 'subtitle') || "The first earphones with a replaceable battery.",
      buttonText: findMetafield('hero', 'button_text') || "Learn more",
      image: findMetafield('hero', 'image')
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