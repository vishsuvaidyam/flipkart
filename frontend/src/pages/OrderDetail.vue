<template>
  <div class="order-detail py-8">
    <div class="container max-w-2xl">
      <router-link to="/orders" class="text-flipkart-blue hover:underline mb-6 inline-block">
        ← Back to Orders
      </router-link>

      <div v-if="order" class="space-y-6">
        <div class="bg-white rounded shadow p-6">
          <div class="flex justify-between items-start mb-6">
            <div>
              <h1 class="text-2xl font-bold">Order #{{ order.id }}</h1>
              <p class="text-gray-600">Date: {{ order.date }}</p>
            </div>
            <p
              :class="[
                'font-bold text-lg px-4 py-2 rounded',
                order.status === 'Delivered'
                  ? 'bg-green-100 text-green-700'
                  : order.status === 'Processing'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-orange-100 text-orange-700',
              ]"
            >
              {{ order.status }}
            </p>
          </div>

          <!-- Order Items -->
          <div class="border-t pt-6">
            <h2 class="font-bold text-lg mb-4">Items</h2>
            <div v-for="item in order.items" :key="item.id" class="flex justify-between py-3 border-b last:border-b-0">
              <div>
                <p class="font-bold">{{ item.name }}</p>
                <p class="text-gray-600">Qty: {{ item.qty }}</p>
              </div>
              <p class="font-bold">₹{{ item.price * item.qty }}</p>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="border-t mt-6 pt-6 space-y-2">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{{ order.subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping:</span>
              <span>₹50</span>
            </div>
            <div class="flex justify-between">
              <span>Tax:</span>
              <span>₹{{ order.tax }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-4 border-t">
              <span>Total:</span>
              <span class="text-flipkart-blue">₹{{ order.total }}</span>
            </div>
          </div>
        </div>

        <!-- Delivery Address -->
        <div class="bg-white rounded shadow p-6">
          <h2 class="font-bold text-lg mb-4">Delivery Address</h2>
          <p class="text-gray-700">{{ order.address }}</p>
        </div>
      </div>

      <div v-else class="bg-white rounded shadow p-8 text-center">
        <p class="text-gray-500">Order not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

// Sample order data - in real app, fetch from backend
const orders = {
  1001: {
    id: '1001',
    date: '2024-01-15',
    status: 'Delivered',
    items: [
      { id: 1, name: 'Product 1', qty: 1, price: 2999 },
      { id: 2, name: 'Product 2', qty: 1, price: 2500 },
    ],
    subtotal: 5499,
    tax: 550,
    total: 6099,
    address: '123 Main Street, New Delhi, Delhi 110001',
  },
}

const order = computed(() => orders[route.params.orderId])
</script>
