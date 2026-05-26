<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="iniciarSesion">
      <div class="input-group">
        <label>Usuario:</label>
        <input v-model="usuario" type="text" required placeholder="Ingresa tu usuario">
      </div>
      <div class="input-group">
        <label>Contraseña:</label>
        <input v-model="password" type="password" required placeholder="••••••••">
      </div>
      <button type="submit">Entrar al panel</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const usuario = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const iniciarSesion = async () => {
  await auth.login(usuario.value, password.value)
  
  // Leemos el parámetro redirect de la URL o usamos /admin por defecto
  const redirectPath = route.query.redirect || '/admin'
  router.push(redirectPath)
}
</script>

<style scoped>
.login-container { max-width: 300px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
.input-group { margin-bottom: 15px; }
.input-group label { display: block; margin-bottom: 5px; }
.input-group input { width: 100%; padding: 8px; box-sizing: border-box; }
button { width: 100%; padding: 10px; background-color: #42b983; color: white; border: none; cursor: pointer; }
</style>