
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ProductCard from './ProductCard.vue'
import { getProducts, type Product } from '@/services/products'

const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')

async function loadProducts() {
  try {
    loading.value = true
    error.value = ''

    const allProducts = await getProducts()
    products.value = allProducts.slice(0, 3)
  } catch (err) {
    console.error('Failed to load featured products:', err)
    error.value = 'Unable to load featured products.'
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)
</script>

<template>
  <section class="featured-section">
    <div class="section-heading">
      <div>
        <span class="eyebrow">CURATED FOR YOU</span>
        <h2>Featured Products</h2>
        <p>Discover some of our favourite picks.</p>
      </div>

      <RouterLink to="/products" class="view-all">
        View all products →
      </RouterLink>
    </div>

    <div v-if="loading" class="product-grid">
  <p>Loading featured products...</p>
</div>

<div v-else-if="error" class="product-grid">
  <p>{{ error }}</p>
</div>

<div v-else class="product-grid">
  <ProductCard
    v-for="product in products"
    :key="product.id"
    :id="product.id"
    :name="product.name"
    :category="product.category"
    :price="product.price"
    :description="product.description"
  />
</div>
  </section>
</template>

<style scoped>
.featured-section {
  max-width: var(--content-width);
  margin: 64px auto;
  padding: 0 24px;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
  margin-bottom: 30px;
}

.eyebrow {
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

h2 {
  margin: 8px 0;
  color: var(--color-primary);
  font-size: 30px;
}

.section-heading p {
  margin: 0;
  color: var(--color-muted);
}

.view-all {
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

@media (max-width: 750px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .section-heading {
    align-items: start;
    flex-direction: column;
  }

  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>
