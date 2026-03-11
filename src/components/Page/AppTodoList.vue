<template>
  <div class="todo-container">
    <h2>Todo App</h2>

    <div class="input-group">
      <el-input
        v-model="newTodo"
        placeholder="Nhập todo"
        @keyup.enter="handleAdd"
      />
      <el-button type="primary" @click="handleAdd">
        Thêm
      </el-button>
    </div>

    <el-table
      :data="store.todos"
      class="todo-table"
    >
      <el-table-column label="Todo">
        <template #default="scope">
          <span
            class="todo-text"
            :class="{ 'is-done': scope.row.done }"
            @click="handleToggle(scope.row.id)"
          >
            {{ scope.row.text }}
          </span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from "vue"
import { useTodoStore } from "@/stores/todosStore"

const store = useTodoStore()

const newTodo = ref("")
const timer = ref<any>(null)

function handleAdd() {
  if (!newTodo.value) return

  try {
    store.addTodo(newTodo.value)
    newTodo.value = ""
  } catch (error) {
    console.error('Failed to add todo:', error)
  }
}

function handleToggle(id: number) {
  store.toggleTodo(id)
}

onMounted(() => {
  console.log("Component mounted")
  store.loadTodos()

  timer.value = setInterval(() => {
    console.log("app running...")
  }, 5000)
})

watch(() => store.todos, (newVal) => {
  console.log("Todos changed", newVal)
}, { deep: true })

onUnmounted(() => {
  if (timer.value) {
    clearInterval(timer.value)
  }
  console.log("Component destroyed")
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