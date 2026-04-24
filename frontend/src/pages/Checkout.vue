<template>
  <div class="min-h-screen bg-[#f1f3f6]">
    <!-- Top Bar -->
    <div class="bg-white shadow-sm">
      <div class="max-w-[1300px] mx-auto px-4 py-3 flex items-center gap-6">
        <router-link to="/" class="text-xl font-bold text-flipkart-blue">Flipkart</router-link>
        <div class="flex items-center gap-3 text-sm flex-1">
          <div class="flex items-center gap-1.5"
            v-for="(step, i) in steps"
            :key="step.label"
          >
            <div class="flex items-center gap-1.5">
              <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition"
                :class="currentStep >= i + 1 ? 'bg-flipkart-blue text-white' : 'bg-gray-200 text-gray-500'"
              >
                <span v-if="currentStep > i + 1">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <span class="font-bold text-xs uppercase tracking-wide"
                :class="currentStep >= i + 1 ? 'text-flipkart-blue' : 'text-gray-400'"
              >{{ step.label }}</span>
            </div>
            <span v-if="i < steps.length - 1" class="text-gray-300 mx-1">—</span>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[1300px] mx-auto px-3 py-4 flex flex-col lg:flex-row gap-3">

      <!-- LEFT: Steps Content -->
      <div class="flex-1 min-w-0">

        <!-- Step 1: Delivery Address -->
        <div class="bg-white shadow-sm rounded overflow-hidden mb-3">
          <div
            class="flex items-center justify-between px-5 py-4 cursor-pointer"
            :class="currentStep === 1 ? 'bg-flipkart-blue text-white' : 'bg-white'"
            @click="currentStep = 1"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
                :class="currentStep >= 1 ? 'border-current bg-current/20' : 'border-gray-300 text-gray-400'">
                {{ currentStep > 1 ? '✓' : '1' }}
              </span>
              <span class="font-bold uppercase text-sm tracking-wider">Delivery Address</span>
            </div>
            <span v-if="currentStep !== 1 && deliveryAddress.name" class="text-xs">
              {{ deliveryAddress.name }}, {{ deliveryAddress.city }}
            </span>
          </div>

          <div v-if="currentStep === 1" class="px-6 py-5">
            <!-- Existing Address or New -->
            <div class="mb-4">
              <div
                class="border-2 border-flipkart-blue rounded p-4 mb-3 cursor-pointer"
                v-if="savedAddress.name"
              >
                <div class="flex items-start gap-3">
                  <input type="radio" checked class="mt-1 accent-flipkart-blue" />
                  <div class="text-sm">
                    <p class="font-bold text-gray-900">{{ savedAddress.name }} <span class="bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded ml-2">HOME</span></p>
                    <p class="text-gray-600 mt-1">{{ savedAddress.street }}, {{ savedAddress.city }} - {{ savedAddress.postal }}</p>
                    <p class="text-gray-600">Phone: {{ savedAddress.phone }}</p>
                  </div>
                </div>
              </div>

              <button
                @click="showNewAddress = !showNewAddress"
                class="text-sm text-flipkart-blue font-bold hover:underline flex items-center gap-1"
              >
                + Add New Address
              </button>
            </div>

            <!-- New Address Form -->
            <div v-if="showNewAddress || !savedAddress.name" class="bg-blue-50 rounded p-4">
              <h4 class="font-bold text-sm mb-4 text-gray-800">Enter Delivery Address</h4>
              <div class="space-y-3">
                <div class="grid grid-cols-2 gap-3">
                  <input v-model="deliveryAddress.name" type="text" placeholder="Full Name*"
                    class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue col-span-2 sm:col-span-1" />
                  <input v-model="deliveryAddress.phone" type="tel" placeholder="10-digit Mobile Number*"
                    class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue col-span-2 sm:col-span-1" />
                </div>
                <input v-model="deliveryAddress.pincode" type="text" placeholder="Pincode*"
                  class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue w-full" />
                <input v-model="deliveryAddress.street" type="text" placeholder="Address (Area and Street)*"
                  class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue w-full" />
                <div class="grid grid-cols-2 gap-3">
                  <input v-model="deliveryAddress.city" type="text" placeholder="City/District/Town*"
                    class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue" />
                  <select v-model="deliveryAddress.state"
                    class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue text-gray-600">
                    <option value="">--State--</option>
                    <option v-for="s in states" :key="s" :value="s">{{ s }}</option>
                  </select>
                </div>
                <div class="flex gap-3">
                  <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" v-model="deliveryAddress.type" value="home" class="accent-flipkart-blue" /> Home
                  </label>
                  <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" v-model="deliveryAddress.type" value="work" class="accent-flipkart-blue" /> Work
                  </label>
                  <label class="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                    <input type="radio" v-model="deliveryAddress.type" value="other" class="accent-flipkart-blue" /> Other
                  </label>
                </div>
              </div>
              <button
                @click="saveAddress"
                class="mt-4 bg-flipkart-blue text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition text-sm"
              >
                SAVE AND DELIVER HERE
              </button>
            </div>
          </div>
        </div>

        <!-- Step 2: Order Summary -->
        <div class="bg-white shadow-sm rounded overflow-hidden mb-3">
          <div
            class="flex items-center justify-between px-5 py-4 cursor-pointer"
            :class="currentStep === 2 ? 'bg-flipkart-blue text-white' : 'bg-white'"
            @click="currentStep >= 2 && (currentStep = 2)"
          >
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
                :class="currentStep >= 2 ? 'border-current' : 'border-gray-300 text-gray-400'">
                {{ currentStep > 2 ? '✓' : '2' }}
              </span>
              <span class="font-bold uppercase text-sm tracking-wider">Order Summary</span>
            </div>
          </div>
          <div v-if="currentStep === 2" class="px-6 py-5">
            <div v-for="item in cartItems" :key="item.name" class="flex items-center gap-4 py-3 border-b last:border-0">
              <img :src="item.image" :alt="item.title" class="w-16 h-16 object-contain flex-shrink-0"
                onerror="this.src='https://placehold.co/64x64/f5f5f5/999?text=Product'" />
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-900 line-clamp-1">{{ item.title }}</p>
                <p class="text-xs text-gray-500">Qty: {{ item.quantity }}</p>
              </div>
              <p class="font-bold text-sm">₹{{ (item.price * item.quantity).toLocaleString('en-IN') }}</p>
            </div>
            <button
              @click="currentStep = 3"
              class="mt-4 bg-flipkart-orange text-white font-bold py-3 px-8 rounded hover:bg-orange-500 transition text-sm"
            >
              CONTINUE TO PAYMENT
            </button>
          </div>
        </div>

        <!-- Step 3: Payment -->
        <div class="bg-white shadow-sm rounded overflow-hidden mb-3">
          <div
            class="flex items-center gap-3 px-5 py-4"
            :class="currentStep === 3 ? 'bg-flipkart-blue text-white' : 'bg-white'"
          >
            <span class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0"
              :class="currentStep >= 3 ? 'border-current' : 'border-gray-300 text-gray-400'">3</span>
            <span class="font-bold uppercase text-sm tracking-wider">Payment</span>
          </div>

          <div v-if="currentStep === 3" class="flex flex-col md:flex-row border-t">
            <!-- Payment Options List -->
            <div class="md:w-56 border-r border-gray-100">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                @click="selectedPayment = method.id"
                class="w-full flex items-center gap-3 px-4 py-3.5 text-sm text-left border-b border-gray-50 hover:bg-blue-50 transition"
                :class="selectedPayment === method.id ? 'bg-blue-50 border-l-2 border-l-flipkart-blue text-flipkart-blue font-bold' : 'text-gray-700'"
              >
                <span class="text-lg">{{ method.icon }}</span>
                <div>
                  <p class="font-medium text-sm leading-tight">{{ method.label }}</p>
                  <p class="text-xs text-gray-400">{{ method.desc }}</p>
                </div>
              </button>
            </div>

            <!-- Payment Detail Panel -->
            <div class="flex-1 p-5">
              <!-- UPI -->
              <div v-if="selectedPayment === 'upi'">
                <h4 class="font-bold text-gray-900 mb-3">Pay via UPI</h4>
                <div class="space-y-3 mb-4">
                  <label v-for="app in upiApps" :key="app" class="flex items-center gap-3 p-3 border rounded cursor-pointer hover:border-flipkart-blue transition">
                    <input type="radio" :value="app" v-model="selectedUPI" class="accent-flipkart-blue" />
                    <span class="text-sm">{{ app }}</span>
                  </label>
                </div>
                <div class="border rounded p-3 flex gap-2">
                  <input v-model="upiId" type="text" placeholder="Enter UPI ID (e.g. name@paytm)"
                    class="flex-1 text-sm focus:outline-none" />
                  <button class="text-flipkart-blue text-sm font-bold hover:underline">Verify</button>
                </div>
              </div>

              <!-- Card -->
              <div v-else-if="selectedPayment === 'card'">
                <h4 class="font-bold text-gray-900 mb-3">Add Credit / Debit / ATM Card</h4>
                <div class="space-y-3">
                  <input type="text" placeholder="Card Number" maxlength="19"
                    class="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue" />
                  <input type="text" placeholder="Name on Card"
                    class="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue" />
                  <div class="grid grid-cols-2 gap-3">
                    <input type="text" placeholder="Valid Thru (MM/YY)"
                      class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue" />
                    <input type="password" placeholder="CVV"
                      class="border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue" />
                  </div>
                  <label class="flex items-center gap-2 text-xs text-gray-600 cursor-pointer">
                    <input type="checkbox" class="accent-flipkart-blue" />
                    Save this card securely for future payments
                  </label>
                </div>
              </div>

              <!-- Net Banking -->
              <div v-else-if="selectedPayment === 'netbanking'">
                <h4 class="font-bold text-gray-900 mb-3">Net Banking</h4>
                <div class="grid grid-cols-2 gap-2 mb-3">
                  <label v-for="bank in popularBanks" :key="bank" class="flex items-center gap-2 p-2.5 border rounded cursor-pointer hover:border-flipkart-blue transition text-sm">
                    <input type="radio" :value="bank" v-model="selectedBank" class="accent-flipkart-blue" />
                    {{ bank }}
                  </label>
                </div>
                <select class="w-full border border-gray-300 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-flipkart-blue text-gray-600">
                  <option value="">All Banks</option>
                </select>
              </div>

              <!-- EMI -->
              <div v-else-if="selectedPayment === 'emi'">
                <h4 class="font-bold text-gray-900 mb-3">EMI Options</h4>
                <div class="space-y-2">
                  <div v-for="emi in emiOptions" :key="emi.months" class="flex items-center justify-between p-3 border rounded cursor-pointer hover:border-flipkart-blue transition">
                    <label class="flex items-center gap-3 cursor-pointer flex-1">
                      <input type="radio" :value="emi.months" v-model="selectedEMI" class="accent-flipkart-blue" />
                      <span class="text-sm font-medium">{{ emi.months }} Months</span>
                    </label>
                    <span class="text-sm text-gray-700">₹{{ Math.round(finalTotal / emi.months).toLocaleString('en-IN') }}/mo</span>
                    <span class="text-xs text-gray-400 ml-2">@ {{ emi.rate }}% p.a.</span>
                  </div>
                </div>
              </div>

              <!-- COD -->
              <div v-else-if="selectedPayment === 'cod'">
                <h4 class="font-bold text-gray-900 mb-3">Cash on Delivery</h4>
                <div class="bg-yellow-50 border border-yellow-200 rounded p-4 mb-3">
                  <p class="text-sm text-gray-700">
                    Due to handling costs, a nominal fee of <strong>₹40</strong> will be charged on cash on delivery orders.
                  </p>
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-600">
                  <svg class="w-4 h-4 text-[#388e3c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Cash on Delivery available for this address
                </div>
              </div>

              <!-- Wallet -->
              <div v-else>
                <h4 class="font-bold text-gray-900 mb-3">Wallets</h4>
                <div class="space-y-2">
                  <label v-for="wallet in ['Paytm', 'PhonePe', 'Amazon Pay', 'Mobikwik']" :key="wallet"
                    class="flex items-center gap-2 p-3 border rounded cursor-pointer hover:border-flipkart-blue transition text-sm">
                    <input type="radio" :value="wallet" v-model="selectedWallet" class="accent-flipkart-blue" />
                    {{ wallet }}
                  </label>
                </div>
              </div>

              <!-- Place Order Button -->
              <div class="mt-6 flex items-center gap-4">
                <button
                  @click="placeOrder"
                  class="bg-flipkart-orange text-white font-bold py-3.5 px-10 rounded hover:bg-orange-500 transition text-sm"
                >
                  PAY ₹{{ finalTotal.toLocaleString('en-IN') }}
                </button>
                <p class="text-xs text-gray-400 flex items-center gap-1">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Safe & Secure
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- RIGHT: Price Summary -->
      <div class="w-full lg:w-[300px] flex-shrink-0">
        <div class="bg-white shadow-sm rounded overflow-hidden sticky top-[70px]">
          <div class="px-5 py-3 border-b">
            <h3 class="text-sm font-bold text-gray-400 uppercase tracking-wider">Price Details</h3>
          </div>
          <div class="px-5 py-4 space-y-3 text-sm">
            <div class="flex justify-between text-gray-700">
              <span>Price ({{ totalQty }} item{{ totalQty > 1 ? 's' : '' }})</span>
              <span>₹{{ originalTotal.toLocaleString('en-IN') }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Discount</span>
              <span class="text-[#388e3c] font-medium">− ₹{{ totalSavings.toLocaleString('en-IN') }}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span>Delivery Charges</span>
              <span class="text-[#388e3c] font-medium">FREE</span>
            </div>
            <div v-if="selectedPayment === 'cod'" class="flex justify-between text-gray-700">
              <span>COD Charges</span>
              <span>₹40</span>
            </div>
          </div>
          <div class="px-5 py-4 border-t border-b">
            <div class="flex justify-between font-bold text-gray-900">
              <span>Total Amount</span>
              <span>₹{{ finalTotal.toLocaleString('en-IN') }}</span>
            </div>
          </div>
          <div class="px-5 py-3">
            <p class="text-sm text-[#388e3c] font-medium">You will save ₹{{ totalSavings.toLocaleString('en-IN') }} on this order</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { productStore } from '@/stores/products'

const router = useRouter()
const store = productStore()

const currentStep = ref(1)
const showNewAddress = ref(false)
const selectedPayment = ref('upi')
const selectedUPI = ref('')
const upiId = ref('')
const selectedBank = ref('')
const selectedEMI = ref(null)
const selectedWallet = ref('')

const savedAddress = ref({
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  type: 'home',
})

const deliveryAddress = ref({
  name: '',
  phone: '',
  street: '',
  city: '',
  state: '',
  pincode: '',
  type: 'home',
})

const steps = [
  { label: 'Cart' },
  { label: 'Address' },
  { label: 'Order Summary' },
  { label: 'Payment' },
]

const cartItems = computed(() => store.cart)
const totalQty = computed(() => store.cart.reduce((sum, i) => sum + i.quantity, 0))
const originalTotal = computed(() =>
  store.cart.reduce((sum, i) => sum + (i.originalPrice || i.price) * i.quantity, 0)
)
const subtotal = computed(() => store.cart.reduce((sum, i) => sum + i.price * i.quantity, 0))
const totalSavings = computed(() => originalTotal.value - subtotal.value)
const finalTotal = computed(() => subtotal.value + (selectedPayment.value === 'cod' ? 40 : 0))

const paymentMethods = [
  { id: 'upi', label: 'UPI', desc: 'Pay via any UPI app', icon: '📱' },
  { id: 'card', label: 'Credit / Debit / ATM Card', desc: 'Add and secure cards', icon: '💳' },
  { id: 'netbanking', label: 'Net Banking', desc: 'All Indian banks', icon: '🏦' },
  { id: 'emi', label: 'EMI', desc: 'Easy monthly installments', icon: '📅' },
  { id: 'wallet', label: 'Wallets', desc: 'Paytm, PhonePe & more', icon: '👛' },
  { id: 'cod', label: 'Cash on Delivery', desc: 'Pay on delivery', icon: '💵' },
]

const upiApps = ['Google Pay', 'PhonePe', 'Paytm', 'BHIM UPI']
const popularBanks = ['SBI', 'HDFC', 'ICICI', 'Axis Bank', 'Kotak', 'Yes Bank']
const emiOptions = [
  { months: 3, rate: 15 }, { months: 6, rate: 14 }, { months: 9, rate: 13 }, { months: 12, rate: 12 },
]

const states = ['Andhra Pradesh', 'Bihar', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal']

const saveAddress = () => {
  if (!deliveryAddress.value.name || !deliveryAddress.value.phone || !deliveryAddress.value.city) {
    alert('Please fill all required fields')
    return
  }
  savedAddress.value = { ...deliveryAddress.value }
  showNewAddress.value = false
  currentStep.value = 2
}

const placeOrder = () => {
  const orderId = 'FK' + Date.now()
  store.cart.splice(0)
  store.showToast('Order placed successfully! 🎉', 'success')
  router.push('/orders')
}
</script>
