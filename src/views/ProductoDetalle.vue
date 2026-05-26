<template>
  <div class="detalle">
    <div v-if="cargando">Cargando información del producto...</div>
    
    <div v-else-if="producto" class="producto-info">
      <h2>{{ producto.nombre }}</h2>
      <p><strong>Descripción:</strong> {{ producto.descripcion }}</p>
      <p><strong>Precio:</strong> ${{ producto.precio }}</p>
      <p><strong>Stock disponible:</strong> {{ producto.stock }} unidades</p>
      
      <button @click="volver">Volver al catálogo</button>
    </div>

    <div v-else>
      <h2>Producto no encontrado</h2>
      <button @click="volver">Volver al catálogo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const props = defineProps({
  id: { type: String, required: true }
})

const router = useRouter()
const producto = ref(null)
const cargando = ref(true)

onMounted(async () => {
  try {
    // Petición GET buscando por el ID que llega por la URL
    const respuesta = await axios.get(`http://localhost:8000/api/productos/${props.id}`)
    producto.value = respuesta.data
  } catch (error) {
    console.error('Error al cargar el producto:', error)
  } finally {
    cargando.value = false
  }
})

const volver = () => {
  router.back()
}
</script>

<style scoped>
.detalle { padding: 20px; }
.producto-info { border: 1px solid #eee; padding: 20px; border-radius: 8px; max-width: 500px; }
button { margin-top: 20px; padding: 8px 16px; cursor: pointer; background-color: #42b983; color: white; border: none; border-radius: 4px; }
</style>