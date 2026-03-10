<template>

<div style="width:300px;margin:100px auto">

<h2>Login</h2>

<el-input v-model="username" placeholder="Username"/>

<el-input
  v-model="password"
  type="password"
  placeholder="Password"
  style="margin-top:10px"
/>

<el-button
  type="primary"
  style="margin-top:10px"
  @click="handleLogin"
>
Login
</el-button>

</div>

</template>

<script setup>

import { ref } from "vue"
import { useRouter } from "vue-router"
import { useAuthStore } from "@/stores/authStore"

const router = useRouter()
const store = useAuthStore()

const username = ref("")
const password = ref("")

const handleLogin = () => {

const success = store.login(username.value,password.value)

if(success){
router.push("/")
}else{
alert("Sai tài khoản")
}

}

</script>