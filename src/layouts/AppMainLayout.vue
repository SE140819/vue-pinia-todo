<template>
  <el-container class="layout-container">
    <el-aside width="240px">
      <AppSidebar />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <h3>Project Dashboard</h3>
        </div>
        <div class="header-right">
          <el-button type="info" text @click="handleLogout">Logout</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AppSidebar from './AppSidebar.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  background-color: #fff;
}
</style>
