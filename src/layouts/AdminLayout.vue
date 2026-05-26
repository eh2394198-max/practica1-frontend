<template>
  <div class="admin-layout">
    <aside class="sidebar">
      <h2>Panel Admin</h2>
      <nav>
        <router-link to="/admin">Dashboard</router-link>
        <router-link to="/admin/productos">Gestionar Productos</router-link>
        <router-link to="/">Volver a la Tienda</router-link>
      </nav>
      
      <div class="user-info">
        <p>Usuario Logueado</p> 
      </div>
    </aside>

    <main class="content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.sidebar h2 { margin-top: 0; }
.sidebar nav { display: flex; flex-direction: column; gap: 10px; flex-grow: 1; }
.sidebar a { color: #42b983; text-decoration: none; }
.sidebar a.router-link-exact-active { font-weight: bold; color: white; }
.user-info { margin-top: auto; border-top: 1px solid #444; padding-top: 10px; }
.content {
  flex-grow: 1;
  padding: 30px;
  background-color: #f8f9fa;
}
</style>