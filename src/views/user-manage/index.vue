<template>
  <div class="user-management">
    <!-- Header Section -->
    <div class="page-header">
      <div class="search-section">
        <AppInput
          v-model="searchQuery"
          placeholder="Search"
          class="search-input"
          style="max-width:320px"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </AppInput>
      </div>
      <el-button type="primary" class="add-user-btn">
        <el-icon class="el-icon--left"><Plus /></el-icon>
        Add user
      </el-button>
    </div>

    <!-- Table Section -->
    <el-card class="table-card" shadow="never">
      <el-table :data="userStore.users" v-loading="userStore.loading" style="width: 100%" class="custom-table">
        <el-table-column label="User Name" min-width="200">
          <template #default="{ row }">
            <div class="user-cell">
              <el-avatar :size="32" class="user-avatar">{{ row.username.substring(0,2).toUpperCase() }}</el-avatar>
              <div class="user-info">
                <span class="username">{{ row.username }}</span>
                <span class="role">{{ row.role }} • {{ row.subRole }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column property="fullName" label="Full Name" min-width="150" />
        <el-table-column property="email" label="Email" min-width="200" />

        <el-table-column label="Social Accounts" min-width="180">
          <template #default="{ row }">
            <div class="social-stack">
              <div v-for="(social, index) in row.socials.slice(0, 3)" :key="index" class="social-icon">
                <el-avatar :size="24" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              </div>
              <span v-if="row.socials.length > 3" class="more-socials">+ {{ row.socials.length - 3 }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Status" width="120">
          <template #default="{ row }">
            <el-tag :type="row.status === 'Active' ? 'success' : 'info'" effect="light" class="status-tag">
              {{ row.status }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column property="expiration" label="Expiration" width="150" />

        <el-table-column label="Action" width="120" align="center">
          <template #default>
            <div class="action-buttons">
              <el-button :icon="Edit" class="edit-btn" text />
              <el-button :icon="Delete" class="delete-btn" text type="danger" />
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- Pagination Section -->
      <div class="pagination-footer">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="10"
          :total="userStore.total"
          layout="prev, pager, next, jumper"
          background
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore'
import AppInput from '@/components/Form/AppInput.vue'

const userStore = useUserStore()
const searchQuery = ref('')
const currentPage = ref(1)

onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as vars;

.user-management {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.add-user-btn {
  height: 40px;
  background-color: #3563a3;
  border-radius: 20px; // Pill shape as in screenshot
  font-weight: 600;
  padding: 0 20px;
}

.table-card {
  border-radius: 12px;
  border: none;
}

.user-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-avatar {
  background-color: #d9e2ef;
  color: #5c7ca6;
  font-weight: 600;
  font-size: 12px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: 700;
  color: #1e3a63;
  font-size: 14px;
}

.role {
  font-size: 11px;
  color: #aaa;
}

.social-stack {
  display: flex;
  align-items: center;
}

.social-icon {
  margin-right: -8px;
  border: 2px solid #fff;
  border-radius: 50%;
}

.more-socials {
  margin-left: 12px;
  font-size: 12px;
  color: #888;
  font-weight: 500;
}

.status-tag {
  border-radius: 12px;
  background-color: #e6f7f0;
  color: #52c41a;
  border: none;
  font-weight: 600;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.edit-btn, .delete-btn {
  padding: 4px;
  border-radius: 4px;
  border: 1px solid #eee;
  background-color: #fff9f0;
  color: #e6a23c;
}

.delete-btn {
  background-color: #fff5f5;
  color: #f56c6c;
}

.pagination-footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

/* Custom Table Styles to match screenshot */
:deep(.custom-table) {
  --el-table-header-bg-color: transparent;
  --el-table-row-hover-bg-color: #f9fbff;
  
  .el-table__header {
    th {
      font-weight: 700;
      color: #333;
      font-size: 13px;
      border-bottom: 2px solid #f0f0f0;
    }
  }
}
</style>
