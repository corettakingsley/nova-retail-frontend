

<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import { products } from '@/services/products'

const searchQuery = ref('')

const categories = [
  'All Products',
  'Electronics',
  'Accessories',
  'Lifestyle',
]

const selectedCategory = ref('All Products')

const filteredProducts = computed(() => {
  return products.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'All Products' ||
      product.category === selectedCategory.value

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    return matchesCategory && matchesSearch
  })
})
</script>

<template>
  <section class="products-page">
    <div class="page-heading">
      <span class="eyebrow">THE NOVA COLLECTION</span>
      <h1>Explore Our Products</h1>
      <p>Find something you'll love, all in one place.</p>
    </div>

    <div class="catalogue-toolbar">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="search"
          placeholder="Search products..."
          aria-label="Search products"
        />
      </div>

      <div class="category-filters">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          :class="{ active: selectedCategory === category }"
          @click="selectedCategory = category"
        >
          {{ category }}
        </button>
      </div>
    </div>
    
    
    <div v-if="filteredProducts.length > 0" class="product-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :id="product.id"
        :name="product.name"
        :category="product.category"
        :price="product.price"
        :description="product.description"
      />
    </div>

    <div v-else class="empty-state">
      <h2>No products found</h2>
      <p>Try another search term or select a different category.</p>
    </div>

  </section>
</template>

<style scoped>
.products-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px;
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

h1 {
  margin: 10px 0;
  color: var(--color-primary);
  font-size: 36px;
}

.page-heading p {
  color: var(--color-muted);
  font-size: 16px;
}

.catalogue-toolbar {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 36px;
}

.search-box input {
  width: 100%;
  max-width: 480px;
  padding: 14px 16px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  outline: none;
  background: white;
}

.search-box input:focus {
  border-color: var(--color-accent);
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.category-filters button {
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  border-radius: 7px;
  background: white;
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 600;
}

.category-filters button.active,
.category-filters button:hover {
  border-color: var(--color-primary);
  background: var(--color-primary);
  color: white;
}

@media (max-width: 600px) {
  .products-page {
    padding: 36px 16px;
  }

  h1 {
    font-size: 30px;
  }
}

<style scoped>
/* Your existing CSS stays here */

/* ADD THE NEW CSS BELOW */

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}

.empty-state {
  padding: 60px 20px;
  text-align: center;
  border: 1px dashed var(--color-border);
  border-radius: 10px;
  background: white;
}

.empty-state h2 {
  color: var(--color-primary);
}

.empty-state p {
  color: var(--color-muted);
}

@media (max-width: 750px) {
  .product-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 500px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

</style>
