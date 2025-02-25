import { shopifyFetch } from './shopify';

// Type for Shopify metafield fields
interface Metafield {
  key: string;
  namespace: string;
  value: string;
}

// Type for footer data matching FooterProps in Footer/index.tsx
interface FooterData {
  menuItems: { id: string; title: string; url: string; type: string }[];
  socialLinks: {
    youtube: string;
    instagram: string;
    linkedin: string;
  };
  copyright: string;
  cookieSettingsText: string;
}

export async function getFooterData(): Promise<FooterData> {
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
    `,
  });

  return {
    menuItems: body?.data?.menu?.items || [],
    socialLinks: JSON.parse(
      body?.data?.page?.metafields?.find((m: Metafield) => m.key === 'social_links')?.value ||
      JSON.stringify({
        youtube: '#',
        instagram: '#',
        linkedin: '#',
      })
    ),
    copyright:
      body?.data?.page?.metafields?.find((m: Metafield) => m.key === 'copyright')?.value ||
      '© 2025 Arfve',
    cookieSettingsText:
      body?.data?.page?.metafields?.find((m: Metafield) => m.key === 'cookie_settings_text')
        ?.value || 'Cookie settings',
  };
}