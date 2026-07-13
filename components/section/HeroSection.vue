<script setup lang="ts">
import type { Product } from '~/domain/types'
import { formatPrice, monogram } from '~/utils/format'

/** The featured product powers the hero visual on the right. */
const props = defineProps<{ featured: Product | null }>()
const emit = defineEmits<{ play: [Product]; snap: [Product] }>()
</script>

<template>
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <span class="eyebrow">Menu trưng bày · Không đặt online</span>
        <h1 class="display">
          Ăn vặt <span class="hl">siêu ngon</span>,<br /><em>mê là ghiền!</em>
        </h1>
        <p class="lead">
          Lướt xem các món TÓP TÉP đang có, bấm vào để xem clip món ăn. Ưng món nào
          thì chụp lại màn hình rồi nhắn tin cho tụi mình — khỏi cần điền form, khỏi
          thanh toán online.
        </p>
        <div class="cta-row">
          <ContactButtons />
          <AppButton variant="ghost" href="#menu">Xem menu ↓</AppButton>
        </div>
      </div>

      <div v-if="featured" class="hero-feature">
        <img
          v-if="featured.thumbnail_url"
          :src="featured.thumbnail_url"
          :alt="featured.name"
          class="feature-cover"
          fetchpriority="high"
          decoding="async"
          width="800"
          height="1000"
        />
        <span v-else class="monogram">{{ monogram(featured.name) }}</span>
        <span class="hf-tag">★ Bán chạy</span>
        <div class="hf-body">
          <h3 class="display">{{ featured.name }}</h3>
          <div class="price">
            {{ formatPrice(featured.price) }}<span class="u">đ / {{ featured.unit }}</span>
          </div>
          <div class="row">
            <button class="play-mini" type="button" @click="emit('play', featured)">
              <IconPlay />
              Xem clip
            </button>
            <button class="play-mini" type="button" @click="emit('snap', featured)">
              Chụp món này
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding: 60px 0 40px;
  position: relative;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 48px;
  align-items: center;
}

.hero h1 {
  line-height: 1.02;
  font-size: clamp(40px, 6.2vw, 74px);
  letter-spacing: -0.01em;
  margin: 14px 0 18px;
  color: var(--fg);
}

.hero h1 em {
  font-style: var(--heading-style);
  color: var(--hot);
}

.hero h1 .hl {
  color: var(--accent);
  font-style: var(--heading-style);
}

.lead {
  font-size: clamp(16px, 2vw, 19px);
  color: var(--muted);
  max-width: 46ch;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.hero-feature {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  aspect-ratio: 4 / 5;
  background: var(--hero-feature-bg);
}

.feature-cover {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.monogram {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-display);
  font-weight: var(--font-display-weight);
  font-size: min(42vw, 300px);
  color: var(--monogram-color);
}

.hf-tag {
  position: absolute;
  top: 16px;
  left: 16px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: var(--hf-tag-bg);
  border: 1px solid var(--hf-tag-border);
  color: var(--hf-tag-ink);
  backdrop-filter: blur(6px);
  padding: 7px 13px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: var(--shadow-sm);
}

.hf-body {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 22px;
  background: var(--hero-feature-caption);
}

.hf-body h3 {
  font-size: 27px;
  color: #fff;
}

.hf-body .price {
  color: oklch(94% 0.12 92);
  font-weight: 700;
  margin-top: 2px;
}

.hf-body .price .u {
  font-size: 13px;
  opacity: 0.85;
}

.row {
  display: flex;
  gap: 10px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.play-mini {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 15px;
  border-radius: 999px;
  background: oklch(100% 0 0 / 0.92);
  border: 0;
  color: var(--fg);
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}

.play-mini:hover {
  background: #fff;
}

.play-mini :deep(svg) {
  width: 15px;
  height: 15px;
  fill: currentColor;
}

@media (max-width: 860px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .hero-feature {
    max-width: 360px;
    aspect-ratio: 4 / 4.4;
  }
}
</style>
