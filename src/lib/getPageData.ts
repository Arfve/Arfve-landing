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

  const metafields = body?.data?.page?.metafields || []
  
  return {
    hero: {
      title: metafields.find((m: Metafield) => m.namespace === 'hero' && m.key === 'title')?.value || "Legacy 1",
      subtitle: metafields.find((m: Metafield) => m.namespace === 'hero' && m.key === 'subtitle')?.value || "The first earphones with a replaceable battery.",
      buttonText: metafields.find((m: Metafield) => m.namespace === 'hero' && m.key === 'button_text')?.value || "Learn more",
      image: metafields.find((m: Metafield) => m.namespace === 'hero' && m.key === 'image')?.value
    },
    features: {
      title: metafields.find((m: Metafield) => m.namespace === 'features' && m.key === 'title')?.value || "Your best audio companion",
      subtitle: metafields.find((m: Metafield) => m.namespace === 'features' && m.key === 'subtitle')?.value || "But for life",
      featureList: JSON.parse(metafields.find((m: Metafield) => m.namespace === 'features' && m.key === 'feature_list')?.value || '[]'),
      image: metafields.find((m: Metafield) => m.namespace === 'features' && m.key === 'image')?.value
    },
    statement: {
      title: metafields.find((m: Metafield) => m.namespace === 'statement' && m.key === 'title')?.value || "Our statement",
      content: metafields.find((m: Metafield) => m.namespace === 'statement' && m.key === 'content')?.value || "Default statement content"
    },
    testimonials: {
      title: metafields.find((m: Metafield) => m.namespace === 'testimonials' && m.key === 'title')?.value || "What our customers say",
      list: JSON.parse(metafields.find((m: Metafield) => m.namespace === 'testimonials' && m.key === 'testimonials_list')?.value || '[]')
    },
    app: {
      image: metafields.find((m: Metafield) => m.namespace === 'app' && m.key === 'image')?.value
    },
    crowdfunding: {
      title: metafields.find((m: Metafield) => m.namespace === 'crowdfunding' && m.key === 'title')?.value,
      subtitle: metafields.find((m: Metafield) => m.namespace === 'crowdfunding' && m.key === 'subtitle')?.value,
      buttonText: metafields.find((m: Metafield) => m.namespace === 'crowdfunding' && m.key === 'button_text')?.value,
      features: JSON.parse(metafields.find((m: Metafield) => m.namespace === 'crowdfunding' && m.key === 'features')?.value || '[]')
    }
  }
} 