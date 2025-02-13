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