
import { defineStore } from 'pinia'
import type { CartItem } from '@/stores/cart'

export interface CustomerDeliveryDetails {
  firstName: string
  surname: string
  email: string
  phone: string
  streetAddress: string
  city: string
  province: string
  postalCode: string
}

export interface Order {
  reference: string
  customer: CustomerDeliveryDetails
  items: CartItem[]
  total: number
  createdAt: string
}

const ORDER_STORAGE_KEY = 'nova-retail-orders'

function loadOrders(): Order[] {
  try {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY)

    if (savedOrders) {
      return JSON.parse(savedOrders) as Order[]
    }

    // Recover orders saved using the previous storage key
    const oldOrder = localStorage.getItem('nova-retail-latest-order')

    if (oldOrder) {
      const previousOrder = JSON.parse(oldOrder) as Order

      const migratedOrders = [previousOrder]

      localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(migratedOrders),
      )

      return migratedOrders
    }

    return []
  } catch {
    return []
  }
}


export const useOrderStore = defineStore('orders', {
  state: () => ({
    orders: loadOrders(),
  }),

  actions: {
    createOrder(
      customer: CustomerDeliveryDetails,
      items: CartItem[],
      total: number,
    ) {
      const newOrder: Order = {
        reference: `NOVA-${Date.now()}`,
        customer: { ...customer },
        items: items.map((item) => ({ ...item })),
        total,
        createdAt: new Date().toISOString(),
      }

      this.orders.unshift(newOrder)

      localStorage.setItem(
        ORDER_STORAGE_KEY,
        JSON.stringify(this.orders),
      )
    },
  },
})
