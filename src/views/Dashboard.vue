<template>
  <div style="padding: 20px;">
    <h2>Dashboard</h2>
    <el-button type="danger" @click="logout" style="margin-bottom: 20px;">
      Logout
    </el-button>
    <el-divider />
    <TodoList />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/authStore"
import TodoList from "@/components/TodoList.vue"

const router = useRouter()
const store = useAuthStore()

const logout = () => {
  store.logout()
  router.push("/login")
}
</script>