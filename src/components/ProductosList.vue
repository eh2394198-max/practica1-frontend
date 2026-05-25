<template>
  <div style="max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif;">
    <h2>Gestión de Productos</h2>
    
    <div v-if="mensaje" style="padding: 10px; margin-bottom: 15px; border-radius: 5px; background-color: #d4edda; color: #155724;">
      {{ mensaje }}
    </div>

    <form @submit.prevent="guardarProducto" style="display: flex; gap: 10px; margin-bottom: 20px; flex-wrap: wrap;">
      <input v-model="formulario.nombre" placeholder="Nombre del producto" required />
      <input v-model="formulario.descripcion" placeholder="Descripción breve" />
      <input type="number" v-model="formulario.precio" step="0.01" placeholder="Precio" required />
      <input type="number" v-model="formulario.stock" placeholder="Stock" required />
      
      <button type="submit" style="background-color: #007bff; color: white; border: none; padding: 8px 15px; cursor: pointer;">
        {{ editandoId ? 'Actualizar' : 'Crear' }} Producto
      </button>
      
      <button type="button" v-if="editandoId" @click="cancelarEdicion" style="background-color: #6c757d; color: white; border: none; padding: 8px 15px; cursor: pointer;">
        Cancelar
      </button>
    </form>

    <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
      <thead style="background-color: #f8f9fa;">
        <tr>
          <th style="padding: 10px;">ID</th>
          <th style="padding: 10px;">Nombre</th>
          <th style="padding: 10px;">Descripción</th>
          <th style="padding: 10px;">Precio</th>
          <th style="padding: 10px;">Stock</th>
          <th style="padding: 10px;">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td style="padding: 10px;">{{ producto.id }}</td>
          <td style="padding: 10px;">{{ producto.nombre }}</td>
          <td style="padding: 10px;">{{ producto.descripcion }}</td>
          <td style="padding: 10px;">${{ producto.precio }}</td>
          <td style="padding: 10px;">{{ producto.stock }}</td>
          <td style="padding: 10px;">
            <button @click="editarProducto(producto)" style="margin-right: 5px;">Editar</button>
            <button @click="borrarProducto(producto.id)" style="color: red;">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// Importamos las funciones que creaste en el paso 4.6
import { getProductos, createProducto, updateProducto, deleteProducto } from '../services/productoService'

// Variables reactivas
const productos = ref([])
const mensaje = ref('')
const editandoId = ref(null)
const formulario = ref({ nombre: '', descripcion: '', precio: '', stock: '' })

// Cargar la lista al iniciar (Requisito 4.7)
const cargarProductos = async () => {
  try {
    const res = await getProductos()
    productos.value = res.data
  } catch (error) {
    mensaje.value = 'Error al cargar los productos de la base de datos.'
  }
}

onMounted(() => {
  cargarProductos()
})

// Función para Crear o Actualizar sin recargar la página (Requisito 4.8)
const guardarProducto = async () => {
  try {
    if (editandoId.value) {
      await updateProducto(editandoId.value, formulario.value)
      mensaje.value = '✅ Producto actualizado con éxito'
    } else {
      await createProducto(formulario.value)
      mensaje.value = '✅ Producto creado con éxito'
    }
    cancelarEdicion()
    cargarProductos() // Refrescamos la tabla
  } catch (error) {
    mensaje.value = '❌ Error al guardar el producto. Verifica tu conexión.'
  }
  // Ocultar mensaje después de 3 segundos
  setTimeout(() => mensaje.value = '', 3000)
}

// Preparar el formulario para editar
const editarProducto = (producto) => {
  editandoId.value = producto.id
  formulario.value = { ...producto }
}

// Limpiar el formulario
const cancelarEdicion = () => {
  editandoId.value = null
  formulario.value = { nombre: '', descripcion: '', precio: '', stock: '' }
}

// Botón eliminar con confirmación
const borrarProducto = async (id) => {
  if (confirm('¿Estás completamente seguro de eliminar este producto?')) {
    try {
      await deleteProducto(id)
      mensaje.value = '✅ Producto eliminado correctamente'
      cargarProductos()
    } catch (error) {
      mensaje.value = '❌ Error al eliminar el producto'
    }
    setTimeout(() => mensaje.value = '', 3000)
  }
}
</script>