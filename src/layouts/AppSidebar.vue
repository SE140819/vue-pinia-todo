<template>
  <div class="sidebar">
    <div class="logo">
      <h2>Vue Todo</h2>
    </div>
    <el-menu
      default-active="/"
      class="sidebar-menu"
      router
    >
      <el-menu-item index="/">
        <el-icon><Menu /></el-icon>
        <span>Dashboard</span>
      </el-menu-item>
      <el-menu-item index="/profile">
        <el-icon><User /></el-icon>
        <span>Profile</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script setup>
import { Menu, User } from '@element-plus/icons-vue'
</script>

<style scoped>
.sidebar {
  height: 100%;
  border-right: 1px solid #eee;
}
.logo {
  padding: 20px;
  text-align: center;
  border-bottom: 1px solid #eee;
}
.sidebar-menu {
  border-right: none;
}
</style>
