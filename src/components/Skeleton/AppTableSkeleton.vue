<template>
  <div class="table-skeleton">
    <div v-for="i in rows" :key="i" class="skeleton-row">
      <el-skeleton animated :rows="0">
        <template #template>
          <div class="row-inner">
            <el-skeleton-item variant="circle" style="width: 32px; height: 32px" />
            <div class="content-skeleton">
              <el-skeleton-item variant="h3" style="width: 40%" />
              <el-skeleton-item variant="text" style="width: 20%" />
            </div>
            <el-skeleton-item variant="text" style="width: 15%" />
            <el-skeleton-item variant="text" style="width: 15%" />
            <el-skeleton-item variant="rect" style="width: 40px; height: 24px; border-radius: 12px" />
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  rows?: number
}

withDefaults(defineProps<Props>(), {
  rows: 5
})
</script>


<style lang="scss" scoped>
.table-skeleton {
  padding: 10px;
}

.skeleton-row {
  padding: 16px 0;
  border-bottom: 1px solid #f5f7fa;
  
  &:last-child {
    border-bottom: none;
  }
}

.row-inner {
  display: flex;
  align-items: center;
  gap: 16px;
}

.content-skeleton {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
