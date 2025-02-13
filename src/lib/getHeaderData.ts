import { shopifyFetch } from './shopify'

export async function getHeaderData() {
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

    return {
      menuItems: body.data.menu.items
    }
  } catch (error) {
    console.error('Error fetching navigation:', error)
    return { menuItems: [] }
  }
} 