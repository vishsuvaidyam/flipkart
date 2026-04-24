<template>
  <Teleport to="body">
    <Transition name="toast">
      <div
        v-if="toast"
        :key="toast.id"
        class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-5 py-3 rounded-lg shadow-xl text-white text-sm font-medium max-w-sm"
        :class="{
          'bg-[#388e3c]': toast.type === 'success',
          'bg-flipkart-blue': toast.type === 'info',
          'bg-red-600': toast.type === 'error',
        }"
      >
        <span class="text-lg flex-shrink-0">
          {{ toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ' }}
        </span>
        <p>{{ toast.message }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { productStore } from '@/stores/products'

const store = productStore()
const toast = computed(() => store.toast)
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}
</style>
