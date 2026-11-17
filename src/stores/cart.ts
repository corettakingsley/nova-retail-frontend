
import { defineStore } from 'pinia'
import type { Product } from '@/services/products'

export interface CartItem extends Product {
  quantity: number
}

const CART_STORAGE_KEY = 'nova-retail-cart'

function loadCartItems(): CartItem[] {
  try {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)

    return savedCart ? JSON.parse(savedCart) as CartItem[] : []
  } catch {
    return []
  }
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCartItems(),
  }),

  getters: {
    totalItems: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    cartTotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
  },

  actions: {
    saveCart() {
      localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(this.items),
      )
    },


    addToCart(product: Product, quantity: number = 1) {
      const existingItem = this.items.find(
        (item) => item.id === product.id,
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          ...product,
          quantity,
        })
      }

      this.saveCart()
    },

    removeFromCart(productId: number) {
      this.items = this.items.filter(
        (item) => item.id !== productId,
      )

      this.saveCart()
    },

    clearCart() {
      this.items = []
      this.saveCart()
    },

    updateQuantity(productId: number, quantity: number) {
      const item = this.items.find(
        (item) => item.id === productId,
      )

      if (item && quantity >= 1) {
        item.quantity = quantity
        this.saveCart()
      }
    },
  },
})
