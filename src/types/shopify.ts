export interface ShopifyMenuItem {
  id: string
  title: string
  url: string
  type: string
}

export interface ShopifyCart {
  id: string
  lines: Array<{
    id: string
    quantity: number
    merchandise: {
      id: string
      title: string
      price: {
        amount: string
        currencyCode: string
      }
    }
  }>
  totalQuantity: number
  cost: {
    totalAmount: {
      amount: string
      currencyCode: string
    }
  }
}

export interface Metafield {
  key: string
  value: string
  namespace: string
}

export interface HeaderData {
  menuItems: ShopifyMenuItem[]
}

export interface FooterData {
  menuItems: ShopifyMenuItem[]
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
  }
}

export interface Testimonial {
  quote: string
  author: string
  role: string
  imageUrl?: string
}

export interface TestimonialsData {
  title: string
  list: Testimonial[]
} 