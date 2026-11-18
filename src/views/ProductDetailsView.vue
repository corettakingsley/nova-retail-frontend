

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute, RouterLink } from 'vue-router'
import { getProduct, type Product } from '@/services/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()

const quantity = ref(1)

const product = ref<Product | null>(null)
const loading = ref(true)
const error = ref('')

async function loadProduct() {
  try {
    loading.value = true
    error.value = ''

    product.value = await getProduct(Number(route.params.id))
  } catch (err) {
  console.error('Failed to load product:', err)

  if (axios.isAxiosError(err) && err.response?.status === 404) {
    error.value = 'Product not found. It may have been removed.'
  } else {
    error.value = 'Unable to load this product. Please try again later.'
  }
  }
 loading.value = false
  }


onMounted(loadProduct)

function addProductToCart() {
  if (!product.value) return

  cartStore.addToCart(product.value, quantity.value)

  alert(`${product.value.name} added to your cart!`)
}
</script>


<template>
  <section class="details-page">
    <RouterLink to="/products" class="back-link">
      ← Back to Products
    </RouterLink>

    <div v-if="loading" class="not-found">
  <p>Loading product...</p>
</div>

<div v-else-if="error" class="not-found">
  <h1>Unable to load product</h1>
  <p>{{ error }}</p>
  <button type="button" @click="loadProduct">
    Try Again
  </button>
</div>

<div v-else-if="product" class="details-container">
      <div class="product-image">
        <span class="image-placeholder">N</span>
      </div>

      <div class="product-info">
        <span class="category">{{ product.category }}</span>

        <h1>{{ product.name }}</h1>

        <p class="description">
          {{ product.description }}
        </p>

        <div class="price">
          R {{ product.price.toFixed(2) }}
        </div>

        <div class="quantity-section">
          <label for="quantity">Quantity</label>
          <input
            id="quantity"
            v-model.number="quantity"
            type="number"
            min="1"
            />
        </div>

        <button
          type="button"
          class="add-to-cart"
         @click="addProductToCart"
>
         Add to Cart
      </button>
      </div>
    </div>

    <div v-else class="not-found">
      <h1>Product not found</h1>
      <p>Sorry, we couldn't find that product.</p>

      <RouterLink to="/products" class="back-link">
        Return to Products
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.details-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 70px;
}

.back-link {
  display: inline-block;
  margin-bottom: 30px;
  color: var(--color-accent);
  font-weight: 700;
}

.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.product-image {
  min-height: 420px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: linear-gradient(145deg, #e8f2f5, #dce9ef);
}

.image-placeholder {
  color: var(--color-primary);
  font-size: 180px;
  font-weight: 800;
  opacity: 0.2;
}

.category {
  color: var(--color-accent);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.product-info h1 {
  margin: 12px 0;
  color: var(--color-primary);
  font-size: 36px;
}

.description {
  color: var(--color-muted);
  line-height: 1.8;
}

.price {
  margin: 25px 0;
  color: var(--color-primary);
  font-size: 28px;
  font-weight: 800;
}

.quantity-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;
}

.quantity-section label {
  color: var(--color-primary);
  font-weight: 600;
}

.quantity-section input {
  width: 100px;
  padding: 12px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
}

.add-to-cart {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  background: var(--color-primary);
  color: white;
  font-weight: 700;
}

.add-to-cart:hover {
  background: var(--color-accent);
}

.not-found {
  padding: 60px 20px;
  text-align: center;
}

@media (max-width: 750px) {
  .details-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .product-image {
    min-height: 280px;
  }

  .product-info h1 {
    font-size: 28px;
  }
}
</style>
