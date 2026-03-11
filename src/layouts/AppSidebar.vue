<template>
  <div class="sidebar">
    <div class="logo">
      <svg class="logo-svg" viewBox="0 0 100 100" width="32" height="32">
        <path d="M10 20 L90 20 L60 80 L10 80 Z" fill="#2d5a9e" />
        <path d="M40 20 L90 20 L60 80 L40 80 Z" fill="#1e3a63" />
      </svg>
      <div class="logo-text">
        <span class="brand">FASTBOY</span>
        <span class="sub-brand">Marketing</span>
        <span class="product">Social Automation</span>
      </div>
    </div>

    <div class="create-post-container">
      <el-button type="primary" class="create-post-btn">
        Create Post <el-icon class="el-icon--right"><Plus /></el-icon>
      </el-button>
    </div>

    <el-scrollbar>
      <el-menu
        :default-active="activePath"
        class="sidebar-menu"
        router
      >
        <el-menu-item index="/">
          <el-icon><Monitor /></el-icon>
          <span>Dashboard</span>
        </el-menu-item>

        <div class="menu-label">MONITOR</div>
        <el-menu-item index="/post-overview">
          <el-icon><Document /></el-icon>
          <span>Post Overview</span>
        </el-menu-item>
        <el-menu-item index="/calendar">
          <el-icon><Calendar /></el-icon>
          <span>Calendar</span>
        </el-menu-item>

        <div class="menu-label">CONTENT</div>
        <el-menu-item index="/hashtag">
          <el-icon><Hash /></el-icon>
          <span>Hashtag</span>
        </el-menu-item>
        <el-menu-item index="/media-library">
          <el-icon><Picture /></el-icon>
          <span>Media Library</span>
        </el-menu-item>

        <div class="menu-label">CONFIGURE</div>
        <el-menu-item index="/user-manage">
          <el-icon><User /></el-icon>
          <span>User Manage</span>
        </el-menu-item>
        <el-menu-item index="/social-accounts">
          <el-icon><Connection /></el-icon>
          <span>Social Accounts</span>
        </el-menu-item>
        <el-menu-item index="/group-user">
          <el-icon><UserFilled /></el-icon>
          <span>Group User</span>
        </el-menu-item>
        <el-menu-item index="/access-accounts">
          <el-icon><Lock /></el-icon>
          <span>Access Accounts</span>
        </el-menu-item>
        <el-menu-item index="/manage-access-info">
          <el-icon><Setting /></el-icon>
          <span>Manage Access Info</span>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>

    <div class="user-profile">
      <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div class="user-info">
        <span class="name">Tuan Vu (Dev)</span>
        <span class="role">Director • Admin</span>
      </div>
      <el-icon class="more-icon"><MoreFilled /></el-icon>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Monitor, Document, Calendar, Picture, User, 
  Connection, UserFilled, Lock, Setting, Plus,
  MoreFilled
} from '@element-plus/icons-vue'

// Custom Hashtag icon as Icon component might not exist
import { Hash } from 'lucide-vue-next'

const route = useRoute()
const activePath = computed(() => route.path)
</script>

<style scoped>
.sidebar {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid #f0f0f0;
}

.logo {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand {
  font-family: 'Outfit', sans-serif;
  font-size: 18px;
  font-weight: 800;
  color: #1e3a63;
  line-height: 1;
}

.sub-brand {
  font-size: 12px;
  font-weight: 600;
  color: #444;
}

.product {
  font-size: 10px;
  color: #888;
}

.create-post-container {
  padding: 0 16px 16px;
}

.create-post-btn {
  width: 100%;
  height: 40px;
  background-color: #003366;
  border: none;
  font-weight: 600;
}

.menu-label {
  padding: 16px 24px 8px;
  font-size: 10px;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 1px;
}

.sidebar-menu {
  border-right: none;
}

:deep(.el-menu-item) {
  height: 40px;
  line-height: 40px;
  margin: 4px 12px;
  border-radius: 8px;
}

:deep(.el-menu-item.is-active) {
  background-color: #e6f0ff;
  color: #0052cc;
}

:deep(.el-menu-item:hover) {
  background-color: #f5f7fa;
}

.user-profile {
  padding: 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.user-info .name {
  font-size: 12px;
  font-weight: 600;
  color: #333;
}

.user-info .role {
  font-size: 10px;
  color: #888;
}

.more-icon {
  color: #ccc;
  cursor: pointer;
}
</style>
