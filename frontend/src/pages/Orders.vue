<template>
  <div class="min-h-screen bg-[#f1f3f6]">
    <div class="max-w-[1300px] mx-auto px-3 py-4">

      <!-- Page Header -->
      <div class="bg-white shadow-sm rounded px-6 py-4 mb-3 flex items-center justify-between">
        <h1 class="text-xl font-bold text-gray-900">My Orders</h1>
        <div class="flex items-center gap-3">
          <input
            v-model="searchOrders"
            type="text"
            placeholder="Search your orders here"
            class="border border-gray-300 rounded px-4 py-2 text-sm w-56 focus:outline-none focus:border-flipkart-blue"
          />
          <button class="bg-flipkart-blue text-white px-4 py-2 text-sm rounded font-bold hover:bg-blue-700 transition">
            Search Orders
          </button>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex gap-2 mb-3 flex-wrap">
        <button
          v-for="filter in orderFilters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-4 py-1.5 text-sm rounded-full border transition"
          :class="activeFilter === filter
            ? 'bg-flipkart-blue text-white border-flipkart-blue'
            : 'border-gray-300 text-gray-600 hover:border-gray-400 bg-white'"
        >
          {{ filter }}
        </button>
      </div>

      <!-- Orders List -->
      <div v-if="filteredOrders.length > 0" class="space-y-3">
        <div
          v-for="order in filteredOrders"
          :key="order.id"
          class="bg-white shadow-sm rounded overflow-hidden"
        >
          <!-- Order Header -->
          <div class="px-6 py-3 border-b bg-gray-50 flex items-center justify-between text-xs text-gray-500">
            <div class="flex gap-6 flex-wrap">
              <div>
                <p class="uppercase font-bold text-gray-400 tracking-wide mb-0.5">Order Placed</p>
                <p class="text-gray-700 font-medium">{{ order.date }}</p>
              </div>
              <div>
                <p class="uppercase font-bold text-gray-400 tracking-wide mb-0.5">Total</p>
                <p class="text-gray-700 font-medium">₹{{ order.total.toLocaleString('en-IN') }}</p>
              </div>
              <div>
                <p class="uppercase font-bold text-gray-400 tracking-wide mb-0.5">Ship To</p>
                <p class="text-flipkart-blue font-medium cursor-pointer hover:underline">{{ order.address || 'Home' }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-gray-700 mb-0.5">Order # {{ order.id }}</p>
              <router-link
                :to="`/order/${order.id}`"
                class="text-flipkart-blue hover:underline"
              >
                View order details
              </router-link>
            </div>
          </div>

          <!-- Order Items -->
          <div
            v-for="item in order.items"
            :key="item.name"
            class="flex items-center gap-4 px-6 py-4 border-b last:border-0"
          >
            <router-link :to="`/product/${item.productId}`" class="flex-shrink-0">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-20 h-20 object-contain"
                onerror="this.src='https://placehold.co/80x80/f5f5f5/999?text=Product'"
              />
            </router-link>

            <div class="flex-1 min-w-0">
              <router-link :to="`/product/${item.productId}`">
                <p class="text-sm font-medium text-gray-900 hover:text-flipkart-blue line-clamp-2 mb-1">{{ item.title }}</p>
              </router-link>
              <p class="text-xs text-gray-500 mb-2">Qty: {{ item.qty }}</p>
              <div class="flex items-center gap-2">
                <div
                  class="w-2 h-2 rounded-full"
                  :class="{
                    'bg-[#388e3c]': order.status === 'Delivered',
                    'bg-blue-500': order.status === 'Processing' || order.status === 'Confirmed',
                    'bg-orange-500': order.status === 'Shipped',
                    'bg-red-500': order.status === 'Cancelled',
                  }"
                ></div>
                <p class="text-sm font-medium"
                  :class="{
                    'text-[#388e3c]': order.status === 'Delivered',
                    'text-blue-600': order.status === 'Processing' || order.status === 'Confirmed',
                    'text-orange-500': order.status === 'Shipped',
                    'text-red-500': order.status === 'Cancelled',
                  }"
                >{{ order.status }}</p>
                <span v-if="order.deliveryDate" class="text-xs text-gray-500">
                  <span v-if="order.status === 'Delivered'">on {{ order.deliveryDate }}</span>
                  <span v-else>Expected by {{ order.deliveryDate }}</span>
                </span>
              </div>
              <!-- Rating prompt for delivered items -->
              <div v-if="order.status === 'Delivered' && !item.rated" class="mt-2">
                <button
                  @click="rateProduct(item)"
                  class="flex items-center gap-1 text-xs text-gray-600 border border-gray-300 px-3 py-1 rounded hover:border-gray-400 transition"
                >
                  <span>⭐</span> Rate & Review Product
                </button>
              </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-2 flex-shrink-0">
              <button
                v-if="order.status !== 'Cancelled' && order.status !== 'Delivered'"
                class="text-sm border border-gray-300 px-4 py-2 rounded hover:border-gray-400 transition text-gray-700"
              >
                Track Package
              </button>
              <button
                v-if="order.status === 'Delivered'"
                class="text-sm border border-gray-300 px-4 py-2 rounded hover:border-gray-400 transition text-gray-700"
              >
                Return / Exchange
              </button>
              <router-link
                :to="`/order/${order.id}`"
                class="text-sm text-flipkart-blue font-bold hover:underline text-center"
              >
                View Details
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded shadow-sm">
        <div class="text-center py-20">
          <div class="text-7xl mb-5">📦</div>
          <h2 class="text-xl font-bold text-gray-700 mb-2">
            {{ searchOrders ? 'No orders found' : 'No orders yet' }}
          </h2>
          <p class="text-gray-500 mb-6">
            {{ searchOrders ? 'Try a different search term' : 'Looks like you haven\'t ordered anything yet.' }}
          </p>
          <router-link
            to="/shop"
            class="inline-block bg-flipkart-blue text-white font-bold px-10 py-3 rounded hover:bg-blue-700 transition"
          >
            Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { productStore } from '@/stores/products'

const store = productStore()
const searchOrders = ref('')
const activeFilter = ref('All Orders')

const orderFilters = ['All Orders', 'Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']

const sampleProducts = computed(() => store.products.slice(0, 6))

const orders = ref([
  {
    id: 'FK2024010001',
    date: '15 Jan 2024',
    total: 5498,
    address: 'Home',
    status: 'Delivered',
    deliveryDate: '18 Jan 2024',
    items: [
      { name: 'item1', productId: 'PROD001', title: 'boAt Rockerz 450 Bluetooth On-Ear Headphones with Mic', qty: 1, image: 'https://placehold.co/80x80/2874f0/ffffff?text=boAt', rated: false },
      { name: 'item2', productId: 'PROD003', title: 'Mi 20000mAh Power Bank 3i with 18W Fast Charging', qty: 1, image: 'https://placehold.co/80x80/ff6b6b/ffffff?text=Mi+PB', rated: true },
    ],
  },
  {
    id: 'FK2024020015',
    date: '22 Feb 2024',
    total: 16499,
    address: 'Office',
    status: 'Shipped',
    deliveryDate: '26 Feb 2024',
    items: [
      { name: 'item3', productId: 'PROD007', title: 'Samsung Galaxy M34 5G (Midnight Blue, 6GB RAM, 128GB)', qty: 1, image: 'https://placehold.co/80x80/0f3460/ffffff?text=Samsung', rated: false },
    ],
  },
  {
    id: 'FK2024030089',
    date: '5 Mar 2024',
    total: 2148,
    address: 'Home',
    status: 'Processing',
    deliveryDate: '9 Mar 2024',
    items: [
      { name: 'item4', productId: 'PROD019', title: 'Atomic Habits: An Easy & Proven Way to Build Good Habits', qty: 1, image: 'https://placehold.co/80x80/e67e22/ffffff?text=Book', rated: false },
      { name: 'item5', productId: 'PROD020', title: 'The Psychology of Money: Timeless Lessons on Wealth', qty: 1, image: 'https://placehold.co/80x80/2ecc71/ffffff?text=Book2', rated: false },
    ],
  },
  {
    id: 'FK2024040120',
    date: '10 Apr 2024',
    total: 599,
    address: 'Home',
    status: 'Cancelled',
    deliveryDate: null,
    items: [
      { name: 'item6', productId: 'PROD004', title: 'JBL C50HI In-Ear Headphones with Mic (Black)', qty: 1, image: 'https://placehold.co/80x80/2c3e50/ffffff?text=JBL', rated: false },
    ],
  },
])

const filteredOrders = computed(() => {
  let result = orders.value
  if (activeFilter.value !== 'All Orders') {
    result = result.filter((o) => o.status === activeFilter.value)
  }
  if (searchOrders.value) {
    const q = searchOrders.value.toLowerCase()
    result = result.filter(
      (o) =>
        o.id.toLowerCase().includes(q) ||
        o.items.some((i) => i.title.toLowerCase().includes(q))
    )
  }
  return result
})

const rateProduct = (item) => {
  item.rated = true
  store.showToast('Thank you for your rating!', 'success')
}
</script>
