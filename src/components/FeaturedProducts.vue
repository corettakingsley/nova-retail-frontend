
<script setup lang="ts">
import ProductCard from './ProductCard.vue'

const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    category: 'Electronics',
    price: 899.00,
    description: 'Enjoy immersive sound and everyday comfort.',
  },
  {
    id: 2,
    name: 'Smart Watch',
    category: 'Accessories',
    price: 1299.00,
    description: 'Stay connected and keep track of your day.',
  },
  {
    id: 3,
    name: 'Travel Backpack',
    category: 'Lifestyle',
    price: 649.00,
    description: 'A practical companion for work and travel.',
  },
]
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

    <div class="product-grid">
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
