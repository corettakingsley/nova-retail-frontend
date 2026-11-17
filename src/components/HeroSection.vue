
<template>
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">WELCOME TO NOVA RETAIL</span>

      <h1>
        Discover products<br />
        you'll <span>love.</span>
      </h1>

      <p>
        Explore a world of quality products, carefully selected
        to bring you a better shopping experience.
      </p>

      <RouterLink to="/products" class="shop-button">
        Shop Now
        <span aria-hidden="true">→</span>
      </RouterLink>

      <div class="hero-note">
        <span class="accent-dot"></span>
        Your next favourite find starts here.
      </div>
    </div>

    <div class="hero-visual">
      <div class="visual-card">
        <span class="visual-label">NOVA COLLECTION</span>
        <div class="visual-symbol">N</div>
        <span class="visual-caption">A new way to shop.</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  max-width: var(--content-width);
  min-height: 470px;
  margin: 40px auto;
  padding: 64px;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: 48px;
  overflow: hidden;
  border-radius: 18px;
  background: linear-gradient(120deg, #14243a, #203b5c);
  color: white;
}

.hero-content {
  max-width: 520px;
}

.eyebrow {
  color: #55d0c6;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 2px;
}

h1 {
  margin: 20px 0;
  font-size: clamp(38px, 5vw, 58px);
  line-height: 1.12;
  letter-spacing: -2px;
}

h1 span {
  color: #55d0c6;
}

.hero-content p {
  max-width: 430px;
  color: #d2dce8;
  font-size: 16px;
  line-height: 1.8;
}

.shop-button {
  display: inline-flex;
  align-items: center;
  gap: 18px;
  margin-top: 24px;
  padding: 14px 22px;
  border-radius: 8px;
  background: var(--color-accent);
  color: white;
  font-weight: 700;
  transition: transform 0.2s ease, background 0.2s ease;
}

.shop-button:hover {
  background: #118b86;
  transform: translateY(-2px);
}

.hero-note {
  display: flex;
  align-items: center;
  gap: 9px;
  margin-top: 32px;
  color: #d2dce8;
  font-size: 13px;
}

.accent-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #55d0c6;
}

.hero-visual {
  display: grid;
  place-items: center;
}

.visual-card {
  width: 100%;
  max-width: 330px;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  background: linear-gradient(
    145deg,
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.04)
  );
}

.visual-label,
.visual-caption {
  color: #d2dce8;
  font-size: 12px;
  letter-spacing: 2px;
}

.visual-symbol {
  margin: 12px 0;
  color: #55d0c6;
  font-size: 150px;
  font-weight: 800;
  line-height: 1;
}

@media (max-width: 750px) {
  .hero {
    margin: 20px 16px;
    padding: 36px 24px;
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .hero-visual {
    display: none;
  }

  h1 {
    font-size: 42px;
  }
}
</style>
