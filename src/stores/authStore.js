import { defineStore } from "pinia"
import { authApi } from "@/api/auth"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: authApi.getToken()
  }),

  getters: {
    isAuthenticated: (state) => !!state.token
  },

  actions: {
    login(username, password) {
      const response = authApi.login(username, password)
      
      if (response.success) {
        this.token = response.token
        authApi.saveToken(this.token)
        return true
      }
      
      return false
    },

    logout() {
      this.token = null
      authApi.removeToken()
    }
  }
})