<template>
  <div class="min-h-screen bg-gray-100 py-8">
    <div class="container max-w-2xl">
      <h1 class="text-3xl font-bold mb-8">Checkout</h1>

      <div class="space-y-6">
        <!-- Delivery Address -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Delivery Address</h2>
          <form class="space-y-4">
            <input type="text" placeholder="Full Name" class="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="email" placeholder="Email" class="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="tel" placeholder="Phone Number" class="w-full border border-gray-300 rounded px-4 py-2" />
            <input type="text" placeholder="Street Address" class="w-full border border-gray-300 rounded px-4 py-2" />
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="City" class="border border-gray-300 rounded px-4 py-2" />
              <input type="text" placeholder="Postal Code" class="border border-gray-300 rounded px-4 py-2" />
            </div>
          </form>
        </div>

        <!-- Payment Method -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Payment Method</h2>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="radio" name="payment" value="card" class="mr-3" />
              <span>Credit/Debit Card</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="payment" value="upi" class="mr-3" />
              <span>UPI</span>
            </label>
            <label class="flex items-center">
              <input type="radio" name="payment" value="cod" class="mr-3" />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Order Summary</h2>
          <div class="space-y-2 mb-4 pb-4 border-b">
            <div class="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{{ subtotal }}</span>
            </div>
            <div class="flex justify-between">
              <span>Shipping:</span>
              <span>₹50</span>
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
          <button @click="placeOrder" class="w-full bg-flipkart-blue text-white py-3 rounded font-bold hover:bg-opacity-90">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { productStore } from '@/stores/products'
import { computed } from 'vue'

const router = useRouter()
const { cart } = productStore()

const subtotal = computed(() => {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0)
})

const tax = computed(() => Math.round(subtotal.value * 0.1))
const total = computed(() => subtotal.value + 50 + tax.value)

const placeOrder = () => {
  alert('Order placed successfully! Order ID: ORD' + Date.now())
  router.push('/orders')
}
</script>
