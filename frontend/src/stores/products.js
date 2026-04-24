import { defineStore } from 'pinia'
import { ref } from 'vue'

export const productStore = defineStore('flipkart-products', () => {
  const products = ref([])
  const cart = ref([])
  let promise = null

  const fetchProducts = async () => {
    if (promise) {
      return promise
    }

    promise = (async () => {
      try {
        const response = await fetch('/api/resource/Product?fields=["name","title","description","image","price","stock"]&limit_page_length=100', {
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }

        const data = await response.json()
        products.value = data.data || []
      } catch (error) {
        console.error('Error fetching products:', error)
        // Set mock products if fetch fails
        products.value = [
          {
            name: 'PROD001',
            title: 'Wireless Headphones',
            description: 'High quality wireless headphones with noise cancellation',
            price: 2999,
            stock: 100,
            image: 'https://via.placeholder.com/200?text=Headphones',
          },
          {
            name: 'PROD002',
            title: 'USB Type-C Cable',
            description: 'Durable USB Type-C charging cable',
            price: 299,
            stock: 500,
            image: 'https://via.placeholder.com/200?text=USB+Cable',
          },
          {
            name: 'PROD003',
            title: 'Phone Case',
            description: 'Protective phone case with premium material',
            price: 599,
            stock: 200,
            image: 'https://via.placeholder.com/200?text=Phone+Case',
          },
          {
            name: 'PROD004',
            title: 'Screen Protector',
            description: 'Tempered glass screen protector',
            price: 199,
            stock: 300,
            image: 'https://via.placeholder.com/200?text=Screen+Protector',
          },
          {
            name: 'PROD005',
            title: 'Power Bank',
            description: '20000mAh portable power bank',
            price: 1499,
            stock: 150,
            image: 'https://via.placeholder.com/200?text=Power+Bank',
          },
          {
            name: 'PROD006',
            title: 'Bluetooth Speaker',
            description: 'Portable waterproof Bluetooth speaker',
            price: 1999,
            stock: 100,
            image: 'https://via.placeholder.com/200?text=Bluetooth+Speaker',
          },
        ]
      }
    })()

    return promise
  }

  const addToCart = (product) => {
    const existingItem = cart.value.find((item) => item.name === product.name)
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.value.push({ ...product, quantity: 1 })
    }
  }

  const removeFromCart = (productName) => {
    cart.value = cart.value.filter((item) => item.name !== productName)
  }

  const updateQuantity = (productName, quantity) => {
    const item = cart.value.find((item) => item.name === productName)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        removeFromCart(productName)
      }
    }
  }

  return {
    products,
    cart,
    fetchProducts,
    addToCart,
    removeFromCart,
    updateQuantity,
  }
})
