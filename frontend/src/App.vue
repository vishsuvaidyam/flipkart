<template>
  <div class="app">
    <header v-if="isLoggedIn" class="bg-flipkart-blue text-white p-4">
      <div class="container flex justify-between items-center">
        <router-link to="/" class="text-2xl font-bold">Flipkart</router-link>
        <nav class="flex gap-6">
          <router-link to="/shop" class="hover:text-gray-200">Shop</router-link>
          <router-link to="/cart" class="hover:text-gray-200">Cart</router-link>
          <router-link to="/orders" class="hover:text-gray-200">Orders</router-link>
          <button @click="handleLogout" class="hover:text-gray-200">Logout</button>
        </nav>
      </div>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { sessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const router = useRouter()
const { isLoggedIn, logout } = sessionStore()

const handleLogout = async () => {
  await logout.submit()
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
