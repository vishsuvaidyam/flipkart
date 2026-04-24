<template>
  <div class="min-h-screen bg-[#f1f3f6]">
    <!-- Breadcrumb -->
    <div class="max-w-[1300px] mx-auto px-2 py-2 text-xs text-gray-500">
      <router-link to="/" class="hover:text-flipkart-blue">Home</router-link>
      <span class="mx-1">›</span>
      <span class="text-gray-700 font-medium">{{ selectedCategory || 'All Products' }}</span>
    </div>

    <div class="max-w-[1300px] mx-auto px-2 flex gap-3 pb-6">
      <!-- LEFT: Filters Sidebar -->
      <div class="hidden md:block w-[230px] flex-shrink-0">
        <div class="bg-white shadow-sm rounded overflow-hidden sticky top-[110px]">
          <div class="px-4 py-3 border-b flex items-center justify-between">
            <h3 class="font-bold text-base text-gray-900">Filters</h3>
            <button @click="resetFilters" class="text-xs text-flipkart-blue hover:underline font-medium">
              CLEAR ALL
            </button>
          </div>

          <!-- Category Filter -->
          <div class="px-4 py-4 border-b">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Category</h4>
            <div class="space-y-2">
              <label v-for="cat in allCategories" :key="cat" class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  :value="cat"
                  v-model="selectedCategories"
                  class="w-3.5 h-3.5 accent-flipkart-blue"
                />
                <span class="text-sm text-gray-700 group-hover:text-flipkart-blue transition">{{ cat }}</span>
              </label>
            </div>
          </div>

          <!-- Brand Filter -->
          <div class="px-4 py-4 border-b">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Brand</h4>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <label v-for="brand in allBrands" :key="brand" class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  :value="brand"
                  v-model="selectedBrands"
                  class="w-3.5 h-3.5 accent-flipkart-blue"
                />
                <span class="text-sm text-gray-700 group-hover:text-flipkart-blue transition">{{ brand }}</span>
              </label>
            </div>
          </div>

          <!-- Price Range -->
          <div class="px-4 py-4 border-b">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Price Range</h4>
            <div class="space-y-2">
              <label v-for="range in priceRanges" :key="range.label" class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="priceRange"
                  :value="range"
                  v-model="selectedPriceRange"
                  class="w-3.5 h-3.5 accent-flipkart-blue"
                />
                <span class="text-sm text-gray-700 group-hover:text-flipkart-blue transition">{{ range.label }}</span>
              </label>
            </div>
          </div>

          <!-- Customer Ratings -->
          <div class="px-4 py-4 border-b">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Customer Ratings</h4>
            <div class="space-y-2">
              <label v-for="r in [4, 3, 2]" :key="r" class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  :value="r"
                  v-model="minRating"
                  class="w-3.5 h-3.5 accent-flipkart-blue"
                />
                <span class="text-sm text-gray-700 group-hover:text-flipkart-blue flex items-center gap-1">
                  {{ r }}★ & above
                </span>
              </label>
            </div>
          </div>

          <!-- Discount Filter -->
          <div class="px-4 py-4 border-b">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Discount</h4>
            <div class="space-y-2">
              <label v-for="d in [10, 20, 30, 40, 50]" :key="d" class="flex items-center gap-2 cursor-pointer group">
                <input
                  type="radio"
                  name="discount"
                  :value="d"
                  v-model="minDiscount"
                  class="w-3.5 h-3.5 accent-flipkart-blue"
                />
                <span class="text-sm text-gray-700 group-hover:text-flipkart-blue transition">{{ d }}% or more</span>
              </label>
            </div>
          </div>

          <!-- Availability -->
          <div class="px-4 py-4">
            <h4 class="font-bold text-sm text-gray-800 mb-3">Availability</h4>
            <label class="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" v-model="inStockOnly" class="w-3.5 h-3.5 accent-flipkart-blue" />
              <span class="text-sm text-gray-700 group-hover:text-flipkart-blue transition">In Stock Only</span>
            </label>
          </div>
        </div>
      </div>

      <!-- RIGHT: Product Listing -->
      <div class="flex-1 min-w-0">
        <!-- Sort Bar -->
        <div class="bg-white shadow-sm rounded px-4 py-3 flex items-center justify-between gap-3 mb-3 sticky top-[106px] z-10">
          <p class="text-sm text-gray-500 flex-shrink-0">
            <span class="font-medium text-gray-900">{{ filteredProducts.length }}</span> results
            <span v-if="searchQuery"> for "<strong>{{ searchQuery }}</strong>"</span>
          </p>
          <div class="flex items-center gap-2 flex-wrap justify-end">
            <span class="text-sm text-gray-500 flex-shrink-0">Sort by:</span>
            <button
              v-for="opt in sortOptions"
              :key="opt.value"
              @click="sortBy = opt.value"
              class="px-3 py-1.5 text-xs font-medium rounded-full border transition"
              :class="sortBy === opt.value
                ? 'border-flipkart-blue text-flipkart-blue bg-blue-50'
                : 'border-gray-200 text-gray-600 hover:border-gray-400'"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <!-- Product Grid -->
        <div v-if="filteredProducts.length > 0">
          <div
            v-for="product in filteredProducts"
            :key="product.name"
            class="bg-white shadow-sm rounded mb-1 flex gap-4 p-4 hover:shadow-md transition cursor-pointer"
            @click="$router.push(`/product/${product.name}`)"
          >
            <!-- Product Image -->
            <div class="w-40 h-40 flex-shrink-0 flex items-center justify-center">
              <img
                :src="product.image"
                :alt="product.title"
                class="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-200"
                onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
              />
            </div>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <h3 class="text-base text-gray-900 mb-1 line-clamp-2">{{ product.title }}</h3>
              <div class="flex items-center gap-2 mb-2">
                <span class="inline-flex items-center gap-0.5 bg-[#388e3c] text-white text-xs px-1.5 py-0.5 rounded font-bold">
                  {{ product.rating }} ★
                </span>
                <span class="text-xs text-gray-500">({{ product.reviews?.toLocaleString('en-IN') }} ratings)</span>
                <span v-if="product.assured" class="text-[10px] text-flipkart-blue border border-flipkart-blue px-1 py-0.5 rounded-sm font-bold ml-1">
                  F ASSURED
                </span>
              </div>
              <div class="flex items-center gap-3 mb-2">
                <span class="text-2xl font-bold text-gray-900">₹{{ product.price.toLocaleString('en-IN') }}</span>
                <span class="text-sm text-gray-400 line-through">₹{{ product.originalPrice?.toLocaleString('en-IN') }}</span>
                <span class="text-sm font-bold text-[#388e3c]">{{ product.discount }}% off</span>
              </div>
              <p v-if="product.freeDelivery" class="text-xs text-gray-500 mb-2">
                <span class="font-bold">Free Delivery</span> by {{ deliveryDate }}
              </p>
              <p class="text-xs text-gray-600 line-clamp-2 mb-3">{{ product.description }}</p>
              <div v-if="product.specs" class="hidden sm:flex flex-wrap gap-x-4 gap-y-1 mb-3">
                <span
                  v-for="(val, key) in Object.entries(product.specs).slice(0, 3)"
                  :key="key"
                  class="text-xs text-gray-600"
                >
                  <span class="text-gray-400">{{ val[0] }}:</span> {{ val[1] }}
                </span>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col items-center gap-2 flex-shrink-0" @click.stop>
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click.stop="handleAddToCart(product)"
                class="bg-flipkart-orange text-white text-sm font-bold px-5 py-2.5 rounded hover:bg-orange-500 transition whitespace-nowrap"
              >
                Add to Cart
              </button>
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click.stop="handleBuyNow(product)"
                class="bg-flipkart-blue text-white text-sm font-bold px-5 py-2.5 rounded hover:bg-blue-700 transition whitespace-nowrap"
              >
                Buy Now
              </button>
              <router-link
                v-if="!isLoggedIn"
                to="/login"
                @click.stop
                class="bg-flipkart-orange text-white text-sm font-bold px-5 py-2.5 rounded hover:bg-orange-500 transition whitespace-nowrap"
              >
                Login to Buy
              </router-link>
              <button
                v-if="isLoggedIn"
                @click.stop="store.addToWishlist(product)"
                class="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500 transition mt-1"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        </div>

        <div v-else class="bg-white rounded shadow-sm p-16 text-center">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-xl font-bold text-gray-700 mb-2">No results found</h3>
          <p class="text-gray-500 mb-4">Try adjusting your filters or search for something different</p>
          <button @click="resetFilters" class="bg-flipkart-blue text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition">
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const router = useRouter()
const route = useRoute()
const { isLoggedIn } = sessionStore()
const store = productStore()

const sortBy = ref('relevance')
const selectedCategories = ref([])
const selectedBrands = ref([])
const selectedPriceRange = ref(null)
const minRating = ref(null)
const minDiscount = ref(null)
const inStockOnly = ref(false)
const selectedCategory = ref('')

const searchQuery = computed(() => route.query?.q || '')

const sortOptions = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Popularity', value: 'popularity' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Rating', value: 'rating' },
  { label: 'Newest First', value: 'newest' },
]

const priceRanges = [
  { label: 'Under ₹500', min: 0, max: 500 },
  { label: '₹500 – ₹1,000', min: 500, max: 1000 },
  { label: '₹1,000 – ₹5,000', min: 1000, max: 5000 },
  { label: '₹5,000 – ₹10,000', min: 5000, max: 10000 },
  { label: '₹10,000 – ₹20,000', min: 10000, max: 20000 },
  { label: 'Over ₹20,000', min: 20000, max: Infinity },
]

const allCategories = computed(() => [...new Set(store.products.map((p) => p.category).filter(Boolean))])
const allBrands = computed(() => [...new Set(store.products.map((p) => p.brand).filter(Boolean))].sort())

const filteredProducts = computed(() => {
  let result = [...store.products]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(
      (p) =>
        p.title?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    )
  }

  if (selectedCategories.value.length) {
    result = result.filter((p) => selectedCategories.value.includes(p.category))
  }

  if (selectedBrands.value.length) {
    result = result.filter((p) => selectedBrands.value.includes(p.brand))
  }

  if (selectedPriceRange.value) {
    result = result.filter(
      (p) => p.price >= selectedPriceRange.value.min && p.price <= selectedPriceRange.value.max
    )
  }

  if (minRating.value) {
    result = result.filter((p) => Number(p.rating) >= minRating.value)
  }

  if (minDiscount.value) {
    result = result.filter((p) => (p.discount || 0) >= minDiscount.value)
  }

  if (inStockOnly.value) {
    result = result.filter((p) => p.stock > 0)
  }

  switch (sortBy.value) {
    case 'price_asc': result.sort((a, b) => a.price - b.price); break
    case 'price_desc': result.sort((a, b) => b.price - a.price); break
    case 'rating': result.sort((a, b) => Number(b.rating) - Number(a.rating)); break
    case 'popularity': result.sort((a, b) => (b.reviews || 0) - (a.reviews || 0)); break
  }

  return result
})

const resetFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  selectedPriceRange.value = null
  minRating.value = null
  minDiscount.value = null
  inStockOnly.value = false
}

const deliveryDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
})

const handleAddToCart = (product) => {
  store.addToCart(product)
}

const handleBuyNow = (product) => {
  store.addToCart(product)
  router.push('/checkout')
}
</script>
