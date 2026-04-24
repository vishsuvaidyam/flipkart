<template>
  <div class="min-h-screen bg-[#f1f3f6]">
    <!-- Header -->
    <div class="bg-white shadow-sm mb-3">
      <div class="max-w-[1300px] mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-gray-900">My Wishlist</h1>
          <p class="text-sm text-gray-500 mt-0.5">{{ wishlist.length }} item{{ wishlist.length !== 1 ? 's' : '' }}</p>
        </div>
        <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">
          Continue Shopping
        </router-link>
      </div>
    </div>

    <div class="max-w-[1300px] mx-auto px-3 pb-8">
      <!-- Wishlist Items Grid -->
      <div v-if="wishlist.length > 0">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
          <div
            v-for="item in wishlist"
            :key="item.name"
            class="bg-white shadow-sm rounded overflow-hidden group hover:shadow-md transition"
          >
            <!-- Remove Button -->
            <div class="relative">
              <button
                @click="store.removeFromWishlist(item.name)"
                class="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-white shadow-md hover:scale-110 transition text-gray-400 hover:text-red-500"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <!-- Product Image -->
              <router-link :to="`/product/${item.name}`">
                <div class="flex items-center justify-center p-4 h-44 bg-gray-50">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                    onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
                  />
                </div>
              </router-link>
            </div>

            <!-- Item Details -->
            <div class="p-3">
              <router-link :to="`/product/${item.name}`">
                <h3 class="text-sm text-gray-800 line-clamp-2 mb-1.5 hover:text-flipkart-blue">{{ item.title }}</h3>
              </router-link>

              <!-- Rating -->
              <div class="flex items-center gap-1.5 mb-2">
                <span class="bg-[#388e3c] text-white text-[10px] font-bold px-1 py-0.5 rounded">{{ item.rating }} ★</span>
                <span class="text-xs text-gray-400">({{ item.reviews?.toLocaleString('en-IN') }})</span>
              </div>

              <!-- Price -->
              <div class="flex items-center gap-2 flex-wrap mb-3">
                <span class="text-base font-bold text-gray-900">₹{{ item.price?.toLocaleString('en-IN') }}</span>
                <span v-if="item.originalPrice" class="text-xs text-gray-400 line-through">₹{{ item.originalPrice.toLocaleString('en-IN') }}</span>
                <span v-if="item.discount" class="text-xs font-bold text-[#388e3c]">{{ item.discount }}% off</span>
              </div>

              <!-- Stock status -->
              <p v-if="item.stock === 0" class="text-xs text-red-500 font-medium mb-2">Out of Stock</p>
              <p v-else class="text-xs text-[#388e3c] mb-2">In Stock</p>

              <!-- Actions -->
              <div class="space-y-2">
                <button
                  v-if="item.stock > 0"
                  @click="store.moveToCart(item)"
                  class="w-full bg-flipkart-orange text-white text-sm font-bold py-2.5 rounded hover:bg-orange-500 transition flex items-center justify-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Move to Cart
                </button>
                <button
                  v-else
                  class="w-full bg-gray-100 text-gray-500 text-sm font-bold py-2.5 rounded cursor-not-allowed"
                  disabled
                >
                  Out of Stock
                </button>
                <router-link
                  :to="`/product/${item.name}`"
                  class="w-full block text-center border border-flipkart-blue text-flipkart-blue text-sm font-bold py-2 rounded hover:bg-blue-50 transition"
                >
                  View Details
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty Wishlist -->
      <div v-else class="bg-white rounded shadow-sm">
        <div class="text-center py-20 px-4">
          <div class="text-8xl mb-6">❤️</div>
          <h2 class="text-2xl font-bold text-gray-700 mb-2">Your Wishlist is empty!</h2>
          <p class="text-gray-500 mb-2">Save items that you like in your wishlist.</p>
          <p class="text-gray-400 text-sm mb-8">Review and add them to your cart.</p>
          <router-link
            to="/shop"
            class="inline-block bg-flipkart-blue text-white font-bold px-10 py-3 rounded hover:bg-blue-700 transition"
          >
            Browse Products
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { productStore } from '@/stores/products'

const store = productStore()
const wishlist = computed(() => store.wishlist)
</script>
