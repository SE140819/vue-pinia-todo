<template>

<div style="width:600px;margin:auto">

<h2>Todo App</h2>

<el-input v-model="newTodo" placeholder="Nhập todo"/>

<el-button type="primary" @click="add">
Thêm
</el-button>

<el-table
  :data="store.todos"
  style="margin-top:20px"
>

<el-table-column label="Todo">

<template #default="scope">

<span
@click="store.toggleTodo(scope.row.id)"
:style="{
textDecoration:scope.row.done?'line-through':'none'
}"
>
{{scope.row.text}}
</span>

</template>

</el-table-column>

</el-table>

</div>

</template>

<script setup>

import { ref, onMounted, onUnmounted, watch } from "vue"
import { useTodoStore } from "@/stores/todosStore"

const store = useTodoStore()

const newTodo = ref("")

let timer

// lifecycle khi component load
onMounted(()=>{

console.log("Component mounted")

store.loadTodos()

timer = setInterval(()=>{
console.log("app running...")
},5000)

})

// watch state thay đổi
watch(()=>store.todos,(newVal)=>{

console.log("Todos changed",newVal)

},{deep:true})

// cleanup
onUnmounted(()=>{

clearInterval(timer)

console.log("Component destroyed")

})

const add = ()=>{

if(!newTodo.value) return

store.addTodo(newTodo.value)

newTodo.value=""

}

</script>