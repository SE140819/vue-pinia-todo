<template>
  <div class="app-table-container">
    <div v-if="loading" class="table-loading-state">
      <AppTableSkeleton :rows="5" />
    </div>

    <el-table
      v-else
      :data="data"
      v-bind="$attrs"
      class="app-table"
      style="width: 100%"
    >
      <template v-for="col in columns" :key="col.prop || col.label">
        <!-- Render slot if provided -->
        <el-table-column
          v-if="col.slot"
          v-bind="col"
        >
          <template #default="scope">
            <slot :name="col.slot" v-bind="scope"></slot>
          </template>
        </el-table-column>
        
        <!-- Standard column -->
        <el-table-column
          v-else
          v-bind="col"
        />
      </template>

      <!-- Support for append slot -->
      <template #append>
        <slot name="append"></slot>
      </template>
      
      <!-- Support for empty slot -->
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>

    <!-- Built-in Pagination -->
    <div v-if="total > 0" class="app-pagination">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        background
        @update:current-page="handlePageChange"
      />

    </div>
  </div>
</template>

<script setup lang="ts">
import AppTableSkeleton from '@/components/Skeleton/AppTableSkeleton.vue'

interface Column {
  label: string
  prop?: string
  width?: string | number
  slot?: string
  align?: string
  [key: string]: any
}

interface Props {
  data?: any[]
  columns?: Column[]
  loading?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
}

withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
  loading: false,
  total: 0,
  currentPage: 1,
  pageSize: 10
})

const emit = defineEmits<{
  (e: 'page-change', val: number): void
  (e: 'update:currentPage', val: number): void
}>()

function handlePageChange(val: number) {
  emit('update:currentPage', val)
  emit('page-change', val)
}
</script>


<style lang="scss" scoped>
@use "@/assets/styles/variables" as vars;

.app-table-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

:deep(.app-table) {
  --el-table-header-bg-color: transparent;
  --el-table-row-hover-bg-color: #f9fbff;
  border-radius: 8px;
  overflow: hidden;

  .el-table__header {
    th {
      font-weight: 700;
      color: #333;
      font-size: 13px;
      border-bottom: 2px solid #f0f0f0;
      padding: 12px 0;
    }
  }

  .el-table__row {
    td {
      padding: 12px 0;
    }
  }
}

.app-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
