export type CartItem = {
    id: number
    productId: number
    amount: number
}

export type Product = {
    id: number
    name: string
    brand: string
    category: string
    price: number
    weight: number
    ingredients: string
    calories: number
    flavor: string
    is_gluten_free: boolean
    is_vegan: boolean
    availability: string
  }