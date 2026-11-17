
<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}

function increaseQuantity(productId: number, quantity: number) {
  cartStore.updateQuantity(productId, quantity + 1)
}

function decreaseQuantity(productId: number, quantity: number) {
  if (quantity > 1) {
    cartStore.updateQuantity(productId, quantity - 1)
  }
}
</script>

<template>
  <section class="cart-page">
    <div class="page-heading">
      <span class="eyebrow">YOUR NOVA SELECTION</span>
      <h1>Shopping Cart</h1>
      <p>Review your selected products before checkout.</p>
    </div>

    <div v-if="cartStore.items.length > 0" class="cart-layout">
      <div class="cart-items">
        <article
          v-for="item in cartStore.items"
          :key="item.id"
          class="cart-item"
        >
          <div class="item-image">
            <span>N</span>
          </div>

          <div class="item-details">
            <span class="item-category">{{ item.category }}</span>
            <h2>{{ item.name }}</h2>
            <p>{{ formatPrice(item.price) }}</p>

            <div class="quantity-controls">
              <button
                type="button"
                aria-label="Decrease quantity"
                @click="decreaseQuantity(item.id, item.quantity)"
              >
                −
              </button>

              <span>{{ item.quantity }}</span>

              <button
                type="button"
                aria-label="Increase quantity"
                @click="increaseQuantity(item.id, item.quantity)"
              >
                +
              </button>
            </div>
          </div>

          <div class="item-actions">
            <strong>
              {{ formatPrice(item.price * item.quantity) }}
            </strong>

            <button
              type="button"
              class="remove-button"
              @click="cartStore.removeFromCart(item.id)"
            >
              Remove
            </button>
          </div>
        </article>
      </div>

      <aside class="cart-summary">
        <h2>Order Summary</h2>

        <div class="summary-row">
          <span>Total items</span>
          <span>{{ cartStore.totalItems }}</span>
        </div>

        <div class="summary-row total-row">
          <strong>Subtotal</strong>
          <strong>{{ formatPrice(cartStore.cartTotal) }}</strong>
        </div>

        <RouterLink to="/checkout" class="checkout-button">
        Proceed to Checkout →
        </RouterLink>

        <RouterLink to="/products" class="continue-link">
          ← Continue Shopping
        </RouterLink>
      </aside>
    </div>

    <div v-else class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>You haven't added any products to your cart yet.</p>

      <RouterLink to="/products" class="shop-button">
        Explore Products
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 80px;
}

.page-heading {
  margin-bottom: 40px;
}

.eyebrow {
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin: 10px 0;
  color: var(--color-primary);
  font-size: 36px;
}

.page-heading p {
  color: var(--color-muted);
}

.cart-layout {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 32px;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 22px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: white;
}

.item-image {
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: linear-gradient(145deg, #e8f2f5, #dce9ef);
}

.item-image span {
  color: var(--color-primary);
  font-size: 48px;
  font-weight: 800;
  opacity: 0.25;
}

.item-details {
  flex: 1;
}

.item-category {
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
}

.item-details h2 {
  margin: 5px 0;
  color: var(--color-primary);
  font-size: 17px;
}

.item-details p {
  color: var(--color-muted);
  font-size: 14px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 12px;
}

.quantity-controls button {
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-border);
  border-radius: 5px;
  background: white;
  color: var(--color-primary);
  font-size: 18px;
}

.quantity-controls button:hover {
  background: var(--color-primary);
  color: white;
}

.item-actions {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
}

.item-actions strong {
  color: var(--color-primary);
  white-space: nowrap;
}

.remove-button {
  border: none;
  background: none;
  color: #dc5252;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.cart-summary {
  padding: 26px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: white;
  box-shadow: var(--shadow-card);
}

.cart-summary h2 {
  margin-top: 0;
  color: var(--color-primary);
  font-size: 21px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  color: var(--color-muted);
}

.total-row {
  padding-top: 20px;
  border-top: 1px solid var(--color-border);
  color: var(--color-primary);
  font-size: 18px;
}

.checkout-button {
  display: block;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 7px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.2s ease;
}

.checkout-button:hover {
  background: var(--color-accent);
}

.continue-link {
  display: block;
  margin-top: 20px;
  color: var(--color-accent);
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.empty-cart {
  padding: 70px 20px;
  border: 1px dashed var(--color-border);
  border-radius: 12px;
  background: white;
  text-align: center;
}

.empty-icon {
  font-size: 48px;
}

.empty-cart h2 {
  color: var(--color-primary);
}

.empty-cart p {
  margin-bottom: 28px;
  color: var(--color-muted);
}

.shop-button {
  display: inline-block;
  padding: 13px 22px;
  border-radius: 7px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
}

@media (max-width: 800px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .cart-item {
    flex-wrap: wrap;
    gap: 14px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-actions {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
