<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Banner -->
    <div class="bg-flipkart-blue text-white py-12 px-4">
      <div class="container">
        <h1 class="text-4xl font-bold mb-4">Welcome to Flipkart</h1>
        <p class="text-lg mb-6">Explore millions of products with great deals</p>
        <div v-if="!isLoggedIn" class="flex gap-4">
          <router-link to="/login" class="bg-flipkart-orange text-black px-6 py-2 rounded font-bold hover:bg-opacity-90">
            Login
          </router-link>
          <router-link to="/shop" class="bg-white text-flipkart-blue px-6 py-2 rounded font-bold hover:bg-opacity-90">
            Browse Products
          </router-link>
        </div>
        <div v-else class="flex gap-4">
          <router-link to="/shop" class="bg-flipkart-orange text-black px-6 py-2 rounded font-bold hover:bg-opacity-90">
            Start Shopping
          </router-link>
          <router-link to="/cart" class="bg-white text-flipkart-blue px-6 py-2 rounded font-bold hover:bg-opacity-90">
            View Cart
          </router-link>
        </div>
      </div>
    </div>

    <!-- Featured Products -->
    <div class="container py-12">
      <h2 class="text-3xl font-bold mb-8">Featured Products</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in featuredProducts" :key="product.name" class="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer" @click="$router.push(`/product/${product.name}`)">
          <div class="bg-gray-200 h-40 flex items-center justify-center rounded-t-lg">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" onerror="this.src='https://via.placeholder.com/150'">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm line-clamp-2 mb-2">{{ product.title }}</h3>
            <div class="flex justify-between items-center">
              <span class="text-flipkart-blue font-bold text-lg">₹{{ product.price }}</span>
              <button v-if="isLoggedIn" @click.stop="addToCart(product)" class="bg-flipkart-orange text-black px-3 py-1 rounded text-sm font-bold hover:bg-opacity-90">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const { isLoggedIn } = sessionStore()
const { products, addToCart } = productStore()

const featuredProducts = computed(() => {
  return products.slice(0, 8)
})
</script>
