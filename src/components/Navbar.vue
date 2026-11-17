
<script setup lang="ts">
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <RouterLink to="/" class="brand">
        <span class="brand-icon">N</span>
        <span>nova<span class="brand-highlight">retail</span></span>
      </RouterLink>

      <nav class="nav-links">
  <RouterLink to="/" class="nav-link">Home</RouterLink>
  <RouterLink to="/products" class="nav-link">Products</RouterLink>
  <RouterLink to="/orders" class="nav-link">My Orders</RouterLink>
</nav>

      <div class="nav-actions">
        <RouterLink to="/cart" class="cart-link">
          <span>Cart</span>
          <span class="cart-count">{{ cartStore.totalItems }}</span>
        </RouterLink>
      </div>
    </div>
  </header>
  
  
</template>

<style scoped>
.navbar {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 16px 24px;
}

.navbar-container {
  max-width: var(--content-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-primary);
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.8px;
}

.brand-icon {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 9px;
  background: var(--color-primary);
  color: white;
}

.brand-highlight {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  color: var(--color-muted);
  font-size: 14px;
  font-weight: 600;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--color-accent);
}

.cart-link {
  display: flex;
  align-items: center;
  gap: 9px;
  color: var(--color-primary);
  font-size: 14px;
  font-weight: 600;
}

.cart-count {
  display: grid;
  place-items: center;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  background: var(--color-accent);
  color: white;
  font-size: 12px;
}

@media (max-width: 600px) {
  .navbar {
    padding: 14px 16px;
  }

  .navbar-container {
    gap: 12px;
  }

  .brand {
    font-size: 18px;
  }

  .nav-links {
    gap: 14px;
  }

  .nav-link,
  .cart-link {
    font-size: 12px;
  }
}
</style>
