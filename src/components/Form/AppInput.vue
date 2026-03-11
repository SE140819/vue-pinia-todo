<template>
  <el-input
    v-bind="$attrs"
    class="premium-input"
  >
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps || {}" />
    </template>
  </el-input>
</template>

<script setup lang="ts">
// We inherit all el-input props and slots via v-bind="$attrs" and the slot loop
</script>


<style scoped>
:deep(.el-input__wrapper) {
  height: 48px;
  border-radius: 8px !important;
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  transition: all 0.3s;
  background-color: #fff;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #2d5a9e inset !important;
}

:deep(.el-textarea__inner) {
  border-radius: 8px !important;
  box-shadow: 0 0 0 1px #dcdfe6 inset !important;
  transition: all 0.3s;
  padding: 12px;
}

:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #2d5a9e inset !important;
}
</style>
