<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container">
      <h1 class="text-3xl font-bold mb-8 text-flipkart-dark">Products</h1>

      <!-- Filters -->
      <div class="mb-8 flex gap-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <label class="block text-sm font-medium mb-2">Sort By</label>
          <select v-model="sortBy" class="border border-gray-300 rounded px-3 py-2">
            <option value="newest">Newest</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>

        <div class="bg-white p-4 rounded-lg shadow">
          <label class="block text-sm font-medium mb-2">Max Price</label>
          <input v-model.number="maxPrice" type="range" min="0" max="100000" step="1000" class="border border-gray-300 rounded px-3 py-2 w-40">
          <span class="text-sm">₹{{ maxPrice }}</span>
        </div>
      </div>

      <!-- Product Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="product in filteredProducts" :key="product.name" class="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer" @click="$router.push(`/product/${product.name}`)">
          <div class="bg-gray-200 h-40 flex items-center justify-center rounded-t-lg">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" onerror="this.src='https://via.placeholder.com/150'">
          </div>
          <div class="p-4">
            <h3 class="font-bold text-sm line-clamp-2 mb-2">{{ product.title }}</h3>
            <p class="text-xs text-gray-600 mb-3 line-clamp-1">{{ product.description }}</p>
            <div class="flex justify-between items-center">
              <span class="text-flipkart-blue font-bold text-lg">₹{{ product.price }}</span>
              <button v-if="isLoggedIn" @click.stop="addToCart(product)" class="bg-flipkart-orange text-black px-3 py-1 rounded text-sm font-bold hover:bg-opacity-90">
                Add to Cart
              </button>
              <router-link v-else to="/login" @click.stop class="bg-flipkart-orange text-black px-3 py-1 rounded text-sm font-bold hover:bg-opacity-90">
                Login
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredProducts.length === 0" class="text-center py-12">
        <p class="text-gray-600 text-lg">No products found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const { isLoggedIn } = sessionStore()
const { products, addToCart } = productStore()

const sortBy = ref('newest')
const maxPrice = ref(100000)

const filteredProducts = computed(() => {
  let result = products.filter((p) => p.price <= maxPrice.value)

  switch (sortBy.value) {
    case 'price_low':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price_high':
      result.sort((a, b) => b.price - a.price)
      break
    case 'popularity':
      // Sort by some popularity metric
      break
    case 'newest':
    default:
      // Keep original order
      break
  }

  return result
})
</script>
