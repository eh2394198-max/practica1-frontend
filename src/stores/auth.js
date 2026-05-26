import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  const login = async (username, password) => {
    // Aquí simulamos que conectamos con tu API de Laravel
    token.value = 'simulacion-de-token-jwt'
    user.value = { nombre: 'Emmanuel' } 
  }

  const fetchUser = async () => {
    // Simula recuperar los datos del usuario si se recarga la página
    user.value = { nombre: 'Emmanuel' }
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return { token, user, isAuthenticated, login, fetchUser, logout }
})