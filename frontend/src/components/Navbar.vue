<template>
  <nav class="bg-flipkart-blue text-white sticky top-0 z-50 shadow-lg">
    <!-- Top Nav Bar -->
    <div class="flex items-center justify-between px-4 sm:px-8 py-3 gap-4">
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 flex-shrink-0">
        <span class="text-2xl font-bold">Flipkart</span>
        <span class="text-xs text-blue-100">Explore Plus</span>
      </router-link>

      <!-- Search Bar -->
      <div class="hidden md:flex flex-1 max-w-md mx-4">
        <div class="relative w-full">
          <input
            type="text"
            placeholder="Search for products, brands and more"
            class="w-full px-4 py-2 rounded text-gray-800 text-sm focus:outline-none"
          />
          <button class="absolute right-3 top-2.5 text-gray-400">
            🔍
          </button>
        </div>
      </div>

      <!-- Right Menu -->
      <div class="flex items-center gap-4 ml-auto">
        <!-- Login/User -->
        <div v-if="!isLoggedIn" class="flex flex-col items-center cursor-pointer hover:text-blue-200">
          <router-link to="/login" class="text-sm font-bold">Login</router-link>
          <span class="text-xs">Account</span>
        </div>
        <div v-else class="flex flex-col items-center cursor-pointer hover:text-blue-200">
          <span class="text-sm font-bold">{{ userName }}</span>
          <button @click="handleLogout" class="text-xs hover:underline">Logout</button>
        </div>

        <!-- Become Seller -->
        <a href="#" class="text-sm font-bold hover:text-blue-200 hidden sm:block">Become a Seller</a>

        <!-- More Menu -->
        <div class="relative group">
          <button class="text-sm font-bold hover:text-blue-200">More ▼</button>
          <div class="hidden group-hover:block absolute right-0 bg-white text-gray-800 rounded shadow-lg py-2 min-w-48">
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Notifications</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">24x7 Customer Care</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Advertise</a>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Download App</a>
          </div>
        </div>

        <!-- Cart -->
        <router-link v-if="isLoggedIn" to="/cart" class="flex flex-col items-center hover:text-blue-200">
          <span class="text-xl">🛒</span>
          <span class="text-xs font-bold">{{ cartCount }}</span>
        </router-link>
      </div>
    </div>

    <!-- Mobile Search -->
    <div class="md:hidden px-4 pb-3">
      <input
        type="text"
        placeholder="Search products"
        class="w-full px-3 py-2 rounded text-gray-800 text-sm focus:outline-none"
      />
    </div>

    <!-- Categories Menu -->
    <div class="hidden md:flex overflow-x-auto px-4 py-2 text-sm border-t border-blue-600 gap-6">
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Electronics</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">TVs & Appliances</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Men</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Women</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Baby & Kids</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Home & Furniture</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Sports, Books & More</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Flights</a>
      <a href="#" class="hover:text-blue-200 whitespace-nowrap">Offer Zone</a>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const { isLoggedIn, user, logout } = sessionStore()
const { cart } = productStore()

const userName = computed(() => {
  if (user.value) {
    const parts = user.value.split('@')
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  }
  return ''
})

const cartCount = computed(() => cart.length)

const handleLogout = async () => {
  await logout.submit()
}
</script>
