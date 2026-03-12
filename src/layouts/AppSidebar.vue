<template>
  <div class="sidebar" :class="{ 'is-collapsed': isCollapse }">
    <!-- Collapse Toggle Button -->
    <div 
      class="collapse-toggle"
      @click="$emit('toggle-collapse')"
    >
      <el-icon :class="{ 'rotated': isCollapse }"><ChevronLeft /></el-icon>
    </div>

    <div class="logo">
      <svg class="logo-svg flex-shrink-0" viewBox="0 0 100 100" width="36" height="36">
        <path d="M10 20 L90 20 L60 80 L10 80 Z" fill="#2d5a9e" />
        <path d="M40 20 L90 20 L60 80 L40 80 Z" fill="#1e3a63" />
      </svg>
      <div v-if="!isCollapse" class="logo-text min-w-0">
        <span class="brand">FASTBOY</span>
        <span class="sub-brand">Marketing</span>
        <span class="product">Social Automation</span>
      </div>
    </div>

    <div class="create-post-container">
      <el-button type="primary" class="create-post-btn" :class="{ 'collapsed-btn': isCollapse }">
        <span v-if="!isCollapse">Create Post</span>
        <div class="plus-icon-wrapper" :class="{ 'ml-2': !isCollapse }">
          <el-icon><Plus /></el-icon>
        </div>
      </el-button>
    </div>

    <el-scrollbar>
      <el-menu
        :default-active="activePath"
        class="sidebar-menu"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/">
          <el-icon><Monitor /></el-icon>
          <template #title>Dashboard</template>
        </el-menu-item>

        <div v-if="!isCollapse" class="menu-label">MONITOR</div>
        <el-menu-item index="/post-overview">
          <el-icon><Document /></el-icon>
          <template #title>Post Overview</template>
        </el-menu-item>
        <el-menu-item index="/calendar">
          <el-icon><Calendar /></el-icon>
          <template #title>Calendar</template>
        </el-menu-item>

        <div v-if="!isCollapse" class="menu-label">CONTENT</div>
        <el-menu-item index="/hashtag">
          <el-icon><Hash /></el-icon>
          <template #title>Hashtag</template>
        </el-menu-item>
        <el-menu-item index="/media-library">
          <el-icon><Picture /></el-icon>
          <template #title>Media Library</template>
        </el-menu-item>

        <div v-if="!isCollapse" class="menu-label">CONFIGURE</div>
        <el-menu-item index="/user-manage">
          <el-icon><User /></el-icon>
          <template #title>User Manage</template>
        </el-menu-item>
        <el-menu-item index="/social-accounts">
          <el-icon><Connection /></el-icon>
          <template #title>Social Accounts</template>
        </el-menu-item>
        <el-menu-item index="/group-user">
          <el-icon><UserFilled /></el-icon>
          <template #title>Group User</template>
        </el-menu-item>
        <el-menu-item index="/access-accounts">
          <el-icon><Lock /></el-icon>
          <template #title>Access Accounts</template>
        </el-menu-item>
        <el-menu-item index="/manage-access-info">
          <el-icon><Setting /></el-icon>
          <template #title>Manage Access Info</template>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>


    <div class="user-profile">
      <el-avatar :size="36" class="flex-shrink-0 avatar-img" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
      <div v-if="!isCollapse" class="user-info min-w-0">
        <span class="name truncate">Tuan Vu (Dev)</span>
        <span class="role truncate">Director • Admin</span>
      </div>
      <el-icon v-if="!isCollapse" class="more-icon"><MoreFilled /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { 
  Monitor, Document, Calendar, Picture, User, 
  Connection, UserFilled, Lock, Setting, Plus,
  MoreFilled
} from '@element-plus/icons-vue'
import { Hash, ChevronLeft } from 'lucide-vue-next'

const props = defineProps<{
  isCollapse?: boolean
}>()

defineEmits<{
  (e: 'toggle-collapse'): void
}>()

const route = useRoute()
const activePath = computed(() => route.path)
</script>


<style scoped>
.sidebar {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-right: 1px solid #eef2f6;
  position: relative;
  transition: width 0.3s ease-in-out;
}

.is-collapsed {
  width: 64px;
}

.collapse-toggle {
  position: absolute;
  right: -13px;
  top: 32px;
  width: 26px;
  height: 26px;
  background: #fff;
  border: 1px solid #eef2f6;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0,0,0,0.02);
  transition: all 0.2s ease;
  color: #64748b;
}

.collapse-toggle:hover {
  background: #f8fafc;
  color: #334155;
}

.rotated {
  transform: rotate(180deg);
}

.logo {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.brand {
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
  font-style: italic;
  font-weight: 900;
  color: #003366;
  line-height: 1.1;
  letter-spacing: 0.5px;
}

.sub-brand {
  font-size: 11px;
  font-weight: 600;
  color: #334155;
  margin-top: 1px;
}

.product {
  font-size: 10px;
  color: #64748b;
  white-space: nowrap;
}

.create-post-container {
  padding: 0 16px 16px;
}

.create-post-btn {
  width: 100%;
  height: 44px;
  background-color: #003366;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 51, 102, 0.1);
}

.create-post-btn:hover {
  background-color: #002244;
}

.plus-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1.5px solid rgba(255,255,255,0.8);
  border-radius: 4px;
}

.plus-icon-wrapper .el-icon {
  font-size: 12px;
  font-weight: bold;
}

.ml-2 {
  margin-left: 8px;
}

.collapsed-btn {
  padding: 0;
  width: 44px;
  margin: 0 auto;
}

.menu-label {
  padding: 18px 20px 8px;
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.sidebar-menu {
  border-right: none;
  overflow: hidden;
  padding: 0 8px;
}

/* Hide scrollbars */
:deep(.el-scrollbar__wrap) {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
:deep(.el-scrollbar__wrap::-webkit-scrollbar) {
  display: none;
}
:deep(.el-scrollbar__bar.is-vertical),
:deep(.el-scrollbar__bar.is-horizontal) {
  display: none !important;
}

:deep(.el-menu-item) {
  height: 44px;
  line-height: 44px;
  margin: 4px 0;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  transition: all 0.2s ease;
}

:deep(.el-menu-item .el-icon) {
  font-size: 20px;
  margin-right: 12px;
  color: #64748b;
}

:deep(.el-menu-item.is-active) {
  background-color: #eef4ff;
  color: #0052cc;
  font-weight: 600;
}

:deep(.el-menu-item.is-active .el-icon) {
  color: #0052cc;
}

:deep(.el-menu-item:hover) {
  background-color: #f8fafc;
  color: #334155;
}

:deep(.el-menu-item:hover .el-icon) {
  color: #334155;
}

.user-profile {
  padding: 16px 20px;
  border-top: 1px solid #eef2f6;
  display: flex;
  align-items: center;
  gap: 12px;
  overflow: hidden;
  margin-top: auto;
}

.avatar-img {
  border: 1px solid #e2e8f0;
}

.user-info {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.user-info .name {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.2px;
}

.user-info .role {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin-top: 1px;
}

.more-icon {
  color: #cbd5e1;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.2s;
}

.more-icon:hover {
  color: #94a3b8;
}
</style>
