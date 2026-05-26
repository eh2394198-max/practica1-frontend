<template>
  <div class="catalogo">
    <h2>Catálogo de Productos</h2>
    <router-link to="/">Volver al Inicio</router-link>

    <div class="buscador">
      <input v-model="busqueda" type="text" placeholder="Buscar producto...">
    </div>

    <div v-if="cargando">Cargando catálogo...</div>

    <div v-else class="productos-grid">
      <div v-for="producto in productosFiltrados" :key="producto.id" class="card">
        <h3>{{ producto.nombre }}</h3>
        <p>Precio: ${{ producto.precio }}</p>
        <router-link :to="`/catalogo/${producto.id}`">Ver Detalles</router-link>
      </div>
    </div>
    
    <p v-if="!cargando && productosFiltrados.length === 0">No se encontraron productos.</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const busqueda = ref('')
const productos = ref([])
const cargando = ref(true)

// Cargar productos desde la API al montar el componente
onMounted(async () => {
  try {
    const respuesta = await axios.get('http://localhost:8000/api/productos')
    productos.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar el catálogo:', error)
  } finally {
    cargando.value = false
  }
})

// Filtrado reactivo local
const productosFiltrados = computed(() => {
  return productos.value.filter(p => 
    p.nombre.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})
</script>

<style scoped>
.catalogo { padding: 20px; }
.buscador { margin: 20px 0; }
.productos-grid { display: flex; gap: 20px; flex-wrap: wrap; }
.card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; width: 200px; }
</style>