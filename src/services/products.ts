import api from './api'

export interface ProductResponse {
  id: number
  name: string
  description: string | null
  price: number
  stock_quantity: number
  category_id: number | null
  image_url: string | null
  is_active: boolean
}

export interface CategoryResponse {
  id: number
  name: string
  description: string | null
}

// Frontend product structure
export interface Product {
  id: number
  name: string
  category: string
  price: number
  description: string
}

// Retrieve all active products
export async function getProducts(): Promise<Product[]> {
  const response = await api.get<ProductResponse[]>('/api/products/')

  const categoriesResponse = await api.get<CategoryResponse[]>('/api/categories/')

  const categories = categoriesResponse.data

  return response.data.map((product) => ({
    id: product.id,
    name: product.name,
    category:
      categories.find((category) => category.id === product.category_id)?.name
      ?? 'Uncategorised',
    price: Number(product.price),
    description: product.description ?? '',
  }))
}

// Retrieve one active product
export async function getProduct(productId: number): Promise<Product> {
  const response = await api.get<ProductResponse>(
    `/api/products/${productId}`,
  )

  const product = response.data

  let category = 'Uncategorised'

  if (product.category_id !== null) {
    const categoriesResponse = await api.get<CategoryResponse[]>('/api/categories/')

    category =
      categoriesResponse.data.find(
        (item) => item.id === product.category_id,
      )?.name ?? 'Uncategorised'
  }

  return {
    id: product.id,
    name: product.name,
    category,
    price: Number(product.price),
    description: product.description ?? '',
  }
}