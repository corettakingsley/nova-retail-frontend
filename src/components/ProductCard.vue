

<script setup lang="ts">
defineProps<{
  id: number
  name: string
  category: string
  price: number
  description: string
}>()
</script>


<template>
  <RouterLink :to="`/products/${id}`" class="product-card">
    <div class="product-image">
      <span class="product-placeholder">N</span>
    </div>

    <div class="product-details">
      <span class="product-category">{{ category }}</span>

      <h3>{{ name }}</h3>

      <p>{{ description }}</p>

      <div class="product-footer">
        <strong>R {{ price.toFixed(2) }}</strong>

        <button type="button" class="add-button">
          Add to Cart +
        </button>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.product-card {
  overflow: hidden;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-medium);
  background: var(--color-surface);
  box-shadow: var(--shadow-card);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(20, 36, 58, 0.12);
}

.product-image {
  min-height: 190px;
  display: grid;
  place-items: center;
  background: linear-gradient(145deg, #e8f2f5, #dce9ef);
}

.product-placeholder {
  color: var(--color-primary);
  font-size: 76px;
  font-weight: 800;
  opacity: 0.25;
}

.product-details {
  padding: 20px;
}

.product-category {
  color: var(--color-accent);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
}

h3 {
  margin: 8px 0;
  color: var(--color-primary);
  font-size: 18px;
}

p {
  min-height: 42px;
  color: var(--color-muted);
  font-size: 13px;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 20px;
}

.product-footer strong {
  color: var(--color-primary);
  font-size: 17px;
}

.add-button {
  padding: 9px 13px;
  border: none;
  border-radius: 6px;
  background: var(--color-primary);
  color: white;
  font-size: 12px;
  font-weight: 600;
}

.add-button:hover {
  background: var(--color-accent);
}
</style>
