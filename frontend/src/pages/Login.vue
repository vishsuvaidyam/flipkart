<template>
  <div class="min-h-screen bg-white">














































































































































































































































































</script>}  return cookieValue  }    }      }        break        cookieValue = decodeURIComponent(cookie.substring(name.length + 1))      if (cookie.substring(0, name.length + 1) === name + '=') {      const cookie = cookies[i].trim()    for (let i = 0; i < cookies.length; i++) {    const cookies = document.cookie.split(';')  if (document.cookie && document.cookie !== '') {  let cookieValue = null  const name = 'frappe_csrf_token'function getCSRFToken() {}  }    isLoading.value = false  } finally {    errorMessage.value = err.message || 'Signup failed. Please try again.'  } catch (err) {    }, 2000)      router.push('/login')    setTimeout(() => {    // Redirect to login after 2 seconds    successMessage.value = 'Account created successfully! Redirecting to login...'    }      throw new Error(data.message || 'Signup failed')      const data = await response.json()    if (!response.ok) {    })      credentials: 'include',      }),        phone_number: phone.value,        password: password.value,        first_name: fullName.value,        email: email.value,      body: JSON.stringify({      },        'X-Frappe-CSRF-Token': getCSRFToken(),        'Content-Type': 'application/json',      headers: {      method: 'POST',    const response = await fetch('/api/resource/User', {    // Create user via ERPNext API  try {  isLoading.value = true  }    return    errorMessage.value = 'Please agree to terms and conditions'  if (!agreeTerms.value) {  }    return    errorMessage.value = 'Mobile number must be 10 digits'  if (phone.value.length !== 10) {  }    return    errorMessage.value = 'Password must be at least 6 characters'  if (password.value.length < 6) {  }    return    errorMessage.value = 'Passwords do not match'  if (password.value !== confirmPassword.value) {  // Validation  successMessage.value = ''  errorMessage.value = ''const handleSignup = async () => {const isLoading = ref(false)const successMessage = ref('')const errorMessage = ref('')const agreeTerms = ref(false)const confirmPassword = ref('')const password = ref('')const phone = ref('')const email = ref('')const fullName = ref('')const router = useRouter()import { useRouter } from 'vue-router'import { ref } from 'vue'<script setup></template>  </div>    </div>      </div>        </div>          </div>            <router-link to="/login" class="text-flipkart-blue font-bold hover:underline">Login here</router-link>            <p class="text-gray-700">Already have an account?</p>          <div class="mt-8 text-center">          <!-- Login Link -->          </form>            </button>              </span>                Creating Account...                </svg>                  ></path>                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"                    fill="currentColor"                    class="opacity-75"                  <path                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">              <span v-else class="flex items-center justify-center gap-2">              <span v-if="!isLoading">Create Account</span>            >              class="w-full bg-flipkart-orange hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-200"              :disabled="isLoading || !agreeTerms"              type="submit"            <button            <!-- Signup Button -->            </div>              {{ successMessage }}            <div v-if="successMessage" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">            <!-- Success Message -->            </div>              {{ errorMessage }}            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">            <!-- Error Message -->            </div>              </label>                <a href="#" class="text-flipkart-blue hover:underline">Privacy Policy</a>                and                <a href="#" class="text-flipkart-blue hover:underline">Terms & Conditions</a>                I agree to Flipkart's              <label for="terms" class="text-sm text-gray-600">              />                class="mt-1 w-4 h-4 border-gray-300 rounded focus:ring-2 focus:ring-flipkart-blue"                id="terms"                type="checkbox"                v-model="agreeTerms"              <input            <div class="flex items-start gap-3">            <!-- Terms & Conditions -->            </div>              />                placeholder="Re-enter password"                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"                required                type="password"                v-model="confirmPassword"              <input              <label class="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>            <div>            <!-- Confirm Password -->            </div>              <p class="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>              />                placeholder="Min 6 characters"                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"                minlength="6"                required                type="password"                v-model="password"              <input              <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>            <div>            <!-- Password -->            </div>              />                placeholder="Enter 10-digit mobile number"                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"                maxlength="10"                required                type="tel"                v-model="phone"              <input              <label class="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>            <div>            <!-- Phone Number -->            </div>              />                placeholder="Enter email address"                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"                required                type="email"                v-model="email"              <input              <label class="block text-sm font-medium text-gray-700 mb-2">Email Address</label>            <div>            <!-- Email -->            </div>              />                placeholder="Enter your full name"                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"                required                type="text"                v-model="fullName"              <input              <label class="block text-sm font-medium text-gray-700 mb-2">Full Name</label>            <div>            <!-- Full Name -->          <form @submit.prevent="handleSignup" class="space-y-4">          <p class="text-gray-600 mb-8">Sign up to unlock exclusive benefits</p>          <h2 class="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>        <div class="max-w-md">        </div>          <h1 class="text-3xl font-bold text-flipkart-blue">Flipkart</h1>        <div class="md:hidden mb-8">        <!-- Mobile Brand -->      <div class="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">      <!-- Right Side - Signup Form -->      </div>        <p class="text-sm text-blue-100 mt-12">Start your shopping journey today</p>        </div>          </div>            </div>              <p class="text-blue-100">Plus membership with special perks</p>              <h3 class="font-bold text-lg mb-1">Loyalty Program</h3>            <div>            <div class="text-2xl">🏅</div>          <div class="flex gap-4">          </div>            </div>              <p class="text-blue-100">30-day returns on products</p>              <h3 class="font-bold text-lg mb-1">Easy Returns</h3>            <div>            <div class="text-2xl">📦</div>          <div class="flex gap-4">          </div>            </div>              <p class="text-blue-100">Earn points on every purchase</p>              <h3 class="font-bold text-lg mb-1">Rewards & Cashback</h3>            <div>            <div class="text-2xl">🎁</div>          <div class="flex gap-4">          </div>            </div>              <p class="text-blue-100">Get access to exclusive deals and offers</p>              <h3 class="font-bold text-lg mb-1">Exclusive Member Benefits</h3>            <div>            <div class="text-2xl">✨</div>          <div class="flex gap-4">        <div class="space-y-8">        </div>          <p class="text-xl text-blue-100">Join Millions of Happy Shoppers</p>          <h1 class="text-5xl font-bold mb-2">Flipkart</h1>        <div class="mb-12">      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-flipkart-blue to-blue-700 text-white flex-col justify-center px-12 py-12">      <!-- Left Side - Brand -->    <div class="flex flex-col md:flex-row">    <div class="flex flex-col md:flex-row">
      <!-- Left Side - Brand & Benefits -->
      <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-flipkart-blue to-blue-700 text-white flex-col justify-center px-12 py-12">
        <div class="mb-12">
          <h1 class="text-5xl font-bold mb-2">Flipkart</h1>
          <p class="text-xl text-blue-100">Experience Shopping</p>
        </div>

        <div class="space-y-8">
          <div class="flex gap-4">
            <div class="text-2xl">🛒</div>
            <div>
              <h3 class="font-bold text-lg mb-1">Millions of Products</h3>
              <p class="text-blue-100">Discover from over 10 million products</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-2xl">⚡</div>
            <div>
              <h3 class="font-bold text-lg mb-1">Lightning Fast Delivery</h3>
              <p class="text-blue-100">Get your orders delivered in 24 hours</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-2xl">🛡️</div>
            <div>
              <h3 class="font-bold text-lg mb-1">100% Secure</h3>
              <p class="text-blue-100">Your data is safe with us</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="text-2xl">💰</div>
            <div>
              <h3 class="font-bold text-lg mb-1">Best Prices</h3>
              <p class="text-blue-100">Exclusive deals and discounts</p>
            </div>
          </div>
        </div>

        <p class="text-sm text-blue-100 mt-12">Trusted by millions of customers worldwide</p>
      </div>

      <!-- Right Side - Login Form -->
      <div class="w-full md:w-1/2 flex flex-col justify-center px-6 sm:px-12 py-12">
        <!-- Mobile Brand -->
        <div class="md:hidden mb-8">
          <h1 class="text-3xl font-bold text-flipkart-blue">Flipkart</h1>
        </div>

        <div class="max-w-md">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Login</h2>
          <p class="text-gray-600 mb-8">Enter your email and password to access your account</p>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <!-- Email Field -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email or Mobile Number</label>
              <input
                v-model="email"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"
                placeholder="Enter email or mobile number"
              />
            </div>

            <!-- Password Field -->
            <div>
              <div class="flex justify-between items-center mb-2">
                <label class="block text-sm font-medium text-gray-700">Password</label>
                <a href="#" class="text-sm text-flipkart-blue hover:underline">Forgot?</a>
              </div>
              <input
                v-model="password"
                type="password"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-flipkart-blue focus:ring-1 focus:ring-flipkart-blue transition"
                placeholder="Enter password"
              />
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {{ errorMessage }}
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-flipkart-blue hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition duration-200"
            >
              <span v-if="!isLoading">Login</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            </button>

            <!-- Divider -->
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <!-- Continue as Guest -->
            <button
              type="button"
              @click="continueAsGuest"
              class="w-full border-2 border-flipkart-orange text-flipkart-orange hover:bg-orange-50 font-bold py-3 rounded-lg transition"
            >
              Continue as Guest
            </button>
          </form>

          <!-- Signup Link -->
          <div class="mt-8 text-center">
            <p class="text-gray-700">New to Flipkart?</p>
            <router-link to="/signup" class="text-flipkart-blue font-bold hover:underline">Create an account</router-link>
          </div>

          <!-- Demo Info -->
          <div class="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p class="text-xs text-gray-600 font-medium mb-2">DEMO CREDENTIALS:</p>
            <p class="text-xs text-gray-600 mb-1">📧 Email: <span class="font-mono">admin@example.com</span></p>
            <p class="text-xs text-gray-600">🔐 Password: <span class="font-mono">admin</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { sessionStore } from '@/stores/session'

const router = useRouter()
const { login } = sessionStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await login.submit({
      usr: email.value,
      pwd: password.value,
    })
  } catch (error) {
    errorMessage.value = error.message || 'Login failed. Please check your credentials.'
    isLoading.value = false
  }
}

const continueAsGuest = () => {
  router.push('/shop')
}
</script>
