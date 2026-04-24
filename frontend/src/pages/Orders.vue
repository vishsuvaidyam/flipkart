<template>
  <div class="orders py-8">
    <div class="container">
      <h1 class="text-3xl font-bold mb-8">My Orders</h1>

      <div v-if="orders.length > 0" class="space-y-4">
        <div
          v-for="order in orders"
          :key="order.id"
          class="bg-white rounded shadow p-6 hover:shadow-lg transition cursor-pointer"
          @click="$router.push(`/order/${order.id}`)"
        >
          <div class="flex justify-between items-start">
            <div>
              <h3 class="font-bold text-lg mb-2">Order #{{ order.id }}</h3>
              <p class="text-gray-600 mb-2">Date: {{ order.date }}</p>
              <p class="text-gray-600">Items: {{ order.items }}</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-flipkart-blue mb-2">₹{{ order.total }}</p>
              <p
                :class="[
                  'font-bold',
                  order.status === 'Delivered'
                    ? 'text-green-600'
                    : order.status === 'Processing'
                      ? 'text-blue-600'
                      : 'text-orange-600',
                ]"
              >
                {{ order.status }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="bg-white rounded shadow p-12 text-center">
        <p class="text-gray-500 text-lg mb-4">No orders yet</p>
        <router-link to="/shop" class="text-flipkart-blue font-bold hover:underline">
          Start Shopping
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Sample orders - in real app, fetch from backend
const orders = ref([
  {
    id: '1001',
    date: '2024-01-15',
    items: 2,
    total: 5499,
    status: 'Delivered',
  },
  {
    id: '1002',
    date: '2024-01-10',
    items: 1,
    total: 2999,
    status: 'Processing',
  },
])
</script>
