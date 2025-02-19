import { shopifyFetch } from './shopify'
import { HeaderData, ShopifyMenuItem } from '@/types/shopify'

export async function getHeaderData(): Promise<HeaderData> {
  try {
    const { body } = await shopifyFetch({
      query: `
        query Navigation {
          menu(handle: "main-menu-1") {
            items {
              id
              title
              url
              type
            }
          }
        }
      `
    })

    if (!body?.data?.menu?.items) {
      return {
        menuItems: [
          {
            id: '1',
            title: 'Legacy 1',
            url: '/legacy-1',
            type: 'FRONTPAGE'
          },
          {
            id: '2',
            title: 'Arfve Innovation',
            url: '/innovation',
            type: 'PAGE'
          },
          {
            id: '3',
            title: 'About us',
            url: '/about',
            type: 'PAGE'
          },
          {
            id: '4',
            title: 'FAQ',
            url: '/faq',
            type: 'PAGE'
          }
        ]
      }
    }

    const menuItems = body.data.menu.items.map((item: ShopifyMenuItem) => ({
      ...item,
      url: item.url.replace('https://arfve.myshopify.com', '')
                   .replace('https://arfve.com', '')
                   .replace(/^\/?/, '/')
    }))

    return {
      menuItems
    }
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return { menuItems: [] }
  }
}