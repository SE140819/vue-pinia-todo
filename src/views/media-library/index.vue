<template>
  <div class="media-library-page">
    <!-- Header Toolbar -->
    <div class="toolbar">
      <div class="toolbar-left">
        <h2 class="page-title">Media Library</h2>
        <el-tag class="media-count" type="info" round>{{ filteredMedia.length }} items</el-tag>
      </div>
      <div class="toolbar-right">
        <!-- Search -->
        <el-input
          v-model="searchQuery"
          placeholder="Search media..."
          class="search-input"
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>

        <!-- Filter by type -->
        <el-select v-model="filterType" placeholder="All Types" class="type-filter" clearable>
          <el-option label="All Types" value="" />
          <el-option label="Image" value="image" />
          <el-option label="Video" value="video" />
          <el-option label="Document" value="document" />
        </el-select>

        <!-- View Toggle -->
        <div class="view-toggle">
          <el-tooltip content="Grid View">
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'grid' }"
              @click="viewMode = 'grid'"
            >
              <el-icon><Grid /></el-icon>
            </button>
          </el-tooltip>
          <el-tooltip content="List View">
            <button
              class="toggle-btn"
              :class="{ active: viewMode === 'list' }"
              @click="viewMode = 'list'"
            >
              <el-icon><List /></el-icon>
            </button>
          </el-tooltip>
        </div>

        <!-- Upload Button -->
        <el-upload
          ref="uploadRef"
          :show-file-list="false"
          :before-upload="handleBeforeUpload"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
        >
          <el-button type="primary" class="upload-btn">
            <el-icon class="mr-1"><Upload /></el-icon>
            Upload
          </el-button>
        </el-upload>
      </div>
    </div>

    <!-- Upload Drop Zone -->
    <el-upload
      class="upload-dropzone"
      drag
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      multiple
      accept="image/*,video/*,.pdf,.doc,.docx"
    >
      <el-icon class="drop-icon"><Upload /></el-icon>
      <p class="drop-text">Drop files here or <span class="drop-link">browse</span></p>
      <p class="drop-hint">Supports: JPG, PNG, GIF, MP4, PDF, DOC (Max 50MB)</p>

    </el-upload>

    <!-- Stats Row -->
    <div class="stats-row">
      <div
        v-for="stat in typeStats"
        :key="stat.type"
        class="stat-chip"
        :class="{ active: filterType === stat.type }"
        @click="filterType = filterType === stat.type ? '' : stat.type"
      >
        <el-icon :class="stat.iconClass">
          <component :is="stat.icon" />
        </el-icon>
        <span>{{ stat.label }}</span>
        <el-badge :value="stat.count" class="stat-badge" :type="stat.badgeType" />
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredMedia.length === 0" class="empty-state">
      <el-icon class="empty-icon"><Picture /></el-icon>
      <p class="empty-title">No media found</p>
      <p class="empty-sub">Upload files or adjust filters to see media here.</p>
    </div>

    <!-- GRID VIEW -->
    <div v-else-if="viewMode === 'grid'" class="media-grid">
      <div
        v-for="item in filteredMedia"
        :key="item.id"
        class="media-card"
        :class="{ selected: selectedIds.includes(item.id) }"
        @click="toggleSelect(item.id)"
      >
        <!-- Thumbnail -->
        <div class="media-thumb">
          <img v-if="item.type === 'image'" :src="item.url" :alt="item.name" />
          <div v-else class="file-icon-wrapper" :class="item.type">
            <el-icon class="file-icon"><component :is="getFileIcon(item.type)" /></el-icon>
          </div>

          <!-- Overlay on hover -->
          <div class="thumb-overlay">
            <el-button
              class="preview-btn"
              circle
              @click.stop="openPreview(item)"
            >
              <el-icon><ZoomIn /></el-icon>
            </el-button>
            <el-button
              class="delete-btn"
              circle
              type="danger"
              @click.stop="deleteItem(item.id)"
            >
              <el-icon><Delete /></el-icon>
            </el-button>
          </div>

          <!-- Selected check -->
          <div v-if="selectedIds.includes(item.id)" class="selected-badge">
            <el-icon><Check /></el-icon>
          </div>

          <!-- Type badge -->
          <el-tag class="type-badge" :type="getTagType(item.type)" size="small">
            {{ item.type }}
          </el-tag>
        </div>

        <div class="media-info">
          <span class="media-name" :title="item.name">{{ item.name }}</span>
          <span class="media-meta">{{ item.size }} • {{ item.date }}</span>
        </div>
      </div>
    </div>

    <!-- LIST VIEW -->
    <el-table
      v-else
      :data="filteredMedia"
      class="media-table"
      row-class-name="media-row"
      @row-click="(row: MediaItem) => toggleSelect(row.id)"
    >
      <el-table-column width="48">
        <template #default="{ row }">
          <div class="list-thumb">
            <img v-if="row.type === 'image'" :src="row.url" :alt="row.name" />
            <el-icon v-else class="list-file-icon"><component :is="getFileIcon(row.type)" /></el-icon>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Name" prop="name" min-width="200">
        <template #default="{ row }">
          <span class="list-name">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" width="110">
        <template #default="{ row }">
          <el-tag :type="getTagType(row.type)" size="small">{{ row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Size" prop="size" width="100" />
      <el-table-column label="Date" prop="date" width="140" />
      <el-table-column label="Actions" width="120" align="right">
        <template #default="{ row }">
          <el-button text :icon="ZoomIn" @click.stop="openPreview(row)" />
          <el-button text type="danger" :icon="Delete" @click.stop="deleteItem(row.id)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- Pagination -->
    <div v-if="filteredMedia.length > 0" class="pagination-row">
      <span class="selection-info" v-if="selectedIds.length > 0">
        {{ selectedIds.length }} selected
        <el-button text type="danger" size="small" @click="deleteSelected">Delete selected</el-button>
      </span>
      <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="filteredMedia.length"
        small
      />
    </div>

    <!-- Preview Dialog -->
    <el-dialog
      v-model="previewVisible"
      :title="previewItem?.name"
      class="preview-dialog"
      width="760px"
      destroy-on-close
    >
      <div class="preview-body">
        <img
          v-if="previewItem?.type === 'image'"
          :src="previewItem.url"
          class="preview-image"
          :alt="previewItem.name"
        />
        <video
          v-else-if="previewItem?.type === 'video'"
          :src="previewItem.url"
          controls
          class="preview-video"
        />
        <div v-else class="preview-file">
          <el-icon class="preview-file-icon"><Document /></el-icon>
          <p>{{ previewItem?.name }}</p>
        </div>
      </div>
      <template #footer>
        <el-button @click="previewVisible = false">Close</el-button>
        <el-button type="primary">
          <el-icon><Download /></el-icon>
          Download
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Search, Upload, Delete, ZoomIn, Check, Picture,
  Document, Download, VideoPlay
} from '@element-plus/icons-vue'

// Custom Grid & List icon via SVG wrapper (Element Plus doesn't have these by name)
import { Menu as List, Grid } from 'lucide-vue-next'

interface MediaItem {
  id: number
  name: string
  type: 'image' | 'video' | 'document'
  url: string
  size: string
  date: string
}

// State
const viewMode = ref<'grid' | 'list'>('grid')
const searchQuery = ref('')
const filterType = ref('')
const currentPage = ref(1)
const pageSize = ref(20)
const selectedIds = ref<number[]>([])
const previewVisible = ref(false)
const previewItem = ref<MediaItem | null>(null)

// Mock data
const mediaItems = ref<MediaItem[]>([
  {
    id: 1, name: 'banner-summer-2025.jpg', type: 'image',
    url: 'https://picsum.photos/seed/media1/400/300',
    size: '2.4 MB', date: '2025-03-10'
  },
  {
    id: 2, name: 'product-launch-hero.jpg', type: 'image',
    url: 'https://picsum.photos/seed/media2/400/300',
    size: '1.8 MB', date: '2025-03-09'
  },
  {
    id: 3, name: 'campaign-report-q1.pdf', type: 'document',
    url: '', size: '540 KB', date: '2025-03-08'
  },
  {
    id: 4, name: 'social-ad-video.mp4', type: 'video',
    url: '', size: '18.2 MB', date: '2025-03-07'
  },
  {
    id: 5, name: 'team-photo-march.jpg', type: 'image',
    url: 'https://picsum.photos/seed/media5/400/300',
    size: '3.1 MB', date: '2025-03-06'
  },
  {
    id: 6, name: 'content-guide.docx', type: 'document',
    url: '', size: '210 KB', date: '2025-03-05'
  },
  {
    id: 7, name: 'instagram-post-template.jpg', type: 'image',
    url: 'https://picsum.photos/seed/media7/400/300',
    size: '900 KB', date: '2025-03-04'
  },
  {
    id: 8, name: 'brand-intro.mp4', type: 'video',
    url: '', size: '45 MB', date: '2025-03-03'
  },
  {
    id: 9, name: 'logo-main.png', type: 'image',
    url: 'https://picsum.photos/seed/media9/400/300',
    size: '120 KB', date: '2025-03-02'
  },
  {
    id: 10, name: 'pricing-sheet-2025.pdf', type: 'document',
    url: '', size: '1.2 MB', date: '2025-03-01'
  },
  {
    id: 11, name: 'facebook-cover.jpg', type: 'image',
    url: 'https://picsum.photos/seed/media11/400/300',
    size: '780 KB', date: '2025-02-28'
  },
  {
    id: 12, name: 'testimonial-video.mp4', type: 'video',
    url: '', size: '32 MB', date: '2025-02-27'
  },
])

// Computed
const filteredMedia = computed(() => {
  let list = mediaItems.value
  if (filterType.value) list = list.filter(m => m.type === filterType.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(m => m.name.toLowerCase().includes(q))
  }
  return list
})

const typeStats = computed(() => [
  {
    type: 'image', label: 'Images', icon: Picture, iconClass: 'stat-icon-image',
    count: mediaItems.value.filter(m => m.type === 'image').length, badgeType: 'primary' as const
  },
  {
    type: 'video', label: 'Videos', icon: VideoPlay, iconClass: 'stat-icon-video',
    count: mediaItems.value.filter(m => m.type === 'video').length, badgeType: 'warning' as const
  },
  {
    type: 'document', label: 'Documents', icon: Document, iconClass: 'stat-icon-doc',
    count: mediaItems.value.filter(m => m.type === 'document').length, badgeType: 'success' as const
  },
])

// Methods
function getFileIcon(type: string) {
  if (type === 'video') return VideoPlay
  return Document
}

function getTagType(type: string): 'primary' | 'warning' | 'success' | 'info' {
  if (type === 'image') return 'primary'
  if (type === 'video') return 'warning'
  return 'success'
}

function toggtleSelect(id: number) {
  const index = selectedIds.value.indexOf(id)
  if (index === -1) selectedIds.value.push(id)
  else selectedIds.value.splice(index, 1)
}

function openPreview(item: MediaItem) {
  previewItem.value = item
  previewVisible.value = true
}

function deleteItem(id: number) {
  ElMessageBox.confirm('Delete this media file?', 'Confirm', {
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    mediaItems.value = mediaItems.value.filter(m => m.id !== id)
    selectedIds.value = selectedIds.value.filter(s => s !== id)
    ElMessage.success('File deleted')
  }).catch(() => {})
}

function deleteSelected() {
  ElMessageBox.confirm(`Delete ${selectedIds.value.length} selected files?`, 'Confirm', {
    confirmButtonText: 'Delete All',
    cancelButtonText: 'Cancel',
    type: 'warning',
  }).then(() => {
    mediaItems.value = mediaItems.value.filter(m => !selectedIds.value.includes(m.id))
    selectedIds.value = []
    ElMessage.success('Files deleted')
  }).catch(() => {})
}

function handleBeforeUpload(file: File) {
  const isLt50M = file.size / 1024 / 1024 < 50
  if (!isLt50M) {
    ElMessage.error('File must be smaller than 50MB')
    return false
  }

  // Mock add to list
  const isImage = file.type.startsWith('image/')
  const isVideo = file.type.startsWith('video/')
  const newItem: MediaItem = {
    id: Date.now(),
    name: file.name,
    type: isImage ? 'image' : isVideo ? 'video' : 'document',
    url: isImage ? URL.createObjectURL(file) : '',
    size: (file.size / 1024).toFixed(0) + ' KB',
    date: new Date().toISOString().slice(0, 10),
  }
  mediaItems.value.unshift(newItem)
  ElMessage.success(`"${file.name}" uploaded successfully`)
  return false // prevent actual upload
}
</script>

<style scoped>
.media-library-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Toolbar */
.toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}

.page-title {
  font-size: 18px;
  font-weight: 700;
  color: #1e3a63;
  margin: 0;
}

.media-count {
  font-size: 12px;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.search-input {
  width: 220px;
}

.type-filter {
  width: 140px;
}

/* View Toggle */
.view-toggle {
  display: flex;
  background: #f1f5f9;
  border-radius: 8px;
  padding: 3px;
  gap: 2px;
}

.toggle-btn {
  border: none;
  background: transparent;
  border-radius: 6px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #94a3b8;
  transition: all 0.2s;
}

.toggle-btn.active {
  background: #fff;
  color: #0052cc;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.toggle-btn:hover:not(.active) {
  color: #334155;
}

.upload-btn {
  background-color: #003366;
  border: none;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.mr-1 {
  margin-right: 4px;
}

/* Drop Zone */
.upload-dropzone {
  width: 100%;
}

:deep(.upload-dropzone .el-upload-dragger) {
  width: 100%;
  height: 90px;
  padding: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border-radius: 12px;
  border: 2px dashed #c7d7f0;
  background: #f8fbff;
  transition: all 0.2s;
}

:deep(.upload-dropzone .el-upload-dragger:hover) {
  border-color: #0052cc;
  background: #eef4ff;
}

.drop-icon {
  font-size: 28px;
  color: #0052cc;
}

.drop-text {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.drop-link {
  color: #0052cc;
  cursor: pointer;
  font-weight: 600;
}

.drop-hint {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
}

/* Stats Row */
.stats-row {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.stat-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 13px;
  font-weight: 500;
  color: #334155;
}

.stat-chip:hover {
  border-color: #0052cc;
  color: #0052cc;
}

.stat-chip.active {
  background: #eef4ff;
  border-color: #0052cc;
  color: #0052cc;
}

.stat-icon-image { color: #0052cc; }
.stat-icon-video { color: #e67e22; }
.stat-icon-doc   { color: #27ae60; }

.stat-badge {
  margin-left: 4px;
}

/* Grid */
.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
}

.media-card {
  border-radius: 12px;
  border: 2px solid #f0f0f0;
  overflow: hidden;
  background: #fff;
  cursor: pointer;
  transition: all 0.25s;
}

.media-card:hover {
  border-color: #a8c4f0;
  box-shadow: 0 4px 16px rgba(0,82,204,0.1);
  transform: translateY(-2px);
}

.media-card.selected {
  border-color: #0052cc;
  box-shadow: 0 0 0 3px rgba(0,82,204,0.12);
}

.media-thumb {
  position: relative;
  width: 100%;
  aspect-ratio: 4/3;
  background: #f8fafc;
  overflow: hidden;
}

.media-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.file-icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-icon-wrapper.video { background: #fff8ee; }
.file-icon-wrapper.document { background: #f0faf5; }

.file-icon {
  font-size: 48px;
  color: #94a3b8;
}

.file-icon-wrapper.video .file-icon { color: #e67e22; }
.file-icon-wrapper.document .file-icon { color: #27ae60; }

/* Hover Overlay */
.thumb-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.2s;
}

.media-thumb:hover .thumb-overlay {
  opacity: 1;
}

.preview-btn, .delete-btn {
  width: 36px;
  height: 36px;
}

/* Selected badge */
.selected-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 24px;
  height: 24px;
  background: #0052cc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
}

/* Type badge */
.type-badge {
  position: absolute;
  bottom: 8px;
  right: 8px;
}

.media-info {
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.media-name {
  font-size: 13px;
  font-weight: 600;
  color: #1e3a63;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.media-meta {
  font-size: 11px;
  color: #94a3b8;
}

/* List Table */
.media-table {
  border-radius: 12px;
  border: 1px solid #f0f0f0;
  overflow: hidden;
}

.list-thumb {
  width: 40px;
  height: 40px;
  border-radius: 6px;
  overflow: hidden;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
}

.list-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.list-file-icon {
  font-size: 20px;
  color: #94a3b8;
}

.list-name {
  font-size: 13px;
  font-weight: 500;
  color: #1e3a63;
}

/* Pagination row */
.pagination-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
}

.selection-info {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 64px 20px;
  color: #94a3b8;
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 16px;
  color: #cbd5e1;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
  margin: 0 0 8px;
}

.empty-sub {
  font-size: 13px;
  color: #94a3b8;
  margin: 0;
}

/* Preview Dialog */
.preview-body {
  display: flex;
  justify-content: center;
  min-height: 200px;
}

.preview-image {
  max-width: 100%;
  max-height: 480px;
  border-radius: 8px;
  object-fit: contain;
}

.preview-video {
  max-width: 100%;
  max-height: 480px;
  border-radius: 8px;
}

.preview-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 40px;
  color: #64748b;
}

.preview-file-icon {
  font-size: 80px;
  color: #cbd5e1;
}
</style>
