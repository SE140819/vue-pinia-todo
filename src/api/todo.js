import { CONSTANTS } from '@/constants'

/**
 * Todo API/Service layer
 */
export const todoApi = {
  getTodos() {
    const data = localStorage.getItem(CONSTANTS.STORAGE_KEYS.TODOS)
    return data ? JSON.parse(data) : []
  },

  saveTodos(todos) {
    localStorage.setItem(CONSTANTS.STORAGE_KEYS.TODOS, JSON.stringify(todos))
  },

  /**
   * Mock API call to add a todo
   * In a real app, this would be: return axiosClient.post('/todos', { text })
   */
  async createTodo(text) {
    return {
      id: Date.now(),
      text,
      done: false
    }
  }
}
