<script setup lang="ts">
/**
 * The full menu, grouped by category. Desktop: a sticky sidebar (category
 * list, mini cart, Messenger help) beside the groups. Phones: a sticky rail of
 * category tabs under the header. Both highlight the category being read
 * (scroll-spy) and jump to a group on click.
 */
const { groups, products } = useMenu()
const { site } = useCatalog()

const active = ref(groups.value[0]?.category.id ?? '')
const blocks = ref<HTMLElement[]>([])
const rail = ref<HTMLElement | null>(null)

// A group counts as "being read" while it crosses a band just under the sticky chrome.
let spy: IntersectionObserver | null = null
function observe() {
  spy?.disconnect()
  spy = new IntersectionObserver(
    (entries) => {
      for (const e of entries) if (e.isIntersecting) active.value = (e.target as HTMLElement).dataset.id ?? active.value
    },
    { rootMargin: '-30% 0px -65% 0px' },
  )
  blocks.value.forEach((el) => spy!.observe(el))
}
onMounted(observe)
watch(groups, observe, { flush: 'post' })
onBeforeUnmount(() => spy?.disconnect())

// Keep the active tab in view on the phone rail.
watch(active, (id) => {
  const tab = rail.value?.querySelector<HTMLElement>(`[data-id="${id}"]`)
  if (rail.value && tab) rail.value.scrollTo({ left: tab.offsetLeft - (rail.value.clientWidth - tab.clientWidth) / 2, behavior: 'smooth' })
})
</script>

<template>
  <section id="menu" class="wrap pb-[clamp(56px,7vw,96px)] pt-[clamp(56px,7vw,96px)]">
    <SectionTitle v-reveal class="reveal" eyebrow="Thực đơn hôm nay" title="Tất cả món" accent="đang có">
      <p class="mt-3 font-semibold text-muted">{{ products.length }} món · {{ groups.length }} danh mục · mới cập nhật hôm nay</p>
    </SectionTitle>

    <!-- Phones: sticky category tabs right under the header. -->
    <nav
      ref="rail"
      class="sticky top-[70px] z-30 -mx-5 mt-8 flex gap-2 overflow-x-auto border-y-2 border-dashed border-line bg-paper/95 px-5 py-2.5 backdrop-blur-sm lg:hidden"
      aria-label="Danh mục món"
    >
      <a
        v-for="g in groups"
        :key="g.category.id"
        :href="`#${categoryAnchor(g.category.id)}`"
        :data-id="g.category.id"
        class="shrink-0 rounded-full border px-4 py-1.5 text-sm font-extrabold transition-colors"
        :class="active === g.category.id ? 'candy-fill' : 'bg-white'"
        :aria-current="active === g.category.id ? 'true' : undefined"
      >
        {{ g.category.label }}
      </a>
    </nav>

    <div class="mt-10 lg:mt-14 lg:grid lg:grid-cols-[260px_1fr] lg:items-start lg:gap-10">
      <aside class="sticky top-[94px] space-y-5 max-lg:hidden">
        <nav class="rounded-card border bg-white p-3 shadow-hard" aria-label="Danh mục món">
          <p class="display px-3 pb-1 pt-1 text-[22px]">Danh mục</p>
          <a
            v-for="g in groups"
            :key="g.category.id"
            :href="`#${categoryAnchor(g.category.id)}`"
            class="flex items-center gap-3 rounded-2xl px-3 py-2.5 font-extrabold transition-colors"
            :class="active === g.category.id ? 'candy-fill' : 'hover:bg-cream'"
            :aria-current="active === g.category.id ? 'true' : undefined"
          >
            <span class="size-4 shrink-0 rounded-full border-2" :style="{ background: g.category.color }" />
            {{ g.category.label }}
            <span class="ml-auto text-sm tabular-nums opacity-75">{{ g.products.length }}</span>
          </a>
        </nav>

        <MiniCart />

        <a
          :href="site.messengerUrl"
          target="_blank"
          rel="noopener"
          class="press flex items-center gap-3 rounded-card border-2 border-dashed bg-mango-soft p-4 [&_svg]:size-9 [&_svg]:shrink-0 [&_svg]:text-orange-deep"
        >
          <IconHeadset />
          <span>
            <span class="display block text-[18px] leading-tight">Chưa biết chọn gì?</span>
            <span class="text-sm font-bold text-ink-soft">Nhắn shop tư vấn liền →</span>
          </span>
        </a>
      </aside>

      <div class="space-y-16">
        <section
          v-for="g in groups"
          :id="categoryAnchor(g.category.id)"
          :key="g.category.id"
          ref="blocks"
          :data-id="g.category.id"
          class="scroll-mt-[140px] lg:scroll-mt-[96px]"
          :aria-labelledby="`${categoryAnchor(g.category.id)}-title`"
        >
          <header class="flex items-center gap-3">
            <span class="size-9 shrink-0 rounded-full border-[3px] shadow-hard-sm" :style="{ background: g.category.color }" />
            <h3 :id="`${categoryAnchor(g.category.id)}-title`" class="display text-[clamp(26px,3vw,32px)]">{{ g.category.label }}</h3>
            <span class="shrink-0 rounded-full border-2 border-dashed bg-white px-2.5 text-sm font-extrabold">{{ g.products.length }} món</span>
            <span aria-hidden="true" class="h-0 flex-1 border-t-2 border-dashed border-line" />
          </header>

          <div class="mt-16 grid grid-cols-2 gap-x-3 gap-y-16 sm:gap-x-6 sm:gap-y-20 sm:[grid-template-columns:repeat(auto-fill,minmax(232px,1fr))]">
            <div
              v-for="(product, index) in g.products"
              :id="productAnchor(product.id)"
              :key="product.id"
              v-reveal="(index % 3) * 80"
              class="reveal h-full scroll-mt-[200px]"
            >
              <ProductCard :product="product" />
            </div>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>
