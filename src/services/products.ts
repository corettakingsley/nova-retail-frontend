
export interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 899,
    description: 'Enjoy immersive sound and everyday comfort.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Accessories',
    price: 1299,
    description: 'Stay connected and keep track of your day.',
  },
  {
    id: 3,
    name: 'Travel Backpack',
    category: 'Lifestyle',
    price: 649,
    description: 'A practical companion for work and travel.',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 749,
    description: 'Bring your favourite music wherever you go.',
  },
  {
    id: 5,
    name: 'Classic Wrist Watch',
    category: 'Accessories',
    price: 999,
    description: 'A timeless design for everyday style.',
  },
  {
    id: 6,
    name: 'Laptop Backpack',
    category: 'Lifestyle',
    price: 799,
    description: 'Carry your essentials comfortably and securely.',
  },
]
