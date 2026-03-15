<template>
  <div class="todo-container" v-loading="store.loading">
    <h2>Todo App 11</h2>

    <div class="input-group">
      <el-input
        v-model="newTodo"
        placeholder="Nhập nội dung công việc và nhấn Enter..."
        :disabled="store.loading"
        @keyup.enter="handleAdd"
      />
      <el-button 
        type="primary" 
        :loading="store.loading" 
        @click="handleAdd"
      >
        Thêm mới
      </el-button>
    </div>

    <el-table
      :data="store.todos"
      class="todo-table"
      empty-text="Chưa có công việc nào"
    >
      <el-table-column label="Trạng thái" width="100">
        <template #default="scope">
          <el-checkbox 
            :model-value="scope.row.done" 
            @change="handleToggle(scope.row.id)"
          />
        </template>
      </el-table-column>
      <el-table-column label="Nội dung">
        <template #default="scope">
          <span
            class="todo-text"
            :class="{ 'is-done': scope.row.done }"
          >
            {{ scope.row.text }}
          </span>
        </template>
      </el-table-column>
      <el-table-column label="Thao tác" width="120">
        <template #default="scope">
          <el-button 
            type="danger" 
            size="small" 
            icon="Delete"
            plain
            @click="handleRemove(scope.row.id)"
          >
            Xóa
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useTodoStore } from "@/stores/todosStore"
import { Delete } from "@element-plus/icons-vue"

const store = useTodoStore()
const newTodo = ref("")

async function handleAdd() {
  const text = newTodo.value.trim()
  if (!text) return

  await store.addTodo(text)
  newTodo.value = ""
}

async function handleToggle(id: string | number) {
  await store.toggleTodo(id)
}

async function handleRemove(id: string | number) {
  await store.removeTodo(id)
}

onMounted(() => {
  store.loadTodos()
})
</script>

<style scoped>
.todo-container {
  width: 600px;
  margin: auto;
  padding: 20px;
}

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.todo-table {
  margin-top: 20px;
}

.todo-text {
  cursor: pointer;
}

.todo-text.is-done {
  text-decoration: line-through;
  color: #999;
}
</style>