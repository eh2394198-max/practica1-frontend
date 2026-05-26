<template>
  <div class="home">
    <h1>Bienvenido a la Tienda SPA</h1>
    <p>Navega sin recargar la página.</p>
    
    <nav>
      <router-link to="/catalogo">Ir al Catálogo</router-link> | 
      <router-link to="/admin">Ir al Panel de Admin</router-link>
    </nav>

    <hr>

    <div class="ultimos-productos">
      <h2>Últimos Productos Agregados</h2>
      <div v-if="cargando">Cargando productos...</div>
      <div v-else class="productos-grid">
        <div v-for="producto in ultimosProductos" :key="producto.id" class="card">
          <h3>{{ producto.nombre }}</h3>
          <p>${{ producto.precio }}</p>
          <router-link :to="`/catalogo/${producto.id}`">Ver Detalle</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const ultimosProductos = ref([])
const cargando = ref(true)

onMounted(async () => {
  try {
    // Petición a tu API en Laravel
    const respuesta = await axios.get('http://localhost:8000/api/productos')
    
    // Asumiendo que tu API devuelve un arreglo directamente, tomamos los últimos 3
    const todosLosProductos = respuesta.data
    ultimosProductos.value = todosLosProductos.slice(-3).reverse()
  } catch (error) {
    console.error('Error al cargar los productos:', error)
  } finally {
    cargando.value = false
  }
})
</script>

<style scoped>
.home { padding: 20px; text-align: center; }
nav { margin-top: 20px; margin-bottom: 30px; }
a { margin: 0 10px; text-decoration: none; color: #42b983; }
.productos-grid { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
.card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; width: 200px; text-align: left; }
</style>