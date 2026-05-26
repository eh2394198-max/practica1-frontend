import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/', component: () => import('@/views/HomeView.vue') },
  { path: '/catalogo', component: () => import('@/views/CatalogoView.vue') },
  {
    path: '/catalogo/:id',
    component: () => import('@/views/ProductoDetalle.vue'),
    props: true, 
  },
  // 1. Aquí agregamos la ruta de login
  { path: '/login', component: () => import('@/views/LoginView.vue') }, 
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('@/views/admin/Dashboard.vue') },
      { path: 'productos', component: () => import('@/views/admin/Productos.vue') },
    ]
  },
  { 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue') 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 2. Aquí está el guardia de navegación global
router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Inicializar usuario si hay token guardado
  if (auth.token && !auth.user) {
    await auth.fetchUser()
  }

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { path: '/login', query: { redirect: to.fullPath } }
  }
}) 

export default router