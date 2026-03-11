<template>
  <div class="app-basic-search">
    <div class="filter-search-wrapper">
      <el-input
        v-bind="$attrs"
        class="basic-search-input"
        :placeholder="placeholder"
      >
        <template #prefix>
          <el-icon class="search-icon"><Search /></el-icon>
        </template>
        <!-- Allow parent to pass other slots if needed -->
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'

defineProps({
  placeholder: {
    type: String,
    default: 'Search'
  }
})
</script>

<style lang="scss" scoped>
@use "@/assets/styles/variables" as vars;

.filter-search-wrapper {
  padding: 5px;
  border-radius: 50px;
  background-color: #fff;
  display: flex;
  align-items: center;
  gap: 10px; // gap-2.5 = 10px
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05); // optional subtle shadow for "premium" look
}

.basic-search-input {
  width: 100%;
  
  :deep(.el-input__wrapper) {
    box-shadow: none !important; // Remove default border
    background-color: transparent !important;
    height: 48px; // !h-12 = 48px
    padding-left: 12px;
    
    &.is-focus {
      box-shadow: none !important;
    }
  }

  .search-icon {
    color: #1e3a63; // midnight-blue-950 approx
    font-size: 20px; // !w-5 !h-5 = 20px
  }

  :deep(.el-input__inner) {
    color: vars.$secondary-color;
    font-family: vars.$font-family-base;
    font-size: 14px;
    
    &::placeholder {
      color: #8da2bd;
      font-weight: 500;
    }
  }
}
</style>
