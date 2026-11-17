
<script setup lang="ts">
import { reactive } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useOrderStore } from '@/stores/orders'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const orderStore = useOrderStore()
const router = useRouter()

const deliveryDetails = reactive({
  firstName: '',
  surname: '',
  email: '',
  phone: '',
  streetAddress: '',
  city: '',
  province: '',
  postalCode: '',
})

const provinces = [
  'Eastern Cape',
  'Free State',
  'Gauteng',
  'KwaZulu-Natal',
  'Limpopo',
  'Mpumalanga',
  'Northern Cape',
  'North West',
  'Western Cape',
]

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
  }).format(price)
}


function submitOrder() {
  if (cartStore.items.length === 0) {
    alert('Your shopping cart is empty.')
    return
  }

  orderStore.createOrder(
    deliveryDetails,
    cartStore.items,
    cartStore.cartTotal,
  )
  cartStore.clearCart()

  console.log('Order created:', orderStore.orders[0])

  router.push('/order-confirmation')
}

</script>



<template>
  <section class="checkout-page">
    <div class="page-heading">
      <span class="eyebrow">ALMOST THERE</span>
      <h1>Checkout</h1>
      <p>Review your order before providing your delivery details.</p>
    </div>

    <div v-if="cartStore.items.length > 0" class="checkout-layout">
      <div class="order-review">
        <h2>Your Order</h2>

        <article
          v-for="item in cartStore.items"
          :key="item.id"
          class="order-item"
        >
          <div>
            <h3>{{ item.name }}</h3>
            <p>Quantity: {{ item.quantity }}</p>
          </div>

          <strong>
            {{ formatPrice(item.price * item.quantity) }}
          </strong>
        </article>

        <div class="order-total">
          <span>Total</span>
          <strong>{{ formatPrice(cartStore.cartTotal) }}</strong>
        </div>
      </div>

      <div class="delivery-section">
        <h2>Delivery Details</h2>
        <p>Where should we deliver your order?</p>

        <form class="delivery-form" @submit.prevent="submitOrder">
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name</label>
              <input
                id="firstName"
                v-model.trim="deliveryDetails.firstName"
                type="text"
                minlength="2"
                maxlength="50"
                autocomplete="given-name"
                placeholder="Enter first name"
                required
              />
            </div>

            <div class="form-group">
              <label for="surname">Surname</label>
              <input
                id="surname"
                v-model.trim="deliveryDetails.surname"
                type="text"
                minlength="2"
                maxlength="50"
                autocomplete="family-name"
                placeholder="Enter surname"
                required
              />
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email Address</label>
            <input
              id="email"
              v-model.trim="deliveryDetails.email"
              type="email"
              autocomplete="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Contact Number</label>
            <input
              id="phone"
              v-model.trim="deliveryDetails.phone"
              type="tel"
              autocomplete="tel"
              placeholder="e.g. 0821234567"
              pattern="0[0-9]{9}"
              maxlength="10"
              required
            />
          </div>

          <div class="form-group">
            <label for="streetAddress">Street Address</label>
            <input
              id="streetAddress"
              v-model.trim="deliveryDetails.streetAddress"
              type="text"
              minlength="5"
              maxlength="120"
              autocomplete="street-address"
              placeholder="House number and street name"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="city">City</label>
              <input
                id="city"
                v-model.trim="deliveryDetails.city"
                type="text"
                minlength="2"
                maxlength="60"
                autocomplete="address-level2"
                placeholder="Enter city"
                required
              />
            </div>

            <div class="form-group">
              <label for="province">Province</label>
              <select
                id="province"
                v-model="deliveryDetails.province"
                autocomplete="address-level1"
                required
              >
                <option value="" disabled>Select province</option>
                <option
                  v-for="province in provinces"
                  :key="province"
                  :value="province"
                >
                  {{ province }}
                </option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label for="postalCode">Postal Code</label>
            <input
              id="postalCode"
              v-model.trim="deliveryDetails.postalCode"
              type="text"
              inputmode="numeric"
              autocomplete="postal-code"
              pattern="[0-9]{4}"
              maxlength="4"
              placeholder="e.g. 2000"
              required
            />
          </div>

          <button type="submit" class="continue-button">
            Continue →
          </button>
        </form>
      </div>
    </div>

    <div v-else class="empty-checkout">
      <h2>Your cart is empty</h2>
      <p>Add some products before proceeding to checkout.</p>

      <RouterLink to="/products" class="shop-button">
        Explore Products
      </RouterLink>
    </div>
  </section>
</template>


<style scoped>
.checkout-page {
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

.page-heading p,
.delivery-section p {
  color: var(--color-muted);
}

.checkout-layout {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 30px;
  align-items: start;
}

.order-review,
.delivery-section {
  padding: 28px;
  border: 1px solid var(--color-border);
  border-radius: 10px;
  background: white;
  box-shadow: var(--shadow-card);
}

.order-review h2,
.delivery-section h2 {
  margin-top: 0;
  color: var(--color-primary);
  font-size: 21px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  padding: 18px 0;
  border-bottom: 1px solid var(--color-border);
}

.order-item h3 {
  margin: 0;
  color: var(--color-primary);
  font-size: 15px;
}

.order-item p {
  margin-bottom: 0;
  color: var(--color-muted);
  font-size: 13px;
}

.order-item strong {
  color: var(--color-primary);
  white-space: nowrap;
}

.order-total {
  display: flex;
  justify-content: space-between;
  padding-top: 24px;
  color: var(--color-primary);
  font-size: 19px;
  font-weight: 700;
}



.empty-checkout {
  padding: 60px 20px;
  border: 1px dashed var(--color-border);
  border-radius: 10px;
  background: white;
  text-align: center;
}

.empty-checkout h2 {
  color: var(--color-primary);
}

.empty-checkout p {
  color: var(--color-muted);
}

.shop-button {
  display: inline-block;
  margin-top: 18px;
  padding: 13px 22px;
  border-radius: 7px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
}


.delivery-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin-top: 24px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.form-group label {
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  background: white;
  color: var(--color-text);
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(22, 166, 160, 0.1);
}

.form-group input::placeholder {
  color: #94a3b8;
}

.continue-button {
  width: 100%;
  margin-top: 8px;
  padding: 14px;
  border: none;
  border-radius: 7px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
  cursor: pointer;
}

.continue-button:hover {
  background: var(--color-accent);
}

@media (max-width: 750px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 550px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

</style>
