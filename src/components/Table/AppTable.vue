<template>
  <div class="app-table-container">
    <el-table
      v-loading="loading"
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
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        layout="prev, pager, next, jumper"
        background
        @update:current-page="$emit('page-change', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  total: {
    type: Number,
    default: 0
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  }
})

defineEmits(['page-change', 'update:currentPage'])
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
