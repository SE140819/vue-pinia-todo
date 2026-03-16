<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import AppSidebar from './AppSidebar.vue'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const routeName = computed(() => (route.name as string) || 'Todo App')

const isCollapse = ref(localStorage.getItem('sidebar-collapse') === 'true')
const asideWidth = computed(() => isCollapse.value ? '64px' : '260px')

function handleToggleCollapse() {
  isCollapse.value = !isCollapse.value
  localStorage.setItem('sidebar-collapse', isCollapse.value.toString())
}

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside :width="asideWidth" class="app-aside" style="overflow: visible; z-index: 10;">
      <AppSidebar :is-collapse="isCollapse" @toggle-collapse="handleToggleCollapse" />
    </el-aside>
    <el-container class="main-content-wrapper">
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
        <router-view v-slot="{ Component }">
          <transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  overflow: hidden;
}

.app-aside {
  transition: width 0.3s ease-in-out;
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

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

