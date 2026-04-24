<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container max-w-4xl">
      <h1 class="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div v-if="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Cart Items -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div v-for="item in cartItems" :key="item.name" class="flex gap-4 pb-6 border-b last:border-b-0 last:pb-0 mb-6">
            <img :src="item.image" :alt="item.title" class="w-20 h-20 object-cover rounded" onerror="this.src='https://via.placeholder.com/80'">
            <div class="flex-1">
              <h3 class="font-bold mb-2">{{ item.title }}</h3>
              <p class="text-flipkart-blue font-bold mb-2">₹{{ item.price }}</p>
              <div class="flex items-center gap-2">
                <button @click="updateQuantity(item.name, item.quantity - 1)" class="px-2 py-1 border rounded">-</button>
                <span>{{ item.quantity }}</span>
                <button @click="updateQuantity(item.name, item.quantity + 1)" class="px-2 py-1 border rounded">+</button>
                <span class="text-gray-600">= ₹{{ item.price * item.quantity }}</span>
              </div>
            </div>
            <button @click="removeItem(item.name)" class="text-red-600 font-bold">Remove</button>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="bg-white rounded-lg shadow p-6 h-fit">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-4 pb-4 border-b">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping:</span>
              <span>₹{{ shipping }}</span>
            </div>
            <div class="flex justify-between">
              <span>Tax:</span>
              <span>₹{{ tax }}</span>
            </div>
          </div>
          <div class="flex justify-between font-bold text-lg mb-6">
            <span>Total:</span>
            <span class="text-flipkart-blue">₹{{ total }}</span>
          </div>
          <button @click="$router.push('/checkout')" class="w-full bg-flipkart-orange text-black py-2 rounded font-bold hover:bg-opacity-90">
            Proceed to Checkout
          </button>
        </div>
      </div>

      <div v-else class="bg-white rounded-lg shadow p-12 text-center">
        <p class="text-gray-600 text-lg mb-4">Your cart is empty</p>
        <router-link to="/shop" class="text-flipkart-blue font-bold hover:underline">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { productStore } from '@/stores/products'

const { cart, removeFromCart, updateQuantity } = productStore()

const cartItems = computed(() => cart)

const subtotal = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
})

const shipping = 50
const tax = computed(() => Math.round(subtotal.value * 0.1))
const total = computed(() => subtotal.value + shipping + tax.value)

const removeItem = (productName) => {
  removeFromCart(productName)
}
</script>
