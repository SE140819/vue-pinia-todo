import { defineStore } from "pinia"
import { todoApi } from "@/api/todo"

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: []
  }),

  getters: {
    completedTodos: (state) => state.todos.filter(t => t.done),
    pendingTodos: (state) => state.todos.filter(t => !t.done),
    totalCount: (state) => state.todos.length
  },

  actions: {
    loadTodos() {
      this.todos = todoApi.getTodos()
    },

    async addTodo(text) {
      const newTodo = await todoApi.createTodo(text)
      this.todos.push(newTodo)
      todoApi.saveTodos(this.todos)
    },

    toggleTodo(id) {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
        todoApi.saveTodos(this.todos)
      }
    }
  }
})