<template>
  <el-container class="layout-container">
    <el-aside width="240px">
      <AppSidebar />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div class="header-left">
          <div class="breadcrumb">
            <span class="parent">Pages</span> / <span class="current">{{ routeName }}</span>
          </div>
          <h1 class="page-title">{{ routeName }}</h1>
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
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AppSidebar from './AppSidebar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const routeName = computed(() => route.name || 'Dashboard')

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
  height: auto !important;
  padding: 20px 24px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background-color: #fcfcfc;
}
.breadcrumb {
  font-size: 12px;
  color: #888;
  margin-bottom: 4px;
}
.breadcrumb .current {
  color: #333;
}
.page-title {
  font-family: 'Outfit', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #1e3a63;
  margin: 0;
}
</style>
