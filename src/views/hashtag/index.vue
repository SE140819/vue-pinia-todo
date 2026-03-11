<template>
  <div class="hashtag-page">
    <el-row :gutter="24">
      <!-- Left Column: Add Hashtag Form -->
      <el-col :xs="24" :lg="14">
        <el-card class="form-card" shadow="never">
          <div class="card-header">
            <h3>Add Hashtag</h3>
          </div>
          
          <el-form :model="hashtagForm" label-position="top">
            <AppFormItem label="Name Group *">
              <AppInput 
                v-model="hashtagForm.name" 
                placeholder="Enter hashtag name" 
              />
            </AppFormItem>

            <AppFormItem label="Content *">
              <AppInput
                v-model="hashtagForm.content"
                type="textarea"
                :rows="4"
                placeholder="Enter content here"
                maxlength="5000"
                show-word-limit
              />
            </AppFormItem>

            <div class="client-section">
              <h4>Select Client</h4>
              <div class="search-client">
                <AppInput
                  v-model="clientSearch"
                  placeholder="Search client: name #whmcsid +phone (e.g. test #123 +456)"
                  prefix-icon="Search"
                />
              </div>
              <div class="client-select-box">
                <span class="placeholder">No client selected</span>
              </div>
            </div>

            <div class="form-footer">
              <el-button type="primary" class="add-btn" @click="handleAdd">
                Add Hashtag
              </el-button>
            </div>
          </el-form>
        </el-card>
      </el-col>

      <!-- Right Column: Hashtag List -->
      <el-col :xs="24" :lg="10">
        <div class="list-container">
          <div class="list-header">
            <h3>Hashtag</h3>
            <div class="search-bar">
              <el-input
                v-model="searchQuery"
                placeholder="Search Hashtag"
                class="search-input"
              >
                <template #prefix>
                   <el-icon><Search /></el-icon>
                </template>
                <template #suffix>
                  <el-icon><ArrowDown /></el-icon>
                </template>
              </el-input>
              <el-input
                v-model="searchSecondary"
                placeholder="group name or content"
                class="secondary-input"
              />
            </div>
          </div>

          <div class="hashtag-list">
            <el-card 
              v-for="item in hashtags" 
              :key="item.id" 
              class="hashtag-card" 
              shadow="never"
            >
              <div class="card-top">
                <span class="group-name">{{ item.name }}</span>
                <span class="id">#{{ item.id }}</span>
                <div class="actions">
                  <el-button :icon="Edit" text />
                  <el-button :icon="Delete" text type="danger" />
                </div>
              </div>
              <div class="card-content">
                <p>
                   <span class="highlight">{{ item.name }}</span> 
                   <span v-for="tag in item.tags" :key="tag" class="tag">#{{ tag }}</span>
                </p>
                <p v-if="item.description" class="description">{{ item.description }}</p>
              </div>
            </el-card>
          </div>

          <div class="pagination-container">
            <el-pagination
              v-model:current-page="currentPage"
              :page-size="10"
              layout="prev, pager, next"
              :total="50"
              small
            />
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Search, ArrowDown, Edit, Delete } from '@element-plus/icons-vue'
import AppInput from '@/components/Form/AppInput.vue'
import AppFormItem from '@/components/Form/AppFormItem.vue'

const hashtagForm = reactive({
  name: '',
  content: ''
})

const clientSearch = ref('')
const searchQuery = ref('')
const searchSecondary = ref('')
const currentPage = ref(1)

const hashtags = ref([
  { 
    id: 12, 
    name: 'Test Hashtag', 
    tags: ['Test_Hashtag', 'Test_Hashtag2'],
    description: ''
  },
  { 
    id: 3, 
    name: 'Test No Client 13.11.25', 
    tags: ['13.11.25', 'Test No Client'],
    description: ''
  },
  { 
    id: 12, 
    name: 'new11052025', 
    tags: ['testhashtag', 'cute', 'special', 'texas'],
    description: '#NEW#NEW / \u260E 1133 Bellaire St., Houston, TX ... Nail salon \u2615'
  },
  {
    id: 3,
    name: 'Vũ test 3',
    tags: ['VuBui'],
    description: 'test add hashtag một clientID 33'
  }
])

const handleAdd = () => {
}
</script>

<style scoped>
.hashtag-page {
  padding: 0;
}

.el-card {
  border-radius: 12px;
  border: 1px solid #f0f0f0;
}

.card-header h3, .list-header h3 {
  font-size: 16px;
  font-weight: 700;
  color: #1e3a63;
  margin: 0 0 20px 0;
}

.client-section h4 {
  font-size: 14px;
  font-weight: 700;
  color: #1e3a63;
  margin: 24px 0 12px;
}

.search-client {
  margin-bottom: 12px;
}

.client-select-box {
  height: 100px;
  border: 2px dashed #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fcfcfc;
}

.client-select-box .placeholder {
  color: #aaa;
  font-size: 13px;
}

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
}

.add-btn {
  height: 40px;
  padding: 0 24px;
  background-color: #3563a3;
  border: none;
  font-weight: 600;
}

/* List Styles */
.list-header {
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  gap: 8px;
  background-color: #f5f7fa;
  padding: 4px;
  border-radius: 8px;
}

.search-input {
  flex: 1;
}

:deep(.search-input .el-input__wrapper) {
  background-color: transparent;
  box-shadow: none !important;
}

.secondary-input {
  flex: 1;
}

:deep(.secondary-input .el-input__wrapper) {
  background-color: transparent;
  box-shadow: none !important;
  border-left: 1px solid #ddd;
  border-radius: 0;
}

.hashtag-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hashtag-card {
  transition: transform 0.2s;
}

.hashtag-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}

.card-top {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.group-name {
  font-weight: 700;
  color: #1e3a63;
  font-size: 14px;
}

.id {
  color: #aaa;
  font-size: 12px;
}

.actions {
  margin-left: auto;
  display: flex;
  gap: 4px;
}

.card-content {
  background-color: #fcfcfc;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #f5f5f5;
}

.card-content p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
}

.highlight {
  font-weight: 600;
  color: #d48806;
}

.tag {
  color: #1890ff;
  margin-left: 4px;
}

.description {
  margin-top: 8px !important;
  color: #666;
  font-size: 12px !important;
}

.pagination-container {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}
</style>
