import { defineStore } from 'pinia'
import router from '@/router'
import { ref, computed } from 'vue'

export const sessionStore = defineStore('flipkart-session', () => {
  function sessionUser() {
    let cookies = new URLSearchParams(document.cookie.split('; ').join('&'))
    let _sessionUser = cookies.get('user_id')
    if (_sessionUser === 'Guest') {
      _sessionUser = null
    }
    return _sessionUser
  }

  let user = ref(sessionUser())
  const isLoggedIn = computed(() => !!user.value)

  const login = {
    loading: false,
    error: null,
    async submit(creds) {
      this.loading = true
      this.error = null
      try {
        const response = await fetch('/api/method/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Frappe-CSRF-Token': getCSRFToken(),
          },
          body: JSON.stringify({
            usr: creds.usr,
            pwd: creds.pwd,
          }),
          credentials: 'include',
        })

        if (!response.ok) {
          throw new Error('Invalid Email or Password')
        }

        user.value = sessionUser()
        router.replace({ path: '/' })
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.loading = false
      this.error = null
    },
  }

  const logout = {
    async submit() {
      try {
        await fetch('/api/method/logout', {
          method: 'POST',
          headers: {
            'X-Frappe-CSRF-Token': getCSRFToken(),
          },
          credentials: 'include',
        })
        user.value = null
        window.location.href = '/login?redirect-to=/flipkart'
      } catch (err) {
        console.error('Logout error:', err)
      }
    },
  }

  function getCSRFToken() {
    const name = 'frappe_csrf_token'
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
})
