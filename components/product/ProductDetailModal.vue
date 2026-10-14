<script setup lang="ts">
import type { DetailMedia } from '~/composables/useProductDetail'
import type { Product } from '~/domain/types'
import { formatVnd } from '~/utils/format'

/**
 * Product / combo detail popup, served like the rest of the shop counter: the
 * dish on a big wooden plate over the gingham tablecloth, smaller plates below
 * to flip through its photos (and video); beside it the name on a torn-paper
 * tag, taste pills, the flash-sale clock, the full description, what's inside
 * (combos) or what goes with it (products); a price bar with add-to-cart is
 * pinned along the bottom. Data comes from useProductDetail(); the address bar
 * carries `?mon=slug` so a dish can be shared.
 */
const {
  detail,
  product,
  combo,
  item,
  thumb,
  media,
  soldOut,
  lowStock,
  tastes,
  category,
  description,
  comboSavings,
  inCombos,
  sameCategory,
  comboParts,
  platter,
  openDetail,
  close,
} = useProductDetail()
useDetailUrlSync()

const { activeFlash } = useCatalog()
const { qtyOf, count } = useCart()
const { openDrawer } = useOverlays()
const now = useNow()

const slide = ref(0)
const current = computed<DetailMedia | null>(() => media.value[slide.value] ?? null)
const inCart = computed(() => (item.value ? qtyOf(item.value) : 0))

// Moving to another dish from inside the popup starts it from the top, on its first photo.
const scroller = ref<HTMLElement | null>(null)
const info = ref<HTMLElement | null>(null)
watch(
  () => detail.value && `${detail.value.kind}:${detail.value.id}`,
  () => {
    slide.value = 0
    scroller.value?.scrollTo({ top: 0 })
    info.value?.scrollTo({ top: 0 })
  },
)

const priceOf = (x: Pick<Product, 'price' | 'flashSale'>) => activeFlash(x.flashSale)?.salePrice ?? x.price
</script>

<template>
  <BaseOverlay :open="!!item" wide :label="item ? `Chi tiết ${item.name}` : 'Chi tiết món'" @close="close">
    <div
      v-if="item && thumb"
      class="relative flex max-h-[calc(100dvh-2rem)] flex-col overflow-hidden rounded-hero border-[3px] bg-paper shadow-hard-lg md:h-[min(640px,calc(100dvh-2rem))]"
    >
      <CloseButton class="absolute right-3 top-3 z-20" @click="close" />

      <div
        ref="scroller"
        class="min-h-0 flex-1 overflow-y-auto md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden"
      >
        <!-- The dish on its plate, on the tablecloth. -->
        <div
          class="hero-glow relative flex flex-col items-center justify-center gap-5 overflow-hidden border-b-[3px] px-5 pb-6 pt-9 md:overflow-y-auto md:border-b-0 md:border-r-[3px] md:pb-8"
        >
          <div aria-hidden="true" class="gingham absolute inset-x-0 bottom-0 h-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_55%)]" />
          <Doodle kind="star" class="animate-twinkle absolute left-5 top-5 size-8" />
          <Doodle kind="heart" class="animate-twinkle absolute bottom-24 right-6 size-6 [animation-delay:-1.6s]" />

          <div v-if="current?.type === 'video'" class="relative w-full">
            <VideoEmbed :video="current.video" :title="`Video ${item.name}`" class="rounded-[26px] border-[3px] shadow-hard" />
          </div>
          <div v-else class="relative w-[min(270px,74%)] md:w-[min(330px,84%)]">
            <span class="wood block aspect-square rounded-full border-[3px] p-[7%] shadow-hard">
              <!-- A combo without its own photo is served as a platter of its dishes. -->
              <span
                v-if="!current && combo && platter.length"
                class="flex size-full flex-wrap content-center items-center justify-center gap-[3%] rounded-full border-2 bg-cream p-[6%]"
              >
                <ProductThumb
                  v-for="(p, i) in platter"
                  :key="p.id"
                  :product="p"
                  square
                  :show-label="false"
                  :width="140"
                  class="aspect-square w-[44%] rounded-full border-2 shadow-hard-sm"
                  :class="i % 2 ? 'rotate-6' : '-rotate-6'"
                />
              </span>
              <ProductThumb
                v-else
                :key="current?.url ?? 'placeholder'"
                :product="{ ...thumb, thumbnail_url: current?.url ?? thumb.thumbnail_url }"
                square
                :show-label="false"
                eager
                :width="340"
                class="size-full animate-pop rounded-full border-2"
                :class="soldOut && 'grayscale'"
              />
            </span>
            <BestSticker v-if="product?.featured" large class="absolute -right-3 -top-2" />
            <FlashSticker
              v-if="item.flashSale && !soldOut"
              :flash="item.flashSale"
              :price="item.price"
              class="absolute -left-3 bottom-3 scale-110"
            />
            <span
              v-else-if="combo && comboSavings > 0 && !soldOut"
              class="candy-fill display absolute -left-4 bottom-4 -rotate-6 rounded-2xl border px-3 py-1 text-[18px] shadow-hard-sm"
            >
              −{{ formatVnd(comboSavings) }}
            </span>
            <span v-if="soldOut" class="display absolute inset-x-0 bottom-3 mx-auto w-fit -rotate-3 rounded-full border bg-white px-4 py-1 text-[18px]">
              Tạm hết hàng
            </span>
          </div>

          <ul v-if="media.length > 1" class="relative flex flex-wrap justify-center gap-3" aria-label="Ảnh và video của món">
            <li v-for="(m, i) in media" :key="i">
              <button
                type="button"
                class="wood grid size-14 cursor-pointer place-items-center rounded-full border-[2.5px] p-1 transition-[transform,box-shadow] duration-200"
                :class="i === slide ? '-translate-y-1 scale-110 border-orange-deep shadow-hard-orange' : 'opacity-70 shadow-hard-sm hover:-translate-y-0.5 hover:opacity-100'"
                :aria-label="m.type === 'video' ? 'Xem video' : `Xem ảnh ${i + 1}`"
                :aria-pressed="i === slide"
                @click="slide = i"
              >
                <ProductThumb
                  v-if="m.type === 'image'"
                  :product="{ ...thumb, thumbnail_url: m.url }"
                  square
                  :show-label="false"
                  :width="56"
                  class="size-full rounded-full border-2"
                />
                <span v-else class="candy-fill grid size-full place-items-center rounded-full border-2 pl-0.5 text-[17px]">▶</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- Name, story and what goes with it. -->
        <div ref="info" class="px-5 pb-7 pt-6 sm:px-7 md:overflow-y-auto md:pt-8">
          <span class="brush display inline-block -rotate-2 px-4 py-1 text-[13px] uppercase tracking-[0.08em] text-ink-soft">
            <span class="mr-1.5 inline-block size-2.5 rounded-full border-[1.5px] align-middle" :style="{ background: category.color }" />{{ category.label }}
          </span>
          <h2 class="display mt-3 pr-12 text-[clamp(30px,4vw,42px)]">{{ item.name }}</h2>
          <p v-if="tastes.length" class="mt-3 flex flex-wrap gap-1.5 text-xs font-extrabold">
            <span v-for="t in tastes" :key="t" class="rounded-full border-2 border-dashed bg-white px-2.5 py-0.5">{{ t }}</span>
          </p>

          <div
            v-if="item.flashSale && !soldOut"
            class="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border bg-mango p-3.5 pl-4 shadow-hard-sm"
          >
            <div class="min-w-0">
              <p class="text-[12px] font-extrabold uppercase tracking-[0.14em]">⚡ {{ item.flashSale.name }}</p>
              <p class="mt-0.5 text-sm font-bold text-ink-soft">
                <template v-if="item.flashSale.remaining !== null">🔥 còn {{ item.flashSale.remaining }} suất</template>
                <template v-else>Giá sale cho mọi đơn</template>
                <template v-if="item.flashSale.perOrderLimit"> · tối đa {{ item.flashSale.perOrderLimit }} {{ item.unit }}/đơn</template>
              </p>
            </div>
            <div class="rounded-2xl border bg-ink px-3 py-1 text-center text-paper">
              <p class="text-[10px] font-extrabold uppercase tracking-[0.14em] text-mango">Kết thúc sau</p>
              <p class="display text-[22px] tabular-nums">{{ formatCountdown(item.flashSale.endsAt, now) }}</p>
            </div>
          </div>

          <p v-if="product?.summary" class="mt-5 text-[17px] font-bold leading-snug text-ink">{{ product.summary }}</p>
          <p v-if="description" class="mt-2 whitespace-pre-line text-[15px] text-ink-soft">{{ description }}</p>

          <dl v-if="product" class="mt-5 grid grid-cols-2 gap-3">
            <div class="rounded-2xl border-2 border-dashed bg-white px-4 py-2.5">
              <dt class="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">Bán theo</dt>
              <dd class="display mt-0.5 text-[20px]">1 {{ item.unit }}</dd>
            </div>
            <div class="rounded-2xl border-2 border-dashed bg-white px-4 py-2.5">
              <dt class="text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted">Tình trạng</dt>
              <dd class="display mt-0.5 text-[20px]" :class="soldOut ? 'text-eyebrow' : lowStock ? 'text-orange-deep' : 'text-leaf'">
                {{ soldOut ? 'Tạm hết' : lowStock ? `Còn ${item.available} ${item.unit}` : 'Còn hàng' }}
              </dd>
            </div>
          </dl>

          <!-- Combo: what's inside, each part opens its own detail. -->
          <section v-if="combo" class="mt-6">
            <h3 class="display text-[22px]">Trong combo có</h3>
            <ul class="mt-3 space-y-2.5">
              <li v-for="part in comboParts" :key="part.productId">
                <button
                  type="button"
                  class="flex w-full items-center gap-3 rounded-[20px] border bg-white p-2 pr-4 text-left shadow-hard-sm"
                  :class="part.product && 'press'"
                  :disabled="!part.product"
                  @click="openDetail('PRODUCT', part.productId)"
                >
                  <span class="grid size-9 shrink-0 place-items-center rounded-full border-2 bg-mango-soft text-sm font-extrabold">{{ part.qty }}</span>
                  <ProductThumb
                    v-if="part.product"
                    :product="part.product"
                    square
                    :show-label="false"
                    :width="44"
                    class="size-11 shrink-0 rounded-full border-2"
                  />
                  <span class="min-w-0 flex-1 font-extrabold leading-tight">{{ part.unit }} {{ part.name }}</span>
                  <span v-if="part.product" aria-hidden="true" class="shrink-0 text-sm font-extrabold text-orange-deep">Xem →</span>
                </button>
              </li>
            </ul>
            <p v-if="comboSavings > 0" class="mt-4 rounded-2xl border-2 border-dashed bg-mango-soft px-4 py-2.5 text-sm font-bold">
              Mua lẻ <s class="text-muted">{{ formatVnd(combo.originalPrice) }}</s> — combo rẻ hơn
              <span class="text-eyebrow">{{ formatVnd(comboSavings) }}</span> 🎉
            </p>
          </section>

          <!-- Product: combos it's in, then more from its category. -->
          <section v-if="inCombos.length" class="mt-7">
            <h3 class="display text-[22px]">Mua combo <CandyText text="lời hơn" /></h3>
            <ul class="mt-3 space-y-2.5">
              <li v-for="c in inCombos" :key="c.id">
                <button
                  type="button"
                  class="press flex w-full items-center gap-3 rounded-[20px] border bg-white p-2 pr-4 text-left shadow-hard-sm"
                  @click="openDetail('COMBO', c.id)"
                >
                  <ProductThumb :product="{ ...c, category: 'combo' }" square :show-label="false" :width="52" class="size-[52px] shrink-0 rounded-2xl border-2" />
                  <span class="min-w-0 flex-1">
                    <span class="block font-extrabold leading-tight">{{ c.name }}</span>
                    <span class="block truncate text-[13px] font-semibold text-muted">{{ c.items.map((p) => `${p.qty} ${p.name}`).join(' + ') }}</span>
                  </span>
                  <span class="display shrink-0 text-[18px]">{{ formatVnd(priceOf(c)) }}</span>
                </button>
              </li>
            </ul>
          </section>

          <section v-if="sameCategory.length" class="mt-7">
            <h3 class="display text-[22px]">Cùng món {{ category.label.toLowerCase() }}</h3>
            <ul class="mt-4 grid grid-cols-4 gap-3">
              <li v-for="p in sameCategory" :key="p.id">
                <button type="button" class="group flex w-full cursor-pointer flex-col items-center text-center" @click="openDetail('PRODUCT', p.id)">
                  <span
                    class="wood block aspect-square w-full rounded-full border-[2.5px] p-[8%] shadow-hard-sm transition-transform duration-200 group-hover:-rotate-6 group-hover:scale-105"
                  >
                    <ProductThumb :product="p" square :show-label="false" :width="80" class="size-full rounded-full border-2" />
                  </span>
                  <span class="mt-2 line-clamp-2 text-[12px] font-extrabold leading-tight group-hover:text-orange-deep sm:text-[13px]">{{ p.name }}</span>
                  <span class="text-[12px] font-bold text-muted">{{ formatVnd(priceOf(p)) }}</span>
                </button>
              </li>
            </ul>
          </section>
        </div>
      </div>

      <!-- Price bar, always in reach. -->
      <div class="flex items-center gap-2.5 border-t-[3px] bg-white px-4 py-3 sm:gap-3 sm:px-6">
        <PriceTag :item="item" :unit="combo ? 'combo' : undefined" size="lg" class="mr-auto" />
        <AppButton v-if="inCart" variant="ink" size="lg" class="max-sm:px-3.5" :aria-label="`Xem giỏ (${count} món)`" @click="openDrawer">
          <IconBag />
          <span class="max-sm:hidden">Xem giỏ</span>
          <span class="tabular-nums">{{ count }}</span>
        </AppButton>
        <CartControl :item="item" :label="combo ? '+ Thêm combo' : '+ Thêm vào giỏ'" size="lg" class="!w-[150px] sm:!w-[190px]" />
      </div>
    </div>
  </BaseOverlay>
</template>
