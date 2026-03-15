import { defineStore } from "pinia"
import { todoApi } from "@/api/todo"
import type { Todo } from "@/types"

interface TodoState {
  todos: Todo[]
  loading: boolean
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoState => ({
    todos: [],
    loading: false
  }),

  getters: {
    completedTodos: (state) => state.todos.filter(t => t.done),
    pendingTodos: (state) => state.todos.filter(t => !t.done),
    totalCount: (state) => state.todos.length
  },

  actions: {
    async loadTodos(): Promise<void> {
      this.loading = true
      try {
        this.todos = await todoApi.getTodos()
      } catch (error) {
        console.error('Failed to load todos:', error)
      } finally {
        this.loading = false
      }
    },

    async addTodo(text: string): Promise<void> {
      this.loading = true
      try {
        await todoApi.createTodo(text)
        await this.loadTodos() // Re-fetch to sync with server
      } catch (error) {
        console.error('Failed to add todo:', error)
      } finally {
        this.loading = false
      }
    },

    async updateTodo(updatedTodo: Todo): Promise<void> {
      this.loading = true
      try {
        await todoApi.updateTodo(updatedTodo)
        await this.loadTodos() // Re-fetch to sync with server
      } catch (error) {
        console.error('Failed to update todo:', error)
      } finally {
        this.loading = false
      }
    },

    async removeTodo(id: string | number): Promise<void> {
      this.loading = true
      try {
        await todoApi.deleteTodo(id)
        await this.loadTodos() // Re-fetch to sync with server
      } catch (error) {
        console.error('Failed to remove todo:', error)
      } finally {
        this.loading = false
      }
    },

    async toggleTodo(id: string | number): Promise<void> {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        await this.updateTodo({ ...todo, done: !todo.done })
      }
    }
  }
})