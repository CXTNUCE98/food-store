<template>
  <div
    class="fixed inset-x-0 bottom-0 z-[45] flex items-center justify-center gap-3 border-t border-border bg-[var(--fab-bg)] px-6 py-3 backdrop-blur-[14px] max-[560px]:justify-stretch max-[560px]:[&_a]:flex-1 max-[560px]:[&_a]:justify-center"
  >
    <span class="mr-1 text-[13.5px] font-medium text-muted max-[560px]:hidden">
      Ưng món nào rồi? Nhắn tin chốt đơn ngay:
    </span>
    <ContactButtons messenger-label="Messenger" />
  </div>
</template>
