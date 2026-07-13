<template>
  <div class="fab">
    <span class="txt">Ưng món nào rồi? Nhắn tin chốt đơn ngay:</span>
    <ContactButtons messenger-label="Messenger" zalo-label="Zalo" />
  </div>
</template>

<style scoped>
.fab {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 45;
  background: var(--fab-bg);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-top: 1px solid var(--border);
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.txt {
  font-size: 13.5px;
  color: var(--muted);
  margin-right: 4px;
  font-weight: 500;
}

@media (max-width: 560px) {
  .txt {
    display: none;
  }

  .fab {
    justify-content: stretch;
  }

  .fab :deep(.btn) {
    flex: 1;
    justify-content: center;
  }
}
</style>
