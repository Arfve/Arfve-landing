import { shopifyFetch } from './shopify'

interface FooterMetafields {
  social_links?: {
    youtube: string;
    instagram: string;
    linkedin: string;
  };
  copyright?: string;
  cookie_settings_text?: string;
}

export async function getFooterData() {
  const { body } = await shopifyFetch({
    query: `
      query GetFooter {
        menu(handle: "footer-menu") {
          items {
            id
            title
            url
            type
          }
        }
        page(handle: "homepage") {
          metafields(identifiers: [
            {namespace: "footer", key: "copyright"},
            {namespace: "footer", key: "cookie_settings_text"},
            {namespace: "footer", key: "social_links"}
          ]) {
            key
            namespace
            value
          }
        }
      }
    `
  })

  return {
    menuItems: body?.data?.menu?.items || [],
    socialLinks: JSON.parse(
      body?.data?.page?.metafields?.find((m: any) => m.key === 'social_links')?.value || 
      JSON.stringify({
        youtube: '#',
        instagram: '#',
        linkedin: '#'
      })
    ),
    copyright: body?.data?.page?.metafields?.find((m: any) => m.key === 'copyright')?.value || '© 2025 Arfve',
    cookieSettingsText: body?.data?.page?.metafields?.find((m: any) => m.key === 'cookie_settings_text')?.value || 'Cookie settings'
  }
} 