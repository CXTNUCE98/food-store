<script setup lang="ts">
/**
 * "How to order" as a three-stop timeline on a cream board (dashed track
 * between the stops on wide screens), closing with the order call-to-action.
 */
const { site } = useCatalog()

const steps = [
  { n: 1, icon: resolveComponent('IconBag'), title: 'Chọn món', text: 'Lướt thực đơn, bấm “+ Thêm” cho món bạn ưng.' },
  {
    n: 2,
    icon: resolveComponent('IconMessenger'),
    title: 'Đặt hàng',
    text: 'Mở giỏ, điền SĐT để đặt ngay trên web — hoặc tạo ảnh đơn gửi Messenger.',
  },
  { n: 3, icon: resolveComponent('IconTruck'), title: 'Nhận món', text: 'Tụi mình xác nhận liền và giao tận nơi. Theo dõi đơn bằng mã đơn.' },
]
</script>

<template>
  <section id="how" class="wrap pb-[clamp(56px,8vw,96px)]">
    <div class="relative overflow-hidden rounded-hero border-[3px] bg-mango-soft px-5 pb-8 pt-10 shadow-hard-lg sm:px-10">
      <div aria-hidden="true" class="gingham absolute inset-x-0 bottom-0 h-40 opacity-70 [mask-image:linear-gradient(to_bottom,transparent,#000)]" />
      <Doodle kind="star" class="animate-twinkle absolute left-6 top-6 size-8" />
      <Doodle kind="heart" class="animate-twinkle absolute right-8 top-10 size-7 [animation-delay:-1.6s]" />

      <SectionTitle v-reveal class="reveal relative" eyebrow="Cách đặt" title="Đặt món" accent="3 bước" />

      <div class="relative mt-12">
        <div aria-hidden="true" class="absolute left-[17%] right-[17%] top-[46px] border-t-[3px] border-dashed max-md:hidden" />
        <ol class="relative grid gap-10 md:grid-cols-3 md:gap-6">
          <li v-for="(step, i) in steps" :key="step.n" v-reveal="i * 120" class="reveal relative flex flex-col items-center text-center">
            <span class="relative grid size-[92px] place-items-center rounded-full border-[3px] bg-white shadow-hard [&_svg]:size-10 [&_svg]:text-orange-deep">
              <component :is="step.icon" />
              <CandyText :text="step.n" aria-hidden="true" class="absolute -right-3 -top-4 text-[40px] leading-none" />
            </span>
            <h3 class="display mt-5 text-[26px]">
              <span class="sr-only">Bước {{ step.n }}: </span>{{ step.title }}
            </h3>
            <p class="mt-1 max-w-[30ch] text-[15px] font-semibold text-ink-soft">{{ step.text }}</p>
          </li>
        </ol>
      </div>

      <div class="relative mt-12 flex flex-col items-center gap-4 border-t-2 border-dashed border-ink/20 pt-8 text-center">
        <p class="display text-[clamp(24px,3vw,34px)]">
          Thèm rồi phải không? <span class="text-orange-deep">Chốt đơn liền!</span>
        </p>
        <div class="flex w-full flex-wrap justify-center gap-3 [&>*]:min-w-[180px] max-sm:[&>*]:flex-1">
          <AppButton size="lg" href="#menu">Xem thực đơn</AppButton>
          <AppButton variant="white" size="lg" :href="site.messengerUrl" external>
            <IconMessenger />
            Nhắn Messenger
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
