<template>
  <div style="width:600px;margin:auto">

    <h2>Todo App (Pinia + Element Plus)</h2>

    <el-input
      v-model="newTodo"
      placeholder="Nhập công việc..."
      style="margin-bottom:10px"
    />

    <el-button type="primary" @click="add">
      Thêm công việc
    </el-button>

    <el-divider />

    <p>Tổng công việc: {{ store.totalTodos }}</p>
    <p>Đã hoàn thành: {{ store.completedTodos }}</p>

    <el-table
      :data="store.todos"
      style="width:100%;margin-top:20px"
    >

      <el-table-column label="Công việc">

        <template #default="scope">

          <span
            @click="store.toggleTodo(scope.row.id)"
            :style="{
              cursor:'pointer',
              textDecoration: scope.row.done ? 'line-through' : 'none'
            }"
          >
            {{ scope.row.text }}
          </span>

        </template>

      </el-table-column>

      <el-table-column label="Trạng thái" width="150">

        <template #default="scope">

          <el-tag
            :type="scope.row.done ? 'success' : 'warning'"
          >
            {{ scope.row.done ? 'Hoàn thành' : 'Chưa xong' }}
          </el-tag>

        </template>

      </el-table-column>

      <el-table-column label="Hành động" width="120">

        <template #default="scope">

          <el-button
            type="danger"
            size="small"
            @click="store.deleteTodo(scope.row.id)"
          >
            Xóa
          </el-button>

        </template>

      </el-table-column>

    </el-table>

  </div>
</template>

<script setup>
import { ref } from "vue"
import { useTodoStore } from "../stores/todosStore"

const store = useTodoStore()

const newTodo = ref("")

const add = () => {
  if (!newTodo.value) return

  store.addTodo(newTodo.value)
  newTodo.value = ""
}
</script>