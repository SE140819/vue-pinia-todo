import { CONSTANTS } from '@/constants'
import type { Todo } from '@/types'

/**
 * Todo API/Service layer
 */
export const todoApi = {
  getTodos(): Todo[] {
    const data = localStorage.getItem(CONSTANTS.STORAGE_KEYS.TODOS)
    return data ? JSON.parse(data) : []
  },

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.TODOS, JSON.stringify(todos))
  },

  /**
   * Mock API call to add a todo
   * In a real app, this would be: return axiosClient.post('/todos', { text })
   */
  async createTodo(text: string): Promise<Todo> {
    return {
      id: Date.now(),
      text,
      done: false
    }
  }
}

