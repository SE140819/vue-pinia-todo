import axiosClient from './axiosClient'
import type { Todo } from '@/types'

export const todoApi = {
  async getTodos(): Promise<Todo[]> {
    const response: any = await axiosClient.get('/todos')
    return response.map((item: any) => ({
      id: item._id,
      text: item.text,
      done: item.done
    }))
  },

  async createTodo(text: string): Promise<Todo> {
    const item: any = await axiosClient.post('/todos', {
      text,
      done: false
    })
    return {
      id: item._id,
      text: item.text,
      done: item.done
    }
  },

  async updateTodo(todo: Todo): Promise<Todo> {
    const { id, ...data } = todo
    const item: any = await axiosClient.put(`/todos/${id}`, data)
    return {
      id: todo.id,
      ...data
    }
  },

  async deleteTodo(id: string | number): Promise<void> {
    await axiosClient.delete(`/todos/${id}`)
  }
}

