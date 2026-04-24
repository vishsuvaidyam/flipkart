<template>
  <div class="min-h-screen bg-[#f1f3f6]">
    <!-- Breadcrumb -->
    <div class="max-w-[1300px] mx-auto px-3 py-2 text-xs text-gray-500">
      <router-link to="/" class="hover:text-flipkart-blue">Home</router-link>
      <span class="mx-1">›</span>
      <span class="text-gray-700">Shopping Cart</span>
    </div>

    <div class="max-w-[1300px] mx-auto px-3 pb-8">
      <div v-if="cartItems.length > 0" class="flex flex-col lg:flex-row gap-3">

        <!-- LEFT: Cart Items -->
        <div class="flex-1 min-w-0">
          <!-- Items -->
          <div class="bg-white shadow-sm rounded overflow-hidden mb-3">
            <div class="px-6 py-4 border-b flex items-center justify-between">
              <h2 class="font-bold text-gray-900">My Cart ({{ cartItems.length }} items)</h2>
              <span class="text-sm text-gray-500">{{ totalSavings > 0 ? `You're saving ₹${totalSavings.toLocaleString('en-IN')} on this order` : '' }}</span>
            </div>

            <div v-for="item in cartItems" :key="item.name" class="flex gap-4 px-6 py-5 border-b last:border-0 hover:bg-gray-50/50 transition">
              <!-- Product Image -->
              <router-link :to="`/product/${item.name}`" class="flex-shrink-0">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="w-24 h-24 object-contain"
                  onerror="this.src='https://placehold.co/96x96/f5f5f5/999?text=Product'"
                />
              </router-link>

              <!-- Item Details -->
              <div class="flex-1 min-w-0">
                <router-link :to="`/product/${item.name}`" class="block text-sm text-gray-900 hover:text-flipkart-blue mb-1 line-clamp-2 font-medium">
                  {{ item.title }}
                </router-link>
                <p class="text-xs text-gray-500 mb-2">Seller: <span class="text-gray-700">{{ item.seller || 'RetailNet' }}</span></p>
                <div v-if="item.assured" class="mb-2">
                  <span class="text-[10px] text-flipkart-blue border border-flipkart-blue px-1 py-0.5 rounded-sm font-bold">FLIPKART ASSURED</span>
                </div>

                <!-- Price -->
                <div class="flex items-center gap-2 mb-3">
                  <span class="text-xl font-bold text-gray-900">₹{{ item.price.toLocaleString('en-IN') }}</span>
                  <span v-if="item.originalPrice" class="text-sm text-gray-400 line-through">₹{{ item.originalPrice.toLocaleString('en-IN') }}</span>
                  <span v-if="item.discount" class="text-sm font-bold text-[#388e3c]">{{ item.discount }}% off</span>
                </div>

                <!-- Quantity & Actions -->
                <div class="flex items-center gap-4 flex-wrap">
                  <div class="flex items-center border border-gray-300 rounded overflow-hidden">
                    <button
                      @click="store.updateQuantity(item.name, item.quantity - 1)"
                      class="px-3 py-1.5 hover:bg-gray-100 transition font-bold text-lg leading-none text-gray-700"
                    >−</button>
                    <span class="px-4 py-1.5 border-x border-gray-300 text-sm font-medium min-w-[40px] text-center">{{ item.quantity }}</span>
                    <button
                      @click="store.updateQuantity(item.name, item.quantity + 1)"
                      class="px-3 py-1.5 hover:bg-gray-100 transition font-bold text-lg leading-none text-gray-700"
                    >+</button>
                  </div>

                  <button
                    @click="handleSaveForLater(item)"
                    class="text-sm text-gray-600 hover:text-flipkart-blue transition font-medium uppercase tracking-wide"
                  >
                    SAVE FOR LATER
                  </button>

                  <button
                    @click="store.removeFromCart(item.name)"
                    class="text-sm text-gray-600 hover:text-red-500 transition font-medium uppercase tracking-wide"
                  >
                    REMOVE
                  </button>
                </div>
              </div>

              <!-- Subtotal -->
              <div class="flex-shrink-0 text-right">
                <p class="text-base font-bold text-gray-900">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</p>
                <p v-if="item.freeDelivery" class="text-xs text-[#388e3c] mt-1">Free Delivery</p>
              </div>
            </div>
          </div>

          <!-- Saved for Later -->
          <div v-if="savedForLater.length > 0" class="bg-white shadow-sm rounded overflow-hidden">
            <div class="px-6 py-3 border-b">
              <h3 class="font-bold text-gray-900">Saved for Later ({{ savedForLater.length }})</h3>
            </div>
            <div class="flex gap-4 px-6 py-4 overflow-x-auto">
              <div
                v-for="item in savedForLater"
                :key="item.name"
                class="flex-shrink-0 w-36 text-center"
              >
                <img :src="item.image" class="w-full h-28 object-contain mb-2"
                  onerror="this.src='https://placehold.co/144x112/f5f5f5/999?text=Product'" />
                <p class="text-xs text-gray-700 line-clamp-2 mb-1">{{ item.title }}</p>
                <p class="text-sm font-bold mb-2">₹{{ item.price.toLocaleString('en-IN') }}</p>
                <button
                  @click="moveToCart(item)"
                  class="w-full bg-flipkart-orange text-white text-xs font-bold py-1.5 rounded hover:bg-orange-500 transition"
                >
                  Move to Cart
                </button>
              </div>
            </div>
          </div>

          <!-- Coupon Section -->
          <div class="bg-white shadow-sm rounded px-6 py-4 mt-3">
            <h3 class="font-bold text-sm text-gray-900 mb-3">Coupons & Offers</h3>
            <div class="flex gap-2">
              <input
                v-model="couponCode"
                type="text"
                placeholder="Enter Coupon Code"
                class="flex-1 border border-gray-300 rounded px-4 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue"
              />
              <button
                @click="applyCoupon"
                class="bg-flipkart-blue text-white px-5 py-2.5 rounded text-sm font-bold hover:bg-blue-700 transition"
              >
                Apply
              </button>
            </div>
            <div v-if="couponMsg" class="mt-2 text-sm" :class="couponApplied ? 'text-[#388e3c]' : 'text-red-500'">
              {{ couponMsg }}
            </div>
          </div>

          <!-- Place Order Button (Mobile) -->
          <div class="lg:hidden mt-3">
            <button
              @click="$router.push('/checkout')"
              class="w-full bg-flipkart-orange text-white py-4 rounded font-bold text-base hover:bg-orange-500 transition"
            >
              Place Order
            </button>
          </div>
        </div>

        <!-- RIGHT: Price Summary -->
        <div class="w-full lg:w-[340px] flex-shrink-0">
          <div class="bg-white shadow-sm rounded overflow-hidden sticky top-[110px]">
            <div class="px-5 py-3 border-b">
              <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Price Details</h3>
            </div>
            <div class="px-5 py-4 space-y-3">
              <div class="flex justify-between text-sm text-gray-700">
                <span>Price ({{ totalQty }} item{{ totalQty > 1 ? 's' : '' }})</span>
                <span>₹{{ originalTotal.toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-700">
                <span>Discount</span>
                <span class="text-[#388e3c] font-medium">− ₹{{ totalSavings.toLocaleString('en-IN') }}</span>
              </div>
              <div class="flex justify-between text-sm text-gray-700">
                <span>Delivery Charges</span>
                <span class="text-[#388e3c] font-medium">FREE</span>
              </div>
              <div v-if="couponApplied" class="flex justify-between text-sm text-gray-700">
                <span>Coupon Discount</span>
                <span class="text-[#388e3c] font-medium">− ₹{{ couponDiscount.toLocaleString('en-IN') }}</span>
              </div>
            </div>
            <div class="px-5 py-4 border-t border-b">
              <div class="flex justify-between font-bold text-gray-900">
                <span class="text-base">Total Amount</span>
                <span class="text-lg">₹{{ finalTotal.toLocaleString('en-IN') }}</span>
              </div>
            </div>
            <div class="px-5 py-3">
              <p class="text-sm text-[#388e3c] font-medium">
                You will save ₹{{ (totalSavings + (couponApplied ? couponDiscount : 0)).toLocaleString('en-IN') }} on this order
              </p>
            </div>
            <div class="px-5 pb-5">
              <button
                @click="$router.push('/checkout')"
                class="w-full bg-flipkart-orange text-white py-3.5 rounded font-bold text-base hover:bg-orange-500 transition"
              >
                Place Order
              </button>
            </div>
          </div>

          <!-- Safe & Secure -->
          <div class="mt-3 flex items-center justify-center gap-2 text-gray-500 text-xs">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Safe and Secure Payments. Easy returns. 100% Authentic products.</span>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="bg-white rounded shadow-sm">
        <div class="text-center py-20">
          <div class="text-8xl mb-6">🛒</div>
          <h2 class="text-2xl font-bold text-gray-700 mb-2">Your cart is empty!</h2>
          <p class="text-gray-500 mb-6">Add items to it now.</p>
          <router-link
            to="/shop"
            class="inline-block bg-flipkart-blue text-white font-bold px-10 py-3 rounded hover:bg-blue-700 transition"
          >
            Shop Now
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

const cartItems = computed(() => store.cart)
const savedForLater = ref([])
const couponCode = ref('')
const couponMsg = ref('')
const couponApplied = ref(false)
const couponDiscount = ref(0)

const totalQty = computed(() => store.cart.reduce((sum, i) => sum + i.quantity, 0))
const originalTotal = computed(() =>
  store.cart.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0)
)
const subtotal = computed(() => store.cart.reduce((sum, i) => sum + i.price * i.quantity, 0))
const totalSavings = computed(() => originalTotal.value - subtotal.value)
const finalTotal = computed(() => subtotal.value - (couponApplied.value ? couponDiscount.value : 0))

const handleSaveForLater = (item) => {
  savedForLater.value.push(item)
  store.removeFromCart(item.name)
}

const moveToCart = (item) => {
  savedForLater.value = savedForLater.value.filter((i) => i.name !== item.name)
  store.addToCart(item)
}

const applyCoupon = () => {
  const code = couponCode.value.trim().toUpperCase()
  if (code === 'FLIPKART10') {
    couponApplied.value = true
    couponDiscount.value = Math.round(subtotal.value * 0.1)
    couponMsg.value = `Coupon applied! You saved ₹${couponDiscount.value.toLocaleString('en-IN')}`
  } else if (code === 'SAVE500') {
    couponApplied.value = true
    couponDiscount.value = Math.min(500, subtotal.value)
    couponMsg.value = `Coupon applied! You saved ₹${couponDiscount.value.toLocaleString('en-IN')}`
  } else {
    couponApplied.value = false
    couponDiscount.value = 0
    couponMsg.value = 'Invalid coupon code. Try FLIPKART10 or SAVE500'
  }
}
</script>
