<template>
  <div class="app min-h-screen bg-[#f1f3f6]">
    <Navbar />
    <main>
      <router-view />
    </main>
    <Toast />
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Toast from '@/components/Toast.vue'
</script>
