
<script setup lang="ts">
import { useOrderStore } from '@/stores/orders'

const orderStore = useOrderStore()
const order = orderStore.orders[0] ?? null

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(amount)
}

function formatDate(date: string) {
  return new Date(date).toLocaleString('en-ZA', {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}
</script>

<template>
  <main class="confirmation-page">
    <section v-if="order" class="confirmation-card">
      <div class="success-icon">✓</div>

      <h1>Thank you for your order!</h1>
      <p class="subtitle">
        Your order has been successfully placed.
      </p>

      <div class="order-reference">
        <span>Order Reference</span>
        <strong>{{ order.reference }}</strong>
      </div>

      <div class="section">
        <h2>Order Summary</h2>

        <div
          v-for="item in order.items"
          :key="item.id"
          class="order-item"
        >
          <div>
            <strong>{{ item.name }}</strong>
            <p>Quantity: {{ item.quantity }}</p>
          </div>

          <strong>
            {{ formatCurrency(item.price * item.quantity) }}
          </strong>
        </div>

        <div class="total-row">
          <span>Total</span>
          <strong>{{ formatCurrency(order.total) }}</strong>
        </div>
      </div>

      <div class="section">
        <h2>Delivery Details</h2>

        <p>{{ order.customer.firstName }} {{ order.customer.surname }}</p>
        <p>{{ order.customer.email }}</p>
        <p>{{ order.customer.phone }}</p>
        <p>{{ order.customer.streetAddress }}</p>
        <p>
          {{ order.customer.city }},
          {{ order.customer.province }},
          {{ order.customer.postalCode }}
        </p>
      </div>

      <p class="order-date">
        Order placed: {{ formatDate(order.createdAt) }}
      </p>

      <RouterLink to="/products" class="continue-button">
        Continue Shopping
      </RouterLink>
    </section>

    <section v-else class="confirmation-card">
      <h1>No order found</h1>
      <p class="subtitle">
        There is no recent order to display.
      </p>

      <RouterLink to="/products" class="continue-button">
        Browse Products
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.confirmation-page {
  max-width: 850px;
  margin: 50px auto;
  padding: 20px;
}

.confirmation-card {
  background: white;
  padding: 40px;
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.success-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: #e5f7f3;
  color: #16a6a0;
  font-size: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

h1 {
  color: #14243a;
  text-align: center;
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #667085;
  margin-bottom: 30px;
}

.order-reference {
  background: #f3f7fa;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-reference span {
  color: #667085;
  font-size: 14px;
}

.order-reference strong {
  color: #16a6a0;
  font-size: 20px;
}

.section {
  margin-top: 30px;
}

.section h2 {
  color: #14243a;
  font-size: 18px;
  margin-bottom: 15px;
}

.order-item,
.total-row {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 14px 0;
  border-bottom: 1px solid #e8edf1;
}

.order-item p,
.section > p {
  color: #667085;
  font-size: 14px;
  margin-top: 5px;
}

.total-row {
  font-size: 18px;
  color: #14243a;
  border-bottom: none;
}

.order-date {
  color: #667085;
  font-size: 13px;
  margin-top: 25px;
}

.continue-button {
  display: block;
  text-align: center;
  background: #14243a;
  color: white;
  text-decoration: none;
  padding: 14px 20px;
  border-radius: 8px;
  margin-top: 25px;
  font-weight: 600;
}

.continue-button:hover {
  background: #203b5c;
}
</style>
