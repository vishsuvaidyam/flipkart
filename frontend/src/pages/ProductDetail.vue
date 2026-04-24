<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container max-w-3xl">
      <button @click="$router.back()" class="mb-4 text-flipkart-blue font-bold">← Back</button>

      <div v-if="product" class="bg-white rounded-lg shadow-lg overflow-hidden">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <!-- Product Image -->
          <div class="bg-gray-100 rounded-lg flex items-center justify-center h-96">
            <img :src="product.image" :alt="product.title" class="h-full w-full object-cover" onerror="this.src='https://via.placeholder.com/300'">
          </div>

          <!-- Product Details -->
          <div>
            <h1 class="text-3xl font-bold mb-4">{{ product.title }}</h1>

            <div class="mb-6 pb-6 border-b">
              <p class="text-2xl font-bold text-flipkart-blue mb-2">₹{{ product.price }}</p>
              <div class="flex gap-4">
                <span v-if="product.stock > 0" class="text-green-600 font-bold">✓ In Stock</span>
                <span v-else class="text-red-600 font-bold">Out of Stock</span>
              </div>
            </div>

            <!-- Description -->
            <div class="mb-8">
              <h3 class="font-bold text-lg mb-2">Description</h3>
              <p class="text-gray-600">{{ product.description }}</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-4">
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click="handleAddToCart(product)"
                class="flex-1 bg-flipkart-orange text-black py-3 rounded-lg font-bold hover:bg-opacity-90"
              >
                Add to Cart
              </button>
              <button
                v-if="!isLoggedIn"
                @click="$router.push('/login')"
                class="flex-1 bg-flipkart-orange text-black py-3 rounded-lg font-bold hover:bg-opacity-90"
              >
                Login to Buy
              </button>
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click="handleBuyNow(product)"
                class="flex-1 bg-flipkart-blue text-white py-3 rounded-lg font-bold hover:bg-opacity-90"
              >
                Buy Now
              </button>
              <button
                v-if="product.stock === 0"
                disabled
                class="flex-1 bg-gray-300 text-gray-600 py-3 rounded-lg font-bold cursor-not-allowed"
              >
                Out of Stock
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12">
        <p class="text-gray-600 text-lg">Product not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const router = useRouter()
const { isLoggedIn } = sessionStore()
const { products, addToCart } = productStore()

const props = defineProps({
  productId: {
    type: String,
    required: true,
  },
})

const product = computed(() => {
  return products.find((p) => p.name === props.productId)
})

const handleAddToCart = (prod) => {
  addToCart(prod)
  alert('Added to cart!')
}

const handleBuyNow = (prod) => {
  addToCart(prod)
  router.push('/checkout')
}
</script>
