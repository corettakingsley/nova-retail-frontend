
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/views/ProductsView.vue'),
    },
    {
      path: '/products/:id',
      name: 'product-details',
      component: () => import('@/views/ProductDetailsView.vue'),
      props: true,
    },

    {
      path: '/order-confirmation',
      name: 'order-confirmation',
      component: () => import('@/views/OrderConfirmationView.vue'),
    },

    {
  path: '/orders',
  name: 'order-history',
  component: () => import('@/views/OrderHistoryView.vue'),
},

    {
  path: '/orders/:reference',
  name: 'order-details',
  component: () => import('@/views/OrderDetailsView.vue'),
},

    {
       path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
    },
  ],
})

export default router
