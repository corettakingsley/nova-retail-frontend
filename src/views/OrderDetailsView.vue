
<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useOrderStore } from '@/stores/orders'

const route = useRoute()
const orderStore = useOrderStore()

const order = computed(() =>
  orderStore.orders.find(
    (item) => item.reference === route.params.reference,
  ) ?? null,
)

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
  <main class="order-details-page">
    <RouterLink to="/orders" class="back-link">
      ← Back to My Orders
    </RouterLink>

    <section v-if="order" class="details-card">
      <header class="details-header">
        <div>
          <span class="label">Order Reference</span>
          <h1>{{ order.reference }}</h1>
        </div>

        <span class="order-status">Order Placed</span>
      </header>

      <div class="order-date">
        <span class="label">Order Date</span>
        <strong>{{ formatDate(order.createdAt) }}</strong>
      </div>

      <section class="details-section">
        <h2>Products Ordered</h2>

        <div
          v-for="item in order.items"
          :key="item.id"
          class="product-row"
        >
          <div>
            <strong>{{ item.name }}</strong>
            <p>Quantity: {{ item.quantity }}</p>
            <p>Unit Price: {{ formatPrice(item.price) }}</p>
          </div>

          <strong>
            {{ formatPrice(item.price * item.quantity) }}
          </strong>
        </div>

        <div class="total-row">
          <span>Order Total</span>
          <strong>{{ formatPrice(order.total) }}</strong>
        </div>
      </section>

      <section class="details-section">
        <h2>Customer Details</h2>

        <p>{{ order.customer.firstName }} {{ order.customer.surname }}</p>
        <p>{{ order.customer.email }}</p>
        <p>{{ order.customer.phone }}</p>
      </section>

      <section class="details-section">
        <h2>Delivery Address</h2>

        <p>{{ order.customer.streetAddress }}</p>
        <p>{{ order.customer.city }}</p>
        <p>
          {{ order.customer.province }},
          {{ order.customer.postalCode }}
        </p>
      </section>
    </section>

    <section v-else class="not-found">
      <h1>Order not found</h1>
      <p>We couldn't find the order you're looking for.</p>

      <RouterLink to="/orders" class="back-button">
        Return to My Orders
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
.order-details-page {
  max-width: 900px;
  margin: 45px auto;
  padding: 20px;
}

.back-link {
  display: inline-block;
  color: #16a6a0;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 22px;
}

.details-card {
  background: white;
  border: 1px solid #e8edf1;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  padding-bottom: 22px;
  border-bottom: 1px solid #e8edf1;
}

.details-header h1 {
  color: #14243a;
  font-size: 24px;
}

.label {
  display: block;
  color: #667085;
  font-size: 13px;
  margin-bottom: 8px;
}

.order-status {
  background: #e5f7f3;
  color: #13877f;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.order-date {
  padding: 22px 0;
}

.order-date strong {
  color: #14243a;
}

.details-section {
  padding: 24px 0;
  border-top: 1px solid #e8edf1;
}

.details-section h2 {
  color: #14243a;
  font-size: 18px;
  margin-bottom: 18px;
}

.details-section p {
  color: #667085;
  font-size: 14px;
  margin-top: 7px;
}

.product-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #e8edf1;
  color: #14243a;
}

.product-row p {
  margin-top: 6px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
  font-size: 18px;
  color: #14243a;
}

.not-found {
  text-align: center;
  background: white;
  padding: 50px 20px;
  border-radius: 12px;
}

.not-found h1 {
  color: #14243a;
  margin-bottom: 12px;
}

.not-found p {
  color: #667085;
  margin-bottom: 22px;
}

.back-button {
  display: inline-block;
  background: #14243a;
  color: white;
  text-decoration: none;
  padding: 12px 22px;
  border-radius: 8px;
}

@media (max-width: 600px) {
  .details-card {
    padding: 20px;
  }

  .details-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .product-row {
    font-size: 13px;
  }
}
</style>
