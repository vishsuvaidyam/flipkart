import { createRouter, createWebHistory } from 'vue-router'
import { sessionStore } from '@/stores/session'
import { productStore } from '@/stores/products'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/shop',
    name: 'Shop',
    component: () => import('@/pages/Shop.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/product/:productId',
    name: 'ProductDetail',
    component: () => import('@/pages/ProductDetail.vue'),
    props: true,
    meta: { requiresAuth: false },
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/pages/Cart.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () => import('@/pages/Checkout.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/pages/Orders.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/order/:orderId',
    name: 'OrderDetail',
    component: () => import('@/pages/OrderDetail.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/:invalidpath',
    name: 'InvalidPage',
    component: () => import('@/pages/InvalidPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/flipkart'),
  routes,
})

// Authentication Guard
router.beforeEach(async (to, from, next) => {
  const { isLoggedIn } = sessionStore()
  const { fetchProducts } = productStore()

  // Load products
  await fetchProducts()

  // If page requires auth but user is not logged in
  if (to.meta.requiresAuth && !isLoggedIn) {
    window.location.href = '/login?redirect-to=/flipkart'
    return
  }

  // If user tries to access login page but is already logged in
  if (to.name === 'Login' && isLoggedIn) {
    next({ name: 'Home' })
    return
  }

  next()
})

export default router
