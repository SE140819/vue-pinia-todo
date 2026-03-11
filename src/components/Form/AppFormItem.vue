<template>
  <el-form-item :label="label" class="premium-form-item" v-bind="$attrs">
    <slot></slot>
  </el-form-item>
</template>

<script setup>
defineProps({
  label: String
})
</script>

<style scoped>
.premium-form-item {
  margin-bottom: 24px;
  position: relative;
}

:deep(.el-form-item__label) {
  position: absolute;
  top: -10px;
  left: 12px;
  background: #fff;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 600;
  color: #666;
  z-index: 2;
  line-height: 1;
}

/* Fix for when there is no label */
.premium-form-item:not([label]) :deep(.el-form-item__label) {
  display: none;
}
</style>
