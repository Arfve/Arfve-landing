import { shopifyFetch } from './shopify'

interface Metafield {
  namespace: string
  key: string
  value: string
}

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
            {namespace: "testimonials", key: "title"},
            {namespace: "testimonials", key: "testimonials_list"},
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

  // console.log('body: ', body);
  

  const metafields = body?.data?.page?.metafields || []

  // Ny kod - hanterar om metafield inte finns (null)

  const findMetafield = (namespace: string, key: string) => metafields?.find((m: Metafield | null) => m && m.namespace === namespace && m.key === key) 


  // 

  
  return {
    hero: {
      title: findMetafield('hero', 'title')?.value || "Legacy 1",
      subtitle: findMetafield('hero', 'subtitle')?.value || "The first earphones with a replaceable battery.",
      buttonText: findMetafield('hero', 'button_text')?.value || "Learn more",
      image: findMetafield('hero', 'image')?.value
    },
    features: {
      title: findMetafield('features', 'title')?.value || "Your best audio companion",
      subtitle: findMetafield('features', 'subtitle')?.value || "But for life",
      featureList: JSON.parse(findMetafield('features', 'feature_list')?.value || '[]'),
      image: findMetafield('features', 'image')?.value
    },
    statement: {
      title: findMetafield('statement', 'title')?.value || "Our statement",
      content: findMetafield('statement', 'content')?.value || "Default statement content"
    },
    testimonials: {
      title: findMetafield('testimonials', 'title')?.value || "What our customers say",
      list: JSON.parse(findMetafield('testimonials', 'testimonials_list')?.value || '[]')
    },
    app: {
      image: findMetafield('app', 'image')?.value
    },
    crowdfunding: {
      title: findMetafield('crowdfunding', 'title')?.value,
      subtitle: findMetafield('crowdfunding', 'subtitle')?.value,
      buttonText: findMetafield('crowdfunding', 'button_text')?.value,
      features: JSON.parse(findMetafield('crowdfunding', 'features')?.value || '[]')
    }
  }
} 