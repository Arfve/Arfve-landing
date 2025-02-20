import { shopifyFetch } from './shopify';
import { AboutPageData, Metafield, TestimonialsData } from '@/types/shopify';

const pageHandle = 'about'; // Define the page handle

export async function getPageData(): Promise<AboutPageData> {
  console.log("Raw Shopify Metafields Response:", getPageData);

  const { body } = await shopifyFetch({
    query: `
      query GetPageData {
        page(handle: "${pageHandle}") {
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
            {namespace: "crowdfunding", key: "features"},
            {namespace: "about", key: "upgrade_title"},
            {namespace: "about", key: "upgrade_description"},
            {namespace: "about", key: "upgrade_image"},
            {namespace: "about", key: "be_more_human_title"},
            {namespace: "about", key: "be_more_human_title2"},
            {namespace: "about", key: "be_more_human_subtitle"},
            {namespace: "about", key: "be_more_human_subtitle2"},
            {namespace: "about", key: "be_more_human_description"},
            {namespace: "about", key: "be_more_human_image"},
            {namespace: "about", key: "why_choose_title"},
            {namespace: "about", key: "why_choose_description"},
            {namespace: "about", key: "why_choose_features"},
            {namespace: "about", key: "bragi"},
            {namespace: "about", key: "testimonials"}
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
  });

  console.log('Metafields Response:', JSON.stringify(body?.data?.page?.metafields, null, 2));

  const metafields = body?.data?.page?.metafields || [];
  console.log('Metafields Array:', metafields);

  const findMetafield = (namespace: string, key: string): string => {
    const field = metafields?.find((m: Metafield) => m?.namespace === namespace && m?.key === key);
    console.log(`Looking for metafield ${namespace}:${key}:`, field);
    if (!field) {
      console.warn(`Metafield not found: ${namespace}:${key}`);
      return ''; // Return empty string or any default value you prefer
    }
    return field?.reference?.image?.url || field?.value || '';
  };

  const parseMetafieldJson = (jsonString: string) => {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return {}; // Return an empty object or fallback value
    }
  };
  

  console.log('Hero Title:', findMetafield('hero', 'title'));
  console.log('Hero Subtitle:', findMetafield('hero', 'subtitle'));

  return {
    hero: {
      title: findMetafield('hero', 'title'),
      subtitle: findMetafield('hero', 'subtitle'),
      buttonText: findMetafield('hero', 'button_text'),
      image: findMetafield('hero', 'image')
    },
    features: {
      title: findMetafield('features', 'title'),
      subtitle: findMetafield('features', 'subtitle'),
      featureList: JSON.parse(findMetafield('features', 'feature_list') || '[]'),
      image: findMetafield('features', 'image')
    },
    statement: {
      title: findMetafield('statement', 'title'),
      content: findMetafield('statement', 'content')
    },
    app: {
      image: findMetafield('app', 'image')
    },
    crowdfunding: {
      title: findMetafield('crowdfunding', 'title'),
      subtitle: findMetafield('crowdfunding', 'subtitle'),
      buttonText: findMetafield('crowdfunding', 'button_text'),
      features: JSON.parse(findMetafield('crowdfunding', 'features') || '[]')
    },
    about: {
      upgrade: {
        title: findMetafield('about', 'upgrade_title'),
        description: findMetafield('about', 'upgrade_description'),
        image: findMetafield('about', 'upgrade_image')
      },
      beMoreHuman: {
        title: findMetafield('about', 'be_more_human_title'),
        title2: findMetafield('about', 'be_more_human_title2'),
        subtitle: findMetafield('about', 'be_more_human_subtitle'),
        subtitle2: findMetafield('about', 'be_more_human_subtitle2'),
        description: findMetafield('about', 'be_more_human_description'),
        image: findMetafield('about', 'be_more_human_image')
      },
      whyChoose: {
        title: findMetafield('about', 'why_choose_title'),
        description: findMetafield('about', 'why_choose_description'),
        // features: (() => {
        //   const rawValue = findMetafield('about', 'why_choose_features');
        //   try {
        //     return JSON.parse(rawValue) || [];
        //   } catch (error) {
        //     console.error("Error parsing why_choose_features metafield:", error, rawValue);
        //     return [];
        //   }
        // })(),
        features: parseMetafieldJson(findMetafield('about', 'why_choose_features') || '[]'),
      },
      bragi: JSON.parse(findMetafield('about', 'bragi') || '[]'),
      testimonials: {
        title: findMetafield('about', 'testimonials_title'),
        list: JSON.parse(findMetafield('about', 'testimonials') || '[]')
      } as TestimonialsData
    }
  };
}
