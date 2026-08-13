<script setup lang="ts">
/**
 * Bottom contact bar. Hidden while the visitor is still at the top of the
 * page (first view stays uncluttered) and slides up once they scroll past
 * the hero — right when they start thinking about ordering.
 */
const y = ref(0)

function onScroll() {
  y.value = window.scrollY
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))

const visible = computed(() => y.value > 420)
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-[45] flex items-center justify-center gap-3 border-t border-border bg-[var(--fab-bg)] px-6 py-3 backdrop-blur-[14px] transition-transform duration-300 max-[560px]:justify-stretch max-[560px]:[&_a]:flex-1 max-[560px]:[&_a]:justify-center"
    :class="visible ? 'translate-y-0' : 'pointer-events-none translate-y-full'"
    :aria-hidden="!visible"
  >
    <span class="mr-1 text-[13.5px] font-medium text-muted max-[560px]:hidden">
      Ưng món nào rồi? Nhắn tin chốt đơn ngay:
    </span>
    <ContactButtons messenger-label="Messenger" />
  </div>
</template>
