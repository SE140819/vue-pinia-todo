import { defineStore } from "pinia"
import { todoApi } from "@/api/todo"
import type { Todo } from "@/types"

interface TodoState {
  todos: Todo[]
}

export const useTodoStore = defineStore("todo", {
  state: (): TodoState => ({
    todos: []
  }),

  getters: {
    completedTodos: (state) => state.todos.filter(t => t.done),
    pendingTodos: (state) => state.todos.filter(t => !t.done),
    totalCount: (state) => state.todos.length
  },

  actions: {
    loadTodos(): void {
      this.todos = todoApi.getTodos()
    },

    async addTodo(text: string): Promise<void> {
      const newTodo = await todoApi.createTodo(text)
      this.todos.push(newTodo)
      todoApi.saveTodos(this.todos)
    },

    toggleTodo(id: number): void {
      const todo = this.todos.find(t => t.id === id)
      if (todo) {
        todo.done = !todo.done
        todoApi.saveTodos(this.todos)
      }
    }
  }
})