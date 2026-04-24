<template>
  <div class="min-h-screen bg-[#f1f3f6]" v-if="product">
    <!-- Breadcrumb -->
    <div class="max-w-[1300px] mx-auto px-3 py-2 text-xs text-gray-500">
      <router-link to="/" class="hover:text-flipkart-blue">Home</router-link>
      <span class="mx-1">›</span>
      <a href="#" class="hover:text-flipkart-blue">{{ product.category }}</a>
      <span class="mx-1">›</span>
      <span class="text-gray-700">{{ product.brand }}</span>
      <span class="mx-1">›</span>
      <span class="text-gray-700 truncate max-w-[200px] inline-block align-bottom">{{ product.title }}</span>
    </div>

    <div class="max-w-[1300px] mx-auto px-3 pb-8">
      <div class="bg-white shadow-sm rounded">
        <div class="flex flex-col lg:flex-row">

          <!-- LEFT: Image Gallery -->
          <div class="lg:w-[400px] flex-shrink-0 p-6 border-r border-gray-100 sticky top-[110px] self-start">
            <!-- Main Image -->
            <div class="relative flex items-center justify-center h-72 mb-4 border border-gray-100 rounded">
              <img
                :src="selectedImage"
                :alt="product.title"
                class="max-h-full max-w-full object-contain transition-opacity duration-200"
                onerror="this.src='https://placehold.co/400x400/f5f5f5/999?text=Product'"
              />
              <!-- Wishlist button -->
              <button
                v-if="isLoggedIn"
                @click="toggleWishlist"
                class="absolute top-3 right-3 p-1.5 rounded-full bg-white shadow-md hover:scale-110 transition"
              >
                <svg class="w-5 h-5 transition" :class="inWishlist ? 'text-red-500 fill-red-500' : 'text-gray-400'"
                  viewBox="0 0 24 24" stroke="currentColor" fill="none">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            <!-- Thumbnail images (simulated) -->
            <div class="flex gap-2 justify-center mb-6">
              <div
                v-for="(img, i) in thumbnails"
                :key="i"
                @click="selectedImage = img"
                class="w-14 h-14 border-2 rounded cursor-pointer flex items-center justify-center p-1 transition"
                :class="selectedImage === img ? 'border-flipkart-blue' : 'border-gray-200 hover:border-gray-400'"
              >
                <img :src="img" class="max-w-full max-h-full object-contain"
                  onerror="this.src='https://placehold.co/56x56/f5f5f5/999?text=img'" />
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3">
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click="handleAddToCart"
                class="flex-1 flex items-center justify-center gap-2 bg-flipkart-orange text-white font-bold py-3 rounded hover:bg-orange-500 transition text-sm"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Add to Cart
              </button>
              <button
                v-if="isLoggedIn && product.stock > 0"
                @click="handleBuyNow"
                class="flex-1 flex items-center justify-center gap-2 bg-flipkart-blue text-white font-bold py-3 rounded hover:bg-blue-700 transition text-sm"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Buy Now
              </button>
              <router-link
                v-if="!isLoggedIn"
                to="/login"
                class="flex-1 text-center bg-flipkart-orange text-white font-bold py-3 rounded hover:bg-orange-500 transition text-sm"
              >
                Login to Buy
              </router-link>
              <button
                v-if="product.stock === 0"
                disabled
                class="flex-1 bg-gray-200 text-gray-500 font-bold py-3 rounded cursor-not-allowed text-sm"
              >
                Out of Stock
              </button>
            </div>
          </div>

          <!-- RIGHT: Product Details -->
          <div class="flex-1 p-6">
            <!-- Title & Brand -->
            <div class="mb-4">
              <h1 class="text-xl font-medium text-gray-900 mb-1 leading-snug">{{ product.title }}</h1>
              <p class="text-sm text-gray-500">Brand: <span class="text-flipkart-blue hover:underline cursor-pointer">{{ product.brand }}</span></p>
            </div>

            <!-- Rating Row -->
            <div class="flex items-center gap-3 mb-4 pb-4 border-b">
              <div class="flex items-center gap-1.5">
                <span class="bg-[#388e3c] text-white text-sm font-bold px-2 py-0.5 rounded flex items-center gap-0.5">
                  {{ product.rating }} ★
                </span>
                <span class="text-sm text-gray-500">{{ product.reviews?.toLocaleString('en-IN') }} Ratings</span>
                <span class="text-gray-300">|</span>
                <span class="text-sm text-gray-500">{{ Math.round((product.reviews || 0) * 0.15) }} Questions & Answers</span>
              </div>
              <span v-if="product.assured" class="text-[11px] text-flipkart-blue border border-flipkart-blue px-1.5 py-0.5 rounded-sm font-bold">
                FLIPKART ASSURED
              </span>
            </div>

            <!-- Price Section -->
            <div class="mb-4 pb-4 border-b">
              <div class="flex items-baseline gap-3 mb-1">
                <span class="text-3xl font-bold text-gray-900">₹{{ product.price.toLocaleString('en-IN') }}</span>
                <span class="text-base text-gray-400 line-through">₹{{ product.originalPrice?.toLocaleString('en-IN') }}</span>
                <span class="text-base font-bold text-[#388e3c]">{{ product.discount }}% off</span>
              </div>
              <p class="text-xs text-gray-500">Inclusive of all taxes</p>
              <p v-if="product.freeDelivery" class="text-xs text-gray-600 mt-1">
                <span class="font-bold">Free Delivery</span>
                <span class="text-gray-500"> by {{ deliveryDate }}</span>
              </p>
            </div>

            <!-- Offers -->
            <div class="mb-4 pb-4 border-b">
              <h3 class="font-bold text-sm text-gray-900 mb-3">Available Offers</h3>
              <ul class="space-y-2">
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-[#388e3c] font-bold flex-shrink-0">Bank Offer</span>
                  <span class="text-gray-700">10% off on SBI Credit Card EMI Transactions, up to ₹1500</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-[#388e3c] font-bold flex-shrink-0">Bank Offer</span>
                  <span class="text-gray-700">₹50 off on first BHIM UPI transaction on this product</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-[#388e3c] font-bold flex-shrink-0">Partner Offer</span>
                  <span class="text-gray-700">Purchase this product and get ₹200 SuperCoins. Know More</span>
                </li>
                <li class="flex items-start gap-2 text-sm">
                  <span class="text-[#388e3c] font-bold flex-shrink-0">Special Price</span>
                  <span class="text-gray-700">Get extra {{ product.discount }}% off (price inclusive of cashback/coupon)</span>
                </li>
              </ul>
            </div>

            <!-- Seller Info -->
            <div class="mb-4 pb-4 border-b flex items-center gap-4">
              <div class="text-sm text-gray-600 flex gap-2">
                <span class="text-gray-500 min-w-[80px]">Seller</span>
                <div>
                  <span class="text-flipkart-blue font-medium hover:underline cursor-pointer">{{ product.seller || 'RetailNet' }}</span>
                  <div class="flex items-center gap-1 mt-0.5">
                    <span class="bg-[#388e3c] text-white text-[10px] px-1 py-0.5 rounded font-bold">4.7 ★</span>
                    <span class="text-xs text-gray-500">5,234 Ratings</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quantity Selector -->
            <div class="mb-4 pb-4 border-b" v-if="product.stock > 0">
              <div class="flex items-center gap-4 text-sm">
                <span class="text-gray-500 min-w-[80px]">Quantity</span>
                <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button @click="qty > 1 && qty--" class="px-3 py-1.5 hover:bg-gray-100 transition font-bold text-lg leading-none">−</button>
                  <span class="px-4 py-1.5 border-x border-gray-300 text-sm font-medium">{{ qty }}</span>
                  <button @click="qty < 10 && qty++" class="px-3 py-1.5 hover:bg-gray-100 transition font-bold text-lg leading-none">+</button>
                </div>
                <span class="text-xs text-gray-500">{{ product.stock }} available</span>
              </div>
            </div>

            <!-- Highlights / Specs Preview -->
            <div class="mb-4 pb-4 border-b" v-if="product.specs && Object.keys(product.specs).length">
              <h3 class="font-bold text-sm text-gray-900 mb-3">Highlights</h3>
              <ul class="space-y-1.5">
                <li v-for="(val, key) in product.specs" :key="key" class="flex items-start gap-2 text-sm">
                  <span class="text-gray-400 mt-0.5">•</span>
                  <span class="text-gray-700"><span class="font-medium">{{ key }}:</span> {{ val }}</span>
                </li>
              </ul>
            </div>

            <!-- Description -->
            <div class="mb-4">
              <h3 class="font-bold text-sm text-gray-900 mb-2">Description</h3>
              <p class="text-sm text-gray-700 leading-relaxed">{{ product.description }}</p>
            </div>
          </div>
        </div>

        <!-- Specifications Full Table -->
        <div class="border-t px-6 py-6" v-if="product.specs && Object.keys(product.specs).length">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
          <div class="bg-gray-50 rounded overflow-hidden">
            <table class="w-full text-sm">
              <tbody>
                <tr v-for="(val, key) in product.specs" :key="key" class="border-b border-gray-100 hover:bg-blue-50/50">
                  <td class="py-3 px-4 text-gray-500 font-medium w-1/3">{{ key }}</td>
                  <td class="py-3 px-4 text-gray-800">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Ratings & Reviews Section -->
        <div class="border-t px-6 py-6">
          <h2 class="text-xl font-bold text-gray-900 mb-4">Ratings & Reviews</h2>
          <div class="flex gap-8 mb-6">
            <!-- Overall Rating -->
            <div class="text-center flex-shrink-0">
              <div class="text-5xl font-bold text-gray-900">{{ product.rating }}</div>
              <div class="flex justify-center my-1">
                <span v-for="s in 5" :key="s" class="text-xl" :class="s <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-300'">★</span>
              </div>
              <div class="text-sm text-gray-500">{{ product.reviews?.toLocaleString('en-IN') }} ratings &</div>
              <div class="text-sm text-gray-500">{{ Math.round((product.reviews || 0) * 0.15) }} reviews</div>
            </div>
            <!-- Rating Bars -->
            <div class="flex-1 space-y-1.5">
              <div v-for="(pct, star) in ratingBars" :key="star" class="flex items-center gap-2">
                <span class="text-xs text-gray-600 flex-shrink-0 w-8 text-right">{{ 5 - star }}★</span>
                <div class="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div class="bg-[#388e3c] h-2 rounded-full transition-all" :style="{ width: pct + '%' }"></div>
                </div>
                <span class="text-xs text-gray-500 flex-shrink-0 w-8">{{ pct }}%</span>
              </div>
            </div>
          </div>

          <!-- Sample Reviews -->
          <div class="space-y-6">
            <div v-for="review in sampleReviews" :key="review.id" class="pb-4 border-b last:border-0">
              <div class="flex items-center gap-3 mb-2">
                <span class="bg-[#388e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  {{ review.rating }} ★
                </span>
                <span class="font-bold text-sm text-gray-900">{{ review.title }}</span>
              </div>
              <p class="text-sm text-gray-700 mb-2 leading-relaxed">{{ review.body }}</p>
              <div class="flex items-center gap-3 text-xs text-gray-500">
                <span>{{ review.author }}</span>
                <span>•</span>
                <span>{{ review.date }}</span>
                <span>•</span>
                <span>Certified Buyer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Similar Products -->
      <div class="mt-3 bg-white shadow-sm rounded overflow-hidden">
        <div class="flex items-center justify-between px-6 py-3 border-b">
          <h2 class="text-lg font-bold text-gray-900">Similar Products</h2>
          <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y">
          <div
            v-for="p in similarProducts"
            :key="p.name"
            class="p-4 hover:shadow-inner cursor-pointer transition"
            @click="$router.push(`/product/${p.name}`)"
          >
            <img
              :src="p.image"
              :alt="p.title"
              class="w-full h-28 object-contain mb-2"
              onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
            />
            <p class="text-xs text-gray-700 line-clamp-2 mb-1">{{ p.title }}</p>
            <div class="flex items-center gap-1 mb-0.5">
              <span class="text-[10px] bg-[#388e3c] text-white px-1 py-0.5 rounded font-bold">{{ p.rating }} ★</span>
            </div>
            <p class="text-sm font-bold">₹{{ p.price.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-[#388e3c]">{{ p.discount }}% off</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Product Not Found -->
  <div v-else class="min-h-screen bg-[#f1f3f6] flex items-center justify-center">
    <div class="text-center bg-white p-12 rounded shadow-sm">
      <div class="text-6xl mb-4">😕</div>
      <h2 class="text-xl font-bold text-gray-700 mb-2">Product not found</h2>
      <router-link to="/shop" class="text-flipkart-blue font-bold hover:underline">Browse Products</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const router = useRouter()
const { isLoggedIn } = sessionStore()
const store = productStore()

const props = defineProps({
  productId: { type: String, required: true },
})

const qty = ref(1)

const product = computed(() => store.products.find((p) => p.name === props.productId))

const selectedImage = ref('')
const thumbnails = computed(() => {
  if (!product.value) return []
  const base = product.value.image
  const colors = ['2874f0', '388e3c', 'c0392b', 'f39c12']
  const imgs = [base]
  for (let i = 1; i < 4; i++) {
    imgs.push(`https://placehold.co/400x400/${colors[i]}/ffffff?text=View+${i + 1}`)
  }
  return imgs
})

watch(product, (p) => {
  if (p) selectedImage.value = p.image
}, { immediate: true })

const inWishlist = computed(() => product.value ? store.isInWishlist(product.value.name) : false)

const toggleWishlist = () => {
  if (!product.value) return
  if (inWishlist.value) {
    store.removeFromWishlist(product.value.name)
  } else {
    store.addToWishlist(product.value)
  }
}

const handleAddToCart = () => {
  if (!product.value) return
  for (let i = 0; i < qty.value; i++) store.addToCart(product.value)
}

const handleBuyNow = () => {
  handleAddToCart()
  router.push('/checkout')
}

const deliveryDate = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() + 2)
  return d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
})

const similarProducts = computed(() => {
  if (!product.value) return []
  return store.products
    .filter((p) => p.name !== product.value.name && p.category === product.value.category)
    .slice(0, 6)
    .concat(store.products.filter((p) => p.name !== product.value?.name).slice(0, 6))
    .slice(0, 6)
})

const ratingBars = [62, 21, 9, 5, 3]

const sampleReviews = computed(() => [
  {
    id: 1,
    rating: 5,
    title: 'Excellent product! Worth every penny',
    body: `Absolutely love this product! The quality is outstanding and it arrived sooner than expected. The build quality feels premium and it works exactly as described. Highly recommend to anyone considering this purchase.`,
    author: 'Rahul S.',
    date: '3 Feb, 2024',
  },
  {
    id: 2,
    rating: 4,
    title: 'Good value for money',
    body: `Overall a great product for the price. The performance is solid and matches expectations. Packaging was good and delivery was on time. Minor issue with the manual but everything else is perfect.`,
    author: 'Priya M.',
    date: '14 Jan, 2024',
  },
  {
    id: 3,
    rating: 4,
    title: 'Satisfied with the purchase',
    body: `Been using this for a few weeks now and it's been great. No complaints so far. The product looks exactly like in the pictures. Customer support was also helpful when I had a query.`,
    author: 'Amit K.',
    date: '28 Dec, 2023',
  },
])
</script>
