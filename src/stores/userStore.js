import { defineStore } from 'pinia'
import { userApi } from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    loading: false,
    total: 0
  }),
  actions: {
    async fetchUsers(params) {
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
