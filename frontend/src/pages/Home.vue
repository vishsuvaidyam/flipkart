<template>
  <div class="min-h-screen bg-[#f1f3f6]">

    <!-- Hero Section: Categories + Banner -->
    <div class="max-w-[1300px] mx-auto px-2 pt-3">
      <div class="flex gap-0 bg-white shadow-sm rounded overflow-hidden">

        <!-- Left: Category Sidebar -->
        <div class="hidden lg:block w-[200px] flex-shrink-0 border-r border-gray-100">
          <div
            v-for="cat in sidebarCategories"
            :key="cat.name"
            class="group relative"
          >
            <a href="#" class="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:text-flipkart-blue hover:bg-blue-50 transition cursor-pointer border-b border-gray-50">
              <span class="flex items-center gap-3">
                <span class="text-base">{{ cat.icon }}</span>
                <span class="font-medium">{{ cat.name }}</span>
              </span>
              <span class="text-gray-400 text-xs">›</span>
            </a>
          </div>
        </div>

        <!-- Right: Banner Carousel -->
        <div class="flex-1 relative overflow-hidden" style="min-height: 300px; max-height: 340px;">
          <div
            class="flex transition-transform duration-500 ease-in-out h-full"
            :style="{ transform: `translateX(-${currentBanner * 100}%)` }"
          >
            <div
              v-for="banner in banners"
              :key="banner.id"
              class="flex-shrink-0 w-full h-full flex items-center justify-center cursor-pointer"
              :style="{ backgroundColor: banner.bg }"
              @click="banner.link && $router.push(banner.link)"
            >
              <div class="flex items-center justify-between w-full h-full px-12">
                <div class="text-white">
                  <p class="text-sm font-medium opacity-80 mb-1">{{ banner.tag }}</p>
                  <h2 class="text-4xl font-bold mb-2">{{ banner.title }}</h2>
                  <p class="text-lg opacity-90 mb-4">{{ banner.subtitle }}</p>
                  <router-link :to="banner.link || '/shop'"
                    class="inline-block bg-white text-sm font-bold px-6 py-2.5 rounded hover:bg-opacity-90 transition"
                    :style="{ color: banner.bg }"
                  >
                    {{ banner.cta }}
                  </router-link>
                </div>
                <div class="text-[120px] leading-none select-none hidden sm:block">{{ banner.emoji }}</div>
              </div>
            </div>
          </div>

          <!-- Carousel Controls -->
          <button
            @click="prevBanner"
            class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            @click="nextBanner"
            class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md transition"
          >
            <svg class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Dots -->
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            <button
              v-for="(_, i) in banners"
              :key="i"
              @click="currentBanner = i"
              class="w-2 h-2 rounded-full transition-all"
              :class="currentBanner === i ? 'bg-white w-4' : 'bg-white/50'"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Categories Grid -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3">
      <div class="bg-white shadow-sm rounded p-4">
        <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
          <a
            v-for="cat in quickCategories"
            :key="cat.name"
            href="#"
            class="flex flex-col items-center gap-1.5 p-2 hover:shadow-md rounded transition cursor-pointer"
          >
            <div
              class="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
              :style="{ backgroundColor: cat.bg }"
            >{{ cat.icon }}</div>
            <span class="text-xs text-center text-gray-700 font-medium leading-tight">{{ cat.name }}</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Deal of the Day -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3">
      <div class="bg-white shadow-sm rounded overflow-hidden">
        <div class="flex items-center justify-between px-6 py-3 border-b">
          <div class="flex items-center gap-4">
            <h2 class="text-xl font-bold text-gray-900">Deal of the Day</h2>
            <div class="flex items-center gap-1.5 text-sm text-gray-600">
              <span>Ends in</span>
              <span class="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs font-mono font-bold">{{ countdown.h }}</span>
              <span class="font-bold text-gray-900">:</span>
              <span class="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs font-mono font-bold">{{ countdown.m }}</span>
              <span class="font-bold text-gray-900">:</span>
              <span class="bg-gray-900 text-white px-1.5 py-0.5 rounded text-xs font-mono font-bold">{{ countdown.s }}</span>
            </div>
          </div>
          <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y">
          <div
            v-for="product in dealProducts"
            :key="product.name"
            class="p-4 hover:shadow-inner cursor-pointer transition"
            @click="$router.push(`/product/${product.name}`)"
          >
            <div class="relative mb-3">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-32 object-contain"
                onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
              />
              <span class="absolute top-0 left-0 bg-[#388e3c] text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                {{ product.discount }}% off
              </span>
            </div>
            <p class="text-sm font-bold text-[#388e3c] mb-0.5">{{ product.discount }}% off</p>
            <p class="text-xs text-gray-600 line-clamp-2 leading-tight">{{ product.title }}</p>
            <p class="text-sm font-bold mt-1">₹{{ product.price.toLocaleString('en-IN') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Promotional Banners Row -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-for="promo in promoBanners"
          :key="promo.title"
          class="rounded overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition"
          :style="{ backgroundColor: promo.bg }"
        >
          <div class="p-5 flex items-center justify-between" style="min-height: 120px;">
            <div class="text-white">
              <p class="text-xs font-medium opacity-80 mb-1">{{ promo.tag }}</p>
              <h3 class="text-lg font-bold mb-1">{{ promo.title }}</h3>
              <p class="text-xs opacity-80 mb-3">{{ promo.desc }}</p>
              <router-link to="/shop" class="inline-block bg-white text-xs font-bold px-4 py-1.5 rounded-sm" :style="{ color: promo.bg }">
                {{ promo.cta }}
              </router-link>
            </div>
            <span class="text-5xl">{{ promo.emoji }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Best of Electronics -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3">
      <div class="bg-white shadow-sm rounded overflow-hidden">
        <div class="flex items-center justify-between px-6 py-3 border-b">
          <h2 class="text-xl font-bold text-gray-900">Best of Electronics</h2>
          <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 divide-x divide-y">
          <div
            v-for="product in electronicsProducts"
            :key="product.name"
            class="p-4 hover:shadow-inner cursor-pointer transition"
            @click="$router.push(`/product/${product.name}`)"
          >
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-28 object-contain mb-3"
              onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
            />
            <p class="text-xs text-gray-700 line-clamp-2 leading-tight mb-1">{{ product.title }}</p>
            <div class="flex items-center gap-1 mb-0.5">
              <span class="text-xs bg-[#388e3c] text-white px-1 py-0.5 rounded-sm font-bold">{{ product.rating }} ★</span>
            </div>
            <p class="text-sm font-bold">₹{{ product.price.toLocaleString('en-IN') }}</p>
            <p class="text-xs text-[#388e3c] font-bold">{{ product.discount }}% off</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Fashion Row -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <!-- Men's Fashion -->
        <div class="bg-white shadow-sm rounded overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <h2 class="text-lg font-bold text-gray-900">Men's Top Picks</h2>
            <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
          </div>
          <div class="grid grid-cols-3 divide-x">
            <div
              v-for="product in menFashion"
              :key="product.name"
              class="p-3 hover:shadow-inner cursor-pointer transition"
              @click="$router.push(`/product/${product.name}`)"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-24 object-contain mb-2"
                onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Fashion'"
              />
              <p class="text-xs text-gray-700 line-clamp-2 leading-tight">{{ product.title }}</p>
              <p class="text-sm font-bold mt-1">₹{{ product.price.toLocaleString('en-IN') }}</p>
              <p class="text-xs text-[#388e3c]">{{ product.discount }}% off</p>
            </div>
          </div>
        </div>

        <!-- Women's Fashion -->
        <div class="bg-white shadow-sm rounded overflow-hidden">
          <div class="flex items-center justify-between px-4 py-3 border-b">
            <h2 class="text-lg font-bold text-gray-900">Women's Top Picks</h2>
            <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
          </div>
          <div class="grid grid-cols-3 divide-x">
            <div
              v-for="product in womenFashion"
              :key="product.name"
              class="p-3 hover:shadow-inner cursor-pointer transition"
              @click="$router.push(`/product/${product.name}`)"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-24 object-contain mb-2"
                onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Fashion'"
              />
              <p class="text-xs text-gray-700 line-clamp-2 leading-tight">{{ product.title }}</p>
              <p class="text-sm font-bold mt-1">₹{{ product.price.toLocaleString('en-IN') }}</p>
              <p class="text-xs text-[#388e3c]">{{ product.discount }}% off</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Best Sellers -->
    <div class="max-w-[1300px] mx-auto px-2 mt-3 mb-6">
      <div class="bg-white shadow-sm rounded overflow-hidden">
        <div class="flex items-center justify-between px-6 py-3 border-b">
          <h2 class="text-xl font-bold text-gray-900">Top Rated Products</h2>
          <router-link to="/shop" class="text-flipkart-blue text-sm font-bold hover:underline">View All ›</router-link>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 divide-x divide-y">
          <div
            v-for="product in topRated"
            :key="product.name"
            class="group p-4 hover:shadow-inner cursor-pointer transition"
            @click="$router.push(`/product/${product.name}`)"
          >
            <div class="relative mb-3">
              <img
                :src="product.image"
                :alt="product.title"
                class="w-full h-36 object-contain group-hover:scale-105 transition-transform duration-200"
                onerror="this.src='https://placehold.co/200x200/f5f5f5/999?text=Product'"
              />
              <button
                v-if="isLoggedIn"
                @click.stop="addToWishlist(product)"
                class="absolute top-0 right-0 text-gray-300 hover:text-red-500 transition"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            <p class="text-sm text-gray-800 line-clamp-2 leading-tight mb-1.5">{{ product.title }}</p>
            <div class="flex items-center gap-1 mb-1">
              <span class="text-xs bg-[#388e3c] text-white px-1 py-0.5 rounded font-bold">{{ product.rating }} ★</span>
              <span class="text-xs text-gray-500">({{ product.reviews?.toLocaleString('en-IN') }})</span>
            </div>
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-base font-bold text-gray-900">₹{{ product.price.toLocaleString('en-IN') }}</span>
              <span class="text-xs text-gray-400 line-through">₹{{ product.originalPrice?.toLocaleString('en-IN') }}</span>
              <span class="text-xs text-[#388e3c] font-bold">{{ product.discount }}% off</span>
            </div>
            <div v-if="product.freeDelivery" class="mt-1">
              <span class="text-xs text-gray-500">Free Delivery</span>
            </div>
            <div v-if="product.assured" class="mt-1 flex items-center gap-1">
              <span class="text-[10px] text-flipkart-blue font-bold border border-flipkart-blue px-1 py-0.5 rounded-sm">F ASSURED</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-[#212121] text-white mt-8">
      <div class="max-w-[1300px] mx-auto px-4 py-10">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm pb-8 border-b border-gray-700">
          <div>
            <h4 class="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">About</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Contact Us</a></li>
              <li><a href="#" class="hover:text-white transition">About Us</a></li>
              <li><a href="#" class="hover:text-white transition">Careers</a></li>
              <li><a href="#" class="hover:text-white transition">Press</a></li>
              <li><a href="#" class="hover:text-white transition">Flipkart Stories</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Help</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Payments</a></li>
              <li><a href="#" class="hover:text-white transition">Shipping</a></li>
              <li><a href="#" class="hover:text-white transition">Cancellation & Returns</a></li>
              <li><a href="#" class="hover:text-white transition">FAQ</a></li>
              <li><a href="#" class="hover:text-white transition">Report Infringement</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Policy</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Return Policy</a></li>
              <li><a href="#" class="hover:text-white transition">Terms Of Use</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
              <li><a href="#" class="hover:text-white transition">Privacy</a></li>
              <li><a href="#" class="hover:text-white transition">Sitemap</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Social</h4>
            <ul class="space-y-2 text-gray-300">
              <li><a href="#" class="hover:text-white transition">Facebook</a></li>
              <li><a href="#" class="hover:text-white transition">Twitter</a></li>
              <li><a href="#" class="hover:text-white transition">YouTube</a></li>
              <li><a href="#" class="hover:text-white transition">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div class="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-400 text-sm">
          <div class="flex items-center gap-4 flex-wrap justify-center">
            <span class="flex items-center gap-2">🏢 Registered Office Address: Flipkart Internet Private Limited</span>
          </div>
          <div class="flex items-center gap-3 text-xs">
            <span>© 2007-2024 Flipkart.com</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const { isLoggedIn } = sessionStore()
const store = productStore()
const { addToWishlist } = store

// Banner Carousel
const currentBanner = ref(0)
let bannerTimer = null

const banners = [
  {
    id: 1,
    tag: 'GREAT DEALS',
    title: 'Electronics Sale',
    subtitle: 'Up to 80% off on top brands',
    cta: 'Shop Now',
    bg: '#2874f0',
    emoji: '📱',
    link: '/shop',
  },
  {
    id: 2,
    tag: 'FASHION WEEK',
    title: 'Style Yourself',
    subtitle: 'Latest trends at best prices',
    cta: 'Explore Now',
    bg: '#c0392b',
    emoji: '👗',
    link: '/shop',
  },
  {
    id: 3,
    tag: 'HOME MAKEOVER',
    title: 'Home & Living',
    subtitle: 'Upgrade your space with amazing deals',
    cta: 'Discover',
    bg: '#27ae60',
    emoji: '🏠',
    link: '/shop',
  },
  {
    id: 4,
    tag: 'BESTSELLERS',
    title: 'Top Books',
    subtitle: 'Expand your mind at unbeatable prices',
    cta: 'Browse Books',
    bg: '#8e44ad',
    emoji: '📚',
    link: '/shop',
  },
]

const nextBanner = () => { currentBanner.value = (currentBanner.value + 1) % banners.length }
const prevBanner = () => { currentBanner.value = (currentBanner.value - 1 + banners.length) % banners.length }

onMounted(() => {
  bannerTimer = setInterval(nextBanner, 4000)
})
onUnmounted(() => {
  if (bannerTimer) clearInterval(bannerTimer)
})

// Countdown Timer
const countdown = ref({ h: '11', m: '45', s: '23' })
let countdownTimer = null

const startCountdown = () => {
  let totalSeconds = 11 * 3600 + 45 * 60 + 23
  countdownTimer = setInterval(() => {
    totalSeconds--
    if (totalSeconds < 0) totalSeconds = 86399
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    countdown.value = {
      h: String(h).padStart(2, '0'),
      m: String(m).padStart(2, '0'),
      s: String(s).padStart(2, '0'),
    }
  }, 1000)
}

onMounted(startCountdown)
onUnmounted(() => { if (countdownTimer) clearInterval(countdownTimer) })

// Product sections
const products = computed(() => store.products)

const dealProducts = computed(() =>
  [...products.value].sort((a, b) => (b.discount || 0) - (a.discount || 0)).slice(0, 6)
)

const electronicsProducts = computed(() =>
  products.value.filter((p) => p.category === 'Electronics').slice(0, 6)
)

const menFashion = computed(() =>
  products.value.filter((p) => p.category === 'Fashion' && p.title.toLowerCase().includes('men')).slice(0, 3)
    .concat(products.value.filter((p) => p.category === 'Fashion').slice(0, 3)).slice(0, 3)
)

const womenFashion = computed(() =>
  products.value.filter((p) => p.category === 'Fashion' && p.title.toLowerCase().includes('women')).slice(0, 3)
    .concat(products.value.filter((p) => p.category === 'Fashion').slice(3, 6)).slice(0, 3)
)

const topRated = computed(() =>
  [...products.value].sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)).slice(0, 10)
)

// Sidebar Categories
const sidebarCategories = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Mobiles', icon: '📱' },
  { name: "Men's Fashion", icon: '👔' },
  { name: "Women's Fashion", icon: '👗' },
  { name: 'Home & Furniture', icon: '🏠' },
  { name: 'Grocery', icon: '🛒' },
  { name: 'Sports', icon: '⚽' },
  { name: 'Beauty', icon: '💄' },
  { name: 'Books', icon: '📚' },
  { name: 'Toys', icon: '🧸' },
  { name: 'Appliances', icon: '🔌' },
  { name: 'Flights', icon: '✈️' },
]

// Quick Category Icons
const quickCategories = [
  { name: 'Mobiles', icon: '📱', bg: '#e3f2fd' },
  { name: 'Fashion', icon: '👗', bg: '#fce4ec' },
  { name: 'Electronics', icon: '💻', bg: '#e8f5e9' },
  { name: 'Home', icon: '🏠', bg: '#fff3e0' },
  { name: 'Appliances', icon: '🔌', bg: '#f3e5f5' },
  { name: 'Beauty', icon: '💄', bg: '#fce4ec' },
  { name: 'Sports', icon: '⚽', bg: '#e8f5e9' },
  { name: 'Books', icon: '📚', bg: '#fff8e1' },
  { name: 'Grocery', icon: '🛒', bg: '#e0f7fa' },
  { name: 'Toys', icon: '🧸', bg: '#f3e5f5' },
]

// Promo Banners
const promoBanners = [
  { tag: 'UP TO 80% OFF', title: 'Best Deals on Mobiles', desc: 'Top brands at lowest prices', cta: 'Shop Now', bg: '#1565c0', emoji: '📱' },
  { tag: 'SUMMER SALE', title: "Fashion Under ₹499", desc: 'Trendy styles for every occasion', cta: 'Grab Now', bg: '#b71c1c', emoji: '👔' },
  { tag: 'KITCHEN FEST', title: 'Home & Kitchen', desc: 'Upgrade your home with top deals', cta: 'Discover', bg: '#1b5e20', emoji: '🍳' },
]
</script>
