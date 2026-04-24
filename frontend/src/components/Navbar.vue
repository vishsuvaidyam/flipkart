<template>
  <nav class="bg-flipkart-blue text-white sticky top-0 z-50 shadow-md">
    <!-- Main Navbar Row -->
    <div class="max-w-[1300px] mx-auto px-4 py-2.5 flex items-center gap-3">
      <!-- Logo -->
      <router-link to="/" class="flex-shrink-0 mr-1">
        <div class="text-white font-bold text-[22px] leading-none">Flipkart</div>
        <div class="text-[#ffe500] text-[11px] italic leading-none mt-0.5">
          Explore <span class="font-bold">Plus</span> <span class="text-white text-[8px]">✦</span>
        </div>
      </router-link>

      <!-- Search Bar -->
      <div class="flex-1 max-w-[580px] relative">
        <div class="flex shadow-sm">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search for products, brands and more"
            class="w-full px-4 py-2.5 text-gray-800 text-sm focus:outline-none rounded-l-sm"
            @input="onSearchInput"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
            @keyup.enter="doSearch"
          />
          <button
            @click="doSearch"
            class="bg-white hover:bg-gray-50 px-4 py-2.5 rounded-r-sm transition"
          >
            <svg class="h-5 w-5 text-flipkart-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        <!-- Search Suggestions Dropdown -->
        <div
          v-if="showSuggestions && searchSuggestions.length > 0"
          class="absolute top-full left-0 right-0 bg-white shadow-xl z-[100] rounded-b border border-gray-100"
        >
          <div
            v-for="product in searchSuggestions"
            :key="product.name"
            class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0"
            @mousedown.prevent="selectSuggestion(product)"
          >
            <svg class="h-4 w-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div class="flex-1 min-w-0">
              <p class="text-sm text-gray-800 truncate">{{ product.title }}</p>
              <p class="text-xs text-gray-400">in {{ product.category }}</p>
            </div>
            <span class="text-xs text-gray-400">₹{{ product.price.toLocaleString('en-IN') }}</span>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="flex items-center gap-5 ml-auto">

        <!-- Login or Profile -->
        <router-link v-if="!isLoggedIn" to="/login"
          class="flex flex-col items-center min-w-[64px] cursor-pointer hover:text-blue-100 transition"
        >
          <span class="text-sm font-bold leading-none">Login</span>
          <span class="text-xs leading-none mt-0.5 opacity-80">My Account</span>
        </router-link>

        <div v-else class="relative group">
          <button class="flex items-center gap-1 hover:text-blue-100 transition">
            <div class="flex flex-col items-start">
              <span class="text-sm font-bold leading-none">{{ userName }}</span>
              <span class="text-xs leading-none mt-0.5 opacity-80">Account ▾</span>
            </div>
          </button>
          <!-- Profile Dropdown -->
          <div class="hidden group-hover:block absolute right-0 top-full pt-1 z-[100]">
            <div class="bg-white text-gray-800 shadow-2xl rounded border border-gray-100 min-w-[220px] overflow-hidden">
              <div class="px-4 py-3 bg-gray-50 border-b">
                <p class="text-xs text-gray-500">Hello,</p>
                <p class="font-bold text-sm text-gray-800">{{ userName }}</p>
              </div>
              <div class="py-1">
                <router-link to="/orders"
                  class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  My Orders
                </router-link>
                <router-link to="/wishlist"
                  class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm"
                >
                  <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  My Wishlist
                </router-link>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">
                  <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Flipkart Plus Zone
                </a>
                <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">
                  <svg class="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Notifications
                </a>
              </div>
              <div class="border-t py-1">
                <button
                  @click="handleLogout"
                  class="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 text-sm text-red-600"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Become a Seller -->
        <a href="#" class="hidden lg:flex flex-col items-center hover:text-blue-100 transition">
          <span class="text-sm font-bold leading-none">Become</span>
          <span class="text-xs leading-none mt-0.5 opacity-80">a Seller</span>
        </a>

        <!-- More Dropdown -->
        <div class="hidden md:block relative group">
          <button class="flex items-center gap-0.5 hover:text-blue-100 transition">
            <span class="text-sm font-bold">More</span>
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div class="hidden group-hover:block absolute right-0 top-full pt-1 z-[100]">
            <div class="bg-white text-gray-800 shadow-2xl rounded border border-gray-100 min-w-[180px] overflow-hidden py-1">
              <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">📢 Advertise</a>
              <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">📱 Download App</a>
              <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">🎁 Gift Cards</a>
              <a href="#" class="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 text-sm">❓ Help Center</a>
            </div>
          </div>
        </div>

        <!-- Wishlist Icon -->
        <router-link v-if="isLoggedIn" to="/wishlist"
          class="hidden sm:flex flex-col items-center hover:text-blue-100 transition relative"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span class="text-xs leading-none mt-0.5">Wishlist</span>
        </router-link>

        <!-- Cart Icon -->
        <router-link v-if="isLoggedIn" to="/cart"
          class="flex flex-col items-center hover:text-blue-100 transition relative"
        >
          <div class="relative">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span
              v-if="cartCount > 0"
              class="absolute -top-2 -right-2 bg-flipkart-orange text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-0.5"
            >{{ cartCount }}</span>
          </div>
          <span class="text-xs leading-none mt-0.5 font-bold">Cart</span>
        </router-link>
      </div>
    </div>

    <!-- Categories Bar -->
    <div class="hidden md:block border-t border-blue-500/50">
      <div class="max-w-[1300px] mx-auto px-4">
        <div class="flex items-stretch overflow-x-auto scrollbar-hide">
          <div
            v-for="cat in categories"
            :key="cat.label"
            class="relative group flex-shrink-0"
          >
            <a
              href="#"
              class="flex flex-col items-center justify-center gap-0.5 px-4 py-1.5 text-[13px] font-medium hover:bg-blue-600/50 transition whitespace-nowrap min-h-[44px]"
            >
              <span class="text-base leading-none">{{ cat.icon }}</span>
              <span class="leading-none">{{ cat.label }}</span>
            </a>
            <!-- Submenu dropdown -->
            <div
              v-if="cat.submenu"
              class="hidden group-hover:block absolute top-full left-1/2 -translate-x-1/2 bg-white text-gray-800 shadow-2xl rounded-b border border-gray-100 z-[100] min-w-[180px] py-2"
            >
              <a
                v-for="sub in cat.submenu"
                :key="sub"
                href="#"
                class="block px-4 py-2 text-sm hover:bg-blue-50 hover:text-flipkart-blue transition"
              >{{ sub }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Search Row -->
    <div class="md:hidden px-3 pb-2 pt-1">
      <div class="flex">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for products"
          class="w-full px-3 py-2 text-gray-800 text-sm rounded-l focus:outline-none"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch" class="bg-white px-3 py-2 rounded-r">
          <svg class="h-4 w-4 text-flipkart-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const router = useRouter()
const { isLoggedIn, user, logout } = sessionStore()
const store = productStore()

const searchQuery = ref('')
const showSuggestions = ref(false)

const userName = computed(() => {
  if (user.value) {
    const part = user.value.split('@')[0]
    return part.charAt(0).toUpperCase() + part.slice(1)
  }
  return ''
})

const cartCount = computed(() => store.cartCount)

const searchSuggestions = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return []
  const q = searchQuery.value.toLowerCase()
  return store.products.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 8)
})

const onSearchInput = () => {
  showSuggestions.value = true
}

const hideSuggestions = () => {
  setTimeout(() => { showSuggestions.value = false }, 200)
}

const doSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ name: 'Search', query: { q: searchQuery.value.trim() } })
    showSuggestions.value = false
  }
}

const selectSuggestion = (product) => {
  router.push(`/product/${product.name}`)
  searchQuery.value = ''
  showSuggestions.value = false
}

const handleLogout = async () => {
  await logout.submit()
}

const categories = [
  {
    label: 'Electronics',
    icon: '💻',
    submenu: ['Mobile Phones', 'Laptops', 'Cameras & Accessories', 'TVs & Media', 'Tablets', 'Headphones & Speakers', 'Smart Watches'],
  },
  {
    label: 'TVs & Appliances',
    icon: '📺',
    submenu: ['Televisions', 'Refrigerators', 'Washing Machines', 'Air Conditioners', 'Microwaves', 'Dishwashers'],
  },
  {
    label: 'Men',
    icon: '👔',
    submenu: ['T-Shirts & Polos', 'Casual Shirts', 'Formal Shirts', 'Jeans', 'Trousers', 'Ethnic Wear', 'Shoes'],
  },
  {
    label: 'Women',
    icon: '👗',
    submenu: ['Kurtis & Suits', 'Sarees', 'Dresses', 'Tops & Tees', 'Jeans', 'Heels & Flats', 'Handbags'],
  },
  {
    label: 'Baby & Kids',
    icon: '🧸',
    submenu: ["Baby Clothing", "Toys & Games", "School Supplies", "Kids' Books", "Sports for Kids"],
  },
  {
    label: 'Home & Furniture',
    icon: '🏠',
    submenu: ['Kitchen & Dining', 'Bed & Bath', 'Home Decor', 'Furniture', 'Garden & Outdoors'],
  },
  {
    label: 'Sports',
    icon: '⚽',
    submenu: ['Cricket', 'Football', 'Badminton', 'Fitness Equipment', 'Yoga', 'Cycling'],
  },
  {
    label: 'Beauty',
    icon: '💄',
    submenu: ['Skincare', 'Makeup', 'Hair Care', 'Fragrances', 'Bath & Body', 'Grooming'],
  },
  { label: 'Grocery', icon: '🛒' },
  { label: 'Flights', icon: '✈️' },
  { label: 'Offer Zone', icon: '🏷️' },
]
</script>
