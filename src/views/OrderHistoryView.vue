
<script setup lang="ts">
import { useOrderStore } from '@/stores/orders'
import { RouterLink } from 'vue-router'

const orderStore = useOrderStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
</script>

<template>
  <main class="order-history-page">
    <header class="page-header">
      <h1>My Orders</h1>
      <p>View your previous purchases and order details.</p>
    </header>

    <section v-if="orderStore.orders.length > 0" class="orders-list">
      <RouterLink
        v-for="order in orderStore.orders"
        :key="order.reference"
        :to="`/orders/${order.reference}`"
        class="order-card"
>
        <div class="order-header">
          <div>
            <span class="label">Order Reference</span>
            <h2>{{ order.reference }}</h2>
          </div>

          <span class="order-status">Order Placed</span>
        </div>

        <div class="order-info">
          <div>
            <span class="label">Order Date</span>
            <strong>{{ formatDate(order.createdAt) }}</strong>
          </div>

          <div>
            <span class="label">Items</span>
            <strong>
              {{ order.items.reduce((total, item) => total + item.quantity, 0) }}
            </strong>
          </div>

          <div>
            <span class="label">Order Total</span>
            <strong>{{ formatPrice(order.total) }}</strong>
          </div>
        </div>

        <div class="order-products">
          <h3>Products</h3>

          <div
            v-for="item in order.items"
            :key="item.id"
            class="product-row"
          >
            <span>{{ item.name }} × {{ item.quantity }}</span>
            <strong>{{ formatPrice(item.price * item.quantity) }}</strong>
          </div>
        </div>
      </RouterLink>
    </section>

    <section v-else class="empty-orders">
      <h2>No orders yet</h2>
      <p>Your purchases will appear here once you place an order.</p>
      <RouterLink to="/products" class="shop-button">
        Browse Products
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.order-history-page {
  max-width: 1100px;
  margin: 45px auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  color: #14243a;
  font-size: 30px;
  margin-bottom: 8px;
}

.page-header p {
  color: #667085;
}

.orders-list {
  display: grid;
  gap: 22px;
}

.order-card {
  background: white;
  border: 1px solid #e8edf1;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.04);

  display: block;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.order-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8edf1;
}

.label {
  display: block;
  color: #667085;
  font-size: 13px;
  margin-bottom: 7px;
}

.order-header h2 {
  color: #14243a;
  font-size: 18px;
}

.order-status {
  background: #e5f7f3;
  color: #13877f;
  padding: 7px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.order-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 22px 0;
  border-bottom: 1px solid #e8edf1;
}

.order-info strong {
  color: #14243a;
  font-size: 14px;
}

.order-products {
  padding-top: 20px;
}

.order-products h3 {
  color: #14243a;
  font-size: 16px;
  margin-bottom: 15px;
}

.product-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 10px 0;
  color: #475467;
  font-size: 14px;
}

.product-row strong {
  color: #14243a;
}

.empty-orders {
  text-align: center;
  background: white;
  padding: 55px 20px;
  border-radius: 12px;
}

.empty-orders h2 {
  color: #14243a;
  margin-bottom: 10px;
}

.empty-orders p {
  color: #667085;
  margin-bottom: 22px;
}

.shop-button {
  display: inline-block;
  background: #14243a;
  color: white;
  text-decoration: none;
  padding: 12px 22px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .order-info {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .order-card {
    padding: 18px;
  }

  .order-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-row {
    font-size: 13px;
  }
}
</style>
