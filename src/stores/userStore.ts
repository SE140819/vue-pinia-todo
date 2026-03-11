import { defineStore } from 'pinia'
import { userApi } from '@/api/user'
import type { User } from '@/types'

interface UserState {
  users: User[]
  loading: boolean
  total: number
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    users: [],
    loading: false,
    total: 0
  }),
  actions: {
    async fetchUsers(params?: any): Promise<void> {
      this.loading = true
      try {
        const data = await userApi.getUsers(params)
        this.users = data.list
        this.total = data.total
      } finally {
        this.loading = false
      }
    }
  }
})

